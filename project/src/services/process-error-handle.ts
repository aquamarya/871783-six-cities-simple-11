import { store } from "../store";
import { clearErrorAction } from "../store/api-actions";
import { setErrorAction } from "../store/action";

export const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorAction(message));
  store.dispatch(clearErrorAction());
};
