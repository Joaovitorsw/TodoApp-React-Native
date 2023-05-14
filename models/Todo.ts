import { styles } from "../App";

export interface Todo {
  id: number;
  value: string;
  completed: boolean;
}
export type StylesProp = typeof styles;
