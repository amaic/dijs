"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScopedNotAllowedInMainContext_1 = __importDefault(require("../errors/ScopedNotAllowedInMainContext"));
const UnknownOrUnsupportedServiceTypeError_1 = __importDefault(require("../errors/UnknownOrUnsupportedServiceTypeError"));
const UnknownServiceIdentifierError_1 = __importDefault(require("../errors/UnknownServiceIdentifierError"));
const IServiceProvider_1 = require("../interfaces/IServiceProvider");
const ServiceType_1 = require("../types/ServiceType");
const Service_1 = __importDefault(require("./Service"));
class ServiceScope {
    constructor(parentScope, getServiceDescriptor) {
        this.IServiceProvider = IServiceProvider_1.IServiceProviderIdentifier;
        this._services = {};
        this._parentScope = parentScope;
        this._getServiceDescriptor = getServiceDescriptor;
    }
    get IsMainContext() {
        return this._parentScope == null;
    }
    _getService(serviceDescriptor) {
        switch (serviceDescriptor.ServiceType) {
            case ServiceType_1.ServiceType.Instance:
            case ServiceType_1.ServiceType.Singleton:
            case ServiceType_1.ServiceType.Named:
            case ServiceType_1.ServiceType.Transient:
            case ServiceType_1.ServiceType.TransientNamed:
                if (this._parentScope === null) {
                    if (this._services[serviceDescriptor.ServiceIdentifier] === undefined) {
                        this._services[serviceDescriptor.ServiceIdentifier] = new Service_1.default(this, serviceDescriptor);
                    }
                    return this._services[serviceDescriptor.ServiceIdentifier];
                }
                else {
                    return this._parentScope._getService(serviceDescriptor);
                }
            case ServiceType_1.ServiceType.Scoped:
            case ServiceType_1.ServiceType.ScopedNamed:
                if (this._services[serviceDescriptor.ServiceIdentifier] === undefined) {
                    this._services[serviceDescriptor.ServiceIdentifier] = new Service_1.default(this, serviceDescriptor);
                }
                return this._services[serviceDescriptor.ServiceIdentifier];
            default:
                throw new UnknownOrUnsupportedServiceTypeError_1.default();
        }
    }
    GetService(serviceIdentifier, instanceName) {
        const serviceDescriptor = this._getServiceDescriptor(serviceIdentifier);
        if (serviceDescriptor === undefined)
            throw new UnknownServiceIdentifierError_1.default(`Service with identifier '${serviceIdentifier.description}' not found.`);
        switch (serviceDescriptor.ServiceType) {
            case ServiceType_1.ServiceType.Scoped:
            case ServiceType_1.ServiceType.ScopedNamed:
                if (this.IsMainContext) {
                    throw new ScopedNotAllowedInMainContext_1.default(`Scoped service type '${serviceIdentifier.description}' not allowed in main context.`);
                }
                break;
            default:
                break;
        }
        const service = this._getService(serviceDescriptor);
        return service.GetInstance(instanceName);
    }
    CreateScope() {
        return new ServiceScope(this, this._getServiceDescriptor);
    }
}
exports.default = ServiceScope;
//# sourceMappingURL=ServiceScope.js.map