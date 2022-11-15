export default interface IServiceProvider
{
    GetService<Interface>(serviceIdentifier: symbol, name?: string): Interface;
}