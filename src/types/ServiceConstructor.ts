export type ServiceConstructor<Class> = { new(...args: any[]): Class; };

export type ServiceConstructorTypedParameters<Class, Parameters> = { new(parameters: Parameters): Class; };
