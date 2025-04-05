import { useCallback, useRef, useState } from "react";
import { Cell } from "../models/cell";
import { Sheet } from "../models/spreadsheet";
import { Row } from "../models/row";
import { RowComponent } from "./Row";
import { ContextMenu } from "./ContextMenu";

const INITIAL_ROWS = 500;
const INITIAL_COLS = 50;

const initialRows = Array.from({ length: INITIAL_ROWS }, (_, rowIndex) =>
  Array.from({ length: INITIAL_COLS }, (_, colIndex) => ({
    isActive: false,
    coordinate: `${rowIndex}-${colIndex}`,
    value: "",
    formula: "",
  }))
);

const getColumnLabel = (index: number): string => {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label; // 65 is 'A'
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

export const Spreadsheet = () => {
  const [sheet, setSheet] = useState<Sheet>({
    sheetName: "Sheet1",
    activeCell: "",
    rows: initialRows,
  });

  const contentMenuRef = useRef<HTMLMenuElement>(null);
  const [contextMenu, setContextMenu] = useState({
    xPos: 0,
    yPos: 0,
    triggered: false,
  });

  const contextButtons = [
    {
      label: "Insert Row",
      onClick: () => addRow(),
    },
    {
      label: "Insert Column",
      onClick: () => addColumn(),
    },
    {
      label: "Delete Row",
      onClick: () => removeRow(),
    },
    {
      label: "Delete Column",
      onClick: () => removeColumn(),
    },
  ];

  function handleContext(e: MouseEvent) {
    e.preventDefault();
    // console.log(contentMenuRef.current?.getBoundingClientRect());

    let x = e.clientX;
    let y = e.clientY;

    setContextMenu({
      xPos: x,
      yPos: y,
      triggered: true,
    });
  }

  const addRow = () => {
    const index = Number(sheet.activeCell.split("R")[1].split("C")[0]);
    const currentRows = sheet.rows;
    const current_col_length = currentRows[0].length;
    let i = index;
    const row: Cell[] = [];
    for (let j = 1; j <= current_col_length; j++) {
      const cell = {
        isActive: false,
        coordinate: `R${i}C${j}`,
        value: "",
        formula: "",
      };
      row.push(cell);
    }
    currentRows.splice(index, 0, row);
    setSheet({ ...sheet, rows: currentRows });
  };

  const addColumn = () => {
    const index = Number(sheet.activeCell.split("C")[1]);
    const currentRows = sheet.rows;
    let i = 0;
    const j = index;
    const rows: Row[] = [];
    currentRows.forEach((row: Cell[]) => {
      const cell = {
        isActive: false,
        coordinate: `R${i}C${j}`,
        value: "",
        formula: "",
      };
      row.splice(index, 0, cell);
      rows.push(row);
      i++;
    });
    console.log(rows);
    setSheet({ ...sheet, rows: rows });
  };

  const removeRow = () => {
    const index = Number(sheet.activeCell.split("R")[1].split("C")[0]);
    const currentRows = sheet.rows;
    currentRows.splice(index, 1);
    setSheet({ ...sheet, rows: currentRows });
  };

  const removeColumn = () => {
    const index = Number(sheet.activeCell.split("C")[1]);
    const currentRows = sheet.rows;
    const rows: Row[] = [];
    currentRows.forEach((row: Cell[]) => {
      row.splice(index, 1);
      rows.push(row);
    });
    setSheet({ ...sheet, rows: rows });
  };

  const handleCellChange = useCallback(
    (rowIndex: number, colIndex: number, newValue: string | number) => {
      setSheet((prevSheet) => {
        const newRows = [...prevSheet.rows];
        newRows[rowIndex] = [...newRows[rowIndex]];
        newRows[rowIndex][colIndex] = {
          ...newRows[rowIndex][colIndex],
          value: newValue,
          isActive: true,
        };

        return {
          ...prevSheet,
          rows: newRows,
          activeCell: `R${rowIndex}C${colIndex}`,
        };
      });
    },
    []
  );

  const changeActive = useCallback((rowIndex: number, colIndex: number) => {
    setSheet((prevSheet) => {
      return {
        ...prevSheet,
        activeCell: `R${rowIndex}C${colIndex}`,
      };
    });
  }, []);

  return (
    <div onContextMenu={(e) => handleContext(e)}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th></th>
            {Array.from(
              { length: sheet.rows[0]?.length || 0 },
              (_, colIndex) => (
                <th key={colIndex}>{getColumnLabel(colIndex)}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {sheet.rows.map((row, rowIndex) => (
            <RowComponent
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              handleCellChange={handleCellChange}
              changeActive={changeActive}
            />
          ))}
        </tbody>
      </table>
      <ContextMenu
        triggered={contextMenu.triggered}
        xPos={contextMenu.xPos}
        yPos={contextMenu.yPos}
        contentMenuRef={contentMenuRef}
        buttons={contextButtons}
      ></ContextMenu>
    </div>
  );
};
