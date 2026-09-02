'use client'

import { Button } from '@/components/ui/button'

const mockMentors = [
  {
    id: '1',
    name: 'Jean Dupont',
    title: 'Directeur Financier',
    organization: 'BanqueXYZ',
    expertise: 'Finance, Gestion',
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Marie Leclerc',
    title: 'CEO',
    organization: 'TechStartup',
    expertise: 'Entrepreneuriat, Tech',
    availability: 'Limited',
  },
]

export default function MentorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Trouver un Mentor</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {mockMentors.map(mentor => (
            <div key={mentor.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {mentor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.title}</p>
                  <p className="text-gray-600 text-sm">{mentor.organization}</p>
                  <p className="text-sm mt-2 text-blue-600 font-semibold">Expertise: {mentor.expertise}</p>
                </div>
              </div>
              <Button className="w-full mt-4">Demander du mentorat</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
