"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsICloneable = exports.ICloneableIdentifier = void 0;
exports.ICloneableIdentifier = Symbol("ICloneable");
function IsICloneable(instance) {
    return (instance === null || instance === void 0 ? void 0 : instance.ICloneable) === exports.ICloneableIdentifier;
}
exports.IsICloneable = IsICloneable;
//# sourceMappingURL=IClonable.js.map