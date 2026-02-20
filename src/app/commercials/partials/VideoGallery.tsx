"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Pause } from "lucide-react";
import { FaPlay } from "react-icons/fa";

export default function VideoGallery() {
  const videos = [
    {
      src: "/videos/video1.mp4",
      placeholder: "/placeholders/p1.jpg",
    },
    {
      src: "/videos/video2.mp4",
      placeholder: "/placeholders/p2.jpg",
    },
  ];

  return (
    <div className="padding-x grid grid-cols-1 md:grid-cols-2 gap-32 p-6">
      {videos.map((v, i) => (
        <VideoCard key={i} src={v.src} placeholder={v.placeholder} />
      ))}
    </div>
  );
}

function VideoCard({ src, placeholder }: { src: string; placeholder: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPaused(!paused);
  };

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black">
      {/** Placeholder image */}
      {paused && (
        <Image
          src={placeholder}
          alt="Video Placeholder"
          fill
          className="object-cover"
        />
      )}

      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        controls={false}
      />

      {/** Pause/Play button */}
      <button
        onClick={togglePlay}
        className="absolute left-[45%] top-[45%] bg-white/50 hover:bg-white/35 p-4 rounded-full overflow-hidden z-10"
      >
        {paused ? (
          <FaPlay size={27} color="white" />
        ) : (
          <Pause size={27} color="white" />
        )}
      </button>
    </div>
  );
}
