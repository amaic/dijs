import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "./IServiceProvider";
export declare const IServiceCollectionIdentifier: unique symbol;
export default interface IServiceCollection {
    RegisterInstance<Interface, Class extends Interface>(serviceIdentifier: symbol, instance: Class): void;
    Register<Interface, Class extends Interface>(serviceType: ServiceType, serviceIdentifier: symbol, serviceConstructor: ServiceConstructor<Class>, serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]): void;
    RegisterTypedParameters<Interface, Class extends Interface, Parameters>(serviceType: ServiceType, serviceIdentifier: symbol, serviceConstructor: ServiceConstructorTypedParameters<Class, Parameters>, serviceConstructorParameters: (serviceProvider: IServiceProvider) => Parameters): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=IServiceCollection.d.ts.map