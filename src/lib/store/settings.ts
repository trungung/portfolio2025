"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeName } from "@/lib/configs";

type SettingsStore = {
  minimalMode: boolean;
  toggleMinimalMode: () => void;
};

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      minimalMode: false,
      toggleMinimalMode: () =>
        set((state) => ({ minimalMode: !state.minimalMode })),
    }),
    {
      name: storeName,
    },
  ),
);
