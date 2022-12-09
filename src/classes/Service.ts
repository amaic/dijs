import { StringKeyDictionary } from "../types/Dictionary";
import ServiceDescriptor from "./ServiceDescriptor";
import InstanceNameNotAvailable from "../errors/InstanceNameNotAvailable";
import InstanceNameMandatory from "../errors/InstanceNameMandatory";
import UnknownServiceIdentifierError from "../errors/UnknownServiceIdentifierError";
import { IServiceProvider, ServiceType } from "@amaic/dijs-abstractions";
import { ServiceConstructorFunction } from "../types/ServiceConstructorFunction";
import InvalidServiceType from "../errors/InvalidServiceType";

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

    private readonly _instances: StringKeyDictionary<CLASS[]> = {};

    private _getInstance(serviceConstructorIndex: number, name?: string): CLASS
    {
        let internalName: string;
        switch (this._serviceDescriptor.ServiceType)
        {
            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Transient:
            case ServiceType.Scoped:

                if (name !== undefined)
                    throw new InstanceNameNotAvailable(`Service is of type '${ this._serviceDescriptor.ServiceType }' and parameter 'instanceName' must be null.`);

                internalName = "";
                break;

            case ServiceType.Named:
            case ServiceType.ScopedNamed:
            case ServiceType.TransientNamed:

                if (name == undefined || name.isEmptyOrWhitespace())
                    throw new InstanceNameMandatory(`Service is of type '${ this._serviceDescriptor.ServiceType }' and parameter 'name' must not be null, empty or whitespace.`);

                internalName = name;
                break;

            default:
                throw new InvalidServiceType();
        }

        const serviceConstructor = this._serviceDescriptor.ServiceConstructors[serviceConstructorIndex];

        switch (this._serviceDescriptor.ServiceType)
        {
            case ServiceType.Transient:
            case ServiceType.TransientNamed:

                return serviceConstructor(this._serviceProvider, name);

            case ServiceType.Instance:
            case ServiceType.Singleton:
            case ServiceType.Scoped:
            case ServiceType.Named:
            case ServiceType.ScopedNamed:

                if (this._instances[internalName] == undefined)
                {
                    this._instances[internalName] = new Array<CLASS>(this._serviceDescriptor.ServiceConstructors.length);
                }

                if (this._instances[internalName][serviceConstructorIndex] == undefined)
                {
                    this._instances[internalName][serviceConstructorIndex] = serviceConstructor(this._serviceProvider, name);
                }

                return this._instances[internalName][serviceConstructorIndex];

            default:
                throw new UnknownServiceIdentifierError();
        }
    }

    public GetInstance(name?: string): CLASS
    {
        const serviceConstructorIndex = this._serviceDescriptor.ServiceConstructors.length - 1;
        if (serviceConstructorIndex < 0)
        {
            throw new Error("Should not happen: no service constructor found.");
        }

        return this._getInstance(serviceConstructorIndex, name);
    }

    public GetInstances(name?: string): CLASS[]
    {
        const instances: CLASS[] = [];

        for (let serviceConstructorIndex = 0; serviceConstructorIndex < this._serviceDescriptor.ServiceConstructors.length; serviceConstructorIndex++)        
        {
            instances.push(this._getInstance(serviceConstructorIndex, name));
        }

        return instances;
    }
}