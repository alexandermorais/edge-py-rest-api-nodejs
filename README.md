### 1) Clone repository and install dependencies
``` 
git clone https://github.com/alexandermorais/edge-py-rest-api-nodejs
cd edge-py-rest-api-nodejs
npm install
```

### 2) Install MongoDB

Follow the tutorial in the following link:
https://www.mongodb.com/docs/manual/administration/install-community/

### 3) Configure the .env file
The example ENV. The file _.env.example_ can be used.
```
DB_PORT: The port used by the MongoDB database.
DB_NAME: Database name.
PORT: Application port. Port 3000 is common and recommended.
TOKEN: Token to encrypt the password.
```
### 4) Run project
```
npm run dev
```
### REST API Endpoints
Postman can be used to execute.

* Method POST: ```http://localhost:3000/api/users/register/```
To register a new user.
##### Body
```
{
    "name":"John Doe",
    "email":"johndoe@gmail.com",
    "password":"postman"
}
```
* Method POST: ```http://localhost:3000/api/users/login/```
To login with an email and password.
##### Body
```
{
    "email":"johndoe@gmail.com",
    "password":"postman"
}
```
* Method GET: ```http://localhost:3000/api/users/private/```
To get all users registered in the database.
##### Header
```
{
    "Content-Type":"application/json",
    "auth-token":"token_generated_at_login"
}
```
* Method PUT: ```http://localhost:3000/api/users/private/```
To update a user.
##### Body
```
{
    "name":"John Doe Reloaded",
    "email":"johndoe@gmail.com",
    "password":"postman"
}
```
##### Header
```
{
    "Content-Type":"application/json",
    "auth-token":"token_generated_at_login"
}
```
* Method DELETE: ```http://localhost:3000/api/users/private/```
To delete a user.
##### Body
```
{
    "email":"johndoe@gmail.com",
    "password":"postman"
}
```
##### Header
```
{
    "Content-Type":"application/json",
    "auth-token":"token_generated_at_login"
}
```
### Swagger docs
```http://localhost:3000/api-docs/```

### Postman collection
The collection file is located in the "Postman collection" folder.