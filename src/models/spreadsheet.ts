import { Row } from "./row";

export type Sheet = {
  sheetName: string;
  activeCell: string;
  rows: Row[];
};
