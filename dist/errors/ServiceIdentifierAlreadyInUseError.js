"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceIdentifierAlreadyInUseError extends Error {
    constructor(message = "Service identifier already in use.") {
        super(message);
    }
}
exports.default = ServiceIdentifierAlreadyInUseError;
//# sourceMappingURL=ServiceIdentifierAlreadyInUseError.js.map