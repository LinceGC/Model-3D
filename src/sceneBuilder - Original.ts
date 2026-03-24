const baseUrl = "https://phoshco.github.io/"; //"http://127.0.0.1:8080/";
// for use loading screen, we need to import following module.
import JSZip from "jszip";
import "@babylonjs/core/Loading/loadingScreen";
// for cast shadow, we need to import following module.
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";
// for use WebXR we need to import following two modules.
import "@babylonjs/core/Helpers/sceneHelpers";
import "@babylonjs/core/Materials/Node/Blocks";
// if your model has .tga texture, uncomment following line.
import "@babylonjs/core/Materials/Textures/Loaders/tgaTextureLoader";
// for load .bpmx file, we need to import following module.
import "babylon-mmd/esm/Loader/Optimized/bpmxLoader";
// if you want to use .pmx file, uncomment following line.
import "babylon-mmd/esm/Loader/pmxLoader";
// if you want to use .pmd file, uncomment following line.
// import "babylon-mmd/esm/Loader/pmdLoader";
import "babylon-mmd/esm/Loader/mmdOutlineRenderer";
// for play `MmdAnimation` we need to import following two modules.
import "babylon-mmd/esm/Runtime/Animation/mmdRuntimeCameraAnimation";
import "babylon-mmd/esm/Runtime/Animation/mmdRuntimeModelAnimation";
import "@babylonjs/core/Rendering/depthRendererSceneComponent";
import "babylon-mmd/esm/Loader/Shaders/textureAlphaChecker.fragment";
import "babylon-mmd/esm/Loader/Shaders/textureAlphaChecker.vertex";

import type { IPointerEvent } from "@babylonjs/core";
// import { CubeTexture } from "@babylonjs/core";
// import { VideoTexture } from "@babylonjs/core";
import { MirrorTexture, ParticleSystem, Plane } from "@babylonjs/core";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import type { AbstractEngine } from "@babylonjs/core/Engines/abstractEngine";
import { Layer } from "@babylonjs/core/Layers";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { LoadAssetContainerAsync } from "@babylonjs/core/Loading/sceneLoader";
import { FilesInput } from "@babylonjs/core/Misc/filesInput";
import { ImageProcessingConfiguration } from "@babylonjs/core/Materials/imageProcessingConfiguration";
import { ColorCurves } from "@babylonjs/core/Materials/colorCurves";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Matrix, Vector3 } from "@babylonjs/core/Maths/math.vector";
// import { MeshBuilder } from "@babylonjs/core/Meshes";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
// import { DepthOfFieldEffectBlurLevel } from "@babylonjs/core/PostProcesses";
import { DefaultRenderingPipeline } from "@babylonjs/core/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";
import { Scene } from "@babylonjs/core/scene";
import * as gui from "@babylonjs/gui";
// import { Inspector } from "@babylonjs/inspector";
import { ShadowOnlyMaterial } from "@babylonjs/materials/shadowOnly/shadowOnlyMaterial";
import type { MmdAnimation } from "babylon-mmd/esm/Loader/Animation/mmdAnimation";
// import type { MmdModelLoader } from "babylon-mmd/esm/Loader/mmdModelLoader";

import { MmdStandardMaterialBuilder } from "babylon-mmd/esm/Loader/mmdStandardMaterialBuilder";
// import type { BpmxLoader } from "babylon-mmd/esm/Loader/Optimized/bpmxLoader";
import { BvmdLoader } from "babylon-mmd/esm/Loader/Optimized/bvmdLoader";
import { RegisterDxBmpTextureLoader } from "babylon-mmd/esm/Loader/registerDxBmpTextureLoader";
import { SdefInjector } from "babylon-mmd/esm/Loader/sdefInjector";
// import { VmdLoader } from "babylon-mmd/esm/Loader/vmdLoader";
import { StreamAudioPlayer } from "babylon-mmd/esm/Runtime/Audio/streamAudioPlayer";
import { MmdCamera } from "babylon-mmd/esm/Runtime/mmdCamera";
import type { MmdMesh } from "babylon-mmd/esm/Runtime/mmdMesh";
import { MmdRuntime } from "babylon-mmd/esm/Runtime/mmdRuntime";
import { MmdWasmInstanceTypeMPR } from "babylon-mmd/esm/Runtime/Optimized/InstanceType/multiPhysicsRelease";
import { GetMmdWasmInstance } from "babylon-mmd/esm/Runtime/Optimized/mmdWasmInstance";
import { MultiPhysicsRuntime } from "babylon-mmd/esm/Runtime/Optimized/Physics/Bind/Impl/multiPhysicsRuntime";
import { MmdBulletPhysics } from "babylon-mmd/esm/Runtime/Optimized/Physics/mmdBulletPhysics";
import { PhysicsStaticPlaneShape } from "babylon-mmd/esm/Runtime/Optimized/Physics/Bind/physicsShape";
import { RigidBody } from "babylon-mmd/esm/Runtime/Optimized/Physics/Bind/rigidBody";
import { RigidBodyConstructionInfo } from "babylon-mmd/esm/Runtime/Optimized/Physics/Bind/rigidBodyConstructionInfo";
import { MotionType } from "babylon-mmd/esm/Runtime/Optimized/Physics/Bind/motionType";
// import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
// import havokPhysics from "@babylonjs/havok";
// import type { MmdWasmInstance } from "babylon-mmd";
// import { getMmdWasmInstance } from "babylon-mmd";
// import { MmdWasmAnimation, MmdWasmInstanceTypeSPR, MmdWasmPhysics, MmdWasmRuntime } from "babylon-mmd";
// import ammoPhysics from "babylon-mmd/esm/Runtime/Physics/External/ammo.wasm";
// import ammo from "babylon-mmd/esm/Runtime/Physics/External/ammo.wasm";
// import { MmdAmmoJSPlugin } from "babylon-mmd/esm/Runtime/Physics/mmdAmmoJSPlugin";
// import { MmdAmmoPhysics } from "babylon-mmd/esm/Runtime/Physics/mmdAmmoPhysics";
// import { MmdPhysics } from "babylon-mmd/esm/Runtime/Physics/mmdPhysics";
// import {CounterAPI} from "counterapi";
import miniSearch from "minisearch";

import extraCharDatas from "../res/assets/extras.json";
// import genshinCharDatas from "../res/assets/Genshin/genshin.json";
// import genshinSkinCharDatas from "../res/assets/Genshin/skins.json";
// import hsrCharDatas from "../res/assets/HSR/hsr.json";
// import hsrSkinCharDatas from "../res/assets/HSR/skins.json";
// import wuwaSkinCharDatas from "../res/assets/WuWa/skins.json";
// import wuwaCharDatas from "../res/assets/WuWa/wuwa.json";
// import zzzSkinCharDatas from "../res/assets/ZZZ/skins.json";
// import zzzCharDatas from "../res/assets/ZZZ/zzz.json";
import motionConfig from "../res/cam_motion/motion.json";
import type { ISceneBuilder } from "./baseRuntime";
import { CustomLoadingScreen } from "./CustomLoadingScreen";
import { FirebaseInstance } from "./fb";
// import { MmdPlayerControl } from "babylon-mmd/esm/Runtime/Util/mmdPlayerControl";
import { mobileMmdPlayerControl } from "./mobileMmdPlayerControl";
import type { BaseCharData, GenshinCharData, HSRCharData, ZZZCharData, WuwaCharData, HNACharData, NTECharData, ExtraCharData } from "./sceneBuilder.types";
import { normalize, getFirstDigit, findCharByName, findCharById, findAllCharsByName, filterBy, sortBy } from "./sceneBuilder.utils";
import { afterBuildSingleMaterialDefault, afterBuildSingleMaterialSt } from "./sceneBuilder.materials";
import { createDownloadButton } from "./sceneBuilder.download";

export class SceneBuilder implements ISceneBuilder {
    public async build(canvas: HTMLCanvasElement, engine: AbstractEngine, item: string): Promise<Scene> {
        // for apply SDEF on shadow, outline, depth rendering
        SdefInjector.OverrideEngineCreateEffect(engine);
        const isLocal = window.location.hostname.includes("localhost");
        const firebase = FirebaseInstance.GetInstance();

        // If you want to load json data dynamically, uncomment following lines and comment out above import lines.
        const genshinCharDatas = await (await fetch(`${baseUrl}gi/genshin.json`)).json();
        const genshinSkinCharDatas = await (await fetch(`${baseUrl}gi/skins.json`)).json();
        const hsrCharDatas = await (await fetch(`${baseUrl}hsr/hsr.json`)).json();
        const hsrSkinCharDatas = await (await fetch(`${baseUrl}hsr/skins.json`)).json();
        const zzzCharDatas = await (await fetch(`${baseUrl}zzz/zzz.json`)).json();
        const zzzSkinCharDatas = await (await fetch(`${baseUrl}zzz/skins.json`)).json();
        const wuwaCharDatas = await (await fetch(`${baseUrl}ww/wuwa.json`)).json();
        const wuwaSkinCharDatas = await (await fetch(`${baseUrl}ww/skins.json`)).json();
        const hnaCharDatas = await (await fetch(`${baseUrl}hna/hna.json`)).json();
        const hnaSkinCharDatas = await (await fetch(`${baseUrl}hna/skins.json`)).json();
        const nteCharDatas = await (await fetch(`${baseUrl}nte/nte.json`)).json();
        const nteSkinCharDatas = await (await fetch(`${baseUrl}nte/skins.json`)).json();

        // character json types moved to `./sceneBuilder.types.ts`

        // const counter = new CounterAPI();
        const extraDataArray = extraCharDatas as ExtraCharData[];
        const charDataArray = genshinCharDatas as GenshinCharData[];
        const genshinSkinDataArray = genshinSkinCharDatas as GenshinCharData[];
        const hsrCharDataArray = hsrCharDatas as HSRCharData[];
        const hsrSkinDataArray = hsrSkinCharDatas as HSRCharData[];
        const zzzCharDataArray = zzzCharDatas as ZZZCharData[];
        const zzzSkinDataArray = zzzSkinCharDatas as ZZZCharData[];
        const wuwaCharDataArray = wuwaCharDatas as WuwaCharData[];
        const wuwaSkinDataArray = wuwaSkinCharDatas as WuwaCharData[];
        const hnaCharDataArray = hnaCharDatas as HNACharData[];
        const hnaSkinDataArray = hnaSkinCharDatas as HNACharData[];
        const nteCharDataArray = nteCharDatas as NTECharData[];
        const nteSkinDataArray = nteSkinCharDatas as NTECharData[];
        charDataArray.sort((a, b) => b.id - a.id);
        genshinSkinDataArray.sort((a, b) => b.id - a.id);
        hsrSkinDataArray.sort((a, b) => b.id - a.id);
        zzzSkinDataArray.sort((a, b) => b.id - a.id);
        wuwaSkinDataArray.sort((a, b) => b.id - a.id);
        hsrCharDataArray.sort((a, b) => b.id - a.id);
        zzzCharDataArray.sort((a, b) => b.id - a.id);
        wuwaCharDataArray.sort((a, b) => b.id - a.id);
        hnaCharDataArray.sort((a, b) => b.id - a.id);
        hnaSkinDataArray.sort((a, b) => b.id - a.id);
        nteCharDataArray.sort((a, b) => b.id - a.id);
        nteSkinDataArray.sort((a, b) => b.id - a.id);

        // findCharByName moved to `./sceneBuilder.utils.ts`

        type AllCharData = GenshinCharData | HSRCharData | ZZZCharData | WuwaCharData | NTECharData;
        const allCharDataArray: AllCharData[] = [
            ...charDataArray,
            ...hsrCharDataArray,
            ...zzzCharDataArray,
            ...wuwaCharDataArray,
            ...hnaCharDataArray,
            ...nteCharDataArray
        ];
        const allSkinCharDataArray:  AllCharData[] = [
            ...genshinSkinDataArray,
            ...hsrSkinDataArray,
            ...zzzSkinDataArray,
            ...wuwaSkinDataArray,
            ...hnaSkinDataArray,
            ...nteSkinDataArray
        ];
        const miniSearchInstance = new miniSearch({
            fields: ["name"], // fields to index for full-text search
            storeFields: ["id", "name"], // fields to return with search results
            searchOptions: {
                fuzzy: 0.2,
                prefix: true
            }
        });
        miniSearchInstance.addAll(allCharDataArray);

        // normalize & getFirstDigit moved to `./sceneBuilder.utils.ts`

        const findFirstCharByName = (
            nameToFind: string
        ): [BaseCharData | undefined, string] => {

            const normalizedTarget = normalize(nameToFind);
            const results = miniSearchInstance.search(normalizedTarget);
            console.log(results);
            let fallbackItem: BaseCharData | undefined;
            let tabMode: string;
            if (results.length > 0) {
                const tabById = getFirstDigit(results[0].id);
                if (tabById == 1) {
                    fallbackItem = findCharByName(charDataArray, results[0].name);
                    tabMode = "Genshin";
                } else if (tabById == 2) {
                    fallbackItem = findCharByName(hsrCharDataArray, results[0].name);
                    tabMode = "HSR";
                } else if (tabById == 3) {
                    fallbackItem = findCharByName(zzzCharDataArray, results[0].name);
                    tabMode = "ZZZ";
                } else if (tabById == 4) {
                    fallbackItem = findCharByName(wuwaCharDataArray, results[0].name);
                    tabMode = "WuWa";
                } else if (tabById == 5) {
                    fallbackItem = findCharByName(hnaCharDataArray, results[0].name);
                    tabMode = "HNA";
                } else {
                    fallbackItem = findCharByName(nteCharDataArray, results[0].name);
                    tabMode = "NTE";
                }
                if (!isLocal) {

                    try {
                        // Call without awaiting
                        void firebase.countUp("phoshco", fallbackItem!.name.replace(/\./g, "")).catch((error) => {
                            console.error("Failed count: ", error);
                        });
                    } catch (error) {
                        console.error("Unexpected error during count: ", error);
                    }

                }
            } else {
                fallbackItem = undefined;
				tabMode = "Genshin";
            }
            return [fallbackItem, tabMode];
        };

        const searchCharFunction = (
            nameToFind: string
        ): BaseCharData[] => {
            const normalizedTarget = normalize(nameToFind);
            const results = miniSearchInstance.search(normalizedTarget);
            // console.log(results);
            const fallbackItem: BaseCharData[] = [];
            for (let i = 0; i < results.length; i++) {
                const tabById = getFirstDigit(results[i].id);
                if (tabById == 1) {
                    fallbackItem.push(findCharByName(charDataArray, results[i].name)!);
                } else if (tabById == 2) {
                    fallbackItem.push(findCharByName(hsrCharDataArray, results[i].name)!);
                } else if (tabById == 3) {
                    fallbackItem.push(findCharByName(zzzCharDataArray, results[i].name)!);
                } else if (tabById == 4) {
                    fallbackItem.push(findCharByName(wuwaCharDataArray, results[i].name)!);
                } else if (tabById == 5) {
                    fallbackItem.push(findCharByName(hnaCharDataArray, results[i].name)!);
                } else {
                    fallbackItem.push(findCharByName(nteCharDataArray, results[i].name)!);
                }
            }
            // console.log(fallbackItem);
            return fallbackItem;
        };

        // findCharById, findAllCharsByName, filterBy, sortBy moved to `./sceneBuilder.utils.ts`

        const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        ///////////////
    RegisterDxBmpTextureLoader();
        const materialBuilder = new MmdStandardMaterialBuilder();
        
        materialBuilder.afterBuildSingleMaterial = afterBuildSingleMaterialDefault;

        const materialBuilderSt = new MmdStandardMaterialBuilder();
        
        materialBuilderSt.afterBuildSingleMaterial = afterBuildSingleMaterialSt;

        // if you need outline rendering, comment out following line.
        // materialBuilder.loadOutlineRenderingProperties = (): void => { /* do nothing */ };

        const scene = new Scene(engine);
        let bg_bool = true;
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            bg_bool = true;
            scene.clearColor = new Color4(0.001, 0.001, 0.001, 1.0);
        } else {
            scene.clearColor = new Color4(1, 1, 1, 1.0);
        }

        const advancedTexture = gui.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.layer!.layerMask = 0x10000000;
        advancedTexture.idealWidth = 1000;
        advancedTexture.idealHeight = 1000;
        advancedTexture.useSmallestIdeal = true;

        // scaling for WebXR
        const worldScale = 1;

        const mmdRoot = new TransformNode("mmdRoot", scene);
        mmdRoot.scaling.scaleInPlace(worldScale);
        mmdRoot.position.z = 1;

        const mmdCameraRoot = new TransformNode("mmdRoot", scene);
        mmdCameraRoot.scaling.scaleInPlace(worldScale);
        mmdCameraRoot.position.z = 1;

        // mmd camera for play mmd camera animation
        const mmdCamera = new MmdCamera("mmdCamera", new Vector3(0, 10, 0), scene);
        mmdCamera.maxZ = 5000;
        mmdCamera.minZ = 0.1;
        mmdCamera.parent = mmdRoot;
        mmdCamera.layerMask = 1;

        const defCamPos = new Vector3(0, 10, -20).scaleInPlace(worldScale);
        const camera = new ArcRotateCamera("arcRotateCamera", 0, 0, 25 * worldScale, new Vector3(0, 10 * worldScale, 1), scene);
        camera.maxZ = 100;
        camera.minZ = 0.1;
        camera.setPosition(defCamPos);
        camera.attachControl(canvas, false);
        camera.inertia = 0.8;
        camera.speed = 4 * worldScale;
        camera.zoomToMouseLocation = true;
        camera.wheelDeltaPercentage = 0.1;
        camera.upperRadiusLimit = 100 * worldScale;
        camera.lowerRadiusLimit = 1 * worldScale;
        if (isMobile) {
            camera.pinchDeltaPercentage = 0.002;
        }
        camera.layerMask = 1;

        const stillCamera = new ArcRotateCamera("stillCamera", 0, 0, 25 * worldScale, new Vector3(0, 10 * worldScale, 1), scene);
        stillCamera.maxZ = 100;
        stillCamera.minZ = 0.1;
        stillCamera.setPosition(defCamPos);
        stillCamera.attachControl(canvas, false);
        stillCamera.inertia = 0.8;
        stillCamera.speed = 4 * worldScale;
        stillCamera.zoomToMouseLocation = true;
        stillCamera.wheelDeltaPercentage = 0.1;
        stillCamera.upperRadiusLimit = 100 * worldScale;
        stillCamera.lowerRadiusLimit = 1 * worldScale;
        if (isMobile) {
            stillCamera.pinchDeltaPercentage = 0.002;
        }
        stillCamera.layerMask = 1;

        // const guiCam = new ArcRotateCamera("guiCamera", 0, 0, 25 * worldScale, new Vector3(0, 10 * worldScale, 1), scene);
        const guiCam = new ArcRotateCamera("guiCamera", Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100, new Vector3(0, 20, 0), scene);
        guiCam.layerMask = 0x10000000;

        const hemisphericLight = new HemisphericLight("HemisphericLight", new Vector3(0, 1, 0), scene);
        hemisphericLight.intensity = 0.55;
		hemisphericLight.specular = new Color3(0.05, 0.05, 0.05);
		hemisphericLight.groundColor = new Color3(0.8, 0.8, 0.85);

        const directionalLight = new DirectionalLight("DirectionalLight", new Vector3(0.5, -1, 1), scene);
        directionalLight.intensity = 0.8;
        // set frustum size manually for optimize shadow rendering
        directionalLight.autoCalcShadowZBounds = false;
        directionalLight.autoUpdateExtends = false;
        directionalLight.shadowMaxZ = 20 * worldScale;
        directionalLight.shadowMinZ = -15 * worldScale;
        directionalLight.orthoTop = 18 * worldScale;
        directionalLight.orthoBottom = -3 * worldScale;
        directionalLight.orthoLeft = -10 * worldScale;
        directionalLight.orthoRight = 10 * worldScale;
        directionalLight.shadowOrthoScale = 0;

        const shadowGenerator = new ShadowGenerator(2048, directionalLight, true);
        shadowGenerator.usePercentageCloserFiltering = true;
        shadowGenerator.forceBackFacesOnly = true;
        shadowGenerator.filteringQuality = ShadowGenerator.QUALITY_HIGH;
        shadowGenerator.frustumEdgeFalloff = 0.1;

        // Create a particle system
        const particleSystem = new ParticleSystem("particles", 2000, scene);
        //Texture of each particle
        particleSystem.particleTexture = new Texture("res/assets/flare.png", scene);
        // Where the particles come from
        particleSystem.emitter = Vector3.Zero(); // the starting position
        particleSystem.minEmitBox = new Vector3(-25, -15, -25); // Bottom Left Front
        particleSystem.maxEmitBox = new Vector3(25, 10, 25); // Top Right Back
        // Colors of all particles
        particleSystem.color1 = new Color4(1.0, 1.0, 1.0, 0.9);
        particleSystem.color2 = new Color4(0.5, 0.5, 0.5, 0.9);
        particleSystem.colorDead = new Color4(0.1, 0.1, 0.1, 0.0);
        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.4;
        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;
        // Emission rate
        particleSystem.emitRate = 40;
        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        // Set the gravity of all particles
        particleSystem.gravity = new Vector3(0, -9.81, 0);
        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new Vector3(-7, 8, 3);
        particleSystem.direction2 = new Vector3(7, 8, -3);
        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;
        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;

        particleSystem.renderingGroupId = 1;

        // create mmd runtime with physics (initialized later after audio player using updated wasm/physics APIs)
        let mmdRuntime: MmdRuntime;
        let physicsRuntime: MultiPhysicsRuntime | undefined;
		const PHYSICS_GRAVITY = -15; // Cambia este valor para ajustar la gravedad global

        // physics toggle: enable/disable physics via URL param `?physics=1` or set default here
        //const getUrlFlag = (name: string): string | null => new URLSearchParams(window.location.search).get(name);
        const physicsModeOn = true;

        // Randomly pick name from the list from motionConfig json
        let motionName = motionConfig[Math.floor(Math.random() * motionConfig.length)].name;
        let audioPlayerFile = motionConfig.find((item) => item.name === motionName)!.audioPlayerFile;
        let camMotionFile = motionConfig.find((item) => item.name === motionName)!.camMotionFile;
        let modelMotionFile = motionConfig.find((item) => item.name === motionName)!.modelMotionFile;

        // set audio player
        let audioPlayer = new StreamAudioPlayer(scene);
        audioPlayer.preservesPitch = false;
        // song
        audioPlayer.source = audioPlayerFile;
        // initialize wasm + physics + mmd runtime (updated babylon-mmd APIs)
        if (physicsModeOn) {
            const wasmInstance = await GetMmdWasmInstance(new MmdWasmInstanceTypeMPR());
            physicsRuntime = new MultiPhysicsRuntime(wasmInstance);
            physicsRuntime.setGravity(new Vector3(0, PHYSICS_GRAVITY, 0));
			// -98 Valor actual, MMD original // -50 Gravedad moderada, movimiento mas suave //-30 Cabello y ropa flotan un poco
			// -15 Muy suave, casi en camara lenta // -9.8 Gravedad real de la Tierra
            physicsRuntime.register(scene);

            mmdRuntime = new MmdRuntime(scene, new MmdBulletPhysics(physicsRuntime));
            mmdRuntime.loggingEnabled = false;
            mmdRuntime.autoPhysicsInitialization = false;
            mmdRuntime.register(scene);
            mmdRuntime.setAudioPlayer(audioPlayer);
            // mmdRuntime.playAnimation();
        } else {
            // create runtime without physics
            mmdRuntime = new MmdRuntime(scene);
            mmdRuntime.loggingEnabled = true;
            mmdRuntime.register(scene);
            mmdRuntime.setAudioPlayer(audioPlayer);
        }

        // create youtube like player control
        let mmdPlayerControl = new mobileMmdPlayerControl(scene, mmdRuntime, audioPlayer, isMobile);
        mmdPlayerControl.showPlayerControl();

        // show loading screen
        const customLoadingScreen = new CustomLoadingScreen(canvas);
        engine.loadingScreen = customLoadingScreen;
        engine.displayLoadingUI();

        let loadingTexts: string[] = [];
        const updateLoadingText = (updateIndex: number, text: string): void => {
            loadingTexts[updateIndex] = text;
            customLoadingScreen.loadingTextDiv.innerHTML = "<br/><br/><br/><br/>" + loadingTexts.join("<br/><br/>");
        };

        let promises: Promise<any>[] = [];

        // for load .bvmd file, we use BvmdLoader. if you want to load .vmd or .vpd file, use VmdLoader / VpdLoader
        const bvmdLoader = new BvmdLoader(scene);
        bvmdLoader.loggingEnabled = true;

        // camera motion (gracefully handle unsupported BVMD versions)
        const safeLoadBvmd = async (type: string, url: string, onProgress?: any) => {
            try {
                return await bvmdLoader.loadAsync(type, url, onProgress);
            } catch (e: any) {
                // if BVMD version unsupported, log and return undefined so caller can fallback
                console.warn("BVMD load failed, continuing without motion:", e?.message || e);
                return undefined;
            }
        };

        promises.push(safeLoadBvmd("motion", camMotionFile, (event: any) => updateLoadingText(0, `Loading camera... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`)));

        // model motion
        promises.push(safeLoadBvmd("motion", modelMotionFile, (event: any) => updateLoadingText(1, `Loading motion... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`)));

        let charScreenMode = true;
        let charScreenElement = "Pyro";
        // model
        let prevCharName: string;
        let prevCharId: number;
        let chosenCharName = item;
        let chosenChar: BaseCharData | undefined;
        let tabMode = "Genshin";
        let firstTabMode = tabMode;
        [chosenChar, firstTabMode] = findFirstCharByName(chosenCharName);
		if (!chosenChar) {
			// No hay personaje inicial: el usuario debe elegir uno desde la UI de busqueda
			chosenCharName = "";
			prevCharId = 0;
			charScreenElement = "Pyro";
		} else {
			chosenCharName = chosenChar.name;
			prevCharId = chosenChar.id;
			charScreenElement = chosenChar.element;
		}
        // if (firstTabMode == "ZZZ") {
        //     charScreenMode = false;
        // }
        if (firstTabMode == "HSR") {
            charScreenElement = "HSR";
        } else if (firstTabMode != "Genshin") {
            charScreenElement = "Universal";
        }

        if (!chosenChar || !chosenChar.directory || !chosenChar.pmx) {
			// Fallback de arranque: sin personaje valido se carga Hu Tao
			chosenChar = findCharByName(charDataArray, "Hu Tao")!;
			chosenCharName = chosenChar.name;
			prevCharId = chosenChar.id;
			charScreenElement = chosenChar.element;
			firstTabMode = "Genshin";
		}
		promises.push(LoadAssetContainerAsync(
			baseUrl + chosenChar.directory + "/" + chosenChar.pmx,
			scene,
			{
				onProgress: (event) => updateLoadingText(2, `Loading model... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`),
				pluginOptions: {
					mmdmodel: {
						loggingEnabled: true,
						materialBuilder: materialBuilder
					}
				}
			}
		)
		);

        // physics
        promises.push((async(): Promise<void> => {
            updateLoadingText(3, "Loading physics engine...");
            // const physicsInstance = await havokPhysics();
            // const physicsPlugin = new HavokPlugin(true, physicsInstance);
            // physicsPlugin;
            // const physicsInstance = await ammoPhysics();
            // const physicsPlugin = new MmdAmmoJSPlugin(true, physicsInstance);
            // scene.enablePhysics(new Vector3(0, -98, 0), physicsPlugin);
            updateLoadingText(3, "Loading physics engine... Done");
        })());

        // stage
        if (charScreenMode) {
            if (!isMobile) {
                particleSystem.start();
            }
            promises.push(LoadAssetContainerAsync(
                "res/stages/GenshinCharacterSphere" + "/" + "CharacterSphere_" + charScreenElement + "V.pmx",
                scene,
                {
                    onProgress: (event) => updateLoadingText(4, `Loading stage... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`),
                    pluginOptions: {
                        mmdmodel: {
                            loggingEnabled: true,
                            materialBuilder: materialBuilderSt,
                            buildSkeleton: false,
                            buildMorph: false,
                        }
                    }
                }
            )
            );
        }

        // wait for all promises. parallel loading is faster than sequential loading.
        let loadResults = await Promise.all(promises);

        // hide loading screen
        scene.onAfterRenderObservable.addOnce(() => engine.hideLoadingUI());
        scene.activeCameras = [stillCamera, guiCam];

        let theDiff = 1.66;
        let theHeight = 69;
        let boneWorldMatrixCam = new Matrix();

        let characterModelPromiseRes = loadResults[2];
        characterModelPromiseRes.addAllToScene();
        let modelMesh = characterModelPromiseRes.rootNodes[0] as MmdMesh;
        modelMesh.parent = mmdRoot;

        let modelMeshSt: MmdMesh;
        if (charScreenMode) {
            const characterModelPromiseResSt = loadResults[4];
            characterModelPromiseResSt.addAllToScene();
            modelMeshSt = characterModelPromiseResSt.rootNodes[0] as MmdMesh;
            modelMeshSt.parent = mmdRoot;
        }

        shadowGenerator.addShadowCaster(modelMesh);
        // modelMesh.receiveShadows = true;
        for (const mesh of modelMesh.metadata.meshes) mesh.receiveShadows = true;

        const ground = CreateGround("ground1", { width: 50, height: 50, subdivisions: 2, updatable: false }, scene);

        ground.receiveShadows = true;
        const groundMaterial = new StandardMaterial("GroundMaterial", scene);
        groundMaterial.diffuseColor = new Color3(0.14, 0.14, 0.14);
        groundMaterial.specularPower = 128;
        const groundReflectionTexture = groundMaterial.reflectionTexture = new MirrorTexture("MirrorTexture", 50, scene, true);
        groundReflectionTexture.mirrorPlane = Plane.FromPositionAndNormal(ground.position, ground.getFacetNormal(0).scale(-1));
        groundReflectionTexture.renderList = [...modelMesh.metadata.meshes];
        groundReflectionTexture.level = 0.45;
        groundReflectionTexture.adaptiveBlurKernel = 16;
        // ground.material = groundMaterial;

        const shadowOnlyMaterial = new ShadowOnlyMaterial("shadowOnly", scene);
        shadowOnlyMaterial.activeLight = directionalLight;
        shadowOnlyMaterial.alpha = 0.4;
        ground.material = shadowOnlyMaterial;

