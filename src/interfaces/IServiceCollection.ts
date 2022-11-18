import { ServiceConstructor, ServiceConstructorTypedParameters } from "../types/ServiceConstructor";
import { ServiceType } from "../types/ServiceType";
import IServiceProvider from "./IServiceProvider";
import IInterfaceInfo from "./IInterfaceInfo";
import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";

export default interface IServiceCollection
{
    IServiceCollection: symbol;

    RegisterInstance<Interface, Class extends Interface>
        (
            serviceIdentifier: symbol,
            instance: Class
        ): void;

    RegisterInstanceV2<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, INSTANCE extends INTERFACE>
        (
            interfaceInfoType: INTERFACEINFO,
            instance: INSTANCE
        ): void;

    Register<Interface, Class extends Interface>
        (
            serviceType: ServiceType,
            serviceIdentifier: symbol,
            serviceConstructor: ServiceConstructor<Class>,
            serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]
        ): void;

    RegisterV2<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, CLASS extends INTERFACE>
        (
            serviceType: ServiceType,
            interfaceInfoType: INTERFACEINFO,
            serviceConstructor: ServiceConstructor<CLASS>,
            serviceConstructorParameters?: (serviceProvider: IServiceProvider) => any[]
        ): void;

    RegisterTypedParameters<Interface, Class extends Interface, Parameters>
        (
            serviceType: ServiceType,
            serviceIdentifier: symbol,
            serviceConstructor: ServiceConstructorTypedParameters<Class, Parameters>,
            serviceConstructorParameters: (serviceProvider: IServiceProvider) => Parameters
        ): void;

    RegisterTypedParametersV2<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>, CLASS extends INTERFACE, PARAMETERS>
        (
            serviceType: ServiceType,
            interfaceInfoType: INTERFACEINFO,
            serviceConstructor: ServiceConstructorTypedParameters<CLASS, PARAMETERS>,
            serviceConstructorParameters: (serviceProvider: IServiceProvider) => PARAMETERS
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