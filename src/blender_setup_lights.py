"""
blender_setup_lights.py
-----------------------
Script de Blender para configurar la iluminacion y render de una escena MMD
de forma que se parezca al look visual de la app web (BabylonJS).

Como usarlo:
  1. Primero corre blender_mmd_import.py para importar el modelo.
  2. Luego abre este script en Scripting y presiona Run Script.
     Se configuran las luces, el motor EEVEE y el color grading automaticamente.
  3. Presiona F12 para ver el resultado.

Por que EEVEE y no Cycles:
  La app web usa rasterizacion en tiempo real (igual que EEVEE).
  Cycles es path tracing fisicamente correcto con sombras duras y oclusion,
  que produce un look completamente diferente al de la app.
  EEVEE replica el modelo de iluminacion de BabylonJS: luz global uniforme,
  colores vivos, sombras suaves o inexistentes.

Ajustes disponibles al inicio del script.
"""

import bpy
import math


# ------------------------------------------------------------------------------
# AJUSTES DE ILUMINACION
# Modifica estos valores para acercarte al look que buscas.
# ------------------------------------------------------------------------------

# Intensidad de la luz ambiente global (equivale al HemisphericLight de la app)
# La app usa 0.55. En EEVEE un valor de 1.0 a 2.0 da colores vivos sin sombras.
AMBIENT_STRENGTH = 1.5

# Color de la luz ambiente (blanco puro = sin tinte de color)
AMBIENT_COLOR = (1.0, 1.0, 1.0, 1.0)

# Intensidad del sol direccional (equivale al DirectionalLight intensidad 0.8)
# En EEVEE con sombras desactivadas este valor solo afecta el brillo general.
SUN_STRENGTH = 3.0

# Color del sol
SUN_COLOR = (1.0, 0.98, 0.95)  # ligeramente calido como la app

# Activar o desactivar sombras del sol
# False = sin sombras, look mas plano y similar a la app web
SUN_SHADOWS = False

# Muestras de render EEVEE (mas = mejor calidad, mas lento)
# 64 es suficiente para preview. Para render final usa 128 o 256.
EEVEE_SAMPLES = 64

# Activar ambient occlusion (oclusion ambiental)
# False = look mas plano y luminoso, mas cercano a la app
USE_AMBIENT_OCCLUSION = False

# Activar bloom en EEVEE (brillo en zonas muy iluminadas)
# La app tiene bloom opcional. Activalo si lo tenias en la app.
USE_BLOOM = False
BLOOM_THRESHOLD = 0.9
BLOOM_INTENSITY = 0.1

# Fondo oscuro (True) o claro (False)
DARK_BACKGROUND = True

# ------------------------------------------------------------------------------


def remove_existing_lights():
    """Elimina todas las luces existentes en la escena para empezar limpio."""
    lights_to_delete = [obj for obj in bpy.context.scene.objects
                        if obj.type == "LIGHT"]
    for light in lights_to_delete:
        bpy.data.objects.remove(light, do_unlink=True)
    print(f"[Lights] Luces anteriores eliminadas: {len(lights_to_delete)}")


def setup_world():
    """
    Configura el mundo con luz ambiente uniforme.
    En EEVEE el mundo actua como una luz hemisferica global que ilumina
    todos los objetos por igual desde todas las direcciones, igual que
    el HemisphericLight de BabylonJS.
    """
    world = bpy.context.scene.world
    if not world:
        world = bpy.data.worlds.new("MMD_World")
        bpy.context.scene.world = world

    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links
    nodes.clear()

    bg_node  = nodes.new("ShaderNodeBackground")
    out_node = nodes.new("ShaderNodeOutputWorld")
    links.new(bg_node.outputs["Background"], out_node.inputs["Surface"])

    bg_node.inputs["Color"].default_value    = AMBIENT_COLOR
    bg_node.inputs["Strength"].default_value = AMBIENT_STRENGTH

    print(f"[Lights] Mundo configurado. Intensidad ambiente: {AMBIENT_STRENGTH}")


def setup_sun():
    """
    Crea un Sun light equivalente al DirectionalLight de la app.
    Direccion: BabylonJS Vector3(0.5, -1, 1) convertida a Blender.
    Con sombras desactivadas actua como una segunda fuente de luz difusa
    que da profundidad sin crear sombras duras.
    """
    import mathutils

    sun_data            = bpy.data.lights.new("DirectionalLight", type="SUN")
    sun_data.energy     = SUN_STRENGTH
    sun_data.color      = SUN_COLOR
    sun_data.angle      = 0.5          # angulo amplio = sombras muy suaves
    sun_data.use_shadow = SUN_SHADOWS

    sun_obj = bpy.data.objects.new("DirectionalLight", sun_data)
    bpy.context.scene.collection.objects.link(sun_obj)

    # Direccion BabylonJS (0.5, -1, 1) -> Blender (X=0.5, Z=1, Y=-1 negado = Y=1)
    direction = mathutils.Vector((0.5, 1.0, 1.0)).normalized()
    sun_obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

    print(f"[Lights] Sol configurado. Energia: {SUN_STRENGTH}, Sombras: {SUN_SHADOWS}")


