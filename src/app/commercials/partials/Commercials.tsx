import React from "react";
import VideoGallery from "./VideoGallery";

const Commercials = () => {
  return (
    <div className="mt-16 mb-6">
      <h2 className="mb-4 typography-h5-regular font-medium text-grey-800 text-center pb-4 px-[10rem]">
        Travel Nepal Commercials{" "}
      </h2>
      <p className="text-center text-grey-800 mb-16 mx-16">
        A commercial or an advertisement is an important marketing tool for a
        tour operator to attract new customers, increase sales, build brand
        awareness, and reach a wider audience. It allows for reaching a wider
        audience beyond their existing customer base.
      </p>
      <VideoGallery />
    </div>
  );
};

export default Commercials;
