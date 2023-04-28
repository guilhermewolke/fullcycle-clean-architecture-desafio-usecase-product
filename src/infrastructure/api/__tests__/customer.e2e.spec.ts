import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for customer",  () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("shoud create a customer", async () => {
        const response = await request(app)
                                .post("/customer")
                                .send({
                                    name: "John",
                                    address: {
                                        street: "street",
                                        city: "city",
                                        number: 123,
                                        zip: "12345"
                                    }
                                });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("street");
        expect(response.body.address.city).toBe("city");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
                                .post("/customer")
                                .send({
                                    name:"john"
                                });
        expect(response.status).toBe(500);
    });

    it("should list all customers", async() => {
        const response = await request(app)
                                .post("/customer")
                                .send({
                                    name: "John",
                                    address: {
                                        street: "street",
                                        city: "city",
                                        number: 123,
                                        zip: "12345"
                                    }
                                });

        expect(response.status).toBe(200);
        const response2 = await request(app)
                                .post("/customer")
                                .send({
                                    name: "Jack",
                                    address: {
                                        street: "street 2",
                                        city: "city mesmo",
                                        number: 120,
                                        zip: "12346"
                                    }
                                });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer1 = listResponse.body.customers[0];
        expect(customer1.name).toBe("John");
        expect(customer1.address.street).toBe("street");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe("Jack");
        expect(customer2.address.street).toBe("street 2");
    });
});