"use client";

import { useEffect } from "react";
import { useSettings } from "@/lib/store/settings";
import { storeName } from "@/lib/configs";
import React from "react";

export function MinimalModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { minimalMode } = useSettings();

  const inlineScript = `(function(){
    try {
      var state = JSON.parse(localStorage.getItem("${storeName}"));
      var minimal = state?.state?.minimalMode;
      var root = document.documentElement;
      root.classList.remove("minimal");
      if (minimal) {
        root.classList.add("minimal");
      }
    } catch(e){}
  })();`;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("minimal");
    if (minimalMode) {
      root.classList.add("minimal");
    }
  }, [minimalMode]);

  return (
    <>
      <script
        id="minimal-mode-script"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
        suppressHydrationWarning
      />
      {children}
    </>
  );
}
