import '../src';
import ServiceCollection from "../src/classes/ServiceCollection";
import { ServiceType } from "../src/types/ServiceType";
import ServiceIdentifierAlreadyInUseError from "../src/errors/ServiceIdentifierAlreadyInUseError";
import ScopedNotAllowedInMainContext from "../src/errors/ScopedNotAllowedInMainContext";

describe("Service", () =>
{
    test("singleton: registration without parameters, creating instance", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.Singleton, ITest1Identifier, Test1_a);

        const test1_a_a = sp.GetService(ITest1Identifier);

        expect(test1_a_a).toBeInstanceOf(Test1_a);
        expect(IsITest1(test1_a_a)).toBeTruthy();
    });

    test("singleton: conflicting registration", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.Singleton, ITest1Identifier, Test1_a);

        expect(() =>
        {
            sc.Register<ITest1, typeof Test1_a>(ServiceType.Singleton, ITest1Identifier, Test1_a);
        })
            .toThrowError(ServiceIdentifierAlreadyInUseError);
    });

    test("singleton: different registrations", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.Singleton, ITest1Identifier, Test1_a);
        sc.Register<ITest2, typeof Test2_a>(ServiceType.Singleton, ITest2Identifier, Test2_a);

        const test1_a_a = sp.GetService(ITest1Identifier);
        const test2_a_a = sp.GetService(ITest2Identifier);

        expect(test1_a_a).toBeInstanceOf(Test1_a);
        expect(IsITest1(test1_a_a)).toBeTruthy();

        expect(test2_a_a).toBeInstanceOf(Test2_a);
        expect(IsITest2(test2_a_a)).toBeTruthy();

        expect(test2_a_a).not.toBe(test1_a_a);
        expect(IsITest1(test2_a_a)).toBeFalsy();
        expect(IsITest2(test1_a_a)).toBeFalsy();
    });

    test("scoped: not allowed in global context", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.Scoped, ITest1Identifier, Test1_a);

        expect(() =>
        {
            sp.GetService(ITest1Identifier);
        })
            .toThrowError(ScopedNotAllowedInMainContext);
    });

    test("scoped: register, create scope, get service", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.Scoped, ITest1Identifier, Test1_a);

        const scopeContext1 = sp.CreateScope();
        const scopeContext2 = sp.CreateScope();

        const test1_a_SC1 = scopeContext1.GetService(ITest1Identifier);
        const test1_b_SC1 = scopeContext1.GetService(ITest1Identifier);

        const test1_a_SC2 = scopeContext2.GetService(ITest1Identifier);
        const test1_b_SC2 = scopeContext2.GetService(ITest1Identifier);

        expect(test1_a_SC1).toBeInstanceOf(Test1_a);
        expect(test1_b_SC1).toBeInstanceOf(Test1_a);
        expect(test1_a_SC2).toBeInstanceOf(Test1_a);
        expect(test1_b_SC2).toBeInstanceOf(Test1_a);

        expect(test1_b_SC1).toBe(test1_a_SC1);
        expect(test1_b_SC2).toBe(test1_a_SC2);
        expect(test1_a_SC2).not.toBe(test1_a_SC1);
        expect(test1_b_SC2).not.toBe(test1_b_SC1);
    });

    test("transient: register, get service", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.Transient, ITest1Identifier, Test1_a);

        const test1_a_1 = sp.GetService(ITest1Identifier);
        const test1_a_2 = sp.GetService(ITest1Identifier);
        const test1_a_3 = sp.GetService(ITest1Identifier);

        expect(test1_a_1).toBeInstanceOf(Test1_a);
        expect(test1_a_2).toBeInstanceOf(Test1_a);
        expect(test1_a_3).toBeInstanceOf(Test1_a);

        expect(test1_a_2).not.toBe(test1_a_1);
        expect(test1_a_3).not.toBe(test1_a_1);
        expect(test1_a_3).not.toBe(test1_a_2);
    });

    test("named: register, get service", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.Named, ITest1Identifier, Test1_a);

        const test1_a_1_name1 = sp.GetService(ITest1Identifier, "name1");
        const test1_a_2_name1 = sp.GetService(ITest1Identifier, "name1");

        const test1_a_1_name2 = sp.GetService(ITest1Identifier, "name2");
        const test1_a_2_name2 = sp.GetService(ITest1Identifier, "name2");

        expect(test1_a_2_name1).toBe(test1_a_2_name1);
        expect(test1_a_2_name2).toBe(test1_a_2_name2);

        expect(test1_a_1_name2).not.toBe(test1_a_1_name1);
    });

    test("named scoped: register, get service", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(ServiceType.NamedScoped, ITest1Identifier, Test1_a);

        expect(() =>
        {
            sp.GetService(ITest1Identifier, "name1");
        })
            .toThrowError(ScopedNotAllowedInMainContext);

        const scope1 = sp.CreateScope();
        const scope2 = sp.CreateScope();

        const test1_a_1_name1_scope1 = scope1.GetService(ITest1Identifier, "name1");
        const test1_a_2_name1_scope1 = scope1.GetService(ITest1Identifier, "name1");
        const test1_a_1_name1_scope2 = scope2.GetService(ITest1Identifier, "name1");

        const test1_a_1_name2_scope1 = scope1.GetService(ITest1Identifier, "name2");
        const test1_a_2_name2_scope1 = scope1.GetService(ITest1Identifier, "name2");
        const test1_a_1_name2_scope2 = scope2.GetService(ITest1Identifier, "name2");

        expect(test1_a_2_name1_scope1).toBe(test1_a_1_name1_scope1);
        expect(test1_a_1_name1_scope2).not.toBe(test1_a_1_name1_scope1);

        expect(test1_a_2_name2_scope1).toBe(test1_a_1_name2_scope1);
        expect(test1_a_1_name2_scope2).not.toBe(test1_a_1_name2_scope1);
    });

    test("mixed with parameters", () =>
    {
        const sc = new ServiceCollection();
        const sp = sc.GetServiceProvider();

        sc.Register<ITest1, typeof Test1_a>(
            ServiceType.Transient, ITest1Identifier, Test1_a
        );

        sc.Register<ITest2, typeof Test2_a>(
            ServiceType.Transient, ITest2Identifier, Test2_a
        );

        sc.Register<ITest3, typeof Test3_a>(
            ServiceType.Scoped, ITest3Identifier, Test3_a, (classType, serviceProvider) => new classType(
                serviceProvider.GetService(ITest1Identifier),
                serviceProvider.GetService(ITest2Identifier)
            )
        );

        sc.Register<ITest4, typeof Test4_a>(
            ServiceType.Singleton, ITest4Identifier, Test4_a, (classType, serviceProvider) => new classType(
                serviceProvider.GetService(ITest3Identifier)
            )
        );

        const scope = sp.CreateScope();

        const test3_a_1 = scope.GetService(ITest3Identifier);

        expect(test3_a_1).toBeInstanceOf(Test3_a);
        expect(IsITest3(test3_a_1)).toBeTruthy();

        expect(test3_a_1.test1).toBeInstanceOf(Test1_a);
        expect(test3_a_1.test2).toBeInstanceOf(Test2_a);

        expect(() => sp.GetService(ITest4Identifier))
            .toThrowError(ScopedNotAllowedInMainContext);
    });
});

