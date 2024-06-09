// tests/service/CustomerService.test.ts
import { CustomerService } from '../../src/service/CustomerService';
import { CustomerRepository } from '../../src/repository/CustomerRepository';
import { CustomerDTO } from '../../src/dto/CustomerDTO';

jest.mock('../../src/repository/CustomerRepository');

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: jest.Mocked<CustomerRepository>;

  beforeEach(() => {
    customerRepository = new CustomerRepository() as jest.Mocked<CustomerRepository>;
    customerService = new CustomerService(customerRepository);
  });

  it('should return customer by id', async () => {
    const customer = { id: 1, firstName: 'John', lastName: 'Doe' };
    customerRepository.findById.mockResolvedValue(customer);

    const result = await customerService.getCustomerById(1).toPromise();
    expect(result).toEqual(new CustomerDTO(1, 'John', 'Doe'));
  });

  it('should throw error if customer not found', async () => {
    customerRepository.findById.mockResolvedValue(undefined);

    await expect(customerService.getCustomerById(1).toPromise()).rejects.toThrow('Customer not found');
  });

  it('should return customers by last name', async () => {
    const customers = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Doe' },
    ];
    customerRepository.findByLastName.mockResolvedValue(customers);

    const result = await customerService.getCustomersByLastName('Doe').toPromise();
    expect(result).toEqual([
      new CustomerDTO(1, 'John', 'Doe'),
      new CustomerDTO(2, 'Jane', 'Doe'),
    ]);
  });
});
