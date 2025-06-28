# Hierarchical Data Management

Backend system that supports hierarchical data management with role-based
permissions and efficient notification handling.

### API Documentation

Please see the Swagger documentation from [api.yml](http://localhost:5000/api/api-docs/)

### Quick start

1. `npm install` to install dependencies.
1. Creat `.env` file using the keys from `.env.sample`.
1. Run the `npm run dev` .
1. Run the `npm run seed` to fill the database with dummy data.
1. You can find the postman collection in the email, and import it in the postman app.
1. After the migration you can find users with differants roles `Admin`, `Mamager` and `employee` in the database with `password123` as a password, and you can use them to sign-in and use the returnd `idToken` in the ather api.

# 📁 Project File Structure

## 📦 Root

```
📁 Project Root
├── 📁 docs
│   └── API documentation
├── 📁 src
│   ├── 📁 api
│   │   ├── 📁 authentication
│   │   │   └── sign-in, sign-up routes
│   │   └── 📁 organization
│   │       └── CRUD routes for organization, department, project, task
│   ├── 📁 config
│   │   └── Environment configuration files
│   ├── 📁 data-access
│   │   └── Database connection and models
│   ├── 📁 middlewares
│   │   └── Express middleware functions
│   ├── 📁 seeders
│   │   └── Migration and seed data
│   ├── 📁 services
│   │   └── Business logic and database operations
│   └── 📁 utils
│       └── Utility/helper functions
│   ├── 📄 index.js               ← Express app entry point
```

---

## 📜 Scripts

| Script         | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `npm run dev`  | Runs the app in development mode; restarts on changes.               |
| `npm run seed` | Executes the seed script to populate the database with initial data. |
