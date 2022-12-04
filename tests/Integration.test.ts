import '../src';
import { ServiceCollection } from '../src';
import { IServiceCollection, ServiceType } from "@amaic/dijs-abstractions";

describe("Integration", () =>
{
    test("all features", () =>
    {
        const sc = new ServiceCollection();

        registerServices(sc);
    });
});

function registerServices(sc: IServiceCollection)
{
    sc.RegisterClass<IServiceA, typeof ServiceA>(ServiceType.Singleton, IServiceAIdentifier, ServiceA);
    sc.RegisterClass<IServiceB, typeof ServiceB>(ServiceType.Scoped, IServiceBIdentifier, ServiceB);
    sc.RegisterClass<IServiceC, typeof ServiceC>(ServiceType.Transient, IServiceCIdentifier, ServiceC);
    sc.RegisterClass<IServiceD, typeof ServiceD>(ServiceType.Named, IServiceDIdentifier, ServiceD);
    sc.RegisterClass<IServiceE, typeof ServiceE>(ServiceType.ScopedNamed, IServiceEIdentifier, ServiceE);
    sc.RegisterClass<IServiceF, typeof ServiceF>(ServiceType.ScopedNamed, IServiceFIdentifier, ServiceF);


}



interface IServiceA
{
    IServiceA: symbol;
}
const IServiceAIdentifier = Symbol("IServiceA");
class ServiceA implements IServiceA
{
    IServiceA: symbol = IServiceAIdentifier;
}

interface IServiceB
{
    IServiceB: symbol;
}
const IServiceBIdentifier = Symbol("IServiceB");
class ServiceB implements IServiceB
{
    IServiceB: symbol = IServiceBIdentifier;
}

interface IServiceC
{
    IServiceC: symbol;
}
const IServiceCIdentifier = Symbol("IServiceC");
class ServiceC implements IServiceC
{
    IServiceC: symbol = IServiceCIdentifier;
}

interface IServiceD
{
    IServiceD: symbol;
}
const IServiceDIdentifier = Symbol("IServiceD");
class ServiceD implements IServiceD
{
    IServiceD: symbol = IServiceDIdentifier;
}

interface IServiceE
{
    IServiceE: symbol;
}
const IServiceEIdentifier = Symbol("IServiceE");
class ServiceE implements IServiceE
{
    IServiceE: symbol = IServiceEIdentifier;
}

interface IServiceF
{
    IServiceF: symbol;
}
const IServiceFIdentifier = Symbol("IServiceF");
class ServiceF implements IServiceF
{
    IServiceF: symbol = IServiceFIdentifier;
}
