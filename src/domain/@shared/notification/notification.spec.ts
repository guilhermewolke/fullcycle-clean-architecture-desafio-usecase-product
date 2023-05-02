import Notification from "./notification";

describe("Unit test for notifications", () => {
    it("should create errors", () => {
        const notification = new Notification();
        const error = {
            message: "error message", 
            context: "customer"
        };

        const error2 = {
            message: "error message2", 
            context: "customer"
        };

        notification.addError(error);
        notification.addError(error2);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");

        const error3 = {
            message: "error message3", 
            context: "order"
        };

        notification.addError(error3);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");
        expect(notification.messages()).toBe("customer: error message,customer: error message2,order: error message3,");
        // Product Errors
        const errorProduct1 = {
            message: "error message product1", 
            context: "product"
        };
        notification.addError(errorProduct1);

        const errorProduct2 = {
            message: "error message product2", 
            context: "product"
        };
        notification.addError(errorProduct2);

        expect(notification.messages("product")).toBe("product: error message product1,product: error message product2,");
        
    })

    it("should check if notification has at least one error", ()=> {
        const notification = new Notification();

        const error = {
            message: "error message", 
            context: "customer"
        };

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });
});