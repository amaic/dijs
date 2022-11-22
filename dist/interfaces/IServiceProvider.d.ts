export default interface IServiceProvider {
    get IsMainContext(): boolean;
    GetService(serviceIdentifier: symbol, interfaceName?: string): any;
    GetService<INTERFACE>(serviceIdentifier: symbol, interfaceName?: string): INTERFACE;
    CreateScope(): IServiceProvider;
}
//# sourceMappingURL=IServiceProvider.d.ts.map