import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "./IServiceProvider";
// import IInterfaceInfo from "./IInterfaceInfo";
// import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";

export default interface IServiceCollection
{
    IServiceCollection: symbol;

    RegisterInstance<INTERFACE, INSTANCE extends INTERFACE>
        (
            interfaceIdentifier: symbol,
            instance: INSTANCE
        ): void;

    Register<INTERFACE, CLASSTYPE extends ServiceConstructor<INTERFACE>>
        (
            serviceType: ServiceType,
            interfaceIdentifier: symbol,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider, instanceName?: string) => INTERFACE
        ): void;

    GetServiceProvider(): IServiceProvider;

}

export const IServiceCollectionIdentifier = Symbol("IServiceCollection");

export function IsIServiceCollection(instance: any): instance is IServiceCollection
{
    return instance?.IServiceCollection === IServiceCollectionIdentifier;
}
