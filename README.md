# Library Management System

This is a simple Library Management System that allows users to manage books in a library. The application includes functionalities to create, read, update, and delete book records. The project consists of a backend API developed in C# .NET with an SQLite database and a frontend built with React and TypeScript.

## Table of Contents

- [Library Management System](#library-management-system)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Timeline](#timeline)
  - [Project Scope](#project-scope)
  - [Functionality](#functionality)
  - [API Documentation](#api-documentation)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
      - [Running the Application](#running-the-application)

## Project Overview

This Business Requirements Document outlines the development of a simple Library Management System. The purpose of this application is to allow users to manage books in a library, including functionalities to create, read, update, and delete book records.

## Timeline

Candidates are expected to complete the assignment within one calendar week from the date of receipt.

## Project Scope

The project scope is limited to the following functionalities:

- **Book CRUD Operations**: Users can perform the following operations on book records:
  - Create a new book record.
  - View a list of existing book records.
  - Update an existing book record.
  - Delete a book record.

- **User Authentication (Optional)**: While not required, the assignment can include user authentication and registration if time allows. This is considered a "nice-to-have" feature but is not mandatory for completing the assignment.

## Functionality

The Library Management System allows users to:

- **Create Book Record**: Add new book records by specifying a title, author, and description.
- **View Book Records**: View a list of all existing book records, displaying title, author, and description.
- **Update Book Record**: Edit and update existing book records.
- **Delete Book Record**: Remove book records that are no longer relevant.

## API Documentation

You can find the API documentation for the Library Management System at the following link:

[API Documentation](https://documenter.getpostman.com/view/36360468/2sAXxTdWoM)


## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [.NET SDK](https://dotnet.microsoft.com/download) (for the backend)
- [Node.js](https://nodejs.org/) (for the frontend)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/ChalanaGayan/Library-Management-System.git
    cd Library-Management-System
    ```

2. Install dependencies for the backend:
    ```bash
    cd Backend/LibraryManagementBackend
    dotnet restore
    ```

3. Install dependencies for the frontend:
    ```bash
    cd ../../Frontend/library-management-system-frontend
    npm install
    ```

4. Make sure you have a .env file .If not make and include this code inside the .env file to connect frontend with the backend. 
    ```bash

    VITE_BASE_URL=http://localhost:5006

    ```

#### Running the Application

You can run both the backend and frontend together using the provided script:

```bash
./start.sh
```

