export interface Point {
  x: number | string | Date;
  y: number;
}

export interface Dataset {
  id: String | number;
  data: Array<Point>;
}

export interface SummaryData {
  totalRequest: number;
  timeMostUserAccess: string;
  timeLeastUserAccess: string;
  device: string;
  bandWidth: {
    min: number;
    max: number;
  };
}
