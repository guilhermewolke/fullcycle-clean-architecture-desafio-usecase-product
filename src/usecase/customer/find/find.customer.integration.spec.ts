import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer usecase", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customer = new Customer("123", "John");
        const address = new Address("Rua", 123, "08877130", "cidade");
        customer.changeAddress(address);

        const cr = new CustomerRepository();
        const usecase = new FindCustomerUseCase(cr);

        const created = await cr.create(customer);

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
        }

        expect(result).toEqual(output);
    });

});