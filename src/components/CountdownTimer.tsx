'use client';

import { useState, useEffect } from 'react';
import { countdownTargetDate } from '@/data/countdown';

export function CountdownTimer() {
  const calculateTimeLeft = () => {
    const difference = +countdownTargetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set initial value on client mount to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeParts = [
    { label: '天', value: timeLeft.days },
    { label: '時', value: timeLeft.hours },
    { label: '分', value: timeLeft.minutes },
    { label: '秒', value: timeLeft.seconds },
  ];

  return (
    <div className="bg-accent text-accent-foreground py-6 text-center">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold mb-4">限時優惠倒數</h2>
        <div className="flex justify-center items-center space-x-4 md:space-x-8">
          {timeParts.map((part) => (
            <div key={part.label} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-bold">
                {String(part.value).padStart(2, '0')}
              </span>
              <span className="text-sm md:text-base uppercase">{part.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
