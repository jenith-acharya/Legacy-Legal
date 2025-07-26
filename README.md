[Watch Demo Video]

(https://www.youtube.com/watch?v=TZIhJpGPWG0)

🏛️ LegacyLegal.com
LegacyLegal.com is a full-stack legal services platform developed using the MERN stack (MongoDB, Express.js, React, Node.js). The website includes a powerful admin panel for managing legal content and users. It features secure authentication, blog and member management, dynamic areas of legal practice, role-based access control (RBAC), pagination, and contact form handling.
<hr/>

🔧 Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

Architecture: MERN Stack

<hr/>
✨ Features

🔐 Admin Panel
Secure Login/Logout with JWT

Role-Based Access Control (RBAC): Only authorized roles (e.g., Admin, Editor) can access or modify sensitive data

Pagination for Blogs: Easily navigate large sets of blog entries

<strong>Full CRUD for: </strong>

 1. Legal Blogs

 2. Team Members

 3.Areas of Practice

📖Blogs
Add and manage legal blog posts

Blog search (by title/content)

Paginated view in admin panel for efficient management

🧑‍💼 Team Members
Add, edit, or delete legal team members

Each profile includes:

Name

Title/Position

Image and Bio

⚖️ Areas of Practice
Create and categorize legal service areas (e.g., Family Law, Criminal Law)

Admin can dynamically manage these categories

📬 Contact & Inquiry Form
Public users can send inquiries via a secure contact form

Admin can view/manage submitted inquiries from the dashboard
<hr/>

🔍 Additional Functionality
🔒 JWT Authentication

🔎 Search Blogs by keywords or title

⏩ Pagination on blog listings (especially in admin panel)

🧑‍⚖️ RBAC: Admin vs. Editor vs. Viewer permissions

📨 Contact Form Submissions saved to database or sent via email

<hr/>

📦 Installation
Clone the repository

bash

git clone https://github.com/your-username/legacylegal.com.git
cd legacylegal.com
Backend Setup

bash

cd backend
npm install
npm start
Frontend Setup

bash

cd frontend
npm install
npm start

Environment Variables

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

<hr/>
