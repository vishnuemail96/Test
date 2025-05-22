const features = [
  {
    title: "Interactive Lessons",
    description:
      "Engaging video and quiz content to keep you actively learning.",
    image: "/thumbnails/interactive-lessons.jpg",
  },
  {
    title: "Progress Tracking",
    description: "Track your learning journey and achievements in real-time.",
    image: "/thumbnails/progress-tracking.jpg",
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals and academic experts.",
    image: "/thumbnails/expert-instructors.jpg",
  },
  {
    title: "Certification",
    description:
      "Earn recognized certificates to proudly showcase your verified skills.",
    image: "/thumbnails/certification.jpg",
  },
  {
    title: "Community Support",
    description: "Join a community of learners and get help when you need it.",
    image: "/thumbnails/community-support.jpg",
  },
  {
    title: "Flexible Learning",
    description: "Learn anytime, anywhere at your own pace with 24/7 access.",
    image: "/thumbnails/flexible-learning.jpg",
  },
];

const EducationFeatures = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Education Offerings
        </h2>
        {/* Big black card container */}
        <div className="bg-slate-900 rounded-2xl shadow-xl p-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-50 rounded-xl shadow-md overflow-hidden "
              >
                {/* Upper part - Image */}
                <div className="w-full h-full overflow-hidden border-b border-gray-300 rounded-t-xl bg-white">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Lower part - Title and description */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationFeatures;
