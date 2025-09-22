import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input';
import { ChevronUp, Trash2 } from 'lucide-react'; 

const SkillsSection = ({ data, updateData }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);


  const skillLevels = [
    { value: "", label: "Choisissez un niveau" },
    { value: "Débutant", label: "Débutant" },
    { value: "Intermédiaire", label: "Intermédiaire" },
    { value: "Bien", label: "Bien" },
    { value: "Très bien", label: "Très bien" },
    { value: "Excellent", label: "Excellent" },
  ];

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData('skills', newData);
  };

  const addSkill = () => {
    updateData('skills', [...data, { name: '', level: '' }]);
  };


  const removeSkill = (index) => {
    const newData = data.filter((_, i) => i !== index);
    updateData('skills', newData);
  };

  return (
    <Card className="bg-gray-700 border-gray-600 rounded-none border-t-0 border-l-0 border-r-0">
      <CardHeader className="cursor-pointer hover:bg-gray-650 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Compétences</CardTitle>
          <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {data.map((skill, index) => (
            <div key={index} className="flex space-x-2 items-end p-4 bg-gray-750 rounded-lg border border-gray-600 relative">
              
            
              <button
                onClick={() => removeSkill(index)}
                className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-300 hover:bg-red-900 rounded transition-colors"
                title="Supprimer cette compétence"
              >
                <Trash2 size={16} />
              </button>
              
              <Input
                placeholder="Compétence"
                value={skill.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="w-2/3 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              
              <select
                value={skill.level || ''}
                onChange={(e) => handleChange(index, 'level', e.target.value)}
                className="w-1/3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-2 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                {skillLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={addSkill}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            Ajouter une compétence
          </button>
        </CardContent>
      )}
    </Card>
  );
};

export default SkillsSection;