export const jalaliToGregorian = (jy: number, jm: number, jd: number): Date => {
  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;

  let days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd;

  for (let i = 0; i < jm - 1; i++) {
    days += j_days_in_month[i]!;
  }

  gy += 400 * Math.floor(days / 146097);
  days %= 146097;

  let leap = true;
  if (days >= 36525) {
    days--;
    gy += 100 * Math.floor(days / 36524);
    days %= 36524;
    if (days >= 365) days++;
    leap = false;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days >= 366) {
    leap = false;
    days--;
    gy += Math.floor(days / 365);
    days %= 365;
  }

  let gm = 0;
  for (let i = 0; g_days_in_month[i]! + (i === 1 && leap ? 1 : 0) <= days && i < 12; i++) {
    gm++;
    days -= g_days_in_month[i]! + (i === 1 && leap ? 1 : 0);
  }

  const gd = days + 1;
  return new Date(gy, gm, gd);
};

export const gregorianToJalali = (date: Date): { year: number; month: number; day: number } => {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();

  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy2 = gy + 1;
  let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd;

  for (let i = 0; i < gm - 1; ++i) {
    days += g_days_in_month[i]!;
  }

  if (gm > 2 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) {
    ++days;
  }

  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;

  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jm = 0;
  for (let i = 0; i < 12; ++i) {
    const v : number = j_days_in_month[i]!;
    if (days < v) break;
    jm++;
    days -= v;
  }

  const jd = days + 1;
  return { year: jy, month: jm, day: jd };
};


export const getJalaliMonthDays = (jYear: number, jMonth: number): number => {
  const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  const isLeap = ((jYear % 33) % 4) === 1;
  if (jMonth === 11 && isLeap) {
    return 30;
  }
  return monthDays[jMonth]!;
};

export const JALALI_MONTH_NAMES = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
export const JALALI_WEEK_DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
