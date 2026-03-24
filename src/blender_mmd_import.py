"""
blender_mmd_import.py
─────────────────────
Script de Blender para importar una escena exportada desde la app MMD.

Flujo de trabajo:
  1. En la app web presiona "Up Blender".
     Se descargan 4 archivos automaticamente.
  2. Crea una carpeta con el nombre del personaje dentro de BLENDER_FOLDER.
     Ejemplo: C:\Visual3D_MMD\Model-3D\blender_json\Hu Tao\
  3. Mueve los 4 archivos descargados a esa carpeta.
  4. En Blender abre este script y presiona Run Script.
     Aparece un dialogo para seleccionar la carpeta del personaje.
  5. Selecciona la carpeta y confirma. El script importa todo solo.

Requisitos:
  - Addon mmd_tools instalado y activado en Blender 4.x.
    https://extensions.blender.org/add-ons/mmd-tools/
"""

import bpy
import json
import os
import math
import zipfile
from pathlib import Path


# ──────────────────────────────────────────────────────────────────────────────
# UNICA VARIABLE QUE NECESITAS AJUSTAR
# Carpeta raiz donde estan las subcarpetas de cada personaje
# ──────────────────────────────────────────────────────────────────────────────

BLENDER_FOLDER = r"C:\Visual3D_MMD\Model-3D\blender_json"
BLENDER_FOLDER = r"C:\Visual3D_MMD\Model-3D\blender_json"

# Carpeta raiz donde estan los VMD originales locales.
# El script busca aqui usando la ruta relativa del motion del JSON.
MOTION_LOCAL_FOLDER = r"C:\Visual3D_MMD\Model-3D"

# ──────────────────────────────────────────────────────────────────────────────


# ── Utilidades generales ───────────────────────────────────────────────────────

def find_file_in_folder(folder: str, pattern: str) -> str | None:
    """Busca el primer archivo que coincida con el patron glob en la carpeta."""
    matches = list(Path(folder).glob(pattern))
    if matches:
        matches.sort(key=lambda f: f.stat().st_mtime, reverse=True)
        return str(matches[0])
    return None


def find_any_zip(folder: str) -> str | None:
    """Encuentra el primer ZIP en la carpeta."""
    for f in Path(folder).iterdir():
        if f.suffix.lower() == ".zip":
            return str(f)
    return None


def extract_zip(zip_path: str) -> str | None:
    """
    Extrae el ZIP en una subcarpeta junto a el.
    Retorna la ruta del primer PMX o BPMX encontrado.
    """
    zip_obj    = Path(zip_path)
    extract_to = zip_obj.parent / zip_obj.stem

    print(f"[Up Blender] Extrayendo ZIP en: {extract_to}")

    with zipfile.ZipFile(zip_path, "r") as zf:
        zf.extractall(extract_to)

    for ext in ("*.pmx", "*.PMX", "*.bpmx", "*.BPMX"):
        candidates = list(extract_to.rglob(ext))
        if candidates:
            print(f"[Up Blender] PMX encontrado: {candidates[0].name}")
            return str(candidates[0])

    print("[Up Blender] ERROR: No se encontro PMX dentro del ZIP.")
    return None


# ── Pasos de importacion ───────────────────────────────────────────────────────

def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    if bpy.context.scene.use_nodes:
        bpy.context.scene.node_tree.nodes.clear()


def import_model(char_folder: str, pkg: dict) -> bpy.types.Object | None:
    model_info   = pkg.get("model", {})
    pmx_filename = model_info.get("pmxFileName", "") or \
                   model_info.get("pmx", "").split("/")[-1]
    char_name    = model_info.get("name", "Personaje")

    # Buscar PMX suelto primero
    pmx_path = find_file_in_folder(char_folder, pmx_filename) or \
               find_file_in_folder(char_folder, "*.pmx")      or \
               find_file_in_folder(char_folder, "*.bpmx")

    # Si no hay PMX suelto, buscar ZIP y extraer
    if not pmx_path:
        zip_path = find_any_zip(char_folder)
        if zip_path:
            pmx_path = extract_zip(zip_path)

    if not pmx_path:
        print(f"[Up Blender] ERROR: No se encontro modelo PMX en: {char_folder}")
        return None

    if not hasattr(bpy.ops, "mmd_tools"):
        print("[Up Blender] ERROR: mmd_tools no esta instalado.")
        print("[Up Blender] https://extensions.blender.org/add-ons/mmd-tools/")
        return None

    print(f"[Up Blender] Importando modelo: {pmx_path}")
    try:
        bpy.ops.mmd_tools.import_model(
            filepath       = pmx_path,
            scale          = 0.08,
            clean_model    = True,
            remove_doubles = False,
        )
        obj = bpy.context.active_object
        if obj:
            obj.name = char_name
            print(f"[Up Blender] Modelo listo: {char_name}")
        return obj
    except Exception as e:
        print(f"[Up Blender] ERROR importando modelo: {e}")
        return None


