"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScopedNotAllowedInMainContext extends Error {
    constructor(message = "Scoped service type not allowed in main context.") {
        super(message);
    }
}
exports.default = ScopedNotAllowedInMainContext;
//# sourceMappingURL=ScopedNotAllowedInMainContext.js.map