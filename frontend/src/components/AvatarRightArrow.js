import React from 'react';

const AvatarRightArrow = (props) => {
  return (
    <div className="nextArrow" onClick={props.goToNextSlide}>
      <i className="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
    </div>
  );
}

export default AvatarRightArrow;
