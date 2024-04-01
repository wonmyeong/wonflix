import React from "react";
import YouTube from "react-youtube";

const Youtube = ({ id }) => {
  const opts = {
    height: "410",
    width: "780",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  return <YouTube videoId={id} opts={opts} onReady={onReady} />;
};

export default Youtube;
