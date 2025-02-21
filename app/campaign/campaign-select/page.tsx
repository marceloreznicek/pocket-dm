import { FC } from 'react';
import Link from 'next/link';
import { Users, Clock, MapPin } from 'lucide-react';

// Mock campaign data
const campaigns = [
  {
    id: 1,
    title: "The Lost Mines of Phandelver",
    description: "A D&D 5e adventure for levels 1-5. Explore the mysterious cave system and face the dangers within.",
    playerCount: "3-5",
    duration: "4-5 months",
    setting: "Forgotten Realms",
    difficulty: "Beginner Friendly"
  },
  {
    id: 2,
    title: "Curse of Strahd",
    description: "Gothic horror campaign in the mist-shrouded lands of Barovia. Face the vampire lord Strahd von Zarovich.",
    playerCount: "4-6",
    duration: "6-8 months",
    setting: "Ravenloft",
    difficulty: "Challenging"
  },
  {
    id: 3,
    title: "Rise of the Dragon Queen",
    description: "Epic adventure stopping the Cult of the Dragon from summoning Tiamat into the realm.",
    playerCount: "4-6",
    duration: "8-12 months",
    setting: "Forgotten Realms",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "Shadows of the Frost Maiden",
    description: "Brave the endless night and bitter cold in this horror-themed arctic adventure.",
    playerCount: "3-6",
    duration: "6-7 months",
    setting: "Icewind Dale",
    difficulty: "Challenging"
  }
];

const CampaignSelector: FC = () => {
  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4 font-display">
            Choose Your Adventure
          </h1>
          <p className="text-lg text-green-700">
            Select a campaign to begin your journey
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <Link 
              href={`/campaign/${campaign.id}`} 
              key={campaign.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-green-300 hover:border-green-500 transition-all duration-300 group"
            >
              <div className="relative">
                {/* Difficulty badge */}
                <div className="absolute top-4 right-4 bg-green-200 px-3 py-1 rounded-full border border-green-400">
                  <span className="text-sm text-green-900">{campaign.difficulty}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {campaign.title}
                </h3>
                <p className="text-green-700 mb-4">
                  {campaign.description}
                </p>

                {/* Campaign stats */}
                <div className="grid grid-cols-3 gap-4 text-sm text-green-800">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span>{campaign.playerCount} players</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-green-600" />
                    <span>{campaign.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    <span>{campaign.setting}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Optional: Add Campaign Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition border border-green-700 font-semibold">
            Create New Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignSelector;
