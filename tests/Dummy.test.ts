describe("Dummy", () =>
{
    test("try new schema", () =>
    {
        interface IInterfaceProxy<INTERFACE>
        {
            readonly Identifier: string;

            TestIfInterfaceIsImplemented(instance: any): instance is INTERFACE;

            Interface(): INTERFACE;
        }

        interface ITest1
        {
            ITest1: true;

            AMethod(): string;
        }

        class ITest1Proxy implements IInterfaceProxy<ITest1>
        {
            readonly Identifier: string = "ITest1";

            TestIfInterfaceIsImplemented(instance: any): instance is ITest1
            {
                return instance?.ITest1 === true;
            }

            Interface(): ITest1
            {
                throw new Error("This method is not intended to be called.");
            }

        }

        class Test1 implements ITest1
        {
            ITest1: true = true;

            AMethod(): string
            {
                return "Test1";
            }

        }

        const services: { [identifier: symbol]: any } = {};

        function registerService<
            INTERFACE,
            INTERFACEPROXY extends { new(): IInterfaceProxy<INTERFACE> },
            CLASS extends { new(): INTERFACE }
        >(interfaceProxyType: INTERFACEPROXY, classType: CLASS)
        {
            const interfaceProxy = new interfaceProxyType();
            const instance = new classType();

            services[interfaceProxy.Identifier] = instance;
        }

        function getService<INTERFACE>(interfaceProxyType: { new(): IInterfaceProxy<INTERFACE> }): INTERFACE
        {
            const interfaceProxy = new interfaceProxyType();

            const instance = services[interfaceProxy.Identifier];

            if (interfaceProxy.TestIfInterfaceIsImplemented(instance) == false)
                throw new Error("Instance does not implement interface.");

            return instance;    
        }

        registerService<ITest1, typeof ITest1Proxy, typeof Test1>(ITest1Proxy, Test1);

        const service = getService<ITest1>(ITest1Proxy);

        console.debug(service.AMethod());
    });
});

