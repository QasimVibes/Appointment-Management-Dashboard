"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import { ReduxProviderProps } from "@/types/types";
export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
