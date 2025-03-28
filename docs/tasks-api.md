# Tasks API Endpoint

This document provides information about all available endpoints for managing projects.

[← Go to main docs](../API_DOCUMENTATION.md)

- [Users API Documentation](./users-api.md)
- [Projects API Documentation](./projects-api.md)

> **Note**: All requests must include the `x-api-key` header with any value to pass the authorization check. In these examples, the `x-api-key` header is omitted for brevity.

## Table of Contents

- [Get task by ID](#get-task-by-id)
- [Get tasks by user and status](#get-tasks-by-user-and-status)
- [Create Task](#create-task)
- [Update Task](#update-task)
- [Delete Task](#delete-task)

## Get task by ID

Gets a task by its UUID.

```plaintext
GET /tasks/:taskId
```

Supported attributes:

| Attribute | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| `taskId`  | string | Yes      | Unique task id in UUIDv4 format |

If successful, returns `200` and the following response attributes:

| Attribute     | Type   | Description                                                  |
|---------------|--------|--------------------------------------------------------------|
| `id`          | string | Unique task id in UUIDv4 format                              |
| `name`        | string | Task name                                                    |
| `description` | string | Task description                                             |
| `status`      | enum   | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |
| `createdAt`   | string | Task creation date                                           |
| `updatedAt`   | string | Task last update date                                        |

### Example request

```shell
curl --url "localhost:3000/tasks/4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6"
```
### Example response

```json
{
  "id": "4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
  "name": "Task #1",
  "description": "This is a sample task.",
  "status": "TODO",
  "createdAt": "2025-02-01T12:00:00Z",
  "updatedAt": "2025-02-02T12:00:00Z"
}
```
## Get tasks by user and status

Gets a list of tasks assigned to a user, with a specific task status.

```plaintext
GET /tasks/user/:userId?status=:status&page=:page&pageSize=:pageSize
```

Supported attributes:

| Attribute  | Type   | Required | Description                                                  |
|------------|--------|----------|--------------------------------------------------------------|
| `userId`   | string | Yes      | Unique user id in UUIDv4 format                              |
| `status`   | string | Yes      | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |
| `page`     | number | No       | Page number for pagination (`Default 1`)                     |
| `pageSize` | number | No       | Number of items per page (`Default 10`)                      |

If successful, returns `200` and the following response attributes:

| Attribute     | Type   | Description                                                  |
|---------------|--------|--------------------------------------------------------------|
| `id`          | string | Unique task id in UUIDv4 format                              |
| `name`        | string | Task name                                                    |
| `description` | string | Task description                                             |
| `status`      | enum   | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |
| `createdAt`   | string | Task creation date                                           |
| `updatedAt`   | string | Task last update date                                        |

### Example request

```shell
curl --url "localhost:3000/tasks/user/f445341c-2f63-4c99-9a75-b3ab5038514f?status=TODO&page=1&pageSize=3"
```

### Example response

```json
[
  {
    "id": "4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
    "name": "Task #1",
    "description": "This is a sample task.",
    "status": "TODO",
    "createdAt": "2025-02-01T12:00:00Z",
    "updatedAt": "2025-02-02T12:00:00Z"
  },
  {
    "id": "5g6h7i8j-9k0l-mn1o-pq2r-st3u4v5w6x7y",
    "name": "Task #2",
    "description": "This is another sample task.",
    "status": "TODO",
    "createdAt": "2025-02-01T12:00:00Z",
    "updatedAt": "2025-02-02T12:00:00Z"
  },
  {
    "id": "6h7i8j9k-0l1m-n2o3-pq4r-st5u6v7w8x9y",
    "name": "Task #3",
    "description": "This is yet another sample task.",
    "status": "TODO",
    "createdAt": "2025-02-01T12:00:00Z",
    "updatedAt": "2025-02-02T12:00:00Z"
  }
]
```

## Count tasks

Counts the number of tasks assigned to a user, with a specific task status.

```plaintext
GET /tasks/user/:userId/count?status=:status
```

Supported attributes:

| Attribute | Type   | Required | Description                                                  |
|-----------|--------|----------|--------------------------------------------------------------|
| `userId`  | string | Yes      | Unique user id in UUIDv4 format                              |
| `status`  | string | Yes      | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |

If successful, returns `200` and the following response attributes:

| Attribute | Type   | Description                                                    |
|-----------|--------|----------------------------------------------------------------|
| `count`   | number | Number of tasks assigned to the user with the specified status |

### Example request

```shell
curl --url "localhost:3000/tasks/user/f445341c-2f63-4c99-9a75-b3ab5038514f/count?status=TODO"
```
### Example response

```json
{
  "count": 3
}
```


## Create Task

Creates a new task.

```plaintext
POST /tasks/create
```
Supported attributes:

| Attribute     | Type   | Required | Description                                                  |
|---------------|--------|----------|--------------------------------------------------------------|
| `name`        | string | Yes      | Task name                                                    |
| `description` | string | No       | Task description                                             |
| `status`      | enum   | Yes      | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |
| `projectId`   | string | Yes      | Unique project id in UUIDv4 format                           |
| `userId`      | string | Yes      | Unique user id in UUIDv4 format                              |

If successful, returns `201` and the following response attributes:

| Attribute     | Type   | Description                                                  |
|---------------|--------|--------------------------------------------------------------|
| `id`          | string | Unique task id in UUIDv4 format                              |
| `name`        | string | Task name                                                    |
| `description` | string | Task description                                             |
| `status`      | enum   | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |
| `user`        | object | User assigned to the task                                    |
| `project`     | object | Project associated with the task                             |
| `createdAt`   | string | Task creation date                                           |
| `updatedAt`   | string | Task last update date                                        |

### Example request

```shell
curl --url "localhost:3000/tasks" \
  --header "Content-Type: application/json" \
  --data '{
    "name": "Task #1",
    "description": "This is a sample task.",
    "status": "TODO",
    "projectId": "4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
    "userId": "f445341c-2f63-4c99-9a75-b3ab5038514f"
  }'
```
### Example response

```json
{
  "id": "4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
  "name": "Task #1",
  "description": "This is a sample task.",
  "status": "TODO",
  "user": {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "firstName": "John",
    "lastName": "Doe",
    "email": "example@email.com",
    "location": "New York, NY"
  },
  "project": {
    "id": "4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
    "name": "Project #1",
    "description": "Project description",
    "createdAt": "2025-02-03T12:00:00Z",
    "updatedAt": "2025-02-03T12:00:00Z"
  },
  "createdAt": "2025-02-03T12:00:00Z",
  "updatedAt": "2025-02-03T12:00:00Z"
}
```

## Update Task

Updates an existing task.

```plaintext
PATCH /tasks/:taskId
```

Supported attributes:

| Attribute     | Type   | Required | Description                                                  |
|---------------|--------|----------|--------------------------------------------------------------|
| `taskId`      | string | Yes      | Unique task id in UUIDv4 format                              |
| `name`        | string | No       | Task name                                                    |
| `description` | string | No       | Task description                                             |
| `status`      | enum   | No       | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |
| `projectId`   | string | No       | Unique project id in UUIDv4 format                           |
| `userId`      | string | No       | Unique user id in UUIDv4 format                              |

If successful, returns `200` and the following response attributes:

| Attribute     | Type   | Description                                                  |
|---------------|--------|--------------------------------------------------------------|
| `id`          | string | Unique task id in UUIDv4 format                              |
| `name`        | string | Task name                                                    |
| `description` | string | Task description                                             |
| `status`      | enum   | Task status: `TODO`, `DOING`, `IN REVIEW`, `DONE`, `DROPPED` |
| `user`        | object | User assigned to the task                                    |
| `project`     | object | Project associated with the task                             |
| `createdAt`   | string | Task creation date                                           |
| `updatedAt`   | string | Task last update date                                        |

### Example request

```shell
curl --url "localhost:3000/tasks/4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6" \
  --header "Content-Type: application/json" \
  --data '{
    "name": "Updated Task #1",
    "status": "DOING"
  }'
```
### Example response

```json
{
  "id": "4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
  "name": "Updated Task #1",
  "description": "This is a sample task.",
  "status": "DOING",
  "user": {
    "id": "f445341c-2f63-4c99-9a75-b3ab5038514f",
    "firstName": "John",
    "lastName": "Doe",
    "email": "example@email.com",
    "location": "New York, NY"
  },
  "project": {
    "id": "4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6",
    "name": "Project #1",
    "description": "Project description",
    "createdAt": "2025-02-03T12:00:00Z",
    "updatedAt": "2025-02-03T12:00:00Z"
  },
  "createdAt": "2025-02-03T12:00:00Z",
  "updatedAt": "2025-02-03T12:00:00Z"
}
```

## Delete Task

Deletes a task by its UUID.

```plaintext
DELETE /tasks/:taskId
```

Supported attributes:

| Attribute | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| `taskId`  | string | Yes      | Unique task id in UUIDv4 format |

If successful, returns `200` and the following response attributes:

| Attribute | Type    | Description                          |
|-----------|---------|--------------------------------------|
| `deleted` | boolean | Indicates if the project was deleted |
| `message` | string  | Confirmation message                 |

### Example request

```shell
curl --url "localhost:3000/tasks/4f3b2c1d-5e6f-7a8b-9c0d-e1f2g3h4i5j6"
```
### Example response

```json
{
  "deleted": true,
  "message": "Task deleted successfully."
}
```

<a href="./projects-api.md">← Previous: Projects Docs</a>