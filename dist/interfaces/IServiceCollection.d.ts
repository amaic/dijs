import { ServiceConstructor } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "./IServiceProvider";
import IInterfaceInfo from "./IInterfaceInfo";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";
export default interface IServiceCollection {
    IServiceCollection: symbol;
    RegisterInstance<INTERFACE, INTERFACEINFOTYPE extends InterfaceInfoConstructor<INTERFACE>, INSTANCE extends INTERFACE>(interfaceInfoType: INTERFACEINFOTYPE, instance: INSTANCE): void;
    Register<INTERFACE, INTERFACEINFOTYPE extends InterfaceInfoConstructor<INTERFACE>, CLASSTYPE extends ServiceConstructor<INTERFACE>>(serviceType: ServiceType, interfaceInfoType: INTERFACEINFOTYPE, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, instanceName?: string) => INTERFACE): void;
    GetServiceProvider(): IServiceProvider;
}
export declare const IServiceCollectionIdentifier: unique symbol;
export declare class IServiceCollectionInfo implements IInterfaceInfo<IServiceCollection> {
    readonly Identifier: symbol;
    ImplementsInterface(instance: any): instance is IServiceCollection;
}
//# sourceMappingURL=IServiceCollection.d.ts.map