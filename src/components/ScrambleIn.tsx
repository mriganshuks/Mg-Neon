import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (!triggered) {
      setDisplay('');
      return;
    }

    let revealIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        revealIndex += 0.5;

        const result = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';

            if (i < Math.floor(revealIndex)) {
              return char;
            }

            if (i <= Math.floor(revealIndex) + 3) {
              return randomChar();
            }

            return '';
          })
          .join('');

        setDisplay(result);

        if (revealIndex >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDisplay(text);
        }
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, triggered]);

  if (!triggered) {
    return <span>&nbsp;</span>;
  }

  return <span>{display || '\u00A0'}</span>;
}
