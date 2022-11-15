export default class ServiceIdentifierAlreadyInUseError extends Error
{
    constructor(message: string = "Service identifier already in use.")
    {
        super(message);
    }
}