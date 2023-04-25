import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.costumer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import {v4 as uuid} from "uuid";

export default class CreateCustomerUseCase {
    private cr: CustomerRepositoryInterface;

    constructor(cr: CustomerRepositoryInterface){
        this.cr = cr;
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const customer = CustomerFactory.createWithAddress(input.name, new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ));
        
        await this.cr.create(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city
            }
        }
    }
}