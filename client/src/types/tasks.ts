import { Value as DateValue } from "node_modules/react-calendar/dist/esm/shared/types";

export interface ReadTasksResponse {
  _id: string;
  user: string;
  taskName: string;
  taskDetail: string;
  deadline: DateValue;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TaskChanges {
  taskName?: string;
  taskDetail?: string;
  deadline?: DateValue;
}