import { Dayjs } from "dayjs";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  firebaseId: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
}
