import { ServiceType } from "../types/ServiceType";
import { StringKeyDictionary } from "../types/Dictionary";
import ServiceDescriptor from "./ServiceDescriptor";
import IServiceProvider from "../interfaces/IServiceProvider";
import InstanceNameNotAvailableError from "../errors/InstanceNameNotAvailableError";
import InstanceNameMandatory from "../errors/InstanceNameMandatory";
import UnknownServiceIdentifierError from "../errors/UnknownServiceIdentifierError";

export default class Service<Class>
{
    constructor(
        serviceProvider: IServiceProvider,
        serviceDescriptor: ServiceDescriptor<Class>
    )
    {
        this._serviceProvider = serviceProvider;
        this._serviceDescriptor = serviceDescriptor;
    }

    private readonly _serviceProvider: IServiceProvider;

    private readonly _serviceDescriptor: ServiceDescriptor<Class>;

    private readonly _instances: StringKeyDictionary<Class> = {};

    public GetInstance(instanceName?: string): Class
    {
        switch (this._serviceDescriptor.ServiceType)
        {
            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Transient:
            case ServiceType.Scoped:

                if (instanceName !== undefined)
                    throw new InstanceNameNotAvailableError(`Service is of type '${ this._serviceDescriptor.ServiceType }' and parameter 'instanceName' must be null.`);

                instanceName = "";
                break;

            case ServiceType.Named:
            case ServiceType.NamedScoped:

                if (instanceName === undefined || instanceName.isEmptyOrWhitespace())
                    throw new InstanceNameMandatory(`Service is of type '${ this._serviceDescriptor.ServiceType }' and parameter 'name' must not be null, empty or whitespace.`);

                break;

            default:
                break;
        }

        switch (this._serviceDescriptor.ServiceType)
        {
            case ServiceType.Transient:

                return this._serviceDescriptor.ServiceConstructor(this._serviceProvider);

            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Scoped:

                if (this._instances[""] === undefined)
                {
                    this._instances[""] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
                }
                return this._instances[""];

            case ServiceType.Named:
            case ServiceType.NamedScoped:

                if (instanceName !== undefined)
                {

                    if (this._instances[instanceName] === undefined)
                    {
                        this._instances[instanceName] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
                    }
                    return this._instances[instanceName];
                }

            default:
                throw new UnknownServiceIdentifierError();
        }
    }
}