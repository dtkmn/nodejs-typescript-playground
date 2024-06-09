// tests/controller/CustomerController.test.ts
import request from 'supertest';
import express from 'express';
import { customerRouter } from '../../src/controller/CustomerController';
import { CustomerService } from '../../src/service/CustomerService';
import { CustomerDTO } from '../../src/dto/CustomerDTO';
import { of, throwError } from 'rxjs';

jest.mock('../../src/service/CustomerService');

describe('CustomerController', () => {
  let app: express.Application;
  let customerService: jest.Mocked<CustomerService>;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    customerService = new CustomerService() as jest.Mocked<CustomerService>;

    // Ensure mocked methods are set up
    customerService.getCustomerById = jest.fn();
    customerService.getCustomersByLastName = jest.fn();
    
    // Use the router factory function
    app.use('/customers', customerRouter(customerService));
  });

  it('should get customer by id', async () => {
    const customer = new CustomerDTO(1, 'John', 'Doe');
    customerService.getCustomerById.mockReturnValueOnce(of(customer));

    const res = await request(app).get('/customers/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(customer);
  });

  it('should return 404 if customer not found', async () => {
    customerService.getCustomerById.mockReturnValueOnce(throwError(() => new Error('Customer not found')));

    const res = await request(app).get('/customers/1');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Customer not found');
  });

  it('should get customers by last name', async () => {
    const customers = [
      new CustomerDTO(1, 'John', 'Doe'),
      new CustomerDTO(2, 'Jane', 'Doe'),
    ];
    customerService.getCustomersByLastName.mockReturnValueOnce(of(customers));

    const res = await request(app).get('/customers/lastname/Doe');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(customers);
  });
});