interface ITest1
{
    ITest1: symbol;
}
const ITest1Identifier: symbol = Symbol("ITest1");
class Test1_a implements ITest1
{
    ITest1: symbol = ITest1Identifier;
}
function IsITest1(instance: any): instance is ITest1
{
    return instance?.ITest1 === ITest1Identifier;
}

interface ITest2
{
    ITest2: symbol;
}
const ITest2Identifier = Symbol("ITest2");
class Test2_a implements ITest2
{
    ITest2: symbol = ITest2Identifier;

}
function IsITest2(instance: any): instance is ITest2
{
    return instance?.ITest2 === ITest2Identifier;
}


interface ITest3
{
    ITest3: symbol;
}
const ITest3Identifier = Symbol("ITest3");
class Test3_a implements ITest3
{
    ITest3: symbol = ITest3Identifier;

    constructor(public test1: ITest1, public test2: ITest2) 
    {

    }
}
function IsITest3(instance: any): instance is ITest3
{
    return instance?.ITest3 === ITest3Identifier;
}

interface ITest4
{
    ITest4: symbol;
}
const ITest4Identifier = Symbol("ITest4");
class Test4_a implements ITest4
{
    ITest4: symbol = ITest4Identifier;

    constructor(public test3: ITest3) 
    {

    }
}
function IsITest4(instance: any): instance is ITest4
{
    return instance?.ITest4 === ITest4Identifier;
}
