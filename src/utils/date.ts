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

  const [y, m, d] = [
    parseInt(str.substring(0, 4)),
    parseInt(str.substring(4, 6)) - 1,
    parseInt(str.substring(6, 8)),
  ];

  const date = new Date(y, m, d);

  return y !== date.getFullYear() ||
    m !== date.getMonth() ||
    d !== date.getDate()
    ? null
    : date;
}
