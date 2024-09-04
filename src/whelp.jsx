import { useEffect } from "react";

const WhelpWidget = () => {
  useEffect(() => {
    // Create script element for Whelp widget
    const script = document.createElement("script");
    script.src = "https://widget.whelp.co/app.js";
    script.async = true;

    // Initialize Whelp widget after script is loaded
    script.onload = () => {
      window.Whelp("init", {
        app_id: "5efbca508ceae09cc52fb00215e637c9",
      });
    };

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Since this is a widget, no need to return any JSX
};

export default WhelpWidget;
