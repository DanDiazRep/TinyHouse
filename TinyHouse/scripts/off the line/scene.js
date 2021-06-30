var freeCamera;
var arcCamera;
var extraAssets;
var sceneInfo;
var scene;
engine.loadingUIBackgroundColor = "white";
getapi("http://servexusinc.com/sceneinfo/")
    .then(data => {
        sceneInfo = data[0];
        console.log(sceneInfo);
    })
    .then(() => {
        scene = createScene();
        // run the render loop
        engine.runRenderLoop(function () {
            window.addEventListener("resize", function () { engine.resize(); });
            scene.render();
        });
    });

//Scene creation
var createScene = function () {
    //FIXED scene setup
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(144 / 255, 153 / 255, 162 / 255); //Background color
    scene.contrast = 1.3;
    scene.exposure = 0.9;
    scene.environmentIntensity = 1.0;

    //DATA BASED scene setup    
    var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(sceneInfo.hdr, scene);
    scene.environmentTexture = hdrTexture;


    // Camera Setup 
    arcCamera = new BABYLON.ArcRotateCamera("ExteriorCamera", sceneInfo.alphaCamera, sceneInfo.betaCamera, sceneInfo.radiusCamera, new BABYLON.Vector3(sceneInfo.xCameraTarget, sceneInfo.yCameraTarget, sceneInfo.zCameraTarget), scene);
    arcCamera.attachControl(canvas, true);
    arcCamera.angularSensibilityX = 2000;
    arcCamera.angularSensibilityY = 2000;
    arcCamera.lowerRadiusLimit = sceneInfo.lowerRadiusLimit;
    arcCamera.upperRadiusLimit = sceneInfo.upperRadiusLimit;
    arcCamera.panningSensibility = sceneInfo.panningSensibility;
    arcCamera.wheelDeltaPercentage = sceneInfo.wheelDeltaPercentage;

    freeCamera = new BABYLON.UniversalCamera("InteriorCamera", new BABYLON.Vector3(0, 150, -10), scene);
    freeCamera.angularSensibility = 5000;
    freeCamera.attachControl(canvas, true);
    freeCamera.position = arcCamera.position;
    freeCamera.target = arcCamera.target;
    //scene.activeCamera = freeCamera;

    //FIXED Lighting
    var hemisphericLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0.2), scene);
    hemisphericLight.intensity = 0.0500;
    hemisphericLight.groundColor = new BABYLON.Color3(0, 0, 0);

    //DATA BASED Lighting
    var dataLights = [];
    var dataShadowGenerator = [];
    sceneInfo.lights.map((light, nLight) => {
        dataLights[nLight] = new BABYLON.DirectionalLight(light.name, new BABYLON.Vector3(light.xDirection, light.yDirection, light.zDirection), scene);
        dataLights[nLight].intensity = light.intensity;
        dataLights[nLight].position = new BABYLON.Vector3(light.xPosition, light.yPosition, light.zPosition);

        //Shadow casting. Desktop version only
        dataShadowGenerator[nLight] = new BABYLON.ShadowGenerator(512, dataLights[nLight]);
        dataShadowGenerator[nLight].useBlurExponentialShadowMap = true;
        dataShadowGenerator[nLight].bias = 0.025;
        dataShadowGenerator[nLight].blurBoxOffset = 1;
        dataShadowGenerator[nLight].blurScale = 4;
        dataShadowGenerator[nLight].useKernelBlur = true;
    });


    // FIXED Ground
    const ground = BABYLON.Mesh.CreateGround("ground", 1500, 1000, 1, scene);
    var groundMaterial = new BABYLON.PBRMaterial("groundMaterial", scene);

    groundMaterial.albedoColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    groundMaterial.roughness = 0;
    groundMaterial.metallic = 0;
    groundMaterial.indexOfRefraction = 3.0;
    groundMaterial.metallicF0Factor = 1.0;
    groundMaterial.environmentIntensity = 0;
    groundMaterial._alpha = 0.2;

    ground.material = groundMaterial;
    ground.receiveShadows = true;
    


    //ANIMATIONS
    var arrow;
    BABYLON.SceneLoader.ImportMesh("arrow_model", "http://tinyhome.servexusinc.com/assets/models/draco/", "Arrow.glb", scene, function (meshes) {
        extraAssets = meshes[0];
        arrow = meshes[1];
        arrow.isPickable = true;
        arrow.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6);
        arrow.position.y = 70;
        arrow.material.albedoColor = new BABYLON.Color3(0, 0.5, 1); //Default arrow Color
        addArrowAnimations(arrow, 200);
        arrow.setEnabled(false);        

        //Arrows Clones
        var EastArrow = arrow.clone("EastArrow");
        EastArrow.material = arrow.material.clone("EastArrowMaterial");        
        EastArrow.position.x = -300;
        EastArrow.position.y = 70;
        addArrowAnimations(EastArrow, 200);
        EastArrow.setEnabled(false);

        var EastUpArrow = arrow.clone("EastUpArrow");
        EastUpArrow.material = arrow.material.clone("EastUpArrowMaterial");
        EastUpArrow.position.x = -230;
        EastUpArrow.position.z = -80;
        EastUpArrow.position.y = 280;
        addArrowAnimations(EastUpArrow, 315);
        EastUpArrow.setEnabled(false);

        var WestArrow = arrow.clone("WestArrow");
        WestArrow.material = arrow.material.clone("WestArrowMaterial");
        WestArrow.position.x = 320;
        WestArrow.position.y = 70;
        addArrowAnimations(WestArrow, 200);
        WestArrow.setEnabled(false);

        var WestUpArrow = arrow.clone("WestUpArrow");
        WestUpArrow.material = arrow.material.clone("WestUpArrowMaterial");
        WestUpArrow.position.x = 200;
        WestUpArrow.position.z = -80;
        WestUpArrow.position.y = 280;
        addArrowAnimations(WestUpArrow, 315);
        WestUpArrow.setEnabled(false);

    });

    console.log(scene);
    

    //Project Meshes
    // Mesh Importer
    var firstModel = sceneInfo.symbols[0];
    BABYLON.SceneLoader.ImportMesh("", "http://servexusinc.com/assets/models/TinyhomeA/", "Shell.glb", scene, function (meshes) {
        meshes.map(function (mesh) {
            if (mesh.name == ("__root__")) {
                //Position and Rotation manager
                var pivot = new BABYLON.TransformNode(firstModel.name + "_pivot");
                mesh.parent = pivot;
                pivot.position = new BABYLON.Vector3(firstModel.xPosition, firstModel.yPosition, firstModel.zPosition);
                pivot.rotate(BABYLON.Axis.X, firstModel.xRotation, BABYLON.Space.LOCAL);
                pivot.rotate(BABYLON.Axis.Y, firstModel.yRotation, BABYLON.Space.LOCAL);
                pivot.rotate(BABYLON.Axis.Z, firstModel.zRotation, BABYLON.Space.LOCAL);

            }
            if (!mesh.name.includes("root")) {
                //cast shadows
                dataShadowGenerator.forEach(generator => {
                    generator.addShadowCaster(mesh);
                });
                mesh.receiveShadows = true;

                //Pointer manager
                // mesh.actionManager = new BABYLON.ActionManager(scene);
                // mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (env) {
                //}, false));

                //Default visualization
                if (firstModel.defaultLayers) {
                    mesh.isVisible = firstModel.defaultLayers.includes(mesh.material.id);
                }
            }

            /*Material correction*/
            if (mesh._material) {
                mesh._material.metallic = 0.5;
                mesh._material.indexOfRefraction = 1.0;
            }

        });

        /*sceneInfo.Symbols.map((model, nModel) => {
            if (nModel > 0) {
                //Async Donwload the other meshes
                Promise.all([
                    BABYLON.SceneLoader.ImportMeshAsync(null, model.url, model.file, scene).then(function (loadedModel) {
                        loadedModel.meshes.map(function (mesh) {
                            if (mesh.name == ("__root__")) {
                                //Position and Rotation manager
                                var pivot = new BABYLON.TransformNode(model.name + "_pivot");
                                mesh.parent = pivot;
                                pivot.position = new BABYLON.Vector3(model.xPosition, model.yPosition, model.zPosition);
                                pivot.rotate(BABYLON.Axis.X, model.xRotation, BABYLON.Space.LOCAL);
                                pivot.rotate(BABYLON.Axis.Y, model.yRotation, BABYLON.Space.LOCAL);
                                pivot.rotate(BABYLON.Axis.Z, model.zRotation, BABYLON.Space.LOCAL);

                            }
                            if (!mesh.name.includes("root")) {
                                //console.log(mesh.name);
                                //cast shadows
                                dataShadowGenerator.forEach(generator => {
                                    generator.addShadowCaster(mesh);
                                });
                                mesh.receiveShadows = true;

                                //Pointer manager
                                //mesh.actionManager = new BABYLON.ActionManager(scene);
                                // mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (env) {
                                //}, false));

                                //Default visualization
                                if (model.defaultLayers) {
                                    mesh.isVisible = model.defaultLayers.includes(mesh.material.id);
                                }

                                //Material correction
                                if (mesh._material) {
                                    mesh._material.metallic = 0.5;
                                    mesh._material.indexOfRefraction = 1.0;
                                }
                            }

                        });
                    }),
                ]).then(() => {
                    // Do something else after all models are loaded
                   // scene.activeCamera.spinTo("alpha", 0.95, 40);
                   // scene.activeCamera.spinTo("beta", 1.25, 40);
                });
            }
        });
        */
    },
        function (evt) {
            //On progress function
            var percentage = (evt.loaded * 100 / evt.total).toFixed();
            console.log(`Loading, ${firstModel.name}... ${percentage}%`);
            $("#loadingLabel").text(`Loading, please wait... ${percentage}%`);
            if (percentage == 100) {
                $("#loadingScreen").fadeOut(2000);
            }

        }, function (error) {            
            alert(`Oops! Something went wrong with ${firstModel.name}`);
            
        });


    return scene;
}
// call the createScene function
//var scene //= createScene();




