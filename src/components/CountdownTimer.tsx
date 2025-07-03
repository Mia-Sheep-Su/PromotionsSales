'use client';

import { useState, useEffect } from 'react';
import { countdownTargetDate } from '@/data/countdown';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


export function CountdownTimer() {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +countdownTargetDate - +new Date();
    let timeLeft: TimeLeft = {
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

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // This code now runs only on the client, avoiding hydration errors.
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Display all zeros until the component has mounted on the client
  const displayTime = timeLeft || { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const timeParts = [
    { label: '天', value: displayTime.days },
    { label: '時', value: displayTime.hours },
    { label: '分', value: displayTime.minutes },
    { label: '秒', value: displayTime.seconds },
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
