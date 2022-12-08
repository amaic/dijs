import { IServiceCollection, IServiceCollectionIdentifier, IServiceProvider, ServiceConstructor, ServiceRegistrationMode, ServiceType } from "@amaic/dijs-abstractions";
import InvalidServiceType from "../errors/InvalidServiceType";
import ServiceIdentifierAlreadyInUse from "../errors/ServiceIdentifierAlreadyInUse";
import { SymbolKeyDictionary } from "../types/Dictionary";
import ServiceDescriptor from "./ServiceDescriptor";
import ServiceScope from "./ServiceScope";

export default class ServiceCollection implements IServiceCollection
{
    readonly IServiceCollection: symbol = IServiceCollectionIdentifier;

    constructor()
    {
        this.RegisterInstance<IServiceCollection, ServiceCollection>(
            ServiceRegistrationMode.Single,
            IServiceCollectionIdentifier,
            this
        );
    }

    private readonly _serviceDescriptors: SymbolKeyDictionary<ServiceDescriptor<any>> = {};

    private _registerService<INTERFACE, CLASS extends INTERFACE>(
        registrationMode: ServiceRegistrationMode,
        serviceType: ServiceType,
        serviceIdentifier: symbol,
        serviceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS
    )
    {
        switch (registrationMode)
        {
            case ServiceRegistrationMode.Overwrite:

                this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor(
                    serviceIdentifier,
                    serviceType,
                    serviceConstructor
                );
                break;

            case ServiceRegistrationMode.Single:

                if (this._serviceDescriptors[serviceIdentifier] != undefined)
                {
                    throw new ServiceIdentifierAlreadyInUse(`Service with identifier '${ serviceIdentifier.description }' is already registered.`);
                }

                this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor(
                    serviceIdentifier,
                    serviceType,
                    serviceConstructor
                );
                break;

            case ServiceRegistrationMode.Multiple:

                if (this._serviceDescriptors[serviceIdentifier] == undefined)
                {
                    this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor(
                        serviceIdentifier,
                        serviceType,
                        serviceConstructor
                    );
                }
                else
                {
                    if (serviceType != this._serviceDescriptors[serviceIdentifier].ServiceType)
                    {
                        throw new InvalidServiceType(`${ serviceType } <> ${ this._serviceDescriptors[serviceIdentifier].ServiceType }`);
                    }

                    this._serviceDescriptors[serviceIdentifier].ServiceConstructors.push(serviceConstructor);
                }
                break;

            default:
                throw new Error("Invalid service registration mode.");
        }

    }

    public RegisterInstance<INTERFACE, INSTANCE extends INTERFACE>(
        registrationMode: ServiceRegistrationMode,
        interfaceIdentifier: symbol,
        instance: INSTANCE
    ): void
    {
        this._registerService(
            registrationMode,
            ServiceType.Instance,
            interfaceIdentifier,
            () => instance
        )
    }

    public RegisterClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(
        registrationMode: ServiceRegistrationMode,
        serviceType: ServiceType,
        interfaceIdentifier: symbol,
        classType: CLASSTYPE,
        constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE
    ): void
    {
        this._registerService(
            registrationMode,
            serviceType,
            interfaceIdentifier,
            (serviceProvider, name) => constructor == undefined ? new classType() : constructor(classType, serviceProvider, name)
        );
    }

    public RegisterFactory<INTERFACE>(
        registrationMode: ServiceRegistrationMode,
        serviceType: ServiceType,
        interfaceIdentifier: symbol,
        factory: (serviceProvider: IServiceProvider, name?: string) => INTERFACE
    ): void
    {
        this._registerService(
            registrationMode,
            serviceType,
            interfaceIdentifier,
            (serviceProvider, name) => factory(serviceProvider, name)
        );
    }

    public CreateServiceProvider(): IServiceProvider
    {
        const serviceDescriptorsClone: SymbolKeyDictionary<ServiceDescriptor<any>> = {};

        const keys = Object.getOwnPropertySymbols(this._serviceDescriptors);

        for (let key of keys)
        {
            serviceDescriptorsClone[key] = this._serviceDescriptors[key].Clone();
        }

        const serviceProvider = new ServiceScope(null, serviceDescriptorsClone);

        return serviceProvider;
    }
}