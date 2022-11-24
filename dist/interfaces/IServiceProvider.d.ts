export default interface IServiceProvider {
    IServiceProvider: symbol;
    get IsMainContext(): boolean;
    GetService(serviceIdentifier: symbol, instanceName?: string): any;
    GetService<INTERFACE>(serviceIdentifier: symbol, instanceName?: string): INTERFACE;
    CreateScope(): IServiceProvider;
}
export declare const IServiceProviderIdentifier: unique symbol;
export declare function IsIServiceProvider(instance: any): instance is IServiceProvider;
//# sourceMappingURL=IServiceProvider.d.ts.map