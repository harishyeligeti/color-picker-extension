if (!window.hasColorPicker) {
    window.hasColorPicker = true;
  
    const pickColor = async (event) => {
      event.preventDefault();
      event.stopPropagation();
  
      const element = event.target;
      const color = getComputedStyle(element).color;
  
      try {
        await navigator.clipboard.writeText(color);
        alert(`Copied color: ${color}`);
      } catch (err) {
        console.error("Failed to copy color: ", err);
      }
  
      // Clean up
      document.removeEventListener("click", pickColor, true);
      window.hasColorPicker = false;
    };
  
    document.addEventListener("click", pickColor, true);
  }
  