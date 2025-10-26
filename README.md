# TicketApp — Full-Stack Ticket Management System

![TicketApp Demo](public/assets/wave-hero.svg)

A comprehensive ticket management web application built with React, TypeScript, Bootstrap, and Vite. This application allows users to manage support tickets efficiently with a modern UI/UX design and responsive layout.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure login and signup with form validation
- **Ticket Management**: Full CRUD (Create, Read, Update, Delete) operations
- **Dashboard Overview**: Summary statistics of open, in-progress, and closed tickets
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Status Tracking**: Color-coded ticket statuses (open, in-progress, closed)
- **Real-time Validation**: Inline error messages and toast notifications
- **Persistent Data**: Uses localStorage for client-side data persistence

### Design & UX
- **Max-width Layout**: 1440px centered layout for consistent experience
- **Wavy Background**: Hero section with SVG wave background
- **Decorative Elements**: Circles and modern design elements
- **Bootstrap Framework**: Consistent and responsive UI components
- **Accessibility**: Proper ARIA attributes and semantic HTML
- **Toast Notifications**: User-friendly feedback system

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Bootstrap 5
- **Build Tool**: Vite
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Styling**: CSS with Bootstrap utilities
- **Storage**: localStorage for client-side persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── Landing.tsx
├── context/
│   ├── AuthContext.tsx
│   ├── TicketContext.tsx
│   └── ToastContext.tsx
├── pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── Dashboard.tsx
│   └── TicketsPage.tsx
├── routes/
│   └── ProtectedRoute.tsx
├── App.tsx
├── index.css
└── main.tsx
```

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ticket-management-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Add required assets**
   - Create `public/assets/` directory
   - Add `wave-hero.svg` to `public/assets/` directory

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
   - Visit `http://localhost:5173` to see the application

## 🔐 Authentication

### Default Credentials
- **Email**: `demo@example.com`
- **Password**: `demopassword`

### Authentication Flow
1. Users can sign up to create an account
2. Login required for dashboard and ticket management
3. Session stored in `localStorage` with key `ticketapp_session`
4. Session expiry after 30 minutes of inactivity (or stays logged in if selected)
5. Logout clears session and redirects to landing page

## 🎫 Ticket Management

### Ticket Fields
- **Title** (required): Short title describing the ticket
- **Description** (required): Detailed description of the issue
- **Status** (required): open, in_progress, closed
- **Priority**: low, medium, high

### Status Colors
- **Open**: Green tone (#1abc9c) - Ready to be worked on
- **In Progress**: Amber tone (#f39c12) - Currently being worked on
- **Closed**: Gray tone (#7f8c8d) - Completed/resolved

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Up to 670px (669.98px max)
  - Stacked layout with hamburger navigation
  - Single column for cards and form elements
- **Tablet**: 670px - 991px
  - 2-column grid for ticket cards
  - Responsive navigation
- **Desktop**: 992px and above
  - 3-column grid for ticket cards
  - Full navigation visible
  - 1440px max-width centered layout

## ⚙️ API & Storage

### Data Persistence
- **User Data**: Stored in `localStorage` key `ticketapp_users`
- **Session Data**: Stored in `localStorage` key `ticketapp_session`
- **Ticket Data**: Stored in `localStorage` key `tickets`

### Context Providers
1. **AuthContext**: Manages authentication state
2. **TicketContext**: Manages ticket data and CRUD operations
3. **ToastContext**: Manages notifications and feedback

## 🔒 Security Considerations

> **Note**: This is a client-side simulation
- Authentication is simulated using localStorage
- No server-side validation is implemented
- Data is not encrypted in localStorage
- Only suitable for demonstration/testing purposes
- Production implementation requires server-side authentication

## 🧩 Components Overview

### Layout Components
- **Header**: Responsive navigation with user authentication state
- **Footer**: Contains contact information and copyright

### Page Components
- **Landing**: Hero section with wave background and CTA buttons
- **Login**: Form with validation and error handling
- **Signup**: Registration form with password confirmation
- **Dashboard**: Summary statistics and quick access
- **TicketsPage**: Full CRUD interface for ticket management

### Context Providers
- Handle application state management
- Provide data to child components
- Implement business logic for authentication and ticket operations

## 🎨 Styling & Themes

### Bootstrap Integration
- Full Bootstrap 5 framework integration
- Custom CSS variables for consistent theming
- Responsive utility classes for all screen sizes
- Custom component styling that extends Bootstrap

### Color Palette
- **Primary**: #3b82f6 (blue for actions)
- **Success**: #10b981 (green for open tickets)
- **Warning**: #f59e0b (amber for in-progress tickets)
- **Secondary**: #6b7280 (gray for closed tickets)

## 🧪 Testing

### Development Testing
1. **Form Validation**: Test required fields and format validation
2. **Authentication Flow**: Test login/logout with different credentials
3. **CRUD Operations**: Create, read, update, and delete tickets
4. **Responsive Behavior**: Test on different screen sizes
5. **Data Persistence**: Verify data remains after page refresh

### Error Handling
- Invalid login credentials
- Form validation errors
- Network-related errors (simulated)
- Unauthorized access attempts

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Serve Production Build
```bash
npm install -g serve
serve -s dist
```

### Environment Requirements
- Static file server capable of serving HTML
- Proper MIME type configuration for assets
- HTTPS recommended for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact:
- Email: support@ticketapp.com
- Phone: +1 (234) 567-8900

## 🙏 Acknowledgments

- React and React Router DOM for routing and component architecture
- Bootstrap for responsive UI components
- Vite for fast development and build tooling
- TypeScript for type safety

---

Built with ❤️ for the Stage 2 task.