def setup_camera(pkg: dict):
    cam_data = pkg.get("camera", {})
    pos      = cam_data.get("position", {"x": 0, "y": 10, "z": 0})
    rot      = cam_data.get("rotation", {"x": 0, "y": 0,  "z": 0})
    distance = cam_data.get("distance", -45)
    fov_rad  = cam_data.get("fov", 0.5236)
    scale    = 0.08

    cam_block = bpy.data.cameras.new("MMD_Camera_Data")
    cam_obj   = bpy.data.objects.new("MMD_Camera", cam_block)
    bpy.context.scene.collection.objects.link(cam_obj)

    cam_obj.location = (
         pos["x"] * scale,
        (pos["z"] + distance) * scale,
        -pos["y"] * scale,
    )
    cam_obj.rotation_euler = (
        math.pi / 2 + rot["x"],
        rot["z"],
        rot["y"],
    )
    cam_obj.data.lens_unit = "FOV"
    cam_obj.data.angle     = fov_rad
    cam_obj.data.clip_end  = 500.0
    bpy.context.scene.camera = cam_obj
    print(f"[Up Blender] Camara configurada. FOV: {math.degrees(fov_rad):.1f} grados")


def setup_world(pkg: dict):
    bg    = pkg.get("lighting", {}).get("background", "dark")
    world = bpy.context.scene.world or bpy.data.worlds.new("MMD_World")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg_node = world.node_tree.nodes.get("Background")
    if bg_node:
        v = 0.005 if bg == "dark" else 1.0
        bg_node.inputs[0].default_value = (v, v, v, 1.0)
    print(f"[Up Blender] Fondo: {'oscuro' if bg == 'dark' else 'claro'}")


def setup_render(pkg: dict):
    cg    = pkg.get("colorGrading", {})
    scene = bpy.context.scene
    scene.render.engine               = "CYCLES"
    scene.render.resolution_x         = 1920
    scene.render.resolution_y         = 1080
    scene.view_settings.view_transform = "Filmic"
    scene.view_settings.exposure       = (cg.get("exposure", 1.0) - 1.0) * 2.0
    scene.view_settings.gamma          = cg.get("contrast", 1.15)
    print("[Up Blender] Render configurado: Cycles 1920x1080")


def setup_compositor(pkg: dict):
    cg    = pkg.get("colorGrading", {})
    scene = bpy.context.scene
    scene.use_nodes = True
    tree  = scene.node_tree
    nodes = tree.nodes
    links = tree.links
    nodes.clear()

    rl  = nodes.new("CompositorNodeRLayers")
    out = nodes.new("CompositorNodeComposite")
    rl.location  = (-600, 0)
    out.location = (800, 0)

    current = rl.outputs["Image"]
    x       = -300

    if cg.get("bloomEnabled", False):
        glare            = nodes.new("CompositorNodeGlare")
        glare.location   = (x, 100)
        glare.glare_type = "BLOOM"
        glare.threshold  = cg.get("bloomThreshold", 0.9)
        glare.mix        = (cg.get("bloomWeight", 0.3) / 2.0) - 1.0
        links.new(current, glare.inputs["Image"])
        current = glare.outputs["Image"]
        x      += 300

    aberration = cg.get("aberrationAmount", 0.0)
    if aberration > 0.05:
        lens = nodes.new("CompositorNodeLensdist")
        lens.location = (x, 100)
        lens.use_fit  = False
        lens.inputs["Dispersion"].default_value = min(aberration / 200.0, 0.05)
        links.new(current, lens.inputs["Image"])
        current = lens.outputs["Image"]
        x      += 300

    vignette = cg.get("vignetteWeight", 0.0)
    if vignette > 0.05:
        ellipse          = nodes.new("CompositorNodeEllipseMask")
        ellipse.location = (x, -200)
        ellipse.width    = 0.8
        ellipse.height   = 0.8
        blur             = nodes.new("CompositorNodeBlur")
        blur.location    = (x + 200, -200)
        blur.size_x      = 80
        blur.size_y      = 80
        mix              = nodes.new("CompositorNodeMixRGB")
        mix.location     = (x + 450, 100)
        mix.blend_type   = "MULTIPLY"
        mix.inputs[0].default_value = min(vignette / 5.0, 1.0)
        links.new(current,               mix.inputs[1])
        links.new(ellipse.outputs["Mask"], blur.inputs["Image"])
        links.new(blur.outputs["Image"],   mix.inputs[2])
        current = mix.outputs["Image"]
        x      += 600

    links.new(current, out.inputs["Image"])
    print("[Up Blender] Compositor configurado")


