import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "./IServiceProvider";
import IInterfaceInfo from "./IInterfaceInfo";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";

export default interface IServiceCollection
{
    IServiceCollection: symbol;

    RegisterInstance<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, INSTANCE extends INTERFACE>
        (
            interfaceInfoType: INTERFACEINFO,
            instance: INSTANCE
        ): void;

    Register<INTERFACE, INTERFACEINFOTYPE extends InterfaceInfoConstructor<INTERFACE>, CLASSTYPE extends ServiceConstructor<INTERFACE>>
        (
            serviceType: ServiceType,
            interfaceInfoType: INTERFACEINFOTYPE,
            classType: CLASSTYPE,
            constructor?: (classType: CLASSTYPE, serviceProvider: IServiceProvider) => INTERFACE
        ): void;

    GetServiceProvider(): IServiceProvider;

}

export const IServiceCollectionIdentifier = Symbol("IServiceCollection");

export class IServiceCollectionInfo implements IInterfaceInfo<IServiceCollection>
{
    readonly Identifier: symbol = IServiceCollectionIdentifier;

    ImplementsInterface(instance: any): instance is IServiceCollection
    {
        return instance?.IServiceCollection === IServiceCollectionIdentifier;
    }

}