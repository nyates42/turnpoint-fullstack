### Docker Compose for a Full-Stack Application with React, Expressjs, and PostgreSQL

This repository demonstrates how to set up a React, Expressjs server with a PostgreSQL database server inside docker containers and connect them all together.

#### How to run the application

To get this project up and running, follow these steps

1. Make sure you have Docker installed in your system. For installation steps, follow the following steps:
    1. For **[Mac](https://docs.docker.com/desktop/install/mac-install/)**
    2. For **[Ubuntu](https://docs.docker.com/desktop/install/linux-install/)**
    3. For **[Windows](https://docs.docker.com/desktop/install/windows-install/)**
2. Clone the repository into your device
3. Open a terminal from the cloned project's directory (Where the `docker-compose.yml` file is present)
4. Run the command: `docker compose up`

That's all! That should get the project up and running. To see the output, you can access `http://localhost:8000/` from the browser and you should find a web page with a list of clients. This entire system with the client, server & database are running inside of docker and being accessible from your machine.

## React Application
With the container running, you will be able to access the React application at:
`http://localhost:8000/`
##### Tech used:
- ***Vite***: used to build and run the react application
- ***Typescript***: Keep type safety across the front-end app
- ***MUI***: Easy use of front-end UI components
- ***Redux Toolkit w/ Query***: Enable the application to make HTTP requests to the server and cache data
- ***Formik***: Easy form submission
- ***Yup***: Used for form validation
##### Features:
- Display a list of clients
- Basic wizard to “guide” a user through the process of adding a new client profile

## Express Server
The backend server is running on a different port.
##### Tech used:
- ***Expressjs***: Built on top of Node to provide routing for CRUD operations
- ***Prisma***: Used to handle the Postgres DB. It has been used to control the schema, peform seeding and acts as the ORM to keep type safety across the entire application