def find_motion_file(folder: str, prefix: str) -> str | None:
    """
    Busca en la carpeta cualquier archivo cuyo nombre empiece con el prefijo.
    Prioriza .vmd sobre .bvmd.
    """
    folder_path = Path(folder)
    for ext in (".vmd", ".bvmd"):
        for f in folder_path.iterdir():
            if f.is_file() and f.name.startswith(prefix) and f.suffix.lower() == ext:
                return str(f)
    return None


def resolve_motion_path(relative_path: str) -> str | None:
    """
    Dado el campo modelMotionFile o camMotionFile del JSON (que apunta a un .bvmd),
    busca el VMD original en MOTION_LOCAL_FOLDER con el mismo nombre pero .vmd.
    Si no existe el .vmd, devuelve el .bvmd como respaldo (que fallara en mmd_tools).
    """
    if not relative_path:
        return None

    # Construir ruta absoluta al .bvmd
    bvmd_path = Path(MOTION_LOCAL_FOLDER) / relative_path

    # Intentar el .vmd con el mismo nombre en la misma carpeta
    vmd_path = bvmd_path.with_suffix(".vmd")
    if vmd_path.exists():
        print(f"[Up Blender] VMD local encontrado: {vmd_path.name}")
        return str(vmd_path)

    # Respaldo: usar el .bvmd si existe (mmd_tools fallara pero queda registrado)
    if bvmd_path.exists():
        print(f"[Up Blender] ADVERTENCIA: Solo se encontro BVMD, no VMD: {bvmd_path.name}")
        return str(bvmd_path)

    print(f"[Up Blender] Motion no encontrado en disco: {relative_path}")
    return None


