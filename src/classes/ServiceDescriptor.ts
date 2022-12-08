import { IServiceProvider, ServiceType } from "@amaic/dijs-abstractions";
import ICloneable, { ICloneableIdentifier } from "../interfaces/IClonable";

export default class ServiceDescriptor<CLASS> implements ICloneable
{
    ICloneable: symbol = ICloneableIdentifier;

    constructor(
        serviceIdentifier: symbol,
        serviceType: ServiceType,
        serviceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS
    )
    {
        this.ServiceIdentifier = serviceIdentifier;
        this.ServiceType = serviceType;
        this.ServiceConstructors = new Array(serviceConstructor);
    }

    public readonly ServiceIdentifier: symbol;

    public readonly ServiceType: ServiceType;

    public readonly ServiceConstructors: Array<(serviceProvider: IServiceProvider, name?: string) => CLASS>;

    public Clone(): ServiceDescriptor<CLASS>
    {
        const clone: ServiceDescriptor<CLASS> = { ...this };

        (clone as any).ServiceConstructors = [...this.ServiceConstructors];

        return clone;
    }
}