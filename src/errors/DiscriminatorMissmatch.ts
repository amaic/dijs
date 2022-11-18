export default class DiscriminatorMissmatch extends Error
{
    constructor(message: string = "Discriminator of interface and instance do not match.")
    {
        super(message);
    }
}