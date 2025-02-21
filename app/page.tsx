import { FC } from 'react';
import { Dice6, MessageSquare, Users, ScrollText } from 'lucide-react';

const LandingPage: FC = () => {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-green-900 mb-4">
            Pocket Dungeon Master
          </h1>
          <p className="text-lg text-green-700 mb-6">
            Create, play, and manage your TTRPG campaigns with our AI-powered platform
          </p>
          <div className="flex justify-center gap-3">
            <a href="/campaign/campaign-select" className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition border border-green-700">
              Start Your Journey
            </a> 
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-gradient-to-b from-green-100 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-green-900 mb-8">
            Embark on Epic Adventures
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Feature Cards */}
            {[{
              icon: ScrollText,
              title: "Create Campaigns",
              description: "Craft your own immersive worlds and stories with our intuitive campaign builder"
            }, {
              icon: Dice6,
              title: "AI Dungeon Master",
              description: "Experience dynamic storytelling with our advanced AI Dungeon Master"
            }, {
              icon: MessageSquare,
              title: "Play via Messages",
              description: "Continue your adventures through WhatsApp and Telegram integration"
            }, {
              icon: Users,
              title: "Character Manager",
              description: "Keep track of your characters, inventory, and progression"
            }].map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="bg-white shadow-lg p-4 rounded-lg border border-green-300">
                <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center mb-3 border border-green-400">
                  <Icon className="w-5 h-5 text-green-900" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-1">
                  {title}
                </h3>
                <p className="text-sm text-green-700">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-100">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-200 to-green-100 p-8 rounded-xl border border-green-400 shadow-md">
            <h2 className="text-2xl font-bold text-green-900 mb-3">
              Ready to Roll for Initiative?
            </h2>
            <p className="text-base text-green-700 mb-6">
              Join thousands of players and create your first campaign today
            </p>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition text-base font-semibold border border-green-700">
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
