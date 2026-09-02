'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const mockOpportunities = [
  {
    id: '1',
    title: 'Stage en Finance',
    organization: 'BanqueXYZ',
    category: 'internship',
    location: 'Port-au-Prince',
    mode: 'hybrid',
    deadline: '2024-12-31',
    description: 'Rejoignez notre équipe finance pour un stage enrichissant...',
  },
  {
    id: '2',
    title: 'Emploi: Développeur Web',
    organization: 'TechStartup',
    category: 'job',
    location: 'Remote',
    mode: 'remote',
    deadline: '2024-11-30',
    description: 'Nous recherchons des développeurs web passionnés...',
  },
]

export default function OpportunitiesPage() {
  const [opportunities] = useState(mockOpportunities)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Opportunités</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Rechercher..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Toutes les catégories</option>
              <option>Emploi</option>
              <option>Stage</option>
              <option>Bourse</option>
              <option>Formation</option>
            </select>
            <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Toutes les villes</option>
              <option>Port-au-Prince</option>
              <option>Cap-Haïtien</option>
              <option>Remote</option>
            </select>
            <Button>Filtrer</Button>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {opportunities.map(opportunity => (
            <div key={opportunity.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{opportunity.title}</h3>
                  <p className="text-gray-600 mt-2">{opportunity.organization}</p>
                  <p className="text-gray-600 text-sm mt-2">{opportunity.description}</p>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {opportunity.location}
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {opportunity.mode}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      Deadline: {new Date(opportunity.deadline).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <Button className="ml-4">Postuler</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
