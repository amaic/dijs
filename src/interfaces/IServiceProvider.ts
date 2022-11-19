import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";

export default interface IServiceProvider
{
    GetService(serviceIdentifier: symbol, interfaceName?: string): any;

    GetService<INTERFACE>(serviceIdentifier: symbol, interfaceName?: string): INTERFACE;
}