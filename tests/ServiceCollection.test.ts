import ServiceCollection from '../src/classes/ServiceCollection'
import IServiceCollection, { IServiceCollectionIdentifier } from '../src/interfaces/IServiceCollection';
import { ServiceType } from '../src/types/ServiceType';

describe("ServiceCollection", () =>
{
    test("construct and self reference", () =>
    {
        const serviceCollection1 = new ServiceCollection();

        const serviceProvider = serviceCollection1.GetServiceProvider();

        const serviceCollection2 = serviceProvider.GetService<IServiceCollection>(IServiceCollectionIdentifier);

        expect(serviceCollection2.IServiceCollection).toBe(IServiceCollectionIdentifier);

        expect(serviceCollection2).toBe(serviceCollection1);

        const serviceCollection3 = serviceProvider.GetService(IServiceCollectionIdentifier);

        expect(serviceCollection3.IServiceCollection).toBe(IServiceCollectionIdentifier);

        expect(serviceCollection3).toBe(serviceCollection1);

    });

    test("register service and retrieve service", () =>
    {
        interface ITest1
        {
            ITest1: symbol;

            GetValue(): string;
        }

        const ITest1Identifier = Symbol("ITest1");

        class Test1 implements ITest1
        {
            readonly ITest1: symbol = ITest1Identifier;

            GetValue(): string
            {
                return "Test1";
            }
        }

        function IsITest1(instance: any): instance is ITest1
        {
            return instance?.ITest1 === ITest1Identifier;
        }


        const serviceCollection = new ServiceCollection();

        const serviceProvider = serviceCollection.GetServiceProvider();


        serviceCollection.RegisterConstructor<ITest1, typeof Test1>(ServiceType.Singleton, ITest1Identifier, Test1);

        const test1 = serviceProvider.GetService<ITest1>(ITest1Identifier);

        expect(IsITest1(test1)).toBeTruthy();

    });
});