import React from 'react';

const VideoHero: React.FC = () => {
  return (
    <>
      <video
        autoPlay
        loop
        playsInline
        muted
        className="video-background"
        poster="/images/home_1.jpg"
      >
        <source src="/video/home_anim_1.mp4" type="video/mp4" />
        Your browser does not support the video tag. <br />
      </video>
    </>
  );
};

export default VideoHero;
