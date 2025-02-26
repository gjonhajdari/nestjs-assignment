# Tasks API Documentation

This document provides information about all available endpoints for managing tasks.

[← Go to main docs](../API_DOCUMENTATION.md)

- [Users API Documentation](API_USERS.md)
- [Project API Documentation](API_PROJECTS.md)

## Get task by ID

Retrieves a task by its ID.

- `GET` - `/tasks/:id`
- Param:
  - `id` - The ID of the task | `UUID`
- Returns: `Task` object.

### Example

```
GET "http://localhost:3000/tasks/f445341c-2f63-4c99-9a75-b3ab5038514f"

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "title": "Task 1",
  "description": "This is the first task",
  "status": "TODO",
  "userId": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "projectId": "f445341c-2f63-4c99-9a75-b3ab5038514f"
}
```

## Get tasks by User ID

Retrieves all tasks for a user by their ID.

- `GET` - `/tasks/user/:userId?status=:status&page=:page&pageSize=:pageSize`
- Param:
  - `userId` - The ID of the user | `UUID`
- Query params:
  - `status` - The status of the tasks | `string`
  - `page` - The page number | `number - default 1`
  - `pageSize` - The number of tasks per page | `number default 10`
- Returns: Array of `Task` objects together with the project ID and project name.

### Example

```
GET "http://localhost:3000/tasks/user/f445341c-2f63-4c99-9a75-b3ab5038514f?status=TODO&page=1&pageSize=3"

Response:
[
  {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "title": "Task 1",
    "description": "This is the first task",
    "status": "TODO",
    "project": {
        "id": "36d909dd-3bbc-4f51-9213-b0c05077e9c2",
        "name": "Project #2"
    }
  },
  {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "title": "Task 2",
    "description": "This is the second task",
    "status": "TODO",
    "project": {
        "id": "36d909dd-3bbc-4f51-9213-b0c05077e9c2",
        "name": "Project #2"
    }
  },
  {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "title": "Task 3",
    "description": "This is the third task",
    "status": "TODO",
    "project": {
        "id": "36d909dd-3bbc-4f51-9213-b0c05077e9c2",
        "name": "Project #2"
    }
  }
]
```

## Create Task

Creates a new task.

- `POST` - `/tasks`
- Body:
  - `title` - The title of the task | `string`
  - `description` - The description of the task | `string`
  - `status` - The status of the task | `string - "TODO", "DOING", "IN REVIEW", "DONE", "DROPPED"`
  - `userId` - The ID of the user assigned to the task | `UUID`
  - `projectId` - The ID of the project the task belongs to | `UUID`
- Returns: `Task` object along side the associated `User` and `Project` objects.

### Example

```
POST "http://localhost:3000/tasks"

Body:
{
  "title": "Task 1",
  "description": "This is the first task",
  "status": "TODO",
  "userId": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "projectId": "f445341c-2f63-4c99-9a75-b3ab5038514f"
}

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "title": "Task 1",
  "description": "This is the first task",
  "status": "TODO",
  "user": {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "firstName": "John",
    "lastName": "Doe",
    "email": "example@email.com",
    "location": "New York, NY"
  },
  "project": {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "name": "Project #1"
    "description": "This is the first project",
    "createdAt": "2021-08-01T00:00:00.000Z",
    "updatedAt": "2021-08-01T00:00:00.000Z"
  }
}
```

## Update Task

Updates an existing task.

- `PATCH` - `/tasks/:id`
- Param:
  - `id` - The ID of the task | `UUID`
- Body:
  - `title` - The title of the task | `string`
  - `description` - The description of the task | `string`
  - `status` - The status of the task | `string - "TODO", "DOING", "IN REVIEW", "DONE", "DROPPED"`
  - `userId` - The ID of the user assigned to the task | `UUID`
  - `projectId` - The ID of the project the task belongs to | `UUID`
- Returns: `Task` object along side the associated `User` object.

### Example

```
PATCH "http://localhost:3000/tasks/f445341c-2f63-4c99-9a75-b3ab5038514f"

Body:
{
  "status": "DONE",
}

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "title": "Task 1",
  "description": "This is the first task",
  "status": "DONE",
  "user": {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "firstName": "John",
    "lastName": "Doe",
    "email": "example@email.com",
    "location": "New York, NY"
  }
}
```

## Count Tasks

Counts the number of tasks for a user.

- `GET` - `/tasks/count/:userId?status=:status`
- Param:
  - `userId` - The ID of the user | `UUID`
- Query params:
  - `status` - The status of the tasks | `string - "TODO", "DOING", "IN REVIEW", "DONE", "DROPPED"`

### Example

```
GET "http://localhost:3000/tasks/count/f445341c-2f63-4c99-9a75-b3ab5038514f?status=TODO"

Response: 5
```

## Delete Task

Deletes a task by its ID.

- `DELETE` - `/tasks/:id`
- Param:
  - `id` - The ID of the task | `UUID`
- Returns: `Task` object.

### Example

```
DELETE "http://localhost:3000/tasks/f445341c-2f63-4c99-9a75-b3ab5038514f"

Response:
{
  "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
  "title": "Task 1",
  "description": "This is the first task",
  "status": "TODO"
}
```