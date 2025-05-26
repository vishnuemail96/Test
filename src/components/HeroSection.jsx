import { useEffect, useState } from "react";
import React from "react";


const courses = [
  {
    title: "Full-Stack Development",
    slogan: "One course, total web expertise.",
    image: "/3.png",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    slogan: "Transform Lives with AI course",
    image: "/2.png",
  },
  {
    title: "Cloud Computing Courses",
    slogan: "Get certified. Build real-world skills.",
    image: "/1.png",
  },
];

const TypingHeroSection = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [sloganVisible, setSloganVisible] = useState(true);

  useEffect(() => {
    const current = courses[index].title;
    let typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setSloganVisible(false); // fade out
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % courses.length);
          setSloganVisible(true); // fade in
        }, 300);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  const { slogan, image } = courses[index];

  return (
    <section className="bg-gray-200 py-20">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E3A8A] h-24">
            {displayText}
            <span className="text-[#1E3A8A]">|</span>
          </h1>

          <p
            className={`mt-2 text-gray-600 text-lg h-8 transition-opacity duration-500 ${
              sloganVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {slogan}
          </p>

          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <button className="border border-[#1E3A8A] text-[#1E3A8A] px-6 py-2 rounded-full hover:bg-[#1E3A8A] hover:text-white transition">
              Learn
            </button>
            <button className="border border-[#1E3A8A] text-[#1E3A8A] px-6 py-2 rounded-full hover:bg-[#1E3A8A] hover:text-white transition">
              Deploy
            </button>
            <button className="border border-[#1E3A8A] text-[#1E3A8A] px-6 py-2 rounded-full hover:bg-[#1E3A8A] hover:text-white transition">
              Succeed
            </button>
          </div>

          <div className="mt-8">
            <a
              href="/register"
              className="inline-block px-8 py-3 bg-[#1E3A8A] text-white rounded-full text-lg hover:bg-blue-900 transition"
            >
              Register Now →
            </a>
          </div>
        </div>

        <div className="flex-1 bg-gray-200 rounded-lg shadow-[6px_6px_10px_rgba(0,0,0,0.15)] overflow-hidden">
          <img
            src={image}
            alt="Course Illustration"
            className="w-full max-w-md mx-auto transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default TypingHeroSection;
