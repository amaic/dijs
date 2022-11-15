export default class InstanceNameMandatory extends Error
{
    constructor(message: string = "Instance name mandatory.")
    {
        super(message);
    }
}