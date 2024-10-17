# Sabzlearn Backend Clone

This is a simple Sabzlean clone project built with Node.js for the backend. It utilizes MongoDB as the database for storing data.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your system:

- Node.js
- MongoDB

### Installing

1. Clone the repository to your local machine:

```
git clone https://github.com/Bahinkor/sabzlearn-backend.git
```

2. Navigate to the project directory:

```
cd sabzlearn-backend
```

3. Install dependencies:

```
npm install
```

### Setting Up MongoDB

1. Make sure MongoDB is installed and running on your system.

2. Create a new database named `sabzleran`.

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

```
PORT=8000
MONGO_URI=mongodb://localhost:27017/sabzleran
JWT_SECRET=random-secret-code
EMAIL_ADDRESS=email.example.com
EMAIL_PASSWORD=app-password
```

### Running the Server

Start the server by running the following command:

```
npm start
```

The server will be running on port 8000 by default.

## Usage

Once the server is running, you can access the application by navigating to `http://localhost:8000` in your web browser.