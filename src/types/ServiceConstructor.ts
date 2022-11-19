export type ServiceConstructor<CLASS> = { new(...args: any[]): CLASS; };

export type ServiceConstructorTypedParameters<CLASS, PARAMETERS extends any[]> = { new(...args: PARAMETERS): CLASS; };
