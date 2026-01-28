/*
Mesura IoT Dashboard - Demo Version
Loads simulated sensor data from data.json
*/
(async () => {
    try {
        // Fetch data from local JSON file instead of PHP API
        const respuestaRaw = await fetch("data.json");
        const respuesta = await respuestaRaw.json();
        
        // Calculate statistics
        const avgGSR = (respuesta.GSR_Sensor.reduce((a, b) => a + b, 0) / respuesta.GSR_Sensor.length).toFixed(2);
        const avgTemp = (respuesta.Temp_Sensor.reduce((a, b) => a + b, 0) / respuesta.Temp_Sensor.length).toFixed(2);
        const totalReadings = respuesta.GSR_Sensor.length;
        
        // Update statistics cards
        document.getElementById('avg-gsr').textContent = avgGSR;
        document.getElementById('avg-temp').textContent = avgTemp + ' °C';
        document.getElementById('total-readings').textContent = totalReadings;
        
        // Populate data table
        const tableBody = document.getElementById('data-table');
        tableBody.innerHTML = ''; // Clear loading message
        
        // Show last 10 readings in reverse order (most recent first)
        const startIndex = Math.max(0, respuesta.GSR_Sensor.length - 10);
        for (let i = respuesta.GSR_Sensor.length - 1; i >= startIndex; i--) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${respuesta.GSR_Sensor[i].toFixed(2)}</td>
                <td>${respuesta.Temp_Sensor[i].toFixed(2)}</td>
                <td>${respuesta.DateRead[i]}</td>
            `;
            tableBody.appendChild(row);
        }
        
        // Create chart
        const $grafica = document.querySelector("#grafica");
        const etiquetas = respuesta.DateRead.map(date => {
            // Format date to show only time
            const d = new Date(date);
            return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        });
        
        // GSR Sensor dataset
        const GSR_Data = {
            label: "GSR Sensor",
            data: respuesta.GSR_Sensor,
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2,
            tension: 0.4, // Smooth line
            fill: true
        };
        
        // Temperature Sensor dataset
        const Temp_Data = {
            label: "Temperature Sensor (°C)",
            data: respuesta.Temp_Sensor,
            backgroundColor: 'rgba(118, 75, 162, 0.2)',
            borderColor: 'rgba(118, 75, 162, 1)',
            borderWidth: 2,
            tension: 0.4, // Smooth line
            fill: true
        };
        
        new Chart($grafica, {
            type: 'line',
            data: {
                labels: etiquetas,
                datasets: [GSR_Data, Temp_Data]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Biometric Sensor Readings Over Time (Demo Data)'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Sensor Value'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
        
        // Add simulated "live update" effect
        addLiveUpdateSimulation();
        
    } catch (error) {
        console.error('Error loading sensor data:', error);
        document.getElementById('data-table').innerHTML = 
            '<tr><td colspan="3" class="text-center text-danger">Error loading data. Please refresh the page.</td></tr>';
    }
})();

// Simulate live data updates (visual effect only)
function addLiveUpdateSimulation() {
    const indicators = document.querySelectorAll('.stats-value');
    
    setInterval(() => {
        indicators.forEach(indicator => {
            indicator.style.transition = 'transform 0.3s';
            indicator.style.transform = 'scale(1.05)';
            setTimeout(() => {
                indicator.style.transform = 'scale(1)';
            }, 300);
        });
    }, 5000); // Update animation every 5 seconds
}
