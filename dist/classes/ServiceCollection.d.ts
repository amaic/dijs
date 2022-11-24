import IServiceCollection from "../interfaces/IServiceCollection";
import { ServiceConstructor } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "../interfaces/IServiceProvider";
export default class ServiceCollection implements IServiceCollection {
    readonly IServiceCollection: symbol;
    constructor();
    private readonly _serviceDescriptors;
    private readonly _mainScope;
    private _getServiceDescriptor;
    private _registerService;
    RegisterInstance<INTERFACE, INSTANCE extends INTERFACE>(interfaceIdentifier: symbol, instance: INSTANCE): void;
    Register<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(serviceType: ServiceType, interfaceIdentifier: symbol, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=ServiceCollection.d.ts.map