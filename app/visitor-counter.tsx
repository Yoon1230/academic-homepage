"use client";

import { useEffect } from "react";

const COUNTER_SCRIPT_ID = "busuanzi-counter-script";

export function VisitorCounter({ locale }: { locale: "en" | "zh" }) {
  useEffect(() => {
    if (document.getElementById(COUNTER_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = COUNTER_SCRIPT_ID;
    script.src = "https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <span className="visitor-count" aria-live="polite">
      <span>{locale === "zh" ? "总访问量" : "Total visits"}</span>
      <strong id="busuanzi_site_pv">—</strong>
    </span>
  );
}
