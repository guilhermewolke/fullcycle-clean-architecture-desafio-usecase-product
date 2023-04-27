import CreateCustomerUseCase from "./create.customer.usecase";
import { OutputCreateCustomerDTO } from "./create.costumer.dto";

const input = {
    name: "john",
    address: {
        street: "street",
        number: 123,
        zip: "zip",
        city: "city"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("unit test create customer use case", () => {
    it("should create a customer", async () => {
        const cr = MockRepository();

        const ccuc = new CreateCustomerUseCase(cr);

        const result = await ccuc.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        });

    });

    it("should throw an error when name is missing", async () => {
        const cr = MockRepository();
        const ccuc = new CreateCustomerUseCase(cr);

        input.name = "";
        const result = await ccuc.execute(input);
        await expect(await ccuc.execute(input)).rejects.toThrow("Name is required");
    });
});
