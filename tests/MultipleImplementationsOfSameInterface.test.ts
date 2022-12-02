import { ServiceCollection } from '../src';
import IServiceProvider from '../src/interfaces/IServiceProvider';
import { ServiceType } from '../src/types/ServiceType';

describe("Multiple implementations of the same interface.", () =>
{
    test("Example1: with RegisterFactory and service type Named", () =>
    {
        const sc = new ServiceCollection();

        sc.RegisterFactory<IInterface1>(ServiceType.Named, IInterface1Identifier, 
            (sp, name) =>
            {
                switch(name)
                {
                    case 'A': return new ImplementationA();
                    case 'B': return new ImplementationB();
                    case 'C': return new ImplementationC();
                    case 'D': return new ImplementationD();

                    default:
                        throw new Error("Unknown implementation");
                }
            });

        const sp = sc.GetServiceProvider();

        const implementationC = sp.GetService<IInterface1>(IInterface1Identifier, 'C');

        expect(implementationC).toBeInstanceOf(ImplementationC);
        expect(implementationC.DoSomething()).toBe("ImplementationC");
    });


    test("Example2: with RegisterClass and different identifiers", () =>
    {
        const ServiceIdentifier_A = Symbol();
        const ServiceIdentifier_B = Symbol();
        const ServiceIdentifier_C = Symbol();
        const ServiceIdentifier_D = Symbol();

        const sc = new ServiceCollection();

        sc.RegisterClass<IInterface1, typeof ImplementationA>(ServiceType.Transient, ServiceIdentifier_A, ImplementationA);
        sc.RegisterClass<IInterface1, typeof ImplementationB>(ServiceType.Transient, ServiceIdentifier_B, ImplementationB);
        sc.RegisterClass<IInterface1, typeof ImplementationC>(ServiceType.Transient, ServiceIdentifier_C, ImplementationC);
        sc.RegisterClass<IInterface1, typeof ImplementationD>(ServiceType.Transient, ServiceIdentifier_D, ImplementationC);

        const sp = sc.GetServiceProvider();

        const implementationC = sp.GetService<IInterface1>(ServiceIdentifier_C);

        expect(implementationC).toBeInstanceOf(ImplementationC);
        expect(implementationC.DoSomething()).toBe("ImplementationC");
    });

    test("Example3: with explicit factory class", () =>
    {
        const IFactoryIdentifier = Symbol();
        interface IFactory
        {
            IFactory: symbol;

            GetImplementation(implementationType: ImplementationType): IInterface1;
        }
        class Factory implements IFactory
        {
            IFactory: symbol = IFactoryIdentifier;

            constructor(private serviceProvider: IServiceProvider)
            {
            }

            GetImplementation(implementationType: ImplementationType): IInterface1
            {
                switch (implementationType)
                {
                    case ImplementationType.A:
                        return this.serviceProvider.GetService(ImplementationAIdentifier);

                    case ImplementationType.B:
                        return this.serviceProvider.GetService(ImplementationBIdentifier);

                    case ImplementationType.C:
                        return this.serviceProvider.GetService(ImplementationCIdentifier);

                    case ImplementationType.D:
                        return this.serviceProvider.GetService(ImplementationDIdentifier);

                    default:
                        throw new Error("implementation type not found");
                }
            }
        }


        const sc = new ServiceCollection();

        sc.RegisterClass<ImplementationA, typeof ImplementationA>(ServiceType.Transient, ImplementationAIdentifier, ImplementationA);
        sc.RegisterClass<ImplementationB, typeof ImplementationB>(ServiceType.Transient, ImplementationBIdentifier, ImplementationB);
        sc.RegisterClass<ImplementationC, typeof ImplementationC>(ServiceType.Transient, ImplementationCIdentifier, ImplementationC);
        sc.RegisterClass(ServiceType.Transient, ImplementationDIdentifier, ImplementationD);

        sc.RegisterClass<IFactory, typeof Factory>(ServiceType.Transient, IFactoryIdentifier, Factory, (classType, sp) =>
            new classType(sp)
        );

        const sp = sc.GetServiceProvider();

        const factory = sp.GetService<IFactory>(IFactoryIdentifier);

        const implementationC = factory.GetImplementation(ImplementationType.C);
        expect(implementationC).toBeInstanceOf(ImplementationC);
        expect(implementationC.DoSomething()).toBe("ImplementationC");

        const implementationD = factory.GetImplementation(ImplementationType.D);
        expect(implementationD).toBeInstanceOf(ImplementationD);
        expect(implementationD.DoSomething()).toBe("ImplementationD");
    });
});

const IInterface1Identifier = Symbol();
interface IInterface1
{
    IInterface1: symbol;
    DoSomething(): string;
}

enum ImplementationType
{
    A, B, C, D
}

const ImplementationAIdentifier = Symbol();
class ImplementationA implements IInterface1
{
    IInterface1: symbol = IInterface1Identifier;

    DoSomething(): string
    {
        return "ImplementationA";
    }
}

const ImplementationBIdentifier = Symbol();
class ImplementationB implements IInterface1
{
    IInterface1: symbol = IInterface1Identifier;

    DoSomething(): string
    {
        return "ImplementationB";
    }
}

const ImplementationCIdentifier = Symbol();
class ImplementationC implements IInterface1
{
    IInterface1: symbol = IInterface1Identifier;

    DoSomething(): string
    {
        return "ImplementationC";
    }
}

const ImplementationDIdentifier = Symbol();
class ImplementationD implements IInterface1
{
    IInterface1: symbol = IInterface1Identifier;

    DoSomething(): string
    {
        return "ImplementationD";
    }
}
