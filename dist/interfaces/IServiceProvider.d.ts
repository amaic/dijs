import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";
export default interface IServiceProvider {
    GetService<INTERFACE>(serviceIdentifier: symbol, interfaceName?: string): INTERFACE;
    GetServiceV2<INTERFACE, INTERFACEINFO extends InterfaceInfoConstructor<INTERFACE>>(interfaceInfoType: INTERFACEINFO, instanceName?: string): INTERFACE;
}
//# sourceMappingURL=IServiceProvider.d.ts.map