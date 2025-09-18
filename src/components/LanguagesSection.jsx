import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { ChevronUp } from 'lucide-react';

const LanguagesSection = ({ data, updateData }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData('languages', newData);
  };

  const addLanguage = () => {
    updateData('languages', [...data, {}]);
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
            <div key={index} className="flex space-x-2">
              <Input
                placeholder="Langue"
                value={lang.language || ''}
                onChange={(e) => handleChange(index, 'language', e.target.value)}
                className="w-1/2 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <Select onValueChange={(value) => handleChange(index, 'level', value)} value={lang.level || ''}>
                <SelectTrigger className="w-1/2 bg-gray-800 border-gray-600 text-white placeholder-gray-400">
                  <SelectValue placeholder="Niveau (1-5)" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                  <SelectItem value="1">1 (Débutant)</SelectItem>
                  <SelectItem value="2">2 (Élémentaire)</SelectItem>
                  <SelectItem value="3">3 (Intermédiaire)</SelectItem>
                  <SelectItem value="4">4 (Avancé)</SelectItem>
                  <SelectItem value="5">5 (Natif)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <button
            onClick={addLanguage}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter une langue
          </button>
        </CardContent>
      )}
    </Card>
  );
};

export default LanguagesSection;