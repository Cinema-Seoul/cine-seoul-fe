import clsx from "clsx";

import { Seat, SeatGrade } from "@/domains";

const _fakeSeats: Seat[] = [
  {
    seatNum: 1,
    row: "A",
    col: "1",
    screenNum: 1,
    seatGrade: "A",
    seatPrice: 11000,
  },
  {
    seatNum: 2,
    row: "A",
    col: "2",
    screenNum: 1,
    seatGrade: "A",
    seatPrice: 11000,
  },
  {
    seatNum: 3,
    row: "B",
    col: "1",
    screenNum: 1,
    seatGrade: "B",
    seatPrice: 10000,
  },
  {
    seatNum: 4,
    row: "B",
    col: "2",
    screenNum: 1,
    seatGrade: "B",
    seatPrice: 10000,
  },
  {
    seatNum: 3,
    row: "C",
    col: "1",
    screenNum: 1,
    seatGrade: "C",
    seatPrice: 10000,
  },
  {
    seatNum: 4,
    row: "C",
    col: "2",
    screenNum: 1,
    seatGrade: "C",
    seatPrice: 10000,
  },
];

interface SeatProps extends BaseProps {
  data: Seat;
  selected?: boolean;
}

const seatColors: Record<SeatGrade, string> = {
  A: "bg-amber-100 out-1 outline-amber-300",
  B: "bg-pink-100 out-1 outline-pink-300",
  C: "bg-gray-100 out-1 outline-gray-300",
};

function SeatBox({ className, selected, data }: SeatProps) {
  return (
    <div
      className={clsx(
        className,
        "w-6 h-6 text-center leading-6 text-xs",
        seatColors[data.seatGrade]
      )}
    >
      {`${data.row}${data.col}`}
    </div>
  );
}

export interface ScreenSeatsProps extends BaseProps {}

export default function ScreenSeats({ className }: ScreenSeatsProps) {
  const items = [];

  for (let r = 65; r <= 90; r++) {
    const row = String.fromCharCode(r);
    const cols = _fakeSeats.filter((s) => s.row === row);
    items.push({
      row,
      cols,
    });
  }

  return (
    <div className={className}>
      <div className="bg-neutral-3 leading-6 rounded text-center">화면</div>
      <table className="mt-4 border-separate border-spacing-2">
        {items.map(({ row, cols }) => (
          <tr>
            <th className="text-sm font-normal">{row}</th>
            {cols.map((seat) => (
              <td>
                <SeatBox data={seat} />
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
