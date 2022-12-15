import { ServiceType } from "@amaic/dijs-abstractions";
import ICloneable from "../interfaces/IClonable";
import { ServiceConstructorFunction } from "../types/ServiceConstructorFunction";
export default class ServiceDescriptor<CLASS> implements ICloneable {
    ICloneable: symbol;
    constructor(serviceIdentifier: symbol, serviceType: ServiceType, serviceConstructor: ServiceConstructorFunction<CLASS>);
    readonly ServiceIdentifier: symbol;
    readonly ServiceType: ServiceType;
    readonly ServiceConstructors: Array<ServiceConstructorFunction<CLASS>>;
    Clone(): ServiceDescriptor<CLASS>;
}
