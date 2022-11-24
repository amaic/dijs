"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIServiceCollection = exports.IServiceCollectionIdentifier = void 0;
exports.IServiceCollectionIdentifier = Symbol("IServiceCollection");
function IsIServiceCollection(instance) {
    return (instance === null || instance === void 0 ? void 0 : instance.IServiceCollection) === exports.IServiceCollectionIdentifier;
}
exports.IsIServiceCollection = IsIServiceCollection;
//# sourceMappingURL=IServiceCollection.js.map