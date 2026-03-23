import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHovered(true));
        el.addEventListener('mouseout', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();
    
    // Set body cursor to none
    document.body.style.cursor = 'none';

    return () => {
      removeEventListeners();
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Use a softer implementation for mobile/touch
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] mix-blend-difference border-2 border-white transition-transform duration-150 ease-out ${
        hidden ? 'opacity-0' : 'opacity-100'
      } ${clicked ? 'scale-75 bg-white' : 'scale-100'} ${
        linkHovered ? 'scale-150 bg-white/50 border-transparent' : ''
      }`}
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
      }}
    />
  );
};
