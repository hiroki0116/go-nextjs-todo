import { Dayjs } from "dayjs";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  firebaseId: string;
}
