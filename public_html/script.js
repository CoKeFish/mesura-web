/*
Mesura IoT Dashboard - Demo Version
Generates random simulated sensor data in real-time
*/

// Global variables for data and chart
let sensorData = {
    GSR_Sensor: [],
    Temp_Sensor: [],
    DateRead: []
};
let myChart = null;
const MAX_DATA_POINTS = 20;

// Generate random sensor readings
function generateRandomGSR() {
    // GSR values typically range from 480 to 530
    return (Math.random() * (530 - 480) + 480).toFixed(2);
}

function generateRandomTemp() {
    // Temperature values typically range from 24.5 to 25.8 °C
    return (Math.random() * (25.8 - 24.5) + 24.5).toFixed(2);
}

function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    });
}

function getTimeLabel(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
}

// Initialize with some data points
function initializeData() {
    const now = new Date();
    for (let i = MAX_DATA_POINTS; i > 0; i--) {
        const timestamp = new Date(now.getTime() - i * 2000); // 2 seconds apart
        sensorData.GSR_Sensor.push(parseFloat(generateRandomGSR()));
        sensorData.Temp_Sensor.push(parseFloat(generateRandomTemp()));
        sensorData.DateRead.push(timestamp);
    }
}

// Add new data point
function addNewDataPoint() {
    const newGSR = parseFloat(generateRandomGSR());
    const newTemp = parseFloat(generateRandomTemp());
    const newTime = new Date();
    
    // Add new data
    sensorData.GSR_Sensor.push(newGSR);
    sensorData.Temp_Sensor.push(newTemp);
    sensorData.DateRead.push(newTime);
    
    // Remove oldest data if exceeding max points
    if (sensorData.GSR_Sensor.length > MAX_DATA_POINTS) {
        sensorData.GSR_Sensor.shift();
        sensorData.Temp_Sensor.shift();
        sensorData.DateRead.shift();
    }
    
    return { newGSR, newTemp, newTime };
}

// Get music recommendation based on biometric data
function getMusicRecommendation(gsr, temp) {
    let genre = "";
    let reason = "";
    let icon = "🎵";
    let track = "";
    let artist = "";
    let emotionalState = "";
    
    // Analyze GSR and Temperature to recommend music
    if (gsr > 510) {
        // High stress/arousal
        emotionalState = "Stressed";
        if (temp > 25.5) {
            genre = "Energetic Rock";
            reason = "High energy detected. Time to rock out!";
            icon = "🎸";
            track = "Thunder";
            artist = "Imagine Dragons";
        } else {
            genre = "Ambient / Relaxation";
            reason = "High stress detected. Let's calm down with soothing music.";
            icon = "🧘";
            track = "Weightless";
            artist = "Marconi Union";
        }
    } else if (gsr > 490) {
        // Normal state
        emotionalState = "Balanced";
        if (temp > 25.3) {
            genre = "Pop / Indie";
            reason = "You're in a good mood! Enjoy some upbeat tunes.";
            icon = "🎤";
            track = "Feel Good Inc.";
            artist = "Gorillaz";
        } else {
            genre = "Acoustic / Folk";
            reason = "Balanced state perfect for melodic acoustic music.";
            icon = "🎻";
            track = "Holocene";
            artist = "Bon Iver";
        }
    } else {
        // Relaxed/calm state
        emotionalState = "Calm";
        if (temp < 24.8) {
            genre = "Classical / Jazz";
            reason = "Very relaxed state. Perfect for classical melodies.";
            icon = "🎹";
            track = "Clair de Lune";
            artist = "Claude Debussy";
        } else {
            genre = "Lo-fi / Study";
            reason = "Calm and focused. Great for productivity music.";
            icon = "📚";
            track = "Lofi Hip Hop Radio";
            artist = "ChilledCow";
        }
    }
    
    return { genre, reason, icon, track, artist, emotionalState };
}

