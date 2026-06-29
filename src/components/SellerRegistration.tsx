import React, { useState } from 'react';
import { SellerProfile } from '../types';
import { User, Shield, Briefcase, CreditCard, CheckCircle, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

interface SellerRegistrationProps {
  isUrdu: boolean;
  onSubmit: (profile: SellerProfile) => void;
  onCancel: () => void;
}

export const SellerRegistration: React.FC<SellerRegistrationProps> = ({
  isUrdu,
  onSubmit,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // STEP 1 - Personal Profile
  const [fullName, setFullName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [location, setLocation] = useState('Lahore, Pakistan');
  const [phone, setPhone] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [cnicFront, setCnicFront] = useState('');
  const [cnicBack, setCnicBack] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  // STEP 2 - Professional Profile
  const [title, setTitle] = useState('');
  const [skillsList, setSkillsList] = useState<{ name: string; level: 'Basic' | 'Intermediate' | 'Expert' }[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Basic' | 'Intermediate' | 'Expert'>('Intermediate');

  const [educationList, setEducationList] = useState<{ school: string; degree: string; yearFrom: string; yearTo: string }[]>([]);
  const [eduSchool, setEduSchool] = useState('');
  const [eduDegree, setEduDegree] = useState('');
  const [eduYearFrom, setEduYearFrom] = useState('');
  const [eduYearTo, setEduYearTo] = useState('');

  const [languagesList, setLanguagesList] = useState<{ name: string; level: string }[]>([]);
  const [newLangName, setNewLangName] = useState('');
  const [newLangLevel, setNewLangLevel] = useState('Fluent');

  const [bio, setBio] = useState('');

  // STEP 3 - Payment Information
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [jazzCash, setJazzCash] = useState('');
  const [easyPaisa, setEasyPaisa] = useState('');
  const [payoneer, setPayoneer] = useState('');
  const [paymentTab, setPaymentTab] = useState<'JazzCash' | 'EasyPaisa' | 'Bank' | 'Payoneer'>('JazzCash');

  // File Handlers
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFakeFile = (setter: React.Dispatch<React.SetStateAction<string>>, mockUrl: string) => {
    setter(mockUrl);
  };

  // Add / Remove lists helpers
  const addSkill = () => {
    if (!newSkillName.trim()) return;
    if (skillsList.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) return;
    setSkillsList([...skillsList, { name: newSkillName.trim(), level: newSkillLevel }]);
    setNewSkillName('');
  };

  const removeSkill = (index: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    if (!eduSchool.trim() || !eduDegree.trim() || !eduYearFrom || !eduYearTo) return;
    setEducationList([...educationList, {
      school: eduSchool.trim(),
      degree: eduDegree.trim(),
      yearFrom: eduYearFrom,
      yearTo: eduYearTo
    }]);
    setEduSchool('');
    setEduDegree('');
    setEduYearFrom('');
    setEduYearTo('');
  };

  const removeEducation = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (!newLangName.trim()) return;
    if (languagesList.some(l => l.name.toLowerCase() === newLangName.trim().toLowerCase())) return;
    setLanguagesList([...languagesList, { name: newLangName.trim(), level: newLangLevel }]);
    setNewLangName('');
  };

  const removeLanguage = (index: number) => {
    setLanguagesList(languagesList.filter((_, i) => i !== index));
  };

  // Flow validators & navigations
  const validateStep1 = () => {
    if (!fullName || !location || !phone || !cnicNumber || !dob || !gender) {
      alert(isUrdu ? 'براہ کرم تمام لازمی ذاتی معلومات پُر کریں۔' : 'Please fill out all required personal profile fields.');
      return false;
    }
    if (!profilePic) {
      alert(isUrdu ? 'براہ کرم اپنی پروفائل تصویر اپ لوڈ کریں۔' : 'Please upload a profile picture.');
      return false;
    }
    if (!cnicFront || !cnicBack) {
      alert(isUrdu ? 'براہ کرم شناختی کارڈ (CNIC) کی دونوں سائیڈز کی تصاویر اپ لوڈ کریں۔' : 'Please upload both front and back photos of your CNIC.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!title) {
      alert(isUrdu ? 'براہ کرم اپنا پیشہ ورانہ عنوان درج کریں۔' : 'Please enter your Professional Title.');
      return false;
    }
    if (skillsList.length === 0) {
      alert(isUrdu ? 'براہ کرم کم از کم ایک مہارت (Skill) شامل کریں۔' : 'Please add at least one skill.');
      return false;
    }
    if (languagesList.length === 0) {
      alert(isUrdu ? 'براہ کرم کم از کم ایک زبان (Language) شامل کریں۔' : 'Please add at least one language.');
      return false;
    }
    if (bio.length < 50) {
      alert(isUrdu ? 'آپ کا تعارف (Bio) کم از کم 50 حروف کا ہونا چاہیے۔' : 'Your biography must be at least 50 characters long.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!bankAccount && !jazzCash && !easyPaisa) {
      alert(isUrdu ? 'براہ کرم کم از کم ایک ادائیگی کا طریقہ (Bank, JazzCash, EasyPaisa) فراہم کریں۔' : 'Please provide at least one payout channel (Bank Account, JazzCash, or EasyPaisa).');
      return false;
    }
    if (bankAccount && (!bankName || !accountHolder)) {
      alert(isUrdu ? 'بینک اکاؤنٹ کے لیے بینک کا نام اور اکاؤنٹ ہولڈر کا نام لازمی ہے۔' : 'Bank Name and Account Holder Name are required for Bank transfer.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((step - 1) as any);
    }
  };

  const handleFinish = () => {
    const finalSkillsStr = skillsList.map(s => `${s.name} (${s.level})`).join(', ');
    onSubmit({
      fullName,
      profilePic: profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      location,
      phone,
      cnicNumber,
      cnicFront: cnicFront || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300',
      cnicBack: cnicBack || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300',
      dob,
      gender,
      title,
      skills: finalSkillsStr,
      skillsList,
      educationList,
      languagesList,
      bio,
      bankAccount,
      bankName,
      accountHolder,
      jazzCash,
      easyPaisa,
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 my-8">
      {/* Step Header Indicator */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#00B22D] font-heading">
              {isUrdu ? 'سیلر رجسٹریشن کا عمل' : 'Become a SkillTH Seller'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isUrdu 
                ? 'فری لانس مارکیٹ پلیس پر اپنی دکان کھولنے کے لیے ۴ آسان اقدامات مکمل کریں۔' 
                : 'Complete 4 simple steps to set up your verified professional freelancing account.'}
            </p>
          </div>
          <button 
            type="button" 
            onClick={onCancel}
            className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors self-start md:self-center"
          >
            {isUrdu ? 'کینسل کریں' : 'Cancel & Return'}
          </button>
        </div>

        {/* Steps Progress Bar */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {[
            { num: 1, label: isUrdu ? 'ذاتی معلومات' : 'Personal', icon: User },
            { num: 2, label: isUrdu ? 'پیشہ ورانہ' : 'Professional', icon: Briefcase },
            { num: 3, label: isUrdu ? 'ادائیگی اکاؤنٹ' : 'Payment', icon: CreditCard },
            { num: 4, label: isUrdu ? 'مکمل اکاؤنٹ' : 'Complete', icon: CheckCircle },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isPassed = step > s.num;
            return (
              <div key={s.num} className="text-center relative">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#00B22D] text-white ring-4 ring-emerald-100 scale-105' 
                      : isPassed 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[11px] md:text-xs font-semibold mt-2 block transition-colors duration-300 ${
                    isActive ? 'text-[#00B22D] font-bold' : isPassed ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Personal Profile */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۱: ذاتی معلومات اور شناخت' : 'Step 1: Personal Profile & Verification'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'اپنے قومی شناختی کارڈ کے مطابق معلومات درج کریں۔' : 'Provide your official personal details for identity safety.'}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Profile Pic Upload */}
            <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-6 p-5 bg-[#fcfdfd] border border-gray-100 rounded-xl">
              <div className="relative">
                {profilePic ? (
                  <img src={profilePic} alt="Profile preview" className="w-24 h-24 rounded-full object-cover border-4 border-[#00B22D] shadow-md" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400 text-xs">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  {isUrdu ? 'پروفائل تصویر اپ لوڈ کریں *' : 'Profile Picture *'}
                </label>
                <p className="text-[11px] text-gray-400">{isUrdu ? 'پروفیشنل نظر آنے والی تصویر منتخب کریں۔ جے پی جی یا پی این جی۔' : 'Select a professional, high-quality portrait photo.'}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-pic-uploader"
                    onChange={(e) => handleFileChange(e, setProfilePic)}
                    className="hidden"
                  />
                  <label
                    htmlFor="profile-pic-uploader"
                    className="cursor-pointer text-xs font-bold bg-[#00B22D] hover:bg-[#008000] text-white px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
                  >
                    {isUrdu ? 'فائل منتخب کریں' : 'Choose File'}
                  </label>
                  <button
                    type="button"
                    onClick={() => triggerFakeFile(setProfilePic, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150')}
                    className="text-[11px] text-[#00B22D] hover:underline font-medium"
                  >
                    {isUrdu ? 'ڈیمو فوٹو استعمال کریں' : 'Use Demo Portrait'}
                  </button>
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'مکمل نام *' : 'Full Name *'}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isUrdu ? 'جیسے: محمد علی' : 'e.g. Muhammad Ali'}
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'رہائش گاہ (شہر، ملک) *' : 'Location (City, Country) *'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Islamabad, Pakistan"
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D]"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'فون نمبر *' : 'Phone Number *'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0300-1234567"
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D]"
              />
            </div>

            {/* CNIC Number */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'شناختی کارڈ نمبر (CNIC) *' : 'CNIC / ID Card Number *'}
              </label>
              <input
                type="text"
                value={cnicNumber}
                onChange={(e) => setCnicNumber(e.target.value)}
                placeholder="35201-XXXXXXX-X"
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D]"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'تاریخِ پیدائش *' : 'Date of Birth *'}
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] text-gray-700"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'جنس *' : 'Gender *'}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] text-gray-700"
              >
                <option value="">{isUrdu ? '-- منتخب کریں --' : '-- Select --'}</option>
                <option value="Male">{isUrdu ? 'مرد' : 'Male'}</option>
                <option value="Female">{isUrdu ? 'خواتین' : 'Female'}</option>
                <option value="Other">{isUrdu ? 'دیگر' : 'Other'}</option>
              </select>
            </div>

            {/* CNIC photo upload container */}
            <div className="md:col-span-2 bg-[#fffdfa] border border-amber-100 rounded-xl p-4 md:p-5 space-y-4">
              <h4 className="font-bold text-xs uppercase text-amber-800 tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-600" />
                {isUrdu ? 'قومی شناختی کارڈ (CNIC) تصاویر اپ لوڈ کریں' : 'CNIC Verification Document Images'}
              </h4>
              <p className="text-[11px] text-gray-500">
                {isUrdu 
                  ? 'سیکورٹی کو یقینی بنانے کے لیے شناختی کارڈ کی فرنٹ اور بیک دونوں تصاویر اپ لوڈ کرنا لازمی ہے۔' 
                  : 'To enable seller features, upload clear readable photos of both front and back of your CNIC.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* CNIC Front */}
                <div className="bg-white border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center space-y-3">
                  <span className="text-xs font-bold text-gray-600">{isUrdu ? 'شناختی کارڈ (فرنٹ) *' : 'CNIC Front Photo *'}</span>
                  {cnicFront ? (
                    <img src={cnicFront} alt="CNIC Front" className="h-20 w-36 object-cover rounded-lg border shadow-sm" />
                  ) : (
                    <div className="h-20 w-36 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 text-[10px]">
                      Front Side Image
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="cnic-front-file"
                      onChange={(e) => handleFileChange(e, setCnicFront)}
                      className="hidden"
                    />
                    <label
                      htmlFor="cnic-front-file"
                      className="cursor-pointer text-[10px] font-bold bg-amber-500 text-white px-2.5 py-1.5 rounded hover:bg-amber-600 transition-colors"
                    >
                      {isUrdu ? 'تصویر منتخب کریں' : 'Upload Front'}
                    </label>
                    <button
                      type="button"
                      onClick={() => triggerFakeFile(setCnicFront, 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400')}
                      className="text-[9px] text-amber-700 hover:underline"
                    >
                      {isUrdu ? 'ڈیمو تصویر' : 'Demo Front'}
                    </button>
                  </div>
                </div>

                {/* CNIC Back */}
                <div className="bg-white border border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center text-center space-y-3">
                  <span className="text-xs font-bold text-gray-600">{isUrdu ? 'شناختی کارڈ (بیک) *' : 'CNIC Back Photo *'}</span>
                  {cnicBack ? (
                    <img src={cnicBack} alt="CNIC Back" className="h-20 w-36 object-cover rounded-lg border shadow-sm" />
                  ) : (
                    <div className="h-20 w-36 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 text-[10px]">
                      Back Side Image
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="cnic-back-file"
                      onChange={(e) => handleFileChange(e, setCnicBack)}
                      className="hidden"
                    />
                    <label
                      htmlFor="cnic-back-file"
                      className="cursor-pointer text-[10px] font-bold bg-amber-500 text-white px-2.5 py-1.5 rounded hover:bg-amber-600 transition-colors"
                    >
                      {isUrdu ? 'تصویر منتخب کریں' : 'Upload Back'}
                    </label>
                    <button
                      type="button"
                      onClick={() => triggerFakeFile(setCnicBack, 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400')}
                      className="text-[9px] text-amber-700 hover:underline"
                    >
                      {isUrdu ? 'ڈیمو تصویر' : 'Demo Back'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Professional Profile */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۲: پیشہ ورانہ تفصیلات اور مہارتیں' : 'Step 2: Professional Profile'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'اپنے پیشے، تعلیم اور مہارتوں کے بارے میں تفصیل سے بتائیں۔' : 'Introduce your work specialty, skills, education, and language proficiencies.'}</p>
          </div>

          <div className="space-y-5">
            {/* Professional Title */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'پیشہ ورانہ عنوان (Professional Title) *' : 'Professional Title *'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isUrdu ? 'جیسے: میں ایک پروفیشنل گرافک ڈیزائنر ہوں' : 'e.g. I am a Graphic Designer / Web Developer'}
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D]"
              />
            </div>

            {/* Add Multiple Skills */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isUrdu ? 'مہارتیں شامل کریں (Skills) *' : 'Add Professional Skills *'}
              </span>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder={isUrdu ? 'مہارت لکھیں (جیسے: WordPress)' : 'Enter a skill (e.g. WordPress, Copywriting)'}
                  className="flex-1 text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                />
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as any)}
                  className="text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D] text-gray-700"
                >
                  <option value="Basic">{isUrdu ? 'بنیادی (Basic)' : 'Basic'}</option>
                  <option value="Intermediate">{isUrdu ? 'درمیانی (Intermediate)' : 'Intermediate'}</option>
                  <option value="Expert">{isUrdu ? 'ماہر (Expert)' : 'Expert'}</option>
                </select>
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-[#00B22D] hover:bg-[#008000] text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {isUrdu ? 'شامل کریں' : 'Add'}
                </button>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {skillsList.map((sk, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {sk.name} <span className="text-[10px] bg-emerald-200/50 px-1.5 py-0.5 rounded text-emerald-800">{sk.level}</span>
                    <button type="button" onClick={() => removeSkill(index)} className="hover:text-red-500 cursor-pointer text-[13px] font-bold">&times;</button>
                  </span>
                ))}
                {skillsList.length === 0 && (
                  <p className="text-[11px] text-gray-400 italic">{isUrdu ? 'کوئی مہارت شامل نہیں کی گئی۔' : 'No skills added yet. Add at least one.'}</p>
                )}
              </div>
            </div>

            {/* Education Profile Details */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isUrdu ? 'تعلیمی قابلیت (Education)' : 'Academic Education (Optional)'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={eduSchool}
                  onChange={(e) => setEduSchool(e.target.value)}
                  placeholder={isUrdu ? 'یونیورسٹی یا اسکول کا نام' : 'University / School Name'}
                  className="text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                />
                <input
                  type="text"
                  value={eduDegree}
                  onChange={(e) => setEduDegree(e.target.value)}
                  placeholder={isUrdu ? 'ڈگری یا سرٹیفکیٹ' : 'Degree / Certificate'}
                  className="text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                />
                <input
                  type="text"
                  value={eduYearFrom}
                  onChange={(e) => setEduYearFrom(e.target.value)}
                  placeholder={isUrdu ? 'کب سے (Year From)' : 'Year From (e.g. 2018)'}
                  className="text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                />
                <input
                  type="text"
                  value={eduYearTo}
                  onChange={(e) => setEduYearTo(e.target.value)}
                  placeholder={isUrdu ? 'کب تک (Year To)' : 'Year To (e.g. 2022)'}
                  className="text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                />
              </div>

              <button
                type="button"
                onClick={addEducation}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors ml-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                {isUrdu ? 'تعلیم شامل کریں' : 'Add Education'}
              </button>

              {/* Education List */}
              <div className="space-y-2 pt-1">
                {educationList.map((edu, index) => (
                  <div key={index} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-2.5 text-xs shadow-xs">
                    <div>
                      <p className="font-bold text-gray-700">{edu.degree}</p>
                      <p className="text-gray-500 text-[11px]">{edu.school} • {edu.yearFrom} - {edu.yearTo}</p>
                    </div>
                    <button type="button" onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages List */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isUrdu ? 'زبانیں (Languages) *' : 'Languages *'}
              </span>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newLangName}
                  onChange={(e) => setNewLangName(e.target.value)}
                  placeholder={isUrdu ? 'زبان (جیسے: Urdu, English)' : 'Enter language (e.g. English, Urdu)'}
                  className="flex-1 text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                />
                <select
                  value={newLangLevel}
                  onChange={(e) => setNewLangLevel(e.target.value)}
                  className="text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D] text-gray-700"
                >
                  <option value="Basic">{isUrdu ? 'بنیادی (Basic)' : 'Basic'}</option>
                  <option value="Conversational">{isUrdu ? 'گفتگو (Conversational)' : 'Conversational'}</option>
                  <option value="Fluent">{isUrdu ? 'روانی (Fluent)' : 'Fluent'}</option>
                  <option value="Native">{isUrdu ? 'مادری (Native/Bilingual)' : 'Native/Bilingual'}</option>
                </select>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="bg-[#00B22D] hover:bg-[#008000] text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {isUrdu ? 'زبان شامل کریں' : 'Add'}
                </button>
              </div>

              {/* Languages List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {languagesList.map((lang, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {lang.name} <span className="text-[10px] bg-blue-200/50 px-1.5 py-0.5 rounded text-blue-800">{lang.level}</span>
                    <button type="button" onClick={() => removeLanguage(index)} className="hover:text-red-500 cursor-pointer text-[13px] font-bold">&times;</button>
                  </span>
                ))}
                {languagesList.length === 0 && (
                  <p className="text-[11px] text-gray-400 italic">{isUrdu ? 'کوئی زبان شامل نہیں کی گئی۔' : 'No languages added yet. Add at least one.'}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isUrdu ? 'تعارف / بائیو (Bio - کم از کم ۵۰ حروف) *' : 'Biography / Description (Minimum 50 chars) *'}
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder={isUrdu ? 'اپنے تجربے، مہارت اور سابقہ پروجیکٹس کے بارے میں تفصیل سے لکھیں...' : 'Share information about your years of experience, expertise, tools, and background.'}
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D]"
              />
              <span className="text-[10px] text-gray-400 block text-right mt-1">
                {bio.length} {isUrdu ? 'حروف' : 'characters'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Payment Information */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۳: ادائیگی کی وصولی کی معلومات' : 'Step 3: Payment & Payout Accounts'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'رقم نکلوانے کے لیے کم از کم ایک لوکل اکاؤنٹ درج کریں۔' : 'Provide at least one Pakistan local account to withdraw your verified freelance earnings.'}</p>
          </div>

          <div className="space-y-6">
            {/* TABS HEADER */}
            <div className="flex border-b border-gray-200">
              {['JazzCash', 'EasyPaisa', 'Bank', 'Payoneer'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPaymentTab(tab as any)}
                  className={`flex-1 text-center py-2.5 font-bold text-xs transition-all border-b-2 cursor-pointer ${
                    paymentTab === tab
                      ? 'border-[#00B22D] text-[#00B22D] bg-[#00B22D]/5 font-extrabold'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            {paymentTab === 'Bank' && (
              <div className="border border-green-200 bg-emerald-50/20 rounded-xl p-4 md:p-5 space-y-4 animate-fadeIn">
                <h4 className="font-bold text-xs uppercase text-[#0a4d2e] tracking-wider flex items-center gap-1.5">
                  🏦 {isUrdu ? 'پاکستانی بینک اکاؤنٹ (Bank Transfer)' : 'Local Bank Transfer Details (PKR)'}
                </h4>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      {isUrdu ? 'اکاؤنٹ ہولڈر کا نام' : 'Account Holder Name'}
                    </label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="e.g. Ali Raza"
                      className="w-full text-xs border border-green-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      {isUrdu ? 'بینک کا نام' : 'Bank Name'}
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. HBL, Alfalah, Meezan"
                      className="w-full text-xs border border-green-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">
                      {isUrdu ? 'بینک اکاؤنٹ نمبر (IBAN)' : 'IBAN Account Number'}
                    </label>
                    <input
                      type="text"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="PKXXALHL0001..."
                      className="w-full text-xs border border-green-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentTab === 'JazzCash' && (
              <div className="border border-indigo-200 bg-indigo-50/10 rounded-xl p-4 md:p-5 space-y-4 animate-fadeIn">
                <h4 className="font-bold text-xs uppercase text-indigo-950 tracking-wider flex items-center gap-1.5">
                  📱 {isUrdu ? 'جازکیش اکاؤنٹ (JazzCash)' : 'JazzCash Wallet Details'}
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {isUrdu ? 'جازکیش نمبر (JazzCash)' : 'JazzCash Number'}
                  </label>
                  <input
                    type="text"
                    value={jazzCash}
                    onChange={(e) => setJazzCash(e.target.value)}
                    placeholder="e.g. 0300-1234567"
                    className="w-full text-xs border border-indigo-100 bg-white rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D]"
                  />
                </div>
              </div>
            )}

            {paymentTab === 'EasyPaisa' && (
              <div className="border border-indigo-200 bg-indigo-50/10 rounded-xl p-4 md:p-5 space-y-4 animate-fadeIn">
                <h4 className="font-bold text-xs uppercase text-indigo-950 tracking-wider flex items-center gap-1.5">
                  📱 {isUrdu ? 'ایزی پیسہ اکاؤنٹ (EasyPaisa)' : 'EasyPaisa Wallet Details'}
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {isUrdu ? 'ایزی پیسہ نمبر (EasyPaisa)' : 'EasyPaisa Number'}
                  </label>
                  <input
                    type="text"
                    value={easyPaisa}
                    onChange={(e) => setEasyPaisa(e.target.value)}
                    placeholder="e.g. 0345-1234567"
                    className="w-full text-xs border border-indigo-100 bg-white rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D]"
                  />
                </div>
              </div>
            )}

            {paymentTab === 'Payoneer' && (
              <div className="border border-purple-200 bg-purple-50/10 rounded-xl p-4 md:p-5 space-y-4 animate-fadeIn">
                <h4 className="font-bold text-xs uppercase text-purple-950 tracking-wider flex items-center gap-1.5">
                  💳 {isUrdu ? 'پایونیئر اکاؤنٹ (Payoneer)' : 'Payoneer Account Details'}
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {isUrdu ? 'پایونیئر ای میل (Payoneer Email)' : 'Payoneer Email / Customer ID'}
                  </label>
                  <input
                    type="text"
                    value={payoneer}
                    onChange={(e) => setPayoneer(e.target.value)}
                    placeholder="e.g. seller@payoneer.com"
                    className="w-full text-xs border border-purple-100 bg-white rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Profile Complete */}
      {step === 4 && (
        <div className="text-center py-8 space-y-6">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-[#00B22D] mx-auto border-2 border-emerald-100 shadow-sm animate-bounce">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 font-heading">
              {isUrdu ? 'مبارک ہو! رجسٹریشن مکمل ہو گئی ✅' : 'Congratulations! Profile Complete ✅'}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {isUrdu 
                ? 'آپ کی پیشہ ورانہ معلومات محفوظ کر لی گئی ہیں۔ اب آپ اپنے بہترین ریٹس پر گگز (Gigs) بنا کر خریداروں کو آفرز دے سکتے ہیں۔' 
                : 'Your verified seller profile is now ready. You can create gig packages, write descriptions, specify custom requirements, and publish to start taking orders!'}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-center">
            <button
              type="button"
              onClick={handleFinish}
              className="bg-[#00B22D] hover:bg-[#008000] text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 shadow-sm hover:shadow-md transition-all scale-105"
            >
              {isUrdu ? 'کام شروع کریں اور گگ بنائیں!' : 'Start Freelancing & Create Gigs'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Action Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              step === 1 
                ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isUrdu ? 'پیچھے' : 'Back'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 bg-[#00B22D] hover:bg-[#008000] text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-xs"
          >
            {isUrdu ? 'اگلا مرحلہ' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
