import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { ArrowLeft, Settings, Download } from 'lucide-react';

const Header = ({ cvTitle, setCvTitle }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Curriculum vitae
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            placeholder="CV sans titre"
            className="bg-transparent border-none text-lg font-semibold text-white text-center focus:ring-0 focus:border-none"
          />
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">FR</span>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

