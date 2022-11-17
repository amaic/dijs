import InterfaceProxy from "./InterfaceProxy";
export declare class IDemoProxy implements InterfaceProxy<IDemo> {
    constructor();
    Identifier: symbol;
    ImplementsInterface(instance: any): instance is IDemo;
}
export default interface IDemo {
    IDemo: true;
}
//# sourceMappingURL=IDemo.d.ts.map