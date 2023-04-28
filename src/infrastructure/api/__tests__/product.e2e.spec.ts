import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a brand new product", async() => {
        const response = await request(app)
                                .post("/product")
                                .send({
                                    name: "Produto 1",
                                    price: 1.99
                                });
        expect(response.status).toBe(200);
        expect(response.body.id).not.toBeNull();
        expect(response.body.name).toBe("Produto 1");
        expect(response.body.price).toBe(1.99);
    });

    it("should list all of the products", async() => {
        const response = await request(app)
                        .post("/product")
                        .send({
                            name: "Produto 1",
                            price: 1.99
                        });
        const response2 = await request(app)
                        .post("/product")
                        .send({
                            name: "Produto 2",
                            price: 19.99
                        });
        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product1 = listResponse.body.products[0];
        expect(product1.id).not.toBeNull();
        expect(product1.name).toBe("Produto 1");
        expect(product1.price).toBe(1.99);
        const product2 = listResponse.body.products[1];
        expect(product2.id).not.toBeNull();
        expect(product2.name).toBe("Produto 2");
        expect(product2.price).toBe(19.99);
    });
});