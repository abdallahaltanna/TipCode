## 🚀 Spaceship Travel System

## 📜 About Project

It's web application for managing a spaceship travel system to Moon, Mars, and Jupiter.

## 📋 Table of Contents

- Database Schema
- Setup
- Technologies
- Postman Collection
- PUT VS PATCH

## 📦 Database Schema

The application consists of 3 tables

| Model       |
| ----------- |
| Spaceships  |
| CrewMembers |
| Missions    |

- [Database](https://drawsql.app/teams/abdallah-altanna/diagrams/spaceship-travel-system)

![Database Diagram](https://i.postimg.cc/1Xp8ckYj/draw-SQL-image-export-2024-06-12.png)

## 🛠️ Setup

1. Clone this repository by typing git clone `https://github.com/abdallahaltanna/TipCode.git`

2. Run `npm i` on the root directory to install the packages of the backend.

3. Navigate to client directory by typing the command `cd client/` and repeat step 2.

   #### 📦 Database

   - You should install `MySQL`.
   - To create a new user in MySQL, you can use the `CREATE USER` statement. Here's an example: `CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';`
   - To connect new user `mysql -u 'newuser' -p`
   - Now enter your password
   - To Create new database and the required tables, you can type `npm run db:build`, but you must provide db URI in .env file which must be like this uri `DEV_DB_URL=mysql://root:password@localhost:3306/`.

   #### ⚙️ Environment variables

   - `NODE_ENV=`
   - `PORT=`
   - `ORIGIN=`
   - `DEV_DB_URL=mysql://root:password@localhost:3306/nameOfDB`
   - `PRO_DB_URL=` To run the app on production database.

## 💻 Technologies

- 🖥️ Backend: Node.js, Express.js with TypeScript
- 📦 Database: MySQL
- 🍪 Session Management: cookie-parser
- ✅ Validation: Joi
- 🚀 Deployment: Azure

## 📬 Postman Collection

- Download the Postman collection [here](server/postman/Spaceship%20Travel%20System.postman_collection.json)

## 🔁 PUT VS PATCH

PUT:

- **Semantics**: The PUT method is used to update or replace an existing resource or create a new resource if it doesn't exist at the specified URI.
- **Complete Replacement**: When using PUT, the entire resource representation is sent in the request, and it replaces the existing resource at the specified URI.
- **Idempotent**: PUT is considered idempotent, meaning that if you make the same PUT request multiple times, the result should be the same as making it once.

PATCH:

- **Semantics**: The PATCH method is used to partially update a resource, meaning that only the specified fields in the request payload are updated, while the rest of the resource remains unchanged.
- **Partial Update**: Unlike PUT, which requires sending the complete resource representation, PATCH allows for sending only the changes that need to be applied.
- **Not Necessarily Idempotent**: PATCH requests may or may not be idempotent depending on their implementation. A PATCH request can be idempotent if the same patch operation applied multiple times has the same effect as applying it once. However, this is not guaranteed, as some PATCH operations might have side effects.
