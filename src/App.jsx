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

// Fonction pour convertir oklch en hex (approximation)
const oklchToHex = (oklchValue) => {
  if (!oklchValue || !oklchValue.includes('oklch')) return null;
  
  try {
    // Extraction des valeurs depuis la chaîne oklch
    const values = oklchValue.match(/oklch\(([^)]+)\)/)[1].split(/\s+/);
    if (values.length < 3) return null;
    
    const l = parseFloat(values[0]);
    const c = parseFloat(values[1]);
    const h = parseFloat(values[2]);
    
    // Conversion approximative oklch vers hex
    // Note: Ceci est une approximation simplifiée
    if (l > 0.7) return '#ffffff'; // Clair → blanc
    if (l > 0.4) return '#888888'; // Moyen → gris
    return '#000000'; // Foncé → noir
  } catch (e) {
    console.warn('Erreur conversion oklch:', e);
    return null;
  }
};

function App() {
  const [cvData, setCvData] = useState(initialCVData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvTitle, setCvTitle] = useState('Mon CV'); // État pour le titre du CV
  const cvRef = useRef(null);

  const updateData = (section, newData) => {
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

    try {
      if (!cvRef.current) throw new Error('CVPreview ref not found');

      // Fonction pour corriger les styles problématiques avant la capture
      const fixStyles = () => {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          
          // Vérifier et corriger les couleurs oklch()
          ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
            const value = styles[prop];
            if (value && value.includes('oklch')) {
              // Sauvegarder la valeur originale
              el.dataset[`original${prop}`] = el.style[prop];
              
              // Convertir oklch en une couleur supportée
              const hexColor = oklchToHex(value);
              if (hexColor) {
                el.style[prop] = hexColor;
              } else {
                // Valeurs par défaut selon la propriété
                if (prop === 'color') el.style.color = '#000000';
                else if (prop === 'backgroundColor') el.style.backgroundColor = '#ffffff';
                else el.style.borderColor = '#cccccc';
              }
            }
          });
        });
      };

      // Fonction pour restaurer les styles après la capture
      const restoreStyles = () => {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
            const originalValue = el.dataset[`original${prop}`];
            if (originalValue !== undefined) {
              el.style[prop] = originalValue;
              delete el.dataset[`original${prop}`];
            }
          });
        });
      };

      // Corriger les styles problématiques
      fixStyles();

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: true,
        onclone: (clonedDoc) => {
          // Appliquer les mêmes corrections au clone
          const elements = clonedDoc.querySelectorAll('*');
          elements.forEach(el => {
            const styles = window.getComputedStyle(el);
            
            ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
              const value = styles[prop];
              if (value && value.includes('oklch')) {
                const hexColor = oklchToHex(value);
                if (hexColor) {
                  el.style[prop] = hexColor;
                }
              }
            });
          });
        }
      });

      // Restaurer les styles originaux
      restoreStyles();

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Ajouter l'image au PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Gérer le multi-pages si l'image est trop haute
      let heightLeft = imgHeight;
      let position = 0;
      
      if (heightLeft > pdfHeight) {
        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      pdf.save(`${cvTitle}.pdf`);
      
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      
      // PDF de secours avec toutes les données
      try {
        const pdf = new jsPDF();
        let yPosition = 15;
        
        pdf.setFontSize(18);
        pdf.setTextColor(40, 40, 40);
        pdf.text(cvTitle.toUpperCase(), 105, yPosition, { align: 'center' });
        yPosition += 15;
        
        // Ligne de séparation
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, yPosition, 190, yPosition);
        yPosition += 10;
        
        // Informations personnelles
        if (cvData.personalInfo && Object.keys(cvData.personalInfo).length > 0) {
          pdf.setFontSize(14);
          pdf.setTextColor(50, 50, 150);
          pdf.text('INFORMATIONS PERSONNELLES', 20, yPosition);
          yPosition += 10;
          
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          
          if (cvData.personalInfo.firstName || cvData.personalInfo.lastName) {
            pdf.text(`Nom: ${cvData.personalInfo.firstName || ''} ${cvData.personalInfo.lastName || ''}`, 20, yPosition);
            yPosition += 7;
          }
          if (cvData.personalInfo.email) {
            pdf.text(`Email: ${cvData.personalInfo.email}`, 20, yPosition);
            yPosition += 7;
          }
          if (cvData.personalInfo.phone) {
            pdf.text(`Téléphone: ${cvData.personalInfo.phone}`, 20, yPosition);
            yPosition += 7;
          }
          if (cvData.personalInfo.address) {
            pdf.text(`Adresse: ${cvData.personalInfo.address}`, 20, yPosition);
            yPosition += 7;
          }
          
          yPosition += 5;
        }
        
        // Profil
        if (cvData.profile) {
          pdf.setFontSize(14);
          pdf.setTextColor(50, 50, 150);
          pdf.text('PROFIL', 20, yPosition);
          yPosition += 10;
          
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          
          const splitProfile = pdf.splitTextToSize(cvData.profile, 170);
          pdf.text(splitProfile, 20, yPosition);
          yPosition += (splitProfile.length * 5) + 5;
        }
        
        // Expérience
        if (cvData.experience && cvData.experience.length > 0) {
          pdf.setFontSize(14);
          pdf.setTextColor(50, 50, 150);
          pdf.text('EXPÉRIENCE PROFESSIONNELLE', 20, yPosition);
          yPosition += 10;
          
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          
          cvData.experience.forEach(exp => {
            if (yPosition > 250) {
              pdf.addPage();
              yPosition = 20;
            }
            
            pdf.setFont(undefined, 'bold');
            pdf.text(`${exp.position || ''} ${exp.company ? `- ${exp.company}` : ''}`, 20, yPosition);
            yPosition += 5;
            
            pdf.setFont(undefined, 'normal');
            if (exp.period) {
              pdf.text(`Période: ${exp.period}`, 20, yPosition);
              yPosition += 5;
            }
            if (exp.description) {
              const splitDesc = pdf.splitTextToSize(exp.description, 170);
              pdf.text(splitDesc, 20, yPosition);
              yPosition += (splitDesc.length * 5) + 5;
            } else {
              yPosition += 5;
            }
          });
        }
        
        pdf.save(`${cvTitle}.pdf`);
      } catch (fallbackError) {
        console.error('Erreur même avec le PDF de secours:', fallbackError);
        alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 dark flex flex-col">
      {/* Header avec les props nécessaires */}
      <Header 
        cvTitle={cvTitle} 
        setCvTitle={setCvTitle}
        onDownloadClick={handleDownloadCV}
        isGenerating={isGenerating}
      />
      
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
            onClick={handleDownloadCV}
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