import React, { useState } from 'react';

const courses = [
  { name: 'Full Stack Java', video: '/videos/java.mp4' },
  { name: 'Python for Beginners', video: '/videos/python.mp4' },
  { name: 'React + Node.js', video: '/videos/react-node.mp4' },
  { name: 'Data Science with Python', video: '/videos/datascience.mp4' },
  { name: 'DevOps Essentials', video: '/videos/devops.mp4' },
];

const CourseCategories = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const toggleCourses = () => {
    setVisibleCount(visibleCount === 3 ? courses.length : 3);
  };

  return (
    <div className="bg-white text-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Browse Prime Categories
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, visibleCount).map((course, idx) => (
            <div
              key={idx}
              className="relative h-48 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <video
                src={course.video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute w-full h-full object-cover filter brightness-50 transition duration-300 group-hover:brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-xl font-semibold text-white text-center px-4">
                  {course.name}
                </h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        <div className="text-center mt-10">
          <button
            onClick={toggleCourses}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            {visibleCount === 3 ? 'Show More' : 'Show Less'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCategories;
