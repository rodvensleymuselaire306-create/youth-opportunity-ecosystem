'use client'

import { Button } from '@/components/ui/button'

const mockFormations = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    provider: 'TechAcademy',
    level: 'Beginner',
    duration: '8 weeks',
    format: 'online',
    isFree: true,
  },
  {
    id: '2',
    title: 'Leadership & Communication',
    provider: 'Business Institute',
    level: 'Intermediate',
    duration: '4 weeks',
    format: 'hybrid',
    isFree: false,
  },
]

export default function FormationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Formations</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {mockFormations.map(formation => (
            <div key={formation.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">{formation.title}</h3>
              <p className="text-gray-600 mb-4">{formation.provider}</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{formation.level}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{formation.duration}</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">{formation.format}</span>
                {formation.isFree && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Gratuit</span>}
              </div>
              <Button className="w-full">En savoir plus</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
