import { FC } from 'react';
import { Dice6, MessageSquare, Users, ScrollText } from 'lucide-react';

const LandingPage: FC = () => {
  return (
    <div className="min-h-screen bg-mystic-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Pocket Dungeon Master
          </h1>
          <p className="text-lg text-mystic-200 mb-6">
            Create, play, and manage your TTRPG campaigns with our AI-powered platform
          </p>
          <div className="flex justify-center gap-3">
            <a href="/campaign/campaign-select" className="px-5 py-2 bg-mystic-600 text-white font-semibold rounded-lg hover:bg-mystic-500 transition border border-gold-500" >
              Start Your Journey
            </a> 
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-gradient-to-b from-mystic-900 to-mystic-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Embark on Epic Adventures
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Create Campaign Card */}
            <div className="bg-mystic-800/50 p-4 rounded-lg border border-gold-700/30">
              <div className="w-10 h-10 bg-mystic-700 rounded-lg flex items-center justify-center mb-3 border border-gold-500/30">
                <ScrollText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Create Campaigns
              </h3>
              <p className="text-sm text-mystic-200">
                Craft your own immersive worlds and stories with our intuitive campaign builder
              </p>
            </div>

            {/* AI DM Card */}
            <div className="bg-mystic-800/50 p-4 rounded-lg border border-gold-700/30">
              <div className="w-10 h-10 bg-mystic-700 rounded-lg flex items-center justify-center mb-3 border border-gold-500/30">
                <Dice6 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                AI Dungeon Master
              </h3>
              <p className="text-sm text-mystic-200">
                Experience dynamic storytelling with our advanced AI Dungeon Master
              </p>
            </div>

            {/* Messaging Card */}
            <div className="bg-mystic-800/50 p-4 rounded-lg border border-gold-700/30">
              <div className="w-10 h-10 bg-mystic-700 rounded-lg flex items-center justify-center mb-3 border border-gold-500/30">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Play via Messages
              </h3>
              <p className="text-sm text-mystic-200">
                Continue your adventures through WhatsApp and Telegram integration
              </p>
            </div>

            {/* Character Management Card */}
            <div className="bg-mystic-800/50 p-4 rounded-lg border border-gold-700/30">
              <div className="w-10 h-10 bg-mystic-700 rounded-lg flex items-center justify-center mb-3 border border-gold-500/30">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Character Manager
              </h3>
              <p className="text-sm text-mystic-200">
                Keep track of your characters, inventory, and progression
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-mystic-950">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-mystic-800 to-mystic-700 p-8 rounded-xl border border-gold-700/30">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Roll for Initiative?
            </h2>
            <p className="text-base text-mystic-200 mb-6">
              Join thousands of players and create your first campaign today
            </p>
            <button className="px-6 py-3 bg-mystic-600 text-white rounded-lg hover:bg-mystic-500 transition text-base font-semibold border border-gold-500">
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;