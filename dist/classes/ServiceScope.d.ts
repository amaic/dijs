import { SymbolKeyDictionary } from "../types/Dictionary";
import ServiceDescriptor from "./ServiceDescriptor";
import { IServiceProvider } from "@amaic/dijs-abstractions";
export default class ServiceScope implements IServiceProvider {
    IServiceProvider: symbol;
    constructor(parentScope: ServiceScope | null, serviceDescriptors: SymbolKeyDictionary<ServiceDescriptor<any>>);
    private readonly _parentScope;
    private readonly _serviceDescriptors;
    private readonly _services;
    get IsMainContext(): boolean;
    private _getService;
    GetService(serviceIdentifier: symbol, name?: string): any;
    GetRequiredService(serviceIdentifier: symbol, name?: string | undefined): any;
    GetServices(serviceIdentifier: symbol, name?: string): any[];
    GetRequiredServices(serviceIdentifier: symbol, name?: string | undefined): any;
    CreateScope(): IServiceProvider;
}
//# sourceMappingURL=ServiceScope.d.ts.map