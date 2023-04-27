import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test updating products use case", () => {
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

    it("should update a product", async () => {
        const p = ProductFactory.createProduct("produto 1", 1.99);
        const rep = new ProductRepository();
        const uc = new UpdateProductUseCase(rep);

        const created = await rep.create(p);

        p.changeName("produto 1 alterado");
        p.changePrice(2.50);

        const input = {
            id: p.id,
            name: p.name,
            price: p.price 
        }
        const result = await uc.execute(input);

        expect(result).toEqual({
            id: p.id,
            name: "produto 1 alterado",
            price: 2.50
        });
    });
});