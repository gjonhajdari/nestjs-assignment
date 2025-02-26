# Users API Documentation

This document provides information about all available endpoints for managing users.

[← Go to main docs](../API_DOCUMENTATION.md)

- [Project API Documentation](API_PROJECTS.md)
- [Task API Documentation](API_TASKS.md)

## Get User by ID

Retrieves a user by their ID.

- `GET` - `/users/:id`
- Param:
  - `id` - The ID of the user
- Returns: `User` object.

### Example

```
GET "http://localhost:3000/users/f445341c-2f63-4c99-9a75-b3ab5038514f"

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "firstName": "John",
  "lastName": "Doe",
  "email": "example@email.com",
  "location": "New York, NY"
}
```

## Get User by Email

Retrieves a user by their email address.

- `GET` - `/users/email/:email`
- Param:
  - `email` - The email address of the user
- Returns: `User` object.

### Example

```
GET "http://localhost:3000/users/example@gmail.com"

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "firstName": "John",
  "lastName": "Doe",
  "email": "example@email.com",
  "location": "New York, NY"
}
```

## Create User

Creates a new user.

- `POST` - `/users`
- Body:
  - `firstName` - The first name of the user
  - `lastName` - The last name of the user
  - `email` - The email address of the user
  - `location` - The location of the user
- Returns: `User` object.

### Example

```
POST "http://localhost:3000/users"

Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "example@email.com",
  "location": "New York, NY"
}

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "firstName": "John",
  "lastName": "Doe",
  "email": "example@email.com",
  "location": "New York, NY"
}
```

## Update User

Updates an existing user.

- `PATCH` - `/users/:id`
- Parameters:
  - `id` - The ID of the user
- Body:
  - `firstName` - The first name of the user
  - `lastName` - The last name of the user
  - `email` - The email address of the user
  - `location` - The location of the user
- Returns: `User` object.

### Example

```
PATCH "http://localhost:3000/users/f445341c-2f63-4c99-9a75-b3ab5038514f"

Body:
{
  "lastName": "Smith",
  "location": "Los Angeles, CA"
}

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "example@email.com",
  "location": "Los Angeles, CA"
}
```

## Delete User

Deletes a user.

- `DELETE` - `/users/:id`
- Parameters:
  - `id` - The ID of the user
- Returns: `User` object.

### Example

```
DELETE "http://localhost:3000/users/f445341c-2f63-4c99-9a75-b3ab5038514f"

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "firstName": "John",
  "lastName": "Doe",
  "email": "example@email.com",
  "location": "New York, NY"
}
```