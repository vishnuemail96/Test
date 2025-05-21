import React, { useEffect, useRef, useState } from "react";
import { getCourseList } from "../services/courseListApi";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);
    getCourseList()
      .then((response) => {
        const coursesData = response.data;
        setCourses(coursesData);
        const extractedCategories = extractCategories(coursesData);
        setCategories(extractedCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
        setLoading(false);
      });
  }, []);

  const extractCategories = (coursesData) => {
    const defaultCategories = ["all", "programming", "data", "cloud", "testing"];
    const categoryMap = {
      Python: "programming",
      Java: "programming",
      "Full Stack": "programming",
      Datascience: "data",
      AWS: "cloud",
      "Amazon Web Services": "cloud",
      DevOps: "cloud",
      Testing: "testing",
    };

    return defaultCategories.filter((category) => {
      if (category === "all") return true;
      return coursesData.some((course) =>
        Object.entries(categoryMap).some(
          ([keyword, cat]) => cat === category && course.title.includes(keyword)
        )
      );
    });
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const getFilteredCourses = () => {
    if (activeCategory === "all") return courses;
    return courses.filter((course) => {
      const title = course.title.toLowerCase();
      switch (activeCategory) {
        case "programming":
          return title.includes("java") || title.includes("python") || title.includes("full stack");
        case "data":
          return title.includes("data") || title.includes("datascience");
        case "cloud":
          return title.includes("aws") || title.includes("amazon") || title.includes("devops");
        case "testing":
          return title.includes("testing");
        default:
          return true;
      }
    });
  };

  if (loading)
    return (
      <div className="text-center p-8 text-yellow-500">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  if (error)
    return <div className="text-center p-8 text-red-500">{error}</div>;

  if (courses.length === 0)
    return <div className="text-center p-8 text-gray-700">No courses available</div>;

  const filteredCourses = getFilteredCourses();

  return (
    <div className="bg-white min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Available Courses
        </h2>
        
        {/* Modern Pill-Style Category Tabs */}
        <div className="overflow-x-auto mb-10">
          <div className="flex gap-4 justify-start md:justify-center min-w-max">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full border transition-all duration-200 text-sm md:text-base font-medium ${
                    isActive
                      ? "bg-[#FFB703] text-white border-[#FFB703] shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                data={course}
                onClick={() => handleCourseClick(course.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-700">
            No courses available in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;