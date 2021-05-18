// import{ dummyResponse,updateDummyData} from "../dummydata.js";
let alumniEventArray=alumniEvent_array
let alumniArray=alumni_array
let pageIndex = 0;
const loadEventList = (pageIndex) => {
const tbody = document.getElementsByTagName('tbody')[0];
tbody.innerHTML="";
alumniArray.forEach((alumni,index) => {
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let div = document.createElement('div');
  div.setAttribute('class', 'custom-control custom-checkbox text-center');

  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'custom-control-input');
  input.setAttribute('id', 'id-'+alumni.alumniId);

  let label = document.createElement('label');
  label.setAttribute('class', 'custom-control-label');
  label.setAttribute('for', 'id-'+alumni.alumniId);

  div.appendChild(input);
  div.appendChild(label);
  td.appendChild(div);
  tr.appendChild(td);
  
  // avatar column
  td = document.createElement('td');
  td.innerHTML = `<div style="aspect-ratio:1/1; height:100px; margin-left:10px;margin-right:auto;overflow:hidden">
    <img class='table__td--height' src=${'/Assets/imgs/'+alumni.imageId}>
  </div>`
  td.setAttribute('width','140px')
  const img = document.createElement('img');
  img.classList.add('table__td--height');
  td.appendChild(img);
  tr.appendChild(td);
  
  // name column
  td = document.createElement('td');
  td = document.createElement('td');
  let span = document.createElement('span');
  span.innerHTML = alumni.name;
  td.appendChild(span);
  tr.appendChild(td);

  // department column
  td = document.createElement('td');
  span = document.createElement('span');
  span.innerHTML = alumni.department;
  td.appendChild(span);
  tr.appendChild(td);

  // status column
  td = document.createElement('td');
  div = document.createElement('div');
  div.setAttribute('class', 'text-black rounded p-1');

  // check if this alumni invited in this 'Event 1'
  const foundAlumniEvent = alumniEventArray.filter(alumni_event => {
    return alumni_event.eventId === localStorage.getItem("eventId") && alumni.alumniId === alumni_event.alumniId;
  })[0];
  if(foundAlumniEvent){
    div.classList.add('bg-success')
    div.innerText = 'Invited';
  }else{
    div.classList.add('bg-danger')
    div.innerText = 'Not Invited';
  }
  td.appendChild(div);
  tr.appendChild(td);

  // action column
  td = document.createElement('td');
  td.setAttribute('class', 'text-center');
  td.innerHTML=`
  <button class="inviteNewAlumni" id=${index} onclick='inviteNewAlumni(this)'>
  <i class="fas fa-user-plus pl-2"  aria-hidden="true" >
  </i>
  </button>`
  tr.appendChild(td);
  tbody.appendChild(tr);
});
}
window.toggle = function (source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != source)
      checkboxes[i].checked = source.checked;
  }
}
// search bar
var searchBar=document.getElementById('searchBar');
searchBar.addEventListener('click', (e) => {
  e.preventDefault();
  var input, filter, table, tr, td, i;
  input = document.getElementById("input1");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var tds = tr[i].getElementsByTagName("td");
    var flag = false;
    for(var j = 0; j < tds.length; j++){
      var td = tds[j];
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        flag = true;
      } 
    }
    if(flag){
        tr[i].style.display = "";
    }
    else {
        tr[i].style.display = "none";
    }
  }
});

window.DeleteRowFunction = function(o) {
  var p=o.parentNode.parentNode.parentNode;
      p.parentNode.removeChild(p);
      alumniArray.splice(o.target.id, 1)
      updateDummyData(dummyResponse)
 }

$(document).ready(function () {
    $("#status,#department").on("change", function () {
        var status = $('#status').find("option:selected").val();
        var department = $('#department').find("option:selected").val();
        SearchData(status, department)
    });
});

window.SearchData = function(status, department) {
    if (status.toUpperCase() == 'ALL' && department.toUpperCase() == 'ALL') {
        $('#myTable tbody tr').show();
    } else {
        $('#myTable tbody tr:has(td)').each(function () {
            var rowStatus = $.trim($(this).find('td:eq(4)').text());
            var rowDepartment = $.trim($(this).find('td:eq(3)').text());
            if (status.toUpperCase() != 'ALL' && department.toUpperCase() != 'ALL') {
                if (rowStatus.toUpperCase() == status.toUpperCase() && rowDepartment == department) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            } else if ($(this).find('td:eq(4)').text() != '' || $(this).find('td:eq(4)').text() != '') {
                if (status != 'All' || department == 'All') {
                    if (rowStatus.toUpperCase() == status.toUpperCase()) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                }
                if (department != 'All' || status =='All') {
                    if (rowDepartment == department) {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                }
            }

        });
    }
}
//clearAll
// document.getque
$("#clearAll").on("click", function (e) {
  e.preventDefault();
  $('#department option').prop('selected', function() {
      $('#myTable tbody tr').show();
      return this.defaultSelected;
  });
  $('#status option').prop('selected', function() {
      $('#myTable tbody tr').show();
      return this.defaultSelected;
  });
  });
  // invite single alumni
window.inviteNewAlumni = function(o){
  var i=o.id;
    var alumniId= alumniArray[i].alumniId;
    var eventId=localStorage.getItem('eventId')
    var dateTime=new Date().toISOString();
    var newAlumniEvent={
      "alumniId": alumniId,
            "eventId": eventId,
            "viewedByAlumni": "false",
            "dateTime": dateTime,
            "notificationClosedByAlumni": "false"
    }
    alumniEventArray.push(newAlumniEvent)
    updateDummyData(dummyResponse)
  loadEventList(0)
}
// invite alumni that is checked
window.inviteCheckedAlumni = function () {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = checkboxes.length-1; i > 0; i--) {
    if(checkboxes[i].checked){
      var alumniId= alumniArray[i-1].alumniId;
    var eventId=localStorage.getItem('eventId')
    var dateTime=new Date().toISOString();
    var newAlumniEvent={
      "alumniId": alumniId,
            "eventId": eventId,
            "viewedByAlumni": "false",
            "dateTime": dateTime,
            "notificationClosedByAlumni": "false"
    }
    alumniEventArray.push(newAlumniEvent)
    }
  }
  checkboxes[0].checked = false;
  updateDummyData(dummyResponse)
  loadEventList(0)
}
window.clicked=function(){
  clickedSomething=clickedSomething+1;
}
window.backToPreviousPage=function(){
    window.history.back();
}
loadEventList(pageIndex);