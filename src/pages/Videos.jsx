import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios"; // Your axios instance with auth, etc.
import toast from "react-hot-toast";
import React from "react";


export default function Videos() {
  const { batch_id } = useParams();  // Get batch_id from route params
  const axios = useAxios();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/videos/${batch_id}/`);
        setVideos(response.data.videos || []);
      } catch (err) {
        if (err.response) {
          const status = err.response.status;
          if (status === 404) toast.error("Batch not found");
          else if (status === 403) toast.error("Access denied");
          else toast.error("Failed to load videos");
        } else {
          toast.error("Network error");
        }
      } finally {
        setLoading(false);
      }
    };

    if (batch_id) {
      fetchVideos();
    }
  }, [batch_id, axios]);

  if (loading) return <p>Loading videos...</p>;

  if (!videos.length) return <p>No videos available for this batch.</p>;

  return (
    <div>
      <h2>Videos for Batch {batch_id}</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
