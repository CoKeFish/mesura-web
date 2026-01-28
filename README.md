# Mesura Web - Biometric music recommendation system

Web application for real-time visualization and music recommendation based on biometric sensor data from the Mesura IoT project. The system analyzes GSR (Galvanic Skin Response) and temperature readings to recommend music genres that match the user's emotional state.

This repository contains the **web application** component of the Mesura system. The sensor hardware and firmware can be found in the [Mesura Firmware](https://github.com/CoKeFish/mesura-firmware) repository.

## Project architecture

Mesura consists of two main components working together:

1. **[Mesura Firmware](https://github.com/CoKeFish/mesura-firmware)** - Hardware implementations for Arduino, ESP32, and Raspberry Pi that collect biometric sensor data
2. **Mesura Web** (this repository) - PHP/MySQL web application that receives, stores, visualizes sensor data, and recommends music based on biometric readings

```
┌─────────────────┐
│ IoT Sensors     │
│ (GSR + Temp)    │
└────────┬────────┘
         │
         │ Send Data
         ▼
┌─────────────────┐
│ MySQL Database  │
│ (DataIoT table) │
└────────┬────────┘
         │
         │ Query Data
         ▼
┌─────────────────┐
│ PHP Backend     │
│ (json_enco.php) │
└────────┬────────┘
         │
         │ JSON API
         ▼
┌─────────────────┐     ┌──────────────────┐
│ Web Dashboard   │────▶│ Music            │
│ (Chart.js)      │     │ Recommendation   │
│                 │◀────│ System           │
└─────────────────┘     └──────────────────┘
    Visualizes              Suggests genre
    sensor data            based on biometrics
```

## Music recommendation system

Mesura uses biometric data to recommend music genres that match the user's current emotional and physical state:

### How it works

**GSR (Galvanic Skin Response) analysis:**
- **High values (>510)**: Indicates stress, anxiety, or excitement → Recommends **relaxing/ambient music**
- **Medium values (490-510)**: Normal state → Recommends **pop/indie music**
- **Low values (<490)**: Calm, relaxed state → Recommends **classical/jazz music**

**Temperature analysis:**
- **High temperature (>25.5°C)**: Physical activation → Recommends **energetic music** (rock, electronic)
- **Normal temperature (24.5-25.5°C)**: Balanced state → Recommends **balanced genres** (pop, indie)
- **Low temperature (<24.5°C)**: Relaxed state → Recommends **calm music** (ambient, acoustic)

The system combines both readings to provide more accurate recommendations:
- **High GSR + High temp** → Energetic/upbeat music to match the active state
- **High GSR + Low temp** → Calming music to reduce stress
- **Low GSR + Normal temp** → Background music for focus and productivity

### Music genres supported

- Ambient / Relaxation
- Classical / Jazz
- Pop / Indie
- Rock / Electronic
- Acoustic / Folk
- Focus / Study music

*Note: The basic implementation suggests music genres based on sensor thresholds. Full integration with music streaming APIs (Spotify, YouTube) can be added as an enhancement.*

## Technologies used

- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+ / MariaDB
- **Frontend**: 
  - Bootstrap 5.2.1 (UI framework)
  - Chart.js 3.9.1 (data visualization)
  - Vanilla JavaScript (AJAX data fetching)
- **Deployment**: Compatible with cPanel/Hostinger hosting

## Database structure

### DataIoT table
Stores sensor readings from IoT devices:

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key, auto-increment |
| GSR_Sensor | FLOAT | Galvanic Skin Response reading |
| Temp_Sensor | FLOAT | Temperature sensor reading (°C) |
| DateRead | DATETIME | Timestamp of the reading |

### info_login table
User authentication information:

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key, auto-increment |
| username | VARCHAR(255) | User's username |
| user_password | VARCHAR(255) | User's password |
| created_at | DATETIME | Account creation timestamp |

## Features

- Real-time biometric data visualization with interactive line charts
- Music genre recommendation based on GSR and temperature readings
- Historical data table view
- User authentication system (login/registration)
- Responsive design with Bootstrap
- AJAX-based data updates
- RESTful JSON API for sensor data

## Requirements

- PHP 7.4 or higher
- MySQL 5.7+ or MariaDB 10.3+
- Web server (Apache/Nginx)
- PHP extensions:
  - mysqli
  - json
  - session

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/CoKeFish/mesura-web.git
cd mesura-web
```

### 2. Configure database connection

Copy the environment template and configure your database credentials:

```bash
cp .env.example .env
```

Edit `.env` with your database information:

```env
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

### 3. Create database and import schema

Create a new MySQL database and import the schema:

```bash
mysql -u your_username -p your_database_name < database_schema.sql
```

Or using phpMyAdmin:
1. Create a new database
2. Import `database_schema.sql` file

### 4. Set environment variables

If your hosting environment doesn't support .env files natively, you'll need to set environment variables through your hosting control panel (cPanel, Plesk, etc.) or configure them in your server's configuration.

For **local development** with Apache, you can use `.htaccess`:

```apache
SetEnv DB_HOST "localhost"
SetEnv DB_USER "your_username"
SetEnv DB_PASSWORD "your_password"
SetEnv DB_NAME "your_database"
```

For **local development** with PHP built-in server:

```bash
export DB_HOST="localhost"
export DB_USER="your_username"
export DB_PASSWORD="your_password"
export DB_NAME="your_database"
php -S localhost:8000 -t public_html
```

### 5. Upload to server

If deploying to a hosting service (Hostinger, cPanel, etc.):

1. Upload all files to your `public_html` directory
2. Set environment variables through your hosting control panel
3. Ensure proper file permissions (644 for files, 755 for directories)

### 6. Access the application

Open your browser and navigate to:
- Local: `http://localhost:8000`
- Production: `https://yourdomain.com`

## Project structure

```
mesura-web/
├── .gitignore                  # Files to ignore in git
├── .env.example               # Environment variables template
├── README.md                  # This file
├── database_schema.sql        # Database structure
├── .gitattributes            # Git attributes
├── .vscode/
│   └── sftp.json             # SFTP deployment config (gitignored)
└── public_html/
    ├── db.php                # Database connection handler
    ├── index.php             # Main dashboard page
    ├── json_enco.php         # JSON API endpoint for sensor data
    ├── script.js             # Chart.js visualization logic
    ├── signIn.php            # Login page
    ├── signUp.php            # Registration page
    ├── signup_r.php          # Registration processing
    ├── testJson.php          # API testing endpoint
    └── includes/
        ├── header.php        # Common header template
        └── footer.php        # Common footer template
```

## API endpoints

### GET /json_enco.php

Returns sensor data in JSON format for visualization.

**Response:**
```json
{
  "GSR_Sensor": [523.5, 487.2, 501.8, 495.4, 510.6],
  "Temp_Sensor": [25.3, 24.8, 25.1, 25.0, 25.2],
  "DateRead": ["2022-10-15 10:30:00", "2022-10-15 10:31:00", ...]
}
```

## Security considerations

- Database credentials are stored in environment variables, not in code
- The `.env` file is excluded from version control via `.gitignore`
- ⚠️ **Important**: The current authentication system stores passwords in plain text. For production use, implement password hashing (bcrypt/Argon2)
- ⚠️ **Important**: SQL queries should use prepared statements to prevent SQL injection

## Development

### Local setup with XAMPP/WAMP

1. Install XAMPP or WAMP
2. Copy project to `htdocs/` or `www/` directory
3. Configure environment variables
4. Access via `http://localhost/mesura-web/public_html/`

### Connecting IoT devices

To send data from your IoT sensors to this dashboard:

1. Configure your sensors to send HTTP POST requests to your server
2. Target endpoint: `http://yourdomain.com/api_endpoint.php` (create as needed)
3. Send JSON data with GSR_Sensor, Temp_Sensor, and timestamp

Example POST request:
```json
{
  "GSR_Sensor": 523.5,
  "Temp_Sensor": 25.3
}
```

## Related projects

- [Mesura Firmware](https://github.com/CoKeFish/mesura-firmware) - IoT sensor implementations for Arduino, ESP32, and Raspberry Pi

## Author

**Rodion Romanovich Tabares Correa**

IoT Class Project - 2022

## License

This project was developed as part of an IoT course.

## Acknowledgments

- [Chart.js](https://www.chartjs.org/) for data visualization
- [Bootstrap](https://getbootstrap.com/) for UI framework
- PulseSensor.com for sensor references
- Biometric research on stress detection and emotional states
