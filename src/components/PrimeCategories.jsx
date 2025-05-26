import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getCourseList } from "../services/courseListApi";
import React from "react";


const PrimeCategories = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getCourseList()
      .then((response) => {
        const coursesData = response.data;
        setCourses(filterPrimeCourses(coursesData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
        setLoading(false);
      });
  }, []);

  const filterPrimeCourses = (coursesData) => {
    const primeKeywords = ["Full Stack", "AI", "ML", "Cloud", "DevOps"];
    return coursesData.filter((course) =>
      primeKeywords.some((keyword) =>
        course.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading)
    return (
      <div className="text-center p-8 text-yellow-500">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  if (courses.length === 0)
    return (
      <div className="text-center p-8 text-gray-700">
        No prime courses available
      </div>
    );

  return (
    <div className="bg-white min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Prime Categories - Top Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              data={course}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrimeCategories;
