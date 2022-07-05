import { UserActionEnum } from '../actions/user';
import { IUserState, UserActions } from '../types/user';

const initialState: IUserState = {
  user: null,
  error: '',
  loading: false,
  changed: false,
};

export default function (state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionEnum.GET_USER: {
      return { ...state, loading: true };
    }
    case UserActionEnum.EDIT_USER_SUCCESS: {
      return { ...state, user: action.payload, loading: false };
    }
    case UserActionEnum.EDIT_USER_FAIL: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return { ...state };
  }
}
