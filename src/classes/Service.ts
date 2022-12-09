import { StringKeyDictionary } from "../types/Dictionary";
import ServiceDescriptor from "./ServiceDescriptor";
import InstanceNameNotAvailable from "../errors/InstanceNameNotAvailable";
import InstanceNameMandatory from "../errors/InstanceNameMandatory";
import UnknownServiceIdentifierError from "../errors/UnknownServiceIdentifierError";
import { IServiceProvider, ServiceType } from "@amaic/dijs-abstractions";
import { ServiceConstructorFunction } from "../types/ServiceConstructorFunction";

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

    private _getInstance(serviceConstructor: ServiceConstructorFunction<CLASS>, name?: string): CLASS
    {
        switch (this._serviceDescriptor.ServiceType)
        {
            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Transient:
            case ServiceType.Scoped:

                if (name !== undefined)
                    throw new InstanceNameNotAvailable(`Service is of type '${ this._serviceDescriptor.ServiceType }' and parameter 'instanceName' must be null.`);

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

                return serviceConstructor(this._serviceProvider);

            case ServiceType.TransientNamed:

                return serviceConstructor(this._serviceProvider, name);

            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Scoped:

                if (this._instances[""] === undefined)
                {
                    this._instances[""] = serviceConstructor(this._serviceProvider);
                }
                return this._instances[""];

            case ServiceType.Named:
            case ServiceType.ScopedNamed:

                if (name !== undefined)
                {

                    if (this._instances[name] === undefined)
                    {
                        this._instances[name] = serviceConstructor(this._serviceProvider, name);
                    }
                    return this._instances[name];
                }

            default:
                throw new UnknownServiceIdentifierError();
        }
    }

    public GetInstance(name?: string): CLASS
    {
        const serviceConstructor = this._serviceDescriptor.ServiceConstructors.at(-1);
        if (serviceConstructor == undefined)
        {
            throw new Error("Should not happen: no service constructor found.");
        }

        return this._getInstance(serviceConstructor, name);
    }

    public GetInstances(name?: string): CLASS[]
    {
        const serviceConstructors = this._serviceDescriptor.ServiceConstructors;

        const instances: CLASS[] = [];

        for (let serviceConstructor of serviceConstructors)        
        { 
            instances.push(this._getInstance(serviceConstructor, name));
        }

        return instances;
    }
}