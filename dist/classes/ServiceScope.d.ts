import ServiceDescriptor from "./ServiceDescriptor";
import { IServiceProvider } from "@amaic/dijs-abstractions";
export default class ServiceScope implements IServiceProvider {
    IServiceProvider: symbol;
    constructor(parentScope: ServiceScope | null, getServiceDescriptor: (serviceIdentifier: symbol) => ServiceDescriptor<any> | undefined);
    private readonly _parentScope;
    private readonly _getServiceDescriptor;
    private readonly _services;
    get IsMainContext(): boolean;
    private _getService;
    GetService<Interface>(serviceIdentifier: symbol, instanceName?: string): Interface;
    CreateScope(): IServiceProvider;
}
//# sourceMappingURL=ServiceScope.d.ts.map