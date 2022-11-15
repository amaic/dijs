import ServiceDescriptor from "./ServiceDescriptor";
import IServiceProvider from "../interfaces/IServiceProvider";
export default class Service<Class> {
    constructor(serviceProvider: IServiceProvider, serviceDescriptor: ServiceDescriptor<Class>);
    private readonly _serviceProvider;
    private readonly _serviceDescriptor;
    private readonly _instances;
    GetInstance(instanceName?: string): Class;
}
//# sourceMappingURL=Service.d.ts.map