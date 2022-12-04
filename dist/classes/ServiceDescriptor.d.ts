import { IServiceProvider, ServiceType } from "@amaic/dijs-abstractions";
export default class ServiceDescriptor<CLASS> {
    constructor(serviceIdentifier: symbol, serviceType: ServiceType, serviceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS);
    readonly ServiceIdentifier: symbol;
    readonly ServiceType: ServiceType;
    readonly ServiceConstructor: (serviceProvider: IServiceProvider, name?: string) => CLASS;
}
//# sourceMappingURL=ServiceDescriptor.d.ts.map