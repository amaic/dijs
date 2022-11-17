export default interface InterfaceProxy<INTERFACE> {
    Identifier: symbol;
    ImplementsInterface(implementation: any): implementation is INTERFACE;
}
//# sourceMappingURL=InterfaceProxy.d.ts.map