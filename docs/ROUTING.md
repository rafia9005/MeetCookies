Here's a ROUTING.md document for the PostsController based on the provided code:
Routing Documentation
Endpoints for Managing Posts
1. Create Post

    URL: /api/posts
    Method: POST
    Description: Creates a new post.
    Request Body:

    json

{
  "content": "string"
}

Responses:

    201 Created:

    json

{
  "status": true,
  "statusCode": 201,
  "data": {
    "id": "number",
    "content": "string",
    "created_at": "ISO8601 timestamp",
    "updated_at": "ISO8601 timestamp"
  }
}

409 Conflict:

json

        {
          "status": false,
          "statusCode": 409,
          "message": "Failed to create post."
        }

2. Get All Posts

    URL: /api/posts
    Method: GET
    Description: Retrieves a list of all posts.
    Responses:
        200 OK:

        json

{
  "status": true,
  "statusCode": 200,
  "data": [
    {
      "id": "number",
      "content": "string",
      "like": "number",
      "comment": "number",
      "created_at": "ISO8601 timestamp",
      "updated_at": "ISO8601 timestamp"
    }
  ]
}

500 Internal Server Error:

json

        {
          "status": false,
          "statusCode": 500,
          "message": "Failed to retrieve posts"
        }

3. Get Single Post

    URL: /api/posts/:id
    Method: GET
    Description: Retrieves a single post by ID.
    Path Parameters:
        id (number): The ID of the post.
    Responses:
        200 OK:

        json

{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "number",
    "content": "string",
    "like": "number",
    "comment": "number",
    "created_at": "ISO8601 timestamp",
    "updated_at": "ISO8601 timestamp"
  }
}

404 Not Found:

json

{
  "status": false,
  "statusCode": 404,
  "message": "Post not found"
}

500 Internal Server Error:

json

        {
          "status": false,
          "statusCode": 500,
          "message": "Failed to retrieve post"
        }

4. Update Post

    URL: /api/posts/:id
    Method: PATCH
    Description: Updates a post by ID.
    Path Parameters:
        id (number): The ID of the post.
    Request Body:

    json

{
  "content": "string"
}

Responses:

    200 OK:

    json

{
  "status": true,
  "statusCode": 200,
  "data": {
    "id": "number",
    "content": "string",
    "created_at": "ISO8601 timestamp",
    "updated_at": "ISO8601 timestamp"
  }
}

500 Internal Server Error:

json

        {
          "status": false,
          "statusCode": 500,
          "message": "Failed to update post"
        }

5. Delete Post

    URL: /api/posts/:id
    Method: DELETE
    Description: Deletes a post by ID.
    Path Parameters:
        id (number): The ID of the post.
    Responses:
        204 No Content:

        json

{
  "status": true,
  "statusCode": 204,
  "message": "Post successfully deleted"
}

500 Internal Server Error:

json

        {
          "status": false,
          "statusCode": 500,
          "message": "Failed to remove post"
        }

6. Like Post

    URL: /api/posts/:id/like
    Method: POST
    Description: Likes a post by ID.
    Path Parameters:
        id (number): The ID of the post.
    Request Body:

    json

{
  "userId": "number"
}

Responses:

    200 OK:

    json

{
  "status": true,
  "statusCode": 200,
  "message": "Post liked successfully"
}

404 Not Found:

json

{
  "status": false,
  "statusCode": 404,
  "message": "Post not found"
}

500 Internal Server Error:

json

{
  "status": false,
  "statusCode": 500,
  "message": "Failed to like post"
}

