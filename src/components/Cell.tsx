import React from "react";
import { Cell } from "../models/cell";

type CellProps = {
  cell: Cell;
  onChange: (value: string) => void;
};

export const CellComponent: React.FC<CellProps> = React.memo(
  ({ cell, onChange }) => {
    return (
      <input
        type="text"
        value={cell.value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-none focus:ring-0 focus:outline-none"
      />
    );
  }
);
