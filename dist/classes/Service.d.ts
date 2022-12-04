import ServiceDescriptor from "./ServiceDescriptor";
import { IServiceProvider } from "@amaic/dijs-abstractions";
export default class Service<CLASS> {
    constructor(serviceProvider: IServiceProvider, serviceDescriptor: ServiceDescriptor<CLASS>);
    private readonly _serviceProvider;
    private readonly _serviceDescriptor;
    private readonly _instances;
    GetInstance(name?: string): CLASS;
}
//# sourceMappingURL=Service.d.ts.map