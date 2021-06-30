async function getapi(url) {

    // Storing response
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    // Storing data in form of JSON
    return response.json(); 
}
var TFeatures;
getapi("http://servexusinc.com/features/")
    .then(TFeatures => {

        TFeatures.map(function (features, nFeatures) {
            if (features.code != "Interior" && features.code != "Exterior" &&
                features.code != "Refrigerator" && features.code != "Stove" &&
                features.code != "Wood Stove" && features.code != "Staircase" &&
                features.code != "Walls"
            ) {
                var $featureWrapper = $(`<div class="featuresWrapper"></div>`);
                $("#featuresCol").append($featureWrapper);
                var $tooltip = $(`<div class="tooltiptext">${features.code}</div>`);
                $featureWrapper.append($tooltip);

                var $feature = $("<div>", {
                    "class": "featuresB",
                    "id": features.code,
                    "onClick": `selectedFeature("${features.code}")`,
                    "style": `cursor:pointer`,
                });
                $featureWrapper.append($feature);
                var $featIcon = $("<i>", {
                    "class": features.icon
                });
                $feature.append($featIcon);

                var $featHBar = $("<div>", {
                    "class": "hide"
                });
                //$canHBar.append($featHBar);
                var $featHBarText = $("<p>", {
                    "text": features.code
                });
                //$featHBar.append($featHBarText);
            }
        });
    });

var previousFeatureCode = "";
function selectedFeature(featureCode) {
    if (featureCode != "Walls") {
        //Resets arrows state
        scene.meshes.map((mesh) => {
            if (mesh.id.includes("arrow")) {
                mesh.setEnabled(true);
            }
        });
    }
    if (featureCode == "Walls") {
        //Resets arrows state
        scene.meshes.map((mesh) => {
            if (mesh.id.includes("arrow")) {
                mesh.setEnabled(false);
            }
        });
    }


    //Option related
    if (previousFeatureCode == featureCode) {
        $("#optionsCol").hide();
        previousFeatureCode = "";
    }
    else {

        //Animation related code
        TFeatures.FeaturesList.map(function (features) {
            if (features.code == featureCode) {
                if (features.animations) {
                    if (features.animations.cameraTransition) {
                        //differ between inside and outside
                        var cameraPositionAux = isCameraOut
                        if (!features.code.includes("Exterior") && isCameraOut) {
                            inOutToggle();                             
                        }

                        if (features.code.includes("Exterior") && !isCameraOut) {
                            inOutToggle();                            
                            return;
                        }
                        // Delays the animation to let the camera do the switch and transition to the inside
                        // The delay has a dependency on the camera position (inside/outside)
                        // The In/Out animations lasts 1s                        
                        setTimeout(() => {                             
                            features.animations.cameraTransition.map(function (transition) {
                                var objectiveVector = new BABYLON.Vector3(transition.x, transition.y, transition.z);
                                freeCamera.spinTo(transition.property, objectiveVector, transition.speed);
                            });
                        }, cameraPositionAux ? 100 : 100);
                    }
                }
            }
        });


        $("#optionsCol").show();
        $("#optionsCol").empty();

        var $optTitle = $("<div>", {
            "text": featureCode,
            "class": "title"
        });
        $("#optionsCol").append($optTitle);
        $optTitle.append($(`<button onclick="hideOptions()"><i class="fa fa-times-circle" aria-hidden="true"></i></button>`));

        var $optcontainer = $(`<div class="btn-group" role="group">`);
        $("#optionsCol").append($optcontainer);

        // creating the options
        TFeatures.FeaturesList.map(function (feature) {
            if (feature.code === featureCode) {

                if (feature.features.length != 0) {
                    feature.features.map(function (subFeature) {
                        var $optframe = $("<div>", {
                            "class": "featureRow"
                        });
                        $optcontainer.append($optframe);
                        var $foption = $("<div>", {
                            "class": "feature",
                            "text": subFeature
                        });
                        $optframe.append($foption);
                        TFeatures.FeaturesList.map(function (feature) {
                            if (feature.code == subFeature) {
                                feature.options.map(function (option) {
                                    var $optcage = $(`<button class="btn btn-secondary button option" onclick="getOption('${option.code}')">`, {
                                        //"class":"button option",
                                        //"id":option.code ,
                                        //"onClick": `getOption("${option.code}")`,
                                    });
                                    $optframe.append($optcage);
                                    var $figure = $(`<div class="figure">`);
                                    $optcage.append($figure);
                                    var $imgopt = $("<img>", {
                                        "class": "icon option",
                                        "src": option.thumbnail,
                                        "alt": "optionfigure",
                                    });
                                    $figure.append($imgopt);
                                    var $imglabel = $("<label>", {
                                        "class": "caption",
                                        "text": option.name,
                                    });
                                    $figure.append($imglabel);
                                });
                            }
                        });
                    });
                } else {
                    feature.options.map(function (opt) {
                        var $featureRow = $("<div>", {
                            "class": "featureRow"
                        });
                        $optcontainer.append($featureRow);
                        var $optframe = $(`<button class="btn btn-secondary button option" onclick="getOption('${opt.code}')">`, {
                            "class": "button option",
                            "id": opt.code,
                            "onClick": `getOption("${opt.code}")`,
                        });

                        $featureRow.append($optframe);
                        var $figure = $(`<div class="figure">`);
                        $optframe.append($figure);
                        var $imgopt = $("<img>", {
                            "class": "icon option",
                            "src": opt.thumbnail,
                            "alt": "optionfigure",
                        });
                        $figure.append($imgopt);
                        var $imglabel = $("<label>", {
                            "class": "caption",
                            "text": opt.name,
                        });
                        $figure.append($imglabel);
                    });
                }
            }
        });

        uiResize();
        previousFeatureCode = featureCode;
    }
}

window.onresize = uiResize;

function hideOptions() {
    $("#optionsCol").hide();
    previousFeatureCode = "";
}

function uiResize() {
    if ($("#optionsCol").is(":visible")) {
        const viewerHeight = Math.round($("#ServexCanvas").height());
        $("#optionsCol").height(viewerHeight - 70);
    }
}

function getOption(userOption) {
    // here should be the code for when you press a option button 
    // so what should happen comes here, and the clicked button id
    // is the var optcode 
    OptionsList.map(option => {
        if (option.code == userOption) {
            option.edit.map(edit => {
                //Check for material edition
                if (edit.material) {
                    edit.material.map(opt => {
                        changeMaterial(edit.layers, opt.channel, opt.url);
                    });
                }
                //Check for color edition
                if (edit.color) {
                    changeColor(edit.layers, edit.color);
                }
                //Check for geometry edition
                if (typeof (edit.visibility) === 'boolean') {
                    changeGeometry(edit.layers, edit.visibility);
                }
            });

        }

    });
}

var scene;
var canvas = document.getElementById('ServexCanvas');
