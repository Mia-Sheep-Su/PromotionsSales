'use client';

import { useState, useEffect } from 'react';
import { countdownTargetDate } from '@/data/countdown';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Helper function to calculate the time left. Returns null if the time is up.
const calculateTimeLeft = (): TimeLeft | null => {
  // Ensure countdownTargetDate is a valid date
  if (isNaN(countdownTargetDate.getTime())) {
    return null;
  }

  const difference = +countdownTargetDate - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return null; // Time is up
};

const initialTimeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // This effect runs once on mount to confirm we are on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // This effect runs the timer logic only after we've confirmed it's the client
  useEffect(() => {
    if (!isClient) {
      return;
    }

    // Perform an initial calculation as soon as the component is hydrated on the client
    const initialCalculatedTime = calculateTimeLeft();
    if (initialCalculatedTime) {
      setTimeLeft(initialCalculatedTime);
    } else {
      setTimeLeft(initialTimeLeft);
      setShowEndDialog(true);
      return; // Stop if timer has already expired on load
    }

    // Set up the interval to update the timer every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
      } else {
        // Time is up, so we clear the interval and show the dialog
        clearInterval(timer);
        setTimeLeft(initialTimeLeft);
        setShowEndDialog(true);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [isClient]);

  const timeParts = [
    { label: '天', value: timeLeft.days },
    { label: '時', value: timeLeft.hours },
    { label: '分', value: timeLeft.minutes },
    { label: '秒', value: timeLeft.seconds },
  ];

  return (
    <>
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

      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>活動已結束</AlertDialogTitle>
            <AlertDialogDescription>
              本次限時優惠活動已經圓滿結束，感謝您的參與！敬請期待我們的下次活動。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowEndDialog(false)}>了解</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
