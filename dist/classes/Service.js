"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InstanceNameNotAvailableError_1 = __importDefault(require("../errors/InstanceNameNotAvailableError"));
const InstanceNameMandatory_1 = __importDefault(require("../errors/InstanceNameMandatory"));
const UnknownServiceIdentifierError_1 = __importDefault(require("../errors/UnknownServiceIdentifierError"));
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
class Service {
    constructor(serviceProvider, serviceDescriptor) {
        this._instances = {};
        this._serviceProvider = serviceProvider;
        this._serviceDescriptor = serviceDescriptor;
    }
    GetInstance(name) {
        switch (this._serviceDescriptor.ServiceType) {
            case dijs_abstractions_1.ServiceType.Instance:
            case dijs_abstractions_1.ServiceType.Singleton:
            case dijs_abstractions_1.ServiceType.Transient:
            case dijs_abstractions_1.ServiceType.Scoped:
                if (name !== undefined)
                    throw new InstanceNameNotAvailableError_1.default(`Service is of type '${this._serviceDescriptor.ServiceType}' and parameter 'instanceName' must be null.`);
                name = "";
                break;
            case dijs_abstractions_1.ServiceType.Named:
            case dijs_abstractions_1.ServiceType.ScopedNamed:
            case dijs_abstractions_1.ServiceType.TransientNamed:
                if (name === undefined || name.isEmptyOrWhitespace())
                    throw new InstanceNameMandatory_1.default(`Service is of type '${this._serviceDescriptor.ServiceType}' and parameter 'name' must not be null, empty or whitespace.`);
                break;
            default:
                break;
        }
        switch (this._serviceDescriptor.ServiceType) {
            case dijs_abstractions_1.ServiceType.Transient:
                return this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
            case dijs_abstractions_1.ServiceType.TransientNamed:
                return this._serviceDescriptor.ServiceConstructor(this._serviceProvider, name);
            case dijs_abstractions_1.ServiceType.Instance:
            case dijs_abstractions_1.ServiceType.Singleton:
            case dijs_abstractions_1.ServiceType.Scoped:
                if (this._instances[""] === undefined) {
                    this._instances[""] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider);
                }
                return this._instances[""];
            case dijs_abstractions_1.ServiceType.Named:
            case dijs_abstractions_1.ServiceType.ScopedNamed:
                if (name !== undefined) {
                    if (this._instances[name] === undefined) {
                        this._instances[name] = this._serviceDescriptor.ServiceConstructor(this._serviceProvider, name);
                    }
                    return this._instances[name];
                }
            default:
                throw new UnknownServiceIdentifierError_1.default();
        }
    }
}
exports.default = Service;
//# sourceMappingURL=Service.js.map