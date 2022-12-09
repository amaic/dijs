"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InstanceNameNotAvailable_1 = __importDefault(require("../errors/InstanceNameNotAvailable"));
const InstanceNameMandatory_1 = __importDefault(require("../errors/InstanceNameMandatory"));
const UnknownServiceIdentifierError_1 = __importDefault(require("../errors/UnknownServiceIdentifierError"));
const dijs_abstractions_1 = require("@amaic/dijs-abstractions");
const InvalidServiceType_1 = __importDefault(require("../errors/InvalidServiceType"));
class Service {
    constructor(serviceProvider, serviceDescriptor) {
        this._instances = {};
        this._serviceProvider = serviceProvider;
        this._serviceDescriptor = serviceDescriptor;
    }
    _getInstance(serviceConstructorIndex, name) {
        let internalName;
        switch (this._serviceDescriptor.ServiceType) {
            case dijs_abstractions_1.ServiceType.Instance:
            case dijs_abstractions_1.ServiceType.Singleton:
            case dijs_abstractions_1.ServiceType.Transient:
            case dijs_abstractions_1.ServiceType.Scoped:
                if (name !== undefined)
                    throw new InstanceNameNotAvailable_1.default(`Service is of type '${this._serviceDescriptor.ServiceType}' and parameter 'instanceName' must be null.`);
                internalName = "";
                break;
            case dijs_abstractions_1.ServiceType.Named:
            case dijs_abstractions_1.ServiceType.ScopedNamed:
            case dijs_abstractions_1.ServiceType.TransientNamed:
                if (name == undefined || name.isEmptyOrWhitespace())
                    throw new InstanceNameMandatory_1.default(`Service is of type '${this._serviceDescriptor.ServiceType}' and parameter 'name' must not be null, empty or whitespace.`);
                internalName = name;
                break;
            default:
                throw new InvalidServiceType_1.default();
        }
        const serviceConstructor = this._serviceDescriptor.ServiceConstructors[serviceConstructorIndex];
        switch (this._serviceDescriptor.ServiceType) {
            case dijs_abstractions_1.ServiceType.Transient:
            case dijs_abstractions_1.ServiceType.TransientNamed:
                return serviceConstructor(this._serviceProvider, name);
            case dijs_abstractions_1.ServiceType.Instance:
            case dijs_abstractions_1.ServiceType.Singleton:
            case dijs_abstractions_1.ServiceType.Scoped:
            case dijs_abstractions_1.ServiceType.Named:
            case dijs_abstractions_1.ServiceType.ScopedNamed:
                if (this._instances[internalName] == undefined) {
                    this._instances[internalName] = new Array(this._serviceDescriptor.ServiceConstructors.length);
                }
                if (this._instances[internalName][serviceConstructorIndex] == undefined) {
                    this._instances[internalName][serviceConstructorIndex] = serviceConstructor(this._serviceProvider, name);
                }
                return this._instances[internalName][serviceConstructorIndex];
            default:
                throw new UnknownServiceIdentifierError_1.default();
        }
    }
    GetInstance(name) {
        const serviceConstructorIndex = this._serviceDescriptor.ServiceConstructors.length - 1;
        if (serviceConstructorIndex < 0) {
            throw new Error("Should not happen: no service constructor found.");
        }
        return this._getInstance(serviceConstructorIndex, name);
    }
    GetInstances(name) {
        const instances = [];
        for (let serviceConstructorIndex = 0; serviceConstructorIndex < this._serviceDescriptor.ServiceConstructors.length; serviceConstructorIndex++) {
            instances.push(this._getInstance(serviceConstructorIndex, name));
        }
        return instances;
    }
}
exports.default = Service;
//# sourceMappingURL=Service.js.map