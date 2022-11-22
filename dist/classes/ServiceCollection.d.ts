import IServiceCollection from "../interfaces/IServiceCollection";
import { ServiceConstructor } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "../interfaces/IServiceProvider";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";
export default class ServiceCollection implements IServiceCollection {
    readonly IServiceCollection: symbol;
    constructor();
    private readonly _serviceDescriptors;
    private readonly _mainScope;
    private _getServiceDescriptor;
    private _registerService;
    RegisterInstance<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, INSTANCE extends INTERFACE>(interfaceInfoType: INTERFACEINFO, instance: INSTANCE): void;
    Register<INTERFACE, INTERFACEINFOTYPE extends InterfaceInfoConstructor<INTERFACE>, CLASSTYPE extends ServiceConstructor<INTERFACE>>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFOTYPE, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=ServiceCollection.d.ts.map