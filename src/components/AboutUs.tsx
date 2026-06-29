import React from 'react';
import { ArrowLeft, MapPin, Award, Shield, Compass } from 'lucide-react';

interface AboutUsProps {
  isUrdu: boolean;
  onBack: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ isUrdu, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn py-4">
      {/* Hero Section */}
      <div className="bg-[#0a4d2e] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg flex flex-col justify-center min-h-[220px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="bg-[#00B22D] text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border border-green-400">
            {isUrdu ? 'ہمارے بارے میں' : 'Who We Are'}
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            {isUrdu ? 'SkillTH: پاکستان کا اپنا فری لانس پلیٹ فارم' : 'SkillTH: Pakistan\'s Premier Freelance Platform'}
          </h1>
          <p className="text-xs md:text-sm text-green-100/90 leading-relaxed font-medium">
            {isUrdu 
              ? 'پاکستان کے ہنر مندوں کو عالمی سطح پر جوڑنے اور محفوظ ادائیگیوں کے نظام کو یقینی بنانے والا سب سے معتبر فری لانس پلیٹ فارم۔' 
              : 'Bridging the gap between talented Pakistani freelancers and global clients through secure local escrow services.'}
          </p>
        </div>
      </div>

      {/* Grid containing Company Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core details card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 border-b pb-3 flex items-center gap-2">
            <Compass className="text-[#00B22D]" size={20} />
            {isUrdu ? 'کمپنی کی تفصیلات' : 'Company Details'}
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="font-extrabold text-gray-500">{isUrdu ? 'پلیٹ فارم کا نام:' : 'Brand Name:'}</span>
              <span className="font-black text-gray-900 select-none">
                Skill<span className="text-[#00B22D]">.</span>TH
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="font-extrabold text-gray-500">{isUrdu ? 'بانی (Founder):' : 'Founder:'}</span>
              <span className="font-black text-gray-800">Tehzeeb Sherazi</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="font-extrabold text-gray-500">{isUrdu ? 'مقصد (Purpose):' : 'Purpose:'}</span>
              <span className="font-bold text-[#00B22D]">Freelance Service Platform</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="font-extrabold text-gray-500">{isUrdu ? 'مقام (Location):' : 'Location:'}</span>
              <span className="font-extrabold text-gray-800 flex items-center gap-1">
                <MapPin size={14} className="text-red-500" />
                Pakistan (Local Operations)
              </span>
            </div>
          </div>
        </div>

        {/* Vision & Values card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-gray-900 border-b pb-3 flex items-center gap-2">
              <Award className="text-[#00B22D]" size={20} />
              {isUrdu ? 'ہمارا مشن اور وژن' : 'Our Mission & Vision'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-4">
              {isUrdu 
                ? 'ہمارا مقصد ہر پاکستانی ہنرمند کو خود مختار بنانا ہے۔ ہم روایتی بینکاری کے بغیر موبائل والٹس (JazzCash, EasyPaisa) کے ذریعے فوری اور محفوظ ادائیگیوں کو ممکن بناتے ہیں۔' 
                : 'Our mission is to empower the gig economy in Pakistan. By integrating seamless local payment gateways like JazzCash, EasyPaisa, and Bank Transfer with local escrow contracts, we allow absolute security for both clients and service providers.'}
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex gap-2 text-[11px] text-green-950 font-bold mt-4">
            <Shield size={16} className="text-[#00B22D] shrink-0" />
            <span>
              {isUrdu 
                ? 'محفوظ معاہدے اور زیر التوا رقوم (Escrow) کا ضامن' 
                : '100% Secure Escrow Guarantee & Verified Local Payouts.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
