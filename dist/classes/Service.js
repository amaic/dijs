"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceType_1 = require("../types/ServiceType");
const InstanceNameNotAvailableError_1 = __importDefault(require("../errors/InstanceNameNotAvailableError"));
const InstanceNameMandatory_1 = __importDefault(require("../errors/InstanceNameMandatory"));
const UnknownServiceIdentifierError_1 = __importDefault(require("../errors/UnknownServiceIdentifierError"));
class Service {
    constructor(serviceProvider, serviceDescriptor) {
        this._instances = {};
        this._serviceProvider = serviceProvider;
        this._serviceDescriptor = serviceDescriptor;
    }
    GetInstance(instanceName) {
        switch (this._serviceDescriptor.ServiceType) {
            case ServiceType_1.ServiceType.Instance:
            case ServiceType_1.ServiceType.Singleton:
            case ServiceType_1.ServiceType.Transient:
            case ServiceType_1.ServiceType.Scoped:
                if (instanceName !== undefined)
                    throw new InstanceNameNotAvailableError_1.default(`Service is of type '${this._serviceDescriptor.ServiceType}' and parameter 'instanceName' must be null.`);
                break;
            case ServiceType_1.ServiceType.Named:
            case ServiceType_1.ServiceType.NamedScoped:
                if (instanceName === undefined || instanceName.isEmptyOrWhitespace())
                    throw new InstanceNameMandatory_1.default(`Service is of type '${this._serviceDescriptor.ServiceType}' and parameter 'name' must not be null, empty or whitespace.`);
                break;
            default:
                break;
        }
        switch (this._serviceDescriptor.ServiceType) {
            case ServiceType_1.ServiceType.Instance:
            case ServiceType_1.ServiceType.Transient:
                return this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
            case ServiceType_1.ServiceType.Singleton:
            case ServiceType_1.ServiceType.Scoped:
                if (this._instances[""] === undefined) {
                    this._instances[""] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
                }
                return this._instances[""];
            case ServiceType_1.ServiceType.Named:
            case ServiceType_1.ServiceType.NamedScoped:
                if (instanceName !== undefined) {
                    if (this._instances[instanceName] === undefined) {
                        this._instances[instanceName] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
                    }
                    return this._instances[instanceName];
                }
            default:
                throw new UnknownServiceIdentifierError_1.default();
        }
    }
}
exports.default = Service;
//# sourceMappingURL=Service.js.map