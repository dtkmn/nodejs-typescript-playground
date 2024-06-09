// src/service/CustomerService.ts
import { CustomerRepository } from "../repository/CustomerRepository";
import { CustomerDTO } from "../dto/CustomerDTO";
import { map, from } from "rxjs";

export class CustomerService {
  private repository = new CustomerRepository();

  constructor(repository?: CustomerRepository) {
    this.repository = repository || new CustomerRepository();
  }

  getCustomerById(id: number) {
    return from(this.repository.findById(id)).pipe(
      map((customer) => {
        if (customer) {
          return new CustomerDTO(customer.id, customer.firstName, customer.lastName);
        } else {
          throw new Error("Customer not found");
        }
      })
    );
  }

  getCustomersByLastName(lastName: string) {
    return from(this.repository.findByLastName(lastName)).pipe(
      map((customers) =>
        customers.map(
          (customer) => new CustomerDTO(customer.id, customer.firstName, customer.lastName)
        )
      )
    );
  }
}
