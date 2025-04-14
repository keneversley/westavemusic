import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowContent(true), 1000);
    }, 4000); // 4 sec for typing
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/clip.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full py-6 px-4 text-center">
        {/* Top: Marquee */}
        {showContent && (
          <div className="overflow-hidden whitespace-nowrap mt-24  md:mt-20">
            <p className="animate-marquee text-sm text-white font-semibold uppercase tracking-widest">
              New York / Los Angeles / Chicago / Houston / Phoenix /
              Philadelphia / San Antonio / San Diego / Dallas / San Jose /
              Austin / Jacksonville / Fort Worth / Columbus / Charlotte / San
              Francisco / Indianapolis / Seattle / Denver / Washington D.C. /
              Boston / Nashville / Detroit / Memphis / Portland / Oklahoma City
              / Las Vegas / Louisville / Baltimore / Milwaukee / Albuquerque /
              Tucson / Fresno / Sacramento / Kansas City / Atlanta / Miami
            </p>
          </div>
        )}

        {/* Middle: Downtown Typing Animation */}
        <div className="flex-grow flex items-center justify-center mx-auto">
          <h1
            className={`text-5xl md:text-[160px]  font-extrabold uppercase ${
              loading ? "typing-animation" : ""
            }`}
          >
            Downtown
          </h1>
        </div>

        {/* Bottom: Paragraph Grid */}
        {showContent && (
          <div className="grid  md:grid-cols-3 gap-6 text-sm md:text-lg  mx-auto pb-6 text-white">
            <p className="text-start">
              At Downtown Talent, we partner with leading corporations,
              hospitality groups, and private clients to deliver world-class
              artists for branded partnerships, activations, and events. Our
              boutique talent roster includes some of the most reliable and
              experienced professionals in the entertainment industry,
              consisting of professional actors, photographers, influencers, and
              DJs.
            </p>
            <p className="text-start">
              We take pride in crafting top-quality, tailored musical
              experiences for every venue, event, and client we collaborate
              with. Since our inception in New York City in 2017, our artists
              have graced over 4000 events worldwide, ranging from exclusive
              nightclubs and private gatherings to high-profile corporate
              functions, fashion shows, and bespoke weddings.
            </p>
            <p className="text-start">
              Expanding our footprint into flagship markets including Los
              Angeles, Miami, Chicago, Atlanta, and Dallas, we continue to
              deliver unparalleled service to a diverse clientele. At Downtown
              Talent, we're all about creating moments that last a lifetime.
              Your satisfaction is our success, making every occasion uniquely
              special and unforgettable.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
