import React, { useState } from 'react';
import { User } from '../types';
import { Settings, Globe, Shield, User as UserIcon, Save, ArrowLeft } from 'lucide-react';

interface UserSettingsProps {
  currentUser: User;
  onUpdateUser: (updatedUser: User) => void;
  onBack: () => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  currentUser,
  onUpdateUser,
  onBack,
  selectedLanguage,
  onLanguageChange,
}) => {
  const [fullName, setFullName] = useState(currentUser.profile?.fullName || currentUser.email.split('@')[0]);
  const [location, setLocation] = useState(currentUser.profile?.location || 'Pakistan');
  const [phone, setPhone] = useState(currentUser.profile?.phone || '');
  const [dialect, setDialect] = useState(selectedLanguage || 'en-US');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Create updated user profile
    const updatedUser: User = {
      ...currentUser,
      preferredLanguage: dialect,
      profile: currentUser.profile ? {
        ...currentUser.profile,
        fullName,
        location,
        phone,
      } : {
        fullName,
        location,
        phone,
        profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        cnicNumber: '',
        cnicFront: '',
        cnicBack: '',
        bio: 'No bio added yet.',
        bankAccount: '',
        jazzCash: '',
        easyPaisa: ''
      }
    };

    onUpdateUser(updatedUser);
    onLanguageChange(dialect);
    alert('Settings successfully updated!');
  };

  return (
    <div className="max-w-xl mx-auto my-8 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 animate-fadeIn text-xs text-gray-700">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Homepage
      </button>

      <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
        <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
          <Settings size={20} className="text-[#00B22D]" />
          Account & Language Settings
        </h2>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border px-2.5 py-1 rounded-lg">
          Settings Panel
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal details */}
        <div className="space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <UserIcon size={14} />
            Personal Identification
          </h3>
          
          <div className="space-y-1.5">
            <label className="block font-bold text-gray-600">Account Email</label>
            <input 
              type="text" 
              disabled 
              value={currentUser.email} 
              className="w-full bg-gray-100 border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none font-mono text-gray-500 cursor-not-allowed select-all" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-gray-600">Full Name</label>
            <input 
              type="text" 
              required
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-gray-600">Mobile Phone</label>
            <input 
              type="tel" 
              placeholder="e.g. +92 300 1234567"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-gray-600">Location Country</label>
            <input 
              type="text" 
              required
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 py-2.5 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00B22D]" 
            />
          </div>
        </div>

        {/* English dialects settings */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-bold text-xs uppercase tracking-wider text-purple-800 flex items-center gap-1">
            <Globe size={14} className="text-purple-600" />
            Language & Dialect Selection
          </h3>

          <p className="text-[11px] text-gray-500 leading-relaxed">
            Choose your preferred localization. If you choose an English variant, all text will adjust to use the exact spelling, terminology, and dialect preferences selected below:
          </p>

          <div className="space-y-2.5">
            {[
              { 
                code: 'en-US', 
                flag: '🇺🇸', 
                title: 'English (United States)', 
                desc: 'American spelling conventions (e.g., color, favorite, organize).' 
              },
              { 
                code: 'en-GB', 
                flag: '🇬🇧', 
                title: 'English (United Kingdom)', 
                desc: 'British spelling conventions (e.g., colour, favourite, organise).' 
              },
              { 
                code: 'en-simple', 
                flag: '🌍', 
                title: 'English (Simple Dialect)', 
                desc: 'Easy basic English with streamlined vocabulary for non-native speakers.' 
              },
              { 
                code: 'ur', 
                flag: '🇵🇰', 
                title: 'اردو (Urdu Language)', 
                desc: 'Native Urdu translation with automatic right-to-left layout alignment.' 
              }
            ].map((opt) => (
              <label 
                key={opt.code}
                onClick={() => setDialect(opt.code)}
                className={`flex gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all hover:bg-gray-50 ${
                  dialect === opt.code 
                    ? 'border-[#00B22D] bg-[#f1fbf6] ring-1 ring-[#00B22D]' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <input 
                  type="radio" 
                  name="dialect" 
                  checked={dialect === opt.code}
                  onChange={() => {}}
                  className="mt-0.5 shrink-0 accent-[#00B22D]" 
                />
                <div className="space-y-0.5">
                  <div className="font-bold text-gray-800 flex items-center gap-1.5">
                    <span>{opt.flag}</span>
                    <span>{opt.title}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-gray-100 flex justify-end gap-2.5 font-bold">
          <button 
            type="button" 
            onClick={onBack}
            className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-500"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2.5 bg-[#00B22D] hover:bg-[#008000] text-white rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Save size={14} />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
