if (!window.hasColorPicker) {
    window.hasColorPicker = true;

    const controller = new AbortController();
    const signal = controller.signal;

    const pickColor = async () => {
        try {
            const eyeDropper = new EyeDropper();
            const result = await eyeDropper.open();
            if (signal.aborted) {
                console.log("color picking aborted");
                return;
            }

            await navigator.clipboard.writeText(result.sRGBHex);
            alert(`copied the color${result.sRGBHex}`);
        } catch (error) {
            if (error.name === "AboartError") {
                console.log("eye dropper aboarted");
            } else {
                console.log("color picking failed", error);
            }
        } finally {
            window.hasColorPicker = false;
        }
    };
    //add a escape key abort functionality

    const onKeyDown = (e) => {
        if (e.key == "Escape") {
            controller.abort();
            window.hasColorPicker = false;
            document.removeEventListener("keydown", onKeyDown);
        }
    };

    document.addEventListener("keydown", onKeyDown);

    pickColor();
}
