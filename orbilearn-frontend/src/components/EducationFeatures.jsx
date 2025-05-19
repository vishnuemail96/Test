import React from 'react';

const features = [
  {
    title: 'Interactive Lessons',
    description: 'Engaging video and quiz content to keep you actively learning.',
    icon: '🎓',
  },
  {
    title: 'Progress Tracking',
    description: 'Track your learning journey and achievements in real-time.',
    icon: '📊',
  },
  {
    title: 'Expert Instructors',
    description: 'Learn from industry professionals and academic experts.',
    icon: '👩‍🏫',
  },
  {
    title: 'Certification',
    description: 'Earn recognized certificates to showcase your skills.',
    icon: '📜',
  },
  {
    title: 'Community Support',
    description: 'Join a community of learners and get help when you need it.',
    icon: '🤝',
  },
  {
    title: 'Flexible Learning',
    description: 'Learn anytime, anywhere at your own pace with 24/7 access.',
    icon: '⏰',
  },
];


const EducationFeatures = () => {
  return (
    <section className="bg-gray-200 via-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Our Education Offerings</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 text-2xl bg-blue-100 text-blue-600 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationFeatures;
