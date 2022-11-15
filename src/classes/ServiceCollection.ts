import IServiceCollection, { IServiceCollectionIdentifier } from "../interfaces/IServiceCollection";
import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { SymbolKeyDictionary } from "../types/Dictionary";
import { ServiceType } from "../types/ServiceType";
import ServiceDescriptor from "./ServiceDescriptor";
import IServiceProvider from "../interfaces/IServiceProvider";
import ServiceScope from "./ServiceScope";
import ServiceIdentifierAlreadyInUseError from "../errors/ServiceIdentifierAlreadyInUseError";

export default class ServiceCollection implements IServiceCollection
{
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
            throw new ServiceIdentifierAlreadyInUseError(`Service with identifier '${serviceIdentifier.description}' already registered.`);

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



    public GetServiceProvider(): IServiceProvider
    {
        return this._mainScope;
    }
}