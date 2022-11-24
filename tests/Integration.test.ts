import '../src';
import { ServiceCollection } from '../src';
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
    sc.Register<ILogger, typeof Logger>(ServiceType.Singleton, ILoggerIdentifier, Logger);
}



interface ILogger
{
    ILogger: symbol;

    LogMessage(message: string): void;
}

const ILoggerIdentifier = Symbol();

class Logger implements ILogger
{
    ILogger: symbol = ILoggerIdentifier;
    LogMessage(message: string)
    {
        console.log(message);
    }
}