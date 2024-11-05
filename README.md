# file-manager-backend

## Build the app
npm install

## Run the app in development

NODE_ENV=development npm run dev

## CURL commands:

Assumptions
Base URL: http://localhost:3000
Authorization Token: Replace <YOUR_AUTH_TOKEN> with a valid JWT token if required.
Content-Type: For most requests, JSON is used. For file uploads, multipart/form-data is used.
1. Register User
Register a new user with a username and password.

bash
Copy code
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "user123", "password": "password123"}'
2. Login User
Authenticate a user and receive a JWT token.

bash
Copy code
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "user123", "password": "password123"}'
3. Upload File
Upload an image or video file with optional tags.

bash
Copy code
curl -X POST http://localhost:3000/api/files/upload \
     -H "Authorization: Bearer <YOUR_AUTH_TOKEN>" \
     -F "file=@/path/to/your/file.jpg" \
     -F "tags=tag1,tag2"
4. Get File by ID
Retrieve a file’s metadata by ID.

bash
Copy code
curl -X GET http://localhost:3000/api/files/<FILE_ID> \
     -H "Authorization: Bearer <YOUR_AUTH_TOKEN>"
Replace <FILE_ID> with the ID of the file you want to retrieve.

5. Share File
Generate a shareable link for a specific file by its ID.

bash
Copy code
curl -X POST http://localhost:3000/api/files/<FILE_ID>/share \
     -H "Authorization: Bearer <YOUR_AUTH_TOKEN>"
Replace <FILE_ID> with the ID of the file to share.

6. Track File View
Track a view count by accessing a file through its shareable link.

bash
Copy code
curl -X GET http://localhost:3000/api/files/view/<SHARED_LINK>
Replace <SHARED_LINK> with the shareable link generated by the share file endpoint.

## Postman Collections:
{
  "info": {
    "name": "File Manager API",
    "description": "Postman collection for File Manager API endpoints",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"username\": \"user123\", \"password\": \"password123\"}"
        },
        "url": {
          "raw": "http://localhost:3000/api/auth/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "auth", "register"]
        }
      }
    },
    {
      "name": "Login User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"username\": \"user123\", \"password\": \"password123\"}"
        },
        "url": {
          "raw": "http://localhost:3000/api/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "auth", "login"]
        }
      }
    },
    {
      "name": "Upload File",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <YOUR_AUTH_TOKEN>",
            "type": "text"
          }
        ],
        "body": {
          "mode": "formdata",
          "formdata": [
            {
              "key": "file",
              "type": "file",
              "src": "/path/to/your/file.jpg"
            },
            {
              "key": "tags",
              "value": "tag1,tag2",
              "type": "text"
            }
          ]
        },
        "url": {
          "raw": "http://localhost:3000/api/files/upload",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "files", "upload"]
        }
      }
    },
    {
      "name": "Get File by ID",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <YOUR_AUTH_TOKEN>",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/api/files/:id",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "files", ":id"],
          "variable": [
            {
              "key": "id",
              "value": "<FILE_ID>"
            }
          ]
        }
      }
    },
    {
      "name": "Share File",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <YOUR_AUTH_TOKEN>",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/api/files/:id/share",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "files", ":id", "share"],
          "variable": [
            {
              "key": "id",
              "value": "<FILE_ID>"
            }
          ]
        }
      }
    },
    {
      "name": "Track File View",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/api/files/view/:sharedLink",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "files", "view", ":sharedLink"],
          "variable": [
            {
              "key": "sharedLink",
              "value": "<SHARED_LINK>"
            }
          ]
        }
      }
    }
  ]
}

