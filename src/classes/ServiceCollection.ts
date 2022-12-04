import { IServiceCollection, IServiceCollectionIdentifier, IServiceProvider, ServiceConstructor, ServiceType } from "@amaic/dijs-abstractions";
import ServiceIdentifierAlreadyInUseError from "../errors/ServiceIdentifierAlreadyInUseError";
import { SymbolKeyDictionary } from "../types/Dictionary";
import ServiceDescriptor from "./ServiceDescriptor";
import ServiceScope from "./ServiceScope";

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

    private _registerService<INTERFACE, CLASS extends INTERFACE>(
        serviceType: ServiceType,
        serviceIdentifier: symbol,
        serviceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS
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

    public RegisterInstance<INTERFACE, INSTANCE extends INTERFACE>(
        interfaceIdentifier: symbol,
        instance: INSTANCE
    ): void
    {
        this._registerService(
            ServiceType.Instance,
            interfaceIdentifier,
            () => instance
        )
    }

    public RegisterClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
        serviceType: ServiceType,
        interfaceIdentifier: symbol,
        classType: CLASSTYPE,
        constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE
    ): void
    {
        this._registerService(
            serviceType,
            interfaceIdentifier,
            (serviceProvider, name) => constructor === undefined ? new classType() : constructor(classType, serviceProvider, name)
        );
    }

    public RegisterFactory<INTERFACE>(
        serviceType: ServiceType,
        interfaceIdentifier: symbol,
        factory: (serviceProvider: IServiceProvider, name?: string) => INTERFACE
    ): void
    {
        this._registerService(
            serviceType,
            interfaceIdentifier,
            (serviceProvider, name) => factory(serviceProvider, name)
        );
    }

    public GetServiceProvider(): IServiceProvider
    {
        return this._mainScope;
    }
}