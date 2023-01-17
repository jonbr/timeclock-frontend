
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

		let arrHead = new Array();	// array for header.
        arrHead = ['', 'Weight', 'Height', 'Thickness', 'Quantity'];
      
        // first create TABLE structure with the headers. 
        let createTable = () => {
          let empTable = document.createElement('table');
          empTable.setAttribute('class', 'table table-bordered');
          empTable.setAttribute('id', 'empTable'); // table id.
      
          let tr = empTable.insertRow(-1);
          for (let h = 0; h < arrHead.length; h++) {
            let th = document.createElement('th'); // create table headers
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
          }
      
          let div = document.getElementById('cont');
          div.appendChild(empTable);  // add the TABLE to the container.
        }
      
        // now, add a new row to the TABLE.
        let addRow = () => {
          let empTab = document.getElementById('empTable');
      
          let rowCnt = empTab.rows.length;   // table row count.
          let tr = empTab.insertRow(rowCnt); // the table row.
          tr = empTab.insertRow(rowCnt);
      
          for (let c = 0; c < arrHead.length; c++) {
            let td = document.createElement('td'); // table definition.
            td = tr.insertCell(c);
      
            if (c === 0) {      // the first column.
              // add a button in every new row in the first column.
              let button = document.createElement('input');
      
              // set input attributes.
              button.setAttribute('type', 'button');
              button.setAttribute('value', 'Remove');
      
              // add button's 'onclick' event.
              button.setAttribute('onclick', 'removeRow(this)');
      
              td.appendChild(button);
            }
            else {
              // 2nd, 3rd and 4th column, will have textbox.
              let ele = document.createElement('input');
              ele.setAttribute('type', 'text');
              ele.setAttribute('value', '');
      
              td.appendChild(ele);
            }
          }
        }
      
        // delete TABLE row function.
        let removeRow = (oButton) => {
          let empTab = document.getElementById('empTable');
          empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); 
          // button -> td -> tr.
        }
      
        // function to extract and submit table data.
        let submit = () => {
          let myTab = document.getElementById('empTable');
          let arrValues1 = new Array();

		   let measurements = [];
          
          // loop through each row of the table.
			for (var i = 1, row; row = myTab.rows[i]; i++) {
				//console.log(row)
				//iterate through rows
				//rows would be accessed using the "row" variable assigned in the for loop
				for (var j = 1, col; col = row.cells[j]; j++) {
					//iterate through columns
					//columns would be accessed using the "col" variable assigned in the for loop
					let measurement = {
						"width": row.cells[j].childNodes[0].value,
						"height": row.cells[j+1].childNodes[0].value,
						"thickness": row.cells[j+2].childNodes[0].value,
						"quantity": row.cells[j+3].childNodes[0].value
					}
					measurements.push(measurement);
					break;
				}
				console.log("------")
			}

			const payload = {
				name: "HLID-11A",
				measurements
			};

		  console.log(payload)
		  const createBluePrintResponse = apiCall('POST', 'inventory/blueprint/', payload, true);
		  console.log("createBluePrintResponse: ", createBluePrintResponse);
        }

const apiCall = async (method, path, payload, isJson) => {
	//preventDefault();
	var url = 'http://127.0.0.1:8080/' + path
	contentType = isJson ? 'application/json' : 'text/plain'
	let options = {
		//credentials: 'omit',
        method: 'POST',
		headers: {
			//'Content-Type': 'application/json',
			'Content-Type': contentType,
			//'Accept': 'application/json',
			'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldyB1c2VybmFtZTIiLCJlbWFpbCI6InRvbW1pQGxhdXJhLm5ldCIsImV4cCI6MTY3MTQ4ODgxOH0.r_6r0CVPS34OQS0qyeUf0yTjFPvqgr-BA2BUHnm5W98'
		},
  	};
  	if ( method === 'POST' ) {
		console.log("POST method")
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
