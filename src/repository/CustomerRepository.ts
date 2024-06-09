// src/repository/CustomerRepository.ts
import { AppDataSource } from "../database";
import { Customer } from "../entity/Customer";

export class CustomerRepository {
  private repository = AppDataSource.getRepository(Customer);

  async findById(id: number): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({ where: { id } });
    return customer === null ? undefined : customer;
  }

  async findByLastName(lastName: string): Promise<Customer[]> {
    return this.repository.find({ where: { lastName } });
  }

  async save(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }
}
