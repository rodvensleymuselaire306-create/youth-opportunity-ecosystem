import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="w-full">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">YOE</div>
          <div className="flex gap-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
              Connexion
            </Link>
            <Link href="/auth/register" className="text-gray-600 hover:text-gray-900">
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Youth Opportunity Ecosystem
          </h1>
          <p className="text-xl mb-8 font-light">
            Révélez votre potentiel. Saisissez votre avenir.
          </p>
          <p className="text-lg mb-12 opacity-90">
            Une plateforme complète pour découvrir votre potentiel, développer vos compétences et saisir les meilleures opportunités.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-12 mb-12">
            <Link href="/opportunities" className="block">
              <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 hover:bg-opacity-30 transition">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold">Trouver une opportunité</h3>
              </div>
            </Link>
            <Link href="/formations" className="block">
              <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 hover:bg-opacity-30 transition">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold">Découvrir une formation</h3>
              </div>
            </Link>
            <Link href="/mentors" className="block">
              <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 hover:bg-opacity-30 transition">
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-semibold">Trouver un mentor</h3>
              </div>
            </Link>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/opportunities">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Explorer les opportunités
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Créer un compte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Pourquoi YOE ?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3">Opportunités variées</h3>
              <p className="text-gray-600">
                Emplois, stages, bourses, formations, concours, événements et bien plus.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-3">Développement personnel</h3>
              <p className="text-gray-600">
                Apprenez, développez vos compétences et progressez avec l'aide de mentors.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Communauté active</h3>
              <p className="text-gray-600">
                Connectez-vous avec d'autres jeunes, des professionnels et des entreprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="mb-8 text-lg opacity-90">
            Inscrivez-vous gratuitement et accédez à des centaines d'opportunités.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              S'inscrire maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Youth Opportunity Ecosystem</h4>
              <p className="text-gray-400">Révélez votre potentiel. Saisissez votre avenir.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Plateforme</h4>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/opportunities" className="hover:text-white">Opportunités</Link></li>
                <li><Link href="/formations" className="hover:text-white">Formations</Link></li>
                <li><Link href="/mentors" className="hover:text-white">Mentors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/resources" className="hover:text-white">Ressources</Link></li>
                <li><Link href="/events" className="hover:text-white">Événements</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-gray-400 space-y-2">
                <li><Link href="/privacy" className="hover:text-white">Confidentialité</Link></li>
                <li><Link href="/terms" className="hover:text-white">Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Youth Opportunity Ecosystem. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
