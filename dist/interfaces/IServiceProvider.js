"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIServiceProvider = exports.IServiceProviderIdentifier = void 0;
exports.IServiceProviderIdentifier = Symbol("IServiceProvider");
function IsIServiceProvider(instance) {
    return (instance === null || instance === void 0 ? void 0 : instance.IServiceProvider) === exports.IServiceProviderIdentifier;
}
exports.IsIServiceProvider = IsIServiceProvider;
//# sourceMappingURL=IServiceProvider.js.map