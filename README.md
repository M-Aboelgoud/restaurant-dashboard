## Usage
This project was bootstrapped with [Vite](https://vitejs.dev/).

## Technologies Used
## Frontend:
- React.js: For building the user interface.
- Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML .
- Toastify: To display notifications and alerts.
- React Router DOM: For managing navigation in the application.

## Backend:
- Express: Web application framework for Node.js.
- MongoDB: Database to store user credentials and session data.

## Project setup

### server Setup
* Create a `.env` file at the server folder add your API Keys. `.env` Refer to for the environment variable names.

*Configure MongoDB and JWT:
Visit MongoDB website, create account, database and take connection string.
After that generate 256 bits random key and add it to .env file.
Create the .env file in the root directory with the following contents:

`JWT_SECRET=`
`MONGO_URI=`

### Compiles and hot-reloads for development
```
yarn
yarn dev
```



