export default class ServiceIdentifierAlreadyInUse extends Error
{
    constructor(message: string = "Service identifier already in use.")
    {
        super(message);
    }
}