import ServiceDescriptor from "./ServiceDescriptor";
import { IServiceProvider } from "@amaic/dijs-abstractions";
export default class Service<CLASS> {
    constructor(serviceProvider: IServiceProvider, serviceDescriptor: ServiceDescriptor<CLASS>);
    private readonly _serviceProvider;
    private readonly _serviceDescriptor;
    private readonly _instances;
    private _getInstance;
    GetInstance(name?: string): CLASS;
    GetInstances(name?: string): CLASS[];
}
//# sourceMappingURL=Service.d.ts.map