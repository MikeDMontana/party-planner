import React from 'react';

const AvatarSlide = ({ image }) => {
  const styles = {
    backgroundImage: `url(images/${image}.png)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  }
  return <div className="slide" style={styles}></div>
}

export default AvatarSlide;
