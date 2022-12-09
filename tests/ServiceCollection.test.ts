import ServiceCollection from '../src/classes/ServiceCollection'
import { IServiceCollection, IServiceCollectionIdentifier, ServiceRegistrationMode, ServiceType } from "@amaic/dijs-abstractions";
import ServiceIdentifierAlreadyInUse from '../src/errors/ServiceIdentifierAlreadyInUse';
import ServiceScope from '../src/classes/ServiceScope';

describe("ServiceCollection", () =>
{
    test("construct and self reference", () =>
    {
        const serviceCollection1 = new ServiceCollection();

        const serviceProvider = serviceCollection1.CreateServiceProvider();

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

        serviceCollection.RegisterClass<ITest1, typeof Test1>(ServiceRegistrationMode.Single, ServiceType.Singleton, ITest1Identifier, Test1);

        const serviceProvider = serviceCollection.CreateServiceProvider();

        const test1 = serviceProvider.GetService<ITest1>(ITest1Identifier);

        expect(IsITest1(test1)).toBeTruthy();

    });

    test("registration modes: overwrite", () =>
    {
        const sc = new ServiceCollection();

        const interface1 = Symbol();

        sc.RegisterFactory(
            ServiceRegistrationMode.Single,
            ServiceType.Singleton,
            interface1,
            () => "A"
        );

        const sp1 = sc.CreateServiceProvider();

        expect(() =>
        {
            sc.RegisterFactory(
                ServiceRegistrationMode.Single,
                ServiceType.Singleton,
                interface1,
                () => "B"
            );
        }).toThrowError(ServiceIdentifierAlreadyInUse);

        sc.RegisterFactory(
            ServiceRegistrationMode.Overwrite,
            ServiceType.Singleton,
            interface1,
            () => "B"
        );

        const sp2 = sc.CreateServiceProvider();

        const serviceA = sp1.GetRequiredService(interface1);

        const serviceB = sp2.GetRequiredService(interface1);

        expect(serviceA).toBe("A");
        expect(serviceB).toBe("B");
    });

    test("registration modes: multiple", () =>
    {
        const sc = new ServiceCollection();

        const interface1 = Symbol();

        sc.RegisterFactory(
            ServiceRegistrationMode.Single,
            ServiceType.Singleton,
            interface1,
            () => "A"
        );

        sc.RegisterFactory(
            ServiceRegistrationMode.Multiple,
            ServiceType.Singleton,
            interface1,
            () => "B"
        );

        sc.RegisterFactory(
            ServiceRegistrationMode.Multiple,
            ServiceType.Singleton,
            interface1,
            () => "C"
        );

        const sp = sc.CreateServiceProvider() as ServiceScope;

        const latestRegisteredService = sp.GetRequiredService(interface1);

        expect(latestRegisteredService).toBe("C");

        const allServices = sp.GetRequiredServices(interface1);

        expect(allServices).toContain("A");
        expect(allServices).toContain("B");
        expect(allServices).toContain("C");

    });
});