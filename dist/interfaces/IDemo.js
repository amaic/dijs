"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDemoProxy = void 0;
class IDemoProxy {
    constructor() {
        this.Identifier = Symbol("IDemo");
    }
    ImplementsInterface(instance) {
        return instance.IDemo === true;
    }
}
exports.IDemoProxy = IDemoProxy;
//# sourceMappingURL=IDemo.js.map