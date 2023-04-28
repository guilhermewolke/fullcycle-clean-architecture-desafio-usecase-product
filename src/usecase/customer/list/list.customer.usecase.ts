import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private cr: CustomerRepositoryInterface;

    constructor(cr: CustomerRepositoryInterface) {
        this.cr = cr;
    }

    async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
        const customers = await this.cr.findAll();
        return CustomerMapper.list(customers);
    }
}

class CustomerMapper {
    static list(theCustomers: Customer[]): OutputListCustomerDTO{
        return {
            customers: theCustomers.map((p) => ({
                id: p.id,
                name: p.name,
                address: {
                    city: p.Address.city,
                    street: p.Address.street,
                    zip: p.Address.zip,
                    number: p.Address.number
                }
            }))
        }
    }
}