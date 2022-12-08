import ScopedNotAllowedInMainContext from "../errors/ScopedNotAllowedInMainContext";
import UnknownOrUnsupportedServiceType from "../errors/UnknownOrUnsupportedServiceType";
import UnknownServiceIdentifierError from "../errors/UnknownServiceIdentifierError";
import { SymbolKeyDictionary } from "../types/Dictionary";
import Service from "./Service";
import ServiceDescriptor from "./ServiceDescriptor";
import { IServiceProvider, IServiceProviderIdentifier, ServiceType } from "@amaic/dijs-abstractions";

export default class ServiceScope implements IServiceProvider
{
    IServiceProvider: symbol = IServiceProviderIdentifier;

    constructor(
        parentScope: ServiceScope | null,
        serviceDescriptors: SymbolKeyDictionary<ServiceDescriptor<any>>
        // getServiceDescriptor: (serviceIdentifier: symbol) => ServiceDescriptor<any> | undefined
    )
    {
        this._parentScope = parentScope;
        this._serviceDescriptors = serviceDescriptors;
        // this._getServiceDescriptor = getServiceDescriptor;
    }

    private readonly _parentScope: ServiceScope | null;

    private readonly _serviceDescriptors: SymbolKeyDictionary<ServiceDescriptor<any>>;

    // private readonly _getServiceDescriptor: (serviceIdentifier: symbol) => ServiceDescriptor<any> | undefined;

    private readonly _services: SymbolKeyDictionary<Service<any>> = {};

    public get IsMainContext(): boolean
    {
        return this._parentScope == null;
    }

    private _getService(serviceDescriptor: ServiceDescriptor<any>): Service<any>
    {
        switch (serviceDescriptor.ServiceType)
        {
            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Named:
            case ServiceType.Transient:
            case ServiceType.TransientNamed:

                if (this._parentScope === null)
                {
                    if (this._services[serviceDescriptor.ServiceIdentifier] === undefined)
                    {
                        this._services[serviceDescriptor.ServiceIdentifier] = new Service(
                            this,
                            serviceDescriptor
                        );
                    }
                    return this._services[serviceDescriptor.ServiceIdentifier];
                }
                else
                {
                    return this._parentScope._getService(serviceDescriptor);
                }

            case ServiceType.Scoped:
            case ServiceType.ScopedNamed:

                if (this.IsMainContext)
                {
                    throw new ScopedNotAllowedInMainContext(`Scoped service type '${ serviceDescriptor.ServiceIdentifier.description }' not allowed in main context.`);
                }

                if (this._services[serviceDescriptor.ServiceIdentifier] === undefined)
                {
                    this._services[serviceDescriptor.ServiceIdentifier] = new Service(
                        this,
                        serviceDescriptor
                    );
                }
                return this._services[serviceDescriptor.ServiceIdentifier];

            default:
                throw new UnknownOrUnsupportedServiceType();
        }

    }

    public GetService(serviceIdentifier: symbol, name?: string): any
    {
        // const serviceDescriptor = this._getServiceDescriptor(serviceIdentifier);
        const serviceDescriptor = this._serviceDescriptors[serviceIdentifier];

        if (serviceDescriptor === undefined)
            return null;

        const service = this._getService(serviceDescriptor)

        return service.GetInstance(name);
    }

    public GetRequiredService(serviceIdentifier: symbol, name?: string | undefined): any
    {
        // const serviceDescriptor = this._getServiceDescriptor(serviceIdentifier);
        const serviceDescriptor = this._serviceDescriptors[serviceIdentifier];

        if (serviceDescriptor === undefined)
            throw new UnknownServiceIdentifierError(`Service with identifier '${ serviceIdentifier.description }' not found.`);

        const service = this._getService(serviceDescriptor)

        return service.GetInstance(name);
    }


    public CreateScope(): IServiceProvider
    {
        return new ServiceScope(this, this._serviceDescriptors);
    }
}