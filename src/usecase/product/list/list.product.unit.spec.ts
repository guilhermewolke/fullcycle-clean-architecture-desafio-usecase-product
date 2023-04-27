import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const p1 = ProductFactory.create("a", "Product 1", 1.99);
const p2 = ProductFactory.create("a", "Product 2", 19.90);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([p1, p2])),
    }
}

describe("Test for listing products use case", () => {
    it("should get a list of products", async () => {
        const pr = MockRepository();
        const uc = new ListProductUseCase(pr);
        const result = await uc.execute({});

        const expected = [p1, p2];
        console.log(expected); 
        console.log(expected[0].id);
        expect(result.products.length).toBe(2);

        for (let i = 0; i < expected.length; i++) {
            expect(result.products[i].id).toBe(expected[i].id);
            expect(result.products[i].name).toBe(expected[i].name);
            expect(result.products[i].price).toBe(expected[i].price);
        }

    });
});