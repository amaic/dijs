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
        this.IServiceCollection = true;
        this._serviceDescriptors = {};
        this._mainScope = new ServiceScope_1.default(null, this._getServiceDescriptor.bind(this));
        this.RegisterInstance(IServiceCollection_1.IServiceCollectionIdentifier, this);
    }
    _getServiceDescriptor(serviceIdentifier) {
        return this._serviceDescriptors[serviceIdentifier];
    }
    _registerService(serviceType, serviceIdentifier, serviceConstructor) {
        if (this._serviceDescriptors[serviceIdentifier] !== undefined)
            throw new ServiceIdentifierAlreadyInUseError_1.default(`Service with identifier '${serviceIdentifier.description}' already registered.`);
        this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor_1.default(serviceIdentifier, serviceType, serviceConstructor);
    }
    RegisterInstance(serviceIdentifier, instance) {
        this._registerService(ServiceType_1.ServiceType.Instance, serviceIdentifier, () => instance);
    }
    Register(serviceType, serviceIdentifier, serviceConstructor, serviceConstructorParameters = () => []) {
        this._registerService(serviceType, serviceIdentifier, (serviceProvider) => new serviceConstructor(...serviceConstructorParameters(serviceProvider)));
    }
    RegisterTypedParameters(serviceType, serviceIdentifier, serviceConstructor, serviceConstructorParameters) {
        this._registerService(serviceType, serviceIdentifier, (serviceProvider) => new serviceConstructor(serviceConstructorParameters(serviceProvider)));
    }
    GetServiceProvider() {
        return this._mainScope;
    }
}
exports.default = ServiceCollection;
//# sourceMappingURL=ServiceCollection.js.map