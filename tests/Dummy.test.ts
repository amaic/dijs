describe("Dummy", () =>
{
    test("dummy", () =>
    {
        interface ITest1
        {
            Prop1: string;
            get Getter1(): string;
            Method1(param1: string, param2: number): boolean;
            Prop2: Date;
        }

        class Test1 implements ITest1
        {
            Prop1: string;
            get Getter1(): string
            {
                throw new Error("Method not implemented.");
            }
            Method1(param1: string, param2: number): boolean
            {
                throw new Error("Method not implemented.");
            }
            Prop2: Date;

        }

        class Test2 
        {
            Method1(): void { }
            get Getter1(): string
            {
                throw new Error("Method not implemented.");
            }
        }

        type ITest1Type = keyof ITest1;

        let x: ITest1Type = "Getter1";

    });

    test("objects and symbol properties", () =>
    {
        const symbol1: unique symbol = Symbol("1");

        const object = { [symbol1]: "Hallo Welt" };


        const keys = Object.getOwnPropertySymbols(object);
        
        for(let key of keys)
        {
            console.debug(object[key]);
        }
    })
});

