export default class InvalidServiceType extends Error
{
    constructor(message:string = "With multiple registration mode all services must be of same service type.")
    {
        super(message);
    }
}