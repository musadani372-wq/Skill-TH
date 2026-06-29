import React from 'react';

interface PolicyProps {
  isUrdu: boolean;
  onClose: () => void;
}

export const PolicyPages: React.FC<PolicyProps> = ({ isUrdu, onClose }) => {
  return (
    <div className="bg-white rounded-xl border border-[#e4e5e7] p-8 max-w-4xl mx-auto shadow-sm my-6">
      <div className="flex justify-between items-center border-b border-[#e4e5e7] pb-4 mb-6">
        <h2 className="text-2xl font-black text-[#1dbf73]">
          {isUrdu ? 'پالیسی دستاویزات (Policies)' : 'SkillTH Policies'}
        </h2>
        <button
          onClick={onClose}
          className="text-sm font-semibold px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
        >
          {isUrdu ? 'بند کریں' : 'Close'}
        </button>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        {/* How It Works Section */}
        <section className="border-b border-gray-100 pb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#1dbf73] inline-block rounded-full"></span>
            {isUrdu ? 'یہ کیسے کام کرتا ہے (How It Works)' : 'How It Works'}
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-[#f1fbf6] rounded-lg">
              <span className="font-bold text-[#1dbf73] text-lg">1.</span>
              <p className="font-bold mt-1">{isUrdu ? 'سائن ان اور پروفائل' : 'Sign In & Select Role'}</p>
              <p className="text-xs text-gray-500 mt-1">
                {isUrdu
                  ? 'اپنے جی میل سے سائن ان کریں اور بطور خریدار یا سیلر شمولیت اختیار کریں۔'
                  : 'Log in securely with Gmail and choose whether you want to Buy or Sell.'}
              </p>
            </div>
            <div className="p-4 bg-[#f1fbf6] rounded-lg">
              <span className="font-bold text-[#1dbf73] text-lg">2.</span>
              <p className="font-bold mt-1">{isUrdu ? 'گگ بنائیں یا تلاش کریں' : 'Create or Browse Gigs'}</p>
              <p className="text-xs text-gray-500 mt-1">
                {isUrdu
                  ? 'سیلرز اپنی سروسز کے گگ بناتے ہیں۔ ایڈمن کی منظوری کے بعد وہ لائیو ہو جاتے ہیں۔'
                  : 'Sellers build customized Gigs with three tiers. Admin approves before going live.'}
              </p>
            </div>
            <div className="p-4 bg-[#f1fbf6] rounded-lg">
              <span className="font-bold text-[#1dbf73] text-lg">3.</span>
              <p className="font-bold mt-1">{isUrdu ? 'آرڈر اور ادائیگی' : 'Order & Get Paid'}</p>
              <p className="text-xs text-gray-500 mt-1">
                {isUrdu
                  ? 'جاز کیش، ایزی پیسہ یا بینک ٹرانسفر سے ادائیگی کریں۔ 10% پلیٹ فارم کمیشن کٹوتی ہوتی ہے۔'
                  : 'Place orders with EasyPaisa, JazzCash or Bank. Sellers receive 90% and platform keeps 10%.'}
              </p>
            </div>
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="border-b border-gray-100 pb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#1dbf73] inline-block rounded-full"></span>
            {isUrdu ? 'شرائط و ضوابط (Terms & Conditions)' : 'Terms & Conditions'}
          </h3>
          <p>
            {isUrdu
              ? 'SkillTH پاکستان کا نمبر 1 محفوظ فری لانسنگ پلیٹ فارم ہے۔ تمام صارفین کو قوانین پر عمل کرنا ہوگا۔'
              : 'SkillTH provides a trusted marketplace for Pakistani freelancers. By using our platform, you agree to comply with our Terms of Service.'}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li>{isUrdu ? 'تمام سیلرز کے لیے قومی شناختی کارڈ (CNIC) لازمی ہے۔' : 'Sellers must provide true and verified CNIC identity numbers.'}</li>
            <li>{isUrdu ? 'پلیٹ فارم کے باہر لین دین کرنے کی سخت ممانعت ہے۔' : 'Direct deals or communicating personal payment methods outside of SkillTH is strictly forbidden.'}</li>
            <li>{isUrdu ? 'ہر آرڈر پر خودکار طور پر 10 فیصد فیس وصول کی جائے گی۔' : 'A standard 10% platform commission is automatically deducted from every successfully completed order.'}</li>
          </ul>
        </section>

        {/* Privacy Policy */}
        <section className="border-b border-gray-100 pb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#1dbf73] inline-block rounded-full"></span>
            {isUrdu ? 'رازداری کی پالیسی (Privacy Policy)' : 'Privacy Policy'}
          </h3>
          <p>
            {isUrdu
              ? 'ہم آپ کی ذاتی معلومات جیسے شناختی کارڈ، فون نمبر، اور بینک اکاؤنٹ کی تفصیلات کو مکمل محفوظ رکھتے ہیں۔'
              : 'Your privacy is paramount. We securely encrypt your personal documents including CNIC uploads, contact phone numbers, and payment details.'}
          </p>
          <p className="mt-2 text-xs">
            {isUrdu
              ? 'یہ معلومات صرف اور صرف تصدیق اور رقم کی واپسی کی ادائیگیوں کے لیے استعمال ہوتی ہیں۔'
              : 'These files are only used for user authentication and processing secure local financial transactions (JazzCash/EasyPaisa).'}
          </p>
        </section>

        {/* Refund Policy */}
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#1dbf73] inline-block rounded-full"></span>
            {isUrdu ? 'ریفنڈ پالیسی (Refund Policy)' : 'Refund Policy'}
          </h3>
          <p>
            {isUrdu
              ? 'اگر سیلر وقت پر آرڈر ڈیلیور نہیں کرتا یا کام غیر تسلی بخش ہے، تو خریدار ریفنڈ کا دعویٰ کر سکتا ہے۔'
              : 'If a seller fails to deliver within the specified delivery days or fails to satisfy requirements, the buyer can dispute or request a cancellation.'}
          </p>
          <p className="mt-2 text-xs">
            {isUrdu
              ? 'ریفنڈ شدہ رقم براہ راست خریدار کے ایزی پیسہ یا جاز کیش اکاؤنٹ میں 24 گھنٹے کے اندر منتقل کر دی جائے گی۔'
              : 'Refunded amounts are sent back directly to the buyer’s specified EasyPaisa, JazzCash, or Bank Transfer account within 24 hours of admin review.'}
          </p>
        </section>
      </div>
    </div>
  );
};
