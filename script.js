const URL = "http://18.229.123.27:3334"
var tbody = document.getElementById('tbody')

fetch(`${URL}/clients`)
  .then(response => response.json())
  .then(clients => clients?.map(client => {

    var tr =
            `<tr>
                <td id="${client.id}">${client.id}</td>
                <td>${client.name}</td>
                <td>${client.phone}</td>
                <td>${client.email}</td>
                <td>${client.address}</td>
                <td>${client.country}</td>
                <td>
                    <a href="#editEmployeeModal" onclick="loadFormEdit(document.getElementById('${client.id}').innerHTML)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" onclick="loadFormDel(document.getElementById('${client.id}').innerHTML)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>`

    tbody.innerHTML += tr
}))


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
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(data),
    })
  alert("Client successfully added")
}

function loadFormEdit(id) {
  fetch(`${URL}/clients/${id}`)
  .then(response => response.json())
  .then(client => {
    document.getElementById('idEdit').innerHTML = client.id
    document.getElementById('nameEdit').value = client.name
    document.getElementById('phoneEdit').value = client.phone
    document.getElementById('emailEdit').value = client.email
    document.getElementById('addressEdit').value = client.address
    document.getElementById('countryEdit').value = client.country
  })
}

function editClient() {
  const id = document.getElementById('idEdit').innerHTML
  data = {
    name: document.getElementById('nameEdit').value,
    phone: document.getElementById('phoneEdit').value,
    email: document.getElementById('emailEdit').value,
    address: document.getElementById('addressEdit').value,
    country: document.getElementById('countryEdit').value
  }

  fetch(`${URL}/clients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  alert("Client successfuly edited")
}

function loadFormDel(id) {
  fetch(`${URL}/clients/${id}`)
  .then(response => response.json())
  .then(client => {
    document.getElementById('idDel').innerHTML = client.id
    document.getElementById('nameDel').innerHTML = client.name
  })
}

function deleteClient() {
  const id = document.getElementById('idDel').innerHTML
  fetch(`${URL}/clients/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => console.log(response.json()))
  alert("Client successfuly deleted")
}


