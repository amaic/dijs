export default interface IServiceProvider {
    GetService<Interface>(serviceIdentifier: symbol, name?: string): Interface;
}
//# sourceMappingURL=IServiceProvider.d.ts.map