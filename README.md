# Smart Forms
**Smart Forms** is a Next.js application designed to help users generate and manage forms using AI. This platform allows users to create, customize, and share forms, as well as collect and analyze responses efficiently.

## Features
- **AI Form Generation**: Utilizes Gemini API to create intelligent forms based on user input.
- **Form Customization**: Full editing and styling capabilities for generated forms.
- **Form Sharing**: Easy distribution of forms to collect responses.
- **Dashboard**: User-friendly interface to view and manage forms and responses.
- **Response Export**: Option to export collected responses in .xlsx format.
- **User Authentication**: Secure login and registration with Clerk.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used
- **Next.js**: React framework for server-side rendering and API routes.
- **React**: JavaScript library for building user interfaces.
- **JavaScript**: Programming language for frontend and backend logic.
- **Gemini API**: AI-powered form generation.
- **PostgreSQL**: Relational database for data storage.
- **Drizzle ORM**: TypeScript ORM for database operations.
- **Clerk**: Authentication and user management.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui**: React component library.
- **DaisyUI**: Tailwind CSS component library.

## Installation
To get started, follow these steps:
1. **Clone the repository**:
    ```bash
    git clone https://github.com/Abhyuday-Dev/smartforms.git
    ```
2. **Navigate into the project directory**:
    ```bash
    cd smartforms
    ```
3. **Install the dependencies**:
    ```bash
    npm install
    ```
4. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=
    NEXT_PUBLIC_DRIZZLE_DATABASE_URL=
    NEXT_PUBLIC_GEMINI_API_KEY=
    NEXT_PUBLIC_BASE_URL=
    ```
5. **Set up the database**:
    ```bash
    npm run db:push
    ```
6. **Run the development server**:
    ```bash
    npm run dev
    ```
   Open `http://localhost:3000` in your browser to view the application.

## Usage
1. **Sign Up / Sign In**: Use Clerk authentication to create an account or log in.
2. **Generate Form**: Use the AI-powered form generator to create a new form.
3. **Customize Form**: Edit and style your form using the built-in editor.
4. **Share Form**: Obtain a shareable link to collect responses.
5. **View Responses**: Access the dashboard to view and analyze collected responses.
6. **Export Data**: Export form responses in .xlsx format.


## Contributing
We welcome contributions to the project! To contribute:
1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature`.
3. **Make your changes**.
4. **Commit your changes**: `git commit -am 'Add new feature'`.
5. **Push to your branch**: `git push origin feature/your-feature`.
6. **Create a Pull Request**.
Please follow coding guidelines and add tests for new features.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Gemini API](https://deepmind.google/technologies/gemini/)
- [PostgreSQL](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Clerk](https://clerk.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [DaisyUI](https://daisyui.com/)
