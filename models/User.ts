import { Dayjs } from "dayjs";

export type User = {
  id: number;
  name: string;
  email: string;
  firebaseId: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
};
