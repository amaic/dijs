"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IClonable_1 = require("../interfaces/IClonable");
class ServiceDescriptor {
    constructor(serviceIdentifier, serviceType, serviceConstructor) {
        this.ICloneable = IClonable_1.ICloneableIdentifier;
        this.ServiceIdentifier = serviceIdentifier;
        this.ServiceType = serviceType;
        this.ServiceConstructors = new Array(serviceConstructor);
    }
    Clone() {
        const clone = Object.assign({}, this);
        clone.ServiceConstructors = [...this.ServiceConstructors];
        return clone;
    }
}
exports.default = ServiceDescriptor;
//# sourceMappingURL=ServiceDescriptor.js.map