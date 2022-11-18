import IServiceCollection, { IServiceCollectionIdentifier } from "../interfaces/IServiceCollection";
import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { SymbolKeyDictionary } from "../types/Dictionary";
import { ServiceType } from "../types/ServiceType";
import ServiceDescriptor from "./ServiceDescriptor";
import IServiceProvider from "../interfaces/IServiceProvider";
import ServiceScope from "./ServiceScope";
import ServiceIdentifierAlreadyInUseError from "../errors/ServiceIdentifierAlreadyInUseError";
import IInterfaceInfo from "../interfaces/IInterfaceInfo";
import DiscriminatorMissmatch from "../errors/DiscriminatorMissmatch";

export default class ServiceCollection implements IServiceCollection
{
    readonly IServiceCollection: symbol = IServiceCollectionIdentifier;

    constructor()
    {
        this._mainScope = new ServiceScope(null, this._getServiceDescriptor.bind(this));

        this.RegisterInstance<IServiceCollection, ServiceCollection>(IServiceCollectionIdentifier, this);
    }

    private readonly _serviceDescriptors: SymbolKeyDictionary<ServiceDescriptor<any>> = {};

    private readonly _mainScope: ServiceScope;

    private _getServiceDescriptor(serviceIdentifier: symbol): ServiceDescriptor<any> | undefined
    {
        return this._serviceDescriptors[serviceIdentifier];
    }

    private _registerService<Interface, Class extends Interface>(
        serviceType: ServiceType,
        serviceIdentifier: symbol,
        serviceConstructor: (serviceProvider: IServiceProvider) => Class
    )
    {
        if (this._serviceDescriptors[serviceIdentifier] !== undefined)
            throw new ServiceIdentifierAlreadyInUseError(`Service with identifier '${ serviceIdentifier.description }' already registered.`);

        this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor(
            serviceIdentifier,
            serviceType,
            serviceConstructor
        );
    }

    public RegisterInstance<Interface, Class extends Interface>(serviceIdentifier: symbol, instance: Class)
    {
        this._registerService(
            ServiceType.Instance,
            serviceIdentifier,
            () => instance
        );
    }

    public RegisterInstanceV2<
        INTERFACE,
        INTERFACEINFO extends new () => IInterfaceInfo<INTERFACE>,
        INSTANCE extends INTERFACE>
        (interfaceInfoType: INTERFACEINFO, instance: INSTANCE): void
    {
        const interfaceInfo = new interfaceInfoType();

        this._registerService(
            ServiceType.Instance,
            interfaceInfo.Identifier,
            () => instance
        )
    }

    public Register<Interface, Class extends Interface>(
        serviceType: ServiceType,
        serviceIdentifier: symbol,
        serviceConstructor: ServiceConstructor<Class>,
        serviceConstructorParameters: (serviceProvider: IServiceProvider) => any[] = () => []
    )
    {
        this._registerService(
            serviceType,
            serviceIdentifier,
            (serviceProvider) => new serviceConstructor(...serviceConstructorParameters(serviceProvider))
        );
    }

    public RegisterV2<
        INTERFACE,
        INTERFACEINFO extends new () => IInterfaceInfo<INTERFACE>,
        CLASS extends INTERFACE>
        (
            serviceType: ServiceType,
            interfaceInfoType: INTERFACEINFO,
            serviceConstructor: ServiceConstructor<CLASS>,
            serviceConstructorParameters: (serviceProvider: IServiceProvider) => any[] = () => []
        )
    {
        const interfaceInfo = new interfaceInfoType();

        this._registerService(
            serviceType,
            interfaceInfo.Identifier,
            (serviceProvider) => new serviceConstructor(...serviceConstructorParameters(serviceProvider))
        );
    }

    public RegisterTypedParameters<Interface, Class extends Interface, Parameters>(
        serviceType: ServiceType,
        serviceIdentifier: symbol,
        serviceConstructor: ServiceConstructorTypedParameters<Class, Parameters>,
        serviceConstructorParameters: (serviceProvider: IServiceProvider) => Parameters
    )
    {
        this._registerService(
            serviceType,
            serviceIdentifier,
            (serviceProvider) => new serviceConstructor(serviceConstructorParameters(serviceProvider))
        );
    }

    public RegisterTypedParametersV2<
        INTERFACE,
        INTERFACEINFO extends new () => IInterfaceInfo<INTERFACE>,
        CLASS extends INTERFACE,
        PARAMETERS>
        (
            serviceType: ServiceType,
            interfaceInfoType: INTERFACEINFO,
            serviceConstructor: ServiceConstructorTypedParameters<CLASS, PARAMETERS>,
            serviceConstructorParameters: (serviceProvider: IServiceProvider) => PARAMETERS
        ): void
    {
        const interfaceInfo = new interfaceInfoType();

        this._registerService(
            serviceType,
            interfaceInfo.Identifier,
            (serviceProvider) => new serviceConstructor(serviceConstructorParameters(serviceProvider))
        );

    }


    public GetServiceProvider(): IServiceProvider
    {
        return this._mainScope;
    }
}