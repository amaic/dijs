export default interface IServiceProvider
{
    IServiceProvider: symbol;

    get IsMainContext(): boolean;

    GetService(serviceIdentifier: symbol, name?: string): any;

    GetService<INTERFACE>(serviceIdentifier: symbol, name?: string): INTERFACE;

    CreateScope(): IServiceProvider;
}

export const IServiceProviderIdentifier = Symbol("IServiceProvider");

export function IsIServiceProvider(instance: any): instance is IServiceProvider
{
    return instance?.IServiceProvider === IServiceProviderIdentifier;
}