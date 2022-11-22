import { InterfaceInfoConstructor } from "../types/InterfaceInfoConstructor";

export default interface IServiceProvider
{
    get IsMainContext(): boolean;

    GetService(serviceIdentifier: symbol, instanceName?: string): any;

    GetService<INTERFACE>(serviceIdentifier: symbol, instanceName?: string): INTERFACE;

    CreateScope(): IServiceProvider;
}