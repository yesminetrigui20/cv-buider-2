import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx';
import {
  ChevronsUpDown,
  Calendar,
  MapPin,
  User,
  GitFork,
  Heart,
  Globe,
  Linkedin,
  Plus,
} from 'lucide-react';

const PersonalInformation = ({ data, updateData }) => {
  const [photoPreview, setPhotoPreview] = useState(data.photo || '');
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        updateData('personalInfo', { ...data, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData('personalInfo', { ...data, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    updateData('personalInfo', { ...data, [name]: value });
  };

  const handleToggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  return (
    <Card className="bg-gray-700 text-gray-200 border-gray-600 rounded-none p-0">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-650">
        <CardTitle className="text-lg">Informations personnelles</CardTitle>
        <Button variant="ghost" className="p-0 h-auto" onClick={handleToggleOptionalFields}>
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex space-x-4 items-start">
          <div className="w-24 h-24 relative overflow-hidden rounded-full border-2 border-gray-500 flex-shrink-0">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                Aucune image
              </div>
            )}
            <input
              type="file"
              onChange={handlePhotoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <Label htmlFor="firstName" className="text-gray-300 text-sm">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                value={data.firstName || ''}
                onChange={handleChange}
                className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-300 text-sm">Nom de famille</Label>
              <Input
                id="lastName"
                name="lastName"
                value={data.lastName || ''}
                onChange={handleChange}
                className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="jobTitle" className="text-gray-300 text-sm">Profession</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={data.jobTitle || ''}
              onChange={handleChange}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-300 text-sm">Adresse e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email || ''}
              onChange={handleChange}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-300 text-sm">Numéro de téléphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={data.phone || ''}
              onChange={handleChange}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="city" className="text-gray-300 text-sm">Ville</Label>
            <Input
              id="city"
              name="city"
              value={data.city || ''}
              onChange={handleChange}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-gray-300 text-sm">Pays</Label>
            <Input
              id="country"
              name="country"
              value={data.country || ''}
              onChange={handleChange}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="postalCode" className="text-gray-300 text-sm">Code postal</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={data.postalCode || ''}
              onChange={handleChange}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="address" className="text-gray-300 text-sm">Adresse</Label>
            <Input
              id="address"
              name="address"
              value={data.address || ''}
              onChange={handleChange}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 bg-gray-800 text-gray-300 border-gray-600"
            onClick={handleToggleOptionalFields}
          >
            <Plus size={16} />
            <span>Champs optionnels</span>
          </Button>
          {/* Le bouton "Champ personnalisé" a été supprimé ici */}
        </div>
        {showOptionalFields && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="dateOfBirth" className="text-gray-300 text-sm flex items-center">
                <Calendar size={16} className="mr-2" /> Date de naissance
              </Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={data.dateOfBirth || ''}
                onChange={handleChange}
                className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="nationality" className="text-gray-300 text-sm flex items-center">
                <MapPin size={16} className="mr-2" /> Nationalité
              </Label>
              <Input
                id="nationality"
                name="nationality"
                value={data.nationality || ''}
                onChange={handleChange}
                className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="drivingLicense" className="text-gray-300 text-sm flex items-center">
                <GitFork size={16} className="mr-2" /> Permis de conduire
              </Label>
              <Input
                id="drivingLicense"
                name="drivingLicense"
                value={data.drivingLicense || ''}
                onChange={handleChange}
                className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-gray-300 text-sm flex items-center">
                <Globe size={16} className="mr-2" /> Site web
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={data.website || ''}
                onChange={handleChange}
                className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="text-gray-300 text-sm flex items-center">
                <Linkedin size={16} className="mr-2" /> Profil LinkedIn
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="url"
                value={data.linkedin || ''}
                onChange={handleChange}
                className="mt-1 bg-gray-800 border-gray-600 text-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="sex" className="text-gray-300 text-sm">Sexe</Label>
              <Select onValueChange={(value) => handleSelectChange('sex', value)} value={data.sex || ''}>
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-gray-200">
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
            
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maritalStatus" className="text-gray-300 text-sm">État civil</Label>
              <Select onValueChange={(value) => handleSelectChange('maritalStatus', value)} value={data.maritalStatus || ''}>
                <SelectTrigger className="mt-1 bg-gray-800 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-gray-200">
                  <SelectItem value="célibataire">Célibataire</SelectItem>
                  <SelectItem value="marié(e)">Marié(e)</SelectItem>
                  <SelectItem value="divorcé(e)">Divorcé(e)</SelectItem>
                  <SelectItem value="veuf(ve)">Veuf(ve)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;