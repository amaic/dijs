import { ServiceType } from '@amaic/dijs-abstractions';
import ServiceDescriptor from '../src/classes/ServiceDescriptor';
import IClone from '../src/interfaces/IClone';

describe("ServiceDescriptor", () =>
{
    test("clone", () =>
    {
        const serviceIdentifier = Symbol();
        const serviceType = ServiceType.ScopedNamed;

        const origin = new ServiceDescriptor(
            serviceIdentifier,
            serviceType,
            (sp, name) => `Hallo Welt! ${ name }`
        );

        origin.ServiceConstructors.push((sp, name) => `wie geht es Dir? ${name}`);

        const clonable: IClone = origin;

        const clone: ServiceDescriptor<string> = clonable.Clone();

        expect(clone).not.toBe(origin);
        expect(clone.ServiceIdentifier).toBe(origin.ServiceIdentifier);
        expect(clone.ServiceType).toBe(origin.ServiceType);
        expect(clone.ServiceConstructors).not.toBe(origin.ServiceConstructors);
        clone.ServiceConstructors.forEach(serviceConstructor => expect(origin.ServiceConstructors).toContain(serviceConstructor));

        (origin.ServiceType as any) = ServiceType.Instance;
        expect(clone.ServiceType).not.toBe(origin.ServiceType);

        expect(clone.ServiceConstructors[0]).toBe(origin.ServiceConstructors[0]);
        origin.ServiceConstructors[0] = (sp, name) => `Eine Änderung ${name}`;
        expect(clone.ServiceConstructors[0]).not.toBe(origin.ServiceConstructors[0]);
    });
})