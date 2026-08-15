import { useEffect, useRef, useState, type ReactNode } from 'react';
import { mergeClass } from '../utils/classUtils';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up';
  className?: string;
}

const AnimatedCard = ({ children, delay = 0, direction = 'left', className = '' }: AnimatedCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return 'translateX(-100px)';
      case 'right':
        return 'translateX(100px)';
      case 'up':
        return 'translateY(50px)';
      default:
        return 'translateX(-100px)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={mergeClass('p-6', className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
