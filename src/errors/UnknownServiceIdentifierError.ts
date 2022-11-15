export default class UnknownServiceIdentifierError extends Error
{
    constructor(message: string = "Unknown service identifier.")
    {
        super(message);
    }
}