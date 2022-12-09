import { IServiceProvider } from "@amaic/dijs-abstractions";

export type ServiceConstructorFunction<CLASS> = (serviceProvider: IServiceProvider, name?: string) => CLASS;