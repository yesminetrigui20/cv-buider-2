import { forwardRef } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Calendar,
  User,
  GitFork,
  Heart,
  BookOpen,
  Briefcase,
  Star,
  SquareCheckBig,
  Feather,
  Info,
} from "lucide-react"
import "../CVPreview.css"

const CVPreview = forwardRef(({ data }, ref) => {
  const { personalInfo, profile, education, experience, skills, languages, additionalSections } = data || {}

  const getFullAddress = () => {
    const parts = [personalInfo?.address, personalInfo?.city, personalInfo?.postalCode, personalInfo?.country].filter(Boolean)
    return parts.join(", ")
  }

  const getDuration = (startMonth, startYear, endMonth, endYear, isCurrent) => {
    if (isCurrent) return `${startMonth} ${startYear} - Present`
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}` || "Dates not specified"
  }

  const hasAdditionalSections = additionalSections && Object.keys(additionalSections).length > 0

  const hasAnyData =
    personalInfo ||
    profile ||
    education?.length > 0 ||
    experience?.length > 0 ||
    skills?.length > 0 ||
    languages?.length > 0 ||
    hasAdditionalSections

  return (
    <div 
      ref={ref} 
      className="cv-container"
      style={{
        width: '210mm',
        minHeight: '297mm',
        transform: 'scale(0.95)',
        transformOrigin: 'top center'
      }}
    >
      {!hasAnyData && (
        <div className="empty-state">
          <p>No CV data to display. Add your information to see the preview.</p>
        </div>
      )}

      {hasAnyData && (
        <>
          {/* Left Sidebar */}
          <div className="cv-sidebar">
            {/* Profile Photo */}
            {personalInfo?.photo && (
              <div className="profile-photo-container">
                <img 
                  src={personalInfo.photo} 
                  alt="Profile" 
                  className="profile-photo"
                  crossOrigin="anonymous"
                />
              </div>
            )}

            {/* Name and Title */}
            {(personalInfo?.firstName || personalInfo?.lastName || personalInfo?.jobTitle) && (
              <div className="name-section">
                {(personalInfo?.firstName || personalInfo?.lastName) && (
                  <h1 className="name">
                    {personalInfo?.firstName || ""} {personalInfo?.lastName || ""}
                  </h1>
                )}
                {personalInfo?.jobTitle && <h2 className="job-title">{personalInfo.jobTitle}</h2>}
              </div>
            )}

            {/* Profile Description */}
            {profile && (
              <div className="profile-section">
                <p className="profile-text">{profile}</p>
              </div>
            )}

            {/* Contact Information */}
            {(personalInfo?.phone ||
              personalInfo?.email ||
              getFullAddress() ||
              personalInfo?.website ||
              personalInfo?.linkedin) && (
              <div className="contact-section">
                <h3 className="section-title">CONTACT</h3>
                <div className="contact-items">
                  {personalInfo?.phone && (
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo?.email && (
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {getFullAddress() && (
                    <div className="contact-item">
                      <MapPin size={16} />
                      <span>{getFullAddress()}</span>
                    </div>
                  )}
                  {personalInfo?.website && (
                    <div className="contact-item">
                      <Globe size={16} />
                      <span>{personalInfo.website}</span>
                    </div>
                  )}
                  {personalInfo?.linkedin && (
                    <div className="contact-item">
                      <Linkedin size={16} />
                      <span>{personalInfo.linkedin}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div className="cv-main">
            {/* Education Section */}
            {education?.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">EDUCATION</h3>
                <div className="section-content">
                  {education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <h4 className="education-degree">
                        {edu.degree}, {edu.school}
                      </h4>
                      <p className="education-date">
                        ({getDuration(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear, edu.isCurrent)},{" "}
                        {edu.city})
                      </p>
                      {edu.description && <p className="education-description">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {experience?.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">EXPERIENCE</h3>
                <div className="section-content">
                  {experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <h4 className="experience-title">
                        {exp.jobTitle}, {exp.employer}
                      </h4>
                      <p className="experience-date">
                        ({getDuration(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)})
                      </p>
                      {exp.description && <p className="experience-description">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {skills?.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">SKILLS</h3>
                <div className="skills-content">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: `${skill.level || 80}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
})

CVPreview.displayName = "CVPreview"

export default CVPreview