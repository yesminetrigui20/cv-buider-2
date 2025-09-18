import React, { useState, useRef } from 'react';
import Header from './components/Header.jsx';
import FormSection from './components/FormSection.jsx';
import CVPreview from './components/CVPreview.jsx';
import GoogleLogin from './components/GoogleLogin.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const cvRef = useRef(null); // Ref pour capturer CVPreview

  const updateData = (section, newData) => {
    console.log(`Updating ${section} with:`, newData);
    setCvData((prevData) => ({
      ...prevData,
      [section]: newData,
    }));
  };

  const handleGoogleSuccess = (credential) => {
    console.log('Token received in App:', credential);
  };

  const handleDownloadCV = async () => {
    setIsGenerating(true);
    console.log("Début de la génération du PDF...");

    try {
      if (!cvRef.current) throw new Error('CVPreview ref not found');

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width * 0.75;
      const imgHeight = canvas.height * 0.75;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      let imgY = 10;
      const pageHeight = 280;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        heightLeft -= pageHeight;
        position += pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', imgX, imgY - position, imgWidth * ratio, imgHeight * ratio);
        }
      }

      pdf.save('mon-cv.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      const pdf = new jsPDF();
      pdf.setFontSize(16);
      pdf.text('CV - Données de secours', 10, 10);
      pdf.setFontSize(12);
      pdf.text(`Nom: ${cvData.personalInfo.firstName || 'Non spécifié'} ${cvData.personalInfo.lastName || ''}`, 10, 20);
      pdf.text(`Email: ${cvData.personalInfo.email || 'Non spécifié'}`, 10, 30);
      pdf.save('mon-cv-fallback.pdf');
      alert('Erreur avec la mise en page visuelle. Un PDF de secours a été téléchargé. Voir la console pour plus de détails.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 dark flex flex-col">
      <Header />
      
      <GoogleLogin onSuccess={handleGoogleSuccess} />
      
      <div className="flex flex-1" style={{ height: 'calc(100vh - 160px)' }}>
        <div className="w-1/2 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <FormSection data={cvData} updateData={updateData} />
        </div>
        <div className="w-1/2 bg-gray-800 overflow-y-auto">
          <CVPreview ref={cvRef} data={cvData} />
        </div>
      </div>

      <footer className="bg-gray-900 p-4 border-t border-gray-700">
        <div className="container mx-auto flex justify-center items-center">
          <button
            onClick={handleDownloadCV} // Attache la fonction au clic
            disabled={isGenerating}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Génération en cours...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger mon CV
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;