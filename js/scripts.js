// Update the year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Add mouseover feedback to navigation links
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
        link.style.backgroundColor = "#16a085"; // Highlight on hover
        link.style.color = "white"; // Change text color on hover
    });
    link.addEventListener("mouseout", () => {
        if (!link.classList.contains("active")) {
            link.style.backgroundColor = "transparent"; // Reset background
            link.style.color = "black"; // Reset text color
        }
    });
});

// Function to fetch and display CSV data
function fetchAndDisplayCSV() {
    fetch('data/tvBrandCount.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const table = document.createElement('table');
            rows.forEach((row, index) => {
                const cells = row.split(',');
                const tr = document.createElement('tr');
                cells.forEach(cell => {
                    const td = document.createElement(index === 0 ? 'th' : 'td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            document.getElementById('csv-table-container').appendChild(table);
        })
        .catch(error => console.error('Error fetching CSV data:', error));
}

fetchAndDisplayCSV();

function calculateEnergy() {
    const wattage = parseFloat(document.getElementById("wattage").value);
    const hours = parseFloat(document.getElementById("hours").value);
    const rate = parseFloat(document.getElementById("rate").value);

    // Validate inputs
    if (isNaN(wattage) || wattage <= 0) {
        document.getElementById("calculator-result").textContent = "Please enter a valid positive number for TV Wattage.";
        return;
    }
    if (isNaN(hours) || hours <= 0 || hours > 24) {
        document.getElementById("calculator-result").textContent = "Please enter a valid number of hours (1-24).";
        return;
    }
    if (isNaN(rate) || rate <= 0) {
        document.getElementById("calculator-result").textContent = "Please enter a valid positive number for Electricity Rate.";
        return;
    }

    // Calculate energy consumption and cost 
    const dailyConsumption = (wattage * hours) / 1000; // kWh/day
    const annualCost = dailyConsumption * 365 * rate; // $/year

    // Display the result
    document.getElementById("calculator-result").textContent = 
        `Estimated Annual Cost: $${annualCost.toFixed(2)}`;
}