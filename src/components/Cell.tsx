import React from "react";
import { Cell } from "../models/cell";

type CellProps = {
  cell: Cell;
  onChange: (value: string) => void;
  changeActive: () => void;
};

export const CellComponent: React.FC<CellProps> = React.memo(
  ({ cell, onChange, changeActive }) => {
    return (
      <input
        type="text"
        value={cell.value}
        onFocus={() => changeActive()}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-none focus:ring-0 focus:outline-none"
      />
    );
  }
);
