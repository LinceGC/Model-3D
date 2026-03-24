import * as gui from "@babylonjs/gui";
import JSZip from "jszip";
import type { BaseCharData } from "./sceneBuilder.types";

/**
 * Descarga el directorio completo del personaje como un archivo .zip,
 * incluyendo el .pmx y todas sus texturas, para que pueda ser cargado
 * correctamente con el boton + PJ.
 *
 * Flujo de descarga:
 *  1. Fetch al archivo .pmx para leer la lista de texturas referenciadas.
 *  2. Fetch paralelo de cada textura desde el mismo directorio.
 *  3. Empaquetado en un .zip con estructura de carpetas preservada.
 *  4. Descarga del .zip al usuario.
 */
export function createDownloadButton(
    advancedTexture: gui.AdvancedDynamicTexture,
    isMobile: boolean,
    _iconWidthHeight: string,
    _bg_bool: boolean
): { update: (baseUrl: string, char: BaseCharData | undefined) => void } {

    // ── Boton ───────────────────────────────────────────────────────────────
    const downloadButton = gui.Button.CreateSimpleButton("downloadBtn", "PMX");
    downloadButton.width          = "60px";
    downloadButton.height         = "26px";
    downloadButton.color          = "white";
    downloadButton.background     = "rgba(30,30,30,0.75)";
    downloadButton.cornerRadius   = 5;
    downloadButton.thickness      = 1;
    downloadButton.fontSize       = isMobile ? 13 : 11;
    downloadButton.fontFamily     = "Arial";
    downloadButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    downloadButton.verticalAlignment   = gui.Control.VERTICAL_ALIGNMENT_TOP;
    downloadButton.left           = "-10px";
    downloadButton.top            = "212px";
    downloadButton.isVisible      = false;
    advancedTexture.addControl(downloadButton);

    // ── Estado interno ──────────────────────────────────────────────────────
    let _baseUrl     = "";
    let _dirUrl      = "";   // baseUrl + directory + "/"
    let _pmxName     = "";   // nombre del archivo .pmx, e.g. "重云.pmx"
    let _charName    = "";   // nombre del personaje para el zip
    let _isWorking   = false;

    // ── Helpers ─────────────────────────────────────────────────────────────

    /** Actualiza el texto del boton de forma segura */
    function setLabel(text: string): void {
        if (downloadButton.textBlock) downloadButton.textBlock.text = text;
    }

    /** Resetea el boton al estado inicial despues de un retardo */
    function resetButtonDelayed(ms = 2500): void {
        setTimeout(() => {
            _isWorking = false;
            downloadButton.isEnabled = true;
            setLabel("PMX");
        }, ms);
    }

    /**
     * Dado el contenido binario de un archivo .pmx,
     * extrae todos los nombres de texturas referenciados.
     * El formato PMX almacena las rutas de textura como strings UTF-8
     * precedidos por su longitud en 4 bytes (little-endian int32).
     *
     * Esta funcion usa una heuristica robusta: busca todas las secuencias
     * de texto que parezcan rutas de archivo validas dentro del binario.
     */
    function extractTexturePathsFromPmx(buffer: ArrayBuffer): string[] {
        const bytes  = new Uint8Array(buffer);
        const decoder8  = new TextDecoder("utf-8");
        const decoder16 = new TextDecoder("utf-16le");
        const paths: Set<string> = new Set();

        // Extensiones de textura conocidas en modelos MMD
        const TEXTURE_EXTENSIONS = [
            ".png", ".PNG",
            ".jpg", ".JPG", ".jpeg", ".JPEG",
            ".bmp", ".BMP",
            ".tga", ".TGA",
            ".dds", ".DDS",
            ".spa", ".SPA",
            ".sph", ".SPH",
        ];

        // Recorrer el buffer buscando strings que terminen en extension conocida
        for (let i = 0; i < bytes.length - 4; i++) {
            // Intentar leer longitud como int32 LE (formato PMX oficial)
            const len = bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);

            if (len > 0 && len < 512 && i + 4 + len <= bytes.length) {
                // Intentar UTF-8
                try {
                    const candidate = decoder8.decode(bytes.subarray(i + 4, i + 4 + len));
                    if (TEXTURE_EXTENSIONS.some(ext => candidate.endsWith(ext))) {
                        // Normalizar separadores de ruta
                        paths.add(candidate.replace(/\\/g, "/").trim());
                    }
                } catch { /* ignorar */ }

                // Intentar UTF-16 LE (algunos PMX usan encoding de 2 bytes por caracter)
                if (len % 2 === 0) {
                    try {
                        const candidate = decoder16.decode(bytes.subarray(i + 4, i + 4 + len));
                        if (TEXTURE_EXTENSIONS.some(ext => candidate.endsWith(ext))) {
                            paths.add(candidate.replace(/\\/g, "/").trim());
                        }
                    } catch { /* ignorar */ }
                }
            }
        }

        return Array.from(paths);
    }

    /**
     * Intenta descargar un archivo desde una URL.
     * Devuelve { name, blob } o null si falla.
     */
    async function tryFetch(url: string, name: string): Promise<{ name: string; blob: Blob } | null> {
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            const blob = await res.blob();
            return { name, blob };
        } catch {
            return null;
        }
    }

    // ── Click handler ───────────────────────────────────────────────────────
    downloadButton.onPointerClickObservable.add(async () => {
        if (_isWorking || !_dirUrl || !_pmxName) return;

        _isWorking = true;
        downloadButton.isEnabled = false;
        setLabel("Leyendo...");

        try {
            // 1. Descargar el archivo PMX principal
            const pmxUrl = _dirUrl + _pmxName;
            const pmxRes = await fetch(pmxUrl);
            if (!pmxRes.ok) throw new Error(`No se pudo descargar el PMX: HTTP ${pmxRes.status}`);
            const pmxBuffer = await pmxRes.arrayBuffer();
            const pmxBlob   = new Blob([pmxBuffer]);

            setLabel("Texturas...");

            // 2. Extraer rutas de texturas del binario PMX
            const texturePaths = extractTexturePathsFromPmx(pmxBuffer);
            console.log(`[PMX Download] Texturas encontradas (${texturePaths.length}):`, texturePaths);

            // 3. Descargar todas las texturas en paralelo
            const fetchJobs = texturePaths.map(texPath => {
                // Separar el nombre de archivo y posible subdirectorio
                const texUrl  = _dirUrl + texPath;
                return tryFetch(texUrl, texPath);
            });

            const fetchResults = await Promise.all(fetchJobs);
            const downloaded = fetchResults.filter((r): r is { name: string; blob: Blob } => r !== null);
            const failed     = texturePaths.filter((_, i) => fetchResults[i] === null);

            if (failed.length > 0) {
                console.warn(`[PMX Download] No se pudieron descargar ${failed.length} texturas:`, failed);
            }

            setLabel(`ZIP ${downloaded.length + 1}f...`);

            // 4. Empaquetar todo en un ZIP manteniendo la estructura de carpetas
            const zip    = new JSZip();
            const folder = zip.folder(_charName)!;

            // Agregar el PMX al zip
            folder.file(_pmxName, pmxBlob);

            // Agregar cada textura respetando subdirectorios
            for (const item of downloaded) {
                folder.file(item.name, item.blob);
            }

            // 5. Generar el zip con progreso visible
            const zipBlob = await zip.generateAsync(
                { type: "blob", compression: "STORE" }, // STORE = sin recomprimir, mas rapido
                (meta) => {
                    setLabel(`ZIP ${Math.round(meta.percent)}%`);
                }
            );

            // 6. Disparar la descarga
            const objectUrl = URL.createObjectURL(zipBlob);
            const anchor    = document.createElement("a");
            anchor.href     = objectUrl;
            anchor.download = `${_charName}.zip`;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            setTimeout(() => URL.revokeObjectURL(objectUrl), 8000);

            const totalFiles = 1 + downloaded.length;
            setLabel(`OK ${totalFiles} arch`);
            console.log(`[PMX Download] ZIP generado: ${_charName}.zip (${totalFiles} archivos)`);

        } catch (err) {
            console.error("[PMX Download] Error:", err);
            setLabel("Error");
        }

        resetButtonDelayed(3000);
    });

    // ── API publica ─────────────────────────────────────────────────────────
    function update(baseUrl: string, char: BaseCharData | undefined): void {
        if (!char || !char.directory || !char.pmx) {
            downloadButton.isVisible = false;
            _dirUrl   = "";
            _pmxName  = "";
            return;
        }

        _baseUrl  = baseUrl;
        _dirUrl   = `${baseUrl}${char.directory}/`;
        _pmxName  = char.pmx;
        _charName = char.name;
        downloadButton.isVisible = true;
        setLabel("PMX");
    }

    return { update };
}
