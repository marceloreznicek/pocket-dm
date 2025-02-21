import { FC } from 'react';
import Link from 'next/link';
import { Settings, User, Dice6 } from 'lucide-react';

const Header: FC = () => {
  return (
    <header className="bg-green-100 border-b border-green-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo and Title */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-90 transition"
          >
            <Dice6 className="w-8 h-8 text-green-700" />
            <span className="text-xl font-display text-green-900">
              Pocket Dungeon Master
            </span>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-green-800 hover:text-green-900 hover:bg-green-200 rounded-lg transition flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </button>
            
            <button className="p-2 text-green-800 hover:text-green-900 hover:bg-green-200 rounded-lg transition flex items-center space-x-2 border border-green-500">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
