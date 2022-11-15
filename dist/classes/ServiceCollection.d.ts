import IServiceCollection from "../interfaces/IServiceCollection";
import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "../interfaces/IServiceProvider";
export default class ServiceCollection implements IServiceCollection {
    constructor();
    private readonly _serviceDescriptors;
    private readonly _mainScope;
    private _getServiceDescriptor;
    private _registerService;
    RegisterInstance<Interface, Class extends Interface>(serviceIdentifier: symbol, instance: Class): void;
    Register<Interface, Class extends Interface>(serviceType: ServiceType, serviceIdentifier: symbol, serviceConstructor: ServiceConstructor<Class>, serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]): void;
    RegisterTypedParameters<Interface, Class extends Interface, Parameters>(serviceType: ServiceType, serviceIdentifier: symbol, serviceConstructor: ServiceConstructorTypedParameters<Class, Parameters>, serviceConstructorParameters: (serviceProvider: IServiceProvider) => Parameters): void;
    GetServiceProvider(): IServiceProvider;
}
//# sourceMappingURL=ServiceCollection.d.ts.map