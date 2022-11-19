const URL = "http://18.229.123.27:3334"

$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip()
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]')
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true                       
			});
		} else{
			checkbox.each(function(){
				this.checked = false                       
			})
		} 
	})
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false)
		}
	})
})

fetch(`${URL}/clients`)
  .then(response => response.json())
  .then(clients => clients?.map(client => {

    var tr =
            `<tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1">
                        <label for="checkbox1"></label>
                    </span>
                </td>
                <td id="${client.id}">${client.id}</td>
                <td>${client.name}</td>
                <td>${client.phone}</td>
                <td>${client.email}</td>
                <td>${client.address}</td>
                <td>${client.country}</td>
                <td>
                    <a href="#editEmployeeModal" onclick="loadForm(document.getElementById('${client.id}').innerHTML)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>`

    tbody.innerHTML += tr
    //document.getElementById().onclick = function(){ alert("g") }
}))

var tbody = document.getElementById('tbody')



function addClient() {
    data = {
        name: document.getElementById('nameAdd').value,
        phone: document.getElementById('phoneAdd').value,
        email: document.getElementById('emailAdd').value,
        address: document.getElementById('addressAdd').value,
        country: document.getElementById('countryAdd').value
    }

    fetch(`${URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => console.log(response.json()))
    
}

function loadForm(id) {
    fetch(`${URL}/clients/${id}`)
  .then(response => response.json())
  .then(client => {
    document.getElementById('nameEdit').value = client.name
    document.getElementById('phoneEdit').value = client.phone
    document.getElementById('emailEdit').value = client.email
    document.getElementById('addressEdit').value = client.address
    document.getElementById('countryEdit').value = client.country
  })
}

function editClient() {
    
}