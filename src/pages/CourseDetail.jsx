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
  HelpCircle,
  Monitor,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseDetailsById } from "../services/courseDetailsApi";

const PALETTE = {
  primary: "#1E3A8A",
  primaryHover: "#1D4ED8",
  accent: "#E0E7FF",
  surface: "#FFFFFF",
  cardGray: "#F1F5F9",
  textDark: "#1E293B",
  textMuted: "#64748B",
  yellow: "#FACC15", // Tailwind yellow-400 for better contrast
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCourseDetailsById(id)
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load course details");
        setLoading(false);
      });
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span
          className="loading loading-spinner loading-lg"
          style={{ color: PALETTE.primary }}
        ></span>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="alert alert-error max-w-md bg-red-100 text-red-800 border border-red-300">
          <span>{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary btn-sm"
            style={{ background: PALETTE.primary, color: "#fff" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!course)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="alert alert-warning max-w-md bg-yellow-100 text-yellow-800 border border-yellow-300">
          <span>Course not found</span>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary btn-sm"
            style={{ background: PALETTE.primary, color: "#fff" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );

  // --- About Tab ---
  const renderAboutTab = () => (
    <div>
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: PALETTE.textDark }}
      >
        About Course
      </h2>
      <div className="space-y-6">
        {/* Description */}
        <div className="flex items-start gap-4 mb-6">
          <div className="min-w-8 mt-1">
            <div
              className="w-8 h-8 flex items-center justify-center rounded"
              style={{ background: PALETTE.primary }}
            >
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <p className="text-lg" style={{ color: PALETTE.textDark }}>
              {course.description}
            </p>
          </div>
        </div>

        {/* Objectives */}
        {course.objectives && (
          <div
            className="card shadow-lg"
            style={{ background: PALETTE.cardGray }}
          >
            <div className="card-body">
              <h3
                className="card-title flex gap-2"
                style={{ color: PALETTE.primary }}
              >
                <Award className="text-[#1D4ED8]" size={20} />
                Learning Objectives
              </h3>
              <ul className="space-y-2 mt-2">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle
                      className="mt-1 h-5 w-5 flex-shrink-0"
                      style={{ color: PALETTE.primary }}
                    />
                    <span style={{ color: PALETTE.textDark }}>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Skills & Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skills Covered */}
          {course.skills_covered && (
            <div
              className="card shadow-lg"
              style={{ background: PALETTE.surface }}
            >
              <div className="card-body">
                <h3
                  className="card-title flex gap-2"
                  style={{ color: PALETTE.primary }}
                >
                  <Code className="text-[#1D4ED8]" size={20} />
                  Skills Covered
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {course.skills_covered.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded font-semibold"
                      style={{
                        background: PALETTE.accent,
                        color: PALETTE.primary,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tools Covered */}
          {course.tools_covered && (
            <div
              className="card shadow-lg"
              style={{ background: PALETTE.surface }}
            >
              <div className="card-body">
                <h3
                  className="card-title flex gap-2"
                  style={{ color: PALETTE.primary }}
                >
                  <Wrench className="text-[#1D4ED8]" size={20} />
                  Tools Covered
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {course.tools_covered.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded font-semibold"
                      style={{
                        background: PALETTE.yellow,
                        color: "#1E293B",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Career Opportunities */}
        {course.designations && (
          <div
            className="card shadow-lg"
            style={{ background: PALETTE.cardGray }}
          >
            <div className="card-body">
              <h3
                className="card-title flex gap-2"
                style={{ color: PALETTE.primary }}
              >
                <BarChart2 className="text-[#1D4ED8]" size={20} />
                Career Opportunities
              </h3>
              <ul className="mt-2 space-y-2">
                {course.designations.map((designation, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: PALETTE.primary }}
                    />
                    <span style={{ color: PALETTE.textDark }}>
                      {designation}
                    </span>
                  </li>
                ))}
              </ul>
              {course.average_package && (
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  <div
                    className="stat rounded-lg p-3 min-w-[160px] flex-shrink-0 flex flex-col justify-center items-start"
                    style={{ background: PALETTE.accent }}
                  >
                    <div
                      className="stat-title"
                      style={{ color: PALETTE.textMuted }}
                    >
                      Average Package
                    </div>
                    <div
                      className="stat-value text-lg break-words"
                      style={{ color: PALETTE.primary }}
                    >
                      {course.average_package.package}
                    </div>
                  </div>
                  <div
                    className="stat rounded-lg p-3 min-w-[160px] flex-shrink-0 flex flex-col justify-center items-start"
                    style={{ background: PALETTE.yellow }}
                  >
                    <div className="stat-title text-white">Salary Growth</div>
                    <div className="stat-value text-white text-lg break-words">
                      {course.average_package.salary_hike}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Target Audience */}
        {course.target_audience && (
          <div
            className="card shadow-lg"
            style={{ background: PALETTE.cardGray }}
          >
            <div className="card-body">
              <h3
                className="card-title flex gap-2"
                style={{ color: PALETTE.primary }}
              >
                <Users className="text-[#1D4ED8]" size={20} />
                Target Audience
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {course.target_audience.map((audience, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded font-semibold"
                    style={{
                      background: PALETTE.accent,
                      color: PALETTE.primary,
                    }}
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {course.prerequisites && (
          <div
            className="card shadow-lg"
            style={{ background: PALETTE.cardGray }}
          >
            <div className="card-body">
              <h3
                className="card-title flex gap-2"
                style={{ color: PALETTE.primary }}
              >
                <CheckCircle className="text-[#1D4ED8]" size={20} />
                Prerequisites
              </h3>
              <ul className="space-y-2 mt-2">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle
                      className="mt-1 h-5 w-5 flex-shrink-0"
                      style={{ color: PALETTE.primary }}
                    />
                    <span style={{ color: PALETTE.textDark }}>
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
          <div
            className="card shadow-lg"
            style={{ background: PALETTE.cardGray }}
          >
            <div className="card-body">
              <h3
                className="card-title flex gap-2"
                style={{ color: PALETTE.primary }}
              >
                <Award className="text-[#1D4ED8]" size={20} />
                Why Enroll For This Training
              </h3>
              <ul className="space-y-2 mt-2">
                {course.why_enroll_for_this_training.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle
                      className="mt-1 h-5 w-5 flex-shrink-0"
                      style={{ color: PALETTE.primary }}
                    />
                    <span style={{ color: PALETTE.textDark }}>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Training Features */}
        {course.training_features && (
          <div className="card shadow-none bg-transparent">
            <div className="card-body px-0">
              <h3
                className="card-title flex gap-2 mb-4"
                style={{ color: PALETTE.primary }}
              >
                <Award className="text-[#1D4ED8]" size={20} />
                Training Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.training_features.map((feature, index) => (
                  <div
                    key={index}
                    className="card shadow"
                    style={{ background: PALETTE.yellow }}
                  >
                    <div className="card-body p-4">
                      <h4 className="text-lg font-medium text-[#1E293B]">
                        {feature.title}
                      </h4>
                      <ul className="space-y-2 mt-2">
                        {feature.point1 && (
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#1E293B] mt-0.5 flex-shrink-0" />
                            <span className="text-[#1E293B] text-sm">
                              {feature.point1}
                            </span>
                          </li>
                        )}
                        {feature.point2 && (
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#1E293B] mt-0.5 flex-shrink-0" />
                            <span className="text-[#1E293B] text-sm">
                              {feature.point2}
                            </span>
                          </li>
                        )}
                        {feature.point3 && (
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#1E293B] mt-0.5 flex-shrink-0" />
                            <span className="text-[#1E293B] text-sm">
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
          <div
            className="card shadow-lg"
            style={{ background: PALETTE.cardGray }}
          >
            <div className="card-body">
              <h3
                className="card-title flex gap-2"
                style={{ color: PALETTE.primary }}
              >
                <CheckCircle className="text-[#1D4ED8]" size={20} />
                Assessment Methods
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {course.assessment_methods.map((method, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded font-semibold"
                    style={{
                      background: PALETTE.yellow,
                      color: "#1E293B",
                    }}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- Curriculum Tab ---
  const renderCurriculumTab = () => (
    <div>
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: PALETTE.textDark }}
      >
        Course Curriculum
      </h2>
      <div className="space-y-4">
        {course.curriculum &&
          Object.entries(course.curriculum).map(([section, topics], index) => (
            <div
              key={index}
              className="collapse collapse-arrow"
              style={{ background: PALETTE.primary, color: "#fff" }}
            >
              <input
                type="checkbox"
                checked={expandedSection === index}
                onChange={() => toggleSection(index)}
              />
              <div className="collapse-title text-xl font-medium">
                {section}
              </div>
              <div className="collapse-content">
                <ul className="space-y-2">
                  {topics.map((topic, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: PALETTE.yellow }}>•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  // --- Batches Tab ---
  const renderBatchesTab = () => (
    <div>
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: PALETTE.textDark }}
      >
        Upcoming Batches
      </h2>
      <div className="overflow-x-auto">
        {course.upcoming_batches && course.upcoming_batches.length > 0 ? (
          <table
            className="table table-zebra w-full"
            style={{ background: PALETTE.primary, color: "#fff" }}
          >
            <thead>
              <tr>
                <th>
                  <Calendar size={16} className="inline mr-1" /> Date
                </th>
                <th>
                  <Clock size={16} className="inline mr-1" /> Time
                </th>
                <th>
                  <Monitor size={16} className="inline mr-1" /> Mode
                </th>
                <th>
                  <Users size={16} className="inline mr-1" /> Type
                </th>
                <th>Instructor</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {course.upcoming_batches.map((batch, index) => (
                <tr
                  key={index}
                  className="hover"
                  style={{
                    background: PALETTE.surface,
                    color: PALETTE.textDark,
                  }}
                >
                  <td>{batch.date}</td>
                  <td>{batch.time}</td>
                  <td className="capitalize">{batch.mode_of_training}</td>
                  <td className="capitalize">{batch.batch_type}</td>
                  <td>{batch.instructor_name}</td>
                  <td className="text-right">
                    <button
                      className="btn btn-primary btn-sm"
                      style={{
                        background: PALETTE.primary,
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      <Download size={16} className="mr-1" />
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            className="alert alert-info"
            style={{ background: PALETTE.accent, color: PALETTE.primary }}
          >
            <span>
              No upcoming batches available at the moment. Please check back
              later or contact support.
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // --- Reviews Tab ---
  const renderReviewsTab = () => (
    <div>
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: PALETTE.textDark }}
      >
        Reviews
      </h2>
      {course.reviews && course.reviews.length > 0 ? (
        <div className="space-y-4">
          {course.reviews.map((review, index) => (
            <div
              key={index}
              className="card shadow-lg"
              style={{ background: PALETTE.primary, color: "#fff" }}
            >
              <div className="card-body">
                <div className="flex justify-between">
                  <h3 className="font-bold">{review.name}</h3>
                </div>
                <p>{review.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="alert"
          style={{ background: PALETTE.accent, color: PALETTE.primary }}
        >
          No reviews yet
        </div>
      )}
    </div>
  );

  // --- FAQ Tab ---
  const renderFaqTab = () => (
    <div>
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: PALETTE.textDark }}
      >
        FAQs
      </h2>
      <div className="space-y-4">
        {course.faqs?.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow"
            style={{ background: PALETTE.primary, color: "#fff" }}
          >
            <input
              type="checkbox"
              checked={expandedFaq === index}
              onChange={() => toggleFaq(index)}
            />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <ul className="space-y-2 mt-2">
                {faq.answers.map((answer, ansIndex) => (
                  <li key={ansIndex} className="flex items-start gap-2">
                    <span style={{ color: PALETTE.yellow, fontWeight: "bold" }}>
                      •
                    </span>
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Main Render ---
  return (
    <div style={{ background: PALETTE.cardGray, minHeight: "100vh" }}>
      {/* Hero Section */}
      <div
        className="relative min-h-[40vh] flex items-center justify-center"
        style={{ background: PALETTE.yellow }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 py-8 sm:py-12 text-white">
          {course.university && (
            <div className="mb-2 text-sm font-medium opacity-80">
              {course.university}
            </div>
          )}
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 border-2 border-black drop-shadow-xl px-2 sm:px-4 py-2 sm:py-3 rounded-md break-words"
            style={{
              background: PALETTE.textDark,
              color: "#fff",
            }}
          >
            {course.title}
          </h1>
          <p
            className="text-base sm:text-lg mb-5 max-w-2xl opacity-90 break-words"
            style={{ color: PALETTE.textDark }}
          >
            {course.overview}
          </p>
          <div className="flex flex-wrap gap-2">
            {course.category && (
              <span
                className="badge font-semibold"
                style={{
                  background: PALETTE.surface,
                  color: PALETTE.textDark,
                  border: `1px solid ${PALETTE.accent}`,
                }}
              >
                {course.category}
              </span>
            )}
            {course.difficulty_level && (
              <span
                className="badge font-semibold"
                style={{
                  background: PALETTE.surface,
                  color: PALETTE.textDark,
                  border: `1px solid ${PALETTE.accent}`,
                }}
              >
                {course.difficulty_level}
              </span>
            )}
            {course.course_type && (
              <span
                className="badge font-semibold"
                style={{
                  background: PALETTE.primary,
                  color: "#fff",
                }}
              >
                {course.course_type}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Tabs */}
            <div
              className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b"
              style={{ borderColor: PALETTE.accent }}
            >
              {[
                { key: "about", label: "About" },
                { key: "curriculum", label: "Curriculum" },
                { key: "batches", label: "Batches" },
                { key: "reviews", label: "Reviews" },
                { key: "faq", label: "FAQs" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`px-3 sm:px-4 py-2 font-semibold transition rounded-t-md text-sm sm:text-base ${
                    activeTab === tab.key
                      ? "border-b-4 bg-white"
                      : "hover:bg-[#E0E7FF]"
                  }`}
                  style={{
                    borderBottomColor:
                      activeTab === tab.key ? PALETTE.primary : "transparent",
                    color:
                      activeTab === tab.key
                        ? PALETTE.primary
                        : PALETTE.textMuted,
                  }}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div
              className="rounded-2xl shadow-xl p-4 sm:p-8"
              style={{ background: PALETTE.surface }}
            >
              {activeTab === "about" && renderAboutTab()}
              {activeTab === "curriculum" && renderCurriculumTab()}
              {activeTab === "batches" && renderBatchesTab()}
              {activeTab === "reviews" && renderReviewsTab()}
              {activeTab === "faq" && renderFaqTab()}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div
              className="rounded-2xl shadow-xl sticky top-8 overflow-hidden border"
              style={{
                background: PALETTE.surface,
                borderColor: PALETTE.accent,
              }}
            >
              <div
                className="h-40 sm:h-48 w-full flex items-center justify-center"
                style={{ background: PALETTE.accent }}
              >
                {course.image ? (
                  <img
                    src={`https://res.cloudinary.com/ddvpkg9d4/${course.image}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span
                    className="text-lg"
                    style={{ color: PALETTE.textMuted }}
                  >
                    {course.title}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-6">
                <h2
                  className="text-lg sm:text-xl font-bold mb-4 sm:mb-5"
                  style={{ color: PALETTE.textDark }}
                >
                  Course Details
                </h2>
                <ul
                  className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base"
                  style={{ color: PALETTE.textMuted }}
                >
                  <li className="flex items-center gap-2">
                    <BookOpen size={18} style={{ color: PALETTE.primary }} />
                    <span>{course.duration}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users size={18} style={{ color: PALETTE.primary }} />
                    <span>{course.difficulty_level}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award size={18} style={{ color: PALETTE.primary }} />
                    <span>Certificate of completion</span>
                  </li>
                  {course.support &&
                    course.support.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <HelpCircle
                          size={18}
                          style={{ color: PALETTE.primary }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                  <span
                    className="text-base sm:text-lg font-bold"
                    style={{ color: PALETTE.textDark }}
                  >
                    Price:
                  </span>
                  <span
                    className="text-xl sm:text-2xl font-extrabold"
                    style={{ color: PALETTE.primary }}
                  >
                    ₹{course.price}
                  </span>
                </div>
                {course.discounts && course.discounts.length > 0 && (
                  <div
                    className="badge mb-3 sm:mb-4"
                    style={{
                      background: PALETTE.accent,
                      color: PALETTE.primary,
                    }}
                  >
                    {course.discounts[0].value} Off
                  </div>
                )}
                <button
                  className="w-full py-2 sm:py-3 mt-2 rounded-md font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition"
                  style={{
                    background: PALETTE.primary,
                    color: "#fff",
                  }}
                >
                  Enroll Now <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
