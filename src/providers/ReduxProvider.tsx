"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { initCart } from "@/store/slices/cartSlice";
import { setTheme, selectTheme } from "@/store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function ClientInitializers({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    dispatch(initCart());
    const savedTheme = localStorage.getItem("pizza-paradise-theme") as
      | "dark"
      | "light";
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("pizza-paradise-theme", theme);
  }, [theme]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ClientInitializers>{children}</ClientInitializers>
    </Provider>
  );
}
