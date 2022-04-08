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
                    <th class="table-info text-center"">Department Id</th>
                    <th class="table-info text-center"">Department Name</th>
                    <th class="table-info text-center"">Location Id</th>
                    <th class="table-info text-center"">Delete</th>
                    <th class="table-info text-center"">Edit</th></tr></thead>`;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        document.getElementById(
          "hasil-department"
        ).innerHTML += `<tr><td class="table-secondary text-center"">${element.departmentId}</td>
                            <td class="table-secondary text-center"">${element.departmentName}</td>
                            <td class ="table-secondary text-center"">${element.locationId}</td>
                            <td class="table-secondary  text-center""><button class="btn btn-dark text-center" type="submit" onclick="deleteById(${data[i].departmentId})"><i class="fa-solid fa-trash-can"></i></button>
                            <td class="table-secondary text-center""><a class="btn btn-success" type="submit" value="Edit" href="update.html?id=${data[i].departmentId}">Edit</a></td></tr>`;
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
  var xhr = new XMLHttpRequest();
  var url = `http://localhost:9091/departments/${[i]}`;
  xhr.open("DELETE", url, true);
  xhr.send();
  xhr.onloadend = function () {
    loadContent();
  };
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
                    <th class="table-info text-center"">Department Id</th>
                    <th class="table-info text-center"">Department Name</th>
                    <th class="table-info text-center"">Location Id</th>
                    <th class="table-info text-center"">Delete</th>
                    <th class="table-info text-center"">Edit</th></tr></thead>`;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        document.getElementById(
          "hasil-department"
        ).innerHTML += `<tr><td class="table-secondary text-center"">${element.departmentId}</td>
                            <td class="table-secondary text-center"">${element.departmentName}</td>
                            <td class ="table-secondary text-center"">${element.locationId}</td>
                            <td class="table-secondary  text-center""><button class="btn btn-dark text-center" type="submit" onclick="deleteById(${data[i].departmentId})"><i class="fa-solid fa-trash-can"></i></button>
                            <td class="table-secondary text-center""><a class="btn btn-success" type="submit" value="Edit" href="update.html?id=${data[i].departmentId}">Edit</a></td></tr>`;
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
      alert("Sukses");
      window.location = "index.html";
    } else {
      alert("Error");
    }
  };
  xhr.send(data);

  return false;
}
