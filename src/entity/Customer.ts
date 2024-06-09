// src/entity/Customer.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "first_name", nullable: false })
  firstName!: string;

  @Column({ name: "last_name", nullable: false })
  lastName!: string;
}
