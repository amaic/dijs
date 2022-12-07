"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
const ServiceRegistrationMode_1 = require("@amaic/dijs-abstractions/dist/types/ServiceRegistrationMode");
const ServiceIdentifierAlreadyInUseError_1 = __importDefault(require("../errors/ServiceIdentifierAlreadyInUseError"));
const ServiceDescriptor_1 = __importDefault(require("./ServiceDescriptor"));
const ServiceScope_1 = __importDefault(require("./ServiceScope"));
class ServiceCollection {
    constructor() {
        this.IServiceCollection = dijs_abstractions_1.IServiceCollectionIdentifier;
        this._serviceDescriptors = {};
        this._mainScope = new ServiceScope_1.default(null, this._getServiceDescriptor.bind(this));
        this.RegisterInstance(ServiceRegistrationMode_1.ServiceRegistrationMode.Single, dijs_abstractions_1.IServiceCollectionIdentifier, this);
    }
    _getServiceDescriptor(serviceIdentifier) {
        return this._serviceDescriptors[serviceIdentifier];
    }
    _registerService(registrationMode, serviceType, serviceIdentifier, serviceConstructor) {
        // TODO implement logic for registration mode
        switch (registrationMode) {
            case ServiceRegistrationMode_1.ServiceRegistrationMode.Single:
                if (this._serviceDescriptors[serviceIdentifier] !== undefined) {
                    throw new ServiceIdentifierAlreadyInUseError_1.default(`Service with identifier '${serviceIdentifier.description}' already registered.`);
                }
                break;
            case ServiceRegistrationMode_1.ServiceRegistrationMode.Overwrite:
                throw new Error("not implemented");
                break;
            case ServiceRegistrationMode_1.ServiceRegistrationMode.Multiple:
                throw new Error("not implemented");
                break;
            default:
                throw new Error("Invalid service registration mode.");
        }
        this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor_1.default(serviceIdentifier, serviceType, serviceConstructor);
    }
    RegisterInstance(registrationMode, interfaceIdentifier, instance) {
        this._registerService(registrationMode, dijs_abstractions_1.ServiceType.Instance, interfaceIdentifier, () => instance);
    }
    RegisterClass(registrationMode, serviceType, interfaceIdentifier, classType, constructor) {
        this._registerService(registrationMode, serviceType, interfaceIdentifier, (serviceProvider, name) => constructor === undefined ? new classType() : constructor(classType, serviceProvider, name));
    }
    RegisterFactory(registrationMode, serviceType, interfaceIdentifier, factory) {
        this._registerService(registrationMode, serviceType, interfaceIdentifier, (serviceProvider, name) => factory(serviceProvider, name));
    }
    GetServiceProvider() {
        return this._mainScope;
    }
}
exports.default = ServiceCollection;
//# sourceMappingURL=ServiceCollection.js.map