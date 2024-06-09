// src/controller/CustomerController.ts
import { Request, Response, Router } from "express";
import { CustomerService } from "../service/CustomerService";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

export const customerRouter = (customerService: CustomerService) => {
  const router = Router();

  router.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    customerService
      .getCustomerById(id)
      .pipe(
        catchError((err) => {
          res.status(404).send(err.message);
          return of(null);
        })
      )
      .subscribe((customer) => {
        if (customer) {
          res.json(customer);
        }
      });
  });

  router.get("/lastname/:lastName", (req: Request, res: Response) => {
    const lastName = req.params.lastName;
    customerService
      .getCustomersByLastName(lastName)
      .pipe(
        catchError((err) => {
          res.status(500).send(err.message);
          return of([]);
        })
      )
      .subscribe((customers) => {
        res.json(customers);
      });
  });

  return router;
};
