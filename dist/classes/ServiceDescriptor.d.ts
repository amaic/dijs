import { IServiceProvider, ServiceType } from "@amaic/dijs-abstractions";
import ICloneable from "../interfaces/IClonable";
export default class ServiceDescriptor<CLASS> implements ICloneable {
    ICloneable: symbol;
    constructor(serviceIdentifier: symbol, serviceType: ServiceType, serviceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS);
    readonly ServiceIdentifier: symbol;
    readonly ServiceType: ServiceType;
    readonly ServiceConstructors: Array<(serviceProvider: IServiceProvider, name?: string) => CLASS>;
    Clone(): ServiceDescriptor<CLASS>;
}
//# sourceMappingURL=ServiceDescriptor.d.ts.map