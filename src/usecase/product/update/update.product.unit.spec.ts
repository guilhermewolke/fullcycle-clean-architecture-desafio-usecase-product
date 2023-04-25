import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 1.99);

const input = {
    id: product.id,
    name: "Product 1 updated",
    price: 2
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    }
}

describe("Unit test for product updating use case", () => {
    it("should update a product", async () => {
        const pr = MockRepository();
        const upuc = new UpdateProductUseCase(pr);

        const result = await upuc.execute(input);

        expect(result).toEqual(input);
    });
});