// Update statistics cards
function updateStatistics() {
    // Get current (latest) values instead of average
    const currentGSR = sensorData.GSR_Sensor[sensorData.GSR_Sensor.length - 1].toFixed(2);
    const currentTemp = sensorData.Temp_Sensor[sensorData.Temp_Sensor.length - 1].toFixed(2);
    const totalReadings = sensorData.GSR_Sensor.length;
    
    document.getElementById('avg-gsr').textContent = currentGSR;
    document.getElementById('avg-temp').textContent = currentTemp + ' °C';
    document.getElementById('total-readings').textContent = totalReadings;
    
    // Get music recommendation based on current values
    const recommendation = getMusicRecommendation(parseFloat(currentGSR), parseFloat(currentTemp));
    
    // Update emotional state
    document.getElementById('emotional-state').textContent = recommendation.emotionalState;
    
    // Update music recommendation
    document.getElementById('recommended-genre').textContent = recommendation.genre;
    document.getElementById('recommendation-reason').textContent = recommendation.reason;
    document.getElementById('genre-icon').textContent = recommendation.icon;
    document.getElementById('current-track').textContent = recommendation.track;
    document.getElementById('current-artist').textContent = recommendation.artist;
    
    // Pulse animation
    const indicators = document.querySelectorAll('.stats-value');
    indicators.forEach(indicator => {
        indicator.style.transition = 'transform 0.2s';
        indicator.style.transform = 'scale(1.05)';
        setTimeout(() => {
            indicator.style.transform = 'scale(1)';
        }, 200);
    });
}

// Update data table
function updateTable() {
    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML = ''; // Clear table
    
    // Show last 10 readings in reverse order (most recent first)
    const startIndex = Math.max(0, sensorData.GSR_Sensor.length - 10);
    for (let i = sensorData.GSR_Sensor.length - 1; i >= startIndex; i--) {
        const row = document.createElement('tr');
        const timestamp = sensorData.DateRead[i] instanceof Date 
            ? sensorData.DateRead[i].toLocaleString('en-US')
            : sensorData.DateRead[i];
            
        row.innerHTML = `
            <td>${sensorData.GSR_Sensor[i].toFixed(2)}</td>
            <td>${sensorData.Temp_Sensor[i].toFixed(2)}</td>
            <td>${timestamp}</td>
        `;
        
        // Highlight newest row
        if (i === sensorData.GSR_Sensor.length - 1) {
            row.classList.add('table-info');
            setTimeout(() => {
                row.classList.remove('table-info');
            }, 2000);
        }
        
        tableBody.appendChild(row);
    }
}

// Update chart
function updateChart() {
    if (!myChart) return;
    
    const labels = sensorData.DateRead.map(date => getTimeLabel(date));
    
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = sensorData.GSR_Sensor;
    myChart.data.datasets[1].data = sensorData.Temp_Sensor;
    myChart.update('none'); // Update without animation for smooth real-time effect
}

// Initialize chart
function initializeChart() {
    const $grafica = document.querySelector("#grafica");
    const labels = sensorData.DateRead.map(date => getTimeLabel(date));
    
    // GSR Sensor dataset
    const GSR_Data = {
        label: "GSR Sensor",
        data: sensorData.GSR_Sensor,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
    };
    
    // Temperature Sensor dataset
    const Temp_Data = {
        label: "Temperature Sensor (°C)",
        data: sensorData.Temp_Sensor,
        backgroundColor: 'rgba(118, 75, 162, 0.2)',
        borderColor: 'rgba(118, 75, 162, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
    };
    
    myChart = new Chart($grafica, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [GSR_Data, Temp_Data]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 0 // Disable animations for smoother real-time updates
            },
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
                    text: 'Biometric Sensor Readings Over Time (Live Demo - Random Data)'
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
}

// Main update loop
function updateAllData() {
    addNewDataPoint();
    updateStatistics();
    updateTable();
    updateChart();
}

// Initialize everything on page load
(function() {
    try {
        // Initialize with random data
        initializeData();
        
        // Update initial display
        updateStatistics();
        updateTable();
        initializeChart();
        
        // Start real-time updates every 3 seconds
        setInterval(updateAllData, 3000);
        
        console.log('✅ Mesura Dashboard initialized with live random data generation');
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        document.getElementById('data-table').innerHTML = 
            '<tr><td colspan="3" class="text-center text-danger">Error initializing dashboard. Please refresh the page.</td></tr>';
    }
})();
