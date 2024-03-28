import React, { useEffect, ReactNode, RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPScrollerProps {
  children: ReactNode;
  coinRef: RefObject<HTMLDivElement>;
}

const GSAPScroller: React.FC<GSAPScrollerProps> = ({ children, coinRef }) => {
  useEffect(() => {
    const el = coinRef.current;

    if (el) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom', // when the top of the trigger hits the bottom of the viewport
          end: 'bottom top', // end the animation when the bottom of the trigger goes past the top of the viewport
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        el.querySelectorAll('.property'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 }
      );
      // Cleanup function to kill the ScrollTrigger instance
      return () => {
        if (
          tl.scrollTrigger &&
          (tl.scrollTrigger as any).id &&
          ScrollTrigger.getById((tl.scrollTrigger as any).id)
        ) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    }
  }, [coinRef]);

  // Render the children with the ref attached to the container div
  return <div ref={coinRef}>{children}</div>;
};

export default GSAPScroller;
