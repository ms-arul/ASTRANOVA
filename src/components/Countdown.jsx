import { useEffect, useState } from "react";

export default function Countdown() {
  const eventDate = new Date("2026-02-20").getTime();
  const [time, setTime] = useState(eventDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(eventDate - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-cyan-400 text-2xl my-10">
      ⏳ Event starts in {Math.max(0, Math.floor(time / 1000))} seconds
    </div>
  );
}
