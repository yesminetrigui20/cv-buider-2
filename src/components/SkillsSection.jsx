import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input';
import { ChevronUp, Calendar } from 'lucide-react';

const SkillsSection = ({ data, updateData }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const months = [
    { value: "", label: "Mois" },
    { value: "janvier", label: "janvier" },
    { value: "février", label: "février" },
    { value: "mars", label: "mars" },
    { value: "avril", label: "avril" },
    { value: "mai", label: "mai" },
    { value: "juin", label: "juin" },
    { value: "juillet", label: "juillet" },
    { value: "août", label: "août" },
    { value: "septembre", label: "septembre" },
    { value: "octobre", label: "octobre" },
    { value: "novembre", label: "novembre" },
    { value: "décembre", label: "décembre" },
  ];

  const currentYear = new Date().getFullYear();
  const years = [
    { value: "", label: "Année" },
    ...Array.from({ length: 50 }, (_, i) => ({
      value: (currentYear - i + 10).toString(),
      label: (currentYear - i + 10).toString(),
    })),
  ];

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    updateData('skills', newData);
  };

  const addSkill = () => {
    updateData('skills', [...data, {}]);
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
            <div key={index} className="flex space-x-2">
              <Input
                placeholder="Compétence"
                value={skill.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="w-2/3 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <div className="relative w-1/3 flex space-x-2">
                <select
                  value={skill.acquiredMonth || ''}
                  onChange={(e) => handleChange(index, 'acquiredMonth', e.target.value)}
                  className="w-1/2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 p-2 rounded appearance-none"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <select
                  value={skill.acquiredYear || ''}
                  onChange={(e) => handleChange(index, 'acquiredYear', e.target.value)}
                  className="w-1/2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 p-2 rounded appearance-none"
                >
                  {years.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                    ))}
                </select>
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          ))}
          <button
            onClick={addSkill}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter une compétence
          </button>
        </CardContent>
      )}
    </Card>
  );
};

export default SkillsSection;