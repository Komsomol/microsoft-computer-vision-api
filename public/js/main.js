/*jslint node: true */
/*jshint esversion:6 */

const subscriptionKey = 'key';
const url = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

var params =
{
   "visualFeatures": "Categories,Description,Color",
   "details": "",
   "language": "en",
};

const app = {

	init: () => {
		console.log('hello');

		$('#analyzeBtn').click( ()=>{
			app.processImage();
		});

	},

	processImage: () => {
		let sourceimg = document.getElementById("inputImage").value;

		document.querySelector("#sourceImage").src = sourceimg;

		app.doAjax(sourceimg);
	},

	doAjax: (img) =>{

		$.ajax({
			url: url + "?" + $.param(params),

			beforeSend: (xhrObj) =>{
				xhrObj.setRequestHeader("Content-Type","application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},

			type:"POST",

			data: '{"url": ' + '"' + img + '"}',
		})

		.done((data) => {
			$("#responseTextArea").val(JSON.stringify(data, null, 2));
		})

		.fail( (jqXHR, textStatus, errorThrown) => {
			let errorString = (errorThrown === "") ? "Error. " :
			                errorThrown + " (" + jqXHR.status + "): ";
			            errorString += (jqXHR.responseText === "") ? "" :
			                jQuery.parseJSON(jqXHR.responseText).message;
			            alert(errorString);
		});
	},
};

window.onload = app.init;