function addArrowAnimations(arrow, height) {

    const frameRate = 30;
    const rotateArrow = new BABYLON.Animation("xRot", "position.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];

    keys.push({
        frame: 0,
        value: arrow.position.y
    });

    keys.push({
        frame: frameRate,
        value: arrow.position.y + 10
    });

    keys.push({
        frame: 2 * frameRate,
        value: arrow.position.y
    });

    rotateArrow.setKeys(keys);
    arrow.animations.push(rotateArrow);    
    scene.beginAnimation(arrow, 0, 2 * frameRate, true);

    var targetRot = new BABYLON.Vector3(0, Math.PI * 2, 0);
    BABYLON.Animation.CreateAndStartAnimation('rotation', arrow, 'rotation', 5, frameRate, arrow.rotation, targetRot, 1);

    //Make the arrow red Animation
    var redAnimation = new BABYLON.Animation("redAnimation", "material.albedoColor", frameRate, BABYLON.Animation.ANIMATIONTYPE_COLOR3,
        0);
    keys = [];
    keys.push({
        frame: 0,
        value: arrow.material.albedoColor
    });
    keys.push({
        frame: frameRate,
        value: new BABYLON.Color3(0, 1, 0),
    });
    redAnimation.setKeys(keys);
    arrow.animations.push(redAnimation);

    //Make the arrow blue Animation
    var blueAnimation = new BABYLON.Animation("blueAnimation", "material.albedoColor", frameRate, BABYLON.Animation.ANIMATIONTYPE_COLOR3,
        0);
    keys = [];
    keys.push({
        frame: 0,
        value: arrow.material.albedoColor
    });
    keys.push({
        frame: frameRate,
        value: new BABYLON.Color3(0, 0.5, 1),
    });
    blueAnimation.setKeys(keys);
    arrow.animations.push(blueAnimation);


    // Action manager Hover on and off
    arrow.actionManager = new BABYLON.ActionManager(scene);
    arrow.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (env) { 
        scene.beginDirectAnimation(arrow, [redAnimation], 0, 2 * frameRate, false);
    }, false));


    arrow.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (env) {
        scene.beginDirectAnimation(arrow, [blueAnimation], 0, 2 * frameRate, false);
    }, false));

    //Action on click
    arrow.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (env) {
        //Resets arrows state
        scene.meshes.map((mesh) => {
            if (mesh.id.includes("arrow")) {
                mesh.setEnabled(true);
            }
        });

        freeCamera.position = scene.activeCamera.position;
        freeCamera.target = scene.activeCamera.target;
        scene.activeCamera = freeCamera;
        freeCamera.spinTo("position", new BABYLON.Vector3(-arrow.position.x, height, arrow.position.z), 50);
        arcCamera.position = freeCamera.position;
        arcCamera.target = freeCamera.target;
        arrow.setEnabled(false);
    }, false));


  }