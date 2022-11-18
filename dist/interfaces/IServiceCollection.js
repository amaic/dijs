"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IServiceCollectionInfo = exports.IServiceCollectionIdentifier = void 0;
exports.IServiceCollectionIdentifier = Symbol("IServiceCollection");
class IServiceCollectionInfo {
    constructor() {
        this.Identifier = exports.IServiceCollectionIdentifier;
    }
    ImplementsInterface(instance) {
        return (instance === null || instance === void 0 ? void 0 : instance.IServiceCollection) === exports.IServiceCollectionIdentifier;
    }
}
exports.IServiceCollectionInfo = IServiceCollectionInfo;
//# sourceMappingURL=IServiceCollection.js.map