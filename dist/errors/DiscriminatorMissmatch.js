"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscriminatorMissmatch extends Error {
    constructor(message = "Discriminator of interface and instance do not match.") {
        super(message);
    }
}
exports.default = DiscriminatorMissmatch;
//# sourceMappingURL=DiscriminatorMissmatch.js.map