
engine.loadingUIBackgroundColor = "white";
//Scene creation
var createScene = function () {
    //FIXED scene setup
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(144/255, 153/255, 162/255); //Background color
    scene.contrast = 1.3;
    scene.exposure = 0.9;
    scene.environmentIntensity = 0.7;

    //DATA BASED secene setup
    var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(sceneInfo.hdr, scene);
    scene.environmentTexture = hdrTexture;

    // Camera Setup 
    var camera = new BABYLON.ArcRotateCamera("MainCamera", sceneInfo.alphaCamera, sceneInfo.betaCamera, sceneInfo.radiusCamera, new BABYLON.Vector3(sceneInfo.xCameraTarget, sceneInfo.yCameraTarget, sceneInfo.zCameraTarget), scene);
    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = sceneInfo.lowerRadiusLimit;
    camera.upperRadiusLimit = sceneInfo.upperRadiusLimit;
    camera.panningSensibility = sceneInfo.panningSensibility;
    camera.wheelDeltaPercentage = sceneInfo.wheelDeltaPercentage;


    //FIXED Lighting
    var hemisphericLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0.2), scene);
    hemisphericLight.intensity = 0.1;
    hemisphericLight.groundColor = new BABYLON.Color3(0.4, 0.4, 0.4);

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
        dataShadowGenerator[nLight].bias = 0.03;
        dataShadowGenerator[nLight].blurBoxOffset = 5;
        dataShadowGenerator[nLight].blurScale = 4;
    });


    // FIXED Ground
    /*const ground = BABYLON.Mesh.CreateGround("ground", 1500, 500, 1, scene);
    var groundMaterial = new BABYLON.PBRMaterial("groundMaterial", scene);

    groundMaterial.albedoColor = new BABYLON.Color3(243 / 255, 235 / 255, 212 / 255);
    groundMaterial.roughness = 1;
    groundMaterial.metallic = 0;
    ground.material = groundMaterial;
    ground.receiveShadows = true;*/

    //Project Meshes
    // Mesh Importer
    sceneInfo.Symbols.map((model, nModel) => {
        if (nModel < 1) {
            BABYLON.SceneLoader.ImportMesh("", model.url, model.file, scene, function (meshes) {
                meshes.map(function (mesh) {
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
                        /*dataShadowGenerator.forEach(generator => {
                            generator.addShadowCaster(mesh);
                        });
                        mesh.receiveShadows = true;*/

                        //Pointer manager
                        mesh.actionManager = new BABYLON.ActionManager(scene);
                        mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (env) {
                        }, false));

                        //Default visualization
                        if (model.defaultLayers) {
                            mesh.isVisible = model.defaultLayers.includes(mesh.material.id);
                        }
                    }

                });
            },
                function (evt) {
                    //On progress function
                    var percentage = (evt.loaded * 100 / evt.total).toFixed();
                    console.log(`Loading, ${model.name} ...` + percentage + "%");


                }, function (error) {
                    alert(`Oops! Something went wrong with ${model.name}`);
                });
        }
        else {
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
                            /*dataShadowGenerator.forEach(generator => {
                                generator.addShadowCaster(mesh);
                            });
                            mesh.receiveShadows = true;*/

                            //Pointer manager
                            mesh.actionManager = new BABYLON.ActionManager(scene);
                            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (env) {
                            }, false));

                            //Default visualization
                            if (model.defaultLayers) {
                                mesh.isVisible = model.defaultLayers.includes(mesh.material.id);
                            }
                        }

                    });
                }),                
            ]).then(() => {
                // Do something else after all models are loaded
            });
        }
    });


    return scene;
}
// call the createScene function
var scene = createScene();

