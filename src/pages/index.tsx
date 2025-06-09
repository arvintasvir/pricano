import Head from 'next/head';
import { FaClock, FaTags, FaCrown, FaHome, FaQuestionCircle, FaPhone, FaGavel, FaInfoCircle, FaBookOpen } from 'react-icons/fa';
import { useEffect, useState, useState as useToggle } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 دقیقه
  const [menuOpen, setMenuOpen] = useState(false); // برای موبایل
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  }, 5000); // هر ۵ ثانیه اسلاید بعدی
  return () => clearInterval(interval);
  }, []);
  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Pricano - حراج معکوس</title>
      </Head>

      {/* 🔶 نوار زرد رنگ بالا */}
      <div className="bg-yellow-400 py-2 px-4 flex flex-row-reverse items-center justify-between overflow-hidden relative">
        <div className="flex items-center gap-2 ml-4">
          <div className="blink-animation">
            <button className="bg-black text-yellow-400 px-3 py-1 rounded-lg font-semibold text-sm h-9">
              فرصت طلایی ثبت‌نام رایگان
            </button>
          </div>
          <div className="bg-black text-white px-4 py-1 rounded-lg font-bold text-sm text-center w-28 h-9 flex items-center justify-center">
            <span id="timer">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="flex gap-6 items-center text-sm font-medium text-black">
          <div className="flex gap-1 items-center">
            <span className="text-red-600 animate-ping">📢</span> هر کلیک ، یک قدم تا برنده شدن!
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-green-600 animate-ping">💸</span> اونی برنده میشه که هوشمندانه کلیک کنه!
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-blue-600 animate-ping">🎁</span> زمان حراجی محدوده ، جا نمونی!
          </div>
        </div>
      </div>

      {/* 🔳 بنرهای تبلیغاتی زیر نوار زرد رنگ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-4">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className={`relative h-32 rounded-xl shadow-md flex items-center justify-center text-lg font-bold text-gray-800 border-2 animate-border-glow`}
            style={{
              backgroundColor: ['#FFF8DC', '#E0F7FA', '#FFF0F5'][index],
            }}
          >
            جای تبلیغات شما اینجاست
          </div>
        ))}
      </section>

      {/* هدر */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="w-36">
            <img src="/images/pricano-logo.png" alt="Pricano Logo" className="w-full h-auto" />
          </div>

          {/* دسکتاپ */}
          <nav className="hidden md:flex rtl:space-x-reverse space-x-6 text-sm items-center font-medium">
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaHome />خانه</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaGavel />حراجی فعال</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaInfoCircle />درباره ما</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaBookOpen />قوانین</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaQuestionCircle />سوالات متداول</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaPhone />تماس با ما</a>
          </nav>

          {/* موبایل */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700">&#9776;</button>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl text-sm">ورود / ثبت‌نام</button>
        </div>

        {/* منوی موبایل */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t text-sm font-medium text-right px-4 pb-4 space-y-2">
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaHome />خانه</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaGavel />حراجی فعال</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaInfoCircle />درباره ما</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaBookOpen />قوانین</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaQuestionCircle />سوالات متداول</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaPhone />تماس با ما</a>
          </div>
        )}
      </header>

      {/* 🔄 اسلایدر با متن و دکمه ثابت */}
<section className="relative w-full h-[500px] overflow-hidden">
  {/* تصاویر اسلایدر */}
  <div className="absolute inset-0 z-0 animate-fade-slider">
    {[1, 2, 3, 4].map((n, index) => (
      <img
        key={index}
        src={`/images/slides/slide${n}.jpg`}
        alt={`Slide ${n}`}
        className={`absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-in-out slide slide-${index}`}
      />
    ))}
  </div>

  {/* محتوای ثابت روی اسلایدر */}
  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-white px-4 bg-black/30">
    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">حراج معکوس واقعی شروع شد!</h1>
    <p className="text-xl mb-6 w-full text-center whitespace-normal leading-relaxed">
  در پریکانو ، با هر کلیک قیمت محصول کاهش پیدا می‌کنه... فقط یک نفر <strong>برنده‌ست!</strong>
</p>
    <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition">همین حالا شرکت کن</button>
  </div>
</section>

      {/* مزایا */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">چرا Pricano؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <FaClock size={48} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">حراجی زمان‌دار</h3>
            <p className="text-gray-600">زمان محدود برای تصمیم‌گیری سریع و هیجان‌انگیز</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTags size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">قیمت رو خودت کم کن</h3>
            <p className="text-gray-600">با هر کلیک، قیمت کمتر میشه</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCrown size={48} className="text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">برنده واقعی</h3>
            <p className="text-gray-600">فقط یک نفر محصول رو با قیمت پایین می‌بره</p>
          </div>
        </div>
      </section>

      {/* پیشنهاد حراج بعدی */}
      <section className="bg-yellow-100 p-6 my-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">حراج بعدی چی باشه؟</h2>
        <p className="mb-2">نظر بده تا شاید محصول پیشنهادی تو بره توی حراجی بعدی!</p>
        <input 
          type="text" 
          placeholder="اینجا تایپ کن..." 
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded shadow"
        />
      </section>

      {/* محصولات */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">محصولات ویژه امروز</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden">
              <img src="https://via.placeholder.com/400x250" alt="product" className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">محصول تستی #{item}</h3>
                <p className="text-gray-600 mb-3">قیمت فعلی: <span className="text-green-600 font-bold">۱۹۰,۰۰۰ تومان</span></p>
                <button className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-xl w-full">کمش کن</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* سوالات پرتکرار */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">سوالات پرتکرار</h2>
        <div className="max-w-3xl mx-auto text-right space-y-4">
          <details className="bg-gray-100 rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">آیا واقعاً قیمت محصولات کم میشه؟</summary>
            <p className="mt-2 text-gray-700">بله، با هر کلیک از سمت کاربر، مبلغ مشخصی از قیمت کم میشه تا یکی خرید نهایی کنه.</p>
          </details>
          <details className="bg-gray-100 rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">چطور در حراجی شرکت کنم؟</summary>
            <p className="mt-2 text-gray-700">کافیه ثبت‌نام کنی، و بسته کلیک بخری. بعدش فقط با یه دکمه وارد حراجی شو.</p>
          </details>
          <details className="bg-gray-100 rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">آیا ارسال رایگانه؟</summary>
            <p className="mt-2 text-gray-700">بله! برای همه‌ی برنده‌ها، ارسال کاملاً رایگانه.</p>
          </details>
        </div>
      </section>

      {/* فوتر */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">تمامی حقوق محفوظ است © Pricano 2025</p>
          <div className="flex gap-x-6 mt-4 md:mt-0 rtl:flex-row-reverse">
            <a href="#" className="hover:text-blue-400">تلگرام</a>
            <a href="#" className="hover:text-pink-400">اینستاگرام</a>
            <a href="#" className="hover:text-green-400">واتساپ</a>
          </div>
        </div>
      </footer>
    </>
  );
}