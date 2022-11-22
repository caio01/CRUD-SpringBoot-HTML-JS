const URL = "http://18.229.123.27:3334"
var current_page = 1
var records_per_page = 5
var lengthClients

getClients().then(clients => lengthClients = clients.length)
changePage(1)

function changePage(page)
{
  current_page = page
  document.getElementById('tbody').innerHTML = ""

  getClients().then(clients => {
    for(i = (page * records_per_page) - records_per_page; 
        page == Math.ceil(clients.length / records_per_page) ? i < clients.length : i < (page * records_per_page); 
        i++) {
      lengthClients = clients.length

      document.getElementById('tbody').innerHTML +=
        `<tr>
            <td id="${clients[i].id}">${clients[i].id}</td>
            <td>${clients[i].name}</td>
            <td>${clients[i].phone}</td>
            <td>${clients[i].email}</td>
            <td>${clients[i].address}</td>
            <td>${clients[i].country}</td>
            <td>
                <a href="#editEmployeeModal" onclick="loadFormEdit(document.getElementById('${clients[i].id}').innerHTML)" 
                    class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                </a>
                <a href="#deleteEmployeeModal" onclick="loadFormDel(document.getElementById('${clients[i].id}').innerHTML)" 
                    class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                </a>
            </td>
              </tr>`
    }

    listPagination(page, clients.length)
  })
}

function prevPage()
{
    if (current_page > 1) {
        current_page--
        changePage(current_page)
    }
}

function nextPage()
{
    if (current_page < Math.ceil(lengthClients / records_per_page)) {
        current_page++
        changePage(current_page)
    }
}

function listPagination	(page, length) {
  var pag = 
      `<div class="hint-text">
          Showing <b>${records_per_page}
          </b> out of <b>${length}</b> entries
      </div>`
  if(page == 1) {
    pag += 
      `<ul class="pagination">
        <li class="page-item" onclick="prevPage()"><a href="#" class="page-link">Previous</a></li>
        <li class="page-item active"><a href="#" class="page-link">${page}</a></li>
        <li class="page-item" onclick="changePage(${page + 1})"><a href="#" class="page-link">${page + 1}</a></li>
        <li class="page-item" onclick="changePage(${page + 2})"><a href="#" class="page-link">${page + 2}</a></li>
        <li class="page-item" onclick="changePage(${page + 3})"><a href="#" class="page-link">${page + 3}</a></li>
        <li class="page-item" onclick="changePage(${page + 4})"><a href="#" class="page-link">${page + 4}</a></li>
        <li class="page-item" onclick="nextPage()"><a href="#" class="page-link">Next</a></li>
      </ul>`
  } else if(page == 2) {
    pag += 
      `<ul class="pagination">
        <li class="page-item" onclick="prevPage()"><a href="#" class="page-link">Previous</a></li>
        <li class="page-item" onclick="changePage(${page - 1})"><a href="#" class="page-link">${page - 1}</a></li>
        <li class="page-item active" onclick="changePage(${page})"><a href="#" class="page-link">${page}</a></li>
        <li class="page-item" onclick="changePage(${page + 1})"><a href="#" class="page-link">${page + 1}</a></li>
        <li class="page-item" onclick="changePage(${page + 2})"><a href="#" class="page-link">${page + 2}</a></li>
        <li class="page-item" onclick="changePage(${page + 3})"><a href="#" class="page-link">${page + 3}</a></li>
        <li class="page-item" onclick="nextPage()"><a href="#" class="page-link">Next</a></li>
      </ul>`
  } else if(page == Math.ceil(length / records_per_page) - 1) {
    pag += 
      `<ul class="pagination">
        <li class="page-item" onclick="prevPage()"><a href="#" class="page-link">Previous</a></li>
        <li class="page-item" onclick="changePage(${page - 3})"><a href="#" class="page-link">${page - 3}</a></li>
        <li class="page-item" onclick="changePage(${page - 2})"><a href="#" class="page-link">${page - 2}</a></li>
        <li class="page-item" onclick="changePage(${page - 1})"><a href="#" class="page-link">${page - 1}</a></li>
        <li class="page-item active" onclick="changePage(${page})"><a href="#" class="page-link">${page}</a></li>
        <li class="page-item" onclick="changePage(${page + 1})"><a href="#" class="page-link">${page + 1}</a></li>
        <li class="page-item" onclick="nextPage()"><a href="#" class="page-link">Next</a></li>
      </ul>`
  } else if(page == Math.ceil(length / records_per_page)) {
    pag += 
      `<ul class="pagination">
        <li class="page-item" onclick="prevPage()"><a href="#" class="page-link">Previous</a></li>
        <li class="page-item" onclick="changePage(${page - 4})"><a href="#" class="page-link">${page - 4}</a></li>
        <li class="page-item" onclick="changePage(${page - 3})"><a href="#" class="page-link">${page - 3}</a></li>
        <li class="page-item" onclick="changePage(${page - 2})"><a href="#" class="page-link">${page - 2}</a></li>
        <li class="page-item" onclick="changePage(${page - 1})"><a href="#" class="page-link">${page - 1}</a></li>
        <li class="page-item active" onclick="changePage(${page})"><a href="#" class="page-link">${page}</a></li>
        <li class="page-item" onclick="nextPage()"><a href="#" class="page-link">Next</a></li>
      </ul>`
  } else {
    pag += 
      `<ul class="pagination">
        <li class="page-item" onclick="prevPage()"><a href="#" class="page-link">Previous</a></li>
        <li class="page-item" onclick="changePage(${page - 2})"><a href="#" class="page-link">${page - 2}</a></li>
        <li class="page-item" onclick="changePage(${page - 1})"><a href="#" class="page-link">${page - 1}</a></li>
        <li class="page-item active" onclick="changePage(${page})"><a href="#" class="page-link">${page}</a></li>
        <li class="page-item" onclick="changePage(${page + 1})"><a href="#" class="page-link">${page + 1}</a></li>
        <li class="page-item" onclick="changePage(${page + 2})"><a href="#" class="page-link">${page + 2}</a></li>
        <li class="page-item" onclick="nextPage()"><a href="#" class="page-link">Next</a></li>
      </ul>`
  }

  document.getElementById('pag').innerHTML = pag
  
}

async function getClients() {
  var x

  await fetch(`${URL}/clients`)
  .then(response => x = response.json())

  return x
}

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
  $('#addEmployeeModal').modal('toggle')
  alert("Client successfully added")
  changePage(1)
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
  $('#editEmployeeModal').modal('toggle')
  alert("Client successfuly edited")
  changePage(1)
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
  $('#deleteEmployeeModal').modal('toggle')
  alert("Client successfuly deleted")
  changePage(1)
}