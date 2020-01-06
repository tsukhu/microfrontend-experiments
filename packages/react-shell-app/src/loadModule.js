const loadModule = (src, fileType = "js", id, callback, errorCallback) => {
  try {
    // defaults to javascript file
    if (fileType === null || fileType === "js") {
      const existingScript = document.getElementById(id);

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        document.body.appendChild(script);

        script.onload = () => {
          if (callback) callback();
        };

        script.onerror = () => {
          if (errorCallback) errorCallback();
        };
      }

      if (existingScript && callback) callback();
    } else if (fileType === "css") {
      const script = document.createElement("link");
      script.rel = "stylesheet";
      script.type = "text/css";
      script.href = src;
      document.head.appendChild(script);
      script.onload = () => {
        if (callback) callback();
      };

      script.onerror = () => {
        if (errorCallback) errorCallback();
      };
    }
  } catch (error) {
    if (errorCallback) errorCallback();
  }
};

export default loadModule;
