"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidServiceType extends Error {
    constructor(message = "With multiple registration mode all services must be of same service type.") {
        super(message);
    }
}
exports.default = InvalidServiceType;
//# sourceMappingURL=InvalidServiceType.js.map