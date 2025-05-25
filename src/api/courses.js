// src/api/courses.js
import api from "./axios";
export const getEnrolled = () => api.get("/api/enrolled-courses/");

// src/api/videos.js
import api from "./axios";
export const getVideos = (batchId) => api.get(`/api/videos/${batchId}/`);
