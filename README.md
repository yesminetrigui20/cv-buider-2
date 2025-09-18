# CV Builder - React Application

A modern, dark-themed CV builder application that replicates the functionality of cv.fr with a sleek, professional interface.

## Features

### ✨ Complete CV Builder Functionality
- **Personal Information**: Full contact details with optional fields (date of birth, nationality, driving license, etc.)
- **Profile Section**: Professional summary with rich text editing
- **Education**: Multiple education entries with dates and descriptions
- **Work Experience**: Professional experience with company details and achievements
- **Skills**: Technical and soft skills with proficiency levels
- **Languages**: Language proficiency with standardized levels (A1-C2, Native)
- **Interests**: Personal interests and hobbies
- **Additional Sections**: Courses, internships, certificates, references, and more

### 🎨 Modern Dark Theme Design
- Professional dark color scheme matching the provided design
- Responsive layout that works on all screen sizes
- Smooth animations and hover effects
- Clean, modern UI components using shadcn/ui

### ⚡ Real-time CV Preview
- Live preview updates as you type
- Professional CV formatting
- Proper date formatting and layout
- Section-based organization

### 🔧 Advanced Features
- Collapsible sections for better organization
- Dynamic add/remove functionality for all list-based sections
- Form validation and proper state management
- Upload placeholders for CV import and LinkedIn integration
- Comprehensive field management with optional additions

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icons
- **JavaScript (JSX)** - Modern JavaScript with JSX syntax

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or pnpm package manager

### Installation Steps

1. **Extract the project files**
   ```bash
   unzip cv-builder-source.zip
   cd cv-builder
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   *Note: Use `--legacy-peer-deps` flag to resolve any dependency conflicts*

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## Usage Guide

### Getting Started
1. **Personal Information**: Start by filling in your basic contact details
2. **Profile**: Add a professional summary describing your expertise
3. **Education**: Click the "+" button to add your educational background
4. **Experience**: Add your work experience with detailed descriptions
5. **Skills**: List your technical and soft skills with proficiency levels
6. **Languages**: Add languages you speak with proficiency levels
7. **Interests**: Include personal interests and hobbies
8. **Additional Sections**: Use the "Bas de page" section to add extra information

### Key Features
- **Expandable Sections**: Click on section headers to expand/collapse
- **Dynamic Fields**: Use "+" buttons to add multiple entries
- **Real-time Preview**: See your CV update live on the right panel
- **Optional Fields**: Add extra personal details using the button options
- **Professional Formatting**: The preview shows how your CV will look when printed

### Section Details

#### Personal Information
- Basic fields: First name, last name, job title, email, phone, address
- Optional fields: Date of birth, place of birth, nationality, driving license, gender, marital status, website, LinkedIn
- Photo upload placeholder (UI ready for implementation)

#### Education & Experience
- Multiple entries supported
- Date ranges with proper formatting
- Institution/company details
- Descriptions for achievements and responsibilities

#### Skills & Languages
- Predefined proficiency levels
- Skills: Beginner, Intermediate, Advanced, Expert
- Languages: A1-C2 European framework levels + Native

#### Additional Sections
- Courses, Stages, Extracurricular activities
- References, Qualities, Certificates
- Achievements, Signature, Custom sections

## Project Structure

```
cv-builder/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.jsx    # Application header
│   │   ├── FormSection.jsx # Main form container
│   │   ├── CVPreview.jsx # Live CV preview
│   │   ├── PersonalInformation.jsx
│   │   ├── ProfileSection.jsx
│   │   ├── EducationSection.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── LanguagesSection.jsx
│   │   ├── InterestsSection.jsx
│   │   └── AdditionalSections.jsx
│   ├── App.jsx           # Main application component
│   ├── App.css          # Global styles and theme
│   └── main.jsx         # Application entry point
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization
The application uses a modular component structure, making it easy to:
- Add new sections
- Modify styling and themes
- Extend functionality
- Integrate with backend services

### Styling
- Dark theme implemented with Tailwind CSS
- Custom color palette defined in `App.css`
- Responsive design with mobile-first approach
- Consistent spacing and typography

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **Dependency conflicts during installation**
   - Solution: Use `npm install --legacy-peer-deps`

2. **Port already in use**
   - Solution: The dev server will automatically find an available port

3. **Styling issues**
   - Solution: Ensure Tailwind CSS is properly loaded in `App.css`

### Performance
- The application is optimized for smooth real-time updates
- State management is efficient with minimal re-renders
- All components are properly memoized where necessary

## Future Enhancements
- PDF export functionality
- Save/load CV data
- Multiple CV templates
- Backend integration for data persistence
- Advanced text formatting options
- Photo upload implementation

## License
This project is created for educational and demonstration purposes.

## Support
For issues or questions, please refer to the component documentation or React/Vite official documentation.

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**

