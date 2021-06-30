var engine = new BABYLON.Engine(canvas, true, { premultipliedAlpha: false, preserveDrawingBuffer: true, stencil: true });


function changeColor(selectedLayers, colorCode) {
    scene.meshes.map(function (layer) {
        selectedLayers.map(function (selectedLayer) {
            if (layer._material)
                if (layer._material.id.includes(selectedLayer.layer)) {
                    layer._material._albedoColor = new BABYLON.Color3.FromHexString(colorCode);
            }
        });        
    });
}



function changeGeometry(selectedLayers, visibility) {
    scene.meshes.map(function (layer) {
        if (layer._material)
            selectedLayers.map((selectedLayer) => {
                
                if (selectedLayer.layer == layer._material.name) {
                    layer.isVisible = visibility;
                }
            });
            
          
    });
}

BABYLON.ArcRotateCamera.prototype.spinTo = function (whichprop, targetval, speed) {    
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation('at4', this, whichprop, speed, 120, this[whichprop], targetval, 0, ease);    
}

BABYLON.UniversalCamera.prototype.spinTo = function (whichprop, targetval, speed) {
    isAnimationRunning = true;
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation('at4', this, whichprop, speed, 120, this[whichprop], targetval, 0, ease);        
}


function changeMaterial(selectedLayers, materialChannel, Url) {
    console.log(selectedLayers, materialChannel, Url);
    if (scene.meshes) {
        scene.meshes.map(function (layer) {
            if (selectedLayers.length > 0) {
                selectedLayers.map(function (selectedLayer) {                    
                    if (layer.material) {
                        if (layer._material.id.includes(selectedLayer.layer)) {

                            if (layer._material[materialChannel]) {
                                layer._material[materialChannel].updateURL(Url);
                            }
                            else {
                                layer._material[materialChannel] = new BABYLON.Texture(Url, scene);
                                layer._material[materialChannel].vScale = -1;
                            }
                        }
                    }
                    
                });
            }
        });
    }
}

//Add shadows to the mesh
function addShadows(meshNode) {
    meshNode.model3D._children.map(function (mesh) {
        shadowGenerator.addShadowCaster(mesh._children[0]); 
        groundShadowGenerator.addShadowCaster(mesh._children[0]);
        mesh._children[0].receiveShadows = true;
    });
}



var devMode = 0;
$("body").keypress(function (event) {

    if (event.which == 100 && devMode < 21) {
        devMode++;
    }
    if (devMode == 10) {
        scene.debugLayer.show();
    }
    if (devMode == 12) {
        console.log(String.fromCharCode(66, 121, 32, 122, 114, 101, 108, 105, 099, 107, 64, 103, 109, 097,
            105, 108, 46, 099, 111, 109));
        $("#inspector-host").css("position", "fixed", "z-index", "500");
        $("#inspector-host").css("z-index", "500");
        $("#scene-explorer-host").css("position", "fixed", "z-index", "500");
        $("#scene-explorer-host").css("z-index", "500");
    }

});



//is mobile?
function detectmob() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return false;
    }
    else {
        return true;
    }
}


var watermarkImg = new Image;
watermarkImg.crossOrigin = "anonymous";
if (!detectmob()) {
    watermarkImg.src = '/assets/icons/company-logo.png';
}
else {
    watermarkImg.src = '/assets/icons/company-logo.png';
}
function downloadImage() {
    extraAssets.setEnabled(false); //To be excluded in other projects
    //A portview resize is required to set a fixed image render. Despite the current viewport size.
    vPortHeight = engine._gl.drawingBufferHeight;
    vPortWidth = engine._gl.drawingBufferWidth;
    engine.setSize(1920, 1080);

    scene.render();
    if (!detectmob()) {
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { heigth: 1920, width: 1080, precision: 1 }, function (data) {
            watermark([data, watermarkImg])
                .image(watermark.image.upperLeft(1))
                .then(function (img) {
                    var link = document.createElement('a');
                    link.download = "Sample.png";
                    link.href = img.src;
                    link.click();
                });
        });
    }
    else {
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { heigth: 1920, width: 1080, precision: 4 }, function (data) {
            watermark([data, watermarkImg])
                .image(watermark.image.upperLeft(1))
                .then(function (img) {
                    var link = document.createElement('a');
                    link.download = "Sample.png";
                    link.href = img.src;
                    link.click();
                });
        });
    }

    engine.setSize(vPortWidth, vPortHeight);
    extraAssets.setEnabled(true); //To be excluded in other proyects
}


var renderingZone = document.getElementById("container");
var isFullScreen = false;

document.addEventListener("fullscreenchange", onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
document.addEventListener("msfullscreenchange", onFullScreenChange, false);

function onFullScreenChange() {
    if (document.fullscreen !== undefined) {
        isFullScreen = document.fullscreen;
    } else if (document.mozFullScreen !== undefined) {
        isFullScreen = document.mozFullScreen;
    } else if (document.webkitIsFullScreen !== undefined) {
        isFullScreen = document.webkitIsFullScreen;
    } else if (document.msIsFullScreen !== undefined) {
        isFullScreen = document.msIsFullScreen;
    }

    if (!document.fullscreen) {
       
    }
}

function fullscreenToggle() {
    if (!isFullScreen) {
        engine.enterFullscreen();        
    }
    else {
        BABYLON.Tools.ExitFullscreen();        
    }
};
var isCameraOut = true;
var isRunning = false;

function inOutToggle(toggleButton = false) {   
    
    if (isRunning)
        return; 

    if (toggleButton) {
        hideOptions(); //Close leftside panel
    }
    if (isCameraOut) {  // The can will get inside and switch to Universal cam
        isRunning = true;
        arcCamera.spinTo("radius", 25, 60);
        setTimeout(() => {            
            scene.activeCamera = freeCamera;
            freeCamera.position = arcCamera.position;
            freeCamera.target = arcCamera.target;
        }, toggleButton ? 2000: 0);
            
        
        
        arcCamera.detachControl(); //Removes user control from the ArcCam

        setTimeout(() => {             
            
            isRunning = false;
        }, 1900);

       //Set all arrows on
        scene.meshes.map((mesh) => {
            if (mesh.id.includes("arrow")) {
                mesh.setEnabled(true);
            }
        });  
        
    }

    else if (!isCameraOut) {  // The can will get outside and switch to arc cam
        
        freeCamera.spinTo("target", new BABYLON.Vector3(-95.7, 103.59, -788.4), 60);
        freeCamera.spinTo("position", new BABYLON.Vector3(143.55, 344.6, 1182.57), 60); 
        arcCamera.spinTo("radius", 2000, 1000);
        
        setTimeout(() => { 
            scene.activeCamera = arcCamera;            
            arcCamera.target = new BABYLON.Vector3(0, 200, 0);
            arcCamera.alpha = 1.45;
            arcCamera.beta = 1.45;
            arcCamera.radius = 1200;
            arcCamera.attachControl(canvas, true);

            setTimeout(() => {
                isRunning = false;                
            }, 1000);
        }, 1900); 

        //Set arrows off
        scene.meshes.map((mesh) => {
            if (mesh.id.includes("arrow")) {
                mesh.setEnabled(false);
            }
        });       
    }

    isCameraOut = !isCameraOut;
}