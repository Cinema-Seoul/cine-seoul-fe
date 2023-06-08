import clsx from "clsx";

export interface DatePickerProps extends BaseProps {
  selected?: Date;
}

export default function DatePicker({ className }: DatePickerProps) {
  return (
    <div className={clsx(className, "rounded out-1 outline-neutral-6")}>
      <div className="p-4">
        <h4 className="text-center mb-2">날짜를 선택해주세요</h4>
        <table className="w-full table-fixed text-center">
          <thead>
            <tr>
              <td>일</td>
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
