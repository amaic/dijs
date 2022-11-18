import UnknownOrUnsupportedServiceTypeError from "../errors/UnknownOrUnsupportedServiceTypeError";
import UnknownServiceIdentifierError from "../errors/UnknownServiceIdentifierError";
import IServiceProvider from "../interfaces/IServiceProvider";
import { SymbolKeyDictionary } from "../types/Dictionary";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";
import { ServiceType } from "../types/ServiceType";
import Service from "./Service";
import ServiceDescriptor from "./ServiceDescriptor";

export default class ServiceScope implements IServiceProvider
{
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

    private _getService(serviceDescriptor: ServiceDescriptor<any>): Service<any>
    {
        switch (serviceDescriptor.ServiceType)
        {
            case ServiceType.Instance:

                return new Service(this, serviceDescriptor);

            case ServiceType.Singleton:
            case ServiceType.Named:

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
            case ServiceType.NamedScoped:

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

        const service = this._getService(serviceDescriptor)

        return service.GetInstance(instanceName);
    }

    public GetServiceV2<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>>(interfaceInfoType: INTERFACEINFO, instanceName?: string): INTERFACE
    {
        const interfaceInfo = new interfaceInfoType();

        const serviceDescriptor = this._getServiceDescriptor(interfaceInfo.Identifier);

        if (serviceDescriptor === undefined)
            throw new UnknownServiceIdentifierError(`Service with identifier '${ interfaceInfo.Identifier.description }' not found.`);

        const service = this._getService(serviceDescriptor)

        return service.GetInstance(instanceName);

    }
}