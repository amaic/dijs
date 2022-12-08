export default class InstanceNameNotAvailable extends Error
{
    constructor(message: string = "Instance name not available.")
    {
        super(message);
    }
}