def setup_eevee():
    """
    Configura EEVEE como motor de render con ajustes optimizados para
    replicar el look de la app web: colores vivos, sin sombras duras,
    iluminacion global uniforme.
    """
    scene  = bpy.context.scene
    eevee  = scene.eevee

    scene.render.engine       = "BLENDER_EEVEE_NEXT"
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080

    # Muestras
    eevee.taa_render_samples   = EEVEE_SAMPLES
    eevee.taa_samples          = 16   # viewport

    # Sombras globales
    # Con sombras desactivadas el look es mas plano y luminoso como la app
    try:
        eevee.use_shadows = SUN_SHADOWS
    except AttributeError:
        pass  # Algunas versiones de Blender 4.x tienen nombres distintos

    # Ambient Occlusion
    try:
        eevee.use_gtao = USE_AMBIENT_OCCLUSION
    except AttributeError:
        pass

    # Bloom
    try:
        eevee.use_bloom           = USE_BLOOM
        eevee.bloom_threshold     = BLOOM_THRESHOLD
        eevee.bloom_intensity     = BLOOM_INTENSITY
        eevee.bloom_radius        = 6.5
    except AttributeError:
        pass  # En EEVEE Next el bloom es diferente, ignorar si no existe

    # Irradiance (luz indirecta) para mayor uniformidad
    try:
        eevee.use_soft_shadows = True
    except AttributeError:
        pass

    print(f"[Lights] EEVEE configurado. Muestras: {EEVEE_SAMPLES}")


def setup_color_management():
    """
    Configura el color management para colores vivos y saturados,
    equivalente al color grading de la app web.

    La app usa:
      - ACES tonemapping
      - Saturation: 60
      - Contrast: 1.15
      - Exposure: 1.0

    En EEVEE el equivalente mas cercano para colores vivos es
    usar Standard o AgX con Look de contraste medio.
    """
    scene = bpy.context.scene

    # Standard da los colores mas saturados y vivos, similar al look anime/MMD
    try:
        scene.view_settings.view_transform = "Standard"
    except Exception:
        try:
            scene.view_settings.view_transform = "AgX"
        except Exception:
            scene.view_settings.view_transform = "Filmic"

    scene.view_settings.exposure = 0.0   # neutro, la luminosidad viene de las luces
    scene.view_settings.gamma    = 1.1   # leve boost de gamma para colores mas vivos

    # Fondo
    if DARK_BACKGROUND:
        scene.render.film_transparent = False
        world = bpy.context.scene.world
        if world and world.use_nodes:
            bg = world.node_tree.nodes.get("Background")
            if not bg:
                bg = next((n for n in world.node_tree.nodes
                           if n.type == "BACKGROUND"), None)
            if bg:
                bg.inputs["Color"].default_value = (0.005, 0.005, 0.005, 1.0)

    print(f"[Lights] Color management configurado. Fondo: {'oscuro' if DARK_BACKGROUND else 'claro'}")


def setup_material_settings():
    """
    Ajusta los materiales MMD para que se vean correctamente en EEVEE.
    Los modelos PMX importados con mmd_tools usan materiales con nodos.
    Activar backface culling y ajustar blend mode para transparencias.
    """
    fixed = 0
    for obj in bpy.context.scene.objects:
        if obj.type != "MESH":
            continue
        for mat in obj.data.materials:
            if not mat or not mat.use_nodes:
                continue
            # Activar shadow catcher y backface culling es opcional
            # Lo importante es que el blend mode este correcto para alpha
            if mat.blend_method == "OPAQUE":
                # Revisar si tiene textura con alpha
                for node in mat.node_tree.nodes:
                    if node.type == "BSDF_TRANSPARENT":
                        mat.blend_method     = "BLEND"
                        mat.shadow_method    = "CLIP"
                        mat.alpha_threshold  = 0.1
                        fixed += 1
                        break
    if fixed > 0:
        print(f"[Lights] Materiales con alpha corregidos: {fixed}")


# -- Ejecucion principal -------------------------------------------------------

print("\n" + "=" * 60)
print("  Up Blender — Configurando luces y render")
print("=" * 60)

remove_existing_lights()
setup_world()
setup_sun()
setup_eevee()
setup_color_management()
setup_material_settings()

print("\n[Lights] === Configuracion completada ===")
print("[Lights] Presiona F12 para hacer un render de prueba.")
print("[Lights] Ajusta AMBIENT_STRENGTH y SUN_STRENGTH al inicio del script")
print("[Lights] y vuelve a correrlo si el resultado no convence.\n")
