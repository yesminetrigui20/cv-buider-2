import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import PersonalInformation from './PersonalInformation.jsx';
import ProfileSection from './ProfileSection.jsx';
import EducationSection from './EducationSection.jsx';
import ExperienceSection from './ExperienceSection.jsx';
import SkillsSection from './SkillsSection.jsx';
import LanguagesSection from './LanguagesSection.jsx';
import AdditionalSections from './AdditionalSections.jsx';
import { Upload, Linkedin } from 'lucide-react';

const FormSection = ({ data, updateData, onDownload }) => {
  return (
    
      
      <div className="space-y-0">
        <PersonalInformation data={data.personalInfo || {}} updateData={updateData} />
        <ProfileSection data={data.profile || ''} updateData={updateData} />
        <EducationSection data={data.education || []} updateData={updateData} />
        <ExperienceSection data={data.experience || []} updateData={updateData} />
        <SkillsSection data={data.skills || []} updateData={updateData} />
        <LanguagesSection data={data.languages || []} updateData={updateData} />
        <AdditionalSections data={data.additionalSections || {}} updateData={updateData} /> {/* Seulement ici */}
        
        
      </div>
  
  );
};

export default FormSection;