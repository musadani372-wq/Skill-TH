import React, { useState } from 'react';
import { Gig, Packages, Package } from '../types';
import { FileText, Image as ImageIcon, Video, HelpCircle, Layers, CheckSquare, ListPlus, Trash2, ArrowRight, ArrowLeft, Globe, BadgeHelp, Check } from 'lucide-react';

interface GigCreationFormProps {
  isUrdu: boolean;
  currentUser: { email: string; profile?: any };
  onCancel: () => void;
  onSubmit: (gigData: Partial<Gig>) => void;
}

const CATEGORY_MAP: Record<string, string[]> = {
  'Graphics & Design': ['Logo Design', 'Branding', 'Web Design', 'Book Illustration', 'Social Media Graphics'],
  'Programming & Tech': ['WordPress', 'Custom React Apps', 'Web Applications', 'Mobile Development', 'Database Setup'],
  'Digital Marketing': ['SEO & Backlinks', 'Social Media Ads', 'Link Building', 'Keyword Research'],
  'Video & Animation': ['Video Editing', 'Motion Graphics', 'Intros & Outros', 'After Effects Work'],
  'Writing & Translation': ['Urdu Translation', 'English Copywriting', 'Blog Writing', 'Proofreading'],
};

export const GigCreationForm: React.FC<GigCreationFormProps> = ({
  isUrdu,
  currentUser,
  onCancel,
  onSubmit,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // GIG STEP 1 — Overview
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Graphics & Design');
  const [subCategory, setSubCategory] = useState('Logo Design');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // GIG STEP 2 — Pricing Packages
  const [pkgBasic, setPkgBasic] = useState<Package>({
    title: 'Basic Starter',
    description: '1 Essential concept, high-resolution JPG & PNG files.',
    deliveryTime: 3,
    revisions: 2,
    price: 1500
  });

  const [pkgStd, setPkgStd] = useState<Package>({
    title: 'Standard Pro',
    description: '3 Professional concepts, vector source files, 3D Mockup.',
    deliveryTime: 5,
    revisions: 5,
    price: 4500
  });

  const [pkgPrem, setPkgPrem] = useState<Package>({
    title: 'Premium Elite',
    description: 'Complete branding package with social media kit, stationary designs and VIP support.',
    deliveryTime: 10,
    revisions: 99,
    price: 10000
  });

  const [extraServices, setExtraServices] = useState([
    { name: 'Extra Fast 1-Day Delivery', price: 1000, enabled: false },
    { name: 'Additional Revision Concept', price: 500, enabled: false },
    { name: 'Source Files (.AI / .PSD / .FIGMA)', price: 1500, enabled: false },
  ]);

  // GIG STEP 3 — Description & FAQ
  const [description, setDescription] = useState('');
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // GIG STEP 4 — Requirements
  const [requirementsList, setRequirementsList] = useState<{ question: string; type: 'text' | 'multiple_choice' | 'file'; options?: string[] }[]>([]);
  const [reqQ, setReqQ] = useState('');
  const [reqType, setReqType] = useState<'text' | 'multiple_choice' | 'file'>('text');
  const [reqOptionText, setReqOptionText] = useState('');
  const [reqOptions, setReqOptions] = useState<string[]>([]);

  // GIG STEP 5 — Gallery
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState('');
  const [pdf, setPdf] = useState('');

  // Step 1: Add Tag Helper
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    const cleanTag = newTag.trim().toLowerCase();
    if (!tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Step 3: Add FAQ Helper
  const handleAddFaq = () => {
    if (!faqQ.trim() || !faqA.trim()) return;
    setFaqs([...faqs, { question: faqQ.trim(), answer: faqA.trim() }]);
    setFaqQ('');
    setFaqA('');
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Step 4: Add Requirement Helper
  const handleAddReqOption = () => {
    if (!reqOptionText.trim()) return;
    setReqOptions([...reqOptions, reqOptionText.trim()]);
    setReqOptionText('');
  };

  const handleAddRequirement = () => {
    if (!reqQ.trim()) return;
    setRequirementsList([...requirementsList, {
      question: reqQ.trim(),
      type: reqType,
      options: reqType === 'multiple_choice' ? reqOptions : undefined
    }]);
    setReqQ('');
    setReqType('text');
    setReqOptions([]);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirementsList(requirementsList.filter((_, i) => i !== index));
  };

  // Step 5: File Upload Handlers (converts locally or prefilled demo)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (typeof index === 'number') {
            const updated = [...images];
            updated[index] = reader.result;
            setImages(updated);
          } else {
            setImages([...images, reader.result]);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const setDemoImage = (index: number, url: string) => {
    const updated = [...images];
    updated[index] = url;
    setImages(updated);
  };

  const handleDemoVideo = () => {
    setVideo('https://www.w3schools.com/html/mov_bbb.mp4');
  };

  const handleDemoPdf = () => {
    setPdf('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
  };

  // Validators per step
  const validateStep1 = () => {
    if (!title || title.trim().length < 10) {
      alert(isUrdu ? 'برائے مہربانی ایک تفصیلی گگ کا عنوان درج کریں (کم از کم ۱۰ الفاظ)' : 'Please enter a descriptive Gig Title (minimum 10 characters).');
      return false;
    }
    if (tags.length === 0) {
      alert(isUrdu ? 'کم از کم ایک سرچ ٹیگ شامل کریں۔' : 'Please add at least one search tag (keyword) to help buyers discover your gig.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (pkgBasic.price < 500 || pkgStd.price < 500 || pkgPrem.price < 500) {
      alert(isUrdu ? 'پیکج کی کم از کم قیمت ۵۰۰ روپے ہونا لازمی ہے۔' : 'Minimum package price is PKR 500.');
      return false;
    }
    if (!pkgBasic.title || !pkgStd.title || !pkgPrem.title) {
      alert(isUrdu ? 'برائے مہربانی تمام پیکجز کے نام لکھیں۔' : 'Please enter package names for Basic, Standard and Premium tiers.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (description.trim().length < 120) {
      alert(isUrdu ? `آپ کے گگ کی تفصیل کم از کم ۱۲۰ حروف کی ہونی چاہئے۔ موجودہ حروف: ${description.length}` : `Detailed Gig Description must be at least 120 characters long. Current: ${description.length}`);
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (requirementsList.length === 0) {
      alert(isUrdu ? 'خریدار سے کام شروع کرنے کے لیے کم از کم ایک ضرورت (Requirement) ضرور پوچھیں۔' : 'Please add at least one starting requirement from the buyer.');
      return false;
    }
    return true;
  };

  const validateStep5 = () => {
    if (images.filter(img => !!img).length === 0) {
      alert(isUrdu ? 'اپنے پورٹ فولیو کی کم از کم ایک تصویر ضرور اپ لوڈ کریں۔' : 'Please upload at least one gig display image.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        // Auto select first subcategory of newly selected category if mismatch
        const allowedSubs = CATEGORY_MAP[category] || [];
        if (!allowedSubs.includes(subCategory)) {
          setSubCategory(allowedSubs[0]);
        }
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    } else if (step === 4) {
      if (validateStep4()) setStep(5);
    } else if (step === 5) {
      if (validateStep5()) setStep(6);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((step - 1) as any);
    }
  };

  const handlePublishSubmit = () => {
    // Construct packages structure
    const packages: Packages = {
      basic: pkgBasic,
      standard: pkgStd,
      premium: pkgPrem,
    };

    // Combine tags, faqs, requirementsList, video, pdf, extraServices
    const gigData: Partial<Gig> = {
      title,
      category,
      subCategory,
      searchTags: tags,
      description,
      packages,
      requirements: requirementsList.map((r, i) => `${i + 1}. ${r.question} [Type: ${r.type}]`).join('\n'),
      requirementsList,
      faqs,
      images: images.filter(img => !!img),
      video,
      pdf,
      extraServices,
      status: 'Pending Approval', // Status requested in Change 2
    };

    onSubmit(gigData);
  };

  const categoryChange = (cat: string) => {
    setCategory(cat);
    const subCats = CATEGORY_MAP[cat] || [];
    setSubCategory(subCats[0] || '');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 my-8 text-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-5 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 font-heading">
            {isUrdu ? 'نیا گگ سروس تخلیق کریں' : 'Create a New Freelance Gig'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isUrdu 
              ? 'اپنے ہنر کو گگ میں تبدیل کر کے کمائی شروع کریں۔' 
              : 'Turn your specialized skills into a professional freelance gig service.'}
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isUrdu ? 'بند کریں' : 'Discard & Close'}
        </button>
      </div>

      {/* 6 Steps indicator bar */}
      <div className="mb-10">
        <div className="grid grid-cols-6 gap-2 text-center">
          {[
            { num: 1, label: isUrdu ? 'جائزہ' : 'Overview', icon: Globe },
            { num: 2, label: isUrdu ? 'قیمت' : 'Pricing', icon: Layers },
            { num: 3, label: isUrdu ? 'تفصیل' : 'Description', icon: FileText },
            { num: 4, label: isUrdu ? 'ضروریات' : 'Requirements', icon: CheckSquare },
            { num: 5, label: isUrdu ? 'گیلری' : 'Gallery', icon: ImageIcon },
            { num: 6, label: isUrdu ? 'پبلش' : 'Publish', icon: Check },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isPassed = step > s.num;
            return (
              <div key={s.num} className="flex flex-col items-center">
                <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-[#00B22D] text-white ring-4 ring-emerald-100 font-bold scale-105' 
                    : isPassed 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] md:text-[11px] font-semibold mt-1.5 hidden sm:block ${
                  isActive ? 'text-[#00B22D] font-bold' : isPassed ? 'text-emerald-600' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: OVERVIEW */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۱: بنیادی معلومات اور جائزہ' : 'Gig Step 1: Overview'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'اپنے کام کا ایک پرکشش عنوان منتخب کریں جس سے خریدار آسانی سے سمجھ جائیں۔' : 'Choose a catchy gig title and categories that best represent your digital services.'}</p>
          </div>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                {isUrdu ? 'گگ کا عنوان * (جیسے: I will design...)' : 'Gig Title *'}
              </label>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={2}
                maxLength={80}
                placeholder="e.g. I will design professional Urdu logo for your brand"
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D] font-semibold text-gray-800"
              />
              <p className="text-[10px] text-gray-400 text-right">{title.length}/80 characters. Start with "I will..."</p>
            </div>

            {/* Category & Sub Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  {isUrdu ? 'مین کیٹیگری *' : 'Main Category *'}
                </label>
                <select
                  value={category}
                  onChange={(e) => categoryChange(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 bg-white text-gray-700 focus:outline-none"
                >
                  {Object.keys(CATEGORY_MAP).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  {isUrdu ? 'ذیلی کیٹیگری (Sub-Category) *' : 'Sub-Category *'}
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 bg-white text-gray-700 focus:outline-none"
                >
                  {(CATEGORY_MAP[category] || []).map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Tags */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isUrdu ? 'سرچ ٹیگز / کی ورڈز (Search Tags - کم از کم ۱) *' : 'Search Tags (Keywords) *'}
              </label>
              <p className="text-[11px] text-gray-400">{isUrdu ? 'ان الفاظ کو درج کریں جن کے ذریعے خریدار آپ کے گگ کو تلاش کر سکیں۔' : 'Add relevant search tags so buyers can search and find your work.'}</p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder={isUrdu ? 'جیسے: logo, graphic, urdu' : 'e.g. logo, wordpress, copywriting'}
                  className="flex-1 text-xs border border-gray-200 bg-white rounded-lg p-2 focus:outline-none focus:border-[#00B22D]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-[#00B22D] text-white font-bold text-xs px-4 rounded-lg hover:bg-[#008000] transition-colors"
                >
                  {isUrdu ? 'شامل کریں' : 'Add Tag'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tg, index) => (
                  <span key={index} className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    #{tg}
                    <button type="button" onClick={() => handleRemoveTag(index)} className="hover:text-red-500 cursor-pointer font-bold text-xs">&times;</button>
                  </span>
                ))}
                {tags.length === 0 && (
                  <span className="text-gray-400 text-xs italic">{isUrdu ? 'کوئی ٹیگ شامل نہیں کیا گیا' : 'No tags added yet.'}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: PRICING PACKAGES */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۲: پیکج اور قیمتیں' : 'Gig Step 2: Pricing Packages'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'بنیادی، معیاری، اور پریمیم پیکجز مرتب کریں تا کہ خریدار اپنی پسند کے مطابق انتخاب کر سکیں۔' : 'Configure three detailed service tiers (Basic, Standard & Premium) to offer flexible pricing options.'}</p>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 border-r border-gray-200 w-1/4">Feature</th>
                  <th className="p-4 border-r border-gray-200 text-center text-[#00B22D] bg-emerald-50/20 w-1/4">Basic Package</th>
                  <th className="p-4 border-r border-gray-200 text-center text-blue-600 bg-blue-50/10 w-1/4">Standard Package</th>
                  <th className="p-4 text-center text-purple-600 bg-purple-50/10 w-1/4">Premium Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs">
                {/* Package Title */}
                <tr>
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-200">Package Title *</td>
                  <td className="p-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={pkgBasic.title}
                      onChange={(e) => setPkgBasic({ ...pkgBasic, title: e.target.value })}
                      className="w-full p-2 border border-gray-200 rounded focus:border-[#00B22D] font-bold text-center"
                    />
                  </td>
                  <td className="p-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={pkgStd.title}
                      onChange={(e) => setPkgStd({ ...pkgStd, title: e.target.value })}
                      className="w-full p-2 border border-gray-200 rounded focus:border-[#00B22D] font-bold text-center"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={pkgPrem.title}
                      onChange={(e) => setPkgPrem({ ...pkgPrem, title: e.target.value })}
                      className="w-full p-2 border border-gray-200 rounded focus:border-[#00B22D] font-bold text-center"
                    />
                  </td>
                </tr>

                {/* Description */}
                <tr>
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-200">Detailed Description *</td>
                  <td className="p-2 border-r border-gray-200">
                    <textarea
                      value={pkgBasic.description}
                      onChange={(e) => setPkgBasic({ ...pkgBasic, description: e.target.value })}
                      rows={3}
                      className="w-full p-2 border border-gray-200 rounded focus:border-[#00B22D] text-[11px]"
                    />
                  </td>
                  <td className="p-2 border-r border-gray-200">
                    <textarea
                      value={pkgStd.description}
                      onChange={(e) => setPkgStd({ ...pkgStd, description: e.target.value })}
                      rows={3}
                      className="w-full p-2 border border-gray-200 rounded focus:border-[#00B22D] text-[11px]"
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      value={pkgPrem.description}
                      onChange={(e) => setPkgPrem({ ...pkgPrem, description: e.target.value })}
                      rows={3}
                      className="w-full p-2 border border-gray-200 rounded focus:border-[#00B22D] text-[11px]"
                    />
                  </td>
                </tr>

                {/* Delivery Time */}
                <tr>
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-200">Delivery Time (Days) *</td>
                  <td className="p-2 border-r border-gray-200 text-center">
                    <select
                      value={pkgBasic.deliveryTime}
                      onChange={(e) => setPkgBasic({ ...pkgBasic, deliveryTime: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded bg-white"
                    >
                      {[1, 2, 3, 5, 7, 10, 14, 21, 30].map(d => (
                        <option key={d} value={d}>{d} {d === 1 ? 'day' : 'days'}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 border-r border-gray-200 text-center">
                    <select
                      value={pkgStd.deliveryTime}
                      onChange={(e) => setPkgStd({ ...pkgStd, deliveryTime: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded bg-white"
                    >
                      {[1, 2, 3, 5, 7, 10, 14, 21, 30].map(d => (
                        <option key={d} value={d}>{d} {d === 1 ? 'day' : 'days'}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      value={pkgPrem.deliveryTime}
                      onChange={(e) => setPkgPrem({ ...pkgPrem, deliveryTime: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded bg-white"
                    >
                      {[1, 2, 3, 5, 7, 10, 14, 21, 30].map(d => (
                        <option key={d} value={d}>{d} {d === 1 ? 'day' : 'days'}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                {/* Revisions */}
                <tr>
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-200">Number of Revisions *</td>
                  <td className="p-2 border-r border-gray-200 text-center">
                    <select
                      value={pkgBasic.revisions}
                      onChange={(e) => setPkgBasic({ ...pkgBasic, revisions: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded bg-white"
                    >
                      {[0, 1, 2, 3, 5, 10, 99].map(r => (
                        <option key={r} value={r}>{r === 99 ? 'Unlimited' : r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 border-r border-gray-200 text-center">
                    <select
                      value={pkgStd.revisions}
                      onChange={(e) => setPkgStd({ ...pkgStd, revisions: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded bg-white"
                    >
                      {[0, 1, 2, 3, 5, 10, 99].map(r => (
                        <option key={r} value={r}>{r === 99 ? 'Unlimited' : r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      value={pkgPrem.revisions}
                      onChange={(e) => setPkgPrem({ ...pkgPrem, revisions: Number(e.target.value) })}
                      className="w-full p-2 border border-gray-200 rounded bg-white"
                    >
                      {[0, 1, 2, 3, 5, 10, 99].map(r => (
                        <option key={r} value={r}>{r === 99 ? 'Unlimited' : r}</option>
                      ))}
                    </select>
                  </td>
                </tr>

                {/* Price */}
                <tr>
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-200">Price (PKR) *</td>
                  <td className="p-2 border-r border-gray-200">
                    <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-white">
                      <span className="text-gray-400 font-bold">Rs.</span>
                      <input
                        type="number"
                        min={500}
                        step={100}
                        value={pkgBasic.price}
                        onChange={(e) => setPkgBasic({ ...pkgBasic, price: Number(e.target.value) })}
                        className="w-full focus:outline-none font-bold text-emerald-600 text-center"
                      />
                    </div>
                  </td>
                  <td className="p-2 border-r border-gray-200">
                    <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-white">
                      <span className="text-gray-400 font-bold">Rs.</span>
                      <input
                        type="number"
                        min={500}
                        step={100}
                        value={pkgStd.price}
                        onChange={(e) => setPkgStd({ ...pkgStd, price: Number(e.target.value) })}
                        className="w-full focus:outline-none font-bold text-blue-600 text-center"
                      />
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-white">
                      <span className="text-gray-400 font-bold">Rs.</span>
                      <input
                        type="number"
                        min={500}
                        step={100}
                        value={pkgPrem.price}
                        onChange={(e) => setPkgPrem({ ...pkgPrem, price: Number(e.target.value) })}
                        className="w-full focus:outline-none font-bold text-purple-600 text-center"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Extra Services checklist */}
          <div className="bg-[#fcfdfd] border border-gray-200 rounded-xl p-5 space-y-4">
            <h4 className="font-bold text-xs uppercase text-gray-700 tracking-wider flex items-center gap-1">
              ➕ {isUrdu ? 'اضافی سروسز آفر کریں (Extra Services Checkboxes)' : 'Add Extra Services Add-ons'}
            </h4>
            <p className="text-[11px] text-gray-400">{isUrdu ? 'خریدار ان سہولیات کو اضافی قیمت دے کر اپنے آرڈر میں شامل کر سکتے ہیں۔' : 'Buyers can check these checkboxes to order extra deliverables for additional fees.'}</p>

            <div className="space-y-3">
              {extraServices.map((es, index) => (
                <div key={index} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3 hover:shadow-xs transition-shadow">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`extra-service-${index}`}
                      checked={es.enabled}
                      onChange={(e) => {
                        const updated = [...extraServices];
                        updated[index].enabled = e.target.checked;
                        setExtraServices(updated);
                      }}
                      className="w-4 h-4 text-[#00B22D] border-gray-300 rounded focus:ring-[#00B22D]"
                    />
                    <label htmlFor={`extra-service-${index}`} className="font-semibold text-gray-700 cursor-pointer">
                      {es.name}
                    </label>
                  </div>
                  <div className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg p-1.5 bg-gray-50">
                    <span className="text-gray-400 font-bold">Rs.</span>
                    <input
                      type="number"
                      value={es.price}
                      onChange={(e) => {
                        const updated = [...extraServices];
                        updated[index].price = Number(e.target.value);
                        setExtraServices(updated);
                      }}
                      className="w-16 focus:outline-none font-bold text-gray-700 text-right bg-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: DESCRIPTION & FAQ */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۳: تفصیل اور اکثر پوچھے جانے والے سوالات' : 'Gig Step 3: Description & FAQ'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'اپنے گگ کے بارے میں تفصیل سے لکھیں تا کہ خریداروں کے تمام شبہات دور ہو جائیں۔' : 'Describe your service clearly (min 120 characters) and answer potential buyer questions.'}</p>
          </div>

          <div className="space-y-5">
            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                {isUrdu ? 'تفصیلی بیان (Detailed Gig Description - کم از کم ۱۲۰ حروف) *' : 'Detailed Gig Description (Minimum 120 chars) *'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={7}
                placeholder={isUrdu ? 'یہاں اپنی سروس کے بارے میں تفصیل سے لکھیں کہ آپ کیا فراہم کریں گے...' : 'Explain your work workflow, the tools you use, the quality you promise, and what results the buyer can expect...'}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#00B22D] focus:ring-1 focus:ring-[#00B22D] text-gray-700"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>{description.length < 120 ? `${120 - description.length} characters remaining` : 'Minimum reached!'}</span>
                <span>{description.length} {isUrdu ? 'حروف' : 'characters'}</span>
              </div>
            </div>

            {/* FAQs list */}
            <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-100 space-y-4">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="w-4 h-4 text-[#00B22D]" />
                {isUrdu ? 'اکثر پوچھے جانے والے سوالات (FAQ Section)' : 'Frequently Asked Questions (FAQ)'}
              </span>
              <p className="text-[11px] text-gray-400">{isUrdu ? 'خریداروں کی مدد کے لیے چند بنیادی سوالات اور ان کے جوابات شامل کریں۔' : 'Provide clear answers to common questions about your freelance delivery.'}</p>

              <div className="bg-white border border-gray-200 rounded-lg p-3.5 space-y-3">
                <input
                  type="text"
                  value={faqQ}
                  onChange={(e) => setFaqQ(e.target.value)}
                  placeholder={isUrdu ? 'سوال (مثال: کیا آپ سورس فائل دیں گے؟)' : 'Question (e.g. Do you deliver source vector files?)'}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D]"
                />
                <textarea
                  value={faqA}
                  onChange={(e) => setFaqA(e.target.value)}
                  rows={2}
                  placeholder={isUrdu ? 'جواب (مثال: جی ہاں، پریمیم پیکج میں تمام سورس فائلیں شامل ہیں۔)' : 'Answer (e.g. Yes, standard and premium tiers include editable source files.)'}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D]"
                />
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="bg-[#00B22D] hover:bg-[#008000] text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1 transition-colors ml-auto"
                >
                  <ListPlus className="w-4 h-4" />
                  {isUrdu ? 'سوال شامل کریں' : 'Add FAQ Option'}
                </button>
              </div>

              {/* Added FAQs */}
              <div className="space-y-2 pt-2">
                {faqs.map((f, i) => (
                  <div key={i} className="flex items-start justify-between bg-white border border-gray-100 rounded-lg p-3 shadow-xs">
                    <div className="space-y-1 pr-4">
                      <p className="font-bold text-gray-800 text-xs">Q: {f.question}</p>
                      <p className="text-gray-500 text-[11px]">A: {f.answer}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveFaq(i)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {faqs.length === 0 && (
                  <p className="text-[11px] text-gray-400 italic">{isUrdu ? 'کوئی سوال شامل نہیں کیا گیا' : 'No FAQs added yet.'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: REQUIREMENTS */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۴: خریدار سے ضروریات' : 'Gig Step 4: Requirements'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'آرڈر شروع کرنے کے لیے آپ کو خریدار سے کیا چیزیں درکار ہوں گی؟' : 'Ask questions or request files/inputs that buyers must provide to start working on the order.'}</p>
          </div>

          <div className="space-y-5">
            <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-100 space-y-4">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                {isUrdu ? 'نیا سوال شامل کریں' : 'Add a New Buyer Requirement *'}
              </span>

              <div className="space-y-3 bg-white p-4 border border-gray-200 rounded-lg">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Requirement Question Text *</label>
                  <input
                    type="text"
                    value={reqQ}
                    onChange={(e) => setReqQ(e.target.value)}
                    placeholder={isUrdu ? 'مثال: برائے مہربانی اپنے لوگو کا نام اور پسندیدہ رنگ بتائیں۔' : 'e.g. Please share your brand color preferences and logo name.'}
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-[#00B22D]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Answer Input Type</label>
                    <select
                      value={reqType}
                      onChange={(e) => setReqType(e.target.value as any)}
                      className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white text-gray-700"
                    >
                      <option value="text">{isUrdu ? 'آزاد ٹیکسٹ (Free Text)' : 'Free Text'}</option>
                      <option value="multiple_choice">{isUrdu ? 'کثیر الانتخابی (Multiple Choice)' : 'Multiple Choice'}</option>
                      <option value="file">{isUrdu ? 'فائل اپلوڈ (File Attachment)' : 'File Attachment'}</option>
                    </select>
                  </div>

                  {/* Multiple Choice Options setup */}
                  {reqType === 'multiple_choice' && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">Add Options</label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={reqOptionText}
                          onChange={(e) => setReqOptionText(e.target.value)}
                          placeholder="Add choice option"
                          className="flex-1 text-xs border border-gray-200 rounded-lg p-1.5"
                        />
                        <button
                          type="button"
                          onClick={handleAddReqOption}
                          className="bg-emerald-600 text-white font-bold text-xs px-3 rounded hover:bg-emerald-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {reqOptions.map((opt, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded border">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddRequirement}
                  className="bg-[#00B22D] hover:bg-[#008000] text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1 ml-auto"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  {isUrdu ? 'ضرورت شامل کریں' : 'Add Requirement'}
                </button>
              </div>

              {/* Added Requirements list */}
              <div className="space-y-2 pt-2">
                {requirementsList.map((req, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3 shadow-xs text-xs">
                    <div className="space-y-1">
                      <p className="font-bold text-gray-800">{idx + 1}. {req.question}</p>
                      <p className="text-gray-400 text-[10px] uppercase font-semibold">
                        Type: {req.type} {req.options ? `[Options: ${req.options.join(', ')}]` : ''}
                      </p>
                    </div>
                    <button type="button" onClick={() => handleRemoveRequirement(idx)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {requirementsList.length === 0 && (
                  <p className="text-[11px] text-gray-400 italic">{isUrdu ? 'کوئی ضرورت شامل نہیں کی گئی' : 'No requirements added yet. Add at least one question.'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: GALLERY */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۵: پورٹ فولیو گیلری اور میڈیا' : 'Gig Step 5: Media Gallery'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'اپنی بہترین امیجز اپ لوڈ کریں۔ تجویز کردہ سائز: 712x430 پکسلز۔' : 'Upload up to 3 gorgeous display images, an optional promo video, or a work sample PDF.'}</p>
          </div>

          <div className="space-y-6">
            {/* Images grid */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#00B22D]" />
                {isUrdu ? 'گگ پورٹ فولیو تصاویر (کم از کم ۱، زیادہ سے زیادہ ۳) *' : 'Gig Portfolio Images (Min 1, Max 3) *'}
              </span>
              <p className="text-[11px] text-gray-400">Recommended Size: <span className="font-bold text-gray-600">712 x 430 pixels</span>. Supported formats: JPG, PNG.</p>

              <div className="grid sm:grid-cols-3 gap-4">
                {[0, 1, 2].map((idx) => {
                  const img = images[idx];
                  const isFirst = idx === 0;
                  return (
                    <div key={idx} className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-3 flex flex-col items-center justify-center text-center space-y-3 relative">
                      <span className="text-[11px] font-bold text-gray-500">
                        {isFirst ? (isUrdu ? 'مرکزی تصویر *' : 'Main Cover *') : (isUrdu ? `تصویر نمبر ${idx + 1}` : `Image ${idx + 1}`)}
                      </span>
                      
                      {img ? (
                        <div className="relative group w-full">
                          <img src={img} alt={`Gig portfolio ${idx}`} className="h-28 w-full object-cover rounded shadow-sm border" />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...images];
                              updated[idx] = '';
                              setImages(updated.filter(Boolean));
                            }}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow hover:scale-105 transition-transform"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-28 w-full bg-gray-50 border rounded-lg flex flex-col items-center justify-center text-gray-400 text-[10px] p-2">
                          712 x 430 Recommended
                        </div>
                      )}

                      <div className="flex flex-col gap-1 w-full">
                        <input
                          type="file"
                          accept="image/*"
                          id={`gig-image-input-${idx}`}
                          onChange={(e) => handleFileChange(e, idx)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`gig-image-input-${idx}`}
                          className="cursor-pointer text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 py-1.5 rounded text-center transition-colors block"
                        >
                          {isUrdu ? 'تصویر منتخب کریں' : 'Choose Image'}
                        </label>
                        <button
                          type="button"
                          onClick={() => setDemoImage(idx, idx === 0 
                            ? 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600'
                            : idx === 1 
                              ? 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600'
                              : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'
                          )}
                          className="text-[9px] text-[#00B22D] underline hover:text-[#008000]"
                        >
                          {isUrdu ? 'ڈیمو فائل' : 'Use Demo Pic'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Video & PDF Setup */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Video */}
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-3">
                <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <Video className="w-4 h-4 text-emerald-600" />
                  {isUrdu ? 'ویڈیو پورٹ فولیو (اختیاری)' : 'Gig Video Promo (Optional)'}
                </span>
                <p className="text-[10px] text-gray-400">Max size: 75MB. MP4 format recommended.</p>

                {video ? (
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 truncate">
                      ✓ Video Linked: {video}
                    </p>
                    <video src={video} className="w-full h-24 object-cover rounded border" controls />
                    <button type="button" onClick={() => setVideo('')} className="text-[10px] text-red-500 underline">Remove Video</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleDemoVideo}
                    className="w-full bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 py-2.5 rounded text-xs font-semibold transition-colors"
                  >
                    Use Demo Promo Video File
                  </button>
                )}
              </div>

              {/* PDF Document */}
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-3">
                <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-4 h-4 text-[#00B22D]" />
                  {isUrdu ? 'پورٹ فولیو پی ڈی ایف (اختیاری)' : 'Gig PDF Document (Optional)'}
                </span>
                <p className="text-[10px] text-gray-400">Provide document samples or resumes in PDF format.</p>

                {pdf ? (
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 truncate">
                      ✓ PDF Sample Linked: {pdf}
                    </p>
                    <button type="button" onClick={() => setPdf('')} className="text-[10px] text-red-500 underline">Remove PDF</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleDemoPdf}
                    className="w-full bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 py-2.5 rounded text-xs font-semibold transition-colors"
                  >
                    Use Demo PDF Sample Document
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: PUBLISH PREVIEW */}
      {step === 6 && (
        <div className="space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-800 font-heading">
              {isUrdu ? 'مرحلہ ۶: گگ کا جائزہ لیں اور پبلش کریں' : 'Gig Step 6: Preview & Publish'}
            </h3>
            <p className="text-xs text-gray-500">{isUrdu ? 'ایڈمن کو منظوری کے لیے جمع کرانے سے پہلے اپنی گگ سروس کا جائزہ لیں۔' : 'Preview your beautiful freelance gig before submitting it to SkillTH admins for approval.'}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Real Card Preview */}
            <div className="md:col-span-1 bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden h-fit">
              <div className="relative">
                <img 
                  src={images[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600'} 
                  alt="Gig cover" 
                  className="w-full h-40 object-cover"
                />
                <span className="absolute top-2 left-2 text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                  Pending Approval
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <img 
                    src={currentUser.profile?.profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                    alt="Seller avatar" 
                    className="w-6 h-6 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-bold text-xs text-gray-800 truncate">{currentUser.profile?.fullName || 'Seller name'}</p>
                    <p className="text-[9px] text-gray-400 capitalize">{category} • {subCategory}</p>
                  </div>
                </div>

                <p className="font-bold text-xs text-gray-800 line-clamp-2 h-8 leading-tight">{title || 'Your Gig Title Here'}</p>

                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 3).map((tg, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-500 text-[9px] px-1.5 py-0.5 rounded">#{tg}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t text-[10px]">
                  <span className="text-gray-400 font-medium">STARTING AT</span>
                  <span className="font-bold text-[#00B22D] text-sm">Rs. {pkgBasic.price}</span>
                </div>
              </div>
            </div>

            {/* Expanded Detailed Preview */}
            <div className="md:col-span-2 space-y-4 text-xs">
              <div className="bg-emerald-50/20 border border-emerald-100 rounded-xl p-4 space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#00B22D]">Overview Summary</span>
                <h4 className="text-sm font-bold text-gray-800 font-heading">{title}</h4>
                <p className="text-[11px] text-gray-500">
                  <span className="font-bold">Category:</span> {category} &gt; {subCategory}
                </p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 space-y-2 bg-white">
                <span className="text-[10px] uppercase font-bold text-gray-400">Gig Detailed Description</span>
                <p className="text-gray-600 leading-relaxed text-[11px] whitespace-pre-wrap">{description}</p>
              </div>

              {/* Package cards list */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Basic', pkg: pkgBasic, color: 'emerald' },
                  { name: 'Standard', pkg: pkgStd, color: 'blue' },
                  { name: 'Premium', pkg: pkgPrem, color: 'purple' },
                ].map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white space-y-1">
                    <span className="font-bold text-[10px] text-gray-400 uppercase">{item.name} Package</span>
                    <p className="font-bold text-gray-700 text-xs truncate">{item.pkg.title}</p>
                    <p className="text-gray-500 text-[10px] line-clamp-2 h-6 leading-tight">{item.pkg.description}</p>
                    <div className="flex justify-between items-center text-[9px] pt-1 border-t">
                      <span>{item.pkg.deliveryTime} days</span>
                      <span className="font-bold text-gray-800">Rs. {item.pkg.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra services */}
              {extraServices.some(es => es.enabled) && (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Add-on Extra Services Enabled</span>
                  <div className="flex flex-wrap gap-2">
                    {extraServices.filter(es => es.enabled).map((es, i) => (
                      <span key={i} className="bg-white border text-[10px] text-gray-700 px-2.5 py-1 rounded shadow-xs">
                        {es.name} (+ Rs. {es.price})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Summary */}
              {faqs.length > 0 && (
                <div className="border border-gray-100 rounded-lg p-3 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Added Frequently Asked Questions ({faqs.length})</span>
                  <div className="space-y-1">
                    {faqs.map((f, i) => (
                      <div key={i} className="text-[11px]">
                        <p className="font-bold text-gray-700">Q: {f.question}</p>
                        <p className="text-gray-500">A: {f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements Summary */}
              {requirementsList.length > 0 && (
                <div className="border border-gray-100 rounded-lg p-3 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Buyer Start Requirements ({requirementsList.length})</span>
                  <div className="space-y-1 text-[11px] text-gray-600">
                    {requirementsList.map((req, idx) => (
                      <div key={idx}>
                        • <span className="font-bold">{req.question}</span> ({req.type})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action container */}
          <div className="pt-6 border-t border-gray-100 text-center space-y-3 bg-emerald-50/10 p-5 rounded-2xl border border-emerald-100">
            <h4 className="text-base font-bold text-emerald-800 font-heading">
              {isUrdu ? 'سب کچھ ٹھیک ہے؟ اب پبلش کریں!' : 'Ready to Publish?'}
            </h4>
            <p className="text-xs text-gray-500 max-w-lg mx-auto">
              {isUrdu 
                ? 'پبلش کے بٹن پر کلک کرنے کے بعد آپ کا گگ ایڈمن پینل میں منظوری کے لیے جائے گا۔ منظوری ملتے ہی یہ خریداروں کو لائیو نظر آئے گا۔' 
                : 'Clicking submit submits your gig to our SkillTH admins. Your status will show as Pending Approval, and you will be notified immediately upon approval!'}
            </p>
            <button
              type="button"
              onClick={handlePublishSubmit}
              className="bg-[#00B22D] hover:bg-[#008000] text-white font-bold px-8 py-3.5 rounded-xl text-xs shadow hover:shadow-md transition-all inline-flex items-center gap-2 transform hover:scale-103"
            >
              {isUrdu ? 'ایڈمن کی منظوری کے لیے جمع کرائیں' : 'Submit for Admin Approval'}
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      {step < 6 && (
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

// Simple helper component to match Lucide interface
const PlusIcon: React.FC<any> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
