# Anjiz | Professional Task Management System

Anjiz is a high-performance task management application developed as a technical demonstration of full-stack integration and state management. The project serves as a showcase of clean code practices, efficient UI/UX design, and robust data handling.

### 🛠 Technical Architecture

This application utilizes a modern, strictly typed stack to ensure scalability and maintainability:

- **Frontend Framework:** React, TypeScript, Vite 

- **Styling:** Tailwind CSS & DaisyUI

- **State Management:** Zustand

- **Validation:** Zod

- **API/Communication:** Axios & JSON Server

- **Authentication:** JWT (JSON Web Tokens)

- **User Feedback:** React-Toastify

### 🚀 Core Functionalities

- Developed to demonstrate proficiency in handling complex state and data flow:

- Secure Authentication: Implementation of JWT-based authentication for protected route access and user sessions.

- Task Lifecycle Management: Full CRUD operations allowing for the seamless creation, editing, and deletion of tasks.

-Data Retrieval & Organization: Advanced search and filtering capabilities to manage high volumes of task data efficiently.

-Performance Dashboard: A centralized analytics view that utilizes data processing to provide visual summaries and productivity statistics.

### ⚙️ Getting Started

To evaluate the application locally, please follow the steps below:

`Prerequisites`

Node.js installed on your system.

-Setup
Clone the repository and navigate to the project directory.

-Install the necessary dependencies:


`npm install`

- Execution
This application requires a dual-process environment to function correctly. Please run the following commands in separate terminal sessions:

-Initialize the local API Server:


`npm run server`

-Launch the development environment:


`npm run dev`

-The application will be accessible at the local URL provided by the Vite development server (typically http://localhost:5173).

### 💡 Engineering Highlights

- Type Safety: Leveraged TypeScript throughout the application to reduce runtime errors and enhance code readability.

- State Efficiency: Used Zustand for lightweight, scalable state management, ensuring the UI remains performant during rapid task updates.

- Schema Validation: Integrated Zod to enforce strict data integrity before API submission.

- Professional UI: Utilized DaisyUI and Tailwind CSS to build a clean, consistent, and user-friendly interface.