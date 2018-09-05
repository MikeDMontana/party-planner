import React from 'react';

const AvatarLeftArrow = (props) => {
  return (
    <div className="backArrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-arrow-down fa-2x" aria-hidden="true"></i>
    </div>
  );
}

export default AvatarLeftArrow;
