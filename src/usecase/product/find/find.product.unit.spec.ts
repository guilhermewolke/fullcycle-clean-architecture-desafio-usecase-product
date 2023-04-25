import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product 1", 1.99);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("testing find a product usecase", () => {
    it("should find a product", async () => {
        const pr = MockRepository();
        const uc = new FindProductUseCase(pr);

        const input = {
            id: "123"
        }

        const result = await uc.execute(input);

        const expected = {
            id: expect.any(String),
            name: product.name,
            price: product.price
        }

        expect(result).toEqual(expected);
    });
});