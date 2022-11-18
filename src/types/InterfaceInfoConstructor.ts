import IInterfaceInfo from "../interfaces/IInterfaceInfo";

export type InterfaceInfoConstructor<INTERFACE> = { new(): IInterfaceInfo<INTERFACE> };