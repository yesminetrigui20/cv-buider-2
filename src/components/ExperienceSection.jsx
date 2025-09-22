import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronUp, Calendar, Trash2 } from 'lucide-react';

const ExperienceSection = ({ data, updateData }) => {
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
    updateData('experience', newData);
  };

  const addExperience = () => {
    updateData('experience', [...data, {}]);
  };

  // FONCTION POUR SUPPRIMER UNE EXPÉRIENCE
  const removeExperience = (index) => {
    const newData = data.filter((_, i) => i !== index);
    updateData('experience', newData);
  };

  return (
    <Card className="bg-gray-700 border-gray-600 rounded-none border-t-0 border-l-0 border-r-0">
      <CardHeader className="cursor-pointer hover:bg-gray-650 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Expérience professionnelle</CardTitle>
          <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {data.map((exp, index) => (
            <div key={index} className="space-y-2 p-4 bg-gray-750 rounded-lg border border-gray-600 relative">
              
              {/* BOUTON SUPPRIMER - CONSERVÉ */}
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-300 hover:bg-red-900 rounded transition-colors"
                title="Supprimer cette expérience"
              >
                <Trash2 size={16} />
              </button>
              
              <Input
                placeholder="Titre du poste"
                value={exp.jobTitle || ''}
                onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                placeholder="Employeur"
                value={exp.employer || ''}
                onChange={(e) => handleChange(index, 'employer', e.target.value)}
                className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <div className="flex space-x-2">
                <div className="relative w-1/2">
                  <select
                    value={exp.startMonth || ''}
                    onChange={(e) => handleChange(index, 'startMonth', e.target.value)}
                    className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 p-2 rounded appearance-none"
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <div className="relative w-1/2">
                  <select
                    value={exp.startYear || ''}
                    onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                    className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 p-2 rounded appearance-none"
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
              <div className="flex space-x-2">
                <div className="relative w-1/2">
                  <select
                    value={exp.endMonth || ''}
                    onChange={(e) => handleChange(index, 'endMonth', e.target.value)}
                    className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 p-2 rounded appearance-none"
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <div className="relative w-1/2">
                  <select
                    value={exp.endYear || ''}
                    onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                    className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 p-2 rounded appearance-none"
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
              <Textarea
                placeholder="Description"
                value={exp.description || ''}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          ))}
          <button
            onClick={addExperience}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ajouter une expérience
          </button>
        </CardContent>
      )}
    </Card>
  );
};

export default ExperienceSection;