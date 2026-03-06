"use client";
import { memo, useEffect, useRef, useState } from "react";

function CibilCheckIframe() {
  const [height, setHeight] = useState(700);
  const iframeRef = useRef(null);

  useEffect(() => {
    const messageHandler = (event) => {
      if (event.origin !== "https://creditscore.ratnaafin.com") return;

      console.log("Received message:", event.data, "from:", event.origin);

      // Handle different message formats
      if (typeof event.data === "number" && event.data > 0) {
        console.log("Setting height to:", event.data);
        setHeight(event.data);
      } else if (event.data && typeof event.data === "object") {
        // Handle object-based messages
        if (event.data.type === "iframeHeight" && event.data.height) {
          console.log("Setting height from object to:", event.data.height);
          setHeight(event.data.height);
        } else if (event.data.height && typeof event.data.height === "number") {
          console.log("Setting height from height property to:", event.data.height);
          setHeight(event.data.height);
        }
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const handleIframeLoad = (e) => {
    const iframe = e.target;
    console.log("Iframe loaded");

    // Try to inject script only if same-origin (will fail silently for cross-origin)
    try {
      if (iframe?.contentWindow && iframe.contentDocument) {
        const script = iframe.contentDocument.createElement("script");
        script.innerHTML = `
          console.log("Script injected into iframe");
          
          function updateHeight() {
            const body = document.body;
            const html = document.documentElement;
            
            // Try multiple methods to get accurate height
            const heights = [
              body.scrollHeight,
              body.offsetHeight,
              html.clientHeight,
              html.scrollHeight,
              html.offsetHeight
            ];
            
            // Also check for specific containers
            const containers = [
              document.getElementsByClassName("jss6")[0],
              document.querySelector('.main-container'),
              document.querySelector('[data-testid="main-content"]'),
              document.getElementById('root'),
              document.querySelector('.app')
            ];
            
            containers.forEach(container => {
              if (container) {
                heights.push(container.scrollHeight, container.offsetHeight);
              }
            });
            
            const maxHeight = Math.max(...heights.filter(h => h > 0));
            
            console.log("Calculated heights:", heights, "Max:", maxHeight);
            
            if (maxHeight > 0) {
              window.parent.postMessage(maxHeight, '*');
              // Also try with object format
              window.parent.postMessage({
                type: 'resize',
                height: maxHeight
              }, '*');
            }
          }
          
          // Initial height update with delays
          setTimeout(updateHeight, 500);
          setTimeout(updateHeight, 1000);
          setTimeout(updateHeight, 2000);
          
          // Update on resize
          window.addEventListener('resize', updateHeight);
          
          // Update on DOM changes with debouncing
          let timeoutId;
          const debouncedUpdate = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateHeight, 300);
          };
          
          const observer = new MutationObserver(debouncedUpdate);
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
          });
          
          // Remove padding from specific elements
          const removePadding = () => {
            const elements = document.querySelectorAll('.jss6, .jss73');
            elements.forEach(el => {
              if(el instanceof HTMLElement) {
                el.style.setProperty('padding', '0', 'important');
              }
            });
          };
          
          // Apply padding removal periodically
          setTimeout(removePadding, 1000);
          setInterval(removePadding, 5000);
        `;

        iframe.contentDocument.head.appendChild(script);
        console.log("Script successfully injected");
      }
    } catch (error) {
      console.log("Could not inject script (cross-origin):", error.message);
    }
  };

  return (
    <div className="w-full" style={{ minHeight: `${height}px` }}>
      <iframe
        ref={iframeRef}
        src="https://creditscore.ratnaafin.com/credit-score/user-form?c2hvd05ld1Byb2R1Y3Q9ZmFsc2UmYnVyZWF1PWNpYmlsJnJlZmVycmFsQ29kZT1yYXRuYWFmaW53ZWJzaXRlJnVpU2hvd0NvbXBhbnlMb2dvPWZhbHNl"
        className="w-full border-0"
        style={{
          height: `${height}px`,
          overflow: "hidden",
        }}
        allow="clipboard-write"
        loading="lazy"
        width="100%"
        height={height}
        onLoad={handleIframeLoad}
        title="CIBIL Credit Score Check"
      />
    </div>
  );
}

export default memo(CibilCheckIframe);
