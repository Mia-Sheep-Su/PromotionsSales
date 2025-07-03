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

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [showEndDialog, setShowEndDialog] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): [TimeLeft, number] => {
      const difference = +countdownTargetDate - +new Date();
      let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return [timeLeft, difference];
    };

    // Set initial time on client mount
    const [initialTime, initialDifference] = calculateTimeLeft();
    setTimeLeft(initialTime);

    if (initialDifference <= 0) {
      setShowEndDialog(true);
      return; // Stop if event is already over
    }

    const timer = setInterval(() => {
      const [newTimeLeft, newDifference] = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newDifference <= 0) {
        clearInterval(timer);
        setShowEndDialog(true);
      }
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
