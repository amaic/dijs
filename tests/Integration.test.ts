import '../src';
import { ServiceCollection } from '../src';
import IInterfaceInfo from '../src/interfaces/IInterfaceInfo';
import IServiceCollection from '../src/interfaces/IServiceCollection';
import { ServiceType } from '../src/types/ServiceType';

describe("Integration", () =>
{
    test("all features", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        registerServices(sc);
    });
});

function registerServices(sc: IServiceCollection)
{
    sc.Register<ILogger, typeof ILoggerInfo, typeof Logger>(ServiceType.Singleton, ILoggerInfo, Logger);
}



interface ILogger
{
    ILogger: symbol;

    LogMessage(message: string): void;
}

const ILoggerIdentifier = Symbol();

class ILoggerInfo implements IInterfaceInfo<ILogger>
{
    Identifier: symbol = ILoggerIdentifier;
    ImplementsInterface(instance: any): instance is ILogger
    {
        return instance.ILogger === ILoggerIdentifier;
    }
}

class Logger implements ILogger
{
    ILogger: symbol = ILoggerIdentifier;
    LogMessage(message: string)
    {
        console.log(message);
    }

}