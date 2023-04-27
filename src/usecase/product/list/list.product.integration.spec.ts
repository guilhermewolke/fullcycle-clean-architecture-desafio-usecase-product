import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test list products use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize(
            {
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: {force: true}
            }
        );
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list all of the products", async () => {
        const p1 = ProductFactory.createProduct("produto 1", 1.99);
        const p2 = ProductFactory.createProduct("produto 2", 2.99);

        const rep = new ProductRepository();
        const uc = new ListProductUseCase(rep);

        await rep.create(p1);
        await rep.create(p2);

        const result = await uc.execute({});

        const expected = [p1, p2];
        
        expect(result.products.length).toBe(2);
        for (let i = 0; i < result.products.length; i++) {
            expect(result.products[i].id).toEqual(expected[i].id);
            expect(result.products[i].name).toEqual(expected[i].name);
            expect(result.products[i].price).toEqual(expected[i].price);
        }
    });
});