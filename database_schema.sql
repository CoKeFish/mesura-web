-- Mesura IoT Database Schema
-- Database for storing biometric sensor data

-- Table for IoT sensor data
CREATE TABLE IF NOT EXISTS `DataIoT` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `GSR_Sensor` FLOAT NOT NULL COMMENT 'Galvanic Skin Response sensor reading',
  `Temp_Sensor` FLOAT NOT NULL COMMENT 'Temperature sensor reading',
  `DateRead` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp of sensor reading',
  INDEX `idx_date` (`DateRead`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Stores biometric sensor readings from IoT devices';

-- Table for user authentication
CREATE TABLE IF NOT EXISTS `info_login` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `user_password` VARCHAR(255) NOT NULL COMMENT 'WARNING: Store hashed passwords in production',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User authentication information';

-- Sample data for testing (optional)
-- INSERT INTO `DataIoT` (`GSR_Sensor`, `Temp_Sensor`, `DateRead`) VALUES
-- (523.5, 25.3, '2022-10-15 10:30:00'),
-- (487.2, 24.8, '2022-10-15 10:31:00'),
-- (501.8, 25.1, '2022-10-15 10:32:00'),
-- (495.4, 25.0, '2022-10-15 10:33:00'),
-- (510.6, 25.2, '2022-10-15 10:34:00');
