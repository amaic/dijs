import { ServiceType } from "../types/ServiceType";
import { StringKeyDictionary } from "../types/Dictionary";
import ServiceDescriptor from "./ServiceDescriptor";
import IServiceProvider from "../interfaces/IServiceProvider";
import InstanceNameNotAvailableError from "../errors/InstanceNameNotAvailableError";
import InstanceNameMandatory from "../errors/InstanceNameMandatory";
import UnknownServiceIdentifierError from "../errors/UnknownServiceIdentifierError";

export default class Service<CLASS>
{
    constructor(
        serviceProvider: IServiceProvider,
        serviceDescriptor: ServiceDescriptor<CLASS>
    )
    {
        this._serviceProvider = serviceProvider;
        this._serviceDescriptor = serviceDescriptor;
    }

    private readonly _serviceProvider: IServiceProvider;

    private readonly _serviceDescriptor: ServiceDescriptor<CLASS>;

    private readonly _instances: StringKeyDictionary<CLASS> = {};

    public GetInstance(name?: string): CLASS
    {
        switch (this._serviceDescriptor.ServiceType)
        {
            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Transient:
            case ServiceType.Scoped:

                if (name !== undefined)
                    throw new InstanceNameNotAvailableError(`Service is of type '${ this._serviceDescriptor.ServiceType }' and parameter 'instanceName' must be null.`);

                name = "";
                break;

            case ServiceType.Named:
            case ServiceType.ScopedNamed:
            case ServiceType.TransientNamed:

                if (name === undefined || name.isEmptyOrWhitespace())
                    throw new InstanceNameMandatory(`Service is of type '${ this._serviceDescriptor.ServiceType }' and parameter 'name' must not be null, empty or whitespace.`);

                break;

            default:
                break;
        }

        switch (this._serviceDescriptor.ServiceType)
        {
            case ServiceType.Transient:

                return this._serviceDescriptor.ServiceConstructor(this._serviceProvider);

            case ServiceType.TransientNamed:

                return this._serviceDescriptor.ServiceConstructor(this._serviceProvider, name);

            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Scoped:

                if (this._instances[""] === undefined)
                {
                    this._instances[""] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
                }
                return this._instances[""];

            case ServiceType.Named:
            case ServiceType.ScopedNamed:

                if (name !== undefined)
                {

                    if (this._instances[name] === undefined)
                    {
                        this._instances[name] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider, name);
                    }
                    return this._instances[name];
                }

            default:
                throw new UnknownServiceIdentifierError();
        }
    }
}