export default interface IServiceProvider {
    get IsMainContext(): boolean;
    GetService(serviceIdentifier: symbol, instanceName?: string): any;
    GetService<INTERFACE>(serviceIdentifier: symbol, instanceName?: string): INTERFACE;
    CreateScope(): IServiceProvider;
}
//# sourceMappingURL=IServiceProvider.d.ts.map