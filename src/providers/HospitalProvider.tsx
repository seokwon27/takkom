"use client";

import createHospitalStore, { HospitalState, HospitalStore } from "@/store/hospitalStore";
import { HospitalSearchParams } from "@/types/hospital";
import React, { createContext, PropsWithChildren, useContext, useRef } from "react";
import { useStore } from "zustand";

export const HospitalContext = createContext<HospitalStore | null>(null);

type TSelector<T> = (state: HospitalState) => T;

export function useHospitalContext<T>(selector: TSelector<T>): T {
  const store = useContext(HospitalContext);
  if (!store) throw Error("Missing HospitalContext.Provider in the tree");
  return useStore(store, selector);
}

type HospitalInitProps = {params: HospitalSearchParams}
type HospitalProviderProps = PropsWithChildren<HospitalInitProps>;
const HospitalProvider = ({ children, ...props }: HospitalProviderProps) => {
  const storeRef = useRef<HospitalStore>();
  if (!storeRef.current) {
    storeRef.current = createHospitalStore(props.params);
  }
  return <HospitalContext.Provider value={storeRef.current}>{children}</HospitalContext.Provider>;
};

export default HospitalProvider;
