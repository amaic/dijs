import ServiceCollection from '../src/classes/ServiceCollection'
import IInterfaceInfo from '../src/interfaces/IInterfaceInfo';
import IServiceCollection, { IServiceCollectionIdentifier, IServiceCollectionInfo } from '../src/interfaces/IServiceCollection';
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

        const ITestIdentitifier = Symbol("ITest1");

        class ITest1Info implements IInterfaceInfo<ITest1>
        {
            Identifier: symbol = ITestIdentitifier;

            ImplementsInterface(instance: any): instance is ITest1
            {
                return instance.ITest1 === ITestIdentitifier;
            }

        }

        class Test1 implements ITest1
        {
            readonly ITest1: symbol = ITestIdentitifier;

            GetValue(): string
            {
                return "Test1";
            }
        }


        const serviceCollection = new ServiceCollection();

        const serviceProvider = serviceCollection.GetServiceProvider();


        serviceCollection.Register<ITest1, typeof ITest1Info, typeof Test1>(ServiceType.Singleton, ITest1Info, Test1);

        const test1 = serviceProvider.GetService<ITest1>(ITestIdentitifier);

        const test1Info = new ITest1Info();

        expect(test1Info.ImplementsInterface(test1)).toBeTruthy();
        
    });
});