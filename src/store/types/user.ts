import { UserActionEnum } from '../actions/user';

export interface IUser {
  id: number | null;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

export interface IUserState {
  user: IUser | null;
  error: string;
  loading: boolean;
  changed: boolean;
}

export interface IGetUser {
  type: UserActionEnum.GET_USER;
}

export interface IGetUserSuccess {
  type: UserActionEnum.GET_USER_SUCCESS;
  payload: IUser;
}

export interface IGetUserFail {
  type: UserActionEnum.GET_USER_FAIL;
  payload: string;
}

export interface IEditUser {
  type: UserActionEnum.EDIT_USER;
  data: { [key: string]: string };
}

export interface IEditUserSuccess {
  type: UserActionEnum.EDIT_USER_SUCCESS;
  payload: IUser;
}

export interface IEditUserFail {
  type: UserActionEnum.EDIT_USER_FAIL;
  payload: string;
}

export type UserActions =
  | IGetUser
  | IGetUserSuccess
  | IGetUserFail
  | IEditUser
  | IEditUserSuccess
  | IEditUserFail;
