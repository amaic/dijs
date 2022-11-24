import ServiceDescriptor from "./ServiceDescriptor";
import IServiceProvider from "../interfaces/IServiceProvider";
export default class Service<CLASS> {
    constructor(serviceProvider: IServiceProvider, serviceDescriptor: ServiceDescriptor<CLASS>);
    private readonly _serviceProvider;
    private readonly _serviceDescriptor;
    private readonly _instances;
    GetInstance(instanceName?: string): CLASS;
}
//# sourceMappingURL=Service.d.ts.map