import IServiceProvider from "../interfaces/IServiceProvider";
import { ServiceType } from "../types/ServiceType";
export default class ServiceDescriptor<CLASS> {
    constructor(serviceIdentifier: symbol, serviceType: ServiceType, serviceConstructor: (serviceProvider: IServiceProvider, instanceName?: string) => CLASS);
    readonly ServiceIdentifier: symbol;
    readonly ServiceType: ServiceType;
    readonly ServiceConstructor: (serviceProvider: IServiceProvider, instanceName?: string) => CLASS;
}
//# sourceMappingURL=ServiceDescriptor.d.ts.map