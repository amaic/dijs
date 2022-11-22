import IServiceProvider from "../interfaces/IServiceProvider";
import { ServiceType } from "../types/ServiceType";

export default class ServiceDescriptor<CLASS>
{
    constructor(
        serviceIdentifier: symbol,
        serviceType: ServiceType,
        serviceConstructor: (serviceProvider: IServiceProvider, instanceName?: string) => CLASS
    )
    {
        this.ServiceIdentifier = serviceIdentifier;
        this.ServiceType = serviceType;
        this.ServiceConstructor = serviceConstructor;
    }

    public readonly ServiceIdentifier: symbol;

    public readonly ServiceType: ServiceType;

    public readonly ServiceConstructor: (serviceProvider: IServiceProvider, instanceName?: string) => CLASS;

}