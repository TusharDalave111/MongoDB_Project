// Function to get data from the backend
function getData(entity) {
    fetch(`http://localhost:3000/api/${entity}`)  // Correct API URL
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (entity === 'flights') {
                displayFlights(data);
            } else if (entity === 'passengers') {
                displayPassengers(data);
            } else {
                displayTable(entity, data);
            }
        })
        .catch(err => console.error('Error:', err));  // Error handling for network or API issues
}

// Display generic data in a table
function displayTable(entity, data) {
    if (data.length === 0) {
        document.getElementById('data-display').innerHTML = `<p>No data available for ${entity}.</p>`;
        return;
    }

    let html = `<h2>${entity.charAt(0).toUpperCase() + entity.slice(1)}</h2>`;
    html += `<table><thead><tr>`;
    Object.keys(data[0]).forEach(key => {
        html += `<th>${key}</th>`;
    });
    html += `</tr></thead><tbody>`;
    data.forEach(row => {
        html += `<tr>`;
        Object.values(row).forEach(value => {
            html += `<td>${value}</td>`;
        });
        html += `</tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('data-display').innerHTML = html;
}

// Display flights with search functionality
function displayFlights(flights) {
    if (flights.length === 0) {
        document.getElementById('data-display').innerHTML = `<p>No flights available.</p>`;
        return;
    }

    let html = `<h2>Flights</h2>`;
    html += `
    <button class="btn btn-primary" onclick="searchFlight()">Search Flights</button>
    <table id="flights-table">
        <thead>
            <tr>
                <th>flight_id</th>
                <th>flight_no</th>
                <th>dep_time</th>
                <th>arr_time</th>
                <th>airline_id</th>
                <th>status</th>
            </tr>
        </thead>
        <tbody>`;
    flights.forEach(flight => {
        html += `<tr>
                    <td>${flight.flight_id}</td>
                    <td>${flight.flight_no}</td>
                    <td>${flight.dep_time}</td>
                    <td>${flight.arr_time}</td>
                    <td>${flight.airline_id}</td>
                    <td>${flight.status}</td>
                 </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('data-display').innerHTML = html;
}

// Search functionality for flights
function searchFlight() {
    const searchOption = prompt('Search by: flight_id, flight_no, dep_time, arr_time, airline_id, or status');
    if (['flight_id', 'flight_no', 'dep_time', 'arr_time', 'airline_id', 'status'].includes(searchOption)) {
        const searchValue = prompt(`Enter value for ${searchOption}`);
        const rows = document.querySelectorAll('#flights-table tbody tr');
        rows.forEach(row => {
            const cellValue = row.querySelector(`td:nth-child(${getColumnIndex(searchOption)})`).innerText;
            if (cellValue.toLowerCase() !== searchValue.toLowerCase()) {
                row.style.display = 'none';
            }
        });
    } else {
        alert('Invalid search option');
    }
}

// Get column index based on search option
function getColumnIndex(option) {
    switch(option) {
        case 'flight_id': return 1;
        case 'flight_no': return 2;
        case 'dep_time': return 3
        case 'arr_time': return 4
        case 'airline_id': return 5;
        case 'status': return 6;
    }
}

// Display passengers with Add, Update, Delete functionality
function displayPassengers(passengers) {
    if (passengers.length === 0) {
        document.getElementById('data-display').innerHTML = `<p>No passengers available.</p>`;
        return;
    }

    let html = `<h2>Passengers</h2>
    <button class="btn btn-success" onclick="addPassenger()">Add Passenger</button>`;
    html += `
    <table id="passengers-table">
        <thead>
            <tr>
                <th>pass_id</th>
                <th>first_name</th>
                <th>last_name</th>
                <th>passport_no</th>
                <th>email</th>
                <th>phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    passengers.forEach(passenger => {
        html += `<tr>
                    <td>${passenger.pass_id}</td>
                    <td>${passenger.first_name}</td>
                    <td>${passenger.last_name}</td>
                    <td>${passenger.passport_no}</td>
                    <td>${passenger.email}</td>
                    <td>${passenger.phone}</td>
                    <td>
                        <button class="btn btn-warning" onclick="updatePassenger('${passenger.pass_id}')">Update</button>
                        <button class="btn btn-danger" onclick="deletePassenger('${passenger.pass_id}')">Delete</button>
                    </td>
                 </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('data-display').innerHTML = html;
}

// Add new passenger
function addPassenger() {
    const passenger = {
        pass_id: prompt('Enter Passenger ID'),
        first_name: prompt('Enter First Name'),
        last_name: prompt('Enter Last Name'),
        passport_no: prompt('Enter Passport Number'),
        email: prompt('Enter Email'),
        phone: prompt('Enter Phone Number')
    };
    fetch(`http://localhost:3000/api/passengers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passenger)
    })
    .then(response => response.json())
    .then(data => getData('passengers'))  // Refresh table after adding
    .catch(err => console.error('Error:', err));
}

// Update a passenger
function updatePassenger(pass_id) {
    const updatedData = {
        first_name: prompt('Update First Name'),
        last_name: prompt('Update Last Name'),
        passport_no: prompt('Update Passport Number'),
        email: prompt('Update Email'),
        phone: prompt('Update Phone Number')
    };
    fetch(`http://localhost:3000/api/passengers/${pass_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => getData('passengers'))  // Refresh table after updating
    .catch(err => console.error('Error:', err));
}

// Delete a passenger
function deletePassenger(pass_id) {
    fetch(`http://localhost:3000/api/passengers/${pass_id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => getData('passengers'))  // Refresh table after deleting
    .catch(err => console.error('Error:', err));
}
