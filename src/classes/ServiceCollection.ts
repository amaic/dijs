import IServiceCollection, { IServiceCollectionIdentifier, IServiceCollectionInfo } from "../interfaces/IServiceCollection";
import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { SymbolKeyDictionary } from "../types/Dictionary";
import { ServiceType } from "../types/ServiceType";
import ServiceDescriptor from "./ServiceDescriptor";
import IServiceProvider from "../interfaces/IServiceProvider";
import ServiceScope from "./ServiceScope";
import ServiceIdentifierAlreadyInUseError from "../errors/ServiceIdentifierAlreadyInUseError";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";

export default class ServiceCollection implements IServiceCollection
{
    readonly IServiceCollection: symbol = IServiceCollectionIdentifier;

    constructor()
    {
        this._mainScope = new ServiceScope(null, this._getServiceDescriptor.bind(this));

        this.RegisterInstance<IServiceCollection, typeof IServiceCollectionInfo, ServiceCollection>(IServiceCollectionInfo, this);
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

    public RegisterInstance<
        INTERFACE,
        INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>,
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

    public Register<
        INTERFACE,
        INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>,
        CLASS extends ServiceConstructor<INTERFACE>>
        (
            serviceType: ServiceType,
            interfaceInfoType: INTERFACEINFO,
            classType: CLASS,
            serviceConstructorParameters: (serviceProvider: IServiceProvider) => any[] = () => []
        )
    {
        const interfaceInfo = new interfaceInfoType();

        this._registerService(
            serviceType,
            interfaceInfo.Identifier,
            (serviceProvider) => new classType(...serviceConstructorParameters(serviceProvider))
        );
    }

    public RegisterTypedParameters<
        INTERFACE,
        INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>,
        CLASS extends ServiceConstructor<INTERFACE>,
        PARAMETERS extends any[]>
        (
            serviceType: ServiceType,
            interfaceInfoType: INTERFACEINFO,
            classType: ServiceConstructorTypedParameters<CLASS, PARAMETERS>,
            serviceConstructorParameters: (serviceProvider: IServiceProvider) => PARAMETERS
        ): void
    {
        const interfaceInfo = new interfaceInfoType();

        this._registerService(
            serviceType,
            interfaceInfo.Identifier,
            (serviceProvider) => new classType(...serviceConstructorParameters(serviceProvider))
        );

    }


    public GetServiceProvider(): IServiceProvider
    {
        return this._mainScope;
    }
}