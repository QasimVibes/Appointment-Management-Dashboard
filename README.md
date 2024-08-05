# Appointment Management Dashboard

## Project Overview

The Appointment Management Dashboard is designed to streamline the process of scheduling and managing appointments. This application provides robust features for authentication, profile management, appointment scheduling, and analytics.

## Features

### Authentication

- **User Authentication**
  - Implement authentication functionality for users.
  - Set up signup and signin via email/password and Google accounts.
  - Include forgot password and reset password features.

### Signup and Profile

- **Signup Form**
  - Create a signup form allowing users to input availability days and hours range.
  - Implement validation for the input fields.
- **Profile Editing**
  - Develop functionality for users to change their profile information.
  - Create a page or section where users can update their availability.

### Dashboard

- **User Dashboard**
  - Design a dashboard for users to view upcoming, pending, and past scheduled meetings.
  - Implement filters or tabs for easy navigation between different types of meetings.
- **Analytics**
  - Develop analytics features for users to see the number of visits to their appointment page, scheduled appointments, and peak hours.
  - Display analytics data in a clear and understandable format.

### Appointment Scheduling

- **Unique Appointment URL**
  - Implement functionality for users to generate a unique URL to share with others for scheduling appointments.
  - Ensure each URL is unique to the user and can be easily shared.
- **Email Notifications**
  - Set up email notifications to be sent to both the appointment host and guest upon scheduling an appointment.
  - Include appointment details and confirmation information in the email.

### Calendar Integration

- **Google Meet Integration**
  - Develop functionality to generate a Google Meet URL for scheduled appointments.
  - Include the Google Meet URL in appointment confirmation emails.
- **ICS File Generation**
  - Implement functionality to generate an ICS file for scheduled appointments.
  - Allow users to download and add the appointment to their calendar applications.

## Tech Stack

- **Framework:** Next.js
- **State Management:** Redux Toolkit
- **Authentication:** NextAuth.js
- **Database:** MongoDB
- **ORM:** Prisma
- **Language:** TypeScript

## Getting Started

To get started with the Appointment Management Dashboard, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/techlosetbootcamp/appointment-management-dashboard-muhammad-qasim.git

2. **Install dependencies:**
   ```sh
   npm install

3. **Set up environment variables:**
   ```sh
   DATABASE_URL=*
   NEXTAUTH_SECRET=*
   SMTP_USER=*
   SMTP_PASS=*
   SECRET_KEY=*
   GOOGLE_CLIENT_ID=*
   GOOGLE_CLIENT_SECRET=*
   GOOGLE_REDIRECT_URI=*
   URL=*
   NEXT_PUBLIC_API_BASE_URL=*

4. **Run the development server:**
   ```sh
   npm run dev

5. **Open the app:**

    Open http://localhost:3000 to view it in your browser.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgements
- Thanks to the contributors and open-source projects that make this project possible.
