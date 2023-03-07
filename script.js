// Store attendance data in an array of objects
let attendanceData = [];

// Get form element
const form = document.getElementById('attendance-form');

// Add event listener to form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent default form submission behavior
  
  // Get form data
  const classdate = document.getElementById('classdate').value;
  const name = document.getElementById('name').value;
  const sex = document.querySelector('input[name="sex"]:checked').value;
  
  // Get attended classes
  const attendedClasses = [];
  const classes = document.querySelectorAll('input[name="class"]:checked');
  classes.forEach(function(checkbox) {
    attendedClasses.push(checkbox.value);
  });
  
  // Create attendance object
  const attendance = {
    classdate: classdate,
    name: name,
    sex: sex,
    attendedClasses: attendedClasses
  };
  
  // Add attendance object to attendanceData array
  attendanceData.push(attendance);
  
  // Call function to update attendance table
  updateTable();
  
  // Reset form
  form.reset();
});

// Function to update attendance table
function updateTable() {
  // Get table body element
  const tableBody = document.getElementById('attendance-table-body');
  
  // Clear existing table rows
  tableBody.innerHTML = '';
  
  // Loop through attendance data and create new table rows
  attendanceData.forEach(function(attendance) {
    // Create new table row
    const newRow = document.createElement('tr');
    
    // Create new table cells and add attendance data to them
    const classdateCell = document.createElement('td');
    classdateCell.textContent = attendance.classdate;
    newRow.appendChild(classdateCell);
    
    const nameCell = document.createElement('td');
    nameCell.textContent = attendance.name;
    newRow.appendChild(nameCell);
    
    const sexCell = document.createElement('td');
    sexCell.textContent = attendance.sex;
    newRow.appendChild(sexCell);
    
    const classesCell = document.createElement('td');
    classesCell.textContent = attendance.attendedClasses.join(', ');
    newRow.appendChild(classesCell);
    
    // Add new row to table body
    tableBody.appendChild(newRow);
  });
}
