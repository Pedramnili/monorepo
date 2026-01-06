import {useEffect, useRef, useState} from "react";


export const TimePicker = ({value, onChange}: TimePickerProps) => {

  const [internalTime, setInternalTime] = useState({
    hours  : value?.hours || 12,
    minutes: value?.minutes || 0
  });
  const [internalPeriod, setInternalPeriod] = useState<"am" | "pm">(value?.period || "am");
  const [view, setView] = useState<"hours" | "minutes">("hours");
  const [isDragging, setIsDragging] = useState(null);
  const clockRef = useRef<any>(null);

  useEffect(() => {
    if (value) {
      setInternalTime({hours: value.hours, minutes: value.minutes});
      setInternalPeriod(value.period);
    }
  }, [value]);

  // هر وقت time تغییر کرد، onChange رو صدا بزن
  const updateTime = (newTime: { hours: number; minutes: number }) => {
    setInternalTime(newTime);
    onChange?.({...newTime, period: internalPeriod});
  };

  const updatePeriod = (newPeriod: "am" | "pm") => {
    setInternalPeriod(newPeriod);
    onChange?.({...internalTime, period: newPeriod});
  };

  const handleMouseDown = (hand : any) => {
    setIsDragging(hand);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    if (view === 'hours') setView("minutes");
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging || !clockRef.current) return;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let degrees = (angle * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;

    if (isDragging === 'hours') {
      const hours = Math.round(degrees / 30) % 12 || 12;
      updateTime({...internalTime, hours});
    } else if (isDragging === 'minutes') {
      const minutes = Math.round(degrees / 6) % 60;
      updateTime({...internalTime, minutes});
    }
  };

  const handleClickHrs = () => setView("hours");
  const handleClickMin = () => setView("minutes");

  // const handleClear = () => {
  //   updateTime({hours: 12, minutes: 0});
  //   updatePeriod("am");
  // }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, internalTime]);

  const hourAngle = ((internalTime.hours % 12) * 30) - 90;
  const minuteAngle = (internalTime.minutes * 6) - 90;

  const renderNumbers = () => {
    return Array.from({length: 12}, (_, i) => {
      let num = i;
      let result = `${num}`;
      if (view === "minutes") {
        result = `${num * 5}`;
      }
      if (view === "hours") {
        result = i === 0 ? "12" : `${i}`;
      }

      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x = 50 + 35 * Math.cos(angle);
      const y = 50 + 35 * Math.sin(angle);
      return (
        <text key={num} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[0.35rem] font-semibold fill-[var(--rs-text-primary)]">
          {result}
        </text>
      );
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <h3 className="hover:bg-gray-500/50 transition cursor-pointer w-8" onClick={handleClickHrs}>
          {internalTime.hours < 10 ? "0" + internalTime.hours : internalTime.hours}
        </h3>
        <h3 className="w-2">:</h3>
        <h3 className="hover:bg-gray-500/50 transition cursor-pointer w-8" onClick={handleClickMin}>
          {internalTime.minutes < 10 ? "0" + internalTime.minutes : internalTime.minutes}
        </h3>
        <div className="text-xs flex flex-col justify-center items-center w-8">
          <strong className={`cursor-pointer ${internalPeriod === "pm" ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => updatePeriod("am")}>AM</strong>
          <strong className={`cursor-pointer ${internalPeriod === "am" ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => updatePeriod("pm")}>PM</strong>
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <svg ref={clockRef} viewBox="0 0 100 100" className="w-50 h-50 cursor-pointer" style={{userSelect: 'none'}}>
          {/* Clock face */}
          <circle cx="50" cy="50" r="42" className="fill-gray-950/0 stroke-gray-300" strokeWidth="1"/>
          {/* Numbers */}
          {renderNumbers()}
          {/* Center dot */}
          <circle cx="50" cy="50" r="2" className="fill-[var(--rs-violet-500)]"/>
          <line
            x1="50"
            y1="50"
            x2={50 + 29.5 * Math.cos((view === "hours" ? hourAngle : minuteAngle) * Math.PI / 180)}
            y2={50 + 29.5 * Math.sin((view === "hours" ? hourAngle : minuteAngle) * Math.PI / 180)}
            className="stroke-[var(--rs-violet-500)]/50 cursor-grab active:cursor-grabbing"
            strokeWidth="2.5"
            onMouseDown={() => handleMouseDown(view)}
          />
          <circle
            cx={50 + 34.5 * Math.cos((view === "hours" ? hourAngle : minuteAngle) * Math.PI / 180)}
            cy={50 + 34.5 * Math.sin((view === "hours" ? hourAngle : minuteAngle) * Math.PI / 180)}
            r="5"
            className="fill-[var(--rs-violet-500)]/50 cursor-grab active:cursor-grabbing"
            onMouseDown={() => handleMouseDown(view)}
          />
        </svg>
      </div>
      {/* Action buttons */}
      {/*<div className="mt-6 flex float-end gap-6">*/}
      {/*  <button onClick={handleClear} className="font-semibold transition hover:text-indigo-500!">*/}
      {/*    Clear*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
};


interface TimePickerProps {
  value?: { hours: number; minutes: number; period: "am" | "pm" };
  onChange?: (time: { hours: number; minutes: number; period: "am" | "pm" }) => void;
}