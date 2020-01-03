const loadModule = (src, esmSrc, id, callback, errorCallback) => {
  try {
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
  } catch (error) {
    console.error(error);

    if (errorCallback) errorCallback();
  }
};

export default loadModule;
