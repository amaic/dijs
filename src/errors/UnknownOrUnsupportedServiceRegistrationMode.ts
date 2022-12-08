export default class UnknownOrUnsupportedServiceRegistrationModeError extends Error
{
    constructor(message:string = "Unknown or unsupported service registration mode.")
    {
        super(message);
    }
}