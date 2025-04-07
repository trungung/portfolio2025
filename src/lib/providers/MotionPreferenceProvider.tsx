"use client";

import { useEffect } from "react";
import { useSettings } from "@/lib/store/settings";
import React from "react";
import { storeName } from "@/lib/configs";

export function MotionPreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { motion } = useSettings();

  const inlineScript = `(function(){
    try {
      var state = JSON.parse(localStorage.getItem("${storeName}"));
      var motion = state?.state?.motion;
      var root = document.documentElement;
      root.classList.remove("force-motion-reduce", "force-no-motion-reduce");

      if (motion === "reduce") {
        root.classList.add("force-motion-reduce");
      } else if (motion === "no-preference") {
        root.classList.add("force-no-motion-reduce");
      }
    } catch(e){}
  })();`;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("force-motion-reduce", "force-no-motion-reduce");

    if (motion === "reduce") {
      root.classList.add("force-motion-reduce");
    } else if (motion === "no-preference") {
      root.classList.add("force-no-motion-reduce");
    }
  }, [motion]);

  return (
    <>
      <script
        id="motion-preference-script"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
        suppressHydrationWarning
      />
      {children}
    </>
  );
}
