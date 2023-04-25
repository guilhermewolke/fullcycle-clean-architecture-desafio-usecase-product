import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputFindProductDTO, OutputFindProductDTO}  from "./find.product.dto";

export default class FindProductUseCase {
    private pr: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface) {
        this.pr = pr;
    }

    async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
        const product = await this.pr.find(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}