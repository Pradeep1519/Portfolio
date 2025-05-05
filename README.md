# OwnSite

A personal portfolio website built using **Next.js**, **React**, and **Tailwind CSS**. This project showcases your skills, projects, experience, and education while providing a functional contact form for visitors to connect with you.

## Features

- **Hero Section**: A visually appealing introduction to your portfolio.
- **About Section**: A brief overview of your background and expertise.
- **Skills Section**: Highlights your technical skills and proficiencies.
- **Projects Section**: Showcases your key projects with descriptions.
- **Experience Section**: Lists your professional experience.
- **Education Section**: Displays your academic qualifications.
- **Testimonials Section**: Features testimonials from clients or colleagues.
- **Contact Section**: A functional contact form to allow visitors to connect with you.
- **Google Sheets Integration**: Saves contact form submissions to Google Sheets.
- **Excel Backup**: Automatically creates Excel backups of form submissions in Google Drive.
- **Email Notifications**: Sends email notifications for new form submissions.

## Technologies Used

### Frontend
- **Next.js**: Framework for server-side rendering and static site generation.
- **React.js**: Library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lottie Animations**: For adding animations to sections.

### Backend
- **Google Apps Script**: Handles form submissions and integrates with Google Sheets and Drive.
- **Google Sheets API**: Stores form submissions in a Google Sheet.
- **Google Drive API**: Creates Excel backups of form submissions.
- **Gmail API**: Sends email notifications for form submissions.

### Languages
- **TypeScript**
- **JavaScript**
- **HTML**
- **CSS**

## Getting Started

### Prerequisites
- Node.js installed on your system.
- A Google account for backend integration.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ownsite.git
   cd ownsite
2. Install dependencies
    npm install
3. Run the development server
    npm run dev
Open http://localhost:3000 in your browser to view the site.

### **Step 5: Add a Contact Form Setup Section**
Explain how to set up the backend for the contact form.

## Contact Form Setup

### Backend Setup
1. Open [Google Apps Script](https://script.google.com/).
2. Create a new project and paste the code from `contact-form-backend.js`.
3. Deploy the script as a Web App:
   - Go to `Deploy > New Deployment`.
   - Select `Web App`.
   - Set `Execute as` to your account.
   - Set `Who has access` to `Anyone with the link`.
   - Copy the Web App URL.

### Connect the Frontend
1. Update the `action` attribute in the contact form to point to your Web App URL:
   ```html
   <form action="YOUR_WEB_APP_URL" method="post">

2. Test the form by submitting a sample entry.

---

### **Step 6: Add a Folder Structure Section**
Provide an overview of the project structure.

```markdown
## Folder Structure
OwnSite/
├── public/                # Static assets (images, icons, etc.)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── page.tsx       # Main page file
│   │   └── _document.tsx  # Custom HTML structure
│   ├── components/        # Reusable components
│   │   ├── sections/      # Portfolio sections (Hero, About, Skills, etc.)
│   │   └── ui/            # UI components (e.g., Separator)
│   └── google-apps-script/
│       └── contact-form-backend.js  # Google Apps Script backend
├── README.md              # Project documentation
├── package.json           # Project dependencies
└── tailwind.config.js     # Tailwind CSS configuration
```

## Deployment

### Frontend
- Deploy the frontend using a hosting platform like **Vercel**:
  - Push your code to a GitHub repository.
  - Connect the repository to Vercel.
  - Deploy the site with a single click.

### Backend
- Ensure the Google Apps Script Web App is deployed and accessible.

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.






