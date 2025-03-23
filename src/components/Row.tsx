import React from "react";
import { Row } from "../models/row";
import { CellComponent } from "./Cell";

type RowProps = {
  row: Row;
  rowIndex: number;
  handleCellChange: (
    rowIndex: number,
    colIndex: number,
    value: string | number
  ) => void;
};

export const RowComponent: React.FC<RowProps> = React.memo(
  ({ row, rowIndex, handleCellChange }) => {
    return (
      <tr>
        <th>{rowIndex + 1}</th>
        {row.map((cell, colIndex) => {
          return (
            <td key={cell.coordinate}>
              <CellComponent
                cell={cell}
                onChange={(value) =>
                  handleCellChange(rowIndex, colIndex, value)
                }
              />
            </td>
          );
        })}
      </tr>
    );
  }
);
