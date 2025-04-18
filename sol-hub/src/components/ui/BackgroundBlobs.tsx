import React from "react";

const BackgroundBlobs = () => {
  return (
    <>
      {/* Global background blobs */}
      <div className="blob bg-gradient-to-br from-cyan-light to-cyan w-[40vw] h-[40vw] top-[-10%] left-[-10%] animate-float-slow" />
      <div className="blob bg-gradient-to-br from-orange-light to-orange w-[35vw] h-[35vw] top-[60%] right-[-5%] animate-float animate-pulse-slow" />
      <div className="blob bg-gradient-to-br from-cyan to-cyan-dark w-[25vw] h-[25vw] bottom-[-10%] left-[20%] animate-float-slow" />
      <div className="blob bg-gradient-to-br from-orange to-orange-dark w-[20vw] h-[20vw] top-[10%] right-[15%] animate-float animate-pulse-slow" />

      {/* Local blobs around the glassmorphic card */}
      <div className="blob bg-gradient-to-br from-cyan-light to-cyan-dark w-[15vw] h-[15vw] top-[30%] left-[20%] animate-float opacity-50" />
      <div className="blob bg-gradient-to-br from-orange-light to-orange w-[18vw] h-[18vw] bottom-[20%] right-[20%] animate-float-slow opacity-60" />
    </>
  );
};

export default BackgroundBlobs;
