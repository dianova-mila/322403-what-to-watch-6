import React, {useRef, useEffect} from "react";
import PropTypes from "prop-types";

const VideoPlayer = (props) => {
  const {isPlaying, src} = props;

  const videoRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  return (
    <React.Fragment>
      <video
        ref={videoRef}
        src={src}
        muted={true}
        width="280"
        height="175"
      />
    </React.Fragment>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};
