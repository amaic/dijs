import IServiceProvider from "../interfaces/IServiceProvider";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";
import ServiceDescriptor from "./ServiceDescriptor";
export default class ServiceScope implements IServiceProvider {
    constructor(parentScope: ServiceScope | null, getServiceDescriptor: (serviceIdentifier: symbol) => ServiceDescriptor<any> | undefined);
    private readonly _parentScope;
    private readonly _getServiceDescriptor;
    private readonly _services;
    private _getService;
    GetService<Interface>(serviceIdentifier: symbol, instanceName?: string): Interface;
    GetServiceV2<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>>(interfaceInfoType: INTERFACEINFO, instanceName?: string): INTERFACE;
}
//# sourceMappingURL=ServiceScope.d.ts.map