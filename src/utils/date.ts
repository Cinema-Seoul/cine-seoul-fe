import { format } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * "YYYYMMDD" 형태의 날짜 데이터를 Date 객체로 변환한다
 * @param str 변환할 8-Digit DateString
 * @returns 변환된 Date 객체
 */
export function parse8DigitDateString(str: string): Date | null {
  // const date = new Date(
  //   // ISO 8601 형태로 변환
  //   str.replace(/^(.{4})(.{2})(.{2})$/, "$1-$2-$3")
  // );
  //
  // return date;

  const [y, m, d] = [parseInt(str.substring(0, 4)), parseInt(str.substring(4, 6)) - 1, parseInt(str.substring(6, 8))];

  const date = new Date(y, m, d);

  return y !== date.getFullYear() || m !== date.getMonth() || d !== date.getDate() ? null : date;
}

export function fmt(date: Date, form: string) {
  console.log(date);
  if (date instanceof Date) {
    return format(date, form, { locale: ko });
  } else {
    return null;
  }
}

/** Date 타입으로 확실히 만들기 위해 / API 응답에서 Date가 number[7]으로 오는데, 그걸 처리 */
// T+9로 들어온다고 가정
export function date(src: any): Date {
  console.log(src);
  if (src === null || src === undefined) {
    // return null;
  } else if (src instanceof Date) {
    return src;
  }

  if (typeof src === "number" || typeof src === "string") {
    return new Date(src);
  } else if (Array.isArray(src)) {
    return new Date(src[0], src[1] - 1, src[2], src[3], src[4]); //마지막은 버림
  }

  // return null;

  return src;
}
