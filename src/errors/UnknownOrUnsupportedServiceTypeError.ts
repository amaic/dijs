export default class UnknownOrUnsupportedServiceTypeError extends Error
{
    constructor(message:string = "Unknown or unsupported service type.")
    {
        super(message);
    }
}