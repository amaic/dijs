"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IServiceCollection_1 = require("../interfaces/IServiceCollection");
const ServiceType_1 = require("../types/ServiceType");
const ServiceDescriptor_1 = __importDefault(require("./ServiceDescriptor"));
const ServiceScope_1 = __importDefault(require("./ServiceScope"));
const ServiceIdentifierAlreadyInUseError_1 = __importDefault(require("../errors/ServiceIdentifierAlreadyInUseError"));
class ServiceCollection {
    constructor() {
        this.IServiceCollection = IServiceCollection_1.IServiceCollectionIdentifier;
        this._serviceDescriptors = {};
        this._mainScope = new ServiceScope_1.default(null, this._getServiceDescriptor.bind(this));
        this.RegisterInstance(IServiceCollection_1.IServiceCollectionInfo, this);
    }
    _getServiceDescriptor(serviceIdentifier) {
        return this._serviceDescriptors[serviceIdentifier];
    }
    _registerService(serviceType, serviceIdentifier, serviceConstructor) {
        if (this._serviceDescriptors[serviceIdentifier] !== undefined)
            throw new ServiceIdentifierAlreadyInUseError_1.default(`Service with identifier '${serviceIdentifier.description}' already registered.`);
        this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor_1.default(serviceIdentifier, serviceType, serviceConstructor);
    }
    RegisterInstance(interfaceInfoType, instance) {
        const interfaceInfo = new interfaceInfoType();
        this._registerService(ServiceType_1.ServiceType.Instance, interfaceInfo.Identifier, () => instance);
    }
    // public Register<
    //     INTERFACE,
    //     INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>,
    //     CLASS extends ServiceConstructor<INTERFACE>>
    //     (
    //         serviceType: ServiceType,
    //         interfaceInfoType: INTERFACEINFO,
    //         classType: CLASS,
    //         serviceConstructorParameters: (serviceProvider: IServiceProvider) => any[] = () => []
    //     )
    // {
    //     const interfaceInfo = new interfaceInfoType();
    //     this._registerService(
    //         serviceType,
    //         interfaceInfo.Identifier,
    //         (serviceProvider) => new classType(...serviceConstructorParameters(serviceProvider))
    //     );
    // }
    Register(serviceType, interfaceInfoType, classType, constructor) {
        const interfaceInfo = new interfaceInfoType();
        this._registerService(serviceType, interfaceInfo.Identifier, (serviceProvider) => constructor === undefined ? new classType() : constructor(classType, serviceProvider));
    }
    // public RegisterTypedParameters<
    //     INTERFACE,
    //     INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>,
    //     CLASS extends ServiceConstructor<INTERFACE>,
    //     PARAMETERS extends any[]>
    //     (
    //         serviceType: ServiceType,
    //         interfaceInfoType: INTERFACEINFO,
    //         classType: ServiceConstructorTypedParameters<CLASS, PARAMETERS>,
    //         serviceConstructorParameters: (serviceProvider: IServiceProvider) => PARAMETERS
    //     ): void
    // {
    //     const interfaceInfo = new interfaceInfoType();
    //     this._registerService(
    //         serviceType,
    //         interfaceInfo.Identifier,
    //         (serviceProvider) => new classType(...serviceConstructorParameters(serviceProvider))
    //     );
    // }
    GetServiceProvider() {
        return this._mainScope;
    }
}
exports.default = ServiceCollection;
//# sourceMappingURL=ServiceCollection.js.map