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
    const parts = [personalInfo?.address, personalInfo?.city, personalInfo?.postalCode, personalInfo?.country].filter(
      Boolean,
    )
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
    <div ref={ref} className="cv-container">
      {!hasAnyData && (
        <div className="empty-state">
          <p>No CV data to display. Add your information to see the preview.</p>
        </div>
      )}

      {hasAnyData && (
        <>
          {/* Left Sidebar */}
          <div className="cv-sidebar">
            {/* Profile Photo - only show if photo exists */}
            {personalInfo?.photo && (
              <div className="profile-photo-container">
                <img src={personalInfo.photo || "/placeholder.svg"} alt="Profile" className="profile-photo" />
              </div>
            )}

            {/* Name and Title - only show if name or title exists */}
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

            {/* Profile Description - only show if profile exists */}
            {profile && (
              <div className="profile-section">
                <p className="profile-text">{profile}</p>
              </div>
            )}

            {/* Contact Information - only show if any contact info exists */}
            {(personalInfo?.phone ||
              personalInfo?.email ||
              getFullAddress() ||
              personalInfo?.website ||
              personalInfo?.linkedin ||
              personalInfo?.dateOfBirth ||
              personalInfo?.nationality ||
              personalInfo?.sex ||
              personalInfo?.maritalStatus ||
              personalInfo?.drivingLicense) && (
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
                  {personalInfo?.dateOfBirth && (
                    <div className="contact-item">
                      <Calendar size={16} />
                      <span>{personalInfo.dateOfBirth}</span>
                    </div>
                  )}
                  {personalInfo?.nationality && (
                    <div className="contact-item">
                      <User size={16} />
                      <span>{personalInfo.nationality}</span>
                    </div>
                  )}
                  {personalInfo?.sex && (
                    <div className="contact-item">
                      <User size={16} />
                      <span>{personalInfo.sex.charAt(0).toUpperCase() + personalInfo.sex.slice(1)}</span>
                    </div>
                  )}
                  {personalInfo?.maritalStatus && (
                    <div className="contact-item">
                      <Heart size={16} />
                      <span>{personalInfo.maritalStatus}</span>
                    </div>
                  )}
                  {personalInfo?.drivingLicense && (
                    <div className="contact-item">
                      <GitFork size={16} />
                      <span>{personalInfo.drivingLicense}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div className="cv-main">
            {/* Education Section - only show if education data exists */}
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

            {/* Experience Section - only show if experience data exists */}
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

            {/* Skills Section - only show if skills data exists */}
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

            {/* Languages Section - only show if languages data exists */}
            {languages?.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">LANGUAGES</h3>
                <div className="section-content">
                  {languages.map((lang, index) => (
                    <div key={index} className="language-item">
                      <span className="language-name">{lang.language}</span>
                      <span className="language-level"> - Level {lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Sections - only show if additional sections data exists */}
            {hasAdditionalSections && (
              <div className="main-section">
                <h3 className="main-section-title">ADDITIONAL SECTIONS</h3>
                <div className="section-content">
                  {personalInfo?.customFieldTitle && personalInfo?.customFieldValue && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Info size={16} /> {personalInfo.customFieldTitle}
                      </h4>
                      <p className="additional-description">{personalInfo.customFieldValue}</p>
                    </div>
                  )}

                  {additionalSections?.signature?.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Feather size={16} /> Signature
                      </h4>
                      {additionalSections.signature.map((sig, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-description">
                            {sig.ville}, {sig.date}
                          </p>
                          <div className="signature-container">
                            <img
                              src={sig.signatureImage || "/placeholder.svg"}
                              alt="Signature"
                              className="signature-image"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalSections?.courses?.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <BookOpen size={16} /> Courses
                      </h4>
                      {additionalSections.courses.map((course, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{course.cours}</p>
                          <p className="additional-description">
                            {course.startMonth} {course.startYear} - {course.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalSections?.internships?.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Briefcase size={16} /> Internships
                      </h4>
                      {additionalSections.internships.map((internship, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">
                            {internship.poste}, {internship.employeur}
                          </p>
                          <p className="additional-description">
                            {getDuration(
                              internship.startMonth,
                              internship.startYear,
                              internship.endMonth,
                              internship.endYear,
                            )}
                          </p>
                          <p className="additional-description">{internship.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalSections?.extracurricular?.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Star size={16} /> Extracurricular Activities
                      </h4>
                      {additionalSections.extracurricular.map((activity, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">
                            {activity.poste}, {activity.employeur}
                          </p>
                          <p className="additional-description">
                            {getDuration(
                              activity.startMonth,
                              activity.startYear,
                              activity.endMonth,
                              activity.endYear,
                              activity.currentJob,
                            )}
                          </p>
                          <p className="additional-description">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalSections?.qualities?.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <SquareCheckBig size={16} /> Qualities
                      </h4>
                      {additionalSections.qualities.map((quality, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{quality.title}</p>
                          <p className="additional-description">{quality.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalSections?.certificates?.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <BookOpen size={16} /> Certificates
                      </h4>
                      {additionalSections.certificates.map((certificate, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{certificate.certificat}</p>
                          <p className="additional-description">
                            {certificate.month} {certificate.year}
                          </p>
                          <p className="additional-description">{certificate.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalSections?.achievements?.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Star size={16} /> Achievements
                      </h4>
                      {additionalSections.achievements.map((achievement, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{achievement.title}</p>
                          <p className="additional-description">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
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
