"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnknownOrUnsupportedServiceTypeError_1 = __importDefault(require("../errors/UnknownOrUnsupportedServiceTypeError"));
const UnknownServiceIdentifierError_1 = __importDefault(require("../errors/UnknownServiceIdentifierError"));
const ServiceType_1 = require("../types/ServiceType");
const Service_1 = __importDefault(require("./Service"));
class ServiceScope {
    constructor(parentScope, getServiceDescriptor) {
        this._services = {};
        this._parentScope = parentScope;
        this._getServiceDescriptor = getServiceDescriptor;
    }
    _getService(serviceDescriptor) {
        switch (serviceDescriptor.ServiceType) {
            case ServiceType_1.ServiceType.Instance:
                return new Service_1.default(this, serviceDescriptor);
            case ServiceType_1.ServiceType.Singleton:
            case ServiceType_1.ServiceType.Named:
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
            case ServiceType_1.ServiceType.NamedScoped:
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
        const service = this._getService(serviceDescriptor);
        return service.GetInstance(instanceName);
    }
}
exports.default = ServiceScope;
//# sourceMappingURL=ServiceScope.js.map