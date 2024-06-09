# Node.js + TypeScript Service Template

This is a template project for creating new services using Node.js and TypeScript. It includes a basic setup for Express, TypeORM, PostgreSQL, Jest for testing, and RxJS for reactive programming.

## Features

- **Node.js**: JavaScript runtime environment
- **TypeScript**: Typed superset of JavaScript
- **Express**: Fast, unopinionated, minimalist web framework
- **TypeORM**: ORM for TypeScript and JavaScript (ES7, ES6, ES5)
- **PostgreSQL**: SQL database
- **RxJS**: Reactive Extensions for JavaScript
- **Jest**: Delightful JavaScript testing framework with a focus on simplicity
- **Supertest**: Super-agent driven library for testing HTTP

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/nodejs-typescript-service-template.git
    cd nodejs-typescript-service-template
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up PostgreSQL database**:

    Create a new PostgreSQL database and update the connection settings in `src/database.ts`:

    ```typescript
    // src/database.ts
    import { DataSource } from 'typeorm';
    import { Customer } from './entity/Customer';

    export const AppDataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'yourusername',
        password: 'yourpassword',
        database: 'yourdatabase',
        synchronize: true,
        logging: false,
        entities: [Customer],
        migrations: [],
        subscribers: [],
    });

    export const connectDatabase = async () => {
        await AppDataSource.initialize();
    };
    ```

4. **Run the application**:

    ```bash
    npm start
    ```
    The server will start at `http://localhost:3000`.

### Project Structure

```arduino
nodejs-typescript-service-template/
├── src/
│   ├── controller/
│   │   └── CustomerController.ts
│   ├── entity/
│   │   └── Customer.ts
│   ├── repository/
│   │   └── CustomerRepository.ts
│   ├── service/
│   │   └── CustomerService.ts
│   ├── database.ts
│   ├── app.ts
│   ├── server.ts
├── tests/
│   ├── controller/
│   │   └── CustomerController.test.ts
│   ├── service/
│   │   └── CustomerService.test.ts
├── .gitignore
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

### Testing

Run the tests using Jest:
```bash
npm test
```

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.

### Contact

For any questions, please contact me.
