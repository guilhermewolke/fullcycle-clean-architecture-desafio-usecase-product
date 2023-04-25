import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface"
import { OutputCreateProductDTO } from "../../product/create/create.product.dto";
import { InputCreateProductDTO } from "./create.product.dto";
export default class CreateProductUseCase {
    private pr: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface) {
        this.pr = pr;
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        const product = ProductFactory.create(input.type, input.name, input.price);

        await this.pr.create(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}