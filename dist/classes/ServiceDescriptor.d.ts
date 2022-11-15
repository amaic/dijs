import IServiceProvider from "../interfaces/IServiceProvider";
import { ServiceType } from "../types/ServiceType";
export default class ServiceDescriptor<Class> {
    constructor(serviceIdentifier: symbol, serviceType: ServiceType, serviceConstructor: (serviceProvider: IServiceProvider) => Class);
    readonly ServiceIdentifier: symbol;
    readonly ServiceType: ServiceType;
    readonly ServiceConstructor: (serviceProvider: IServiceProvider) => Class;
}
//# sourceMappingURL=ServiceDescriptor.d.ts.map