import Head from 'next/head';
import {
  FaClock,
  FaTags,
  FaCrown,
  FaHome,
  FaQuestionCircle,
  FaPhone,
  FaGavel,
  FaInfoCircle,
  FaBookOpen,
  FaMapSigns
} from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

import dayjs from 'dayjs';
import jalali from 'dayjs-jalali';
dayjs.extend(jalali);

const futureProducts = [
  {
    id: 1,
    title: 'PS5',
    price: 40000000,
    image: '/images/product1.jpg',
    startsAt: '2025-06-15T14:00:00',
  },
  {
    id: 2,
    title: 'اسکوتر برقی',
    price: 18500000,
    image: '/images/product2.jpg',
    startsAt: '2025-06-18T15:00:00',
  },
  {
    id: 3,
    title: 'اسپیکر',
    price: 9700000,
    image: '/images/product3.jpg',
    startsAt: '2025-06-21T16:00:00',
  },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false); // ✅ برای جلوگیری از hydration error

  useEffect(() => {
    setIsClient(true);
  }, []);

  const timeTotal = 1800; // زمان نوار زرد بالا
  const auctionTotalTime = 600; // مدت‌زمان کل حراجی فعال (قابل تغییر)

  const [timeLeft, setTimeLeft] = useState(timeTotal); // تایمر نوار زرد بالا
  const [auctionTimeLeft, setAuctionTimeLeft] = useState(auctionTotalTime); // تایمر حراجی فعال
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // اسلایدر
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // تایمر نوار زرد بالا
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // تایمر حراجی فعال
  useEffect(() => {
    const auctionTimer = setInterval(() => {
      setAuctionTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(auctionTimer);
  }, []);

  // درصد پیشرفت روان (واقعی و دقیق)
  const progressPercent = (1 - auctionTimeLeft / auctionTotalTime) * 100;

  // تبدیل به hh:mm:ss
  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // تبدیل تایمر حراجی به hh:mm:ss
  const formatAuctionTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <>
      <Head>
        <title>Pricano - حراج معکوس</title>
      </Head> 

      {/* 🔶 نوار زرد رنگ بالا */}
<div className="bg-yellow-400 py-2 px-4 flex flex-col md:flex-row-reverse items-center justify-between gap-4 md:gap-0 overflow-hidden relative">

  {/* ✅ تایمر و دکمه - ترتیب بدون تغییر */}
  <div className="flex items-center gap-2 ml-4">
    <div className="blink-animation">
      <button className="bg-black text-yellow-400 px-3 py-1 rounded-lg font-semibold text-sm h-9 whitespace-nowrap">
        فرصت طلایی ثبت‌نام رایگان
      </button>
    </div>
    <div className="bg-black text-white px-4 py-1 rounded-lg font-bold text-sm text-center w-28 h-9 flex items-center justify-center">
      <span id="timer">{formatTime(timeLeft)}</span>
    </div>
  </div>

  {/* ✅ متن‌های متحرک - فقط ریسپانسیو */}
  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 items-center text-sm font-medium text-black text-center sm:text-right">
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-4 mb-4">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className={`relative h-32 rounded-xl shadow-md flex items-center justify-center text-lg font-bold text-gray-800 border-2 animate-border-glow`}
            style={{ backgroundColor: ['#FFF8DC', '#E0F7FA', '#FFF0F5'][index] }}
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
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaMapSigns />راهنما</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaBookOpen />قوانین</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaGavel />حراجی فعال</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaQuestionCircle />سوالات متداول</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaInfoCircle />درباره ما</a>
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition"><FaPhone />تماس با ما</a>
          </nav>

          {/* موبایل */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700">&#9776;</button>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl text-sm">
            ورود / ثبت‌نام
          </button>
        </div>

        {/* منوی موبایل */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t text-sm font-medium text-right px-4 pb-4 space-y-2">
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaHome />خانه</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaMapSigns />راهنما</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaBookOpen />قوانین</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaGavel />حراجی فعال</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaQuestionCircle />سوالات متداول</a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500"><FaInfoCircle />درباره ما</a>
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
          <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition">
            همین حالا شرکت کن
          </button>
        </div>
      </section>

      {/* 💥 حراجی فعال خفن */}
      <section className="relative bg-white py-16 px-6 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-100 to-purple-200 opacity-40 blur-2xl z-0" />
  <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 border-4 border-pink-400 border-dashed rounded-3xl p-8 shadow-xl animate-border-glow">
    
    {/* 🖼 تصویر محصول */}
    <div className="md:w-1/2 w-full flex justify-center">
      <div className="relative">
        <img
          src="/images/iphone16.jpg"
          alt="iPhone 16 Pro Max"
          className="w-[320px] h-[220px] object-cover rounded-2xl shadow-2xl border-4 border-white"
        />
        <span className="absolute top-[-10px] left-[-10px] bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md animate-pulse">
          جدید
        </span>
      </div>
    </div>

    {/* 📊 اطلاعات */}
    <div className="md:w-1/2 w-full text-center md:text-right space-y-6">
      <h2 className="text-4xl font-extrabold text-pink-600 drop-shadow-lg flex items-center justify-center md:justify-start gap-2">
        <FaGavel className="text-purple-600 scale-x-[-1]" /> حراجی فعال
      </h2>

      <p className="text-2xl font-bold text-gray-800">آیفون ۱۶ پرو مکس</p>

      <div className="grid grid-cols-2 gap-4 justify-center md:justify-start">
        <div className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-lg border">
          <p className="text-sm text-gray-500">شرکت‌کننده‌ها</p>
          <p className="text-2xl font-bold text-green-600">۱۲۷ نفر</p>
        </div>
        <div className="bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-lg border">
          <p className="text-sm text-gray-500">زمان باقیمانده تا شروع حراجی</p>
          <p className="text-2xl font-bold text-red-500">{formatAuctionTime(auctionTimeLeft)}</p>
        </div>
      </div>

      {/* 🔄 نوار پیشرفت زنده */}
      <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
  <motion.div
    className="bg-gradient-to-r from-red-500 to-yellow-400 h-full"
    animate={{ width: `${progressPercent}%` }}
    transition={{ duration: 1, ease: "linear" }}
    initial={false}
  />
</div>

      <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition text-white font-extrabold px-8 py-4 rounded-full shadow-lg text-lg flex items-center justify-center gap-2 mt-4">
        <span className="animate-ping">🔥</span> ورود به حراجی
      </button>
    </div>
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
      <section className="w-full bg-gradient-to-r from-yellow-200 via-pink-100 to-purple-100 py-10 px-4">
  <div className="max-w-4xl mx-auto text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex justify-center items-center gap-2">
      <span>💡</span> حراج بعدی چی باشه؟
    </h2>
    <p className="text-gray-700 text-base md:text-lg">
      نظر بده تا شاید محصول پیشنهادی تو بره تو حراجی بعدی!
    </p>

    {/* 🔄 ورودی + دکمه داخل کادر */}
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        placeholder="مثلاً PS5 یا ساعت هوشمند..."
        className="w-full py-4 pr-4 pl-32 rounded-full border-2 border-gray-300 shadow focus:outline-none focus:border-pink-400 transition text-right"
      />
      <button
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-full shadow transition"
      >
        ارسال
      </button>
    </div>
  </div>
</section>

      {/* حراجی های آینده */}
      <section className="max-w-7xl mx-auto py-16 px-4">
  <h2 className="text-3xl font-bold text-center mb-10">حراجی‌های آینده</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {futureProducts.map((product) => {
      const [timeLeft, setTimeLeft] = useState(() =>
        Math.max(
          0,
          Math.floor(
            (new Date(product.startsAt).getTime() - new Date().getTime()) / 1000
          )
        )
      );

      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
      }, [product.startsAt]);

      const formatTime = (seconds: number) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
      };

      return (
  <div
    key={product.id}
    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
  >
    <div className="w-full aspect-[3/2] overflow-hidden rounded-t-2xl bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-5 space-y-2 text-center">
      <h3 className="text-xl font-semibold">{product.title}</h3>
      <p className="text-gray-600">
              قیمت فعلی:{' '}
              <span className="text-green-600 font-bold">
                {product.price.toLocaleString()} تومان
              </span>
            </p>
            <p className="text-sm text-gray-600">
              شروع:{' '}
              {dayjs(product.startsAt)
                .locale('fa')
                .format('dddd D MMMM YYYY - ساعت HH:mm')}
            </p>
            <p className="text-red-600 font-bold text-lg">
              زمان باقی‌مانده:{' '}
              {isClient ? formatTime(timeLeft) : '...'}
            </p>
            <button className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-xl w-full">
              ثبت‌نام در حراجی
            </button>
          </div>
        </div>
      );
    })}
  </div>
</section>

      {/* سوالات پرتکرار */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">سئوالات پرتکرار</h2>
        <div className="max-w-3xl mx-auto text-right space-y-4">
          <details className="bg-gray-100 rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">آیا واقعاً قیمت محصولات کم میشه؟</summary>
            <p className="mt-2 text-gray-700">
              بله، با هر کلیک از سمت کاربر، مبلغ مشخصی از قیمت کم میشه تا یکی خرید نهایی کنه.
            </p>
          </details>
          <details className="bg-gray-100 rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">چطور در حراجی شرکت کنم؟</summary>
            <p className="mt-2 text-gray-700">
              کافیه ثبت‌نام کنی، و بسته کلیک بخری. بعدش فقط با یه دکمه وارد حراجی شو.
            </p>
          </details>
          <details className="bg-gray-100 rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">آیا ارسال رایگانه؟</summary>
            <p className="mt-2 text-gray-700">
              بله! برای همه‌ی برنده‌ها، ارسال کاملاً رایگانه.
            </p>
          </details>
        </div>
      </section>

      {/* فوتر */}
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6 mt-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* لوگو و توضیح */}
    <div>
      <img src="/images/logo.png" alt="Pricano Logo" className="w-28 mb-4" />
      <p className="text-sm leading-6">
        پرایکانو، تجربه‌ای متفاوت از حراجی با قیمت‌های کاهشی و رقابتی.  
        جایی برای برنده شدن واقعی!
      </p>
    </div>

    {/* لینک‌های مفید */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">لینک‌های مفید</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-white">سؤالات متداول</a></li>
        <li><a href="#" className="hover:text-white">قوانین و مقررات</a></li>
        <li><a href="#" className="hover:text-white">راهنمای شرکت در حراجی</a></li>
      </ul>
    </div>

    {/* شبکه‌های اجتماعی */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between items-center gap-4 mt-4 w-full">
  <h3 className="text-lg font-semibold mb-3 text-white">ما را دنبال کنید</h3>
  <div className="flex items-center gap-5">
    <a href="#">
      <img src="/icons/instagram.png" alt="Instagram" className="w-8 h-8 hover:scale-110 transition-transform" />
    </a>
    <a href="#">
      <img src="/icons/telegram.png" alt="Telegram" className="w-8 h-8 hover:scale-110 transition-transform" />
    </a>
    <a href="#">
      <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-8 h-8 hover:scale-110 transition-transform" />
    </a>
  </div>
</div>
  </div>

  {/* کپی‌رایت */}
  <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
    © 2025 Pricano. همه حقوق محفوظ است.
  </div>
</footer>
    </>
  );
}
