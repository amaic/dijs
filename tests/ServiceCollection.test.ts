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

        expect(serviceCollection2.IServiceCollection).toBeTruthy();

        expect(serviceCollection2).toBe(serviceCollection1);
    });

    test("register service", () =>
    {
        const serviceCollection1 = new ServiceCollection();

        const ITestIdentitifier = Symbol();
        interface ITest1
        {
            GetValue(): string;
        }
        class Test1 implements ITest1
        {
            GetValue(): string
            {
                return "Test1";
            }
        }

        serviceCollection1.Register<ITest1, Test1>(ServiceType.Singleton, ITestIdentitifier, Test1);

        
    });
});