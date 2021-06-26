
TFeatures.FeaturesList.map(function (features, nFeatures){
	if (features.code != "Interior" && features.code != "Exterior" &&
	features.code != "Fridge" && features.code != "Stove" &&
		features.code != "Fireplace" && features.code != "Staircase"
	) {        
		var $featureWrapper = $(`<div class="featuresWrapper"></div>`);
		$("#featuresCol").append($featureWrapper);
		var $tooltip = $(`<div class="tooltiptext">${features.code}</div>`);
		$featureWrapper.append($tooltip);

		var $feature = $("<div>", {
			"class": "featuresB",
			"id": features.code,
			"onClick":`optionsCreation("${features.code}")`,            
			"style": `cursor:pointer`,
		});
		$featureWrapper.append($feature);
		var $featIcon = $("<i>", {
			"class":features.icon
		});
		$feature.append($featIcon);
		
		var $featHBar = $("<div>", {
			"class": "hide"
		});
		//$canHBar.append($featHBar);
		var $featHBarText = $("<p>",{
			"text":features.code
		});
		//$featHBar.append($featHBarText);
	}
});
var previousfcode = "";
function optionsCreation(fcode) {
	if (previousfcode == fcode) {
		$("#optionsCol").hide();
		previousfcode = "";
	}
	else {
		$("#optionsCol").show();
		$("#optionsCol").empty();

		var $optTitle = $("<div>", {
			"text": fcode,
			"class": "title"
		});
		$("#optionsCol").append($optTitle);

		var $optcontainer = $(`<div class="btn-group" role="group">`);
		$("#optionsCol").append($optcontainer);

		// creating the options
		TFeatures.FeaturesList.map(function (feature) {
			if (feature.code === fcode) {

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
										"text": option.code,
									});
									$figure.append($imglabel);
								});
							}
						});
					});
				} else {
					feature.options.map(function (opt) {
						var $optframe = $(`<button class="btn btn-secondary button option" onclick="getOption('${opt.code}')">`, {
							"class": "button option",
							"id": opt.code,
							"onClick": `getOption("${opt.code}")`,
						});

						$optcontainer.append($optframe);
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
							"text": opt.code,
						});
						$figure.append($imglabel);
					});
				}
			}
		});

		uiResize();
		previousfcode = fcode;
	}
}

window.onresize = uiResize;

function uiResize() {
	console.log($("#optionsCol").is(":visible"));
	if ($("#optionsCol").is(":visible")) {
		const viewerHeight = Math.round($("#ServexCanvas").height());
		$("#optionsCol").height(viewerHeight - 70);
	}
}

function getOption(userOption){
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

var canvas = document.getElementById('ServexCanvas');
