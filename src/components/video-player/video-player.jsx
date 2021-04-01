import React from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({src}) => {

  return (
    <React.Fragment>
      <video
        src={src}
        muted={true}
        width="280"
        height="175"
        autoPlay={true}
      />
    </React.Fragment>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired
};