        ground.receiveShadows = true;
        ground.parent = mmdRoot;

        let mmdModel = mmdRuntime.createMmdModel(modelMesh, {
            buildPhysics: physicsModeOn ? { worldId: 0, disableOffsetForConstraintFrame: true } : false
        });
        if (physicsModeOn) {
            scene.onAfterRenderObservable.addOnce(() => {
                mmdRuntime.initializeAllMmdModelsPhysics(true);
            });
        }
        // const theCharAnimation = physicsModeOn
        //     ? new MmdWasmAnimation(loadResults[1], wasmInstance!, scene)
        //     : (loadResults[1] as MmdAnimation);
        let theCharAnimation = loadResults[1] as MmdAnimation | undefined;

        // for scaling camera to model height
        let headBone = mmdModel.runtimeBones.find((bone: any) => bone.name === "頭");

        // make sure directional light follow the model
        let bodyBone = mmdModel.runtimeBones.find((bone) => bone.name === "センター");
        let boneWorldMatrix = new Matrix();

        if (headBone != undefined && bodyBone != undefined) {
            // create and set runtime animation handle for the model (updated API)
            if (theCharAnimation) {
                const modelAnimationHandle = mmdModel.createRuntimeAnimation(theCharAnimation as any);
                mmdModel.setRuntimeAnimation(modelAnimationHandle);
            }
            scene.onBeforeDrawPhaseObservable.addOnce(() => {
                headBone!.getWorldMatrixToRef(boneWorldMatrixCam).multiplyToRef(modelMesh.getWorldMatrix(), boneWorldMatrixCam);
                boneWorldMatrixCam.getTranslationToRef(mmdCameraRoot.position);
                // boneWorldMatrixCam.getTranslationToRef(mmdCameraRoot.position);
                theDiff = theDiff - mmdCameraRoot.position.y;
                theHeight = mmdCameraRoot.position.y;
            });

            scene.onBeforeRenderObservable.addOnce(() => {
                bodyBone!.getWorldMatrixToRef(boneWorldMatrix).multiplyToRef(modelMesh.getWorldMatrix(), boneWorldMatrix);
                // bodyBone!.getFinalMatrix()!.multiplyToRef(modelMesh.getWorldMatrix(), boneWorldMatrix);
                boneWorldMatrix.getTranslationToRef(directionalLight.position);
                directionalLight.position.y -= 10 * worldScale;
            });
        }

        // create and set runtime animation handle for the camera (updated API)
        let cameraAnimationHandle: any;
        
        if (loadResults[0]) {
            cameraAnimationHandle = mmdCamera.createRuntimeAnimation(loadResults[0] as any);
            mmdCamera.setRuntimeAnimation(cameraAnimationHandle);
        }
        mmdCamera.storeState();
        // attempt to register camera with runtime if available
        // if (typeof (mmdRuntime as any).setCamera === "function") {
        //     try { (mmdRuntime as any).setCamera(mmdCamera); } catch { /* ignore */ }
        // }
        mmdRuntime.addAnimatable(mmdCamera);

        // optimize scene when all assets are loaded
        scene.onAfterRenderObservable.addOnce(() => {
            scene.freezeMaterials();

            if (skinButton != undefined) {
                skinButton.isEnabled = true;
            }

            const meshes = scene.meshes;
            for (let i = 0, len = meshes.length; i < len; ++i) {
                const mesh = meshes[i];
                mesh.freezeWorldMatrix();
                mesh.doNotSyncBoundingInfo = true;
                mesh.isPickable = false;
                mesh.doNotSyncBoundingInfo = true;
                mesh.alwaysSelectAsActiveMesh = true;
            }

            scene.skipPointerMovePicking = true;
            scene.skipPointerDownPicking = true;
            scene.skipPointerUpPicking = true;
            scene.skipFrustumClipping = true;
            scene.blockMaterialDirtyMechanism = true;
            // audioPlayer.mute();
            if (!isLocal) {

                try {
                    // Call without awaiting
                    void firebase.countUp("phoshco", "hoyo").catch((error) => {
                        console.error("Failed count: ", error);
                    });
                } catch (error) {
                    console.error("Unexpected error during count: ", error);
                }
            }
        });

        // if you want ground collision, uncomment following lines.
        // const groundRigidBody = new PhysicsBody(ground, PhysicsMotionType.STATIC, true, scene);
        // groundRigidBody.shape = new PhysicsShapeBox(
        //     new Vector3(0, -1, 0),
        //     new Quaternion(),
        //     new Vector3(100, 2, 100), scene);

        // create ground rigid body for physics runtime (if available)
        let groundBodyCreated = false;
        if (physicsRuntime && !groundBodyCreated) {
            groundBodyCreated = true;
            const info = new RigidBodyConstructionInfo((physicsRuntime as any).wasmInstance);
            info.motionType = MotionType.Static;
            info.shape = new PhysicsStaticPlaneShape(physicsRuntime, new Vector3(0, 1, 0), 0);
            const groundBody = new RigidBody(physicsRuntime, info);
            physicsRuntime.addRigidBody(groundBody, 0);
        }

        const defaultPipeline = new DefaultRenderingPipeline("default", true, scene, [mmdCamera, camera, stillCamera]);
        defaultPipeline.samples = 4;
        // defaultPipeline.bloomEnabled = true; (Fucker is the culprit slowing everything down)
        // defaultPipeline.bloomScale = 10;
        defaultPipeline.chromaticAberrationEnabled = true;
        defaultPipeline.chromaticAberration.aberrationAmount = 1;
        // defaultPipeline.depthOfFieldEnabled = true;
        // defaultPipeline.depthOfField.focusDistance = scene.activeCamera.position.z;
        // defaultPipeline.depthOfField.focalLength = 50;

        defaultPipeline.fxaaEnabled = true;
		defaultPipeline.sharpenEnabled = true;
		defaultPipeline.sharpen.edgeAmount = 0.3;
		defaultPipeline.sharpen.colorAmount = 1.0;
        defaultPipeline.imageProcessing.toneMappingEnabled = true;
		defaultPipeline.imageProcessing.exposure = 1.0;
		defaultPipeline.imageProcessing.contrast = 1.15;
		const colorCurves = new ColorCurves();
		colorCurves.globalHue = 0;
		colorCurves.globalDensity = 0;
		colorCurves.globalSaturation = 60;
		colorCurves.shadowsHue = 220;
		colorCurves.shadowsDensity = 30;
		colorCurves.shadowsSaturation = 20;
		colorCurves.highlightsHue = 0;
		colorCurves.highlightsDensity = 0;
		colorCurves.highlightsSaturation = 0;
		defaultPipeline.imageProcessing.colorCurves = colorCurves;
		defaultPipeline.imageProcessing.colorCurvesEnabled = true;
        defaultPipeline.imageProcessing.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
        defaultPipeline.imageProcessing.vignetteWeight = 0.5;
		defaultPipeline.imageProcessing.vignetteStretch = 1.0;
        defaultPipeline.imageProcessing.vignetteColor = new Color4(0, 0, 0, 0);
        defaultPipeline.imageProcessing.vignetteEnabled = true;

        defaultPipeline.depthOfFieldEnabled = false;
        // defaultPipeline.depthOfFieldBlurLevel = DepthOfFieldEffectBlurLevel.Medium;
        // defaultPipeline.depthOfField.fStop = 0.05;
        // defaultPipeline.depthOfField.focalLength = 20;

        let cameraPos = 69;

        const layer = new Layer("", "res/stages/hoyo.png", scene, true, new Color4(1, 1, 1, 1));
        // layer.layerMask = 0x10000000;
        const light_bg = new Texture("res/stages/hoyo.png", scene, true);
        const dark_bg = new Texture("res/stages/hoyo_dark.png", scene, true);
        if (bg_bool) {
            layer.texture = dark_bg;
        }

        const resizeObserver = new ResizeObserver(() => {
            const canvasAspectRatio = canvas.width / canvas.height;
            if (canvasAspectRatio > 1) {
                layer.scale.y = canvasAspectRatio;
                layer.scale.x = 1;

                light_bg.uScale = 1;
                light_bg.vScale = 1 / layer.scale.y;
                light_bg.uOffset = 0;
                light_bg.vOffset = (1 - light_bg.vScale) * 0.5;

                dark_bg.uScale = 1;
                dark_bg.vScale = 1 / layer.scale.y;
                dark_bg.uOffset = 0;
                dark_bg.vOffset = (1 - dark_bg.vScale) * 0.5;
            } else {
                layer.scale.y = 1;
                layer.scale.x = 1 / canvasAspectRatio;

                light_bg.uScale = 1 / layer.scale.x;
                light_bg.vScale = 1;
                light_bg.uOffset = (1 - light_bg.uScale) * 0.5;
                light_bg.vOffset = 0;

                dark_bg.uScale = 1 / layer.scale.x;
                dark_bg.vScale = 1;
                dark_bg.uOffset = (1 - dark_bg.uScale) * 0.5;
                dark_bg.vOffset = 0;
            }
        });
        resizeObserver.observe(canvas);
        layer.render;

        // GUI

        const debugblock = new gui.TextBlock();
        debugblock.widthInPixels = 100;
        debugblock.heightInPixels = 50;
        debugblock.left = 0;
        debugblock.text = "lol"; // `${mmdCameraRoot.position.y}`;
        debugblock.fontSize = 16;
        debugblock.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        debugblock.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        debugblock.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_BOTTOM;
        debugblock.color = "black";
        advancedTexture.addControl(debugblock);
        debugblock.isVisible = false;

        const textblock = new gui.TextBlock();
        textblock.widthInPixels = 100;
        textblock.heightInPixels = 50;
        textblock.left = 0;
        textblock.text = `${scene.activeCameras[0].name}`;
        textblock.fontSize = 16;
        textblock.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        textblock.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        textblock.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        textblock.color = "black";
        advancedTexture.addControl(textblock);
        textblock.isVisible = false;
        
        const iconWidthHeight = isMobile ? "100px" : "50px";

        const disclaimerText = new gui.TextBlock();
        disclaimerText.resizeToFit = true;
        disclaimerText.left = 0;
        disclaimerText.top = 0;
        disclaimerText.paddingTop = 10;
        disclaimerText.paddingRight = 10;
        disclaimerText.text = "Double click / tap to change camera mode.";
        disclaimerText.fontSize = isMobile ? 25 : 16;
        disclaimerText.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_CENTER;
        disclaimerText.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        disclaimerText.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        disclaimerText.color = "grey";
        advancedTexture.addControl(disclaimerText);
        disclaimerText.isVisible = true;

        const supportButton = gui.Button.CreateImageOnlyButton("but", "res/assets/support.png");
        supportButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        supportButton.left = -10;
        supportButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        supportButton.top = isMobile ? "50px" : "30px";
        supportButton.width = iconWidthHeight;
        supportButton.height = iconWidthHeight;
        supportButton.thickness = 0;
        advancedTexture.addControl(supportButton);
        supportButton.onPointerClickObservable.add(function() {
            window.open("https://ko-fi.com/phoshco", "_blank");
        });

        const showButton = gui.Button.CreateImageOnlyButton("but", "res/assets/menu.png");
        showButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        showButton.left = "10px";
        showButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        showButton.top = "10px";
        showButton.width = iconWidthHeight;
        showButton.height = iconWidthHeight;
        showButton.thickness = 0;
        advancedTexture.addControl(showButton);
		const downloadBtn = createDownloadButton(advancedTexture, isMobile, iconWidthHeight, bg_bool);
		// Corregir posicion del boton PMX al nuevo layout (247px = 4K(185)+26+5+CG(216)+26+5)
		{
			const pmxCtrl = advancedTexture.getControlByName("downloadBtn") as gui.Button | null;
			if (pmxCtrl) pmxCtrl.top = "247px";
		}
		
		// ── Panel de Color Grading ──────────────────────────────────────────────

		const cgPanelWidth = isMobile ? "640px" : "500px";
		const cgPanelHeight = isMobile ? "780px" : "560px";
		const cgFontSize = isMobile ? 18 : 12;
		const cgSliderHeight = isMobile ? "36px" : "22px";
		const cgLabelHeight = isMobile ? "30px" : "18px";
		const cgColWidth = isMobile ? "310px" : "238px";

		const cgToggleButton = gui.Button.CreateSimpleButton("cgToggle", "CG");
		cgToggleButton.width = "60px";
		cgToggleButton.height = "26px";
		cgToggleButton.color = "white";
		cgToggleButton.background = "rgba(40,40,40,0.8)";
		cgToggleButton.cornerRadius = 5;
		cgToggleButton.thickness = 0;
		cgToggleButton.fontSize = 11;
		cgToggleButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		cgToggleButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
		cgToggleButton.left = "-10px";
		cgToggleButton.top = "216px";
		advancedTexture.addControl(cgToggleButton);
		
		// ── Boton New PJ ────────────────────────────────────────────────────────
		const newPjButton = gui.Button.CreateSimpleButton("newPjBtn", "+ PJ");
		newPjButton.width = "60px";
		newPjButton.height = "26px";
		newPjButton.color = "white";
		newPjButton.background = "rgba(40,40,40,0.8)";
		newPjButton.cornerRadius = 5;
		newPjButton.thickness = 0;
		newPjButton.fontSize = 11;
		newPjButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		newPjButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
		newPjButton.left = "-10px";
		newPjButton.top = "278px";
		advancedTexture.addControl(newPjButton);

		// ── Boton PHY ────────────────────────────────────────────────────────
		const phyToggleButton = gui.Button.CreateSimpleButton("phyToggle", "PHY");
		phyToggleButton.width = "60px";
		phyToggleButton.height = "26px";
		phyToggleButton.color = "white";
		phyToggleButton.background = "rgba(40,40,40,0.8)";
		phyToggleButton.cornerRadius = 5;
		phyToggleButton.thickness = 0;
		phyToggleButton.fontSize = 11;
		phyToggleButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		phyToggleButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
		phyToggleButton.left = "-10px";
		phyToggleButton.top = "340px";
		advancedTexture.addControl(phyToggleButton);

		// ── Panel PHY ─────────────────────────────────────────────────────────
		const phyPanel = new gui.Rectangle("phyPanel");
		phyPanel.width = "260px";
		phyPanel.height = "200px";
		phyPanel.cornerRadius = 10;
		phyPanel.thickness = 1;
		phyPanel.color = "rgba(255,255,255,0.2)";
		phyPanel.background = "rgba(15,15,15,0.88)";
		phyPanel.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		phyPanel.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
		phyPanel.left = "-80px";
		phyPanel.top = "340px";
		phyPanel.isVisible = false;
		advancedTexture.addControl(phyPanel);

		const phyStack = new gui.StackPanel("phyStack");
		phyStack.width = "100%";
		phyStack.height = "100%";
		phyStack.paddingLeft = "12px";
		phyStack.paddingRight = "12px";
		phyStack.paddingTop = "10px";
		phyStack.paddingBottom = "10px";
		phyPanel.addControl(phyStack);

		// Titulo
		const phyTitle = new gui.TextBlock();
		phyTitle.text = "Fisica - Gravedad";
		phyTitle.color = "rgba(180,220,255,1)";
		phyTitle.fontSize = 13;
		phyTitle.height = "22px";
		phyTitle.fontWeight = "bold";
		phyTitle.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		phyStack.addControl(phyTitle);

		// Label con valor actual
		let currentGravity = 50;
		const phyValueLabel = new gui.TextBlock();
		phyValueLabel.text = "Valor actual: " + currentGravity;
		phyValueLabel.color = "rgba(200,200,200,1)";
		phyValueLabel.fontSize = 12;
		phyValueLabel.height = "20px";
		phyValueLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		phyStack.addControl(phyValueLabel);

		// Slider
		const phySlider = new gui.Slider();
		phySlider.minimum = 0;
		phySlider.maximum = 150;
		phySlider.value = currentGravity;
		phySlider.height = isMobile ? "36px" : "24px";
		phySlider.width = "100%";
		phySlider.color = "rgba(120,180,255,1)";
		phySlider.background = "rgba(60,60,60,1)";
		phySlider.thumbWidth = isMobile ? 24 : 16;
		phySlider.isThumbCircle = true;
		phySlider.onValueChangedObservable.add((val) => {
			currentGravity = Math.round(val);
			phyValueLabel.text = "Valor actual: " + currentGravity;
		});
		phyStack.addControl(phySlider);

		// Separador
		const phySep = new gui.Rectangle();
		phySep.width = "100%";
		phySep.height = "8px";
		phySep.thickness = 0;
		phySep.background = "transparent";
		phyStack.addControl(phySep);

		// Boton Aplicar
		const phyApplyButton = gui.Button.CreateSimpleButton("phyApply", "Aplicar");
		phyApplyButton.width = "100%";
		phyApplyButton.height = "30px";
		phyApplyButton.color = "white";
		phyApplyButton.background = "rgba(50,100,180,0.9)";
		phyApplyButton.cornerRadius = 6;
		phyApplyButton.thickness = 0;
		phyApplyButton.fontSize = 12;
		phyApplyButton.onPointerClickObservable.add(() => {
			if (physicsRuntime) {
				physicsRuntime.setGravity(new Vector3(0, -currentGravity, 0));
			}
			phyApplyButton.background = "rgba(30,140,60,0.9)";
			phyApplyButton.textBlock!.text = "Aplicado!";
			setTimeout(() => {
				phyApplyButton.background = "rgba(50,100,180,0.9)";
				phyApplyButton.textBlock!.text = "Aplicar";
			}, 1200);
		});
		phyStack.addControl(phyApplyButton);

		// Toggle del panel
		phyToggleButton.onPointerClickObservable.add(() => {
			phyPanel.isVisible = !phyPanel.isVisible;
			if (phyPanel.isVisible) cgPanel.isVisible = false;
		});

		const cgPanel = new gui.Rectangle("cgPanel");
		cgPanel.width = cgPanelWidth;
		cgPanel.height = cgPanelHeight;
		cgPanel.cornerRadius = 10;
		cgPanel.thickness = 1;
		cgPanel.color = "rgba(255,255,255,0.2)";
		cgPanel.background = "rgba(15,15,15,0.88)";
		cgPanel.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
		cgPanel.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
		cgPanel.left = "-80px";
		cgPanel.top = "216px";
		cgPanel.isVisible = false;
		advancedTexture.addControl(cgPanel);

		// Grid de dos columnas para dividir el panel
		const cgGrid = new gui.Grid("cgGrid");
		cgGrid.width = "100%";
		cgGrid.height = "100%";
		cgGrid.addColumnDefinition(0.5);
		cgGrid.addColumnDefinition(0.5);
		cgGrid.addRowDefinition(1.0);
		cgPanel.addControl(cgGrid);

		// Divisor vertical entre columnas
		const cgDivider = new gui.Rectangle("cgDivider");
		cgDivider.width = "1px";
		cgDivider.height = "92%";
		cgDivider.background = "rgba(255,255,255,0.1)";
		cgDivider.thickness = 0;
		cgDivider.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_CENTER;
		cgDivider.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_CENTER;
		cgPanel.addControl(cgDivider);

		// ScrollViewer columna IZQUIERDA (controles actuales)
		const cgScrollLeft = new gui.ScrollViewer("cgScrollLeft");
		cgScrollLeft.width = "100%";
		cgScrollLeft.height = "100%";
		cgScrollLeft.thickness = 0;
		cgScrollLeft.barSize = isMobile ? 10 : 6;
		cgScrollLeft.barColor = "rgba(120,120,180,0.6)";
		cgGrid.addControl(cgScrollLeft, 0, 0);

		const cgStack = new gui.StackPanel("cgStack");
		cgStack.width = "100%";
		cgStack.isVertical = true;
		cgStack.paddingTop = "8px";
		cgStack.paddingLeft = "10px";
		cgStack.paddingRight = "6px";
		cgScrollLeft.addControl(cgStack);

		// ScrollViewer columna DERECHA (controles nuevos)
		const cgScrollRight = new gui.ScrollViewer("cgScrollRight");
		cgScrollRight.width = "100%";
		cgScrollRight.height = "100%";
		cgScrollRight.thickness = 0;
		cgScrollRight.barSize = isMobile ? 10 : 6;
		cgScrollRight.barColor = "rgba(120,120,180,0.6)";
		cgGrid.addControl(cgScrollRight, 0, 1);

		const cgStackRight = new gui.StackPanel("cgStackRight");
		cgStackRight.width = "100%";
		cgStackRight.isVertical = true;
		cgStackRight.paddingTop = "8px";
		cgStackRight.paddingLeft = "6px";
		cgStackRight.paddingRight = "10px";
		cgScrollRight.addControl(cgStackRight);

		function makeCGLabel(text: string): gui.TextBlock {
			const label = new gui.TextBlock();
			label.text = text;
			label.color = "rgba(200,200,200,1)";
			label.fontSize = cgFontSize;
			label.height = cgLabelHeight;
			label.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
			return label;
		}

		function makeCGSlider(
			min: number,
			max: number,
			initial: number,
			onChange: (val: number) => void
		): gui.Slider {
			const slider = new gui.Slider();
			slider.minimum = min;
			slider.maximum = max;
			slider.value = initial;
			slider.height = cgSliderHeight;
			slider.width = "100%";
			slider.color = "rgba(120,180,255,1)";
			slider.background = "rgba(60,60,60,1)";
			slider.thumbWidth = isMobile ? 24 : 14;
			slider.isThumbCircle = true;
			slider.onValueChangedObservable.add((val) => {
				onChange(val);
			});
			return slider;
		}
		
		function makeRightLabel(text: string): gui.TextBlock {
			const label = new gui.TextBlock();
			label.text = text;
			label.color = "rgba(200,200,200,1)";
			label.fontSize = cgFontSize;
			label.height = cgLabelHeight;
			label.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
			return label;
		}

		function makeRightSlider(
			min: number,
			max: number,
			initial: number,
			onChange: (val: number) => void
		): gui.Slider {
			const slider = new gui.Slider();
			slider.minimum = min;
			slider.maximum = max;
			slider.value = initial;
			slider.height = cgSliderHeight;
			slider.width = "100%";
			slider.color = "rgba(120,180,255,1)";
			slider.background = "rgba(60,60,60,1)";
			slider.thumbWidth = isMobile ? 24 : 14;
			slider.isThumbCircle = true;
			slider.onValueChangedObservable.add((val) => {
				onChange(val);
			});
			return slider;
		}
		
		// ── Sistema de presets ──────────────────────────────────────────────────

		interface CGPreset {
			name: string;
			exposure: number;
			contrast: number;
			saturation: number;
			density: number;
			shadowsHue: number;
			shadowsDensity: number;
			vignetteWeight: number;
			sharpEdge: number;
			sharpColor: number;
			bloomEnabled: boolean;
			bloomWeight: number;
			bloomThreshold: number;
			aberration: number;
			hlSat: number;
			midSat: number;
			shSat: number;
			hlDen: number;
			midDen: number;
		}

		const STORAGE_KEY = "cg-presets";
		let cgPresets: CGPreset[] = [];
		let cgSelectedPresetIndex = -1;

		// Cargar presets guardados al iniciar
		async function loadPresetsFromStorage(): Promise<void> {
			try {
				const result = localStorage.getItem(STORAGE_KEY);
				if (result) {
					cgPresets = JSON.parse(result);
					refreshPresetList();
				}
			} catch {
				cgPresets = [];
			}
		}

