import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { ChevronUp } from 'lucide-react';

const ProfileSection = ({ data, updateData }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleChange = (e) => {
    updateData('profile', e.target.value);
  };

  return (
    <Card className="bg-gray-700 border-gray-600 rounded-none border-t-0 border-l-0 border-r-0">
      <CardHeader className="cursor-pointer hover:bg-gray-650 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Profil</CardTitle>
          <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <Textarea
            placeholder="Décrivez votre profil..."
            value={data || ''}
            onChange={handleChange}
            className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </CardContent>
      )}
    </Card>
  );
};

export default ProfileSection;