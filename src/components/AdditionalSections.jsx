"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, ChevronUp, MoreHorizontal, Upload, Calendar, Trash2 } from "lucide-react"

const AdditionalSections = ({ data = {}, updateData }) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
  ]

  const currentYear = new Date().getFullYear()
  const years = [
    { value: "", label: "Année" },
    ...Array.from({ length: 50 }, (_, i) => {
      const year = currentYear - i + 10
      return { value: year.toString(), label: year.toString() }
    }),
  ]

  const additionalSectionTypes = [
    { key: "courses", label: "Cours", icon: "📚" },
    { key: "internships", label: "Stages", icon: "🎓" },
    { key: "extracurricular", label: "Activités extra-scolaires", icon: "🏆" },
    
    { key: "qualities", label: "Qualités", icon: "⭐" },
    { key: "certificates", label: "Certificats", icon: "🏅" },
    { key: "achievements", label: "Réalisations", icon: "🎯" },
    { key: "signature", label: "Signature", icon: "✍️" },
  ]

  const addSection = (sectionKey) => {
    const newData = {
      ...data,
      [sectionKey]: [{}], // Start with one empty item
    }
    updateData("additionalSections", newData)
  }

  const addItemToSection = (sectionKey) => {
    const currentItems = data[sectionKey] || []
    const newData = {
      ...data,
      [sectionKey]: [...currentItems, {}],
    }
    updateData("additionalSections", newData)
  }

  const updateSectionItem = (sectionKey, itemIndex, field, value) => {
    const currentItems = data[sectionKey] || []
    const updatedItems = currentItems.map((item, index) => 
      index === itemIndex ? { ...item, [field]: value } : item
    )
    const newData = {
      ...data,
      [sectionKey]: updatedItems,
    }
    updateData("additionalSections", newData)
  }

  const removeItemFromSection = (sectionKey, itemIndex) => {
    const currentItems = data[sectionKey] || []
    const updatedItems = currentItems.filter((_, index) => index !== itemIndex)
    const newData = {
      ...data,
      [sectionKey]: updatedItems,
    }
    updateData("additionalSections", newData)
  }

  const removeSection = (sectionKey) => {
    const newData = { ...data }
    delete newData[sectionKey]
    updateData("additionalSections", newData)
  }

  const handleFileUpload = (file, sectionKey, itemIndex, field) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateSectionItem(sectionKey, itemIndex, field, e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderSectionForm = (key, item, itemIndex) => {
    const section = additionalSectionTypes.find((s) => s.key === key)

    if (key === "courses") {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300"
                onClick={() => removeSection(key)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Cours</label>
                <Input
                  value={item.cours || ""}
                  onChange={(e) => updateSectionItem(key, itemIndex, "cours", e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Nom du cours"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-300">Période</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded bg-gray-700 border-gray-600"
                      checked={item.currentPeriod || false}
                      onChange={(e) => updateSectionItem(key, itemIndex, "currentPeriod", e.target.checked)}
                    />
                    <span className="text-sm text-gray-400">en cours</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white"
                    value={item.startMonth || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "startMonth", e.target.value)}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value} className="bg-gray-700 text-white">
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white"
                    value={item.startYear || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "startYear", e.target.value)}
                  >
                    {years.map((year) => (
                      <option key={year.value} value={year.value} className="bg-gray-700 text-white">
                        {year.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <Textarea
                placeholder="Décrivez le cours..."
                value={item.description || ""}
                onChange={(e) => updateSectionItem(key, itemIndex, "description", e.target.value)}
                className="w-full min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      )
    }

    if (key === "internships" || key === "extracurricular") {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300"
                onClick={() => removeSection(key)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Poste</label>
              <Input
                value={item.poste || ""}
                onChange={(e) => updateSectionItem(key, itemIndex, "poste", e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                placeholder="Titre du poste"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Employeur</label>
                <Input
                  value={item.employeur || ""}
                  onChange={(e) => updateSectionItem(key, itemIndex, "employeur", e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Nom de l'employeur"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Ville</label>
                <Input
                  value={item.ville || ""}
                  onChange={(e) => updateSectionItem(key, itemIndex, "ville", e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Ville"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date de début</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white"
                    value={item.startMonth || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "startMonth", e.target.value)}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value} className="bg-gray-700 text-white">
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white"
                    value={item.startYear || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "startYear", e.target.value)}
                  >
                    {years.map((year) => (
                      <option key={year.value} value={year.value} className="bg-gray-700 text-white">
                        {year.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-300">Date de fin</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded bg-gray-700 border-gray-600"
                      checked={item.currentJob || false}
                      onChange={(e) => updateSectionItem(key, itemIndex, "currentJob", e.target.checked)}
                    />
                    <span className="text-sm text-gray-400">en cours</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white disabled:opacity-50"
                    value={item.endMonth || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "endMonth", e.target.value)}
                    disabled={item.currentJob}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value} className="bg-gray-700 text-white">
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white disabled:opacity-50"
                    value={item.endYear || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "endYear", e.target.value)}
                    disabled={item.currentJob}
                  >
                    {years.map((year) => (
                      <option key={year.value} value={year.value} className="bg-gray-700 text-white">
                        {year.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <Textarea
                placeholder="Décrivez vos responsabilités et réalisations..."
                value={item.description || ""}
                onChange={(e) => updateSectionItem(key, itemIndex, "description", e.target.value)}
                className="w-full min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      )
    }

    if (key === "certificates") {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300"
                onClick={() => removeSection(key)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Certificat</label>
                <Input
                  value={item.certificat || ""}
                  onChange={(e) => updateSectionItem(key, itemIndex, "certificat", e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Nom du certificat"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-300">Date d'obtention</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded bg-gray-700 border-gray-600"
                      checked={item.currentCertificate || false}
                      onChange={(e) => updateSectionItem(key, itemIndex, "currentCertificate", e.target.checked)}
                    />
                    <span className="text-sm text-gray-400">en cours</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white"
                    value={item.month || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "month", e.target.value)}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value} className="bg-gray-700 text-white">
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white"
                    value={item.year || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "year", e.target.value)}
                  >
                    {years.map((year) => (
                      <option key={year.value} value={year.value} className="bg-gray-700 text-white">
                        {year.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <Textarea
                placeholder="Décrivez le certificat..."
                value={item.description || ""}
                onChange={(e) => updateSectionItem(key, itemIndex, "description", e.target.value)}
                className="w-full min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      )
    }

    if (key === "signature") {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300"
                onClick={() => removeSection(key)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Ville</label>
                <Input
                  value={item.ville || ""}
                  onChange={(e) => updateSectionItem(key, itemIndex, "ville", e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Ville de signature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={item.date || ""}
                    onChange={(e) => updateSectionItem(key, itemIndex, "date", e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    placeholder="dd.mm.yyyy"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Signature</label>
              <div className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center bg-gray-700 hover:bg-gray-650 cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id={`signature-upload-${itemIndex}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleFileUpload(file, key, itemIndex, "signatureImage")
                    }
                  }}
                />
                <label
                  htmlFor={`signature-upload-${itemIndex}`}
                  className="cursor-pointer flex flex-col items-center w-full h-full justify-center"
                >
                  {item.signatureImage ? (
                    <img
                      src={item.signatureImage}
                      alt="Signature"
                      className="max-h-24 max-w-full object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm">Cliquez pour importer une signature</span>
                    </>
                  )}
                </label>
              </div>
              <div className="mt-2 text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
                  onClick={() => {
                    if (item.signatureImage) {
                      updateSectionItem(key, itemIndex, "signatureImage", null)
                    }
                  }}
                >
                  Effacer la signature
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Default case for other sections
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white flex items-center">
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </h3>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-400 hover:text-red-300"
              onClick={() => removeSection(key)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400">
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Titre</label>
            <Input
              value={item.title || ""}
              onChange={(e) => updateSectionItem(key, itemIndex, "title", e.target.value)}
              className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              placeholder="Titre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <Textarea
              placeholder="Description..."
              value={item.description || ""}
              onChange={(e) => updateSectionItem(key, itemIndex, "description", e.target.value)}
              className="w-full min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gray-700 border-gray-600 rounded-none border-t-0 border-l-0 border-r-0">
      <CardHeader
        className="cursor-pointer hover:bg-gray-650 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Sections supplémentaires</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <ChevronUp className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          <p className="text-gray-400 text-sm mb-4">Ajoutez des sections supplémentaires à votre CV</p>

          <div className="grid grid-cols-2 gap-3">
            {additionalSectionTypes.map((section) => (
              <Button
                key={section.key}
                variant="outline"
                size="sm"
                className="text-xs bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white justify-start h-auto py-3"
                onClick={() => addSection(section.key)}
                disabled={data[section.key] !== undefined}
              >
                <span className="mr-2">{section.icon}</span>
                <Plus className="w-3 h-3 mr-2" />
                {section.label}
              </Button>
            ))}
          </div>

          {Object.keys(data).length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="text-white font-medium">Sections ajoutées :</h4>
              <div className="space-y-4">
                {Object.entries(data).map(([key, items]) => {
                  const section = additionalSectionTypes.find((s) => s.key === key)
                  if (!section || !Array.isArray(items)) return null

                  return (
                    <div key={key} className="space-y-3">
                      {items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {renderSectionForm(key, item, itemIndex)}
                          {items.length > 1 && (
                            <div className="text-center mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItemFromSection(key, itemIndex)}
                                className="text-red-500 hover:text-red-300"
                              >
                                Supprimer cet élément
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}

                      <div className="text-center py-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addItemToSection(key)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter un {section.label.toLowerCase()}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default AdditionalSections