import IServiceCollection from "../interfaces/IServiceCollection";
import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
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
    Register<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, CLASS extends ServiceConstructor<INTERFACE>>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFO, classType: CLASS, serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]): void;
    RegisterTypedParameters<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, CLASS extends ServiceConstructor<INTERFACE>, PARAMETERS extends any[]>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFO, classType: ServiceConstructorTypedParameters<CLASS, PARAMETERS>, serviceConstructorParameters: (serviceProvider: IServiceProvider) => PARAMETERS): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=ServiceCollection.d.ts.map