		async function savePresetsToStorage(): Promise<void> {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(cgPresets));
			} catch (e) {
				console.error("Error al guardar presets:", e);
			}
		}

		function getCurrentValues(): CGPreset {
			return {
				name: "",
				exposure: defaultPipeline.imageProcessing.exposure,
				contrast: defaultPipeline.imageProcessing.contrast,
				saturation: colorCurves.globalSaturation,
				density: colorCurves.globalDensity,
				shadowsHue: colorCurves.shadowsHue,
				shadowsDensity: colorCurves.shadowsDensity,
				vignetteWeight: defaultPipeline.imageProcessing.vignetteWeight,
				sharpEdge: defaultPipeline.sharpen.edgeAmount,
				sharpColor: defaultPipeline.sharpen.colorAmount,
				bloomEnabled: defaultPipeline.bloomEnabled,
				bloomWeight: defaultPipeline.bloomWeight,
				bloomThreshold: defaultPipeline.bloomThreshold,
				aberration: defaultPipeline.chromaticAberration.aberrationAmount,
				hlSat: colorCurves.highlightsSaturation,
				midSat: colorCurves.midtonesSaturation,
				shSat: colorCurves.shadowsSaturation,
				hlDen: colorCurves.highlightsDensity,
				midDen: colorCurves.midtonesDensity,
			};
		}

		function applyPreset(preset: CGPreset): void {
			defaultPipeline.imageProcessing.exposure = preset.exposure;
			defaultPipeline.imageProcessing.contrast = preset.contrast;
			colorCurves.globalSaturation = preset.saturation;
			colorCurves.globalDensity = preset.density;
			colorCurves.shadowsHue = preset.shadowsHue;
			colorCurves.shadowsDensity = preset.shadowsDensity;
			defaultPipeline.imageProcessing.vignetteWeight = preset.vignetteWeight;
			sliderExposure.value = preset.exposure;
			sliderContrast.value = preset.contrast;
			sliderSat.value = preset.saturation;
			sliderDensity.value = preset.density;
			sliderShHue.value = preset.shadowsHue;
			sliderShDen.value = preset.shadowsDensity;
			sliderVig.value = preset.vignetteWeight;
			// Nuevos campos con fallback para presets viejos guardados
			if (preset.sharpEdge !== undefined) {
				defaultPipeline.sharpen.edgeAmount = preset.sharpEdge;
				sliderSharpEdge.value = preset.sharpEdge;
			}
			if (preset.sharpColor !== undefined) {
				defaultPipeline.sharpen.colorAmount = preset.sharpColor;
				sliderSharpColor.value = preset.sharpColor;
			}
			if (preset.bloomEnabled !== undefined) {
				defaultPipeline.bloomEnabled = preset.bloomEnabled;
				bloomToggle.background = preset.bloomEnabled ? "rgba(0,150,80,0.9)" : "rgba(60,60,60,1)";
				if (bloomToggle.textBlock) bloomToggle.textBlock.text = preset.bloomEnabled ? "ON" : "OFF";
			}
			if (preset.bloomWeight !== undefined) {
				defaultPipeline.bloomWeight = preset.bloomWeight;
				sliderBloomWeight.value = preset.bloomWeight;
			}
			if (preset.bloomThreshold !== undefined) {
				defaultPipeline.bloomThreshold = preset.bloomThreshold;
				sliderBloomThreshold.value = preset.bloomThreshold;
			}
			if (preset.aberration !== undefined) {
				defaultPipeline.chromaticAberration.aberrationAmount = preset.aberration;
				sliderChroma.value = preset.aberration;
			}
			if (preset.hlSat !== undefined) { colorCurves.highlightsSaturation = preset.hlSat; sliderHlSat.value = preset.hlSat; }
			if (preset.midSat !== undefined) { colorCurves.midtonesSaturation = preset.midSat; sliderMidSat.value = preset.midSat; }
			if (preset.shSat !== undefined) { colorCurves.shadowsSaturation = preset.shSat; sliderShSat.value = preset.shSat; }
			if (preset.hlDen !== undefined) { colorCurves.highlightsDensity = preset.hlDen; sliderHlDen.value = preset.hlDen; }
			if (preset.midDen !== undefined) { colorCurves.midtonesDensity = preset.midDen; sliderMidDen.value = preset.midDen; }
		}

		// Titulo seccion presets
		const presetTitleLabel = new gui.TextBlock();
		presetTitleLabel.text = "Presets";
		presetTitleLabel.color = "rgba(180,180,255,1)";
		presetTitleLabel.fontSize = cgFontSize + 1;
		presetTitleLabel.height = cgLabelHeight;
		presetTitleLabel.fontWeight = "bold";
		presetTitleLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		cgStack.addControl(presetTitleLabel);

		// Lista de presets (scroll con StackPanel dentro de ScrollViewer)
		const presetScrollViewer = new gui.ScrollViewer("presetScroll");
		presetScrollViewer.width = "100%";
		presetScrollViewer.height = isMobile ? "160px" : "100px";
		presetScrollViewer.thickness = 1;
		presetScrollViewer.color = "rgba(255,255,255,0.1)";
		presetScrollViewer.background = "rgba(30,30,30,0.8)";
		presetScrollViewer.barSize = isMobile ? 12 : 8;
		presetScrollViewer.barColor = "rgba(120,120,180,0.8)";
		cgStack.addControl(presetScrollViewer);

		const presetListStack = new gui.StackPanel("presetListStack");
		presetListStack.width = "100%";
		presetListStack.isVertical = true;
		presetScrollViewer.addControl(presetListStack);

		function refreshPresetList(): void {
			presetListStack.clearControls();
			if (cgPresets.length === 0) {
				const emptyLabel = new gui.TextBlock();
				emptyLabel.text = "Sin presets guardados";
				emptyLabel.color = "rgba(150,150,150,1)";
				emptyLabel.fontSize = cgFontSize;
				emptyLabel.height = cgLabelHeight;
				presetListStack.addControl(emptyLabel);
				return;
			}
			for (let i = 0; i < cgPresets.length; i++) {
				const idx = i;
				const presetRow = new gui.Grid();
				presetRow.height = cgSliderHeight;
				presetRow.width = "100%";
				presetRow.addColumnDefinition(0.7);
				presetRow.addColumnDefinition(0.3);

				const presetNameBtn = gui.Button.CreateSimpleButton("pBtn" + idx, cgPresets[idx].name);
				presetNameBtn.color = cgSelectedPresetIndex === idx ? "rgba(120,180,255,1)" : "white";
				presetNameBtn.background = "rgba(0,0,0,0)";
				presetNameBtn.thickness = 0;
				presetNameBtn.fontSize = cgFontSize;
				presetNameBtn.textBlock!.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
				presetNameBtn.onPointerClickObservable.add(() => {
					cgSelectedPresetIndex = idx;
					applyPreset(cgPresets[idx]);
					refreshPresetList();
				});

				const presetDeleteBtn = gui.Button.CreateSimpleButton("pDel" + idx, "X");
				presetDeleteBtn.color = "rgba(255,100,100,1)";
				presetDeleteBtn.background = "rgba(0,0,0,0)";
				presetDeleteBtn.thickness = 0;
				presetDeleteBtn.fontSize = cgFontSize;
				presetDeleteBtn.onPointerClickObservable.add(async () => {
					cgPresets.splice(idx, 1);
					if (cgSelectedPresetIndex === idx) cgSelectedPresetIndex = -1;
					await savePresetsToStorage();
					refreshPresetList();
				});

				presetRow.addControl(presetNameBtn, 0, 0);
				presetRow.addControl(presetDeleteBtn, 0, 1);
				presetListStack.addControl(presetRow);
			}
		}

		// Campo de nombre para nuevo preset
		const presetNameInput = new gui.InputText("presetNameInput");
		presetNameInput.width = "100%";
		presetNameInput.height = cgSliderHeight;
		presetNameInput.color = "white";
		presetNameInput.background = "rgba(40,40,40,0.9)";
		presetNameInput.placeholderText = "Nombre del preset...";
		presetNameInput.placeholderColor = "rgba(150,150,150,1)";
		presetNameInput.fontSize = cgFontSize;
		presetNameInput.thickness = 1;
		presetNameInput.focusedBackground = "rgba(60,60,80,0.9)";
		cgStack.addControl(presetNameInput);

		// Boton guardar preset
		const cgSavePresetButton = gui.Button.CreateSimpleButton("cgSave", "Guardar preset");
		cgSavePresetButton.height = cgSliderHeight;
		cgSavePresetButton.width = "100%";
		cgSavePresetButton.color = "white";
		cgSavePresetButton.background = "rgba(40,100,180,0.85)";
		cgSavePresetButton.cornerRadius = 5;
		cgSavePresetButton.thickness = 0;
		cgSavePresetButton.fontSize = cgFontSize;
		cgStack.addControl(cgSavePresetButton);

		cgSavePresetButton.onPointerClickObservable.add(async () => {
			const name = presetNameInput.text.trim();
			if (name === "") {
				presetNameInput.placeholderText = "Escribe un nombre primero";
				return;
			}
			const existing = cgPresets.findIndex(p => p.name === name);
			const values = getCurrentValues();
			values.name = name;
			if (existing >= 0) {
				cgPresets[existing] = values;
			} else {
				cgPresets.push(values);
			}
			presetNameInput.text = "";
			await savePresetsToStorage();
			refreshPresetList();
		});

		// Separador visual
		const cgSeparator = new gui.Rectangle();
		cgSeparator.width = "100%";
		cgSeparator.height = "1px";
		cgSeparator.background = "rgba(255,255,255,0.15)";
		cgSeparator.thickness = 0;
		cgStack.addControl(cgSeparator);

		// Cargar presets al iniciar
		void loadPresetsFromStorage();

		// Exposure
		cgStack.addControl(makeCGLabel("Exposure: 1.0"));
		const sliderExposure = makeCGSlider(0.5, 2.0, 1.0, (val) => {
			defaultPipeline.imageProcessing.exposure = val;
			exposureLabel.text = "Exposure: " + val.toFixed(2);
		});
		const exposureLabel = cgStack.children[cgStack.children.length - 1] as gui.TextBlock;
		cgStack.addControl(sliderExposure);

		// Contrast
		cgStack.addControl(makeCGLabel("Contrast: 1.15"));
		const sliderContrast = makeCGSlider(0.5, 2.5, 1.15, (val) => {
			defaultPipeline.imageProcessing.contrast = val;
			contrastLabel.text = "Contrast: " + val.toFixed(2);
		});
		const contrastLabel = cgStack.children[cgStack.children.length - 1] as gui.TextBlock;
		cgStack.addControl(sliderContrast);

		// Global Saturation
		cgStack.addControl(makeCGLabel("Saturacion: 60"));
		const sliderSat = makeCGSlider(0, 100, 10, (val) => {
			colorCurves.globalSaturation = val;
			satLabel.text = "Saturacion: " + val.toFixed(0);
		});
		const satLabel = cgStack.children[cgStack.children.length - 1] as gui.TextBlock;
		cgStack.addControl(sliderSat);

		// Global Density
		cgStack.addControl(makeCGLabel("Densidad: 0"));
		const sliderDensity = makeCGSlider(0, 100, 0, (val) => {
			colorCurves.globalDensity = val;
			densityLabel.text = "Densidad: " + val.toFixed(0);
		});
		const densityLabel = cgStack.children[cgStack.children.length - 1] as gui.TextBlock;
		cgStack.addControl(sliderDensity);

		// Shadows Hue
		cgStack.addControl(makeCGLabel("Tono sombras: 220"));
		const sliderShHue = makeCGSlider(0, 360, 220, (val) => {
			colorCurves.shadowsHue = val;
			shHueLabel.text = "Tono sombras: " + val.toFixed(0);
		});
		const shHueLabel = cgStack.children[cgStack.children.length - 1] as gui.TextBlock;
		cgStack.addControl(sliderShHue);

		// Shadows Density
		cgStack.addControl(makeCGLabel("Densidad sombras: 30"));
		const sliderShDen = makeCGSlider(0, 100, 30, (val) => {
			colorCurves.shadowsDensity = val;
			shDenLabel.text = "Densidad sombras: " + val.toFixed(0);
		});
		const shDenLabel = cgStack.children[cgStack.children.length - 1] as gui.TextBlock;
		cgStack.addControl(sliderShDen);

		// Vignette Weight
		cgStack.addControl(makeCGLabel("Vignette: 0.5"));
		const sliderVig = makeCGSlider(0, 8, 0.5, (val) => {
			defaultPipeline.imageProcessing.vignetteWeight = val;
			vigLabel.text = "Vignette: " + val.toFixed(1);
		});
		const vigLabel = cgStack.children[cgStack.children.length - 1] as gui.TextBlock;
		cgStack.addControl(sliderVig);

		// Boton reset
		const cgResetButton = gui.Button.CreateSimpleButton("cgReset", "Reset");
		cgResetButton.height = cgSliderHeight;
		cgResetButton.width = "100%";
		cgResetButton.color = "white";
		cgResetButton.background = "rgba(80,80,80,0.8)";
		cgResetButton.cornerRadius = 5;
		cgResetButton.thickness = 0;
		cgResetButton.fontSize = cgFontSize;
		cgStack.addControl(cgResetButton);

		cgResetButton.onPointerClickObservable.add(() => {
			defaultPipeline.imageProcessing.exposure = 1.0;
			defaultPipeline.imageProcessing.contrast = 1.15;
			colorCurves.globalSaturation = 10;
			colorCurves.globalDensity = 80;
			colorCurves.shadowsHue = 220;
			colorCurves.shadowsDensity = 30;
			defaultPipeline.imageProcessing.vignetteWeight = 0.5;
			sliderExposure.value = 1.0;
			sliderContrast.value = 1.15;
			sliderSat.value = 10;
			sliderDensity.value = 0;
			sliderShHue.value = 220;
			sliderShDen.value = 30;
			sliderVig.value = 0.5;
			// Reset nuevos controles
			defaultPipeline.sharpen.edgeAmount = 0.3;
			defaultPipeline.sharpen.colorAmount = 1.0;
			sliderSharpEdge.value = 0.3;
			sliderSharpColor.value = 1.0;
			defaultPipeline.bloomEnabled = false;
			defaultPipeline.bloomWeight = 0.3;
			defaultPipeline.bloomThreshold = 0.9;
			defaultPipeline.bloomScale = 0.5;
			bloomToggle.background = "rgba(60,60,60,1)";
			sliderBloomWeight.value = 0.3;
			sliderBloomThreshold.value = 0.9;
			defaultPipeline.chromaticAberration.aberrationAmount = 1;
			sliderChroma.value = 1;
			colorCurves.highlightsSaturation = 0;
			colorCurves.midtonesSaturation = 0;
			colorCurves.shadowsSaturation = 20;
			sliderHlSat.value = 0;
			sliderMidSat.value = 0;
			sliderShSat.value = 20;
			colorCurves.highlightsDensity = 0;
			colorCurves.midtonesDensity = 0;
			sliderHlDen.value = 0;
			sliderMidDen.value = 0;
		});

		// ── Separador ──────────────────────────────────────────────────────────
		const sepSharp = new gui.Rectangle();
		sepSharp.width = "100%";
		sepSharp.height = "1px";
		sepSharp.background = "rgba(255,255,255,0.12)";
		sepSharp.thickness = 0;
		cgStackRight.addControl(sepSharp);

		// ── SECCION: NITIDEZ (SHARPEN) ─────────────────────────────────────────
		const sharpTitleLabel = new gui.TextBlock();
		sharpTitleLabel.text = "Nitidez (Sharpen)";
		sharpTitleLabel.color = "rgba(180,255,180,1)";
		sharpTitleLabel.fontSize = cgFontSize + 1;
		sharpTitleLabel.height = cgLabelHeight;
		sharpTitleLabel.fontWeight = "bold";
		sharpTitleLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		cgStackRight.addControl(sharpTitleLabel);

		cgStackRight.addControl(makeRightLabel("Bordes: 0.3"));
		const sliderSharpEdge = makeRightSlider(0, 1, 0.3, (val) => {
			defaultPipeline.sharpen.edgeAmount = val;
			sharpEdgeLabel.text = "Bordes: " + val.toFixed(2);
		});
		const sharpEdgeLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		cgStackRight.addControl(sliderSharpEdge);

		cgStackRight.addControl(makeRightLabel("Color: 1.0"));
		const sliderSharpColor = makeRightSlider(0, 1, 1.0, (val) => {
			defaultPipeline.sharpen.colorAmount = val;
			sharpColorLabel.text = "Color: " + val.toFixed(2);
		});
		const sharpColorLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		cgStackRight.addControl(sliderSharpColor);

		// ── Separador ──────────────────────────────────────────────────────────
		const sepBloom = new gui.Rectangle();
		sepBloom.width = "100%";
		sepBloom.height = "1px";
		sepBloom.background = "rgba(255,255,255,0.12)";
		sepBloom.thickness = 0;
		cgStackRight.addControl(sepBloom);

		// ── SECCION: BLOOM (brillo de luz) ─────────────────────────────────────
		const bloomTitleLabel = new gui.TextBlock();
		bloomTitleLabel.text = "Bloom (RTX Glow)";
		bloomTitleLabel.color = "rgba(255,220,100,1)";
		bloomTitleLabel.fontSize = cgFontSize + 1;
		bloomTitleLabel.height = cgLabelHeight;
		bloomTitleLabel.fontWeight = "bold";
		bloomTitleLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		cgStackRight.addControl(bloomTitleLabel);

		const bloomRow = new gui.StackPanel("bloomRow");
		bloomRow.isVertical = false;
		bloomRow.height = cgSliderHeight;
		bloomRow.width = "100%";
		cgStackRight.addControl(bloomRow);

		const bloomToggleLabel = new gui.TextBlock();
		bloomToggleLabel.text = "Activar bloom";
		bloomToggleLabel.color = "rgba(200,200,200,1)";
		bloomToggleLabel.fontSize = cgFontSize;
		bloomToggleLabel.width = "65%";
		bloomToggleLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		bloomRow.addControl(bloomToggleLabel);

		const bloomToggle = gui.Button.CreateSimpleButton("bloomToggle", "OFF");
		bloomToggle.width = "35%";
		bloomToggle.height = cgSliderHeight;
		bloomToggle.color = "white";
		bloomToggle.background = "rgba(60,60,60,1)";
		bloomToggle.cornerRadius = 4;
		bloomToggle.thickness = 0;
		bloomToggle.fontSize = cgFontSize;
		bloomRow.addControl(bloomToggle);

		bloomToggle.onPointerClickObservable.add(() => {
			defaultPipeline.bloomEnabled = !defaultPipeline.bloomEnabled;
			bloomToggle.background = defaultPipeline.bloomEnabled ? "rgba(0,150,80,0.9)" : "rgba(60,60,60,1)";
			if (bloomToggle.textBlock) bloomToggle.textBlock.text = defaultPipeline.bloomEnabled ? "ON" : "OFF";
		});

		cgStackRight.addControl(makeRightLabel("Intensidad: 0.3"));
		const sliderBloomWeight = makeRightSlider(0, 2, 0.3, (val) => {
			defaultPipeline.bloomWeight = val;
			bloomWeightLabel.text = "Intensidad: " + val.toFixed(2);
		});
		const bloomWeightLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		cgStackRight.addControl(sliderBloomWeight);

		cgStackRight.addControl(makeRightLabel("Umbral: 0.9"));
		const sliderBloomThreshold = makeRightSlider(0, 1, 0.9, (val) => {
			defaultPipeline.bloomThreshold = val;
			bloomThresholdLabel.text = "Umbral: " + val.toFixed(2);
		});
		const bloomThresholdLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		cgStackRight.addControl(sliderBloomThreshold);

		// ── Separador ──────────────────────────────────────────────────────────
		const sepChroma = new gui.Rectangle();
		sepChroma.width = "100%";
		sepChroma.height = "1px";
		sepChroma.background = "rgba(255,255,255,0.12)";
		sepChroma.thickness = 0;
		cgStackRight.addControl(sepChroma);

		// ── SECCION: ABERRACION CROMATICA ──────────────────────────────────────
		const chromaTitleLabel = new gui.TextBlock();
		chromaTitleLabel.text = "Aberracion Cromatica";
		chromaTitleLabel.color = "rgba(200,150,255,1)";
		chromaTitleLabel.fontSize = cgFontSize + 1;
		chromaTitleLabel.height = cgLabelHeight;
		chromaTitleLabel.fontWeight = "bold";
		chromaTitleLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		cgStackRight.addControl(chromaTitleLabel);

		cgStackRight.addControl(makeRightLabel("Aberracion: 1"));
		const sliderChroma = makeRightSlider(0, 10, 1, (val) => {
			defaultPipeline.chromaticAberration.aberrationAmount = val;
			chromaLabel.text = "Aberracion: " + val.toFixed(1);
		});
		const chromaLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		cgStackRight.addControl(sliderChroma);

		// ── Separador ──────────────────────────────────────────────────────────
		const sepSatAdv = new gui.Rectangle();
		sepSatAdv.width = "100%";
		sepSatAdv.height = "1px";
		sepSatAdv.background = "rgba(255,255,255,0.12)";
		sepSatAdv.thickness = 0;
		cgStackRight.addControl(sepSatAdv);

		// ── SECCION: SATURACION AVANZADA por zona tonal ────────────────────────
		const satAdvTitleLabel = new gui.TextBlock();
		satAdvTitleLabel.text = "Saturacion por zona";
		satAdvTitleLabel.color = "rgba(120,220,255,1)";
		satAdvTitleLabel.fontSize = cgFontSize + 1;
		satAdvTitleLabel.height = cgLabelHeight;
		satAdvTitleLabel.fontWeight = "bold";
		satAdvTitleLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		cgStackRight.addControl(satAdvTitleLabel);

		cgStackRight.addControl(makeRightLabel("Sat. Luces: 0"));
		const sliderHlSat = makeRightSlider(-100, 100, 0, (val) => {
			colorCurves.highlightsSaturation = val;
			hlSatLabel.text = "Sat. Luces: " + val.toFixed(0);
		});
		const hlSatLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		sliderHlSat.color = "rgba(255,240,150,1)";
		cgStackRight.addControl(sliderHlSat);

		cgStackRight.addControl(makeRightLabel("Sat. Medios: 0"));
		const sliderMidSat = makeRightSlider(-100, 100, 0, (val) => {
			colorCurves.midtonesSaturation = val;
			midSatLabel.text = "Sat. Medios: " + val.toFixed(0);
		});
		const midSatLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		sliderMidSat.color = "rgba(180,220,180,1)";
		cgStackRight.addControl(sliderMidSat);

		cgStackRight.addControl(makeRightLabel("Sat. Sombras: 20"));
		const sliderShSat = makeRightSlider(-100, 100, 20, (val) => {
			colorCurves.shadowsSaturation = val;
			shSatLabel.text = "Sat. Sombras: " + val.toFixed(0);
		});
		const shSatLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		sliderShSat.color = "rgba(130,160,255,1)";
		cgStackRight.addControl(sliderShSat);

		cgStackRight.addControl(makeRightLabel("Den. Luces: 0"));
		const sliderHlDen = makeRightSlider(0, 100, 0, (val) => {
			colorCurves.highlightsDensity = val;
			hlDenLabel.text = "Den. Luces: " + val.toFixed(0);
		});
		const hlDenLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		cgStackRight.addControl(sliderHlDen);

		cgStackRight.addControl(makeRightLabel("Den. Medios: 0"));
		const sliderMidDen = makeRightSlider(0, 100, 0, (val) => {
			colorCurves.midtonesDensity = val;
			midDenLabel.text = "Den. Medios: " + val.toFixed(0);
		});
		const midDenLabel = cgStackRight.children[cgStackRight.children.length - 1] as gui.TextBlock;
		cgStackRight.addControl(sliderMidDen);


				cgToggleButton.onPointerClickObservable.add(() => {
			cgPanel.isVisible = !cgPanel.isVisible;
		});

		// ── Logica de carga de modelo local ─────────────────────────────────────
		//
		// PROBLEMA RAIZ (por que los modelos PMX aparecen blancos):
		// BabylonJS calcula rootUrl = GetFolderPath(fileUrl).
		// Con "file:Modelo.pmx" (sin slash) -> rootUrl = ""
		// -> textura "tex/body.bmp" se busca como "tex/body.bmp" (sin "file:")
		// -> BabylonJS hace HTTP fetch al servidor -> no encuentra nada -> modelo blanco.
		//
		// SOLUCION: usar SceneLoader.LoadAssetContainerAsync con rootUrl separado.
		// rootUrl = "file:/"  -> texturas se construyen como "file:/tex/body.bmp"
		// -> BabylonJS busca en FilesInput con clave "/tex/body.bmp" -> ENCONTRADO.
		// Todos los archivos locales se registran con clave "/" + ruta.
		const LOCAL_ROOT = "file:/";

		// ── Parser de texturas del binario PMX ─────────────────────────────────
		// Lee el binario de un .pmx y devuelve la lista EXACTA de rutas relativas
		// de texturas, tal como el modelo las referencia internamente.
		// Funciona con cualquier modelo: pocos o muchos archivos, nombres en
		// japones, chino, o cualquier Unicode, carpetas tex/ spa/ toon/ o sin subcarpeta.
		function parsePmxTextureList(buffer: ArrayBuffer): string[] {
			const view  = new DataView(buffer);
			const bytes = new Uint8Array(buffer);
			let offset  = 0;

			if (String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) !== "PMX ") {
				console.warn("[PMX Parser] Firma invalida, no es un .pmx valido");
				return [];
			}
			offset = 4;
			offset += 4; // version float32

			const configSize = bytes[offset]; offset += 1;
			const encoding   = bytes[offset];     // 0=UTF16LE, 1=UTF8
			const addUV      = bytes[offset + 1]; // UVs adicionales por vertice
			const vtxIdxSz   = bytes[offset + 2]; // tamano del indice de vertice en bytes
			offset += configSize;

			function readStr(): string {
				const len = view.getInt32(offset, true); offset += 4;
				if (len <= 0) return "";
				const raw = bytes.subarray(offset, offset + len); offset += len;
				return encoding === 0
					? new TextDecoder("utf-16le").decode(raw)
					: new TextDecoder("utf-8").decode(raw);
			}

			for (let i = 0; i < 4; i++) readStr(); // nombreJP, nombreEN, comentarioJP, comentarioEN

			const vtxCount = view.getInt32(offset, true); offset += 4;
			for (let i = 0; i < vtxCount; i++) {
				offset += 32 + addUV * 16;
				const wt = bytes[offset]; offset += 1;
				if      (wt === 0) offset += vtxIdxSz;
				else if (wt === 1) offset += vtxIdxSz * 2 + 4;
				else if (wt === 2) offset += vtxIdxSz * 4 + 16;
				else if (wt === 3) offset += vtxIdxSz * 2 + 4 + 36;
				else if (wt === 4) offset += vtxIdxSz * 4 + 16;
				offset += 4;
			}

			const faceCount = view.getInt32(offset, true); offset += 4;
			offset += faceCount * vtxIdxSz;

			const texCount = view.getInt32(offset, true); offset += 4;
			const textures: string[] = [];
			for (let i = 0; i < texCount; i++) {
				const path = readStr().replace(/\\/g, "/").trim();
				if (path) textures.push(path);
			}
			console.log(`[PMX Parser] ${textures.length} texturas declaradas:`, textures);
			return textures;
		}

		newPjButton.onPointerClickObservable.add(() => {
			const fileInput = document.createElement("input");
			fileInput.type = "file";
			fileInput.accept = ".bpmx,.pmx,.zip";
			fileInput.style.display = "none";
			document.body.appendChild(fileInput);

			fileInput.onchange = async () => {
				const file = fileInput.files?.[0];
				document.body.removeChild(fileInput);
				if (!file) return;

				// Limpiar todos los archivos registrados anteriormente
				Object.keys(FilesInput.FilesToLoad).forEach(key => {
					delete FilesInput.FilesToLoad[key];
				});

				let pmxFileName  = ""; // nombre del .pmx (sin ruta)
				let modelName    = "";
				let useLocalRoot = false; // true para PMX con texturas, false para BPMX

				if (file.name.toLowerCase().endsWith(".zip")) {
					// ── Modo ZIP: PMX + texturas empaquetadas ───────────────────────────
					engine.displayLoadingUI();
					updateLoadingText(0, "Descomprimiendo ZIP...");

					const zip        = new JSZip();
					const zipContent = await zip.loadAsync(await file.arrayBuffer());

					// Mapa de todos los archivos del ZIP, ignorando directorios y archivos ocultos
					const zipEntries = new Map<string, JSZip.JSZipObject>();
					zipContent.forEach((entryPath, entry) => {
						if (!entry.dir && !entryPath.startsWith("__MACOSX")) {
							zipEntries.set(entryPath, entry);
						}
					});

					// Detectar si el ZIP tiene carpeta raiz comun
					// "Xiao/Xiao.pmx" + "Xiao/tex/body.bmp" -> rootPrefix = "Xiao/"
					// "Xiao.pmx" + "tex/body.bmp"           -> rootPrefix = ""
					const allPaths = Array.from(zipEntries.keys());
					let rootPrefix = "";
					if (allPaths.length > 0) {
						const firstSeg = allPaths[0].split("/")[0] + "/";
						if (allPaths.length > 1 && allPaths.every(p => p.startsWith(firstSeg))) {
							rootPrefix = firstSeg;
						}
					}
					console.log("[+ PJ] Prefijo raiz ZIP:", JSON.stringify(rootPrefix) || "(sin carpeta raiz)");

					function toRelative(zipPath: string): string {
						return rootPrefix ? zipPath.slice(rootPrefix.length) : zipPath;
					}

					// Encontrar el PMX dentro del ZIP (prefiere el que esta en la raiz del modelo)
					let pmxZipPath = "";
					for (const zipPath of zipEntries.keys()) {
						const rel = toRelative(zipPath).toLowerCase();
						if (rel.endsWith(".pmx") || rel.endsWith(".bpmx")) {
							if (!pmxZipPath || !toRelative(pmxZipPath).includes("/")) {
								pmxZipPath = zipPath;
							}
						}
					}

					if (!pmxZipPath) {
						engine.hideLoadingUI();
						console.error("[+ PJ] No se encontro ningun .pmx o .bpmx dentro del ZIP.");
						return;
					}

					const pmxRelPath = toRelative(pmxZipPath); // e.g. "Xiao.pmx"
					console.log("[+ PJ] PMX encontrado:", pmxRelPath);

					// Leer el PMX y extraer la lista exacta de texturas que necesita
					updateLoadingText(0, "Leyendo modelo...");
					const pmxBuffer       = await zipEntries.get(pmxZipPath)!.async("arraybuffer");
					const requiredTextures = parsePmxTextureList(pmxBuffer);

					// Registrar PMX con clave "/" + nombre (por LOCAL_ROOT = "file:/")
					FilesInput.FilesToLoad["/" + pmxRelPath.toLowerCase()] = new File([pmxBuffer], pmxRelPath);

					// Registrar cada textura con clave "/" + ruta_relativa_exacta
					let registered = 0;
					for (const texPath of requiredTextures) {
						// Buscar en el ZIP: con prefijo raiz, sin el, o por nombre de archivo como ultimo recurso
						const entry =
							zipEntries.get(rootPrefix + texPath) ??
							zipEntries.get(texPath) ??
							(() => {
								const base = texPath.split("/").pop()!.toLowerCase();
								for (const [k, v] of zipEntries) {
									if (k.split("/").pop()!.toLowerCase() === base) return v;
								}
								return undefined;
							})();

						if (entry) {
							const blob = await entry.async("blob");
							// CLAVE CRITICA: "/" + ruta_relativa
							// BabylonJS construira "file:/" + "tex/body.bmp" = "file:/tex/body.bmp"
							// y buscara en FilesToLoad la clave "/tex/body.bmp"
							FilesInput.FilesToLoad["/" + texPath.toLowerCase()] = new File([blob], texPath);
							registered++;
							console.log(`[+ PJ] Registrada: "/${texPath}"`);
						} else {
							console.warn(`[+ PJ] No encontrada en ZIP: "${texPath}"`);
						}
					}
					console.log(`[+ PJ] ${registered}/${requiredTextures.length} texturas registradas`);

					pmxFileName  = pmxRelPath;
					modelName    = pmxRelPath.replace(/\.[^.]+$/, "");
					useLocalRoot = true;

				} else if (file.name.toLowerCase().endsWith(".pmx")) {
					// ── Modo PMX suelto ─────────────────────────────────────────────────
					const pmxBuffer       = await file.arrayBuffer();
					const requiredTextures = parsePmxTextureList(pmxBuffer);
					FilesInput.FilesToLoad["/" + file.name.toLowerCase()] = new File([pmxBuffer], file.name);
					if (requiredTextures.length > 0) {
						console.warn(`[+ PJ] PMX sin ZIP: ${requiredTextures.length} texturas no disponibles. Para cargar con texturas, usa el ZIP descargado con el boton PMX.`);
					}
					pmxFileName  = file.name;
					modelName    = file.name.replace(/\.[^.]+$/, "");
					useLocalRoot = true;

				} else {
					// ── Modo BPMX: todo empaquetado internamente, sin texturas externas ──
					FilesInput.FilesToLoad[file.name.toLowerCase()] = file;
					pmxFileName  = file.name;
					modelName    = file.name.replace(/\.[^.]+$/, "");
					useLocalRoot = false;
				}

				// URL final para el loader:
				// - PMX/ZIP: SceneLoader usara rootUrl="file:/" + filename="Xiao.pmx"
				// - BPMX:    usa "file:archivo.bpmx" (metodo original que ya funciona)
				const localFileUrl = useLocalRoot
					? LOCAL_ROOT + pmxFileName   // "file:/Xiao.pmx" -> rootUrl="file:/"
					: "file:" + pmxFileName;     // "file:archivo.bpmx" -> metodo original

				// Limpiar escena actual
				if (mmdRuntime.isAnimationPlaying) {
					previousModelState.wasAnimationPlaying = true;
				}
				mmdRuntime.pauseAnimation();
				previousModelState.previousSeekTimeFrame = mmdRuntime.currentFrameTime;
				prevCharName = chosenCharName;
				chosenCharName = modelName;
				charNameText.text = modelName;

				if (skinButton != undefined) skinButton.isVisible = false;
				if (!isMobile) particleSystem.stop();

				modelMesh.dispose(false, true);
				if (modelMeshSt) modelMeshSt.dispose(false, true);
				mmdPlayerControl.dispose();
				mmdCamera.restoreState();
				mmdRuntime.unregister(scene);

				if (physicsModeOn && physicsRuntime) {
					mmdRuntime = new MmdRuntime(scene, new MmdBulletPhysics(physicsRuntime));
					mmdRuntime.loggingEnabled = false;
					mmdRuntime.autoPhysicsInitialization = false;
				} else {
					mmdRuntime = new MmdRuntime(scene);
					mmdRuntime.loggingEnabled = true;
				}
				mmdRuntime.register(scene);
				mmdRuntime.setAudioPlayer(audioPlayer);

				mmdPlayerControl = new mobileMmdPlayerControl(scene, mmdRuntime, audioPlayer, isMobile);
				mmdPlayerControl.showPlayerControl();

				tabMode = "None";
				charScreenMode = false;
				charScreenModeButton.isVisible = false;

				engine.displayLoadingUI();
				loadingTexts = [];
				promises = [];

				if (useLocalRoot) {
					// Para PMX con texturas: usar "file:/" + pmxFileName como URL completa.
					// BabylonJS calculara rootUrl = GetFolderPath("file:/Xiao.pmx") = "file:/"
					// -> texturas se construyen como "file:/" + "tex/body.bmp" = "file:/tex/body.bmp"
					// -> busca en FilesToLoad con clave "/tex/body.bmp" -> ENCONTRADO con textura real
					promises.push(LoadAssetContainerAsync(
						LOCAL_ROOT + pmxFileName,
						scene,
						{
							onProgress: (event) => updateLoadingText(0, `Cargando modelo... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`),
							pluginOptions: {
								mmdmodel: {
									loggingEnabled: true,
									materialBuilder: materialBuilder
								}
							}
						}
					));
				} else {
					// Para BPMX: metodo original que ya funcionaba correctamente
					promises.push(LoadAssetContainerAsync(
						localFileUrl,
						scene,
						{
							onProgress: (event) => updateLoadingText(0, `Cargando modelo... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`),
							pluginOptions: {
								mmdmodel: {
									loggingEnabled: true,
									materialBuilder: materialBuilder
								}
							}
						}
					));
				}

				loadResults = await Promise.all(promises);

				const localModelRes = loadResults[0];
				localModelRes.addAllToScene();
				modelMesh = localModelRes.rootNodes[0] as MmdMesh;
				modelMesh.parent = mmdRoot;

				shadowGenerator.addShadowCaster(modelMesh);
				for (const mesh of modelMesh.metadata.meshes) mesh.receiveShadows = true;

				mmdModel = mmdRuntime.createMmdModel(modelMesh, {
                    buildPhysics: physicsModeOn ? { worldId: 0, disableOffsetForConstraintFrame: true } : false
                });
                if (physicsModeOn) {
                    scene.onAfterRenderObservable.addOnce(() => {
                        mmdRuntime.initializeAllMmdModelsPhysics(true);
                    });
                }

				if (theCharAnimation) {
					const modelAnimationHandle = mmdModel.createRuntimeAnimation(theCharAnimation as any);
					mmdModel.setRuntimeAnimation(modelAnimationHandle);
				}

				const localChar: BaseCharData = {
					id: 9999999,
					name: modelName,
					weaponType: "",
					element: "Universal",
					gender: "",
					rarity: 5,
					directory: "",
					image: "",
					pmx: localFileUrl
				};
				chosenChar = localChar;

				mmdRuntime.addAnimatable(mmdCamera);
				downloadBtn.update(baseUrl, undefined);

				scene.onAfterRenderObservable.addOnce(() => {
					engine.hideLoadingUI();
					setTimeout(() => {
						showButton.isEnabled = true;
					}, 1500);
				});

				resumePlayback();
			};

			fileInput.click();
		});
        showButton.onPointerClickObservable.add(function() {
            charPanel.isVisible = !charPanel.isVisible;
            if (showButton.isVisible) {
                mmdPlayerControl.hidePlayerControl();
            }
        });

        let skinButton: gui.Button;
        function createSkinButton(visibility: boolean = false, nextSkinMode?: boolean, name?: string): void {
            if (skinButton != undefined) {
                skinButton.dispose();
            }
            skinButton = new gui.Button();
            skinButton = gui.Button.CreateImageOnlyButton("but", "res/assets/alter.png");
            if (bg_bool) {
                skinButton.image!.source = "res/assets/alter_light.png";
            }
            skinButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
            skinButton.left = isMobile ? "110px" : "60px";
            skinButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
            skinButton.top = isMobile ? "110px" : "60px";
            skinButton.width = iconWidthHeight;
            skinButton.height = iconWidthHeight;
            skinButton.thickness = 0;
            advancedTexture.addControl(skinButton);
            skinButton.isVisible = visibility;

            if (nextSkinMode != undefined && name) {
                skinButton.isEnabled = false;
                skinButton.onPointerClickObservable.addOnce(async function() {
                    changeCharacter(name);
                    skinMode = nextSkinMode;
                    if (charPanel.isVisible) {
                        charPanel.isVisible = false;
                    }
                });
            }
        }
        let skinMode = false;

        const darkButton = gui.Button.CreateImageOnlyButton("but", "res/assets/dark_mode.png");
        if (bg_bool) {
            darkButton.image!.source = "res/assets/light_mode.png";
        }
        darkButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        darkButton.left = isMobile ? "110px" : "60px";
        darkButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        darkButton.top = "10px";
        darkButton.width = iconWidthHeight;
        darkButton.height = iconWidthHeight;
        darkButton.thickness = 0;
        if (charScreenMode) {
            darkButton.isEnabled = false;
        };
        advancedTexture.addControl(darkButton);
        function changeDarkMode(): void {
            if (bg_bool) {
                scene.clearColor = new Color4(1, 1, 1, 1.0);
                layer.texture = light_bg;
                darkButton.image!.source = "res/assets/dark_mode.png";
                motionButton.image!.source = "res/assets/note.png";
                if (skinButton != undefined) {
                    skinButton.image!.source = "res/assets/alter.png";
                }
                charNameText.color = "black";
            } else {
                layer.texture = dark_bg;
                darkButton.image!.source = "res/assets/light_mode.png";
                motionButton.image!.source = "res/assets/note_light.png";
                if (skinButton != undefined) {
                    skinButton.image!.source = "res/assets/alter_light.png";
                }
                charNameText.color = "white";
            }
            layer.render;
            bg_bool = !bg_bool;
        }
        darkButton.onPointerClickObservable.add(changeDarkMode);

        const charScreenModeButton = gui.Button.CreateImageOnlyButton("but", "res/assets/paimon.png");
        charScreenModeButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        charScreenModeButton.left = "10px";
        charScreenModeButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        charScreenModeButton.top = isMobile ? "110px" : "60px";
        charScreenModeButton.width = iconWidthHeight;
        charScreenModeButton.height = iconWidthHeight;
        charScreenModeButton.thickness = 0;
        advancedTexture.addControl(charScreenModeButton);
        if (firstTabMode == "WuWa" || firstTabMode == "NTE") {
            charScreenModeButton.isVisible = false;
        }
        charScreenModeButton.onPointerClickObservable.add(function() {
            if (charScreenMode) {
                modelMeshSt.setEnabled(false);
                if (!isMobile) {
                    particleSystem.stop();
                }
                darkButton.isEnabled = true;
            } else if ((tabMode == "Genshin" || tabMode == "HSR" || tabMode == "ZZZ" || tabMode == "HNA") && !charScreenMode) {
                modelMeshSt.setEnabled(true);
                if (!isMobile) {
                    particleSystem.start();
                }
                darkButton.isEnabled = false;
                if (!bg_bool) {
                    changeDarkMode();
                }
            }
            charScreenMode = !charScreenMode;
        });

        // ── Boton de musica con lista desplegable ───────────────────────────────

		const motionButton = gui.Button.CreateImageOnlyButton("but", "res/assets/note.png");
		motionButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		motionButton.left = "10px";
		motionButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
		motionButton.top = isMobile ? "210px" : "110px";
		motionButton.width = iconWidthHeight;
		motionButton.height = iconWidthHeight;
		motionButton.thickness = 0;
		advancedTexture.addControl(motionButton);
		if (bg_bool) {
			motionButton.image!.source = "res/assets/note_light.png";
		}

		// Panel de lista de musica
		const musicPanelWidth = isMobile ? "340px" : "260px";
		const musicRowHeight = isMobile ? 44 : 28;
		const musicFontSize = isMobile ? 16 : 11;

		const musicPanel = new gui.Rectangle("musicPanel");
		musicPanel.width = musicPanelWidth;
		musicPanel.cornerRadius = 10;
		musicPanel.thickness = 1;
		musicPanel.color = "rgba(255,255,255,0.15)";
		musicPanel.background = "rgba(15,15,15,0.92)";
		musicPanel.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
		musicPanel.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
		musicPanel.left = isMobile ? "120px" : "70px";
		musicPanel.isVisible = false;
		advancedTexture.addControl(musicPanel);

		// Titulo del panel
		const musicTitleLabel = new gui.TextBlock();
		musicTitleLabel.text = "Seleccionar musica";
		musicTitleLabel.color = "rgba(180,180,255,1)";
		musicTitleLabel.fontSize = musicFontSize + 1;
		musicTitleLabel.height = isMobile ? "36px" : "24px";
		musicTitleLabel.fontWeight = "bold";
		musicTitleLabel.paddingLeft = "10px";
		musicTitleLabel.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;

		// ScrollViewer para la lista
		const musicScrollViewer = new gui.ScrollViewer("musicScroll");
		musicScrollViewer.width = "100%";
		musicScrollViewer.thickness = 0;
		musicScrollViewer.barSize = isMobile ? 12 : 8;
		musicScrollViewer.barColor = "rgba(120,120,180,0.8)";
		musicScrollViewer.background = "rgba(0,0,0,0)";

		const musicListStack = new gui.StackPanel("musicListStack");
		musicListStack.width = "100%";
		musicListStack.isVertical = true;
		musicScrollViewer.addControl(musicListStack);

		// Calcular altura del panel segun cantidad de canciones (max 8 visibles)
		const maxVisibleRows = 8;
		const visibleRows = Math.min(motionConfig.length, maxVisibleRows);
		const scrollHeight = visibleRows * musicRowHeight;
		const totalPanelHeight = scrollHeight + (isMobile ? 40 : 28);
		musicPanel.height = `${totalPanelHeight}px`;
		musicScrollViewer.height = `${scrollHeight}px`;

		// Posicionar el panel debajo del boton de nota
		const motionBtnTopPx = isMobile ? 210 : 110;
		const motionBtnSizePx = isMobile ? 100 : 50;
		musicPanel.top = `${motionBtnTopPx + motionBtnSizePx + 4}px`;

		// Construir la lista
		let musicRowButtons: gui.Button[] = [];

		function buildMusicList(): void {
			musicListStack.clearControls();
			musicRowButtons = [];

			for (let i = 0; i < motionConfig.length; i++) {
				const idx = i;
				const isActive = motionConfig[idx].name === motionName;

				const row = gui.Button.CreateSimpleButton(`musicRow_${idx}`, motionConfig[idx].name);
				row.height = `${musicRowHeight}px`;
				row.width = "100%";
				row.color = isActive ? "rgba(120,180,255,1)" : "rgba(220,220,220,1)";
				row.background = isActive
					? "rgba(40,80,140,0.7)"
					: "rgba(0,0,0,0)";
				row.thickness = 0;
				row.fontSize = musicFontSize;
				row.textBlock!.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
				row.textBlock!.paddingLeft = "10px";
				row.textBlock!.textWrapping = false;

				row.onPointerClickObservable.add(() => {
					if (isCapturing) return;
					motionName = motionConfig[idx].name;
					audioPlayerFile = motionConfig[idx].audioPlayerFile;
					camMotionFile = motionConfig[idx].camMotionFile;
					modelMotionFile = motionConfig[idx].modelMotionFile;
					buildMusicList();
					musicPanel.isVisible = false;
					changeMotion();
				});

				row.onPointerEnterObservable.add(() => {
					if (!isActive) {
						row.background = "rgba(60,60,100,0.6)";
					}
				});
				row.onPointerOutObservable.add(() => {
					row.background = isActive
						? "rgba(40,80,140,0.7)"
						: "rgba(0,0,0,0)";
				});

				musicListStack.addControl(row);
				musicRowButtons.push(row);
			}
		}

		// Stack principal del panel
		const musicPanelStack = new gui.StackPanel();
		musicPanelStack.width = "100%";
		musicPanelStack.isVertical = true;
		musicPanel.addControl(musicPanelStack);
		musicPanelStack.addControl(musicTitleLabel);
		musicPanelStack.addControl(musicScrollViewer);

		buildMusicList();

		// Toggle del panel al hacer clic en el boton de nota
		motionButton.onPointerClickObservable.add(function() {
			musicPanel.isVisible = !musicPanel.isVisible;
		});

        const charNameText = new gui.TextBlock();
        // charNameText.widthInPixels = 100;
        charNameText.heightInPixels = isMobile ? 100 : 50;
        charNameText.left = isMobile ? "220px" : "120px";
        charNameText.top = "10px";
        charNameText.text = chosenCharName;
        charNameText.fontSize = isMobile ? 40 : 20;
        charNameText.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        charNameText.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        charNameText.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        if (bg_bool) {
            charNameText.color = "white";
        } else {
            charNameText.color = "black";
        }
        advancedTexture.addControl(charNameText);
        charNameText.isVisible = true;

        let isMouseInPanel = false;
        const charPanel = new gui.Rectangle("charPanel");
        charPanel.width = "720px";
        charPanel.height = "920px";
        charPanel.background = "rgb(44,48,50)";
        charPanel.cornerRadius = 20;
        charPanel.thickness = 3;
        charPanel.color = "black";
        advancedTexture.addControl(charPanel);
        charPanel.isVisible = false;
        charPanel.onIsVisibleChangedObservable.add(()=>{
            if (!charPanel.isVisible) {
                isMouseInPanel = false;
                stillCamera.attachControl(canvas, false);
                camera.attachControl(canvas, false);
            }
        });
        charPanel.onPointerEnterObservable.add(function() {
            stillCamera.detachControl();
            camera.detachControl();
            isMouseInPanel = true;
        });
        charPanel.onPointerOutObservable.add(function() {
            stillCamera.attachControl(canvas, false);
            camera.attachControl(canvas, false);
            isMouseInPanel = false;
        });

        // Code for click outside charPanel behaviour
        let charPanelDown = false;
        charPanel.onPointerDownObservable.add(()=>{
            charPanelDown = true;
        });
        charPanel.onPointerUpObservable.add(()=>{
            setTimeout(() => {
                charPanelDown = false;
            }, 100);
        });
        // Variable to keep track of click timeout timer
        let clickStartTimer: number | undefined = undefined;
        // Bool to determine if click will delete or not
        let isAbleToDelete = true;
        // If the user clicks, start a timer.  If the timer finishes, prevent user from able to close panel
        function scenePointerDownCharPanel(): void {
            if (!charPanelDown) {
                clickStartTimer = window.setTimeout(() => {
                    isAbleToDelete = false;
                }, 100); // Wait 100 ms before considering this a click
            }
        }
        // When user let's go of mouse button, clear the timer, if it never finished, close panel
        function scenePointerUpCharPanel(): void {
            if (!charPanelDown) {
                window.clearTimeout(clickStartTimer);
                if (isAbleToDelete) {
                    charPanel.isVisible = false;
                }
                isAbleToDelete = true;
            }
        }

        const containStack = new gui.Rectangle();
        containStack.width = "700px";
        containStack.height = "900px";
        containStack.thickness = 0;
        containStack.cornerRadius = 15;
        containStack.background = charPanel.background;
        charPanel.addControl(containStack);

        const panel = new gui.StackPanel();
        panel.width = "700px";
        panel.height = "900px";
        containStack.addControl(panel);

        const topBar = new gui.Rectangle();
        topBar.width = "700px";
        topBar.height = "150px";
        topBar.thickness = 0;
        panel.addControl(topBar);

        const genshinButton = gui.Button.CreateSimpleButton("but", "Genshin Impact");
        genshinButton.fontSize = 10;
        genshinButton.width = "175px";
        genshinButton.height = "50px";
        genshinButton.color = "white";
        genshinButton.background = "rgb(64,68,70)";
        genshinButton.disabledColor = charPanel.background;
        genshinButton.thickness = 0;
        genshinButton.left = -262.5;
        genshinButton.top = -50;
        genshinButton.cornerRadiusX = genshinButton.cornerRadiusY = 15;
        topBar.addControl(genshinButton);

        const hsrButton = gui.Button.CreateSimpleButton("but", "Honkai: Star Rail");
        hsrButton.fontSize = 10;
        hsrButton.width = "175px";
        hsrButton.height = "50px";
        hsrButton.color = "white";
        hsrButton.background = charPanel.background;
        hsrButton.disabledColor = charPanel.background;
        hsrButton.thickness = 0;
        hsrButton.left = -87.5;
        hsrButton.top = -50;
        hsrButton.cornerRadiusX = hsrButton.cornerRadiusY = 15;
        topBar.addControl(hsrButton);

        const zzzButton = gui.Button.CreateSimpleButton("but", "Zenless Zone Zero");
        zzzButton.fontSize = 10;
        zzzButton.width = "175px";
        zzzButton.height = "50px";
        zzzButton.color = "white";
        zzzButton.background = charPanel.background;
        zzzButton.disabledColor = charPanel.background;
        zzzButton.thickness = 0;
        zzzButton.left = 87.5;
        zzzButton.top = -50;
        zzzButton.cornerRadiusX = zzzButton.cornerRadiusY = 15;
        topBar.addControl(zzzButton);

        const hnaButton = gui.Button.CreateSimpleButton("but", "Honkai: Nexus Anima");
        hnaButton.fontSize = 10;
        hnaButton.width = "175px";
        hnaButton.height = "50px";
        hnaButton.color = "white";
        hnaButton.background = charPanel.background;
        hnaButton.disabledColor = charPanel.background;
        hnaButton.thickness = 0;
        hnaButton.left = 262.5;
        hnaButton.top = -50;
        hnaButton.cornerRadiusX = hnaButton.cornerRadiusY = 15;
        topBar.addControl(hnaButton);

        // CURRENT STATE
        let sortModeAscending = false;
        let sortModeKey: keyof BaseCharData;

        const genshinFilter: { key: keyof GenshinCharData; value: string }[] = [
            { key: "id", value: "1000" }
        ];
        const hsrFilter: { key: keyof HSRCharData; value: string }[] = [
            { key: "id", value: "2000" }
        ];
        const zzzFilter: { key: keyof ZZZCharData; value: string }[] = [
            { key: "id", value: "3000" }
        ];
        const wuwaFilter: { key: keyof WuwaCharData; value: string }[] = [
            { key: "id", value: "4000" }
        ];
        const hnaFilter: { key: keyof HNACharData; value: string }[] = [
            { key: "id", value: "5000" }
        ];
        const nteFilter: { key: keyof NTECharData; value: string }[] = [
            { key: "id", value: "6000" }
        ];
        let filteredArray: BaseCharData[];
        filteredArray = filterBy(charDataArray, genshinFilter);
        sortModeKey = "id";

        function handleGenshinTabSwitch(): void {
            if (tabMode != "Genshin") {
                genshinButton.background = "rgb(64,68,70)";
                if (tabMode == "HSR") {
                    hsrButton.background = charPanel.background;
                    hideHSRElements();
                } else if (tabMode == "ZZZ") {
                    zzzButton.background = charPanel.background;
                    hideZZZElements();
                } else if (tabMode == "WuWa") {
                    tacetImage.background = "rgb(64,68,70)";
                    hideWuwaElements();
                } else if (tabMode == "HNA") {
                    hnaButton.background = charPanel.background;
                    hideHNAElements();
                } else if (tabMode == "NTE") {
                    nteImage.background = "rgb(64,68,70)";
                    hideNTEElements();
                }
                tabMode = "Genshin";
                filteredArray = filterBy(charDataArray, genshinFilter);
                filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
                showGenshinElements();
                generateGrid(filteredArray);
            }
        }
        genshinButton.onPointerClickObservable.add(function() {
            handleGenshinTabSwitch();
        });

        function handleHSRTabSwitch(): void {
            if (tabMode != "HSR") {
                hsrButton.background = "rgb(64,68,70)";
                if (tabMode == "Genshin") {
                    genshinButton.background = charPanel.background;
                    hideGenshinElements();
                } else if (tabMode == "ZZZ") {
                    zzzButton.background = charPanel.background;
                    hideZZZElements();
                } else if (tabMode == "WuWa") {
                    tacetImage.background = "rgb(64,68,70)";
                    hideWuwaElements();
                } else if (tabMode == "NTE") {
                    nteImage.background = "rgb(64,68,70)";
                    hideNTEElements();
                } else {
                    hnaButton.background = charPanel.background;
                    hideHNAElements();
                }
                tabMode = "HSR";
                if (sortModeKey == "id") {
                    hsrSortModeChanger.image!.source = "res/assets/release.png";
                } else if (sortModeKey == "name") {
                    hsrSortModeChanger.image!.source = "res/assets/alphabet.png";
                }
                filteredArray = filterBy(hsrCharDataArray, hsrFilter);
                filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
                showAllHSRElements();
                generateGrid(filteredArray);
            }
        }
        hsrButton.onPointerClickObservable.add(function() {
            handleHSRTabSwitch();
        });

        function handleZZZTabSwitch(): void {
            if (tabMode != "ZZZ") {
                zzzButton.background = "rgb(64,68,70)";
                if (tabMode == "Genshin") {
                    genshinButton.background = charPanel.background;
                    hideGenshinElements();
                } else if (tabMode == "HSR") {
                    hideHSRElements();
                    hsrButton.background = charPanel.background;
                } else if (tabMode == "WuWa") {
                    tacetImage.background = "rgb(64,68,70)";
                    hideWuwaElements();
                } else if (tabMode == "NTE") {
                    nteImage.background = "rgb(64,68,70)";
                    hideNTEElements();
                } else {
                    hnaButton.background = charPanel.background;
                    hideHNAElements();
                }
                tabMode = "ZZZ";
                filteredArray = filterBy(zzzCharDataArray, zzzFilter);
                filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
                showAllZZZElements();
                generateGrid(filteredArray);
            }
        }
        zzzButton.onPointerClickObservable.add(function() {
            handleZZZTabSwitch();
        });

        function handleHNATabSwitch(): void {
            if (tabMode != "HNA") {
                hnaButton.background = "rgb(64,68,70)";
                if (tabMode == "Genshin") {
                    genshinButton.background = charPanel.background;
                    hideGenshinElements();
                } else if (tabMode == "HSR") {
                    hideHSRElements();
                    hsrButton.background = charPanel.background;
                } else if (tabMode == "ZZZ") {
                    zzzButton.background = charPanel.background;
                    hideZZZElements();
                } else if (tabMode == "WuWa") {
                    tacetImage.background = "rgb(64,68,70)";
                    hideWuwaElements();
                } else if (tabMode == "NTE") {
                    nteImage.background = "rgb(64,68,70)";
                    hideNTEElements();
                }
                tabMode = "HNA";
                filteredArray = filterBy(hnaCharDataArray, hnaFilter);
                filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
                showHNAElements();
                generateGrid(filteredArray);
            }
        }
        hnaButton.onPointerClickObservable.add(function() {
            handleHNATabSwitch();
        });

        const filterBar = new gui.Rectangle();
        filterBar.width = "700px";
        filterBar.height = "50px";
        filterBar.thickness = 0;
        filterBar.top = 0;
        filterBar.background = "rgb(64,68,70)";
        topBar.addControl(filterBar);

        const filterBar2 = new gui.Rectangle();
        filterBar2.width = "700px";
        filterBar2.height = "50px";
        filterBar2.thickness = 0;
        filterBar2.top = 50;
        filterBar2.background = "rgb(64,68,70)";
        filterBar2.cornerRadiusW = filterBar2.cornerRadiusZ = 15;
        topBar.addControl(filterBar2);

        const hoverCharName = new gui.TextBlock();
        hoverCharName.width = "150px";
        hoverCharName.height = "40px";
        hoverCharName.color = "white";
        hoverCharName.left = -48;
        hoverCharName.text = "";
        hoverCharName.fontSize = 16;
        hoverCharName.textVerticalAlignment = gui.Control.VERTICAL_ALIGNMENT_CENTER;
        hoverCharName.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        // hoverCharName.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        filterBar.addControl(hoverCharName);

        const searchBar = new gui.Rectangle();
        searchBar.width = "220px";
        searchBar.height = "40px";
        searchBar.background = charPanel.background;
        searchBar.cornerRadius = 15;
        searchBar.left = -150;
        searchBar.thickness = 0;
        filterBar2.addControl(searchBar);

        const tacetImage = gui.Button.CreateImageOnlyButton("but", "res/assets/tacet.png");
        tacetImage.height = "40px";
        tacetImage.width = "40px";
        tacetImage.left = -328;
        tacetImage.thickness = 0;
        tacetImage.cornerRadius = 5;
        filterBar2.addControl(tacetImage);

        const nteImage = gui.Button.CreateImageOnlyButton("but", "res/assets/nte.png");
        nteImage.height = "40px";
        nteImage.width = "40px";
        nteImage.left = -288;
        nteImage.thickness = 0;
        nteImage.cornerRadius = 5;
        filterBar2.addControl(nteImage);

        function handleWuwaTabSwitch(): void {
            if (tabMode != "WuWa") {
                tacetImage.background = charPanel.background;
                if (tabMode == "Genshin") {
                    genshinButton.background = charPanel.background;
                    hideGenshinElements();
                } else if (tabMode == "HSR") {
                    hideHSRElements();
                    hsrButton.background = charPanel.background;
                } else if (tabMode == "ZZZ") {
                    zzzButton.background = charPanel.background;
                    hideZZZElements();
                } else if (tabMode == "HNA") {
                    hnaButton.background = charPanel.background;
                    hideHNAElements();
                } else if (tabMode == "NTE") {
                    nteImage.background = "rgb(64,68,70)";
                    hideNTEElements();
                }
                tabMode = "WuWa";
                filteredArray = filterBy(wuwaCharDataArray, wuwaFilter);
                filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
                showAllWuwaElements();
                generateGrid(filteredArray);
            }
        }

        function handleNTETabSwitch(): void {
            if (tabMode != "NTE") {
                nteImage.background = charPanel.background;
                if (tabMode == "Genshin") {
                    genshinButton.background = charPanel.background;
                    hideGenshinElements();
                } else if (tabMode == "HSR") {
                    hideHSRElements();
                    hsrButton.background = charPanel.background;
                } else if (tabMode == "ZZZ") {
                    zzzButton.background = charPanel.background;
                    hideZZZElements();
                } else if (tabMode == "HNA") {
                    hnaButton.background = charPanel.background;
                    hideHNAElements();
                } else if (tabMode == "WuWa") {
                    tacetImage.background = "rgb(64,68,70)";
                    hideWuwaElements();
                }
                tabMode = "NTE";
                filteredArray = filterBy(nteCharDataArray, nteFilter);
                filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
                showNTEElements();
                generateGrid(filteredArray);
            }
        }

        tacetImage.onPointerClickObservable.add(function() {
            handleWuwaTabSwitch();
        });
        
        nteImage.onPointerClickObservable.add(function() {
            handleNTETabSwitch();
        });

        // searchImage.onPointerClickObservable.add(function() {
        //     handleWuwaTabSwitch();
        // });

        // searchImage.onPointerEnterObservable.add(function() {
        //     searchImage.image!.source = "res/assets/tacet.png";
        // });
        // searchImage.onPointerOutObservable.add(function() {
        //     searchImage.image!.source = "res/assets/search.png";
        // });
        tacetImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Wuthering Waves";
        });
        tacetImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });
        nteImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Neverness To Everness";
        });
        nteImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const searchTextbox = new gui.InputText();
        searchTextbox.placeholderText = "Find character...";
        searchTextbox.placeholderColor = "rgb(64,68,70)";
        searchTextbox.thickness = 0;
        searchTextbox.background = searchBar.background;
        searchTextbox.width = "160px";
        searchTextbox.color = "white";
        searchTextbox.focusedBackground = searchTextbox.background;
        searchTextbox.promptMessage = "Search for character:";
        searchBar.addControl(searchTextbox);
        let searchTextboxPrevTab = "None";
        let searchCharArray: BaseCharData[];
        searchTextbox.onTextChangedObservable.add(function() {
            if (searchTextbox.text == "") {
                genshinButton.isEnabled = true;
                hsrButton.isEnabled = true;
                zzzButton.isEnabled = true;
                hnaButton.isEnabled = true;
                tacetImage.isVisible = true;
                nteImage.isVisible = true;
                sortImage.isVisible = true;
                if (searchTextboxPrevTab == "Genshin") {
                    handleGenshinTabSwitch();
                } else if (searchTextboxPrevTab == "HSR") {
                    handleHSRTabSwitch();
                } else if (searchTextboxPrevTab == "ZZZ") {
                    handleZZZTabSwitch();
                } else if (searchTextboxPrevTab == "WuWa") {
                    handleWuwaTabSwitch();
                } else if (searchTextboxPrevTab == "HNA") {
                    handleHNATabSwitch();
                } else if (searchTextboxPrevTab == "NTE") {
                    handleNTETabSwitch();
                }
                searchTextboxPrevTab = "None";
            } else {
                if (searchTextboxPrevTab == "None") {
                    searchTextboxPrevTab = tabMode;
                    sortImage.isVisible = false;
                    genshinButton.background = charPanel.background;
                    genshinButton.isEnabled = false;
                    hsrButton.background = charPanel.background;
                    hsrButton.isEnabled = false;
                    zzzButton.background = charPanel.background;
                    zzzButton.isEnabled = false;
                    hnaButton.background = charPanel.background;
                    hnaButton.isEnabled = false;
                    tacetImage.isVisible = false;
                    nteImage.isVisible = false;
                    hideGenshinElements();
                    hideHSRElements();
                    hideZZZElements();
                    hideWuwaElements();
                    hideHNAElements();
                    hideWuwaElements();
                    hideNTEElements();
                }
                tabMode = "None";
                searchCharArray = searchCharFunction(searchTextbox.text);
                generateGrid(searchCharArray);
            }
        });

        const searchImage = gui.Button.CreateImageOnlyButton("but", "res/assets/search.png");
        searchImage.height = "40px";
        searchImage.width = "40px";
        searchImage.left = -90;
        searchImage.thickness = 0;
        searchImage.cornerRadius = 5;
        searchBar.addControl(searchImage);

        const clearTextImage = gui.Button.CreateImageOnlyButton("but", "res/assets/clear.png");
        clearTextImage.height = "40px";
        clearTextImage.width = "40px";
        clearTextImage.left = 90;
        clearTextImage.thickness = 0;
        clearTextImage.cornerRadius = 5;
        searchBar.addControl(clearTextImage);
        clearTextImage.onPointerClickObservable.add(function() {
            searchTextbox.text = "";
        });

        const sortImage = gui.Button.CreateImageOnlyButton("but", "res/assets/descending.png");
        sortImage.height = "40px";
        sortImage.width = "40px";
        sortImage.left = -328;
        sortImage.thickness = 0;
        filterBar.addControl(sortImage);
        sortImage.onPointerClickObservable.add(() => {
            if (!sortModeAscending) {
                sortImage.image!.source = "res/assets/ascending.png";
                filteredArray = sortBy(filteredArray, sortModeKey, true);
                generateGrid(filteredArray);
            } else {
                sortImage.image!.source = "res/assets/descending.png";
                filteredArray = sortBy(filteredArray, sortModeKey, false);
                generateGrid(filteredArray);
            }
            sortModeAscending = !sortModeAscending;
        });

        const sortModeChanger = gui.Button.CreateSimpleButton("but", " Release ");
        sortModeChanger.height = "40px";
        sortModeChanger.width = "90px";
        sortModeChanger.left = -258;
        sortModeChanger.background = charPanel.background;
        sortModeChanger.color = "white";
        sortModeChanger.cornerRadius = 15;
        sortModeChanger.thickness = 0;
        filterBar.addControl(sortModeChanger);
        sortModeChanger.onPointerClickObservable.add(() => {
            if (sortModeChanger.textBlock != null) {
                if (sortModeKey == "id") {
                    sortModeKey = "name";
                    hsrSortModeChanger.image!.source = "res/assets/release.png";
                    sortModeChanger.textBlock.text = " Name ";
                } else {
                    sortModeKey = "id";
                    hsrSortModeChanger.image!.source = "res/assets/alphabet.png";
                    sortModeChanger.textBlock.text = " Release ";
                }
                filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
                generateGrid(filteredArray);
            }
        });

        const hsrSortModeChanger = gui.Button.CreateImageOnlyButton("but", "res/assets/release.png");
        hsrSortModeChanger.height = "40px";
        hsrSortModeChanger.width = "40px";
        hsrSortModeChanger.left = -278;
        hsrSortModeChanger.thickness = 0;
        filterBar.addControl(hsrSortModeChanger);
        hsrSortModeChanger.onPointerClickObservable.add(() => {
            if (sortModeKey == "id") {
                sortModeKey = "name";
                hsrSortModeChanger.image!.source = "res/assets/alphabet.png";
                sortModeChanger.textBlock!.text = " Name ";
            } else {
                sortModeKey = "id";
                hsrSortModeChanger.image!.source = "res/assets/release.png";
                sortModeChanger.textBlock!.text = " Release ";
            }
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });
        hsrSortModeChanger.isVisible = false;

        const fourStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/rarity_4.png");
        fourStarImage.height = "40px";
        fourStarImage.width = "40px";
        fourStarImage.left = -188;
        fourStarImage.thickness = 0;
        fourStarImage.cornerRadius = 5;
        filterBar.addControl(fourStarImage);
        fourStarImage.onPointerClickObservable.add(function() {
            const index = genshinFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (genshinFilter[index].value == "4") {
                    genshinFilter.splice(index, 1);
                    fourStarImage.background = "rgba(0,0,0,0)";
                } else {
                    genshinFilter[index].value = "4";
                    fiveStarImage.background = "rgba(0,0,0,0)";
                    fourStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof GenshinCharData; value: string } = {
                    key: "rarity",
                    value: "4"
                };
                genshinFilter.push(newPush);
                fourStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(charDataArray, genshinFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const fiveStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/rarity_5.png");
        fiveStarImage.height = "40px";
        fiveStarImage.width = "40px";
        fiveStarImage.left = -148;
        fiveStarImage.thickness = 0;
        fiveStarImage.cornerRadius = 5;
        filterBar.addControl(fiveStarImage);
        fiveStarImage.onPointerClickObservable.add(function() {
            const index = genshinFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (genshinFilter[index].value == "5") {
                    genshinFilter.splice(index, 1);
                    fiveStarImage.background = "rgba(0,0,0,0)";
                } else {
                    genshinFilter[index].value = "5";
                    fourStarImage.background = "rgba(0,0,0,0)";
                    fiveStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof GenshinCharData; value: string } = {
                    key: "rarity",
                    value: "5"
                };
                genshinFilter.push(newPush);
                fiveStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(charDataArray, genshinFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        // 5star+tp -> 5star+bg -> 4star+bg -> 5star+tp
        const hsrStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/rarity_5.png");
        hsrStarImage.height = "40px";
        hsrStarImage.width = "40px";
        hsrStarImage.left = -238;
        hsrStarImage.thickness = 0;
        hsrStarImage.cornerRadius = 5;
        filterBar.addControl(hsrStarImage);
        hsrStarImage.isVisible = false;
        hsrStarImage.onPointerClickObservable.add(function() {
            const index = hsrFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (hsrFilter[index].value == "4") {
                    hsrFilter.splice(index, 1);
                    hsrStarImage.background = "rgba(0,0,0,0)";
                    hsrStarImage.image!.source = "res/assets/HSR/rarity_5.png";
                } else {
                    hsrFilter[index].value = "4";
                    hsrStarImage.background = charPanel.background;
                    hsrStarImage.image!.source = "res/assets/HSR/rarity_4.png";
                }
            } else {
                const newPush: { key: keyof HSRCharData; value: string } = {
                    key: "rarity",
                    value: "5"
                };
                hsrFilter.push(newPush);
                hsrStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(hsrCharDataArray, hsrFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const zzzFourStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_AgentRank_A.png");
        zzzFourStarImage.height = "40px";
        zzzFourStarImage.width = "40px";
        zzzFourStarImage.left = -188;
        zzzFourStarImage.thickness = 0;
        zzzFourStarImage.cornerRadius = 5;
        filterBar.addControl(zzzFourStarImage);
        zzzFourStarImage.isVisible = false;
        zzzFourStarImage.onPointerClickObservable.add(function() {
            const index = zzzFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (zzzFilter[index].value == "4") {
                    zzzFilter.splice(index, 1);
                    zzzFourStarImage.background = "rgba(0,0,0,0)";
                } else {
                    zzzFilter[index].value = "4";
                    zzzFiveStarImage.background = "rgba(0,0,0,0)";
                    zzzFourStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof ZZZCharData; value: string } = {
                    key: "rarity",
                    value: "4"
                };
                zzzFilter.push(newPush);
                zzzFourStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(zzzCharDataArray, zzzFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const zzzFiveStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_AgentRank_S.png");
        zzzFiveStarImage.height = "40px";
        zzzFiveStarImage.width = "40px";
        zzzFiveStarImage.left = -148;
        zzzFiveStarImage.thickness = 0;
        zzzFiveStarImage.cornerRadius = 5;
        filterBar.addControl(zzzFiveStarImage);
        zzzFiveStarImage.isVisible = false;
        zzzFiveStarImage.onPointerClickObservable.add(function() {
            const index = zzzFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (zzzFilter[index].value == "5") {
                    zzzFilter.splice(index, 1);
                    zzzFiveStarImage.background = "rgba(0,0,0,0)";
                } else {
                    zzzFilter[index].value = "5";
                    zzzFourStarImage.background = "rgba(0,0,0,0)";
                    zzzFiveStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof ZZZCharData; value: string } = {
                    key: "rarity",
                    value: "5"
                };
                zzzFilter.push(newPush);
                zzzFiveStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(zzzCharDataArray, zzzFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const wuwaFourStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/rarity_4.png");
        wuwaFourStarImage.height = "40px";
        wuwaFourStarImage.width = "40px";
        wuwaFourStarImage.left = -188;
        wuwaFourStarImage.thickness = 0;
        wuwaFourStarImage.cornerRadius = 5;
        filterBar.addControl(wuwaFourStarImage);
        wuwaFourStarImage.isVisible = false;
        wuwaFourStarImage.onPointerClickObservable.add(function() {
            const index = wuwaFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (wuwaFilter[index].value == "4") {
                    wuwaFilter.splice(index, 1);
                    wuwaFourStarImage.background = "rgba(0,0,0,0)";
                } else {
                    wuwaFilter[index].value = "4";
                    wuwaFiveStarImage.background = "rgba(0,0,0,0)";
                    wuwaFourStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof WuwaCharData; value: string } = {
                    key: "rarity",
                    value: "4"
                };
                wuwaFilter.push(newPush);
                wuwaFourStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(wuwaCharDataArray, wuwaFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const wuwaFiveStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/rarity_5.png");
        wuwaFiveStarImage.height = "40px";
        wuwaFiveStarImage.width = "40px";
        wuwaFiveStarImage.left = -148;
        wuwaFiveStarImage.thickness = 0;
        wuwaFiveStarImage.cornerRadius = 5;
        filterBar.addControl(wuwaFiveStarImage);
        wuwaFiveStarImage.isVisible = false;
        wuwaFiveStarImage.onPointerClickObservable.add(function() {
            const index = wuwaFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (wuwaFilter[index].value == "5") {
                    wuwaFilter.splice(index, 1);
                    wuwaFiveStarImage.background = "rgba(0,0,0,0)";
                } else {
                    wuwaFilter[index].value = "5";
                    wuwaFourStarImage.background = "rgba(0,0,0,0)";
                    wuwaFiveStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof WuwaCharData; value: string } = {
                    key: "rarity",
                    value: "5"
                };
                wuwaFilter.push(newPush);
                wuwaFiveStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(wuwaCharDataArray, wuwaFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const hnaFourStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HNA/rarity_4.png");
        hnaFourStarImage.height = "40px";
        hnaFourStarImage.width = "40px";
        hnaFourStarImage.left = -188;
        hnaFourStarImage.thickness = 0;
        hnaFourStarImage.cornerRadius = 5;
        filterBar.addControl(hnaFourStarImage);
        hnaFourStarImage.isVisible = false;
        hnaFourStarImage.onPointerClickObservable.add(function() {
            const index = hnaFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (hnaFilter[index].value == "4") {
                    hnaFilter.splice(index, 1);
                    hnaFourStarImage.background = "rgba(0,0,0,0)";
                } else {
                    hnaFilter[index].value = "4";
                    hnaFiveStarImage.background = "rgba(0,0,0,0)";
                    hnaFourStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof HNACharData; value: string } = {
                    key: "rarity",
                    value: "4"
                };
                hnaFilter.push(newPush);
                hnaFourStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(hnaCharDataArray, hnaFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const hnaFiveStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HNA/rarity_5.png");
        hnaFiveStarImage.height = "40px";
        hnaFiveStarImage.width = "40px";
        hnaFiveStarImage.left = -148;
        hnaFiveStarImage.thickness = 0;
        hnaFiveStarImage.cornerRadius = 5;
        filterBar.addControl(hnaFiveStarImage);
        hnaFiveStarImage.isVisible = false;
        hnaFiveStarImage.onPointerClickObservable.add(function() {
            const index = hnaFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (hnaFilter[index].value == "5") {
                    hnaFilter.splice(index, 1);
                    hnaFiveStarImage.background = "rgba(0,0,0,0)";
                } else {
                    hnaFilter[index].value = "5";
                    hnaFourStarImage.background = "rgba(0,0,0,0)";
                    hnaFiveStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof HNACharData; value: string } = {
                    key: "rarity",
                    value: "5"
                };
                hnaFilter.push(newPush);
                hnaFiveStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(hnaCharDataArray, hnaFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const nteFourStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/rank-a.png");
        nteFourStarImage.height = "40px";
        nteFourStarImage.width = "40px";
        nteFourStarImage.left = -188;
        nteFourStarImage.thickness = 0;
        nteFourStarImage.cornerRadius = 5;
        filterBar.addControl(nteFourStarImage);
        nteFourStarImage.isVisible = false;
        nteFourStarImage.onPointerClickObservable.add(function() {
            const index = nteFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (nteFilter[index].value == "4") {
                    nteFilter.splice(index, 1);
                    nteFourStarImage.background = "rgba(0,0,0,0)";
                } else {
                    nteFilter[index].value = "4";
                    nteFiveStarImage.background = "rgba(0,0,0,0)";
                    nteFourStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof NTECharData; value: string } = {
                    key: "rarity",
                    value: "4"
                };
                nteFilter.push(newPush);
                nteFourStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(nteCharDataArray, nteFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        const nteFiveStarImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/rank-s.png");
        nteFiveStarImage.height = "40px";
        nteFiveStarImage.width = "40px";
        nteFiveStarImage.left = -148;
        nteFiveStarImage.thickness = 0;
        nteFiveStarImage.cornerRadius = 5;
        filterBar.addControl(nteFiveStarImage);
        nteFiveStarImage.isVisible = false;
        nteFiveStarImage.onPointerClickObservable.add(function() {
            const index = nteFilter.findIndex(obj => obj.key === "rarity");
            if (index !== -1) { // Object with the key exists
                if (nteFilter[index].value == "5") {
                    nteFilter.splice(index, 1);
                    nteFiveStarImage.background = "rgba(0,0,0,0)";
                } else {
                    nteFilter[index].value = "5";
                    nteFourStarImage.background = "rgba(0,0,0,0)";
                    nteFiveStarImage.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof NTECharData; value: string } = {
                    key: "rarity",
                    value: "5"
                };
                nteFilter.push(newPush);
                nteFiveStarImage.background = charPanel.background;
            }
            filteredArray = filterBy(nteCharDataArray, nteFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        });

        function checkIfInFilter(buttonObj: gui.Button, theObjType: string, theKey: keyof GenshinCharData): void {
            const index = genshinFilter.findIndex(obj => obj.key === theKey);
            if (index !== -1) { // Object with the key exists
                if (genshinFilter[index].value == theObjType) {
                    genshinFilter.splice(index, 1);
                    buttonObj.background = "rgba(0,0,0,0)";
                } else {
                    genshinFilter[index].value = theObjType;
                    if (theKey.toString() == "element") {
                        offElementBG();
                    } else {
                        offWeaponBG();
                    }
                    buttonObj.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof GenshinCharData; value: string } = {
                    key: theKey,
                    value: theObjType
                };
                genshinFilter.push(newPush);
                buttonObj.background = charPanel.background;
            }
            filteredArray = filterBy(charDataArray, genshinFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        }

        function checkIfInHSRFilter(buttonObj: gui.Button, theObjType: string, theKey: keyof HSRCharData): void {
            const index = hsrFilter.findIndex(obj => obj.key === theKey);
            if (index !== -1) { // Object with the key exists
                if (hsrFilter[index].value == theObjType) {
                    hsrFilter.splice(index, 1);
                    buttonObj.background = "rgba(0,0,0,0)";
                } else {
                    hsrFilter[index].value = theObjType;
                    if (theKey.toString() == "element") {
                        offHSRElementBG();
                    } else {
                        offPathBG();
                    }
                    buttonObj.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof HSRCharData; value: string } = {
                    key: theKey,
                    value: theObjType
                };
                hsrFilter.push(newPush);
                buttonObj.background = charPanel.background;
            }
            filteredArray = filterBy(hsrCharDataArray, hsrFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        }

        function checkIfInZZZFilter(buttonObj: gui.Button, theObjType: string, theKey: keyof ZZZCharData): void {
            const index = zzzFilter.findIndex(obj => obj.key === theKey);
            if (index !== -1) { // Object with the key exists
                if (zzzFilter[index].value == theObjType) {
                    zzzFilter.splice(index, 1);
                    buttonObj.background = "rgba(0,0,0,0)";
                } else {
                    zzzFilter[index].value = theObjType;
                    if (theKey.toString() == "element") {
                        offZZZElementBG();
                    } else {
                        offStyleBG();
                    }
                    buttonObj.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof ZZZCharData; value: string } = {
                    key: theKey,
                    value: theObjType
                };
                zzzFilter.push(newPush);
                buttonObj.background = charPanel.background;
            }
            filteredArray = filterBy(zzzCharDataArray, zzzFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        }

        function checkIfInWuwaFilter(buttonObj: gui.Button, theObjType: string, theKey: keyof WuwaCharData): void {
            const index = wuwaFilter.findIndex(obj => obj.key === theKey);
            if (index !== -1) { // Object with the key exists
                if (wuwaFilter[index].value == theObjType) {
                    wuwaFilter.splice(index, 1);
                    buttonObj.background = "rgba(0,0,0,0)";
                } else {
                    wuwaFilter[index].value = theObjType;
                    if (theKey.toString() == "element") {
                        offWuwaElementBG();
                    } else {
                        offWuwaWeaponBG();
                    }
                    buttonObj.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof WuwaCharData; value: string } = {
                    key: theKey,
                    value: theObjType
                };
                wuwaFilter.push(newPush);
                buttonObj.background = charPanel.background;
            }
            filteredArray = filterBy(wuwaCharDataArray, wuwaFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        }

        function checkIfInHNAFilter(buttonObj: gui.Button, theObjType: string, theKey: keyof HNACharData): void {
            const index = hnaFilter.findIndex(obj => obj.key === theKey);
            if (index !== -1) { // Object with the key exists
                if (hnaFilter[index].value == theObjType) {
                    hnaFilter.splice(index, 1);
                    buttonObj.background = "rgba(0,0,0,0)";
                } else {
                    hnaFilter[index].value = theObjType;
                    if (theKey.toString() == "element") {
                        offHNAElementBG();
                    } else {
                        offHNAWeaponBG();
                    }
                    buttonObj.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof HNACharData; value: string } = {
                    key: theKey,
                    value: theObjType
                };
                hnaFilter.push(newPush);
                buttonObj.background = charPanel.background;
            }
            filteredArray = filterBy(hnaCharDataArray, hnaFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        }

        function checkIfInNTEFilter(buttonObj: gui.Button, theObjType: string, theKey: keyof NTECharData): void {
            const index = nteFilter.findIndex(obj => obj.key === theKey);
            if (index !== -1) { // Object with the key exists
                if (nteFilter[index].value == theObjType) {
                    nteFilter.splice(index, 1);
                    buttonObj.background = "rgba(0,0,0,0)";
                } else {
                    nteFilter[index].value = theObjType;
                    if (theKey.toString() == "element") {
                        offNTEElementBG();
                    } else {
                        offNTEWeaponBG();
                    }
                    buttonObj.background = charPanel.background;
                }
            } else {
                const newPush: { key: keyof NTECharData; value: string } = {
                    key: theKey,
                    value: theObjType
                };
                nteFilter.push(newPush);
                buttonObj.background = charPanel.background;
            }
            filteredArray = filterBy(nteCharDataArray, nteFilter);
            filteredArray = sortBy(filteredArray, sortModeKey, sortModeAscending);
            generateGrid(filteredArray);
        }

        const fireImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/element_fire.png");
        fireImage.height = "40px";
        fireImage.width = "40px";
        fireImage.left = 52;
        fireImage.thickness = 0;
        fireImage.cornerRadius = 5;
        fireImage.isVisible = false;
        filterBar.addControl(fireImage);
        fireImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(fireImage, "Fire", "element");
        });
        fireImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Fire";
        });
        fireImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const iceImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/element_ice.png");
        iceImage.height = "40px";
        iceImage.width = "40px";
        iceImage.left = 92;
        iceImage.thickness = 0;
        iceImage.cornerRadius = 5;
        iceImage.isVisible = false;
        filterBar.addControl(iceImage);
        iceImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(iceImage, "Ice", "element");
        });
        iceImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Ice";
        });
        iceImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const imaginaryImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/element_imaginary.png");
        imaginaryImage.height = "40px";
        imaginaryImage.width = "40px";
        imaginaryImage.left = 132;
        imaginaryImage.thickness = 0;
        imaginaryImage.cornerRadius = 5;
        imaginaryImage.isVisible = false;
        filterBar.addControl(imaginaryImage);
        imaginaryImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(imaginaryImage, "Imaginary", "element");
        });
        imaginaryImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Imaginary";
        });
        imaginaryImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const lightningImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/element_lightning.png");
        lightningImage.height = "40px";
        lightningImage.width = "40px";
        lightningImage.left = 172;
        lightningImage.thickness = 0;
        lightningImage.cornerRadius = 5;
        lightningImage.isVisible = false;
        filterBar.addControl(lightningImage);
        lightningImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(lightningImage, "Lightning", "element");
        });
        lightningImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Lightning";
        });
        lightningImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const physicalImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/element_physical.png");
        physicalImage.height = "40px";
        physicalImage.width = "40px";
        physicalImage.left = 212;
        physicalImage.thickness = 0;
        physicalImage.cornerRadius = 5;
        physicalImage.isVisible = false;
        filterBar.addControl(physicalImage);
        physicalImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(physicalImage, "Physical", "element");
        });
        physicalImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Physical";
        });
        physicalImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const quantumImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/element_quantum.png");
        quantumImage.height = "40px";
        quantumImage.width = "40px";
        quantumImage.left = 252;
        quantumImage.thickness = 0;
        quantumImage.cornerRadius = 5;
        quantumImage.isVisible = false;
        filterBar.addControl(quantumImage);
        quantumImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(quantumImage, "Quantum", "element");
        });
        quantumImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Quantum";
        });
        quantumImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const windImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/element_wind.png");
        windImage.height = "40px";
        windImage.width = "40px";
        windImage.left = 292;
        windImage.thickness = 0;
        windImage.cornerRadius = 5;
        windImage.isVisible = false;
        filterBar.addControl(windImage);
        windImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(windImage, "Wind", "element");
        });
        windImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Wind";
        });
        windImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const abundanceImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_abundance.png");
        abundanceImage.height = "40px";
        abundanceImage.width = "40px";
        abundanceImage.left = -8;
        abundanceImage.thickness = 0;
        abundanceImage.cornerRadius = 5;
        abundanceImage.isVisible = false;
        filterBar2.addControl(abundanceImage);
        abundanceImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(abundanceImage, "Abundance", "weaponType");
        });
        abundanceImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Abundance";
        });
        abundanceImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const destructionImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_destruction.png");
        destructionImage.height = "40px";
        destructionImage.width = "40px";
        destructionImage.left = 32;
        destructionImage.thickness = 0;
        destructionImage.cornerRadius = 5;
        destructionImage.isVisible = false;
        filterBar2.addControl(destructionImage);
        destructionImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(destructionImage, "Destruction", "weaponType");
        });
        destructionImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Destruction";
        });
        destructionImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const eruditionImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_erudition.png");
        eruditionImage.height = "40px";
        eruditionImage.width = "40px";
        eruditionImage.left = 72;
        eruditionImage.thickness = 0;
        eruditionImage.cornerRadius = 5;
        eruditionImage.isVisible = false;
        filterBar2.addControl(eruditionImage);
        eruditionImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(eruditionImage, "Erudition", "weaponType");
        });
        eruditionImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Erudition";
        });
        eruditionImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const harmonyImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_harmony.png");
        harmonyImage.height = "40px";
        harmonyImage.width = "40px";
        harmonyImage.left = 112;
        harmonyImage.thickness = 0;
        harmonyImage.cornerRadius = 5;
        harmonyImage.isVisible = false;
        filterBar2.addControl(harmonyImage);
        harmonyImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(harmonyImage, "Harmony", "weaponType");
        });
        harmonyImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Harmony";
        });
        harmonyImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const huntImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_hunt.png");
        huntImage.height = "40px";
        huntImage.width = "40px";
        huntImage.left = 152;
        huntImage.thickness = 0;
        huntImage.cornerRadius = 5;
        huntImage.isVisible = false;
        filterBar2.addControl(huntImage);
        huntImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(huntImage, "Hunt", "weaponType");
        });
        huntImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Hunt";
        });
        huntImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const nihilityImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_nihility.png");
        nihilityImage.height = "40px";
        nihilityImage.width = "40px";
        nihilityImage.left = 192;
        nihilityImage.thickness = 0;
        nihilityImage.cornerRadius = 5;
        nihilityImage.isVisible = false;
        filterBar2.addControl(nihilityImage);
        nihilityImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(nihilityImage, "Nihility", "weaponType");
        });
        nihilityImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Nihility";
        });
        nihilityImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const preservationImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_preservation.png");
        preservationImage.height = "40px";
        preservationImage.width = "40px";
        preservationImage.left = 232;
        preservationImage.thickness = 0;
        preservationImage.cornerRadius = 5;
        preservationImage.isVisible = false;
        filterBar2.addControl(preservationImage);
        preservationImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(preservationImage, "Preservation", "weaponType");
        });
        preservationImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Preservation";
        });
        preservationImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const remembranceImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_remembrance.png");
        remembranceImage.height = "40px";
        remembranceImage.width = "40px";
        remembranceImage.left = 272;
        remembranceImage.thickness = 0;
        remembranceImage.cornerRadius = 5;
        remembranceImage.isVisible = false;
        filterBar2.addControl(remembranceImage);
        remembranceImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(remembranceImage, "Remembrance", "weaponType");
        });
        remembranceImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Remembrance";
        });
        remembranceImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const elationImage = gui.Button.CreateImageOnlyButton("but", "res/assets/HSR/path_the_elation.png");
        elationImage.height = "40px";
        elationImage.width = "40px";
        elationImage.left = 312;
        elationImage.thickness = 0;
        elationImage.cornerRadius = 5;
        elationImage.isVisible = false;
        filterBar2.addControl(elationImage);
        elationImage.onPointerClickObservable.add(function() {
            checkIfInHSRFilter(elationImage, "Elation", "weaponType");
        });
        elationImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Elation";
        });
        elationImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        function hideHSRElements(): void {
            fireImage.isVisible = false;
            iceImage.isVisible = false;
            imaginaryImage.isVisible = false;
            lightningImage.isVisible = false;
            physicalImage.isVisible = false;
            quantumImage.isVisible = false;
            windImage.isVisible = false;
            abundanceImage.isVisible = false;
            destructionImage.isVisible = false;
            eruditionImage.isVisible = false;
            harmonyImage.isVisible = false;
            huntImage.isVisible = false;
            nihilityImage.isVisible = false;
            preservationImage.isVisible = false;
            remembranceImage.isVisible = false;
            elationImage.isVisible = false;
            hsrSortModeChanger.isVisible = false;
            hsrStarImage.isVisible = false;
        }

        function showAllHSRElements(): void {
            fireImage.isVisible = true;
            iceImage.isVisible = true;
            imaginaryImage.isVisible = true;
            lightningImage.isVisible = true;
            physicalImage.isVisible = true;
            quantumImage.isVisible = true;
            windImage.isVisible = true;
            abundanceImage.isVisible = true;
            destructionImage.isVisible = true;
            eruditionImage.isVisible = true;
            harmonyImage.isVisible = true;
            huntImage.isVisible = true;
            nihilityImage.isVisible = true;
            preservationImage.isVisible = true;
            remembranceImage.isVisible = true;
            elationImage.isVisible = true;
            hsrSortModeChanger.isVisible = true;
            hsrStarImage.isVisible = true;
        }


        function offHSRElementBG(): void {
            fireImage.background = "rgba(0,0,0,0)";
            iceImage.background = "rgba(0,0,0,0)";
            imaginaryImage.background = "rgba(0,0,0,0)";
            lightningImage.background = "rgba(0,0,0,0)";
            physicalImage.background = "rgba(0,0,0,0)";
            quantumImage.background = "rgba(0,0,0,0)";
            windImage.background = "rgba(0,0,0,0)";
        }

        function offPathBG(): void {
            abundanceImage.background = "rgba(0,0,0,0)";
            destructionImage.background = "rgba(0,0,0,0)";
            eruditionImage.background = "rgba(0,0,0,0)";
            harmonyImage.background = "rgba(0,0,0,0)";
            huntImage.background = "rgba(0,0,0,0)";
            nihilityImage.background = "rgba(0,0,0,0)";
            preservationImage.background = "rgba(0,0,0,0)";
            remembranceImage.background = "rgba(0,0,0,0)";
            elationImage.background = "rgba(0,0,0,0)";
        }

        const anemoImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/element_anemo.png");
        anemoImage.height = "40px";
        anemoImage.width = "40px";
        anemoImage.left = 52;
        anemoImage.thickness = 0;
        anemoImage.cornerRadius = 5;
        filterBar.addControl(anemoImage);
        anemoImage.onPointerClickObservable.add(function() {
            checkIfInFilter(anemoImage, "Anemo", "element");
        });
        anemoImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Anemo";
        });
        anemoImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const geoImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/element_geo.png");
        geoImage.height = "40px";
        geoImage.width = "40px";
        geoImage.left = 92;
        geoImage.thickness = 0;
        geoImage.cornerRadius = 5;
        filterBar.addControl(geoImage);
        geoImage.onPointerClickObservable.add(function() {
            checkIfInFilter(geoImage, "Geo", "element");
        });
        geoImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Geo";
        });
        geoImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const electroImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/element_electro.png");
        electroImage.height = "40px";
        electroImage.width = "40px";
        electroImage.left = 132;
        electroImage.thickness = 0;
        electroImage.cornerRadius = 5;
        filterBar.addControl(electroImage);
        electroImage.onPointerClickObservable.add(function() {
            checkIfInFilter(electroImage, "Electro", "element");
        });
        electroImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Electro";
        });
        electroImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const dendroImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/element_dendro.png");
        dendroImage.height = "40px";
        dendroImage.width = "40px";
        dendroImage.left = 172;
        dendroImage.thickness = 0;
        dendroImage.cornerRadius = 5;
        filterBar.addControl(dendroImage);
        dendroImage.onPointerClickObservable.add(function() {
            checkIfInFilter(dendroImage, "Dendro", "element");
        });
        dendroImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Dendro";
        });
        dendroImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const hydroImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/element_hydro.png");
        hydroImage.height = "40px";
        hydroImage.width = "40px";
        hydroImage.left = 212;
        hydroImage.thickness = 0;
        hydroImage.cornerRadius = 5;
        filterBar.addControl(hydroImage);
        hydroImage.onPointerClickObservable.add(function() {
            checkIfInFilter(hydroImage, "Hydro", "element");
        });
        hydroImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Hydro";
        });
        hydroImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const pyroImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/element_pyro.png");
        pyroImage.height = "40px";
        pyroImage.width = "40px";
        pyroImage.left = 252;
        pyroImage.thickness = 0;
        pyroImage.cornerRadius = 5;
        filterBar.addControl(pyroImage);
        pyroImage.onPointerClickObservable.add(function() {
            checkIfInFilter(pyroImage, "Pyro", "element");
        });
        pyroImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Pyro";
        });
        pyroImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const cryoImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/element_cryo.png");
        cryoImage.height = "40px";
        cryoImage.width = "40px";
        cryoImage.left = 292;
        cryoImage.thickness = 0;
        cryoImage.cornerRadius = 5;
        filterBar.addControl(cryoImage);
        cryoImage.onPointerClickObservable.add(function() {
            checkIfInFilter(cryoImage, "Cryo", "element");
        });
        cryoImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Cryo";
        });
        cryoImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const swordImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/Sword.png");
        swordImage.height = "40px";
        swordImage.width = "40px";
        swordImage.left = 92;
        swordImage.thickness = 0;
        swordImage.cornerRadius = 5;
        filterBar2.addControl(swordImage);
        swordImage.onPointerClickObservable.add(function() {
            checkIfInFilter(swordImage, "Sword", "weaponType");
        });
        swordImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Sword";
        });
        swordImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const catalystImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/Catalyst.png");
        catalystImage.height = "40px";
        catalystImage.width = "40px";
        catalystImage.left = 132;
        catalystImage.thickness = 0;
        catalystImage.cornerRadius = 5;
        filterBar2.addControl(catalystImage);
        catalystImage.onPointerClickObservable.add(function() {
            checkIfInFilter(catalystImage, "Catalyst", "weaponType");
        });
        catalystImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Catalyst";
        });
        catalystImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const bowImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/Bow.png");
        bowImage.height = "40px";
        bowImage.width = "40px";
        bowImage.left = 172;
        bowImage.thickness = 0;
        bowImage.cornerRadius = 5;
        filterBar2.addControl(bowImage);
        bowImage.onPointerClickObservable.add(function() {
            checkIfInFilter(bowImage, "Bow", "weaponType");
        });
        bowImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Bow";
        });
        bowImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const claymoreImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/Claymore.png");
        claymoreImage.height = "40px";
        claymoreImage.width = "40px";
        claymoreImage.left = 212;
        claymoreImage.thickness = 0;
        claymoreImage.cornerRadius = 5;
        filterBar2.addControl(claymoreImage);
        claymoreImage.onPointerClickObservable.add(function() {
            checkIfInFilter(claymoreImage, "Claymore", "weaponType");
        });
        claymoreImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Claymore";
        });
        claymoreImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const poleImage = gui.Button.CreateImageOnlyButton("but", "res/assets/Genshin/Pole.png");
        poleImage.height = "40px";
        poleImage.width = "40px";
        poleImage.left = 252;
        poleImage.thickness = 0;
        poleImage.cornerRadius = 5;
        filterBar2.addControl(poleImage);
        poleImage.onPointerClickObservable.add(function() {
            checkIfInFilter(poleImage, "Polearm", "weaponType");
        });
        poleImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Polearm";
        });
        poleImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        function hideGenshinElements(): void {
            fourStarImage.isVisible = false;
            fiveStarImage.isVisible = false;
            anemoImage.isVisible = false;
            geoImage.isVisible = false;
            electroImage.isVisible = false;
            dendroImage.isVisible = false;
            hydroImage.isVisible = false;
            pyroImage.isVisible = false;
            cryoImage.isVisible = false;
            swordImage.isVisible = false;
            catalystImage.isVisible = false;
            bowImage.isVisible = false;
            claymoreImage.isVisible = false;
            poleImage.isVisible = false;
            sortModeChanger.isVisible = false;
        }

        function showGenshinElements(): void {
            fourStarImage.isVisible = true;
            fiveStarImage.isVisible = true;
            anemoImage.isVisible = true;
            geoImage.isVisible = true;
            electroImage.isVisible = true;
            dendroImage.isVisible = true;
            hydroImage.isVisible = true;
            pyroImage.isVisible = true;
            cryoImage.isVisible = true;
            swordImage.isVisible = true;
            catalystImage.isVisible = true;
            bowImage.isVisible = true;
            claymoreImage.isVisible = true;
            poleImage.isVisible = true;
            sortModeChanger.isVisible = true;
        }

        function offElementBG(): void {
            anemoImage.background = "rgba(0,0,0,0)";
            geoImage.background = "rgba(0,0,0,0)";
            electroImage.background = "rgba(0,0,0,0)";
            dendroImage.background = "rgba(0,0,0,0)";
            hydroImage.background = "rgba(0,0,0,0)";
            pyroImage.background = "rgba(0,0,0,0)";
            cryoImage.background = "rgba(0,0,0,0)";
        }

        function offWeaponBG(): void {
            swordImage.background = "rgba(0,0,0,0)";
            catalystImage.background = "rgba(0,0,0,0)";
            bowImage.background = "rgba(0,0,0,0)";
            claymoreImage.background = "rgba(0,0,0,0)";
            poleImage.background = "rgba(0,0,0,0)";
        }

        function hideHNAElements(): void {
            hnaFourStarImage.isVisible = false;
            hnaFiveStarImage.isVisible = false;
            sortModeChanger.isVisible = false;
        }

        function showHNAElements(): void {
            hnaFourStarImage.isVisible = true;
            hnaFiveStarImage.isVisible = true;
            sortModeChanger.isVisible = true;
        }

        function offHNAElementBG(): void {

        }

        function offHNAWeaponBG(): void {

        }

        checkIfInHNAFilter;

        const animaImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/anima.png");
        animaImage.height = "40px";
        animaImage.width = "40px";
        animaImage.left = 52;
        animaImage.thickness = 0;
        animaImage.cornerRadius = 5;
        filterBar.addControl(animaImage);
        animaImage.onPointerClickObservable.add(function() {
            checkIfInNTEFilter(animaImage, "Anima", "element");
        });
        animaImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Anima";
        });
        animaImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const chaosImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/chaos.png");
        chaosImage.height = "40px";
        chaosImage.width = "40px";
        chaosImage.left = 92;
        chaosImage.thickness = 0;
        chaosImage.cornerRadius = 5;
        filterBar.addControl(chaosImage);
        chaosImage.onPointerClickObservable.add(function() {
            checkIfInNTEFilter(chaosImage, "Chaos", "element");
        });
        chaosImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Chaos";
        });
        chaosImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const cosmosImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/cosmos.png");
        cosmosImage.height = "40px";
        cosmosImage.width = "40px";
        cosmosImage.left = 132;
        cosmosImage.thickness = 0;
        cosmosImage.cornerRadius = 5;
        filterBar.addControl(cosmosImage);
        cosmosImage.onPointerClickObservable.add(function() {
            checkIfInNTEFilter(cosmosImage, "Cosmos", "element");
        });
        cosmosImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Cosmos";
        });
        cosmosImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const incantationImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/incantation.png");
        incantationImage.height = "40px";
        incantationImage.width = "40px";
        incantationImage.left = 172;
        incantationImage.thickness = 0;
        incantationImage.cornerRadius = 5;
        filterBar.addControl(incantationImage);
        incantationImage.onPointerClickObservable.add(function() {
            checkIfInNTEFilter(incantationImage, "Incantation", "element");
        });
        incantationImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Incantation";
        });
        incantationImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const lakshanaImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/lakshana.png");
        lakshanaImage.height = "40px";
        lakshanaImage.width = "40px";
        lakshanaImage.left = 212;
        lakshanaImage.thickness = 0;
        lakshanaImage.cornerRadius = 5;
        filterBar.addControl(lakshanaImage);
        lakshanaImage.onPointerClickObservable.add(function() {
            checkIfInNTEFilter(lakshanaImage, "Lakshana", "element");
        });
        lakshanaImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Lakshana";
        });
        lakshanaImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const psycheImage = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/psyche.png");
        psycheImage.height = "40px";
        psycheImage.width = "40px";
        psycheImage.left = 252;
        psycheImage.thickness = 0;
        psycheImage.cornerRadius = 5;
        filterBar.addControl(psycheImage);
        psycheImage.onPointerClickObservable.add(function() {
            checkIfInNTEFilter(psycheImage, "Psyche", "element");
        });
        psycheImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Psyche";
        });
        psycheImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        function hideNTEElements(): void {
            nteFourStarImage.isVisible = false;
            nteFiveStarImage.isVisible = false;
            animaImage.isVisible = false;
            chaosImage.isVisible = false;
            cosmosImage.isVisible = false;
            incantationImage.isVisible = false;
            lakshanaImage.isVisible = false;
            psycheImage.isVisible = false;
            sortModeChanger.isVisible = false;
        }
        
        function showNTEElements(): void {
            nteFourStarImage.isVisible = true;
            nteFiveStarImage.isVisible = true;
            animaImage.isVisible = true;
            chaosImage.isVisible = true;
            cosmosImage.isVisible = true;
            incantationImage.isVisible = true;
            lakshanaImage.isVisible = true;
            psycheImage.isVisible = true;
            sortModeChanger.isVisible = true;
        }

        function offNTEElementBG(): void {
            animaImage.background = "rgba(0,0,0,0)";
            chaosImage.background = "rgba(0,0,0,0)";
            cosmosImage.background = "rgba(0,0,0,0)";
            incantationImage.background = "rgba(0,0,0,0)";
            lakshanaImage.background = "rgba(0,0,0,0)";
            psycheImage.background = "rgba(0,0,0,0)";
        }

        function offNTEWeaponBG(): void {

        }

        hideNTEElements();

        const electricImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Electric.png");
        electricImage.height = "40px";
        electricImage.width = "40px";
        electricImage.left = 92;
        electricImage.thickness = 0;
        electricImage.cornerRadius = 5;
        electricImage.isVisible = false;
        filterBar.addControl(electricImage);
        electricImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(electricImage, "Electric", "element");
        });
        electricImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Electric";
        });
        electricImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const etherImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Ether.png");
        etherImage.height = "40px";
        etherImage.width = "40px";
        etherImage.left = 132;
        etherImage.thickness = 0;
        etherImage.cornerRadius = 5;
        etherImage.isVisible = false;
        filterBar.addControl(etherImage);
        etherImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(etherImage, "Ether", "element");
        });
        etherImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Ether";
        });
        etherImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const zzzFireImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Fire.png");
        zzzFireImage.height = "40px";
        zzzFireImage.width = "40px";
        zzzFireImage.left = 172;
        zzzFireImage.thickness = 0;
        zzzFireImage.cornerRadius = 5;
        zzzFireImage.isVisible = false;
        filterBar.addControl(zzzFireImage);
        zzzFireImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(zzzFireImage, "Fire", "element");
        });
        zzzFireImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Fire";
        });
        zzzFireImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const zzzIceImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Ice.png");
        zzzIceImage.height = "40px";
        zzzIceImage.width = "40px";
        zzzIceImage.left = 212;
        zzzIceImage.thickness = 0;
        zzzIceImage.cornerRadius = 5;
        zzzIceImage.isVisible = false;
        filterBar.addControl(zzzIceImage);
        zzzIceImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(zzzIceImage, "Ice", "element");
        });
        zzzIceImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Ice";
        });
        zzzIceImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const zzzPhyscialImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Physical.png");
        zzzPhyscialImage.height = "40px";
        zzzPhyscialImage.width = "40px";
        zzzPhyscialImage.left = 252;
        zzzPhyscialImage.thickness = 0;
        zzzPhyscialImage.cornerRadius = 5;
        zzzPhyscialImage.isVisible = false;
        filterBar.addControl(zzzPhyscialImage);
        zzzPhyscialImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(zzzPhyscialImage, "Physical", "element");
        });
        zzzPhyscialImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Physical";
        });
        zzzPhyscialImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const anomalyImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Anomaly.png");
        anomalyImage.height = "40px";
        anomalyImage.width = "40px";
        anomalyImage.left = 92;
        anomalyImage.thickness = 0;
        anomalyImage.cornerRadius = 5;
        anomalyImage.isVisible = false;
        filterBar2.addControl(anomalyImage);
        anomalyImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(anomalyImage, "Anomaly", "weaponType");
        });
        anomalyImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Anomaly";
        });
        anomalyImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const attackImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Attack.png");
        attackImage.height = "40px";
        attackImage.width = "40px";
        attackImage.left = 132;
        attackImage.thickness = 0;
        attackImage.cornerRadius = 5;
        attackImage.isVisible = false;
        filterBar2.addControl(attackImage);
        attackImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(attackImage, "Attack", "weaponType");
        });
        attackImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Attack";
        });
        attackImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const defenseImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Defense.png");
        defenseImage.height = "40px";
        defenseImage.width = "40px";
        defenseImage.left = 172;
        defenseImage.thickness = 0;
        defenseImage.cornerRadius = 5;
        defenseImage.isVisible = false;
        filterBar2.addControl(defenseImage);
        defenseImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(defenseImage, "Defense", "weaponType");
        });
        defenseImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Defense";
        });
        defenseImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const stunImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Stun.png");
        stunImage.height = "40px";
        stunImage.width = "40px";
        stunImage.left = 212;
        stunImage.thickness = 0;
        stunImage.cornerRadius = 5;
        stunImage.isVisible = false;
        filterBar2.addControl(stunImage);
        stunImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(stunImage, "Stun", "weaponType");
        });
        stunImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Stun";
        });
        stunImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const supportImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Support.png");
        supportImage.height = "40px";
        supportImage.width = "40px";
        supportImage.left = 252;
        supportImage.thickness = 0;
        supportImage.cornerRadius = 5;
        supportImage.isVisible = false;
        filterBar2.addControl(supportImage);
        supportImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(supportImage, "Support", "weaponType");
        });
        supportImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Support";
        });
        supportImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const ruptureImage = gui.Button.CreateImageOnlyButton("but", "res/assets/ZZZ/Icon_Rupture.png");
        ruptureImage.height = "40px";
        ruptureImage.width = "40px";
        ruptureImage.left = 292;
        ruptureImage.thickness = 0;
        ruptureImage.cornerRadius = 5;
        ruptureImage.isVisible = false;
        filterBar2.addControl(ruptureImage);
        ruptureImage.onPointerClickObservable.add(function() {
            checkIfInZZZFilter(ruptureImage, "Rupture", "weaponType");
        });
        ruptureImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Rupture";
        });
        ruptureImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        function hideZZZElements(): void {
            zzzFourStarImage.isVisible = false;
            zzzFiveStarImage.isVisible = false;
            electricImage.isVisible = false;
            etherImage.isVisible = false;
            zzzFireImage.isVisible = false;
            zzzIceImage.isVisible = false;
            zzzPhyscialImage.isVisible = false;
            anomalyImage.isVisible = false;
            attackImage.isVisible = false;
            defenseImage.isVisible = false;
            stunImage.isVisible = false;
            supportImage.isVisible = false;
            ruptureImage.isVisible = false;
            sortModeChanger.isVisible = false;
        }

        function showAllZZZElements(): void {
            zzzFourStarImage.isVisible = true;
            zzzFiveStarImage.isVisible = true;
            electricImage.isVisible = true;
            etherImage.isVisible = true;
            zzzFireImage.isVisible = true;
            zzzIceImage.isVisible = true;
            zzzPhyscialImage.isVisible = true;
            anomalyImage.isVisible = true;
            attackImage.isVisible = true;
            defenseImage.isVisible = true;
            stunImage.isVisible = true;
            supportImage.isVisible = true;
            ruptureImage.isVisible = true;
            sortModeChanger.isVisible = true;
        }

        function offZZZElementBG(): void {
            electricImage.background = "rgba(0,0,0,0)";
            etherImage.background = "rgba(0,0,0,0)";
            zzzFireImage.background = "rgba(0,0,0,0)";
            zzzIceImage.background = "rgba(0,0,0,0)";
            zzzPhyscialImage.background = "rgba(0,0,0,0)";
        }

        function offStyleBG(): void {
            anomalyImage.background = "rgba(0,0,0,0)";
            attackImage.background = "rgba(0,0,0,0)";
            defenseImage.background = "rgba(0,0,0,0)";
            stunImage.background = "rgba(0,0,0,0)";
            supportImage.background = "rgba(0,0,0,0)";
            ruptureImage.background = "rgba(0,0,0,0)";
        }

        const aeroImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Aero.png");
        aeroImage.height = "40px";
        aeroImage.width = "40px";
        aeroImage.left = 52;
        aeroImage.thickness = 0;
        aeroImage.cornerRadius = 5;
        filterBar.addControl(aeroImage);
        aeroImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(aeroImage, "Aero", "element");
        });
        aeroImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Aero";
        });
        aeroImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const spectroImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Spectro.png");
        spectroImage.height = "40px";
        spectroImage.width = "40px";
        spectroImage.left = 92;
        spectroImage.thickness = 0;
        spectroImage.cornerRadius = 5;
        filterBar.addControl(spectroImage);
        spectroImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(spectroImage, "Spectro", "element");
        });
        spectroImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Spectro";
        });
        spectroImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const electroWuwaImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Electro.png");
        electroWuwaImage.height = "40px";
        electroWuwaImage.width = "40px";
        electroWuwaImage.left = 132;
        electroWuwaImage.thickness = 0;
        electroWuwaImage.cornerRadius = 5;
        filterBar.addControl(electroWuwaImage);
        electroWuwaImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(electroWuwaImage, "Electro", "element");
        });
        electroWuwaImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Electro";
        });
        electroWuwaImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const havocImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Havoc.png");
        havocImage.height = "40px";
        havocImage.width = "40px";
        havocImage.left = 172;
        havocImage.thickness = 0;
        havocImage.cornerRadius = 5;
        filterBar.addControl(havocImage);
        havocImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(havocImage, "Havoc", "element");
        });
        havocImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Havoc";
        });
        havocImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const glacioImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Glacio.png");
        glacioImage.height = "40px";
        glacioImage.width = "40px";
        glacioImage.left = 212;
        glacioImage.thickness = 0;
        glacioImage.cornerRadius = 5;
        filterBar.addControl(glacioImage);
        glacioImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(glacioImage, "Glacio", "element");
        });
        glacioImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Glacio";
        });
        glacioImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const fusionImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Fusion.png");
        fusionImage.height = "40px";
        fusionImage.width = "40px";
        fusionImage.left = 252;
        fusionImage.thickness = 0;
        fusionImage.cornerRadius = 5;
        filterBar.addControl(fusionImage);
        fusionImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(fusionImage, "Fusion", "element");
        });
        fusionImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Fusion";
        });
        fusionImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const swordWuwaImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Sword_Icon.png");
        swordWuwaImage.height = "40px";
        swordWuwaImage.width = "40px";
        swordWuwaImage.left = 92;
        swordWuwaImage.thickness = 0;
        swordWuwaImage.cornerRadius = 5;
        filterBar2.addControl(swordWuwaImage);
        swordWuwaImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(swordWuwaImage, "Sword", "weaponType");
        });
        swordWuwaImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Sword";
        });
        swordWuwaImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const rectifierImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Rectifier_Icon.png");
        rectifierImage.height = "40px";
        rectifierImage.width = "40px";
        rectifierImage.left = 132;
        rectifierImage.thickness = 0;
        rectifierImage.cornerRadius = 5;
        filterBar2.addControl(rectifierImage);
        rectifierImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(rectifierImage, "Rectifier", "weaponType");
        });
        rectifierImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Rectifier";
        });
        rectifierImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const pistolsImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Pistols_Icon.png");
        pistolsImage.height = "40px";
        pistolsImage.width = "40px";
        pistolsImage.left = 172;
        pistolsImage.thickness = 0;
        pistolsImage.cornerRadius = 5;
        filterBar2.addControl(pistolsImage);
        pistolsImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(pistolsImage, "Pistols", "weaponType");
        });
        pistolsImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Pistols";
        });
        pistolsImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const gauntletsImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Gauntlets_Icon.png");
        gauntletsImage.height = "40px";
        gauntletsImage.width = "40px";
        gauntletsImage.left = 212;
        gauntletsImage.thickness = 0;
        gauntletsImage.cornerRadius = 5;
        filterBar2.addControl(gauntletsImage);
        gauntletsImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(gauntletsImage, "Gauntlets", "weaponType");
        });
        gauntletsImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Gauntlets";
        });
        gauntletsImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        const broadbladeImage = gui.Button.CreateImageOnlyButton("but", "res/assets/WuWa/Broadblade_Icon.png");
        broadbladeImage.height = "40px";
        broadbladeImage.width = "40px";
        broadbladeImage.left = 252;
        broadbladeImage.thickness = 0;
        broadbladeImage.cornerRadius = 5;
        filterBar2.addControl(broadbladeImage);
        broadbladeImage.onPointerClickObservable.add(function() {
            checkIfInWuwaFilter(broadbladeImage, "Broadblade", "weaponType");
        });
        broadbladeImage.onPointerEnterObservable.add(function() {
            hoverCharName.text = "Broadblade";
        });
        broadbladeImage.onPointerOutObservable.add(function() {
            hoverCharName.text = "";
        });

        function hideWuwaElements(): void {
            wuwaFourStarImage.isVisible = false;
            wuwaFiveStarImage.isVisible = false;
            aeroImage.isVisible = false;
            spectroImage.isVisible = false;
            electroWuwaImage.isVisible = false;
            havocImage.isVisible = false;
            glacioImage.isVisible = false;
            fusionImage.isVisible = false;
            swordWuwaImage.isVisible = false;
            rectifierImage.isVisible = false;
            pistolsImage.isVisible = false;
            gauntletsImage.isVisible = false;
            broadbladeImage.isVisible = false;
            sortModeChanger.isVisible = false;
            // searchImage.image!.source = "res/assets/search.png";
        }

        function showAllWuwaElements(): void {
            wuwaFourStarImage.isVisible = true;
            wuwaFiveStarImage.isVisible = true;
            aeroImage.isVisible = true;
            spectroImage.isVisible = true;
            electroWuwaImage.isVisible = true;
            havocImage.isVisible = true;
            glacioImage.isVisible = true;
            fusionImage.isVisible = true;
            swordWuwaImage.isVisible = true;
            rectifierImage.isVisible = true;
            pistolsImage.isVisible = true;
            gauntletsImage.isVisible = true;
            broadbladeImage.isVisible = true;
            sortModeChanger.isVisible = true;
        }

        function offWuwaElementBG(): void {
            aeroImage.background = "rgba(0,0,0,0)";
            spectroImage.background = "rgba(0,0,0,0)";
            electroWuwaImage.background = "rgba(0,0,0,0)";
            havocImage.background = "rgba(0,0,0,0)";
            glacioImage.background = "rgba(0,0,0,0)";
            fusionImage.background = "rgba(0,0,0,0)";
        }

        function offWuwaWeaponBG(): void {
            swordWuwaImage.background = "rgba(0,0,0,0)";
            rectifierImage.background = "rgba(0,0,0,0)";
            pistolsImage.background = "rgba(0,0,0,0)";
            gauntletsImage.background = "rgba(0,0,0,0)";
            broadbladeImage.background = "rgba(0,0,0,0)";
        }
        hideWuwaElements();
        sortModeChanger.isVisible = true;

        const myScrollViewer = new gui.ScrollViewer("scrollName");
        myScrollViewer.cornerRadiusX = 15;
        myScrollViewer.cornerRadiusY = 15;
        myScrollViewer.thickness = 0;
        panel.addControl(myScrollViewer);
        // For mobile scrolling
        let allow_pointer_events_be_captured_by_scroll_viewer = false;
        myScrollViewer.onPointerDownObservable.add(() => {
            allow_pointer_events_be_captured_by_scroll_viewer = true;
        });
        myScrollViewer.onPointerUpObservable.add(() => {
            allow_pointer_events_be_captured_by_scroll_viewer = false;
        });

        let y_down: number | undefined = undefined;
        let vertical_scroll_start: number | undefined = undefined;
        function onPointerDownSroll(evt: IPointerEvent): void {
            if (!allow_pointer_events_be_captured_by_scroll_viewer) return;
            y_down = evt.offsetY;
            vertical_scroll_start = myScrollViewer.verticalBar.value;
        }

        function onPointerMoveScroll(evt: IPointerEvent): void {
            if (!allow_pointer_events_be_captured_by_scroll_viewer) return;
            if (y_down === undefined) return;
            if (vertical_scroll_start === undefined) return;
            let y_diff = evt.offsetY - y_down;
            if (isMobile) {
                y_diff = y_diff * 3;
            }
            const y_ratio = y_diff / (grid.heightInPixels - myScrollViewer.heightInPixels);
            myScrollViewer.verticalBar.value = vertical_scroll_start - y_ratio;
        }

        function onPointerUpScroll(): void {
            if (!allow_pointer_events_be_captured_by_scroll_viewer) return;
            y_down = undefined;
        }

        let grid = new gui.Grid();
        let rows = 10;

        function generateGrid<T extends {id: number, name: string, rarity: number, image: string}>(
            dataArray: T[]
        ): void {
            grid.dispose();
            grid = new gui.Grid();
            rows = Math.ceil(dataArray.length / 5) + 1;
            grid.removeRowDefinition;

            grid.color = "black";
            grid.width = "680px";
            grid.heightInPixels = rows * grid.widthInPixels / 5;
            grid.addColumnDefinition(0.2);
            grid.addColumnDefinition(0.2);
            grid.addColumnDefinition(0.2);
            grid.addColumnDefinition(0.2);
            grid.addColumnDefinition(0.2);

            for (let i = 0; i < rows; i++) {
                grid.addRowDefinition(1 / rows);
            }
            myScrollViewer.addControl(grid);

            let charIndex = 0;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < 5; j++) {
                    if (charIndex > dataArray.length - 1) {
                        let charButton: gui.Button;
                        extraDataArray;
                        if (tabMode == "Genshin" || tabMode == "None") {
                            charButton = gui.Button.CreateImageOnlyButton("but", baseUrl + "gi/Genshin/Paimon.png");
                            charButton.onPointerEnterObservable.add(function() {
                                hoverCharName.text = "Paimon";
                            });
                            charButton.onPointerClickObservable.add(async function() {
                                charPanel.isVisible = !charPanel.isVisible;
                                if (chosenCharName != "Paimon") {
                                    await changeCharacter("Paimon");
                                }
                            });
                        } else if (tabMode == "HSR") {
                            charButton = gui.Button.CreateImageOnlyButton("but", baseUrl + "hsr/HSR/Pom-Pom.png");
                            charButton.onPointerEnterObservable.add(function() {
                                hoverCharName.text = "Pom-Pom";
                            });
                            charButton.onPointerClickObservable.add(async function() {
                                charPanel.isVisible = !charPanel.isVisible;
                                if (chosenCharName != "Pom-Pom") {
                                    await changeCharacter("Pom-Pom");
                                }
                            });
                        } else if (tabMode == "ZZZ") {
                            charButton = gui.Button.CreateImageOnlyButton("but", baseUrl + "zzz/ZZZ/Bangboo.png");
                            charButton.onPointerEnterObservable.add(function() {
                                hoverCharName.text = "Bangboo";
                            });
                            charButton.onPointerClickObservable.add(async function() {
                                charPanel.isVisible = !charPanel.isVisible;
                                if (chosenCharName != "Bangboo") {
                                    await changeCharacter("Bangboo");
                                }
                            });
                        } else if (tabMode == "WuWa") {
                            charButton = gui.Button.CreateImageOnlyButton("but", baseUrl + "ww/WuWa/Abby.png");
                            charButton.onPointerEnterObservable.add(function() {
                                hoverCharName.text = "Abby";
                            });
                            charButton.onPointerClickObservable.add(async function() {
                                charPanel.isVisible = !charPanel.isVisible;
                                if (chosenCharName != "Abby") {
                                    await changeCharacter("Abby");
                                }
                            });
                        } else if (tabMode == "HNA") {
                            charButton = gui.Button.CreateImageOnlyButton("but", "res/assets/HNA/Puddlipup.png");
                            charButton.onPointerEnterObservable.add(function() {
                                hoverCharName.text = "Puddlipup";
                            });
                            charButton.onPointerClickObservable.add(async function() {
                                // charPanel.isVisible = !charPanel.isVisible;
                                // if (chosenCharName != "Puddlipup") {
                                //     await changeCharacter("Puddlipup");
                                // }
                            });
                        } else {
                            charButton = gui.Button.CreateImageOnlyButton("but", "res/assets/NTE/Taygedo.png");
                            charButton.onPointerEnterObservable.add(function() {
                                hoverCharName.text = "Taygedo";
                            });
                            charButton.onPointerClickObservable.add(async function() {
                                // charPanel.isVisible = !charPanel.isVisible;
                                // if (chosenCharName != "Taygedo") {
                                //     await changeCharacter("Taygedo");
                                // }
                            });
                        }
                        charButton.onPointerOutObservable.add(function() {
                            hoverCharName.text = "";
                        });
                        charButton.thickness = 0;
                        charButton.paddingBottom = charButton.paddingLeft = charButton.paddingRight = charButton.paddingTop = 5;
                        charButton.cornerRadius = 10;
                        grid.addControl(charButton, i, j);
                    } else {
                        const selChar = dataArray[charIndex];
                        const theBG = new gui.Rectangle();
                        theBG.cornerRadius = 10;
                        theBG.thickness = 0;
                        theBG.paddingBottom = theBG.paddingTop = theBG.paddingRight = theBG.paddingLeft = 5;
                        theBG.background = "rgb(123,92,144)";
                        if (selChar.rarity == 5) {
                            theBG.background = "rgb(146,109,69)";
                        } else if (selChar.rarity == 6) {
                            theBG.background = "rgb(192,79,85)";
                        }
                        grid.addControl(theBG, i, j);
                        const charButton = gui.Button.CreateImageOnlyButton("but", `${baseUrl}/${selChar.image}`);
                        charButton.thickness = 0;
                        charButton.cornerRadius = 10;
                        charButton.paddingBottom = charButton.paddingTop = charButton.paddingRight = charButton.paddingLeft = 5;
                        grid.addControl(charButton, i, j);
                        charButton.onPointerEnterObservable.add(function() {
                            hoverCharName.text = selChar.name;
                        });
                        charButton.onPointerOutObservable.add(function() {
                            hoverCharName.text = "";
                        });
                        charButton.onPointerClickObservable.add(async function() {
                            charPanel.isVisible = !charPanel.isVisible;
                            if (chosenCharName != selChar.name) {
                                await changeCharacter(selChar.name, selChar.id);
                            } else if (prevCharId != selChar.id && skinMode != true) {
                                await changeCharacter(selChar.name, selChar.id);
                            }
                        });
                        if (findCharByName(allSkinCharDataArray, selChar.name)) {
                            const skinCharButton = new gui.Image("but", "res/assets/skin_icon.png");
                            skinCharButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
                            skinCharButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                            // skinCharButton.leftInPixels = grid.widthInPixels / 18;
                            // skinCharButton.topInPixels = -grid.widthInPixels / 18;
                            skinCharButton.paddingRight = skinCharButton.paddingTop = 10;
                            skinCharButton.widthInPixels = skinCharButton.heightInPixels = grid.widthInPixels / 30;
                            grid.addControl(skinCharButton, i, j);
                        }
                        charIndex += 1;
                    }
                }
            }
        }

        generateGrid(filteredArray);

        const previousModelState = {
            wasAnimationPlaying: false,
            previousSeekTimeFrame: 0,
            wasMuted: false
        };

        // function to change the audio, camMotion and modelMotion
        async function changeMotion(): Promise<void> {
            mmdRuntime.pauseAnimation();
            mmdCamera.storeState();
            mmdRuntime.seekAnimation(0, true);
            const oldVolume = audioPlayer.volume;
            audioPlayer.dispose();

            // set audio player
            audioPlayer = new StreamAudioPlayer(scene);
            audioPlayer.preservesPitch = false;
            // song
            audioPlayer.source = audioPlayerFile;
            mmdRuntime.setAudioPlayer(audioPlayer);
            // create youtube like player control
            mmdPlayerControl.dispose();
            audioPlayer.volume = oldVolume;
            mmdPlayerControl = new mobileMmdPlayerControl(scene, mmdRuntime, audioPlayer, isMobile);
            mmdPlayerControl.showPlayerControl();

            loadingTexts = [];
            engine.displayLoadingUI();
            promises = [];

            // camera motion
            promises.push(safeLoadBvmd("motion", camMotionFile, (event: any) => updateLoadingText(0, `Loading camera... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`)));

            // model motion
            promises.push(safeLoadBvmd("motion", modelMotionFile, (event: any) => updateLoadingText(1, `Loading motion... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`)));

            loadResults = await Promise.all(promises);
            theCharAnimation = loadResults[1] as MmdAnimation | undefined;
            // updated API: create runtime animation for model and set it (if available)
            if (theCharAnimation) {
                const modelAnimationHandle = mmdModel.createRuntimeAnimation(theCharAnimation as any);
                mmdModel.setRuntimeAnimation(modelAnimationHandle);
            }

            // updated API: create runtime animation for camera and set it
            if (loadResults[0]) {
                cameraAnimationHandle = mmdCamera.createRuntimeAnimation(loadResults[0] as any);
                mmdCamera.setRuntimeAnimation(cameraAnimationHandle);
            }
            mmdCamera.restoreState();
            mmdCamera.position.addToRef(
                Vector3.TransformCoordinatesFromFloatsToRef(0, 0, mmdCamera.distance, rotationMatrix, cameraEyePosition),
                cameraEyePosition
            );
            // attempt to register camera with runtime if available
            // if (typeof (mmdRuntime as any).setCamera === "function") {
            //     try { (mmdRuntime as any).setCamera(mmdCamera); } catch { /* ignore */ }
            // }
            mmdRuntime.addAnimatable(mmdCamera);

            engine.hideLoadingUI();
        }

        let firstDigitGlobal = 0;

        async function changeCharacter(nextCharacter?: string, nextId?: number): Promise<void> {
            if (!nextCharacter) {
                return;
            }
            if (mmdRuntime.isAnimationPlaying) {
                previousModelState.wasAnimationPlaying = true;
            }
            mmdRuntime.pauseAnimation();
            // audioPlayer.dispose();
            previousModelState.previousSeekTimeFrame = mmdRuntime.currentFrameTime;
            prevCharName = chosenCharName;
            chosenCharName = nextCharacter;
            charNameText.text = chosenCharName;
            if (skinButton != undefined) {
                skinButton.isVisible = false;
            }
            // mmdRuntime.destroyMmdModel(mmdModel);
            if (!isMobile) {
                particleSystem.stop();
            }
            modelMesh.dispose(false, true);
            if (modelMeshSt) {
                modelMeshSt.dispose(false, true);
            }
            mmdPlayerControl.dispose();
            // mmdCamera.removeAnimation(0);
            mmdCamera.restoreState();
            mmdRuntime.unregister(scene);

            // recreate mmd runtime according to physics toggle. reuse existing physicsRuntime when possible
            if (physicsModeOn) {
                if (!physicsRuntime) {
                    const wasmInstance = await GetMmdWasmInstance(new MmdWasmInstanceTypeMPR());
                    physicsRuntime = new MultiPhysicsRuntime(wasmInstance);
                    physicsRuntime.setGravity(new Vector3(0, PHYSICS_GRAVITY, 0));
                    physicsRuntime.register(scene);
                }
                mmdRuntime = new MmdRuntime(scene, new MmdBulletPhysics(physicsRuntime));
                mmdRuntime.loggingEnabled = false;
                mmdRuntime.autoPhysicsInitialization = false;
                mmdRuntime.register(scene);
                mmdRuntime.setAudioPlayer(audioPlayer);
            } else {
                mmdRuntime = new MmdRuntime(scene);
                mmdRuntime.loggingEnabled = false;
                mmdRuntime.register(scene);
                mmdRuntime.setAudioPlayer(audioPlayer);
            }

            // audioPlayer = new StreamAudioPlayer(scene);
            // audioPlayer.preservesPitch = false;
            // audioPlayer.source = audioPlayerFile;
            mmdRuntime.setAudioPlayer(audioPlayer);
            // mmdRuntime.playAnimation();
            // mmdRuntime.pauseAnimation();

            mmdPlayerControl = new mobileMmdPlayerControl(scene, mmdRuntime, audioPlayer, isMobile);
            mmdPlayerControl.showPlayerControl();

            let firstDigit = 0;
            firstDigit = getFirstDigit(nextId!);
            if (tabMode == "None") {
                firstDigitGlobal = firstDigit;
            }

            if (chosenCharName == "Paimon" || chosenCharName == "Pom-Pom" || chosenCharName == "Bangboo" || chosenCharName == "Abby") {
                skinMode = false;
                chosenChar = findCharByName(extraDataArray, chosenCharName);
                await createCharacter(chosenChar);
            } else if (firstDigit == 1 || tabMode == "Genshin") {
                tabMode = "Genshin";
                const skinChars = findAllCharsByName(genshinSkinDataArray, chosenCharName);
                if (prevCharName == chosenCharName) {
                    if (skinChars!.length > 0 && !skinMode) { // normal to skin (button is to change back to normal)
                        chosenChar = skinChars![0];
                        skinMode = true;
                        await createCharacter(chosenChar);

                        let isNextSkin = false;
                        if (skinChars!.length > 1) {
                            isNextSkin = true;
                        }
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode && skinChars!.length > 1) { // skin to skin if more than 1 skin
                        let isNextSkin = true;
                        let prevI: number = 0;
                        for (let i = 0; i < skinChars!.length; i++) {
                            if (chosenChar!.id === skinChars![i].id) {
                                prevI = i;
                            }
                        }
                        const temp = (prevI + 1) % skinChars!.length;
                        if (temp == skinChars!.length - 1) {
                            isNextSkin = false;
                        }
                        if (prevI == skinChars!.length - 1) {
                            chosenChar = findCharByName(charDataArray, chosenCharName);
                            skinMode = false;
                        } else {
                            chosenChar = skinChars![temp];
                            skinMode = true;
                        }
                        await createCharacter(chosenChar);
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode) { // skin to normal (button to change to skin)
                        skinMode = false;
                        chosenChar = findCharByName(charDataArray, chosenCharName);
                        await createCharacter(chosenChar);
                        createSkinButton(true, true, chosenChar!.name);
                    }
                } else {
                    skinMode = false;
                    chosenChar = findCharByName(charDataArray, chosenCharName);
                    await createCharacter(chosenChar);
                    if (skinChars!.length > 0) {
                        createSkinButton(true, true, chosenChar!.name);
                    }
                }
            } else if (firstDigit == 2 || tabMode == "HSR") {
                tabMode = "HSR";
                const skinChars = findAllCharsByName(hsrSkinDataArray, chosenCharName);
                if (prevCharName == chosenCharName && prevCharId == chosenChar?.id) {
                    if (skinChars!.length > 0 && !skinMode) { // normal to skin (button is to change back to normal)
                        chosenChar = skinChars![0];
                        skinMode = true;
                        await createCharacter(chosenChar);

                        let isNextSkin = false;
                        if (skinChars!.length > 1) {
                            isNextSkin = true;
                        }
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode && skinChars!.length > 1) { // skin to skin if more than 1 skin
                        let isNextSkin = true;
                        let prevI: number = 0;
                        for (let i = 0; i < skinChars!.length; i++) {
                            if (chosenChar!.id === skinChars![i].id) {
                                prevI = i;
                            }
                        }
                        const temp = (prevI + 1) % skinChars!.length;
                        if (temp == skinChars!.length - 1) {
                            isNextSkin = false;
                        }
                        if (prevI == skinChars!.length - 1) {
                            chosenChar = findCharByName(hsrCharDataArray, chosenCharName);
                            skinMode = false;
                        } else {
                            chosenChar = skinChars![temp];
                            skinMode = true;
                        }
                        await createCharacter(chosenChar);
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode) { // skin to normal (button to change to skin)
                        skinMode = false;
                        chosenChar = findCharByName(hsrCharDataArray, chosenCharName);
                        await createCharacter(chosenChar);
                        createSkinButton(true, true, chosenChar!.name);
                    }
                } else {
                    skinMode = false;
                    chosenChar = findCharById(hsrCharDataArray, nextId!);
                    await createCharacter(chosenChar);
                    if (skinChars!.length > 0) {
                        createSkinButton(true, true, chosenChar!.name);
                    }
                }
            } else if (firstDigit == 3 || tabMode == "ZZZ") {
                tabMode = "ZZZ";
                console.log("ZZZ character selected");
                const skinChars = findAllCharsByName(zzzSkinDataArray, chosenCharName);
                if (prevCharName == chosenCharName && prevCharId == chosenChar?.id) {
                    if (skinChars!.length > 0 && !skinMode) { // normal to skin (button is to change back to normal)
                        chosenChar = skinChars![0];
                        skinMode = true;
                        await createCharacter(chosenChar);

                        let isNextSkin = false;
                        if (skinChars!.length > 1) {
                            isNextSkin = true;
                        }
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode && skinChars!.length > 1) { // skin to skin if more than 1 skin
                        let isNextSkin = true;
                        let prevI: number = 0;
                        for (let i = 0; i < skinChars!.length; i++) {
                            if (chosenChar!.id === skinChars![i].id) {
                                prevI = i;
                            }
                        }
                        const temp = (prevI + 1) % skinChars!.length;
                        if (temp == skinChars!.length - 1) {
                            isNextSkin = false;
                        }
                        if (prevI == skinChars!.length - 1) {
                            chosenChar = findCharByName(zzzCharDataArray, chosenCharName);
                            skinMode = false;
                        } else {
                            chosenChar = skinChars![temp];
                            skinMode = true;
                        }
                        await createCharacter(chosenChar);
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode) { // skin to normal (button to change to skin)
                        skinMode = false;
                        chosenChar = findCharByName(zzzCharDataArray, chosenCharName);
                        await createCharacter(chosenChar);
                        createSkinButton(true, true, chosenChar!.name);
                    }
                } else {
                    skinMode = false;
                    chosenChar = findCharById(zzzCharDataArray, nextId!);
                    await createCharacter(chosenChar);
                    if (skinChars!.length > 0) {
                        createSkinButton(true, true, chosenChar!.name);
                    }
                }
            } else if (firstDigit == 4 || tabMode == "WuWa") {
                tabMode = "WuWa";
                const skinChars = findAllCharsByName(wuwaSkinDataArray, chosenCharName);
                if (prevCharName == chosenCharName && prevCharId == chosenChar?.id) {
                    if (skinChars!.length > 0 && !skinMode) { // normal to skin (button is to change back to normal)
                        chosenChar = skinChars![0];
                        skinMode = true;
                        await createCharacter(chosenChar);

                        let isNextSkin = false;
                        if (skinChars!.length > 1) {
                            isNextSkin = true;
                        }
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode && skinChars!.length > 1) { // skin to skin if more than 1 skin
                        let isNextSkin = true;
                        let prevI: number = 0;
                        for (let i = 0; i < skinChars!.length; i++) {
                            if (chosenChar!.id === skinChars![i].id) {
                                prevI = i;
                            }
                        }
                        const temp = (prevI + 1) % skinChars!.length;
                        if (temp == skinChars!.length - 1) {
                            isNextSkin = false;
                        }
                        if (prevI == skinChars!.length - 1) {
                            chosenChar = findCharByName(wuwaCharDataArray, chosenCharName);
                            skinMode = false;
                        } else {
                            chosenChar = skinChars![temp];
                            skinMode = true;
                        }
                        await createCharacter(chosenChar);
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode) { // skin to normal (button to change to skin)
                        skinMode = false;
                        chosenChar = findCharByName(wuwaCharDataArray, chosenCharName);
                        await createCharacter(chosenChar);
                        createSkinButton(true, true, chosenChar!.name);
                    }
                } else {
                    skinMode = false;
                    chosenChar = findCharById(wuwaCharDataArray, nextId!);
                    await createCharacter(chosenChar);
                    if (skinChars!.length > 0) {
                        createSkinButton(true, true, chosenChar!.name);
                    }
                }
            } else if (firstDigit == 5 || tabMode == "HNA") {
                tabMode = "HNA";
                const skinChars = findAllCharsByName(hnaSkinDataArray, chosenCharName);
                if (prevCharName == chosenCharName && prevCharId == chosenChar?.id) {
                    if (skinChars!.length > 0 && !skinMode) { // normal to skin (button is to change back to normal)
                        chosenChar = skinChars![0];
                        skinMode = true;
                        await createCharacter(chosenChar);

                        let isNextSkin = false;
                        if (skinChars!.length > 1) {
                            isNextSkin = true;
                        }
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode && skinChars!.length > 1) { // skin to skin if more than 1 skin
                        let isNextSkin = true;
                        let prevI: number = 0;
                        for (let i = 0; i < skinChars!.length; i++) {
                            if (chosenChar!.id === skinChars![i].id) {
                                prevI = i;
                            }
                        }
                        const temp = (prevI + 1) % skinChars!.length;
                        if (temp == skinChars!.length - 1) {
                            isNextSkin = false;
                        }
                        if (prevI == skinChars!.length - 1) {
                            chosenChar = findCharByName(hnaSkinDataArray, chosenCharName);
                            skinMode = false;
                        } else {
                            chosenChar = skinChars![temp];
                            skinMode = true;
                        }
                        await createCharacter(chosenChar);
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode) { // skin to normal (button to change to skin)
                        skinMode = false;
                        chosenChar = findCharByName(hnaCharDataArray, chosenCharName);
                        await createCharacter(chosenChar);
                        createSkinButton(true, true, chosenChar!.name);
                    }
                } else {
                    skinMode = false;
                    chosenChar = findCharById(hnaCharDataArray, nextId!);
                    await createCharacter(chosenChar);
                    if (skinChars!.length > 0) {
                        createSkinButton(true, true, chosenChar!.name);
                    }
                }
            } else if (firstDigit == 6 || tabMode == "NTE") {
                tabMode = "NTE";
                const skinChars = findAllCharsByName(nteSkinDataArray, chosenCharName);
                if (prevCharName == chosenCharName && prevCharId == chosenChar?.id) {
                    if (skinChars!.length > 0 && !skinMode) { // normal to skin (button is to change back to normal)
                        chosenChar = skinChars![0];
                        skinMode = true;
                        await createCharacter(chosenChar);

                        let isNextSkin = false;
                        if (skinChars!.length > 1) {
                            isNextSkin = true;
                        }
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode && skinChars!.length > 1) { // skin to skin if more than 1 skin
                        let isNextSkin = true;
                        let prevI: number = 0;
                        for (let i = 0; i < skinChars!.length; i++) {
                            if (chosenChar!.id === skinChars![i].id) {
                                prevI = i;
                            }
                        }
                        const temp = (prevI + 1) % skinChars!.length;
                        if (temp == skinChars!.length - 1) {
                            isNextSkin = false;
                        }
                        if (prevI == skinChars!.length - 1) {
                            chosenChar = findCharByName(nteSkinDataArray, chosenCharName);
                            skinMode = false;
                        } else {
                            chosenChar = skinChars![temp];
                            skinMode = true;
                        }
                        await createCharacter(chosenChar);
                        createSkinButton(true, isNextSkin, chosenChar!.name);
                    } else if (skinChars!.length > 0 && skinMode) { // skin to normal (button to change to skin)
                        skinMode = false;
                        chosenChar = findCharByName(nteCharDataArray, chosenCharName);
                        await createCharacter(chosenChar);
                        createSkinButton(true, true, chosenChar!.name);
                    }
                } else {
                    skinMode = false;
                    chosenChar = findCharById(nteCharDataArray, nextId!);
                    await createCharacter(chosenChar);
                    if (skinChars!.length > 0) {
                        createSkinButton(true, true, chosenChar!.name);
                    }
                }
            } else {
                tabMode = "None";
                skinMode = false;
                chosenChar = findCharByName(
                    (tabMode === "Genshin" || firstDigit === 1) ? charDataArray :
                        (tabMode === "HSR" || firstDigit === 2) ? hsrCharDataArray :
                            (tabMode === "ZZZ" || firstDigit === 3) ? zzzCharDataArray :
                                (tabMode === "WuWa" || firstDigit === 4) ? wuwaCharDataArray :
                                    (tabMode === "HNA" || firstDigit === 5) ? hnaCharDataArray :
                                        (tabMode === "NTE" || firstDigit === 6) ? nteCharDataArray :
                                            [],
                    chosenCharName
                );
                await createCharacter(chosenChar);
            }
            resumePlayback();
        }

        function resumePlayback(): void {
            if (previousModelState.wasAnimationPlaying) {
                mmdRuntime.seekAnimation(previousModelState.previousSeekTimeFrame, true);
                previousModelState.wasAnimationPlaying = false;
                if (!mmdRuntime.isAnimationPlaying) {
                    mmdRuntime.playAnimation();
                }
            } else {
                stillCamera.target = new Vector3(0, 10 * worldScale, 1);
                stillCamera.setPosition(defCamPos);
                scene.activeCameras![0] = stillCamera;
            }
        }

        async function createCharacter(chosenChar?: BaseCharData|undefined): Promise<void> {
            if (!chosenChar) {
                console.warn("createCharacter called with undefined chosenChar, skipping.");
                return;
            }
            engine.displayLoadingUI();
            // showLoadingScreen();
            if (skinButton != undefined) {
                skinButton.isEnabled = false;
            }
            showButton.isEnabled = false;
            promises = [];
            loadingTexts = [];
            prevCharId = chosenChar.id;
            // ensure runtime is initialized (in case changeCharacter recreated/unregistered it)
            if (!mmdRuntime) {
                if (physicsModeOn) {
                    if (!physicsRuntime) {
                        const wasmInstance = await GetMmdWasmInstance(new MmdWasmInstanceTypeMPR());
                        physicsRuntime = new MultiPhysicsRuntime(wasmInstance);
                        physicsRuntime.setGravity(new Vector3(0, PHYSICS_GRAVITY, 0));
                        physicsRuntime.register(scene);
                    }
                    mmdRuntime = new MmdRuntime(scene, new MmdBulletPhysics(physicsRuntime));
                } else {
                    mmdRuntime = new MmdRuntime(scene);
                }
                mmdRuntime.loggingEnabled = true;
                mmdRuntime.register(scene);
                mmdRuntime.setAudioPlayer(audioPlayer);
            }
            if (chosenChar && chosenChar.directory && chosenChar.pmx) {
                promises.push(LoadAssetContainerAsync(
                    baseUrl + chosenChar.directory + "/" + chosenChar.pmx,
                    scene,
                    {
                        onProgress: (event) => updateLoadingText(2, `Loading model... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`),
                        pluginOptions: {
                            mmdmodel: {
                                loggingEnabled: true,
                                materialBuilder: materialBuilder
                            }
                        }
                    }
                ));
            } else {
                throw new Error("Chosen character or its properties are undefined");
            }
            if (tabMode == "WuWa" || tabMode == "NTE") {// || chosenChar.element == "Universal") {
                charScreenMode = false;
                charScreenModeButton.isVisible = false;
            } else {
                charScreenMode = true;
                charScreenModeButton.isVisible = true;
            }
            if (tabMode == "WuWa" || tabMode == "ZZZ" || tabMode == "NTE" || tabMode == "None" && (firstDigitGlobal == 4 || firstDigitGlobal == 3 || firstDigitGlobal == 6)) {
                charScreenMode = true;
                charScreenElement = "Universal";
            } else if (tabMode == "HSR" || tabMode == "HNA" || tabMode == "None" && (firstDigitGlobal == 2 || firstDigitGlobal == 5)) {
                charScreenMode = true;
                charScreenElement = "HSR";
            } else if (tabMode == "Genshin" || tabMode == "None" && (firstDigitGlobal == 1)) {
                charScreenMode = true;
                charScreenElement = chosenChar.element;
            }

            if (charScreenMode) {
                if (!isMobile) {
                    particleSystem.start();
                }
                promises.push(LoadAssetContainerAsync(
                    "res/stages/GenshinCharacterSphere" + "/" + "CharacterSphere_" + charScreenElement + "V.pmx",
                    scene,
                    {
                        onProgress: (event) => updateLoadingText(3, `Loading stage... ${event.loaded}/${event.total} (${Math.floor(event.loaded * 100 / event.total)}%)`),
                        pluginOptions: {
                            mmdmodel: {
                                loggingEnabled: true,
                                materialBuilder: materialBuilderSt,
                                buildSkeleton: false,
                                buildMorph: false,
                            }
                        }
                    }
                )
                );
            }
            loadResults = await Promise.all(promises);
            scene.onAfterRenderObservable.addOnce(() => {
                engine.hideLoadingUI();
                // hideLoadingScreen();
                setTimeout(() => {
                    if (skinButton != undefined) {
                        skinButton.isEnabled = true;
                    }
                    showButton.isEnabled = true;
                }, 1500);
            });
			downloadBtn.update(baseUrl, chosenChar);
            // scene.activeCameras = [stillCamera, guiCam];

            if (charScreenMode) {
                const characterModelPromiseResSt = loadResults[1];
                characterModelPromiseResSt.addAllToScene();
                modelMeshSt = characterModelPromiseResSt.rootNodes[0] as MmdMesh;
                modelMeshSt.parent = mmdRoot;
            }

            theDiff = 1.66;
            theHeight = 69;
            boneWorldMatrixCam = new Matrix();

            characterModelPromiseRes = loadResults[0];
            characterModelPromiseRes.addAllToScene();
            modelMesh = characterModelPromiseRes.rootNodes[0] as MmdMesh;
            modelMesh.parent = mmdRoot;

            shadowGenerator.addShadowCaster(modelMesh);
            for (const mesh of modelMesh.metadata.meshes) mesh.receiveShadows = true;

            mmdModel = mmdRuntime.createMmdModel(modelMesh, {
                buildPhysics: physicsModeOn ? { worldId: 0, disableOffsetForConstraintFrame: true } : false
            });
            if (physicsModeOn) {
                scene.onAfterRenderObservable.addOnce(() => {
                    mmdRuntime.initializeAllMmdModelsPhysics(true);
                });
            }

			// ── Panel de piezas del modelo ─────────────────────────────────────────
			// Permite ocultar o mostrar cada malla del personaje individualmente.
			// Util para borrar gorras, capas, accesorios, etc.
			const buildMeshPanel = (targetMesh: MmdMesh): void => {
				// Contenedor principal del panel
				const meshPanel = new gui.StackPanel();
				meshPanel.name = "meshPanel";
				meshPanel.width = "220px";
				meshPanel.isVertical = true;
				meshPanel.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
				meshPanel.verticalAlignment   = gui.Control.VERTICAL_ALIGNMENT_TOP;
				meshPanel.top  = "340px";
				meshPanel.left = "-10px";
				meshPanel.isVisible = false;
				advancedTexture.addControl(meshPanel);

				// Cabecera del panel
				const headerRect = new gui.Rectangle("meshPanelHeader");
				headerRect.height     = "30px";
				headerRect.width      = "220px";
				headerRect.background = "rgba(0,0,0,0.7)";
				headerRect.thickness  = 0;
				headerRect.cornerRadius = 6;
				meshPanel.addControl(headerRect);

				const header = new gui.TextBlock();
				header.text       = "Piezas del modelo";
				header.color      = "white";
				header.fontSize   = 13;
				header.fontFamily = "Arial";
				headerRect.addControl(header);

				// Scroll para modelos con muchas piezas
				const scrollViewer = new gui.ScrollViewer();
				scrollViewer.width   = "220px";
				scrollViewer.height  = "400px";
				scrollViewer.barSize = 8;
				scrollViewer.barColor = "rgba(255,255,255,0.4)";
				scrollViewer.background = "rgba(0,0,0,0.5)";
				meshPanel.addControl(scrollViewer);

				const listStack = new gui.StackPanel();
				listStack.isVertical = true;
				listStack.width = "200px";
				scrollViewer.addControl(listStack);

				// Crear un boton por cada sub-malla del modelo
				const subMeshes = targetMesh.metadata?.meshes ?? [];
				for (const subMesh of subMeshes) {
					const row = new gui.StackPanel();
					row.isVertical  = false;
					row.height      = "28px";
					row.width       = "200px";
					row.paddingTop  = "2px";
					listStack.addControl(row);

					const label = new gui.TextBlock();
					label.text        = subMesh.name.length > 18
						? subMesh.name.substring(0, 16) + ".."
						: subMesh.name;
					label.width       = "140px";
					label.height      = "26px";
					label.color       = "white";
					label.fontSize    = 11;
					label.fontFamily  = "Arial";
					label.textHorizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_LEFT;
					label.paddingLeft = "6px";
					row.addControl(label);

					// Boton toggle: ojo abierto / cerrado
					const btn = gui.Button.CreateSimpleButton("btn_" + subMesh.name, "Ocultar");
					btn.width           = "58px";
					btn.height          = "22px";
					btn.color           = "white";
					btn.fontSize        = 10;
					btn.fontFamily      = "Arial";
					btn.cornerRadius    = 4;
					btn.background      = "rgba(180,60,60,0.8)";
					btn.onPointerClickObservable.add(() => {
						subMesh.isVisible = !subMesh.isVisible;
						btn.textBlock!.text       = subMesh.isVisible ? "Ocultar" : "Mostrar";
						btn.background            = subMesh.isVisible
							? "rgba(180,60,60,0.8)"
							: "rgba(60,140,60,0.8)";
					});
					row.addControl(btn);
				}

				// Boton Piezas: mismo estilo que newPjButton, ubicado debajo de el
				const toggleBtn = gui.Button.CreateSimpleButton("meshToggleBtn", "Piezas");
				toggleBtn.width          = "60px";
				toggleBtn.height         = "26px";
				toggleBtn.color          = "white";
				toggleBtn.background     = "rgba(40,40,40,0.8)";
				toggleBtn.cornerRadius   = 5;
				toggleBtn.thickness      = 0;
				toggleBtn.fontSize       = 11;
				toggleBtn.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
				toggleBtn.verticalAlignment   = gui.Control.VERTICAL_ALIGNMENT_TOP;
				toggleBtn.left = "-10px";
				toggleBtn.top  = "309px";
				advancedTexture.addControl(toggleBtn);

				toggleBtn.onPointerClickObservable.add(() => {
					meshPanel.isVisible = !meshPanel.isVisible;
				});
			};

			// Construir el panel con el modelo recien cargado
			buildMeshPanel(modelMesh);

            headBone = mmdModel.runtimeBones.find((bone: any) => bone.name === "頭");
            bodyBone = mmdModel.runtimeBones.find((bone) => bone.name === "センター");
            boneWorldMatrix = new Matrix();

            if (headBone != undefined && bodyBone != undefined) {
                if (theCharAnimation) {
                    const modelAnimationHandle = mmdModel.createRuntimeAnimation(theCharAnimation as any);
                    mmdModel.setRuntimeAnimation(modelAnimationHandle);
                }
                scene.onBeforeDrawPhaseObservable.addOnce(() => {
                    headBone!.getWorldMatrixToRef(boneWorldMatrixCam).multiplyToRef(modelMesh.getWorldMatrix(), boneWorldMatrixCam);
                    boneWorldMatrixCam.getTranslationToRef(mmdCameraRoot.position);
                    mmdCameraRoot.position.z = 1;
                    mmdCameraRoot.position.x = 0;
                    theDiff = theDiff - mmdCameraRoot.position.y;
                    theHeight = mmdCameraRoot.position.y;
                });

                scene.onBeforeRenderObservable.addOnce(() => {
                    bodyBone!.getWorldMatrixToRef(boneWorldMatrix).multiplyToRef(modelMesh.getWorldMatrix(), boneWorldMatrix);
                    boneWorldMatrix.getTranslationToRef(directionalLight.position);
                    directionalLight.position.y -= 10 * worldScale;
                });
            }

            if (cameraAnimationHandle !== undefined) {
                mmdCamera.setRuntimeAnimation(cameraAnimationHandle);
            }
            mmdRuntime.addAnimatable(mmdCamera);

            scene.onAfterRenderObservable.addOnce(() => {
                scene.freezeMaterials();

                const meshes = scene.meshes;
                for (let i = 0, len = meshes.length; i < len; ++i) {
                    const mesh = meshes[i];
                    mesh.freezeWorldMatrix();
                    mesh.doNotSyncBoundingInfo = true;
                    mesh.isPickable = false;
                    mesh.doNotSyncBoundingInfo = true;
                    mesh.alwaysSelectAsActiveMesh = true;
                }
                scene.skipPointerMovePicking = true;
                scene.skipPointerDownPicking = true;
                scene.skipPointerUpPicking = true;
                scene.skipFrustumClipping = true;
                scene.blockMaterialDirtyMechanism = true;
                // audioPlayer.mute();
                if (!isLocal) {

                    try {
                        // Call without awaiting
                        void firebase.countUp("phoshco", chosenChar.name.replace(/\./g, "")).catch((error) => {
                            console.error("Failed count: ", error);
                        });
                    } catch (error) {
                        console.error("Unexpected error during count: ", error);
                    }
                }
            });
        }

        // for scaling camera to model height
        {
            mmdCameraRoot.position.x = mmdRoot.position.x;
            mmdCameraRoot.position.y = mmdRoot.position.y;
            mmdCameraRoot.position.z = mmdRoot.position.z;
            scene.onBeforeAnimationsObservable.add(() => {
                cameraPos = mmdCamera.position.y / 10;
                textblock.text = `${scene.activeCameras![0].name}`;
                if (cameraPos < theHeight && 0 < cameraPos) {
                    mmdCameraRoot.position.y = 0 - theDiff * (cameraPos / theHeight);
                } else if (cameraPos <= 0) {
                    mmdCameraRoot.position.y = 0;
                } else {
                    mmdCameraRoot.position.y = 0 - theDiff;
                }
                // debugblock.text = `${mmdCameraRoot.position.y}\n${theHeight}\n${theDiff}`;
                mmdCamera.parent = mmdCameraRoot;
            });
        }

        const rotationMatrix = new Matrix();
        const cameraNormal = new Vector3();
        let cameraEyePosition = new Vector3();
        const headRelativePosition = new Vector3();

        scene.onBeforeRenderObservable.add(() => {
            const cameraRotation = mmdCamera.rotation;
            Matrix.RotationYawPitchRollToRef(-cameraRotation.y, -cameraRotation.x, -cameraRotation.z, rotationMatrix);

            Vector3.TransformNormalFromFloatsToRef(0, 0, 1, rotationMatrix, cameraNormal);

            cameraEyePosition = mmdCamera.position.addToRef(
                Vector3.TransformCoordinatesFromFloatsToRef(0, 0, mmdCamera.distance, rotationMatrix, cameraEyePosition),
                cameraEyePosition
            );

            if (headBone != undefined && bodyBone != undefined) {
                headBone!.getWorldMatrixToRef(boneWorldMatrixCam).getTranslationToRef(headRelativePosition).subtractToRef(cameraEyePosition, headRelativePosition);
            }

            // defaultPipeline.depthOfField.focusDistance = (Vector3.Dot(headRelativePosition, cameraNormal) / Vector3.Dot(cameraNormal, cameraNormal)) * 1000;
        });

        // switch camera when double click
        let lastClickTime = -Infinity;
        canvas.onclick = (): void => {
            if (isMouseInPanel) {
                return;
            }
            const currentTime = performance.now();
            if (300 < currentTime - lastClickTime) {
                lastClickTime = currentTime;
                return;
            }
            lastClickTime = -Infinity;

            if (scene.activeCameras![0] === mmdCamera) {
                defaultPipeline.depthOfFieldEnabled = false;
                camera.setTarget(new Vector3(0, 10 * worldScale, 1));
                camera.setPosition(defCamPos);
                scene.activeCameras![0] = camera;
            } else {
                defaultPipeline.depthOfFieldEnabled = false; //true
                scene.activeCameras![0] = mmdCamera;
            }
            textblock.text = `${scene.activeCameras![0].name}`;
        };

        // pause animation using spacebar
        function handleKeyDown(e: KeyboardEvent): void {
            if (e.code === "Space" && !charPanel.isVisible) {
                e.preventDefault();
                if (scene.activeCameras![0] === stillCamera) {
                    defaultPipeline.depthOfFieldEnabled = false; //true
                    if (!mmdRuntime.isAnimationPlaying) {
                        scene.activeCameras![0] = mmdCamera;
                    }
                    textblock.text = `${scene.activeCameras![0].name}`;
                }
                if (mmdRuntime.isAnimationPlaying) {
                    mmdRuntime.pauseAnimation();
                } else {
                    mmdRuntime.playAnimation();
                }
            }
        }
        document.body.addEventListener("keydown", handleKeyDown);

        function handlePointerDown(evt: IPointerEvent): void {
            scenePointerDownCharPanel();
            onPointerDownSroll(evt);
        }
        scene.onPointerDown = handlePointerDown;

        function handlePointerUp(evt: IPointerEvent): void {
            scenePointerUpCharPanel();
            evt;
            onPointerUpScroll();
        }
        scene.onPointerUp = handlePointerUp;

        function handlePointerMove(evt: IPointerEvent): void {
            onPointerMoveScroll(evt);
        }
        scene.onPointerMove = handlePointerMove;

        if (firstTabMode == "Genshin") {
            const skinChars = findAllCharsByName(genshinSkinDataArray, chosenCharName);
            if (skinChars!.length > 0) { // normal to skin (button is to change back to normal)
                const chosenCharSk = skinChars![0];
                skinMode = false;
                createSkinButton(true, true, chosenCharSk!.name);
            }
        } else if (firstTabMode == "HSR") {
            handleHSRTabSwitch();
            const skinChars = findAllCharsByName(hsrSkinDataArray, chosenCharName);
            if (skinChars!.length > 0) { // normal to skin (button is to change back to normal)
                const chosenCharSk = skinChars![0];
                skinMode = false;
                createSkinButton(true, true, chosenCharSk!.name);
            }
        } else if (firstTabMode == "ZZZ") {
            handleZZZTabSwitch();
            const skinChars = findAllCharsByName(zzzSkinDataArray, chosenCharName);
            if (skinChars!.length > 0) { // normal to skin (button is to change back to normal)
                const chosenCharSk = skinChars![0];
                skinMode = false;
                createSkinButton(true, true, chosenCharSk!.name);
            }
        } else if (firstTabMode == "WuWa") {
            handleWuwaTabSwitch();
            const skinChars = findAllCharsByName(wuwaSkinDataArray, chosenCharName);
            if (skinChars!.length > 0) { // normal to skin (button is to change back to normal)
                const chosenCharSk = skinChars![0];
                skinMode = false;
                createSkinButton(true, true, chosenCharSk!.name);
            }
        } else if (firstTabMode == "HNA") {
            handleHNATabSwitch();
            const skinChars = findAllCharsByName(hnaSkinDataArray, chosenCharName);
            if (skinChars!.length > 0) { // normal to skin (button is to change back to normal)
                const chosenCharSk = skinChars![0];
                skinMode = false;
                createSkinButton(true, true, chosenCharSk!.name);
            }
        } else if (firstTabMode == "NTE") {
            handleNTETabSwitch();
            const skinChars = findAllCharsByName(nteSkinDataArray, chosenCharName);
            if (skinChars!.length > 0) { // normal to skin (button is to change back to normal)
                const chosenCharSk = skinChars![0];
                skinMode = false;
                createSkinButton(true, true, chosenCharSk!.name);
            }
        }

        // if you want to use inspector, uncomment following line.
        // Inspector.Show(scene, { });

        // webxr experience for AR
        // const webXrExperience = await scene.createDefaultXRExperienceAsync({
        //     uiOptions: {
        //         sessionMode: "immersive-ar",
        //         referenceSpaceType: "local-floor"
        //     }
        // });

        //if (webXrExperience.baseExperience !== undefined) {
        // post process seems not working on immersive-ar
        // webXrExperience.baseExperience.sessionManager.onXRFrameObservable.addOnce(() => {
        //     defaultPipeline.addCamera(webXrExperience.baseExperience.camera);
        // });
        //    webXrExperience.baseExperience.sessionManager.worldScalingFactor = 15;
        //}
        // webXrExperience.baseExperience?.sessionManager.onXRSessionInit.add(() => {
        //     defaultPipeline.addCamera(webXrExperience.baseExperience.camera);
        // });
	
		
		// ============================================================
        // FRAME CAPTURE OFFLINE - Frame a frame, sin fondo, sin UI
        // ============================================================

        // Estado de captura - declarado primero para que las funciones lo usen
        let isCapturing = false;
        let capturedFrames: Blob[] = []; // solo para compatibilidad, no se usa en ZIP streaming
        let captureFrameCount = 0;
        let captureAbort = false;
        const CAPTURE_FPS = 30;

        // Resoluciones disponibles
        const RESOLUTIONS: { label: string; w: number; h: number }[] = [
            { label: "720p",  w: 1280,  h: 720  },
            { label: "1080p", w: 1920,  h: 1080 },
            { label: "2K",    w: 2560,  h: 1440 },
            { label: "4K",    w: 3840,  h: 2160 },
        ];
        let selectedResIdx = 1; // 1080p por defecto

        // Botón REC
        const recButton = gui.Button.CreateSimpleButton("recBtn", "⏺ REC");
        recButton.width = "100px";
        recButton.height = "36px";
        recButton.color = "white";
        recButton.background = "rgba(180,0,0,0.85)";
        recButton.cornerRadius = 8;
        recButton.fontSize = 13;
        recButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        recButton.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        recButton.top = "10px";
        recButton.left = "-10px";
        advancedTexture.addControl(recButton);

        // Botones de resolución (aparecen debajo del REC)
        const resButtons: gui.Button[] = [];
        RESOLUTIONS.forEach((res, idx) => {
            const btn = gui.Button.CreateSimpleButton(`resBtn_${idx}`, res.label);
            btn.width = "60px";
            btn.height = "26px";
            btn.color = "white";
            btn.background = idx === selectedResIdx
                ? "rgba(0,120,200,0.9)"
                : "rgba(40,40,40,0.8)";
            btn.cornerRadius = 5;
            btn.fontSize = 11;
            btn.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            btn.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
            btn.top = `${92 + idx * 31}px`;
            btn.left = "-10px";
            advancedTexture.addControl(btn);
            resButtons.push(btn);

            btn.onPointerClickObservable.add(() => {
                if (isCapturing) return;
                selectedResIdx = idx;
                resButtons.forEach((b, i) => {
                    b.background = i === selectedResIdx
                        ? "rgba(0,120,200,0.9)"
                        : "rgba(40,40,40,0.8)";
                });
            });
        });

        const frameCountLabel = gui.Button.CreateSimpleButton("frameCountLabel", "0 frames");
        frameCountLabel.width = "120px";
        frameCountLabel.height = "26px";
        frameCountLabel.color = "white";
        frameCountLabel.background = "rgba(0,0,0,0.6)";
        frameCountLabel.cornerRadius = 6;
        frameCountLabel.fontSize = 11;
        frameCountLabel.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        frameCountLabel.verticalAlignment = gui.Control.VERTICAL_ALIGNMENT_TOP;
        frameCountLabel.top = "340px";
        frameCountLabel.left = "-10px";
        frameCountLabel.isVisible = false;
        advancedTexture.addControl(frameCountLabel);

        function hideBgForCapture(): void {
            (layer as any).isEnabled = false;
            if (typeof modelMeshSt !== "undefined" && modelMeshSt) {
                modelMeshSt.setEnabled(false);
            }
            ground.setEnabled(false);
            scene.clearColor = new Color4(0, 0, 0, 0);
            if (advancedTexture.layer) (advancedTexture.layer as any).isEnabled = false;
        }

        function restoreBgAfterCapture(): void {
            (layer as any).isEnabled = true;
            if (typeof modelMeshSt !== "undefined" && modelMeshSt) {
                modelMeshSt.setEnabled(true);
            }
            ground.setEnabled(true);
            scene.clearColor = bg_bool
                ? new Color4(0.001, 0.001, 0.001, 1.0)
                : new Color4(1, 1, 1, 1.0);
            if (advancedTexture.layer) (advancedTexture.layer as any).isEnabled = true;
        }

        // Canvas offscreen para compositar con alpha real (tamaño dinámico)
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d", { alpha: true })!;

        async function captureOffline(): Promise<void> {
            if (isCapturing) return;

            // ── Pedir la carpeta de destino ANTES de empezar a grabar ──────────────
            // Asi el usuario no espera al final. Si cancela, no se graba nada.
            // File System Access API — Chrome/Edge. Firefox no la soporta.
            const supportsFS = typeof (window as any).showDirectoryPicker === "function";
            let dirHandle: FileSystemDirectoryHandle | null = null;

            if (supportsFS) {
                recButton.textBlock!.text = "Eligiendo...";
                try {
                    dirHandle = await (window as any).showDirectoryPicker({ mode: "readwrite" });
                } catch {
                    // Usuario cancelo el dialogo — no hacer nada
                    recButton.textBlock!.text = "⏺ REC";
                    return;
                }
            }

            isCapturing = true;
            captureAbort = false;
            capturedFrames = [];
            captureFrameCount = 0;

            const capW    = RESOLUTIONS[selectedResIdx].w;
            const capH    = RESOLUTIONS[selectedResIdx].h;
            const capLabel = RESOLUTIONS[selectedResIdx].label;

            recButton.textBlock!.text = "⏹ STOP";
            recButton.background = "rgba(200,50,50,0.9)";
            resButtons.forEach(b => { b.isVisible = false; });
            frameCountLabel.isVisible = true;
            frameCountLabel.textBlock!.text = `0 frames · ${capLabel}`;

            if (mmdRuntime.isAnimationPlaying) {
                mmdRuntime.pauseAnimation();
            }

            const endFrame: number = theCharAnimation
                ? (theCharAnimation as any).endFrame ?? 9999
                : 9999;

            hideBgForCapture();

            const origW = canvas.width;
            const origH = canvas.height;

            engine.setSize(capW, capH);
            scene.render();

            const gl = engine.getRenderingCanvas()!.getContext("webgl2") as WebGL2RenderingContext
                ?? engine.getRenderingCanvas()!.getContext("webgl") as WebGLRenderingContext;

            offCanvas.width  = capW;
            offCanvas.height = capH;

            // Buffer reutilizable — se aloja UNA sola vez, no por frame
            const pixels  = new Uint8Array(capW * capH * 4);
            const flipped = new Uint8Array(capW * capH * 4);

            for (let frame = 0; frame <= endFrame && !captureAbort; frame++) {
                mmdRuntime.seekAnimation(frame, true);
                scene.render();

                gl.readPixels(0, 0, capW, capH, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

                // Voltear verticalmente (WebGL tiene Y invertido respecto a Canvas)
                for (let row = 0; row < capH; row++) {
                    const src = (capH - 1 - row) * capW * 4;
                    const dst = row * capW * 4;
                    flipped.set(pixels.subarray(src, src + capW * 4), dst);
                }

                const imageData = new ImageData(new Uint8ClampedArray(flipped.buffer), capW, capH);
                offCtx.clearRect(0, 0, capW, capH);
                offCtx.putImageData(imageData, 0, 0);

                const blob = await new Promise<Blob | null>((resolve) => {
                    offCanvas.toBlob(resolve, "image/png");
                });

                if (blob) {
                    if (dirHandle) {
                        // ── Modo File System: escribir directo al disco, sin RAM ──
                        const padded   = String(captureFrameCount).padStart(5, "0");
                        const fileHandle = await dirHandle.getFileHandle(`frame_${padded}.png`, { create: true });
                        const writable   = await fileHandle.createWritable();
                        await writable.write(blob);
                        await writable.close();
                    } else {
                        // ── Fallback: acumular en RAM (Firefox) ──────────────────
                        capturedFrames.push(blob);
                    }

                    captureFrameCount++;
                    if (captureFrameCount % 5 === 0) {
                        frameCountLabel.textBlock!.text = `${captureFrameCount} frames · ${capLabel}`;
                    }
                }

                if (frame % 10 === 0) {
                    await new Promise<void>((r) => setTimeout(r, 0));
                }
            }

            engine.setSize(origW, origH);
            restoreBgAfterCapture();
            isCapturing = false;
            frameCountLabel.textBlock!.text = `${captureFrameCount} frames`;

            // ── Fallback ZIP en chunks — solo si File System no estuvo disponible ──
            if (!dirHandle && capturedFrames.length > 0 && !captureAbort) {
                recButton.isEnabled  = false;
                recButton.background = "rgba(50,50,180,0.9)";

                const CHUNK_SIZE  = 40; // frames por ZIP — ajustado para no saturar RAM
                const totalChunks = Math.ceil(capturedFrames.length / CHUNK_SIZE);

                for (let chunk = 0; chunk < totalChunks; chunk++) {
                    const start = chunk * CHUNK_SIZE;
                    const end   = Math.min(start + CHUNK_SIZE, capturedFrames.length);

                    const zip = new JSZip();
                    for (let i = start; i < end; i++) {
                        const padded = String(i).padStart(5, "0");
                        zip.file(`frame_${padded}.png`, capturedFrames[i]);
                        (capturedFrames as any)[i] = null; // liberar blob al vuelo
                    }

                    const zipBlob = await zip.generateAsync(
                        { type: "blob", compression: "STORE" },
                        (meta) => {
                            recButton.textBlock!.text =
                                `ZIP ${chunk + 1}/${totalChunks} · ${Math.round(meta.percent)}%`;
                        }
                    );

                    const url = URL.createObjectURL(zipBlob);
                    const a   = document.createElement("a");
                    a.href     = url;
                    a.download = `frames_part${String(chunk + 1).padStart(3, "0")}.zip`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setTimeout(() => URL.revokeObjectURL(url), 8000);

                    // Pausa entre descargas para que el navegador procese
                    await new Promise<void>((r) => setTimeout(r, 300));
                }
            }

            capturedFrames      = [];
            captureFrameCount   = 0;
            recButton.isEnabled = true;
            recButton.textBlock!.text = "⏺ REC";
            recButton.background      = "rgba(180,0,0,0.85)";
            frameCountLabel.isVisible = false;
            resButtons.forEach(b => { b.isVisible = true; });
        }

        // ============================================================
        // BOTON WebM — igual que REC, debajo de el (top 51px)
        // Video con alpha real (VP9) + audio de la animacion incluido
        // ============================================================

        const webmButton = gui.Button.CreateSimpleButton("webmBtn", "⏺ WebM");
        webmButton.width          = "100px";
        webmButton.height         = "36px";
        webmButton.color          = "white";
        webmButton.background     = "rgba(140,0,60,0.9)";
        webmButton.cornerRadius   = 8;
        webmButton.thickness      = 0;
        webmButton.fontSize       = 13;
        webmButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        webmButton.verticalAlignment   = gui.Control.VERTICAL_ALIGNMENT_TOP;
        webmButton.left = "-10px";
        webmButton.top  = "51px";  // REC(10) + height(36) + sep(5) = 51
        advancedTexture.addControl(webmButton);

        // Barra de progreso del WebM
        const webmStatusRect = new gui.Rectangle("webmStatusRect");
        webmStatusRect.width       = "160px";
        webmStatusRect.height      = "22px";
        webmStatusRect.cornerRadius = 5;
        webmStatusRect.thickness   = 0;
        webmStatusRect.background  = "rgba(0,0,0,0.6)";
        webmStatusRect.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        webmStatusRect.verticalAlignment   = gui.Control.VERTICAL_ALIGNMENT_TOP;
        webmStatusRect.left     = "-10px";
        webmStatusRect.top      = "340px"; // debajo de Piezas, no interfiere con ningún boton
        webmStatusRect.isVisible = false;
        advancedTexture.addControl(webmStatusRect);

        const webmStatusText = new gui.TextBlock();
        webmStatusText.text      = "Preparando...";
        webmStatusText.color     = "white";
        webmStatusText.fontSize  = 11;
        webmStatusText.fontFamily = "Arial";
        webmStatusRect.addControl(webmStatusText);

        async function exportWebMWithAlpha(): Promise<void> {
            if (isCapturing) return;

            const mimeType =
                MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
                    ? "video/webm;codecs=vp9"
                    : MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
                    ? "video/webm;codecs=vp8"
                    : "video/webm";

            isCapturing  = true;
            captureAbort = false;

            const capW     = RESOLUTIONS[selectedResIdx].w;
            const capH     = RESOLUTIONS[selectedResIdx].h;
            const capLabel = RESOLUTIONS[selectedResIdx].label;
            const fps      = 30;
            const pixelCount = capW * capH * 4;

            webmButton.background = "rgba(180,0,50,0.9)";
            if (webmButton.textBlock) webmButton.textBlock.text = "⏹ STOP";
            webmStatusRect.isVisible = true;
            webmStatusText.text      = `Iniciando · ${capLabel}`;
            resButtons.forEach(b => { b.isVisible = false; });

            if (mmdRuntime.isAnimationPlaying) mmdRuntime.pauseAnimation();

            const endFrame: number = theCharAnimation
                ? (theCharAnimation as any).endFrame ?? 9999
                : 9999;

            hideBgForCapture();

            const origW = canvas.width;
            const origH = canvas.height;
            engine.setSize(capW, capH);
            scene.render();

            // ── Audio ────────────────────────────────────────────────────────────
            let audioCtx:    AudioContext | null                = null;
            let audioSrc:    MediaElementAudioSourceNode | null = null;
            let audioDest:   MediaStreamAudioDestinationNode | null = null;
            let audioStream: MediaStream | null                 = null;

            try {
                const internalAudio = (audioPlayer as any)._audio as HTMLAudioElement | undefined;
                if (internalAudio) {
                    audioCtx  = new AudioContext();
                    audioSrc  = audioCtx.createMediaElementSource(internalAudio);
                    audioDest = audioCtx.createMediaStreamDestination();
                    audioSrc.connect(audioDest);
                    audioSrc.connect(audioCtx.destination);
                    audioStream = audioDest.stream;
                }
            } catch (e) {
                console.warn("[WebM] Audio no disponible:", e);
            }

            // ── Canvas de composicion ────────────────────────────────────────────
            const alphaCanvas  = document.createElement("canvas");
            alphaCanvas.width  = capW;
            alphaCanvas.height = capH;
            const alphaCtx2d   = alphaCanvas.getContext("2d", { alpha: true, willReadFrequently: false })!;

            // captureStream(fps) con el fps real declarado.
            // Esto es lo que le dice al contenedor WebM a que velocidad reproducir
            // los frames. Sin esto la duracion del archivo queda en 0.0 y el video
            // se reproduce a velocidad incorrecta.
            const videoTracks    = ((alphaCanvas as any).captureStream(fps) as MediaStream).getTracks();
            const audioTracks    = audioStream ? audioStream.getTracks() : [];
            const combinedStream = new MediaStream([...videoTracks, ...audioTracks]);

            const recorder = new MediaRecorder(combinedStream, {
                mimeType,
                videoBitsPerSecond: Math.round((capW * capH) / (1920 * 1080) * 20_000_000)
            });

            const chunks: Blob[] = [];
            recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
            recorder.start(100);

            const gl = (
                engine.getRenderingCanvas()!.getContext("webgl2") ??
                engine.getRenderingCanvas()!.getContext("webgl")
            ) as WebGL2RenderingContext | WebGLRenderingContext;

            // ── Buffers reutilizables — alojados UNA sola vez ────────────────────
            const pixels  = new Uint8Array(pixelCount);
            const flipped = new Uint8Array(pixelCount);

            // Funcion auxiliar: voltear el buffer verticalmente.
            // WebGL tiene Y=0 en la parte inferior; Canvas 2D en la superior.
            const flipVertical = (): void => {
                for (let row = 0; row < capH; row++) {
                    const src = (capH - 1 - row) * capW * 4;
                    const dst = row * capW * 4;
                    flipped.set(pixels.subarray(src, src + capW * 4), dst);
                }
            };

            // ── Timing: la causa raiz del video acelerado ────────────────────────
            // captureStream(fps) hace que el MediaRecorder espere frames a ese
            // ritmo. Si los frames llegan mas rapido que 1000/fps ms, el encoder
            // los descarta o duplica, produciendo video incorrecto.
            // La solucion es esperar exactamente 1000/fps ms entre cada frame,
            // sin importar cuanto tarde el render. El render puede ser mas lento
            // que 1000/fps (grabar tomara mas tiempo que la animacion real)
            // pero el VIDEO resultante siempre tendra la duracion y velocidad correctas.
            const msPerFrame = 1000 / fps;
            let frameDeadline = performance.now();

            mmdRuntime.seekAnimation(0, true);
            let rendered = 0;

            for (let frame = 0; frame <= endFrame && !captureAbort; frame++) {
                mmdRuntime.seekAnimation(frame, true);
                scene.render();

                // Leer pixels sincronamente — simple y predecible para el timing
                gl.readPixels(0, 0, capW, capH, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

                // Componer en el canvas intermedio
                flipVertical();
                alphaCtx2d.clearRect(0, 0, capW, capH);
                alphaCtx2d.putImageData(
                    new ImageData(new Uint8ClampedArray(flipped.buffer), capW, capH),
                    0, 0
                );

                rendered++;
                if (rendered % 5 === 0) {
                    webmStatusText.text = `Grabando ${rendered}/${endFrame + 1} · ${capLabel}`;
                }

                // Avanzar el deadline al siguiente frame y esperar hasta el.
                // Si el render tardo mas que msPerFrame, el wait es 0 (no negativo)
                // y se continua inmediatamente — el video sigue siendo correcto
                // porque captureStream(fps) ya fijo el ritmo en el contenedor.
                frameDeadline += msPerFrame;
                const waitTime = frameDeadline - performance.now();
                if (waitTime > 0) {
                    await new Promise<void>((r) => setTimeout(r, waitTime));
                } else {
                    // El render fue mas lento que el fps objetivo.
                    // Ceder el hilo igualmente para que el tab no se congele.
                    await new Promise<void>((r) => setTimeout(r, 0));
                    // Resetear el deadline para no acumular deuda de tiempo.
                    frameDeadline = performance.now();
                }
            }

            recorder.stop();
            await new Promise<void>((r) => { recorder.onstop = () => r(); });

            if (audioCtx) { try { await audioCtx.close(); } catch { /* ignorar */ } }

            engine.setSize(origW, origH);
            restoreBgAfterCapture();
            isCapturing = false;

            if (!captureAbort && chunks.length > 0) {
                webmStatusText.text = "Descargando...";
                const blob = new Blob(chunks, { type: mimeType });
                const url  = URL.createObjectURL(blob);
                const a    = document.createElement("a");
                a.href     = url;
                a.download = `animation_alpha_${capLabel}_30fps.webm`;
                a.click();
                URL.revokeObjectURL(url);
            }

            webmButton.background = "rgba(140,0,60,0.9)";
            if (webmButton.textBlock) webmButton.textBlock.text = "⏺ WebM";
            webmStatusRect.isVisible = false;
            resButtons.forEach(b => { b.isVisible = true; });
        }

        webmButton.onPointerClickObservable.add(() => {
            if (!isCapturing) {
                void exportWebMWithAlpha();
            } else {
                captureAbort = true;
                restoreBgAfterCapture();
                isCapturing = false;
                webmButton.background = "rgba(140,0,60,0.9)";
                if (webmButton.textBlock) webmButton.textBlock.text = "⏺ WebM";
                webmStatusRect.isVisible = false;
                resButtons.forEach(b => { b.isVisible = true; });
            }
        });

        // ── VISTA ORTOGONAL (CAD) ────────────────────────────────────────────────
        // ArcRotateCamera en modo ORTHOGRAPHIC.
        // Clic izquierdo: orbitar   Clic derecho: pan   Rueda: zoom
        // Boton ORTO en panel derecho. Sub-panel con vistas: Front/Back/Left/Right/Top

        const orthoCamera = new ArcRotateCamera(
            "orthoCamera", -Math.PI / 2, Math.PI / 2,
            30 * worldScale, new Vector3(0, 10 * worldScale, 0), scene
        );
        orthoCamera.mode      = ArcRotateCamera.ORTHOGRAPHIC_CAMERA;
        orthoCamera.layerMask = 1;
        orthoCamera.minZ      = -200;
        orthoCamera.maxZ      = 500;
        // attachControl para que clic izq/der y rueda funcionen nativamente
        orthoCamera.attachControl(canvas, true);
        // Mientras no este activa, desconectar el control para no interferir
        orthoCamera.detachControl();

        let orthoSize   = 2.0;
        let orthoActive = false;
        let camBeforeOrtho: any = null;

        function syncOrthoSize(): void {
            const asp = canvas.width / canvas.height;
            orthoCamera.orthoLeft   = -orthoSize * asp;
            orthoCamera.orthoRight  =  orthoSize * asp;
            orthoCamera.orthoTop    =  orthoSize;
            orthoCamera.orthoBottom = -orthoSize;
        }
        syncOrthoSize();
        window.addEventListener("resize", syncOrthoSize);

        // Zoom ortogonal con la rueda — solo cuando el modo esta activo
        canvas.addEventListener("wheel", (e: WheelEvent) => {
            if (!orthoActive || isCapturing) return;
            orthoSize = Math.max(0.2, Math.min(20, orthoSize + (e.deltaY > 0 ? 0.15 : -0.15)));
            syncOrthoSize();
        }, { passive: true });

        const ORTHO_PRESETS = [
            { label: "Front", alpha: -Math.PI / 2, beta: Math.PI / 2  },
            { label: "Back",  alpha:  Math.PI / 2, beta: Math.PI / 2  },
            { label: "Left",  alpha:  Math.PI,     beta: Math.PI / 2  },
            { label: "Right", alpha:  0,           beta: Math.PI / 2  },
            { label: "Top",   alpha: -Math.PI / 2, beta: 0.0001       },
        ];

        // Panel de vistas — se despliega debajo del boton ORTO
        const orthoPanel = new gui.StackPanel("orthoPanel");
        orthoPanel.width      = "70px";
        orthoPanel.isVertical = true;
        orthoPanel.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        orthoPanel.verticalAlignment   = gui.Control.VERTICAL_ALIGNMENT_TOP;
        orthoPanel.left      = "-10px";
        orthoPanel.top       = "372px";  // ORTO(340) + 26 + 6
        orthoPanel.isVisible = false;
        advancedTexture.addControl(orthoPanel);

        const orthoBtns: gui.Button[] = [];
        ORTHO_PRESETS.forEach((p, i) => {
            const b = gui.Button.CreateSimpleButton(`op${i}`, p.label);
            b.width         = "60px";
            b.height        = "26px";
            b.color         = "white";
            b.background    = i === 0 ? "rgba(0,120,200,0.9)" : "rgba(40,40,40,0.8)";
            b.cornerRadius  = 5;
            b.thickness     = 0;
            b.fontSize      = 11;
            b.paddingBottom = "4px";
            orthoBtns.push(b);
            orthoPanel.addControl(b);
            b.onPointerClickObservable.add(() => {
                orthoCamera.alpha  = p.alpha;
                orthoCamera.beta   = p.beta;
                orthoCamera.target = new Vector3(0, 10 * worldScale, 0);
                syncOrthoSize();
                orthoBtns.forEach((x, j) => {
                    x.background = j === i ? "rgba(0,120,200,0.9)" : "rgba(40,40,40,0.8)";
                });
            });
        });

        function enterOrtho(): void {
            if (orthoActive) return;
            camBeforeOrtho          = scene.activeCameras![0];
            scene.activeCameras![0] = orthoCamera;
            orthoCamera.attachControl(canvas, true);
            orthoActive             = true;
            orthoPanel.isVisible    = true;
            orthoButton.background  = "rgba(0,140,80,0.9)";
            if (orthoButton.textBlock) orthoButton.textBlock.text = "ORTO*";
            syncOrthoSize();
        }

        function exitOrtho(): void {
            if (!orthoActive) return;
            orthoCamera.detachControl();
            if (camBeforeOrtho) scene.activeCameras![0] = camBeforeOrtho;
            orthoActive            = false;
            orthoPanel.isVisible   = false;
            orthoButton.background = "rgba(40,40,40,0.8)";
            if (orthoButton.textBlock) orthoButton.textBlock.text = "ORTO";
        }

        // Boton ORTO — panel derecho, debajo de Piezas (309 + 26 + 5 = 340)
        const orthoButton = gui.Button.CreateSimpleButton("orthoBtn", "ORTO");
        orthoButton.width          = "60px";
        orthoButton.height         = "26px";
        orthoButton.color          = "white";
        orthoButton.background     = "rgba(40,40,40,0.8)";
        orthoButton.cornerRadius   = 5;
        orthoButton.thickness      = 0;
        orthoButton.fontSize       = 11;
        orthoButton.horizontalAlignment = gui.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        orthoButton.verticalAlignment   = gui.Control.VERTICAL_ALIGNMENT_TOP;
        orthoButton.left = "-10px";
        orthoButton.top  = "340px";
        advancedTexture.addControl(orthoButton);
        orthoButton.onPointerClickObservable.add(() => orthoActive ? exitOrtho() : enterOrtho());

        recButton.onPointerClickObservable.add(() => {
            if (!isCapturing) {
                void captureOffline();
            } else {
                captureAbort = true;
                restoreBgAfterCapture();
                isCapturing = false;
                recButton.textBlock!.text = "⏺ REC";
                recButton.background = "rgba(180,0,0,0.85)";
                frameCountLabel.isVisible = false;
                resButtons.forEach(b => { b.isVisible = true; });
            }
        });


        // ============================================================

        return scene;
    }
}
