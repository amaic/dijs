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
    RegisterInstance(interfaceIdentifier, instance) {
        this._registerService(ServiceType_1.ServiceType.Instance, interfaceIdentifier, () => instance);
    }
    RegisterConstructor(serviceType, interfaceIdentifier, classType, constructor) {
        this._registerService(serviceType, interfaceIdentifier, (serviceProvider, name) => constructor === undefined ? new classType() : constructor(classType, serviceProvider, name));
    }
    RegisterFactory(serviceType, interfaceIdentifier, factory) {
        this._registerService(serviceType, interfaceIdentifier, (serviceProvider, name) => factory(serviceProvider, name));
    }
    GetServiceProvider() {
        return this._mainScope;
    }
}
exports.default = ServiceCollection;
//# sourceMappingURL=ServiceCollection.js.map