interface String
{
    isEmptyOrWhitespace(): boolean;
}

String.prototype.isEmptyOrWhitespace = function ()
{
    return this.match(/^ *$/) !== null;
}