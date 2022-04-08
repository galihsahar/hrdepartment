function loadContent() {
  clearResult();
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:9091/departments/findAll";
  xhr.onloadstart = function () {
    document.getElementById("button").innerHTML = "Loading....";
  };
  xhr.onerror = function () {
    alert("Gagal mengambil data");
  };
  xhr.onloadend = function () {
    if (this.responseText !== "") {
      var result = JSON.parse(this.responseText);
      var data = result.data;
      document.getElementById("hasil-department").innerHTML = `<thead><tr>
                    <th class="table-danger text-center">Department Id</th>
                    <th class="table-danger text-center">Department Name</th>
                    <th class="table-danger text-center">Location Id</th>
                    <th class="table-danger text-center">Delete</th>
                    <th class="table-danger text-center">Edit</th></tr></thead>`;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        document.getElementById(
          "hasil-department"
        ).innerHTML += `<tr class="text-center"><td class="table-secondary text-center py-4">${element.departmentId}</td>
                            <td class="table-secondary text-center py-4">${element.departmentName}</td>
                            <td class ="table-secondary text-center py-4">${element.locationId}</td>
                            <td class="table-secondary  text-center"><button class="btn btn-warning text-light text-center" type="submit" onclick="deleteById(${data[i].departmentId})"><i class="fa-solid fa-trash-can fa-2x"></i></button>
                            <td class="table-secondary text-center"><a class="text-success" type="submit" href="update.html?id=${data[i].departmentId}"><i class="fa-solid fa-circle-plus fa-3x"></i></a></td></tr>`;
      }

      document.getElementById("button").innerHTML = "Done";
      setTimeout(function () {
        document.getElementById("button").innerHTML = "Load Lagi";
      }, 3000);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function clearResult() {
  document.getElementById("hasil-department").innerHTML = "";
}

function deleteById(i) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      var xhr = new XMLHttpRequest();
      var url = `http://localhost:9091/departments/${[i]}`;
      xhr.open("DELETE", url, true);
      xhr.onload = function () {
        Swal.fire(
          'Delete!',
          'Data has been deleted!',
          'success'
        );
        console.log(this.responseText);
      }
      xhr.onloadend = function () {
        Swal.fire(
          'Delete!',
          'You clicked the button!',
          'success'
        );
        loadContent();
      };
      xhr.send();
    }
  });
}

function searchDepartmentByFirstName(name) {
  var xhr = new XMLHttpRequest();
  var url = `http://localhost:9091/departments/findByDepartmentName?departmentName=${[name]}&page=0&size=10`;
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onloadend = function () {
    if (this.responseText !== "") {
      var result = JSON.parse(this.responseText);
      var data = result.data;
      document.getElementById("hasil-department").innerHTML = `<thead><tr>
                    <th class="table-danger text-center"">Department Id</th>
                    <th class="table-danger text-center"">Department Name</th>
                    <th class="table-danger text-center"">Location Id</th>
                    <th class="table-danger text-center"">Delete</th>
                    <th class="table-danger text-center"">Edit</th></tr></thead>`;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        document.getElementById(
          "hasil-department"
        ).innerHTML += `<tr class="text-center"><td class="table-secondary text-center py-4">${element.departmentId}</td>
                            <td class="table-secondary text-center py-4">${element.departmentName}</td>
                            <td class ="table-secondary text-center py-4">${element.locationId}</td>
                            <td class="table-secondary  text-center "><button class="btn btn-warning text-light text-center" type="submit" onclick="deleteById(${data[i].departmentId})"><i class="fa-solid fa-trash-can fa-2x"></i></button>
                            <td class="table-secondary text-center"><a class="text-success" type="submit" href="update.html?id=${data[i].departmentId}"><i class="fa-solid fa-circle-plus fa-3x"></i></a></td></tr>`;
      }
    }

    document.getElementById("button").innerHTML = "Done";
    setTimeout(function () {
      document.getElementById("button").innerHTML = "Load Lagi";
    }, 3000);
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function sendData() {
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:9091/departments/posts";
  var data = JSON.stringify({
    departmentName: document.getElementById("departmentName").value,
    managerId: document.getElementById("managerId").value,
    locationId: document.getElementById("locationId").value,
  });
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    console.log(this.responseText);
  };
  xhr.onloadend = function () {
    var statusData = JSON.parse(this.responseText).status;
    console.log(statusData);
    if (statusData == true) {
      Swal.fire({
        title: 'Adding Data Success',
        confirmButtonText: 'Save',
      }).then(function () {
        window.location = "index.html";
        loadContent();
      });
    } else {
      Swal.fire(this.response.massage);
    }

  };
  xhr.send(data);

  return false;
}
