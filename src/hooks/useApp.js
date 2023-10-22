import { useSelector, useDispatch } from "react-redux";

import * as appRedux from "../slices/app/appSlice";

export const useApp = () => {
  const dispatch = useDispatch();

  // get value of state
  const { themeMode, sidebar, scanReader } = useSelector((state) => state.app);

  const setThemeMode = (value) => {
    dispatch(appRedux.setThemeMode(value));
  };

  const setSidebar = (values) => {
    dispatch(appRedux.setSidebar(values));
  };

  const setScanReader = (values) => {
    dispatch(appRedux.setScanReader(values));
  };

  return { themeMode, sidebar, scanReader, setThemeMode, setSidebar, setScanReader };
};
