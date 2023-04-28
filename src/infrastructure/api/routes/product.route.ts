import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const uc = new CreateProductUseCase(new ProductRepository());

    try {
        const dto = {
            name: req.body.name,
            price: req.body.price
        }
        
        const output = await uc.execute(dto);
        res.send(output);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const uc = new ListProductUseCase(new ProductRepository());

    try {
        const output = await uc.execute({});
        res.send(output);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});