import React, { useState } from 'react';
import Header from './components/Header.jsx';
import FormSection from './components/FormSection.jsx';
import CVPreview from './components/CVPreview.jsx';
import GoogleLogin from './components/GoogleLogin.jsx'; // Réintègre le composant
import './App.css';

const initialCVData = {
  personalInfo: {},
  profile: '',
  education: [],
  experience: [],
  skills: [],
  languages: [],
  additionalSections: {},
};

function App() {
  const [cvData, setCvData] = useState(initialCVData);

  const updateData = (section, newData) => {
    console.log(`Updating ${section} with:`, newData);
    setCvData((prevData) => ({
      ...prevData,
      [section]: newData,
    }));
  };

  const handleGoogleSuccess = (credential) => {
    console.log('Token received in App:', credential);
    // Logique pour mettre à jour cvData
  };

  if (!Header || !FormSection || !CVPreview) {
    return <div>Composants manquants, vérifiez les imports.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 dark">
      <Header />
      <GoogleLogin onSuccess={handleGoogleSuccess} /> {/* Bouton dans l'interface */}
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-1/2 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <FormSection data={cvData} updateData={updateData} />
        </div>
        <div id="cv-preview-content" className="w-1/2 bg-gray-800 overflow-y-auto">
          <CVPreview data={cvData} />
        </div>
      </div>
    </div>
  );
}

export default App;