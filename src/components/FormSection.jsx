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
    <div className="h-full overflow-y-auto bg-gray-800">
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-700 border-gray-600 hover:bg-gray-650 cursor-pointer transition-colors">
            <CardContent className="p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-300">Télécharger le CV </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 border-gray-600 hover:bg-gray-650 cursor-pointer transition-colors">
            <CardContent className="p-6 text-center">
              <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-sm text-gray-300">Importer votre profil LinkedIn</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="space-y-0">
        <PersonalInformation data={data.personalInfo || {}} updateData={updateData} />
        <ProfileSection data={data.profile || ''} updateData={updateData} />
        <EducationSection data={data.education || []} updateData={updateData} />
        <ExperienceSection data={data.experience || []} updateData={updateData} />
        <SkillsSection data={data.skills || []} updateData={updateData} />
        <LanguagesSection data={data.languages || []} updateData={updateData} />
        <AdditionalSections data={data.additionalSections || {}} updateData={updateData} /> {/* Seulement ici */}
        
        
      </div>
    </div>
  );
};

export default FormSection;