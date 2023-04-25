import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Rua", 123, "08877130", "cidade");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Test find customer usecase", () => {
    
    it("should find a customer", async () => {
        const cr = MockRepository();
        const usecase = new FindCustomerUseCase(cr);

        const input = {
            id: "123"
        }

        const result = await usecase.execute(input);

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Rua",
                city: "cidade",
                number:123,
                zip: "08877130"
            }
        };

        expect(result).toEqual(output);
    });

    it("unit test should not find a customer", async () => {
        const cr = MockRepository();
        cr.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(cr);

        const input = {
            id: "123"
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");

    });

});