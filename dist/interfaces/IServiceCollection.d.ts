import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "./IServiceProvider";
import IInterfaceInfo from "./IInterfaceInfo";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";
export default interface IServiceCollection {
    IServiceCollection: symbol;
    RegisterInstance<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, INSTANCE extends INTERFACE>(interfaceInfoType: INTERFACEINFO, instance: INSTANCE): void;
    Register<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, CLASS extends ServiceConstructor<INTERFACE>>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFO, classType: CLASS, serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]): void;
    RegisterTypedParameters<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, CLASS extends ServiceConstructor<INTERFACE>, PARAMETERS extends any[]>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFO, serviceConstructor: ServiceConstructorTypedParameters<CLASS, PARAMETERS>, serviceConstructorParameters: (serviceProvider: IServiceProvider) => PARAMETERS): void;
    GetServiceProvider(): IServiceProvider;
}
export declare const IServiceCollectionIdentifier: unique symbol;
export declare class IServiceCollectionInfo implements IInterfaceInfo<IServiceCollection> {
    readonly Identifier: symbol;
    ImplementsInterface(instance: any): instance is IServiceCollection;
}
//# sourceMappingURL=IServiceCollection.d.ts.map