export default interface ICloneable {
    ICloneable: symbol;
    Clone(): any;
}
export declare const ICloneableIdentifier: unique symbol;
export declare function IsICloneable(instance: any): instance is ICloneable;
//# sourceMappingURL=IClonable.d.ts.map