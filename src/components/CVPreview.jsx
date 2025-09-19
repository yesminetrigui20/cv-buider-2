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

  // Fonction getDuration améliorée pour gérer les valeurs undefined
  const getDuration = (startMonth, startYear, endMonth, endYear, isCurrent) => {
    const start = `${startMonth || ''} ${startYear || ''}`.trim()
    const end = isCurrent ? "Aujourd'hui" : `${endMonth || ''} ${endYear || ''}`.trim()
    
    if (!start && !end) return "Dates non spécifiées"
    if (start && end) return `${start} - ${end}`
    if (start) return `${start}`
    return `${end}`
  }

  // Vérification améliorée pour les sections supplémentaires
  const hasAdditionalContent = () => {
    const sections = additionalSections || {}
    return (
      (sections.courses && sections.courses.length > 0) ||
      (sections.qualities && sections.qualities.length > 0) ||
      (sections.certificates && sections.certificates.length > 0) ||
      (sections.achievements && sections.achievements.length > 0) ||
      (sections.internships && sections.internships.length > 0) ||
      (sections.extracurricular && sections.extracurricular.length > 0) ||
      (sections.signature && sections.signature.length > 0)
    )
  }

  const hasAnyData =
    personalInfo ||
    profile ||
    (education && education.length > 0) ||
    (experience && experience.length > 0) ||
    (skills && skills.length > 0) ||
    (languages && languages.length > 0) ||
    hasAdditionalContent()

  return (
    <div 
      ref={ref} 
      className="cv-container"
      style={{
        width: '210mm',
        height: 'auto',  // ← CORRECTION : Objet valide maintenant
        transform: 'scale(0.95)',
        transformOrigin: 'top center'
      }}
>
      {!hasAnyData && (
        <div className="empty-state">
          <p>Aucune donnée de CV à afficher. Ajoutez vos informations pour voir l'aperçu.</p>
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
                  alt="Photo de profil" 
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
                      <span>Né(e) le {personalInfo.dateOfBirth}</span>
                    </div>
                  )}
                  {personalInfo?.nationality && (
                    <div className="contact-item">
                      <User size={16} />
                      <span>Nationalité : {personalInfo.nationality}</span>
                    </div>
                  )}
                  {personalInfo?.sex && (
                    <div className="contact-item">
                      <User size={16} />
                      <span>Sexe : {personalInfo.sex.charAt(0).toUpperCase() + personalInfo.sex.slice(1)}</span>
                    </div>
                  )}
                  {personalInfo?.maritalStatus && (
                    <div className="contact-item">
                      <Heart size={16} />
                      <span>État civil : {personalInfo.maritalStatus}</span>
                    </div>
                  )}
                  {personalInfo?.drivingLicense && (
                    <div className="contact-item">
                      <GitFork size={16} />
                      <span>Permis de conduire : {personalInfo.drivingLicense}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div className="cv-main">
            {/* Education Section */}
            {education && education.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">FORMATION</h3>
                <div className="section-content">
                  {education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <h4 className="education-degree">
                        {edu.degree || 'Non spécifié'}, {edu.school || 'Non spécifié'}
                      </h4>
                      <p className="education-date">
                        ({getDuration(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear, edu.isCurrent || false)},{" "}
                        {edu.city || 'Ville non spécifiée'})
                      </p>
                      {edu.description && <p className="education-description">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {experience && experience.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">EXPÉRIENCE PROFESSIONNELLE</h3>
                <div className="section-content">
                  {experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <h4 className="experience-title">
                        {exp.jobTitle || 'Non spécifié'}, {exp.employer || 'Non spécifié'}
                      </h4>
                      <p className="experience-date">
                        ({getDuration(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent || false)})
                      </p>
                      {exp.description && <p className="experience-description">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section - Version "Nom : Niveau" */}
            {skills && skills.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">COMPÉTENCES</h3>
                <div className="section-content">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item-simple">
                      <div className="skill-text-simple">
                        <span className="skill-name-display">{skill.name || 'Non spécifié'}</span>
                        <span className="skill-level-display"> : {skill.level || "Non spécifié"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages Section */}
            {languages && languages.length > 0 && (
              <div className="main-section">
                <h3 className="main-section-title">LANGUES</h3>
                <div className="section-content">
                  {languages.map((lang, index) => (
                    <div key={index} className="language-item">
                      <span className="language-name">{lang.language || 'Non spécifié'}: </span>
                      <span className="language-level">{lang.level || 'Non spécifié'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Sections - CORRECTION COMPLÈTE */}
            {hasAdditionalContent() && (
              <div className="main-section">
                <h3 className="main-section-title">INFORMATIONS COMPLÉMENTAIRES</h3>
                <div className="section-content">
                  {/* Custom Field */}
                  {personalInfo?.customFieldTitle && personalInfo?.customFieldValue && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Info size={16} />
                        {personalInfo.customFieldTitle}
                      </h4>
                      <p className="additional-description">{personalInfo.customFieldValue}</p>
                    </div>
                  )}

                  {/* Courses */}
                  {additionalSections?.courses && additionalSections.courses.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <BookOpen size={16} />
                        Cours
                      </h4>
                      {additionalSections.courses.map((course, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{course.cours || course.title || 'Non spécifié'}</p>
                          <p className="additional-description">
                            {course.startMonth} {course.startYear} - {course.description || 'Non spécifié'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Qualities */}
                  {additionalSections?.qualities && additionalSections.qualities.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <SquareCheckBig size={16} />
                        Qualités
                      </h4>
                      {additionalSections.qualities.map((quality, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{quality.title || quality.name || 'Non spécifié'}</p>
                          {quality.description && (
                            <p className="additional-description">{quality.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Certificates */}
                  {additionalSections?.certificates && additionalSections.certificates.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <BookOpen size={16} />
                        Certificats
                      </h4>
                      {additionalSections.certificates.map((certificate, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{certificate.certificat || certificate.title || 'Non spécifié'}</p>
                          <p className="additional-description">
                            {certificate.month || ''} {certificate.year || ''} {certificate.description ? `- ${certificate.description}` : ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Achievements */}
                  {additionalSections?.achievements && additionalSections.achievements.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Star size={16} />
                        Réalisations
                      </h4>
                      {additionalSections.achievements.map((achievement, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">{achievement.title || achievement.name || 'Non spécifié'}</p>
                          {achievement.description && (
                            <p className="additional-description">{achievement.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Internships - CORRIGÉE avec gestion des undefined */}
                  {additionalSections?.internships && additionalSections.internships.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Briefcase size={16} />
                        Stages
                      </h4>
                      {additionalSections.internships.map((internship, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">
                            {internship.poste || 'Non spécifié'}, {internship.employeur || 'Non spécifié'}
                          </p>
                          <p className="additional-description">
                            {getDuration(internship.startMonth, internship.startYear, internship.endMonth, internship.endYear, internship.isCurrent || false)}, {internship.ville || internship.city || 'Ville non spécifiée'}
                          </p>
                          {internship.description && (
                            <p className="additional-description">{internship.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Extracurricular Activities - CORRIGÉE avec gestion des undefined */}
                  {additionalSections?.extracurricular && additionalSections.extracurricular.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Star size={16} />
                        Activités extra-scolaires
                      </h4>
                      {additionalSections.extracurricular.map((activity, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-subtitle">
                            {activity.poste || 'Non spécifié'}, {activity.employeur || 'Non spécifié'}
                          </p>
                          <p className="additional-description">
                            {getDuration(activity.startMonth, activity.startYear, activity.endMonth, activity.endYear, activity.isCurrent || activity.currentJob || false)}, {activity.ville || activity.city || 'Ville non spécifiée'}
                          </p>
                          {activity.description && (
                            <p className="additional-description">{activity.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Signature */}
                  {additionalSections?.signature && additionalSections.signature.length > 0 && (
                    <div className="additional-item">
                      <h4 className="additional-title">
                        <Feather size={16} />
                        Signature
                      </h4>
                      {additionalSections.signature.map((sig, index) => (
                        <div key={index} className="additional-subitem">
                          <p className="additional-description">{sig.ville || 'Non spécifiée'}, {sig.date || 'Non spécifiée'}</p>
                          {sig.signatureImage && (
                            <div className="signature-container">
                              <img src={sig.signatureImage} alt="Signature" className="signature-image" />
                            </div>
                          )}
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