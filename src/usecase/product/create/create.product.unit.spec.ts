import {expect, jest, test} from '@jest/globals';
import CreateProductUseCase from './create.product.usecase';
const input = {
    type: "a",
    name: "product 1",
    price: 1.99
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const pr = MockRepository();

        const cpuc = new CreateProductUseCase(pr);

        const result = await cpuc.execute(input);

        const expected = {
            id: expect.any(String),
            name: input.name,
            price: input.price
        }

        expect(result).toEqual(expected);
    });

});