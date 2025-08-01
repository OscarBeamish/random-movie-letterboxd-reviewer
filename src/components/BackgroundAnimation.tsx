import React, { useEffect } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation: React.FC = () => {
  const circleCount = 6;

  useEffect(() => {
    const setRandomProperties = () => {
      const circles = document.querySelectorAll('.bokeh circle');
      circles.forEach((circle) => {
        const delay = Math.random() * -30;
        const startRotation = Math.random() * 360;
        (circle as HTMLElement).style.setProperty('--random-delay', `${delay}s`);
        (circle as HTMLElement).style.setProperty('--start-rotation', `${startRotation}deg`);
      });
    };

    setRandomProperties();
  }, []);

  return (
    <div className="bokeh">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array(circleCount)
          .fill(0)
          .map((_, i) => (
            <circle key={i} cx="50" cy="50" r="50" className={`circle-${i + 1}`} />
          ))}
      </svg>
    </div>
  );
};

export default BackgroundAnimation;