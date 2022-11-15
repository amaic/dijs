export default class InstanceNameNotAvailableError extends Error
{
    constructor(message: string = "Instance name not available.")
    {
        super(message);
    }
}