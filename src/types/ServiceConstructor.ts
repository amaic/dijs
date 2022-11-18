export type ServiceConstructor<CLASS> = { new(...args: any[]): CLASS; };

export type ServiceConstructorTypedParameters<CLASS, PARAMETERS> = { new(parameters: PARAMETERS): CLASS; };
