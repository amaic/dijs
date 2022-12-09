"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScopedNotAllowedInMainContext_1 = __importDefault(require("../errors/ScopedNotAllowedInMainContext"));
const UnknownOrUnsupportedServiceType_1 = __importDefault(require("../errors/UnknownOrUnsupportedServiceType"));
const UnknownServiceIdentifierError_1 = __importDefault(require("../errors/UnknownServiceIdentifierError"));
const Service_1 = __importDefault(require("./Service"));
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
class ServiceScope {
    constructor(parentScope, serviceDescriptors) {
        this.IServiceProvider = dijs_abstractions_1.IServiceProviderIdentifier;
        this._services = {};
        this._parentScope = parentScope;
        this._serviceDescriptors = serviceDescriptors;
    }
    get IsMainContext() {
        return this._parentScope == null;
    }
    _getService(serviceDescriptor) {
        switch (serviceDescriptor.ServiceType) {
            case dijs_abstractions_1.ServiceType.Instance:
            case dijs_abstractions_1.ServiceType.Singleton:
            case dijs_abstractions_1.ServiceType.Named:
            case dijs_abstractions_1.ServiceType.Transient:
            case dijs_abstractions_1.ServiceType.TransientNamed:
                if (this._parentScope === null) {
                    if (this._services[serviceDescriptor.ServiceIdentifier] === undefined) {
                        this._services[serviceDescriptor.ServiceIdentifier] = new Service_1.default(this, serviceDescriptor);
                    }
                    return this._services[serviceDescriptor.ServiceIdentifier];
                }
                else {
                    return this._parentScope._getService(serviceDescriptor);
                }
            case dijs_abstractions_1.ServiceType.Scoped:
            case dijs_abstractions_1.ServiceType.ScopedNamed:
                if (this.IsMainContext) {
                    throw new ScopedNotAllowedInMainContext_1.default(`Scoped service type '${serviceDescriptor.ServiceIdentifier.description}' not allowed in main context.`);
                }
                if (this._services[serviceDescriptor.ServiceIdentifier] === undefined) {
                    this._services[serviceDescriptor.ServiceIdentifier] = new Service_1.default(this, serviceDescriptor);
                }
                return this._services[serviceDescriptor.ServiceIdentifier];
            default:
                throw new UnknownOrUnsupportedServiceType_1.default();
        }
    }
    GetService(serviceIdentifier, name) {
        const serviceDescriptor = this._serviceDescriptors[serviceIdentifier];
        if (serviceDescriptor === undefined)
            return null;
        const service = this._getService(serviceDescriptor);
        return service.GetInstance(name);
    }
    GetRequiredService(serviceIdentifier, name) {
        const serviceDescriptor = this._serviceDescriptors[serviceIdentifier];
        if (serviceDescriptor === undefined)
            throw new UnknownServiceIdentifierError_1.default(`Service with identifier '${serviceIdentifier.description}' not found.`);
        const service = this._getService(serviceDescriptor);
        return service.GetInstance(name);
    }
    GetServices(serviceIdentifier, name) {
        const serviceDescriptor = this._serviceDescriptors[serviceIdentifier];
        if (serviceDescriptor === undefined)
            return [];
        const service = this._getService(serviceDescriptor);
        return service.GetInstances(name);
    }
    GetRequiredServices(serviceIdentifier, name) {
        const serviceDescriptor = this._serviceDescriptors[serviceIdentifier];
        if (serviceDescriptor === undefined)
            throw new UnknownServiceIdentifierError_1.default(`Service with identifier '${serviceIdentifier.description}' not found.`);
        const service = this._getService(serviceDescriptor);
        return service.GetInstances(name);
    }
    CreateScope() {
        return new ServiceScope(this, this._serviceDescriptors);
    }
}
exports.default = ServiceScope;
//# sourceMappingURL=ServiceScope.js.map