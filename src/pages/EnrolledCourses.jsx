import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import { formatMoney } from "../utils/formatMoney";
import React from "react";


export default function EnrolledCourses() {
  const axios = useAxios();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/api/enrolled-courses/")
      .then((r) => setCourses(r.data["enrolled courses"]))
      .catch(() => toast.error("Failed to load courses"));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Courses</h1>
      {courses.length === 0 ? (
        <p className="text-gray-500">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Instructor: {course.instructor_name}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Batch ID: {course.batch_id}
              </p>
              {course.is_paid ? (
                <Link
                  to={`/videos/${course.batch_id}`}
                  className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Go to Videos
                </Link>
              ) : (
                <Link
                  to={`/start-payment/${course.batch_id}`}
                  className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Pay {formatMoney(course.amount)} to Access
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
