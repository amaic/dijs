import { CLASS_TYPES } from '@babel/types';
import { ServiceCollection } from '../src';
import IServiceProvider from '../src/interfaces/IServiceProvider';
import { ServiceType } from '../src/types/ServiceType';

describe("Multiple implementations of the same interface.", () =>
{
    test("Example1: factory", () =>
    {
        enum MathOperationType
        {
            Add = 0,
            Subtract = 1,
            Multiply = 2,
            Divide = 3
        }

        class OperationRequest
        {
            private _OperationType: MathOperationType;
            public get OperationType(): MathOperationType
            {
                return this._OperationType;
            }
            public set OperationType(value: MathOperationType)
            {
                this._OperationType = value;
            }
        }

        interface IMathOperationRepository
        {
            PerformOperation(opRequest: OperationRequest): number;
        }

        const AddOperationRepositoryIdentifier = Symbol();
        class AddOperationRepository implements IMathOperationRepository
        {
            PerformOperation(opRequest: OperationRequest): number
            {
                throw new Error('Method not implemented.');
            }

        }
        const SubtractOperationRepositoryIdentifier = Symbol();
        class SubtractOperationRepository implements IMathOperationRepository
        {
            PerformOperation(opRequest: OperationRequest): number
            {
                throw new Error('Method not implemented.');
            }

        }
        const MultiplyOperationRepositoryIdentifier = Symbol();
        class MultiplyOperationRepository implements IMathOperationRepository
        {
            PerformOperation(opRequest: OperationRequest): number
            {
                throw new Error('Method not implemented.');
            }

        }
        const DivideOperationRepositoryIdentifier = Symbol();
        class DivideOperationRepository implements IMathOperationRepository
        {
            PerformOperation(opRequest: OperationRequest): number
            {
                throw new Error('Method not implemented.');
            }

        }

        const IMathOperationRepositoryFactoryIdentifier = Symbol();
        interface IMathOperationRepositoryFactory
        {
            GetRepository(mathOperationType: MathOperationType): IMathOperationRepository;
        }
        class MathOperationRepositoryFactory implements IMathOperationRepositoryFactory
        {
            constructor(private serviceProvider: IServiceProvider)
            {
            }

            GetRepository(mathOperationType: MathOperationType): IMathOperationRepository
            {
                switch (mathOperationType)
                {
                    case MathOperationType.Add:
                        return this.serviceProvider.GetService(AddOperationRepositoryIdentifier);
                    case MathOperationType.Subtract:
                        return this.serviceProvider.GetService(SubtractOperationRepositoryIdentifier);
                    case MathOperationType.Multiply:
                        return this.serviceProvider.GetService(MultiplyOperationRepositoryIdentifier);
                    case MathOperationType.Divide:
                        return this.serviceProvider.GetService(DivideOperationRepositoryIdentifier);
                    default:
                        throw new Error("KeyNotFoundException");
                }
            }
        }


        const sc = new ServiceCollection();

        sc.Register<AddOperationRepository, typeof AddOperationRepository>(ServiceType.Transient, AddOperationRepositoryIdentifier, AddOperationRepository);
        sc.Register<SubtractOperationRepository, typeof SubtractOperationRepository>(ServiceType.Transient, SubtractOperationRepositoryIdentifier, SubtractOperationRepository);
        sc.Register<MultiplyOperationRepository, typeof MultiplyOperationRepository>(ServiceType.Transient, MultiplyOperationRepositoryIdentifier, MultiplyOperationRepository);
        sc.Register<DivideOperationRepository, typeof DivideOperationRepository>(ServiceType.Transient, DivideOperationRepositoryIdentifier, DivideOperationRepository);

        sc.Register<IMathOperationRepositoryFactory, typeof MathOperationRepositoryFactory>(ServiceType.Transient, IMathOperationRepositoryFactoryIdentifier, MathOperationRepositoryFactory, (classType, sp) =>
            new classType(sp)
        );

        const sp = sc.GetServiceProvider();

        const factory = sp.GetService<IMathOperationRepositoryFactory>(IMathOperationRepositoryFactoryIdentifier);

        const multiply = factory.GetRepository(MathOperationType.Multiply);


    });
});