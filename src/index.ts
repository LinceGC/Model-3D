import { Engine } from "@babylonjs/core/Engines/engine";

import { BaseRuntime } from "./baseRuntime";
import { SceneBuilder } from "./sceneBuilder";

window.onload = (): void => {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.border = "none";
    canvas.style.outline = "none";
    document.body.appendChild(canvas);

    const engine = new Engine(canvas, false, {
        preserveDrawingBuffer: true,  // NECESARIO para readPixels en captura
        stencil: false,
        antialias: true,
        alpha: true,                  // NECESARIO para transparencia real en PNG
        premultipliedAlpha: false,
        powerPreference: "high-performance",
        doNotHandleTouchAction: false,
        doNotHandleContextLost: true,
        audioEngine: false
    }, true);

    // Capture the full path from the URL
    let fullPath = window.location.pathname;
    console.log(fullPath);

    // If the path ends with a "/", remove it to standardize the URL
    if (fullPath.endsWith("/")) {
        fullPath = fullPath.slice(0, -1); // Remove the trailing "/"
    }

    // Check for substrings to differentiate between local and online paths
    const isLocal = window.location.hostname.includes("localhost");
    const isOnline = window.location.hostname.includes("github.io");

    // Define potential subfolders for online URLs
    const onlineBasePaths = ["model-viewer", "docs"];

    // Extract the base path and item
    let basePath = "";
    let item = "";

    // Local case: assume the URL format ends directly with the item
    if (isLocal) {
        basePath = "/"; // If no base path, default to root
        item = fullPath.slice(1).replace(/\/$/, "") || ""; // Get the item after the last "/"
        console.log("Local: " + item);
    } else if (isOnline) {
        // Online case: handle URLs that include subfolders like "model-viewer" or "docs"
        for (const base of onlineBasePaths) {
            if (fullPath.includes(base)) {
                const baseIndex = fullPath.indexOf(base) + base.length;
                basePath = fullPath.substring(0, fullPath.lastIndexOf("/"));
                item = fullPath.slice(baseIndex + 1).replace(/\/$/, "") || "";
                console.log("Online: " + item);
                break;
            }
        }
    }

    // Redirect to the base path (without the item name)
    if (item) {
        window.history.replaceState(null, "", basePath); // Redirect to the base path without the item
    }

    BaseRuntime.Create({
        canvas,
        engine,
        sceneBuilder: new SceneBuilder()
    }, item).then(runtime => runtime.run());
};
