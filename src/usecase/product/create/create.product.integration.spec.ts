import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create a product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new product", async () => {
        const input = {
            name: "produto 1",
            price: 1.99
        }

        const rep = new ProductRepository();
        const uc = new CreateProductUseCase(rep);

        const result =  await uc.execute(input);
        const found =  await rep.find(result.id);

        const expected = {
            id: expect.any(String),
            name: "produto 1",
            price: 1.99
        }

        expect(found.id).toEqual(expected.id);
        expect(found.name).toEqual(expected.name);
        expect(found.price).toEqual(expected.price);

    });
});