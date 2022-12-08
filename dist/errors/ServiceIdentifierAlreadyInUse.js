"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceIdentifierAlreadyInUse extends Error {
    constructor(message = "Service identifier already in use.") {
        super(message);
    }
}
exports.default = ServiceIdentifierAlreadyInUse;
//# sourceMappingURL=ServiceIdentifierAlreadyInUse.js.map