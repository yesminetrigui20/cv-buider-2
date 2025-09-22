import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { ChevronUp, Trash2 } from 'lucide-react'; 

const LanguagesSection = ({ data, updateData }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData('languages', newData);
  };

  const addLanguage = () => {
    updateData('languages', [...data, { language: '', level: '' }]);
  };

  
  const removeLanguage = (index) => {
    const newData = data.filter((_, i) => i !== index);
    updateData('languages', newData);
  };

  return (
    <Card className="bg-gray-700 border-gray-600 rounded-none border-t-0 border-l-0 border-r-0">
      <CardHeader className="cursor-pointer hover:bg-gray-650 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Langues</CardTitle>
          <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {data.map((lang, index) => (
            <div key={index} className="flex space-x-2 items-end p-4 bg-gray-750 rounded-lg border border-gray-600 relative">
              
              {/* BOUTON SUPPRIMER */}
              <button
                onClick={() => removeLanguage(index)}
                className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-300 hover:bg-red-900 rounded transition-colors"
                title="Supprimer cette langue"
              >
                <Trash2 size={16} />
              </button>
              
              <Input
                placeholder="Langue"
                value={lang.language || ''}
                onChange={(e) => handleChange(index, 'language', e.target.value)}
                className="w-1/2 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              
              <Select 
                value={lang.level || ''} 
                onValueChange={(value) => handleChange(index, 'level', value)}
              >
                <SelectTrigger className="w-1/2 bg-gray-800 border-gray-600 text-white h-10">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Bien">Bien</SelectItem>
                  <SelectItem value="Très bien">Très bien</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Courant">Courant</SelectItem>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                  <SelectItem value="C1">C1</SelectItem>
                  <SelectItem value="C2">C2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <button
            onClick={addLanguage}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            + Ajouter une langue
          </button>
        </CardContent>
      )}
    </Card>
  );
};

export default LanguagesSection;