import {useCallback, useRef, useMemo, useState, useEffect} from "react";
import {useClickOutside} from "../../hooks";
import {Input} from "../Input/Input.component";
import {TimePicker} from "../TimePicker/TimePicker.component";
import {DatePickerProps, ViewMode} from "./DatePicker.types";
import {jalaliToGregorian, gregorianToJalali, getJalaliMonthDays, JALALI_MONTH_NAMES, JALALI_WEEK_DAYS} from "./jalali-utils";
import clsx from "clsx";


export const DatePicker = ({placeholder = "Select a Date", placement = "bottom-right", showTime, value, onChange}: DatePickerProps) => {

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(value || null);
  const [viewMode, setViewMode] = useState<ViewMode>("days");

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const todayJalali = useMemo(() => gregorianToJalali(today), [today]);

  const [currentJalaliDate, setCurrentJalaliDate] = useState(() => {
    if (value) {
      return gregorianToJalali(value);
    }
    return todayJalali;
  });

  const [selectedTime, setSelectedTime] = useState<{ hours: number; minutes: number; period: "am" | "pm"; }>({
    hours  : value ? value.getHours() % 12 || 12 : 12,
    minutes: value ? value.getMinutes() : 0,
    period : value && value.getHours() >= 12 ? "pm" : "am"
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setInternalSelectedDate(value);
      setCurrentJalaliDate(gregorianToJalali(value));
      setSelectedTime({
        hours  : value.getHours() % 12 || 12,
        minutes: value.getMinutes(),
        period : value.getHours() >= 12 ? "pm" : "am"
      });
    } else {
      setInternalSelectedDate(null);
    }
  }, [value]);

  const closeCalendar = useCallback(() => {
    setViewMode("days");
    setShowCalendar(false);
  }, []);

  useClickOutside(containerRef, closeCalendar);

  const isSameDay = (d1: Date, d2: Date) => {
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  const get24Hour = (h: number, p: "am" | "pm") =>
    p === "am" ? (h === 12 ? 0 : h) : h === 12 ? 12 : h + 12;

  const handleToday = () => {
    const newToday = new Date();
    setInternalSelectedDate(newToday);
    setCurrentJalaliDate(todayJalali);
    setSelectedTime({
      hours  : newToday.getHours() % 12 || 12,
      minutes: newToday.getMinutes(),
      period : newToday.getHours() >= 12 ? "pm" : "am"
    });
    if (onChange) onChange(newToday);
    setViewMode("days");
  };

  const handleDateClick = (jYear: number, jMonth: number, jDay: number) => {
    const clickedDate = jalaliToGregorian(jYear, jMonth + 1, jDay);
    clickedDate.setHours(0, 0, 0, 0);

    if (clickedDate > today) return;

    setInternalSelectedDate(clickedDate);
    if (!value && onChange) onChange(clickedDate);
    setViewMode("days");
  };

  const handleMonthClick = (monthIndex: number) => {
    setCurrentJalaliDate({...currentJalaliDate, month: monthIndex});
    setViewMode("days");
  };

  const handleYearClick = (year: number) => {
    setCurrentJalaliDate({...currentJalaliDate, year});
    setViewMode("months");
  };

  const handleTimeChange = (newTime: { hours: number; minutes: number; period: "am" | "pm" }) => {
    setSelectedTime(newTime);

    if (internalSelectedDate) {
      const updatedDate = new Date(internalSelectedDate);
      updatedDate.setHours(get24Hour(newTime.hours, newTime.period), newTime.minutes, 0, 0);
      setInternalSelectedDate(updatedDate);
    }
  };

  const handleOk = () => {
    if (internalSelectedDate) {
      const finalDate = new Date(internalSelectedDate);
      finalDate.setHours(
        get24Hour(selectedTime.hours, selectedTime.period),
        selectedTime.minutes,
        0,
        0
      );

      setShowCalendar(false);
      setViewMode("days");
      if (onChange) {
        onChange(finalDate);
      }
    }
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    setInternalSelectedDate(null);
    setSelectedTime({hours: 12, minutes: 0, period: "am"});
    if (onChange) onChange(null);
    setViewMode("days");
  };

  const handlePrev = () => {
    if (viewMode === "years") {
      setCurrentJalaliDate(prev => ({...prev, year: prev.year - 10}));
    } else if (viewMode === "months") {
      setCurrentJalaliDate(prev => ({...prev, year: prev.year - 1}));
    } else {
      let newMonth = currentJalaliDate.month - 1;
      let newYear = currentJalaliDate.year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      setCurrentJalaliDate({...currentJalaliDate, year: newYear, month: newMonth});
    }
  };

  const handleNext = () => {
    if (viewMode === "years") {
      setCurrentJalaliDate(prev => ({...prev, year: prev.year + 10}));
    } else if (viewMode === "months") {
      const nextYear = currentJalaliDate.year + 1;
      if (nextYear <= todayJalali.year) {
        setCurrentJalaliDate(prev => ({...prev, year: nextYear}));
      }
    } else {
      let newMonth = currentJalaliDate.month + 1;
      let newYear = currentJalaliDate.year;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }

      if (newYear < todayJalali.year ||
        (newYear === todayJalali.year && newMonth <= todayJalali.month)) {
        setCurrentJalaliDate({...currentJalaliDate, year: newYear, month: newMonth});
      }
    }
  };

  const handleClickInput = () => {
    setShowCalendar(prev => !prev);
    if (!showCalendar) {
      setViewMode("days");
    }
  };

  const handleClickToday = (e: any) => {
    e.stopPropagation();
    handleToday();
  };

  const formattedTime = useMemo(() => {
    const h = selectedTime.hours.toString().padStart(2, "0");
    const m = selectedTime.minutes.toString().padStart(2, "0");
    return `${h}:${m} ${selectedTime.period.toUpperCase() === "AM" ? "ق.ظ" : "ب.ظ"}`;
  }, [selectedTime]);

  const renderHeader = () => {
    let headerText = "";
    let canGoNext = true;

    if (viewMode === "years") {
      const startYear = currentJalaliDate.year - (currentJalaliDate.year % 10);
      const endYear = startYear + 11;
      headerText = `${endYear} - ${startYear}`;
      canGoNext = endYear < todayJalali.year;
    } else if (viewMode === "months") {
      headerText = `${currentJalaliDate.year}`;
      canGoNext = currentJalaliDate.year < todayJalali.year;
    } else {
      headerText = `${JALALI_MONTH_NAMES[currentJalaliDate.month]} ${currentJalaliDate.year}`;

      let nextMonth = currentJalaliDate.month + 1;
      let nextYear = currentJalaliDate.year;
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
      }

      canGoNext = nextYear < todayJalali.year ||
        (nextYear === todayJalali.year && nextMonth <= todayJalali.month);
    }

    const radioViewMode: Record<ViewMode, ViewMode> = {
      clock : "days",
      days  : "months",
      months: "years",
      years : "days"
    };

    const classCanGoNext = !canGoNext && "opacity-50 cursor-not-allowed!";

    return (
      <div className="flex items-center justify-between mb-3">
        <button onClick={handlePrev} className="p-1 !rounded cursor-pointer hover:dark:bg-gray-500 hover:bg-gray-200">
          &#9654;
        </button>
        <div className="flex flex-col items-center justify-center gap-1">
          <span onClick={() => setViewMode(radioViewMode[viewMode])} className="font-semibold cursor-pointer transition hover:text-indigo-400">
            {headerText}
          </span>
          {showTime && viewMode === "days" && (
            <span onClick={() => setViewMode("clock")} className="font-semibold cursor-pointer transition hover:text-indigo-400">
              {formattedTime}
            </span>
          )}
        </div>
        <button onClick={handleNext} disabled={!canGoNext} className={clsx("p-1 !rounded cursor-pointer hover:dark:bg-gray-500 hover:bg-gray-200", classCanGoNext)}>
          &#9664;
        </button>
      </div>
    );
  };

  const renderCalendarContent = () => {
    if (viewMode === "years") {
      const startYear = currentJalaliDate.year - (currentJalaliDate.year % 10);
      const years = Array.from({length: 12}, (_, i) => startYear + i);
      const selectedJalali = internalSelectedDate ? gregorianToJalali(internalSelectedDate) : null;

      return (
        <div className="grid grid-cols-3 gap-2">
          {years.map(year => {
            const isSelected = selectedJalali && year === selectedJalali.year;
            const isTodayYear = year === todayJalali.year;
            const isFutureYear = year > todayJalali.year;

            const className = clsx(
              "cursor-pointer border-2 border-transparent py-2 rounded-md text-center dark:text-gray-300 dark:hover:bg-gray-700 text-gray-800 hover:bg-indigo-100",
              isFutureYear && "dark:text-gray-600! text-gray-300! cursor-default!",
              isSelected && "dark:bg-indigo-500! dark:text-gray-100! bg-indigo-600!",
              isTodayYear && "border-indigo-400/50! dark:text-indigo-300! text-indigo-600!"
            );

            return (
              <div key={year} onClick={() => !isFutureYear && handleYearClick(year)} className={className}>
                {year}
              </div>
            );
          })}
        </div>
      );
    }

    if (viewMode === "months") {
      const selectedJalali = internalSelectedDate ? gregorianToJalali(internalSelectedDate) : null;

      return (
        <div className="grid grid-cols-3 gap-2">
          {JALALI_MONTH_NAMES.map((monthName, index) => {
            const isSelected = selectedJalali && currentJalaliDate.year === selectedJalali.year && index === selectedJalali.month;
            const isFutureMonth = currentJalaliDate.year > todayJalali.year || (currentJalaliDate.year === todayJalali.year && index > todayJalali.month);
            const className = clsx(
              "cursor-pointer text-sm border-2 border-transparent py-2 rounded-md text-center dark:text-gray-300 dark:hover:bg-gray-700 text-gray-800 hover:bg-indigo-100",
              isFutureMonth && "dark:text-gray-600! text-gray-300! cursor-default!",
              isSelected && "dark:bg-indigo-500! dark:text-gray-100! bg-indigo-200!",
              currentJalaliDate.year === todayJalali.year && index === todayJalali.month && "border-indigo-400/50! dark:text-indigo-300! text-indigo-600!"
            );

            return (
              <div key={index} onClick={() => !isFutureMonth && handleMonthClick(index)} className={className}>
                {monthName}
              </div>
            );
          })}
        </div>
      );
    }

    if (viewMode === "clock" && showTime) {
      return <TimePicker value={selectedTime} onChange={handleTimeChange}/>;
    }

    if (viewMode === "clock" && !showTime) {
      setViewMode("days");
      return null;
    }

    // نمای روزها
    const daysInMonth = getJalaliMonthDays(currentJalaliDate.year, currentJalaliDate.month);
    const firstDayGregorian = jalaliToGregorian(currentJalaliDate.year, currentJalaliDate.month + 1, 1);
    let firstDayIndex = firstDayGregorian.getDay();
    firstDayIndex = firstDayIndex === 6 ? 0 : firstDayIndex + 1;
    const selectedJalali = internalSelectedDate ? gregorianToJalali(internalSelectedDate) : null;

    return (
      <>
        <div className="grid grid-cols-7 text-center text-sm mb-1 font-medium dark:text-gray-500 text-gray-400">
          {JALALI_WEEK_DAYS.map(d => (<div className="p-1" key={d}>{d}</div>))}
        </div>
        <div className="grid grid-cols-7 text-center">
          {Array(firstDayIndex).fill(null).map((_, i) => (<div key={`empty-${i}`}/>))}
          {Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => {
            const cellDateGregorian = jalaliToGregorian(currentJalaliDate.year, currentJalaliDate.month + 1, day);
            cellDateGregorian.setHours(0, 0, 0, 0);

            const isSelected = selectedJalali && currentJalaliDate.year === selectedJalali.year && currentJalaliDate.month === selectedJalali.month && day === selectedJalali.day;
            const isToday = currentJalaliDate.year === todayJalali.year && currentJalaliDate.month === todayJalali.month && day === todayJalali.day;
            const isFuture = cellDateGregorian.getTime() > today.getTime();

            const className = clsx(
              "p-1 border-transparent cursor-pointer border-2 rounded-md",
              isFuture && "dark:text-gray-600 text-gray-400 opacity-60 cursor-default",
              isSelected && "dark:bg-indigo-500! dark:text-gray-100! bg-indigo-600! text-white!",
              isToday && "border-indigo-400/50! dark:text-indigo-300 text-indigo-600"
            );

            return (
              <div key={day} onClick={() => !isFuture && handleDateClick(currentJalaliDate.year, currentJalaliDate.month, day)} className={className}>
                {day}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const posClass = useMemo(() => {
    switch (placement) {
      case "bottom-right":
        return "top-full left-auto right-0 mt-2";
      case "top-left":
        return "bottom-full left-0 mb-2 transform -translate-y-1";
      case "top-right":
        return "bottom-full left-auto right-0 mb-2 transform -translate-y-1";
      case "bottom-left":
      default:
        return "top-full left-0 mt-2";
    }
  }, [placement]);
  const displayValue = useMemo(() => {
    if (!internalSelectedDate) return "";
    const jalali = gregorianToJalali(internalSelectedDate);

    // 👇 اگه showTime فعال باشه، تایم رو هم نمایش بده
    if (showTime) {
      const h = selectedTime.hours.toString().padStart(2, "0");
      const m = selectedTime.minutes.toString().padStart(2, "0");
      return `${jalali.year}/${(jalali.month + 1).toString().padStart(2, "0")}/${jalali.day
      .toString()
      .padStart(2, "0")} ${h}:${m} ${selectedTime.period.toUpperCase()}`;
    }

    // اگه showTime غیرفعال باشه، فقط تاریخ رو نمایش بده
    return `${jalali.year}/${(jalali.month + 1).toString().padStart(2, "0")}/${jalali.day
    .toString()
    .padStart(2, "0")}`;
  }, [internalSelectedDate, selectedTime, showTime]);
  const isOkDisabled = !internalSelectedDate || internalSelectedDate > today;
  const classOkDisabled = isOkDisabled && "opacity-50 cursor-not-allowed";
  const classBtnOk = clsx("px-3 py-1 rounded! bg-indigo-600! text-white! hover:bg-indigo-700! cursor-pointer", classOkDisabled);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center">
        <Input readOnly value={displayValue || placeholder} onClick={handleClickInput} className="cursor-pointer leading-[normal]!"/>
        {internalSelectedDate && (
          <button type="button" onClick={handleClear} className="absolute leading-[normal]! left-1 p-1 transition duration-150 text-red-500!">
            &#10005;
          </button>
        )}
      </div>
      {showCalendar && (
        <div className={clsx("absolute z-10 w-64 border rounded-md p-4 dark:bg-gray-800 dark:border-gray-600 shadow-2xl bg-gray-50 border-gray-300", posClass)}>
          {renderHeader()}
          {renderCalendarContent()}
          {viewMode === "days" && (
            <div className={"flex justify-between mt-4 pt-3 border-t dark:border-gray-700! border-gray-200"}>
              <button onClick={handleClickToday} className="px-3 py-1 rounded! cursor-pointer hover:dark:bg-gray-600 hover:bg-gray-300">
                امروز
              </button>
              <button onClick={handleOk} disabled={isOkDisabled} className={classBtnOk}>
                تایید
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
