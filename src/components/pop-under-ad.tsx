
"use client";

import { useEffect, useRef } from 'react';

export function PopUnderAd() {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const scriptAppended = useRef(false);

  useEffect(() => {
    if (adContainerRef.current && !scriptAppended.current) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27433646.profitableratecpm.com/f022dd013ca411913ecdb7ea0116d3ff/invoke.js';
      
      adContainerRef.current.appendChild(script);
      scriptAppended.current = true;
    }
  }, []);

  return (
    <div id="container-f022dd013ca411913ecdb7ea0116d3ff" ref={adContainerRef}></div>
  );
}
