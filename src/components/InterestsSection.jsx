import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Plus, ChevronUp, Trash2 } from 'lucide-react';

const InterestsSection = ({ data, updateData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const addInterest = () => {
    const newInterest = {
      id: Date.now(),
      name: ''
    };
    updateData('interests', [...data, newInterest]);
  };

  const updateInterest = (id, value) => {
    const updatedInterests = data.map(interest => 
      interest.id === id ? { ...interest, name: value } : interest
    );
    updateData('interests', updatedInterests);
  };

  const removeInterest = (id) => {
    const filteredInterests = data.filter(interest => interest.id !== id);
    updateData('interests', filteredInterests);
  };

  return (
    <Card className="bg-gray-700 border-gray-600 rounded-none border-t-0 border-l-0 border-r-0">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-650 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Centres d'intérêt</CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white p-1"
              onClick={(e) => {
                e.stopPropagation();
                addInterest();
                setIsExpanded(true);
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <ChevronUp className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-6">
          {data.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Aucun centre d'intérêt ajouté</p>
              <Button 
                onClick={addInterest}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un centre d'intérêt
              </Button>
            </div>
          ) : (
            <>
              {data.map((interest) => (
                <div key={interest.id} className="bg-gray-800 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-medium">Centre d'intérêt {data.indexOf(interest) + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInterest(interest.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-300">Centre d'intérêt</Label>
                    <Input
                      placeholder="Ex: Photographie, Voyage, Sport, Lecture..."
                      value={interest.name}
                      onChange={(e) => updateInterest(interest.id, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                    />
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={addInterest}
                variant="outline"
                className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un autre centre d'intérêt
              </Button>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default InterestsSection;

