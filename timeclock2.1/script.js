
console.log("jon");
//const reload = window.location.reload();
//console.log(reload);

const loginRadio = document.querySelector

const header = document.querySelector('.bg-dark ');
const clockInOutBtnText = document.getElementById('logg-in-out');

const clockInOut = async () => {
	const payload = { projectID: 1 };

	const clockInOutBtn = document.getElementById('btn-check-outlined');
	clockInOutBtn.addEventListener('change', () => {
		console.log(clockInOutBtn.checked)
  	if (clockInOutBtn.checked) {
  		// logged-in
  		console.log("user just logged in....");
  		let clockin = apiCall("POST", "timeregistration/clockin", payload);
  		console.log("clockin: ", clockin);

  		header.style.setProperty("background-color", "#0d8b0d", "important");
  		clockInOutBtnText.innerHTML = "Log-Out";
	  } else {
	  	//looged-out
	  	console.log("user just logged out....")
	  	let clockout = apiCall("POST", "timeregistration/clockout", payload);
  		console.log("clockout: ", clockout);

	  	header.style.removeProperty("background-color");
	  	clockInOutBtnText.innerHTML = "Log-In";
	  }
	});
}

const getProjects = async () => {
 	let projectsList = await apiCall("GET", "project", null);
	//now you can directly use jsonData
	console.log("projectsList: ", projectsList);
	for (var i = 0; i < projectsList; i++){                
		var opt = table.getValue(i, 0);  
		var li = document.createElement("li");
		var link = document.createElement("a");             
		var text = document.createTextNode(opt);
		link.appendChild(text);
		link.href = "#";
		li.appendChild(link);
		projectsList.appendChild(li);
  }
}

const createGlassBox = document.getElementById('createGlassBox');
if (createGlassBox) {
	createGlassBox.addEventListener('submit', event => {
		console.log("---createGlassBox---");
		event.preventDefault();
		var glassBoxId = document.getElementById('glassBoxId').value;
		var localName = document.getElementById('localName').value;
		var glassBoxData = document.getElementById('glassBoxData').value;
		console.log("glassBoxId: ", glassBoxId);
		console.log("localName: ", localName);
		console.log("glassBoxData: ", glassBoxData);
		var path = 'inventory/glassbox/' + glassBoxId + '/' + localName;
		//const payload = { name: glassBoxId, localName: projectDescription };
		//console.log("payload: ", payload);
		//console.log("path: ", path)

		const createGlassBoxResponse = apiCall("POST", path, glassBoxData, false);
		console.log("createGlassBoxResponse: ", createGlassBoxResponse);
	});
}

//const myArray = [];
const createBluePrint = document.getElementById('createBluePrint');
if (createBluePrint) {
	//console.log(createBluePrint)
	createBluePrint.addEventListener('submit', event => {
		console.log("---createBluePrint---");
		event.preventDefault();

		var tds = document.querySelectorAll('#childTable tr');
		tds.forEach((userItem) => {
			var tmoVar = userItem.find('td').each(function(){
				console.log(tmoVar)
			}
		});

		const createBluePrintResponse = apiCall("POST", 'inventory/blueprint/', 'glassBoxData', true);
		console.log("createBluePrintResponse: ", createBluePrintResponse);
	});
}

const apiCall = async (method, path, payload, isJson) => {
	//preventDefault();
	var url = 'http://127.0.0.1:8080/' + path
	contentType = isJson ? 'application/json' : 'text/plain'
	let options = {
		//credentials: 'omit',
        method,
		headers: {
			//'Content-Type': 'application/json',
			'Content-Type': contentType,
			//'Accept': 'application/json',
			'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldyB1c2VybmFtZTIiLCJlbWFpbCI6InRvbW1pQGxhdXJhLm5ldCIsImV4cCI6MTY3MDM2Nzg4MH0.7QAO-KhjESRbHWSM6g8NL2_fXFTssI7LCDnRAuGvr28'
		},
  	};
  	if ( method === 'POST' ) {
    	//url += '?' + ( new URLSearchParams( params ) ).toString();
    	//options.body = JSON.stringify( payload );
		options.body = isJson ? JSON.stringify(payload) : payload;
 	}
  	console.log("options: ", options);
	await fetch(url, options)
	.then((response) => response.json())
	.then((data) => {
	  console.log('Success:', data);
	})
	.catch((error) => {
	  console.error('Error:', error);
	});
}
