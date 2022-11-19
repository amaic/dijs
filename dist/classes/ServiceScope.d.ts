import IServiceProvider from "../interfaces/IServiceProvider";
import ServiceDescriptor from "./ServiceDescriptor";
export default class ServiceScope implements IServiceProvider {
    constructor(parentScope: ServiceScope | null, getServiceDescriptor: (serviceIdentifier: symbol) => ServiceDescriptor<any> | undefined);
    private readonly _parentScope;
    private readonly _getServiceDescriptor;
    private readonly _services;
    private _getService;
    GetService<Interface>(serviceIdentifier: symbol, instanceName?: string): Interface;
}
//# sourceMappingURL=ServiceScope.d.ts.map