import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product usecase", () => {
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

    it("should find a product", async () => {
        const p = new Product("123", "produto 1", 1.99);
        const rep = new ProductRepository();
        const uc = new FindProductUseCase(rep);

        await rep.create(p);

        const input = {
            id: "123"
        }

        const result = await uc.execute(input);

        const expected = {
            id: "123", 
            name: "produto 1",
            price: 1.99
        }

        expect(result).toEqual(expected);
    });
});