import IServiceProvider from "../interfaces/IServiceProvider";
import { ServiceType } from "../types/ServiceType";

export default class ServiceDescriptor<Class>
{
    constructor(
        serviceIdentifier: symbol,
        serviceType: ServiceType,
        serviceConstructor: (serviceProvider: IServiceProvider) => Class
    )
    {
        this.ServiceIdentifier = serviceIdentifier;
        this.ServiceType = serviceType;
        this.ServiceConstructor = serviceConstructor;
    }

    public readonly ServiceIdentifier: symbol;

    public readonly ServiceType: ServiceType;

    public readonly ServiceConstructor: (serviceProvider: IServiceProvider) => Class;

}