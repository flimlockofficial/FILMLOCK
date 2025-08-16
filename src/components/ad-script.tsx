
"use client";

import { useEffect, useRef } from 'react';

export function AdScript() {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adContainerRef.current && adContainerRef.current.children.length === 0) {
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `
        atOptions = {
          'key' : '786f75a1a3aa914125ebf676601775f9',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };
      `;
      adContainerRef.current.appendChild(configScript);

      const adScript = document.createElement('script');
      adScript.type = 'text/javascript';
      adScript.src = '//www.highperformanceformat.com/786f75a1a3aa914125ebf676601775f9/invoke.js';
      adScript.async = true;
      adContainerRef.current.appendChild(adScript);
    }
  }, []);

  return <div ref={adContainerRef} />;
}
