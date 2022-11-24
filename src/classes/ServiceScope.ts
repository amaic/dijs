import ScopedNotAllowedInMainContext from "../errors/ScopedNotAllowedInMainContext";
import UnknownOrUnsupportedServiceTypeError from "../errors/UnknownOrUnsupportedServiceTypeError";
import UnknownServiceIdentifierError from "../errors/UnknownServiceIdentifierError";
import IServiceProvider, { IServiceProviderIdentifier } from "../interfaces/IServiceProvider";
import { SymbolKeyDictionary } from "../types/Dictionary";
import { ServiceType } from "../types/ServiceType";
import Service from "./Service";
import ServiceDescriptor from "./ServiceDescriptor";

export default class ServiceScope implements IServiceProvider
{
    IServiceProvider: symbol = IServiceProviderIdentifier;

    constructor(
        parentScope: ServiceScope | null,
        getServiceDescriptor: (serviceIdentifier: symbol) => ServiceDescriptor<any> | undefined
    )
    {
        this._parentScope = parentScope;
        this._getServiceDescriptor = getServiceDescriptor;
    }

    private readonly _parentScope: ServiceScope | null

    private readonly _getServiceDescriptor: (serviceIdentifier: symbol) => ServiceDescriptor<any> | undefined;

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

                if (this._services[serviceDescriptor.ServiceIdentifier] === undefined)
                {
                    this._services[serviceDescriptor.ServiceIdentifier] = new Service(
                        this,
                        serviceDescriptor
                    );
                }
                return this._services[serviceDescriptor.ServiceIdentifier];

            default:
                throw new UnknownOrUnsupportedServiceTypeError();
        }

    }

    public GetService<Interface>(serviceIdentifier: symbol, instanceName?: string): Interface
    {
        const serviceDescriptor = this._getServiceDescriptor(serviceIdentifier);

        if (serviceDescriptor === undefined)
            throw new UnknownServiceIdentifierError(`Service with identifier '${ serviceIdentifier.description }' not found.`);

        switch (serviceDescriptor.ServiceType)
        {
            case ServiceType.Scoped:
            case ServiceType.ScopedNamed:

                if (this.IsMainContext)
                {
                    throw new ScopedNotAllowedInMainContext(`Scoped service type '${ serviceIdentifier.description }' not allowed in main context.`);
                }
                break;

            default:
                break;
        }

        const service = this._getService(serviceDescriptor)

        return service.GetInstance(instanceName);
    }

    public CreateScope(): IServiceProvider
    {
        return new ServiceScope(this, this._getServiceDescriptor);
    }
}