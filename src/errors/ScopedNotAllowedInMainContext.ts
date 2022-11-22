export default class ScopedNotAllowedInMainContext extends Error
{
    constructor(message:string = "Scoped service type not allowed in main context.")
    {
        super(message);
    }
}