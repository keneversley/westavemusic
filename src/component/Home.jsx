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
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/1min.mp4" type="video/mp4" />
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full py-6 px-4 text-center">
        {/* Top: Marquee */}
        {showContent && (
          <div className="overflow-hidden whitespace-nowrap mt-24  md:mt-20">
            <p className="animate-marquee text-sm text-white font-semibold uppercase tracking-widest">
              Miami /New York / Los Angeles / Chicago / Houston / Phoenix /
              Philadelphia / San Antonio / San Diego / Dallas / San Jose /
              Austin / Jacksonville / Fort Worth / Columbus / Charlotte / San
              Francisco / Indianapolis / Seattle / Denver / Washington D.C. /
              Boston / Nashville / Detroit / Memphis / Portland / Oklahoma City
              / Las Vegas / Louisville / Baltimore / Milwaukee / Albuquerque /
              Tucson / Fresno / Sacramento / Kansas City / Atlanta / Miami
            </p>
          </div>
        )}

        {/* Middle: West Avenue Music Typing Animation */}
        <div className="flex-grow flex items-center justify-center mx-auto">
          <h1
            className={`text-5xl md:text-[80px]  font-extrabold uppercase ${
              loading ? "typing-animation" : ""
            }`}
          >
            WEST AVENUE MUSIC
          </h1>
        </div>

        {/* Bottom: Paragraph Grid */}
        {showContent && (
          <div className="grid  md:grid-cols-3 gap-6 text-sm md:text-lg  mx-auto pb-6 text-white">
            <p className="text-start">
            At WEST AVE MUSIC, we work with top corporations, hospitality groups, and private clients to provide world-class talent for events, activations, and brand partnerships. Our curated roster features trusted professionals—actors, photographers, influencers, and DJs—known for delivering exceptional experiences.
            </p>
            <p className="text-start">
            Since launching in Miami in 2020, we've specialized in delivering high-quality, customized musical experiences for venues, events, and clients around the world. Our artists have performed at over 4,000 events, from private parties and luxury weddings to top-tier corporate functions and fashion shows.
            </p>
            <p className="text-start">
            As we expand into key markets including Los Angeles, Miami, Chicago, Atlanta, Dallas, Charlotte, Las Vegas, San Francisco, and Toronto, WEST AVE MUSIC remains committed to delivering exceptional service to a wide range of clients. Our mission is to create unforgettable moments that leave a lasting impression—because your experience is our top priority
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
