import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
    private pr: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface) {
        this.pr = pr;
    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const product = await this.pr.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.pr.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}