export default interface ICloneable
{
    ICloneable: symbol;

    Clone(): any;
}

export const ICloneableIdentifier = Symbol("ICloneable");

export function IsICloneable(instance: any): instance is ICloneable
{
    return instance?.ICloneable === ICloneableIdentifier;
}