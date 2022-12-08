import { IServiceCollection, IServiceProvider, ServiceConstructor, ServiceType } from "@amaic/dijs-abstractions";
import { ServiceRegistrationMode } from "@amaic/dijs-abstractions/dist/types/ServiceRegistrationMode";
export default class ServiceCollection implements IServiceCollection {
    readonly IServiceCollection: symbol;
    constructor();
    private readonly _serviceDescriptors;
    private _registerService;
    RegisterInstance<INTERFACE, INSTANCE extends INTERFACE>(registrationMode: ServiceRegistrationMode, interfaceIdentifier: symbol, instance: INSTANCE): void;
    RegisterClass<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(registrationMode: ServiceRegistrationMode, serviceType: ServiceType, interfaceIdentifier: symbol, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, name?: string) => INTERFACE): void;
    RegisterFactory<INTERFACE>(registrationMode: ServiceRegistrationMode, serviceType: ServiceType, interfaceIdentifier: symbol, factory: (serviceProvider: IServiceProvider, name?: string) => INTERFACE): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=ServiceCollection.d.ts.map