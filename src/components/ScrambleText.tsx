import { useEffect, useRef, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isHovered) {
      setDisplay(text);
      return;
    }

    let revealIndex = 0;
    let frameCount = 0;

    intervalRef.current = setInterval(() => {
      frameCount++;

      if (frameCount % 4 === 0) {
        revealIndex++;
      }

      const result = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealIndex) return char;
          return randomChar();
        })
        .join('');

      setDisplay(result);

      if (revealIndex >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplay(text);
      }
    }, 25);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}
