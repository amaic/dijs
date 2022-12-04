import { IServiceProvider, ServiceType } from "@amaic/dijs-abstractions";

export default class ServiceDescriptor<CLASS>
{
    constructor(
        serviceIdentifier: symbol,
        serviceType: ServiceType,
        serviceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS
    )
    {
        this.ServiceIdentifier = serviceIdentifier;
        this.ServiceType = serviceType;
        this.ServiceConstructor = serviceConstructor;
    }

    public readonly ServiceIdentifier: symbol;

    public readonly ServiceType: ServiceType;

    public readonly ServiceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS;

}