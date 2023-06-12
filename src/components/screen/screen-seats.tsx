import clsx from "clsx";

import { Is, ScheduleSeat, Seat, SeatGrade } from "@/types";
import { MouseEventHandler, createContext, useMemo, useState } from "react";
import { useTicketingStore } from "@/stores/client";

interface SeatProps extends BaseProps {
  data: Seat;
  selected?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

const seatColors: Record<SeatGrade, string> = {
  A: "bg-amber-100 out-1 outline-amber-300",
  B: "bg-pink-100 out-1 outline-pink-300",
  C: "bg-gray-100 out-1 outline-gray-300",
};
const selectedSeatColors: Record<SeatGrade, string> = {
  A: "bg-amber-500 out-1 outline-amber-900 text-white font-bold",
  B: "bg-pink-500 out-1 outline-pink-900 text-white font-bold",
  C: "bg-gray-500 out-1 outline-gray-900 text-white font-bold",
};

function SeatBox({ className, selected = false, disabled = false, onClick, data }: SeatProps) {
  return (
    <div
      className={clsx(
        className,
        "w-8 h-8 text-center leading-8 text-xs cursor-pointer",
        selected && selectedSeatColors[data.seatGrade],
        disabled && "bg-neutral-9 opacity-25",
        selected || disabled || seatColors[data.seatGrade]
      )}
      aria-disabled={disabled}
      aria-selected={selected}
      onClick={disabled ? undefined : onClick}
    >
      {`${data.row}${data.col}`}
    </div>
  );
}

export interface ScreenSeatsProps extends BaseProps {
  seats?: ScheduleSeat[];
  selectedSeats?: Seat[];
  onClickSeat?: (seat: Seat) => void;
}

export default function ScreenSeats({ className, seats = [], selectedSeats = [], onClickSeat }: ScreenSeatsProps) {
  const items = useMemo(() => {
    const ret = [];

    const tempSeats = [...seats];
    for (let r = 65; r <= 90; r++) {
      const row = String.fromCharCode(r);

      const cols = seats.filter(({ seat }) => seat.row === row);

      const cs = cols.reduce<(ScheduleSeat | undefined)[]>((acc, cur) => {
        acc[parseInt(cur.seat.col)] = cur;
        return acc;
      }, []);

      if (cs?.length) {
        ret.push({
          row,
          cols: cs,
        });
      }
    }
    return ret;
  }, [seats]);

  return (
    <div className={className}>
      <div className="bg-neutral-3 leading-6 rounded text-center">화면</div>
      <table className="mx-a mt-4 border-separate border-spacing-2 table-fixed">
        {items.map(({ row, cols }) => (
          <tr key={row}>
            <th className="text-sm font-normal">{row}</th>
            {Array.from({ length: cols?.length }).map((_, i) => {
              if (i === 0) {
                return null;
              }

              const s = cols[i];

              if (s) {
                return (
                  <td key={s.seat.seatNum} className="p-0">
                    <SeatBox
                      className=""
                      disabled={s.isOccupied === Is.True}
                      selected={selectedSeats.some((o) => o.seatNum === s.seat.seatNum)}
                      onClick={onClickSeat && (() => onClickSeat(s.seat))}
                      data={s.seat}
                    />
                  </td>
                );
              } else {
                return <td key={0x99 + i}></td>;
              }
            })}
          </tr>
        ))}
      </table>
    </div>
  );
}
