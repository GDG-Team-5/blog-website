# Blog Website API Documentation

## Introduction

This repository contains the backend API for a modern blog platform built with Node.js and Express.js. The API provides a robust foundation for creating, managing, and interacting with blog content, along with comprehensive user authentication and profile management features.
You can find the full API documentation on Postman here:  
🔗 [View API on Postman] https://documenter.getpostman.com/view/43872045/2sB2ca5ed7

### Purpose
The blog platform is designed to provide a secure, scalable, and feature-rich environment for:
- Content creators to publish and manage their blog posts
- Readers to discover and interact with content
- Users to manage their profiles and preferences
- Developers to extend and customize the platform

### Key Components
1. **Authentication System**
   - Secure user registration and login
   - Social authentication via Google OAuth
2. **Content Management**
   - CRUD operations for blog posts
   - Content organization and categorization
   - Media handling and storage

3. **User Management**
   - Profile customization
   - Activity tracking
4. **API Architecture**
   - RESTful endpoints
   - Middleware-based authentication
   - Request validation
   - Error handling


### Technical Implementation
The backend is built using:
- **Node.js** for the runtime environment
- **Express.js** for the web framework
- **MongoDB** for data storage
- **JWT** for authentication
- **Passport.js** for OAuth integration
- **Joi** for request validation
- **Winston** for logging

### Development Status
- Current Version: 1.0.0
- Active Development: Yes
- Production Ready: Yes
- Test Coverage: Comprehensive

### Target Audience
This API is designed for:
- Bloggers and content creators
- Web developers building blog platforms
- Teams managing content-heavy websites
- Educational institutions teaching web development

## Features

### 1. User Authentication System
- **Email/Password Authentication**
  - Secure registration and login system
  - Password hashing using bcrypt
  - Email verification system
  - Password reset functionality with email notifications

- **Social Authentication**
  - Google OAuth integration
  - Seamless login with Google accounts
  - Automatic profile information sync
  - Secure token handling

- **Session Management**
  - JWT-based authentication
  - Configurable token expiration
  - Secure token storage

### 2. Blog Post Management
- **Post Creation **
  - Rich text editor support
### 2. User Profile Management

### 3. Security Features
- **Data Protection**
  - Password encryption
  - Secure session handling
  - CSRF protection
  - XSS prevention

- **Access Control**
  - Role-based permissions
  - Content ownership verification
  - API rate limiting
  - IP-based security measures

### 4. Performance Optimization
- **Database Optimization**
 
  - Efficient data modeling
  - Query optimization
  - Connection pooling
### 5. Developer Experience
- **API Documentation**
  - Comprehensive endpoint documentation
  - Example requests and responses
  - Authentication guides
  - Error handling documentation

- **Development Tools**
  - Environment configuration
  - Logging system
  - Testing framework
  - Debugging tools

## Table of Contents
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Environment Setup](#environment-setup)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google OAuth credentials

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```env
DB_URL=mongodb://localhost:27017/blog-website
PORT=3000

## Environment at which the app runs
NODE_ENV=production

# The time after wich the tokens expires
ACESS_TOKEN_EXPIRES_IN_MINUTES=15
REFRESH_TOKEN_EXPIRES_IN_DAYS=15
RESET_PASSWORD_TOKEN_EXPIRES_IN_SECONDS=60
EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_SECONDS=600

# The secret key used to sign the tokens
JWT_SECRET_KEY=secret_key
#email configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_FROM=your gmail # you need to use an app password
USER_EMAIL=your gmail # you need to use an app password
USER_PASSWORD=your gmail password # you need to use an app password
APP_NAME=blog-website


GOOGLE_CLIENT_ID =173834096589-4jshddnvf4s0c5fggnt5tp6mgi39up8m.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET =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
SESSION_SECRET = session_secret
SERVER_URL=http://localhost:3000

```

### Running the Server
```bash
npm start
```
The server will start at `http://localhost:3000`

## API Endpoints

### Authentication

#### 1. Register a New User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### 2. Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### 3. Google OAuth Login
```http
POST /api/v1/auth/google
```
This will redirect to Google's login page. After successful authentication, you'll be redirected back with an access token.

#### 4. Logout
```http
POST /api/v1/auth/logout
```

#### 5. Password Reset Request
```http
POST /api/v1/auth/reset-password/request
Content-Type: application/json

{
  "email": "string"
}
```

#### 6. Reset Password
```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "string",
  "newPassword": "string"
}
```

### Posts

#### 1. Create Post
```http
POST /api/v1/posts
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "string",
  "content": "string"
}
```

#### 2. Get All Posts
```http
GET /api/v1/posts
```

#### 3. Get Single Post
```http
GET /api/v1/posts/:id
```

#### 4. Update Post
```http
PUT /api/v1/posts/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "string",
  "content": "string"
}
```

#### 5. Delete Post
```http
DELETE /api/v1/posts/:id
Authorization: Bearer <token>
```

### Profile

#### 1. Get User Profile
```http
GET /api/v1/profile
Authorization: Bearer <token>
```

#### 2. Update Profile
```http
PUT /api/v1/profile
Content-Type: application/json
Authorization: Bearer <token>

{
  "username": "string",
  "bio": "string"
}
```

## Authentication

### JWT Authentication
- Most endpoints require a JWT token in the Authorization header
- Token format: `Authorization: Bearer <token>`
- Tokens expire after 15 minutes (configurable)

### Google OAuth
1. Visit `/api/v1/auth/google` to initiate Google login
2. After successful authentication, you'll receive an access token
3. Use this token in the Authorization header for protected routes

## Environment Setup

### Development
- Base URL: `http://localhost:3000`
- Google OAuth callback URL: `http://localhost:3000/api/v1/auth/google/callback`

### Production
- Update `SERVER_URL` in `.env` to your production domain
- Update Google OAuth callback URL in Google Cloud Console
- Set `NODE_ENV=production`

## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses include a message and status code:
```json
{
  "statusCode": 400,
  "message": "Error message here"
}
```

## Project Structure

```
blog-website/
├── src/
│   ├── configs/           # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── validations/      # Request validations
│   └── app.js           # Express application
├── tests/               # Test files
├── logs/               # Application logs
├── .env               # Environment variables
└── package.json       # Project dependencies
```

## Contributing

### Development Workflow
1. Create a new branch for your feature
2. Make your changes
3. Run tests
4. Submit a pull request

### Code Style
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Write unit tests for new features

### Git Commit Messages
- Use present tense
- Be descriptive but concise
- Reference issue numbers if applicable

### Testing
- Run tests before submitting PR
- Add tests for new features
- Maintain test coverage

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Express.js team
- MongoDB
- Google OAuth
- All contributors

## Support
For support, email support@blogwebsite.com or create an issue in the repository. 
