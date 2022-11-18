import IServiceCollection from "../interfaces/IServiceCollection";
import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "../interfaces/IServiceProvider";
import IInterfaceInfo from "../interfaces/IInterfaceInfo";
export default class ServiceCollection implements IServiceCollection {
    readonly IServiceCollection: symbol;
    constructor();
    private readonly _serviceDescriptors;
    private readonly _mainScope;
    private _getServiceDescriptor;
    private _registerService;
    RegisterInstance<Interface, Class extends Interface>(serviceIdentifier: symbol, instance: Class): void;
    RegisterInstanceV2<INTERFACE, INTERFACEINFO extends new () => IInterfaceInfo<INTERFACE>, INSTANCE extends INTERFACE>(interfaceInfoType: INTERFACEINFO, instance: INSTANCE): void;
    Register<Interface, Class extends Interface>(serviceType: ServiceType, serviceIdentifier: symbol, serviceConstructor: ServiceConstructor<Class>, serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]): void;
    RegisterV2<INTERFACE, INTERFACEINFO extends new () => IInterfaceInfo<INTERFACE>, CLASS extends INTERFACE>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFO, serviceConstructor: ServiceConstructor<CLASS>, serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]): void;
    RegisterTypedParameters<Interface, Class extends Interface, Parameters>(serviceType: ServiceType, serviceIdentifier: symbol, serviceConstructor: ServiceConstructorTypedParameters<Class, Parameters>, serviceConstructorParameters: (serviceProvider: IServiceProvider) => Parameters): void;
    RegisterTypedParametersV2<INTERFACE, INTERFACEINFO extends new () => IInterfaceInfo<INTERFACE>, CLASS extends INTERFACE, PARAMETERS>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFO, serviceConstructor: ServiceConstructorTypedParameters<CLASS, PARAMETERS>, serviceConstructorParameters: (serviceProvider: IServiceProvider) => PARAMETERS): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=ServiceCollection.d.ts.map