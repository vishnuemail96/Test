import { useNavigate } from "react-router-dom";
import React from "react";


const Card = ({ data, onClick }) => {
  const navigate = useNavigate();

  /** If your API objects use either `batch_id` or `id`,
   *  fall back to whichever exists. */
  const batchId = data.batch_id ?? data.id;

  /* ---------- handlers ---------- */
  const handleEnroll = (e) => {
    e.stopPropagation();                 // keep parent onClick from firing
    navigate(`/start-payment/${batchId}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/courses/${id}`);
  };

  /* ---------- UI ---------- */
  return (
    <div
      className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Card image */}
      <div className="h-40 rounded-t-lg overflow-hidden bg-[#F1F5F9] flex items-center justify-center">
        {data.image ? (
          <img
            src={`https://res.cloudinary.com/ddvpkg9d4/${data.image}`}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[#1E3A8A] font-medium text-center px-2">
            {data.title}
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="flex-1 px-4 py-3 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">
          {data.title}
        </h3>

        {data.duration && (
          <span className="inline-block bg-[#E0E7FF] text-[#1D4ED8] text-xs px-2 py-1 rounded mb-2">
            {data.duration}
          </span>
        )}

        {data.average_package && (
          <div className="mb-3 text-sm text-[#334155]">
            <p className="font-medium text-[#1E40AF]">
              {data.average_package.package}
            </p>
            <p>{data.average_package.salary_hike}</p>
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center gap-2 mt-auto">
          {data.nearest_batch_date && (
            <span className="text-xs text-[#1D4ED8] font-medium animate-pulse">
              {data.nearest_batch_date}
            </span>
          )}

          <div className="flex gap-2 flex-wrap justify-end">
            <button
              onClick={handleViewDetails}
              className="bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs font-semibold py-2 px-3 rounded transition"
            >
              View Details
            </button>
            <button
              onClick={handleEnroll}
              className="bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-xs font-semibold py-2 px-3 rounded transition"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
