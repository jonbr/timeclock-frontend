
console.log("jon");
//const reload = window.location.reload();
//console.log(reload);

const loginRadio = document.querySelector

//const loginLogout = document.querySelector(".btn.btn-outline-light.me-2");
const payload = { projectID: 1 };

//loginLogout.addEventListener('click', event => {})

const header = document.querySelector('.text-bg-dark');
const clockInOutBtnText = document.getElementById('logg-in-out');

function clockInOut() {
	const clockInOutBtn = document.getElementById('btn-check-outlined');
	clockInOutBtn.addEventListener('change', () => {
		console.log(clockInOutBtn.checked)
  	if (clockInOutBtn.checked) {
  		// logged-in
  		console.log("user just logged in....")
  		apiCall("POST", "timeregistration/clockin")

  		header.style.setProperty("background-color", "#0d8b0d", "important");
  		clockInOutBtnText.innerHTML = "Log-Out";
	  } else {
	  	//looged-out
	  	console.log("user just logged out....")
	  	apiCall("POST", "timeregistration/clockout")

	  	header.style.removeProperty("background-color");
	  	clockInOutBtnText.innerHTML = "Log-In";
	  }
	});
}

function projects() {
	console.log("---projects---")
	/*const projects = document.getElementById('projects');
	projects.addEventListener('change', () => {
	});*/
	apiCall("GET", "project")
}

function apiCall(method, path) {
	var url = 'http://127.0.0.1:8080/' + path
	console.log('url: ', url)
	let options = {
    method,
    headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	  	//'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbW1pIiwiZW1haWwiOiJ0b21taUBsYXVyYS5uZXQiLCJleHAiOjE2NjgyNzcxOTZ9.fw5P1i_7KkteF9rtooE3okp6ARhi8MsSnfcerlZfuKs'
	 	},
  };
  console.log(options)
  if ( method === 'POST' ) {
    //url += '?' + ( new URLSearchParams( params ) ).toString();
    options.body = JSON.stringify( payload );
  }
	fetch(url, options)
	.then((response) => response.json())
	.then((data) => {
    console.log('Success:', data);
	})
	.catch((error) => {
    console.error('Error:', error.Err);
	});
}

