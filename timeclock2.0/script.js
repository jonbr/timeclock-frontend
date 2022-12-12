
console.log("jon");
//const reload = window.location.reload();
//console.log(reload);

const loginRadio = document.querySelector

//const loginLogout = document.querySelector(".btn.btn-outline-light.me-2");
//const payload = { projectID: 1 };

//loginLogout.addEventListener('click', event => {})

const header = document.querySelector('.bg-dark ');
const clockInOutBtnText = document.getElementById('logg-in-out');

/*const logInForm = document.getElementById('logInForm');
logInForm.addEventListener('submit', event => {
	console.log("---logIn---");
})*/

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

/*$('projects').on('show.bs.dropdown', function () {
	console.log("myDropdown");
})*/

const createProject = document.getElementById('createProjectForm');
createProject.addEventListener('submit', event => {
	console.log("---createProject---");
	event.preventDefault();
	var projectName = document.getElementById('projectName').value;
	var projectDescription = document.getElementById('projectDescription').value;
	console.log("projectName: ", projectName);
	console.log("projectDescription: ", projectDescription);
	const payload = { name: projectName, description: projectDescription };
	console.log("payload: ", payload);

	const responseFromServer = apiCall("POST", "project", payload);
	console.log("responseFromServer: ", responseFromServer);
});

const apiCall = async (method, path, payload, callback) => {
	preventDefault();
	var url = 'http://127.0.0.1:8080/' + path
	console.log('url: ', url)
	let options = {
        method,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbW1pIiwiZW1haWwiOiJ0b21taUBsYXVyYS5uZXQiLCJleHAiOjE2Njg2Mzg1MTJ9.ck7j60TIHPaHmwSNhEXXOq2YoF2yZLblT25RRM0scDg'
		},
  	};
  	if ( method === 'POST' ) {
    	//url += '?' + ( new URLSearchParams( params ) ).toString();
    	options.body = JSON.stringify( payload );
 	 }
  	console.log("options: ", options);
  	try {
	 	const response  = await fetch(url, options)
		console.log("response: ", response);
		const responseJson = await response.json();
		console.log("responseJson: ", responseJson);
		return responseJson;
	} catch(e) {
		return e;
	}
}

