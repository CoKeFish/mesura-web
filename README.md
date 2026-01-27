# Mesura Web - IoT Biometric Sensors Dashboard

Web application for real-time visualization and monitoring of biometric sensor data from the Mesura IoT project. This dashboard displays data collected from GSR (Galvanic Skin Response) and temperature sensors using interactive charts.

This repository contains the **web application** component of the Mesura system. The sensor hardware and firmware can be found in the [Mesura Firmware](https://github.com/CoKeFish/mesura-firmware) repository.

## Project Architecture

Mesura consists of two main components working together:

1. **[Mesura Firmware](https://github.com/CoKeFish/mesura-firmware)** - Hardware implementations for Arduino, ESP32, and Raspberry Pi that collect biometric sensor data
2. **Mesura Web** (this repository) - PHP/MySQL web application that receives, stores, and visualizes the sensor data in real-time

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
┌─────────────────┐
│ Web Dashboard   │
│ (Chart.js)      │
└─────────────────┘
```

## Technologies Used

- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+ / MariaDB
- **Frontend**: 
  - Bootstrap 5.2.1 (UI framework)
  - Chart.js 3.9.1 (data visualization)
  - Vanilla JavaScript (AJAX data fetching)
- **Deployment**: Compatible with cPanel/Hostinger hosting

## Database Structure

### DataIoT Table
Stores sensor readings from IoT devices:

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key, auto-increment |
| GSR_Sensor | FLOAT | Galvanic Skin Response reading |
| Temp_Sensor | FLOAT | Temperature sensor reading (°C) |
| DateRead | DATETIME | Timestamp of the reading |

### info_login Table
User authentication information:

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key, auto-increment |
| username | VARCHAR(255) | User's username |
| user_password | VARCHAR(255) | User's password |
| created_at | DATETIME | Account creation timestamp |

## Features

- Real-time data visualization with interactive line charts
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

### 1. Clone the Repository

```bash
git clone https://github.com/CoKeFish/mesura-web.git
cd mesura-web
```

### 2. Configure Database Connection

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

### 3. Create Database and Import Schema

Create a new MySQL database and import the schema:

```bash
mysql -u your_username -p your_database_name < database_schema.sql
```

Or using phpMyAdmin:
1. Create a new database
2. Import `database_schema.sql` file

### 4. Set Environment Variables

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

### 5. Upload to Server

If deploying to a hosting service (Hostinger, cPanel, etc.):

1. Upload all files to your `public_html` directory
2. Set environment variables through your hosting control panel
3. Ensure proper file permissions (644 for files, 755 for directories)

### 6. Access the Application

Open your browser and navigate to:
- Local: `http://localhost:8000`
- Production: `https://yourdomain.com`

## Project Structure

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

## API Endpoints

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

## Security Considerations

- Database credentials are stored in environment variables, not in code
- The `.env` file is excluded from version control via `.gitignore`
- ⚠️ **Important**: The current authentication system stores passwords in plain text. For production use, implement password hashing (bcrypt/Argon2)
- ⚠️ **Important**: SQL queries should use prepared statements to prevent SQL injection

## Development

### Local Setup with XAMPP/WAMP

1. Install XAMPP or WAMP
2. Copy project to `htdocs/` or `www/` directory
3. Configure environment variables
4. Access via `http://localhost/mesura-web/public_html/`

### Connecting IoT Devices

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

## Related Projects

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
