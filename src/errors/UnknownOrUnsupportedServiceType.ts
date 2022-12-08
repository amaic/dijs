export default class UnknownOrUnsupportedServiceType extends Error
{
    constructor(message:string = "Unknown or unsupported service type.")
    {
        super(message);
    }
}