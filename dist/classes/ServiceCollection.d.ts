import { IServiceCollection, IServiceProvider, ServiceConstructor, ServiceType } from "@amaic/dijs-abstractions";
export default class ServiceCollection implements IServiceCollection {
    readonly IServiceCollection: symbol;
    constructor();
    private readonly _serviceDescriptors;
    private readonly _mainScope;
    private _getServiceDescriptor;
    private _registerService;
    RegisterInstance<INTERFACE, INSTANCE extends INTERFACE>(interfaceIdentifier: symbol, instance: INSTANCE): void;
    RegisterClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(serviceType: ServiceType, interfaceIdentifier: symbol, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE): void;
    RegisterFactory<INTERFACE>(serviceType: ServiceType, interfaceIdentifier: symbol, factory: (serviceProvider: IServiceProvider, name?: string) => INTERFACE): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=ServiceCollection.d.ts.map