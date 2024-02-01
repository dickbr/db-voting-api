# DB-Vote-API

DB-Vote-API is a backend API built using the Nest.js framework. It's designed to manage votes on various topics, allowing users to create, update, and delete topics, as well as vote on them. The API also provides authentication and session management functionality.

## Technologies

- **Nest.js**: The main framework used to build the API.
- **TypeScript**: The programming language used.
- **PostgreSQL**: The database for storing data.
- **TypeORM**: The ORM library for database operations.
- **Jest**: The testing framework for unit and integration tests.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

``` bash 
git clone https://github.com/dickbr/db-vote-api.git cd db-vote-api

```

2. Install the dependencies:

``` bash 
yarn install
```

3. Set up your `.env` file based on the `.env.example` provided in the project.

4. Run the database migrations(production):

``` bash 
yarn typeorm migration:run
```
or migrations(develop):

``` bash 
yarn typeorm migration:run:dev
```

5. Start the development server:

``` bash 
yarn start dev
```

## Usage

After starting the server, you can access the API endpoints at `http://localhost:3001/api/`.

For example, to list all topics:

``` bash 
curl http://localhost:3001/api/topics
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.