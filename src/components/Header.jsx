import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx';
import { ArrowLeft, Settings, Download, Languages } from 'lucide-react';

const Header = ({ cvTitle, setCvTitle, onDownloadClick, isGenerating }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('FR');
  
  // Liste des langues avec codes et noms
  const languages = [
    { code: 'DE', name: 'Allemand' },
    { code: 'EN', name: 'Anglais' },
    { code: 'EN-UK', name: 'Anglais (Royaume-Uni)' },
    { code: 'AR', name: 'Arabe' },
    { code: 'BG', name: 'Bulgare' },
    { code: 'ZH', name: 'Chinois (simplifié)' },
    { code: 'ZH-TRAD', name: 'Chinois (traditionnel)' },
    { code: 'DA', name: 'Danois' },
    { code: 'ES', name: 'Espagnol' },
    { code: 'FI', name: 'Finnois' },
    { code: 'FR', name: 'Français' },
    { code: 'EL', name: 'Grec' },
    { code: 'HU', name: 'Hongrois' },
    { code: 'HE', name: 'Hébreu' },
    { code: 'ID', name: 'Indonésien' },
    { code: 'IT', name: 'Italien' },
    { code: 'NO', name: 'Norvégien' },
    { code: 'NL', name: 'Néerlandais' },
    { code: 'PL', name: 'Polonais' },
    { code: 'PT', name: 'Portugais' },
    { code: 'PT-BR', name: 'Portugais (Brésil)' },
    { code: 'RO', name: 'Roumain' },
    { code: 'RU', name: 'Russe' },
    { code: 'SV', name: 'Suédois' },
    { code: 'CS', name: 'Tchèque' },
    { code: 'TR', name: 'Turc' },
    { code: 'UK', name: 'Ukrainien' },
    { code: 'VI', name: 'Vietnamien' }
  ];

  // Traductions pour l'interface
  const translations = {
    FR: {
      title: "Curriculum vitae",
      untitled: "CV sans titre",
      download: "Télécharger",
      generating: "Génération en cours..."
    },
    EN: {
      title: "Curriculum vitae",
      untitled: "Untitled CV",
      download: "Download",
      generating: "Generating..."
    },
    ES: {
      title: "Curriculum vitae",
      untitled: "CV sin título",
      download: "Descargar",
      generating: "Generando..."
    },
    DE: {
      title: "Lebenslauf",
      untitled: "Unbenannter Lebenslauf",
      download: "Herunterladen",
      generating: "Wird generiert..."
    }
    // Ajoutez d'autres langues au besoin
  };

  const currentTranslations = translations[selectedLanguage] || translations.FR;

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    // Ici vous pouvez ajouter une logique pour changer la langue de l'application
    console.log(`Langue changée: ${languageCode}`);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Partie gauche */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentTranslations.title}
          </Button>
        </div>
        
        {/* Centre - Titre du CV */}
        <div className="flex items-center space-x-4">
          <Input
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            placeholder={currentTranslations.untitled}
            className="bg-transparent border-none text-lg font-semibold text-white text-center focus:ring-0 focus:border-none w-64"
          />
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Partie droite - Langue et Téléchargement */}
        <div className="flex items-center space-x-3">
          {/* Sélecteur de langue */}
          <div className="flex items-center space-x-2">
            <Languages className="w-4 h-4 text-gray-400" />
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-28 h-8 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="FR" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-60 overflow-y-auto">
                {languages.map((language) => (
                  <SelectItem 
                    key={language.code} 
                    value={language.code}
                    className="focus:bg-gray-700"
                  >
                    {language.code} - {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Bouton de téléchargement */}
          <Button 
            onClick={onDownloadClick}
            disabled={isGenerating}
            className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {currentTranslations.generating}
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                {currentTranslations.download}
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;