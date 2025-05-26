import {
  Award,
  BarChart2,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Download,
  IndianRupee,
  Monitor,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetailsById } from "../services/courseDetailsApi";
import React from "react";


const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const batchId = course?.batch_id;

  useEffect(() => {
    setLoading(true);
    getCourseDetailsById(id)
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setError("Failed to load course details");
        setLoading(false);
      });
  }, [id]);

  const navigate = useNavigate();

  const handleEnroll = () => {
    // Use the first available batch id for payment, or fallback to course id
    const batchId =
      (course.upcoming_batches && course.upcoming_batches[0]?.batch_id) ||
      course.batch_id ||
      course.id;
    if (batchId) {
      navigate(`/start-payment/${batchId}`);
    } else {
      alert("No batch available for enrollment.");
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <span className="text-red-800">{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!course)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md text-center">
          <span className="text-yellow-800">Course not found</span>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  const renderAboutTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        About Course
      </h2>
      <div className="space-y-6">
        {/* Description */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <div className="min-w-8 mt-1">
            <div className="w-8 h-8 bg-blue-800 flex items-center justify-center rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        {/* Objectives */}
        {course.objectives && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                <Award className="text-blue-600" size={20} />
                Learning Objectives
              </h3>
              <ul className="space-y-3">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">
                      {objective}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Skills & Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Skills Covered */}
          {course.skills_covered && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                  <Code className="text-blue-600" size={20} />
                  Skills Covered
                </h3>
                <div className="space-y-2">
                  {course.skills_covered.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tools Covered */}
          {course.tools_covered && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                  <Wrench className="text-blue-600" size={20} />
                  Tools Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tools_covered.map((tool, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Career Opportunities & Target Audience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Career Opportunities */}
          {course.designations && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                  <BarChart2 className="text-blue-600" size={20} />
                  Career Opportunities
                </h3>
                <ul className="space-y-3">
                  {course.designations.map((designation, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">
                        {designation}
                      </span>
                    </li>
                  ))}
                </ul>
                {course.average_package && (
                  <div className="mt-6 overflow-hidden">
                    <marquee className="">
                      <div className="flex  gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 flex-1">
                          <div className="text-xs text-gray-600 mb-1">
                            Average Package
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {course.average_package.package}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 flex-1">
                          <div className="text-xs text-gray-600 mb-1">
                            Salary Growth
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {course.average_package.salary_hike}
                          </div>
                        </div>
                      </div>
                    </marquee>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Target Audience */}
          {course.target_audience && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                  <Users className="text-blue-600" size={20} />
                  Target Audience
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.target_audience.map((audience, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prerequisites */}
        {course.prerequisites && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                <CheckCircle className="text-blue-600" size={20} />
                Prerequisites
              </h3>
              <ul className="space-y-3">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">
                      {prerequisite}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Why Enroll */}
        {course.why_enroll_for_this_training && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                <Award className="text-blue-600" size={20} />
                Why Enroll For This Training
              </h3>
              <ul className="space-y-3">
                {course.why_enroll_for_this_training.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Training Features */}
        {course.training_features && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-6">
                <Award className="text-blue-600" size={20} />
                Training Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {course.training_features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <h4 className="text-base md:text-lg font-medium text-blue-800 mb-3">
                        {feature.title}
                      </h4>
                      <ul className="space-y-2">
                        {feature.point1 && (
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs md:text-sm text-gray-700">
                              {feature.point1}
                            </span>
                          </li>
                        )}
                        {feature.point2 && (
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs md:text-sm text-gray-700">
                              {feature.point2}
                            </span>
                          </li>
                        )}
                        {feature.point3 && (
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs md:text-sm text-gray-700">
                              {feature.point3}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Assessment Methods */}
        {course.assessment_methods && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                <CheckCircle className="text-blue-600" size={20} />
                Assessment Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.assessment_methods.map((method, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects */}
        {course.projects && course.projects.length > 0 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-blue-800 flex items-center gap-2 mb-4">
                <Code className="text-blue-600" size={20} />
                Projects
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.projects.map((project, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-sm"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurriculumTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        Course Curriculum
      </h2>
      <div className="space-y-4">
        {course.curriculum &&
          Object.entries(course.curriculum).map(([section, topics], index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-medium text-blue-800">
                    {section}
                  </h3>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSection === index ? "transform rotate-90" : ""
                    }`}
                  />
                </div>
              </button>
              {expandedSection === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-200">
                  <ul className="space-y-2 mt-4">
                    {topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-blue-800 mt-1">•</span>
                        <span className="text-gray-700 text-sm md:text-base">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  const renderBatchesTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        Upcoming Batches
      </h2>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {course.upcoming_batches && course.upcoming_batches.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    <Calendar size={16} className="inline mr-2" /> Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    <Clock size={16} className="inline mr-2" /> Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    <Monitor size={16} className="inline mr-2" /> Mode
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    <Users size={16} className="inline mr-2" /> Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Instructor
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {course.upcoming_batches.map((batch, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {batch.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {batch.time}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                      {batch.mode_of_training}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                      {batch.batch_type}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {batch.instructor_name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1 mx-auto">
                        <Download size={16} />
                        Enroll
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <span className="text-blue-800">
                No upcoming batches available at the moment. Please check back
                later or contact support.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        Reviews
      </h2>
      {course.reviews && course.reviews.length > 0 ? (
        <div className="space-y-4">
          {course.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <h3 className="font-bold text-blue-800 text-lg">
                  {review.name}
                </h3>
                {review.course && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {review.course}
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {review.feedback}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
          <span className="text-gray-600">No reviews yet</span>
        </div>
      )}
    </div>
  );

  const renderFaqTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
        FAQs
      </h2>
      <div className="space-y-4">
        {course.faqs?.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            <button
              className="w-full p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base md:text-lg font-medium text-blue-800 pr-4">
                  {faq.question}
                </h3>
                <ChevronRight
                  className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                    expandedFaq === index ? "transform rotate-90" : ""
                  }`}
                />
              </div>
            </button>
            {expandedFaq === index && (
              <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-200">
                <ul className="space-y-2 mt-4">
                  {faq.answers.map((answer, ansIndex) => (
                    <li key={ansIndex} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span className="text-gray-700 text-sm md:text-base">
                        {answer}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <style jsx>{`
        :root {
          --color-primary: #1e3a8a;
          --color-primary-hover: #1e40af;
          --color-white: #ffffff;
          --color-light-gray: #e5e7eb;
          --color-medium-gray: #4b5563;
          --color-shadow: rgba(0, 0, 0, 0.15);
        }
      `}</style>

      {/* Hero Section */}
      <div
        className="relative min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-5xl mx-auto text-white">
            {course.university && (
              <div className="mb-4">
                <a
                  href="#"
                  className="text-blue-300 hover:text-blue-200 transition-colors"
                >
                  {course.university}
                </a>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>

            <p className="text-base md:text-lg mb-8 max-w-3xl leading-relaxed opacity-90">
              {course.overview}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">Duration</div>
                <div className="text-sm md:text-base font-bold">
                  {course.duration}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">Level</div>
                <div className="text-sm md:text-base font-bold capitalize">
                  {course.difficulty_level}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">Type</div>
                <div className="text-sm md:text-base font-bold capitalize">
                  {course.course_type}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">
                  <IndianRupee className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-xs text-blue-200">Price</div>
                <div className="text-sm md:text-base font-bold">
                  ₹{course.price}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {course.category && (
                <div className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">
                  {course.category}
                </div>
              )}
              {course.difficulty_level && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm capitalize">
                  {course.difficulty_level}
                </div>
              )}
              {course.course_type && (
                <div className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm capitalize">
                  {course.course_type}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-lg p-2 shadow-md border border-gray-200 overflow-x-auto">
              {[
                { id: "about", label: "About" },
                { id: "curriculum", label: "Curriculum" },
                { id: "batches", label: "Batches" },
                { id: "reviews", label: "Reviews" },
                { id: "faq", label: "FAQs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-800 text-white"
                      : "text-gray-600 hover:text-blue-800 hover:bg-blue-50"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6">
              {activeTab === "about" && renderAboutTab()}
              {activeTab === "curriculum" && renderCurriculumTab()}
              {activeTab === "batches" && renderBatchesTab()}
              {activeTab === "reviews" && renderReviewsTab()}
              {activeTab === "faq" && renderFaqTab()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 h-96">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 sticky top-8 overflow-hidden">
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
                {course.image ? (
                  <img
                    src={`https://res.cloudinary.com/ddvpkg9d4/${course.image}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <span className="text-lg font-medium text-center px-4">
                      {course.title}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 md:p-6">
                <h2 className="text-xl font-bold text-blue-800 mb-6">
                  Course Details
                </h2>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                    <span className="text-gray-700 text-sm">
                      {course.duration} course
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                    <span className="text-gray-700 text-sm capitalize">
                      {course.difficulty_level} level
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                    <span className="text-gray-700 text-sm">
                      Certificate of completion
                    </span>
                  </li>
                  {course.support &&
                    course.support.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                </ul>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <div>
                      <span className="text-gray-600 text-sm block">
                        Price:
                      </span>
                      <span className="text-2xl font-bold text-blue-800">
                        ₹{course.price}
                      </span>
                    </div>
                    {course.discounts && course.discounts.length > 0 && (
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {course.discounts[0].value} Off
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    Enroll Now
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Additional Course Info */}
                {course.certifications && course.certifications.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-blue-800 mb-3">
                      Certifications
                    </h3>
                    <div className="space-y-2">
                      {course.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
