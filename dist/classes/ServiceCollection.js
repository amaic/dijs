"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
const InvalidServiceType_1 = __importDefault(require("../errors/InvalidServiceType"));
const ServiceIdentifierAlreadyInUse_1 = __importDefault(require("../errors/ServiceIdentifierAlreadyInUse"));
const ServiceDescriptor_1 = __importDefault(require("./ServiceDescriptor"));
const ServiceScope_1 = __importDefault(require("./ServiceScope"));
class ServiceCollection {
    constructor() {
        this.IServiceCollection = dijs_abstractions_1.IServiceCollectionIdentifier;
        this._serviceDescriptors = {};
        this.RegisterInstance(dijs_abstractions_1.ServiceRegistrationMode.Single, dijs_abstractions_1.IServiceCollectionIdentifier, this);
    }
    _registerService(registrationMode, serviceType, serviceIdentifier, serviceConstructor) {
        switch (registrationMode) {
            case dijs_abstractions_1.ServiceRegistrationMode.Overwrite:
                this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor_1.default(serviceIdentifier, serviceType, serviceConstructor);
                break;
            case dijs_abstractions_1.ServiceRegistrationMode.Single:
                if (this._serviceDescriptors[serviceIdentifier] != undefined) {
                    throw new ServiceIdentifierAlreadyInUse_1.default(`Service with identifier '${serviceIdentifier.description}' is already registered.`);
                }
                this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor_1.default(serviceIdentifier, serviceType, serviceConstructor);
                break;
            case dijs_abstractions_1.ServiceRegistrationMode.Multiple:
                if (this._serviceDescriptors[serviceIdentifier] == undefined) {
                    this._serviceDescriptors[serviceIdentifier] = new ServiceDescriptor_1.default(serviceIdentifier, serviceType, serviceConstructor);
                }
                else {
                    if (serviceType != this._serviceDescriptors[serviceIdentifier].ServiceType) {
                        throw new InvalidServiceType_1.default(`${serviceType} <> ${this._serviceDescriptors[serviceIdentifier].ServiceType}`);
                    }
                    this._serviceDescriptors[serviceIdentifier].ServiceConstructors.push(serviceConstructor);
                }
                break;
            default:
                throw new Error("Invalid service registration mode.");
        }
    }
    RegisterInstance(registrationMode, interfaceIdentifier, instance) {
        this._registerService(registrationMode, dijs_abstractions_1.ServiceType.Instance, interfaceIdentifier, () => instance);
    }
    RegisterClass(registrationMode, serviceType, interfaceIdentifier, classType, constructor) {
        this._registerService(registrationMode, serviceType, interfaceIdentifier, (serviceProvider, name) => constructor == undefined ? new classType() : constructor(classType, serviceProvider, name));
    }
    RegisterFactory(registrationMode, serviceType, interfaceIdentifier, factory) {
        this._registerService(registrationMode, serviceType, interfaceIdentifier, (serviceProvider, name) => factory(serviceProvider, name));
    }
    CreateServiceProvider() {
        const serviceDescriptorsClone = {};
        const keys = Object.getOwnPropertySymbols(this._serviceDescriptors);
        for (let key of keys) {
            serviceDescriptorsClone[key] = this._serviceDescriptors[key].Clone();
        }
        const serviceProvider = new ServiceScope_1.default(null, serviceDescriptorsClone);
        return serviceProvider;
    }
}
exports.default = ServiceCollection;
//# sourceMappingURL=ServiceCollection.js.map