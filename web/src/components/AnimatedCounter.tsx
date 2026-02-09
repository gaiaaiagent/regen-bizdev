import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  delay?: number;
  label: string;
  prefix?: string;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedCounter({ target, duration = 1500, delay = 0, label, prefix }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const timers = useRef<{ delay?: ReturnType<typeof setTimeout>; interval?: ReturnType<typeof setInterval>; fallback?: ReturnType<typeof setTimeout> }>({});

  useEffect(() => {
    if (!target || target === 0) return;

    timers.current.delay = setTimeout(() => {
      const startTime = Date.now();

      timers.current.interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setValue(Math.round(easeOutExpo(progress) * target));
        if (progress >= 1) clearInterval(timers.current.interval);
      }, 16);

      // Safety fallback
      timers.current.fallback = setTimeout(() => {
        setValue(target);
        clearInterval(timers.current.interval);
      }, duration + 100);
    }, delay);

    return () => {
      clearTimeout(timers.current.delay);
      clearInterval(timers.current.interval);
      clearTimeout(timers.current.fallback);
    };
  }, [target, duration, delay]);

  return (
    <div className="text-center">
      <div className="text-2xl font-bold tabular-nums text-primary sm:text-3xl">
        {prefix}{value.toLocaleString()}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
