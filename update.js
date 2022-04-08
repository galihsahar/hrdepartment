function updateData() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update it!'
  }).then((result) => {
    if (result.isConfirmed) {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:9091/departments/update";
      var data = JSON.stringify({
        departmentId: new URL(window.location).searchParams.get("id"),
        departmentName: document.getElementById("departmentName").value,
        managerId: document.getElementById("managerId").value,
        locationId: document.getElementById("locationId").value,
      });
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onload = function () {
        console.log(this.responseText);
      };
      xhr.onloadend = function () {
        var statusData = JSON.parse(this.responseText).status;
        console.log(statusData);
        if (statusData == true) {
          Swal.fire({
            title: 'Insert Data Success',
            confirmButtonText: 'Save',
          }).then(function () {
            window.location = "index.html";
          });
        } else {
          Swal.fire(this.response.massage);
        }
      };
      xhr.send(data);
      return false;
    } else {
      window.location = "update.html";
      return false;
    }
  });
  return false;
}

function findOptionLocation() {
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:9091/locations/findAll";
  xhr.onloadend = function () {
    if (this.responseText !== "") {
      var result = JSON.parse(this.responseText);
      var data = result.data;
      console.log(data);
      data.forEach((element) => {
        document
          .getElementById("locationId")
          .options.add(new Option(element.city, element.locationId, false));
      });
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
