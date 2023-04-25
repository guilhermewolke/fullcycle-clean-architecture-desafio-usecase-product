import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDTO, OutputListProductsDTO } from "./list.product.dto";

export default class ListProductUseCase {
    private pr: ProductRepositoryInterface;

    constructor(pr: ProductRepositoryInterface) {
        this.pr = pr;
    }

    async execute(input: InputListProductsDTO): Promise<OutputListProductsDTO> {
        const products = await this.pr.findAll();
        return ProductMapper.theList(products);
    }
}

class ProductMapper {
    static theList(theProducts: Product[]): OutputListProductsDTO {
        return {
            products: theProducts.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price
            }))
        }
    }
}