def load_motions(char_folder: str, pkg: dict):
    """
    Carga el VMD del modelo y de la camara.
    Primero busca los VMD originales en MOTION_LOCAL_FOLDER usando la ruta
    del JSON. Si no los encuentra, busca en la carpeta del personaje como respaldo.
    """
    motion    = pkg.get("motion", {})
    char_name = pkg["model"].get("name", "Personaje").replace(" ", "_")

    model_relative = motion.get("modelMotionFile", "")
    cam_relative   = motion.get("camMotionFile",   "")

    # Intentar resolver desde MOTION_LOCAL_FOLDER primero
    model_path  = resolve_motion_path(model_relative)
    camera_path = resolve_motion_path(cam_relative)

    # Respaldo: buscar en la carpeta del personaje por prefijo
    if not model_path:
        model_path = find_motion_file(char_folder, f"motion_model_{char_name}_")
    if not camera_path:
        camera_path = find_motion_file(char_folder, f"motion_camera_{char_name}_")

    # Motion del modelo
    armature = next(
        (o for o in bpy.context.scene.objects if o.type == "ARMATURE"),
        None
    )
    if armature and model_path:
        try:
            bpy.context.view_layer.objects.active = armature
            bpy.ops.mmd_tools.import_vmd(
                filepath = model_path,
                scale    = 0.08,
                margin   = 5
            )
            print(f"[Up Blender] Motion modelo cargado: {Path(model_path).name}")
        except Exception as e:
            print(f"[Up Blender] ADVERTENCIA motion modelo: {e}")
    else:
        print(f"[Up Blender] Motion modelo no encontrado para: {model_relative}")

    # Motion de la camara
    # mmd_tools requiere que la camara este seleccionada Y activa antes de importar
    # el VMD de camara. Ademas debe estar en modo OBJECT, no en POSE ni EDIT.
    if camera_path:
        cam_obj = bpy.context.scene.objects.get("MMD_Camera")
        if cam_obj:
            # Deseleccionar todo primero
            bpy.ops.object.select_all(action="DESELECT")
            # Seleccionar y activar la camara
            cam_obj.select_set(True)
            bpy.context.view_layer.objects.active = cam_obj
            # Asegurarse de estar en modo objeto
            if bpy.context.mode != "OBJECT":
                bpy.ops.object.mode_set(mode="OBJECT")
            try:
                bpy.ops.mmd_tools.import_vmd(
                    filepath = camera_path,
                    scale    = 0.08,
                    margin   = 5
                )
                print(f"[Up Blender] Motion camara cargado: {Path(camera_path).name}")
            except Exception as e:
                print(f"[Up Blender] ADVERTENCIA motion camara: {e}")
        else:
            print("[Up Blender] Motion camara: no se encontro MMD_Camera en la escena")
    else:
        print(f"[Up Blender] Motion camara no encontrado para: {cam_relative}")


# ── Operador con selector de carpeta ──────────────────────────────────────────

class UpBlenderImportOperator(bpy.types.Operator):
    """Importa una escena MMD exportada desde la app web"""
    bl_idname  = "object.up_blender_import"
    bl_label   = "Selecciona la carpeta del personaje"

    # El selector de directorios de Blender
    directory: bpy.props.StringProperty(
        name        = "Carpeta del personaje",
        description = "Carpeta que contiene el JSON, ZIP y BVMD del personaje",
        default     = BLENDER_FOLDER,
        subtype     = "DIR_PATH",
    )  # type: ignore

    def invoke(self, context, event):
        """Abre el dialogo de seleccion de carpeta."""
        self.directory = BLENDER_FOLDER
        context.window_manager.fileselect_add(self)
        return {"RUNNING_MODAL"}

    def execute(self, context):
        """Ejecuta la importacion con la carpeta seleccionada."""
        char_folder = self.directory.rstrip("\\/")

        print("\n" + "=" * 60)
        print("  Up Blender — Importando escena MMD")
        print("=" * 60)
        print(f"  Carpeta: {char_folder}\n")

        # Buscar el JSON mas reciente en la carpeta seleccionada
        json_files = sorted(
            Path(char_folder).glob("blender_scene_*.json"),
            key    = lambda f: f.stat().st_mtime,
            reverse= True
        )

        if not json_files:
            self.report({"ERROR"}, f"No se encontro ningun blender_scene_*.json en: {char_folder}")
            return {"CANCELLED"}

        json_path = str(json_files[0])
        print(f"[Up Blender] JSON: {json_files[0].name}")

        with open(json_path, "r", encoding="utf-8") as f:
            pkg = json.load(f)

        print(f"[Up Blender] Personaje: {pkg['model'].get('name', '?')}")
        print(f"[Up Blender] Motion:    {pkg['motion'].get('name', '?')}\n")

        clear_scene()
        import_model(char_folder, pkg)
        setup_camera(pkg)
        setup_world(pkg)
        setup_render(pkg)
        setup_compositor(pkg)
        load_motions(char_folder, pkg)

        print("\n[Up Blender] === Importacion completada ===\n")
        self.report({"INFO"}, f"Escena importada: {pkg['model'].get('name', '?')}")
        return {"FINISHED"}


# ── Registro y ejecucion automatica ───────────────────────────────────────────

def register():
    bpy.utils.register_class(UpBlenderImportOperator)


def unregister():
    bpy.utils.unregister_class(UpBlenderImportOperator)


# Al correr el script desde Scripting, se registra y abre el dialogo
register()
bpy.ops.object.up_blender_import("INVOKE_DEFAULT")