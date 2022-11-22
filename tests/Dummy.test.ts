import { ServiceCollection } from '../src';
import { ServiceConstructor } from '../src/types/ServiceConstructor';

describe("Dummy", () =>
{
    test("dummy", () =>
    {
        const test1Instance = Create<Test1, typeof Test1>(Test1, (classType) => new classType("abc", 123, true));

    });
});

function Create<CLASS, CLASSTYPE extends ServiceConstructor<CLASS>>
    (
        classType: CLASSTYPE,
        create: (classType: CLASSTYPE) => CLASS
    ): CLASS
{
    return create(classType);
}


class Test1
{
    constructor(public param1: string, public param2: number, public param3: boolean)
    {

    }
}