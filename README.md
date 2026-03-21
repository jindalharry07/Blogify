# 🖊️ Blogify - A Modern Blogging Platform

![Blogify Banner](file:///C:/Users/jinda/.gemini/antigravity/brain/a99c3c0f-5bf9-4828-88e7-e974dca20ef8/blogify_banner_1774098879033.png)

Welcome to **Blogify**! A robust, full-stack blogging application built using the latest modern web technologies. Blogify is designed to provide a seamless experience for both readers and content creators, featuring a secure admin dashboard, responsive design, and intuitive user interfaces.

---

## 🚀 Built With

| Feature           | Technology                                                                                                   |
|-------------------|-------------------------------------------------------------------------------------------------------------|
| **Core Framework**| [Next.js 16 (App Router)](https://nextjs.org/)                                                              |
| **Frontend**      | [React 19](https://reactjs.org/), [TailwindCSS 4](https://tailwindcss.com/)                                 |
| **Database**      | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)                                 |
| **Authentication**| [JWT (jose & jsonwebtoken)](https://github.com/panva/jose), [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)|
| **State/UI**      | [React Toastify](https://fkhadra.github.io/react-toastify/), [Axios](https://axios-http.com/)               |
| **Deployment**    | [Vercel](https://vercel.com/)                                                                               |

---

## ✨ Key Features

- **🔐 Secure Authentication**: 
    - Full Signup/Login flow with hashed passwords.
    - JWT based cookies for persistent user sessions.
    - Protected admin routes using Next.js Middleware.
- **🛠️ Admin Dashboard**:
    - Manage blogs directly from a dedicated interface.
    - Add, edit, or delete blog posts effortlessly.
- **✉️ Email Subscriptions**:
    - Integrated subscription system for readers to stay updated.
- **📱 Fully Responsive**:
    - Seamless browsing experience across mobile, tablet, and desktop.
- **⚡ Supercharged Performance**:
    - Powered by Next.js Server Side Rendering (SSR) and Client Side Hydration.

---

## 📂 Project Structure

```text
Blogify/
├── app/                 # Next.js App Router (pages & API routes)
│   ├── admin/           # Protected Admin pages
│   ├── api/             # Backend API endpoints (Auth, Blog, Email)
│   ├── blogs/           # Public blog view pages
│   ├── login/           # Login authentication page
│   ├── signup/          # Signup authentication page
│   └── profile/         # User profile management
├── Assets/              # Static assets, icons, and blog images
├── Components/          # Reusable UI components (Header, Footer, BlogItems, etc.)
├── lib/                 # Shared logic & configurations
│   ├── config/          # DB connection & environment setup
│   └── models/          # Mongoose Schemas (User, Blog, Email)
├── middleware.js        # Auth guarding and route redirection
├── public/              # Public static assets
└── package.json         # Project dependencies and script runner
```

---

## 🛠️ Getting Started

Follow these steps to set up and run Blogify locally.

### 📋 Prerequisites

- **Node.js**: v18.x or higher
- **MongoDB**: A running instance (local or Atlas)
- **Environment Variables**: Create a `.env.local` file in the root with your credentials:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

### ⚙️ Installation & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jindalharry07/Blogify.git
   cd Blogify
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Visit the app**:
   Open [http://localhost:3000](http://localhost:3000) to see Blogify in action!

---

## 🛡️ Authentication Flow

Blogify uses a sophisticated **Middleware** layered security:
- **Public Routes**: `/`, `/login`, `/signup` are accessible to all.
- **Redirection**: Authenticated users are automatically redirected away from `/login`/`/signup`.
- **Admin Protection**: Only users with the `admin` role can access `/admin`. This is enforced at the server-edge using `jose` JWT verification.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Blogify, feel free to fork the repo and submit a PR.

1. Fork it!
2. Create your feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Submit a pull request!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ by [jindalharry07](https://github.com/jindalharry07).
