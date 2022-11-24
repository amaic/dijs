import { ServiceConstructor } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "./IServiceProvider";
export default interface IServiceCollection {
    IServiceCollection: symbol;
    RegisterInstance<INTERFACE, INSTANCE extends INTERFACE>(interfaceIdentifier: symbol, instance: INSTANCE): void;
    Register<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>(serviceType: ServiceType, interfaceIdentifier: symbol, classType: CLASSTYPE, constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, instanceName?: string) => INTERFACE): void;
    GetServiceProvider(): IServiceProvider;
}
export declare const IServiceCollectionIdentifier: unique symbol;
export declare function IsIServiceCollection(instance: any): instance is IServiceCollection;
//# sourceMappingURL=IServiceCollection.d.ts.map