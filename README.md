# PWA Project Portal

Welcome to the **PWA Project Portal**! This is a modern web application built with Next.js that allows users to manage projects, create and tag employees, view wage determinations, and more. The application uses a modern tech stack with responsive design, dynamic routing, and secure authentication.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Migrations](#database-migrations)
- [Deployment](#deployment)
- [Developer Workflow](#developer-workflow)
- [License](#license)

---

## Features

- **User Authentication:** Secure login, registration, and logout using JWT stored as HTTP-only cookies.
- **Role-based Access:** Different experiences for Developers, EPC, and Subcontractors.
- **Project Management:** Create new projects with details such as project name, description, construction type, location, start date, and more.
- **Employee Management:** Add employees to a project with designated labor types and view wage determinations.
- **Modern UI:** Responsive sidebar with smooth transitions and a minimal design inspired by ShadCN UI components.
- **Dynamic Routing:** Server-side API routes with Next.js for projects, profiles, and authentication.
- **Wage Determination:** (Under development) Serves wage determination data based on employee labor type, project location, and start date.

---

## Tech Stack

- **Next.js 15:** Modern React framework with the new App Router and Server Components.
- **React 19:** UI library for building interactive user interfaces.
- **TypeScript:** Strongly-typed JavaScript for improved maintainability.
- **Prisma:** ORM for interacting with the SQLite database.
- **SQLite:** Lightweight file-based database.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **ShadCN UI Components:** Prebuilt and customizable components for a modern design.
- **JWT & bcryptjs:** For secure authentication.
- **date-fns & React Day Picker:** For date manipulation and a date picker UI.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (v7 or higher) or **Yarn**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/pwa-project-portal.git
   cd pwa-project-portal
