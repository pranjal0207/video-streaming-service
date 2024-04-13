import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayerPage = () => {
    const { videoId } = useParams();
    const [videoUrl, setVideoUrl] = useState('');

    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/video/${videoId}`);
        setVideoUrl(response.data.message); 
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    useEffect(() => {
        fetchVideoUrl();
    });


    return(
        <>
            {videoUrl ? (
                <video width="50%" controls>
                    <source src={videoUrl} type="video/mp4" />
                </video>
            ) : (
                <p>Loading video...</p>
            )}
        </>
    );
}

export default VideoPlayerPage;