# Projects API Documentation

This document provides information about all available endpoints for managing projects.

[← Go to main docs](../API_DOCUMENTATION.md)

- [Users API Documentation](API_USERS.md)
- [Task API Documentation](API_TASKS.md)

## Get project from ID

Retrieves a project by its ID.

- `GET` - `/projects/:id`
- Param:
  - `id` - The ID of the project | `UUID`
- Returns: `Project` object.

### Example

```
GET "http://localhost:3000/projects/36d909dd-3bbc-4f51-9213-b0c05077e9d4"

Response:
{
  "id": 36d909dd-3bbc-4f51-9213-b0c05077e9d4,
  "name": "Project 1",
  "description": "This is project 1",
  "createdAt": "2021-01-01T00:00:00.000Z",
  "updatedAt": "2021-01-01T00:00:00.000Z"
}
```

## Create project

Creates a new project.

- `POST` - `/projects`
- Body:
  - `name` - The name of the project | `string`
  - `description` - The description of the project | `string`
- Returns: `Project` object.

### Example

```
POST "http://localhost:3000/projects"

Body:
{
  "name": "Project 2",
  "description": "This is project 2"
}

Response:
{
  "id": 36d909dd-3bbc-4f51-9213-b0c05077e9d4,
  "name": "Project 1",
  "description": "This is project 1",
  "createdAt": "2021-01-01T00:00:00.000Z",
  "updatedAt": "2021-01-01T00:00:00.000Z"
}
```

## Update project

Updates an existing project.

- `PATCH` - `/projects/:id`
- Param:
  - `id` - The ID of the project | `UUID`
- Body:
  - `name` - The name of the project | `string`
  - `description` - The description of the project | `string`
- Returns: `Project` object.

### Example

```
PATCH "http://localhost:3000/projects/36d909dd-3bbc-4f51-9213-b0c05077e9d4"

Body:
{
  "name": "Project 2 Updated",
  "description": "This is project 2 updated"
}

Response:
{
  "id": 36d909dd-3bbc-4f51-9213-b0c05077e9d4,
  "name": "Project 2 Updated",
  "description": "This is project 2 updated",
  "createdAt": "2021-01-01T00:00:00.000Z",
  "updatedAt": "2021-01-01T00:00:00.000Z"
}
```

## Add user to project

Adds a user to a project.

- `POST` - `/projects/add/`
- Body:
  - `projectId` - The ID of the project | `UUID`
  - `userId` - The ID of the user | `UUID`
- Returns: `Project` object.

### Example

```
PATCH "http://localhost:3000/projects/add"

Body:
{
  "projectId": "36d909dd-3bbc-4f51-9213-b0c05077e9d4",
  "userId": "7b3b9b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b"
}

Response:
{
  "id": 36d909dd-3bbc-4f51-9213-b0c05077e9d4,
  "name": "Project 1",
  "description": "This is project 1",
  "createdAt": "2021-01-01T00:00:00.000Z",
  "updatedAt": "2021-01-01T00:00:00.000Z",
  "users": [
    {
      "id": 7b3b9b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b,
      "firstName": "John",
      "lastName": "Doe",
      "email": "
      "location": "New York, NY"
    }
  ]
}
```

## Remove user from project

Removes a user from a project.

- `PATCH` - `/projects/remove/`
- Body:
  - `projectId` - The ID of the project | `UUID`
  - `userId` - The ID of the user | `UUID`
- Returns: `Project` object.

### Example

```
PATCH "http://localhost:3000/projects/remove"

Body:
{
  "projectId": "36d909dd-3bbc-4f51-9213-b0c05077e9d4",
  "userId": "7b3b9b3b-3b3b-3b3b-3b3b-3b3b3b3b3b3b"
}

Response:
{
  "id": 36d909dd-3bbc-4f51-9213-b0c05077e9d4,
  "name": "Project 1",
  "description": "This is project 1",
  "createdAt": "2021-01-01T00:00:00.000Z",
  "updatedAt": "2021-01-01T00:00:00.000Z",
  "users": []
}
```

## Delete project

Deletes a project.

- `DELETE` - `/projects/:id`
- Param:
  - `id` - The ID of the project | `UUID`
- Returns: `Project` object.

### Example

```
DELETE "http://localhost:3000/projects/36d909dd-3bbc-4f51-9213-b0c05077e9d4"

Response:
{
  "id": 36d909dd-3bbc-4f51-9213-b0c05077e9d4,
  "name": "Project 1",
  "description": "This is project 1",
  "createdAt": "2021-01-01T00:00:00.000Z",
  "updatedAt": "2021-01-01T00:00:00.000Z"
}
```