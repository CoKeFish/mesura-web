# Mesura Web - Demo Version 🎮

**Static demonstration version** of the Mesura IoT Biometric Sensors Dashboard with simulated data for portfolio presentation.

> 🔴 **This is the DEMO branch** - For the full PHP/MySQL implementation, see the [`main` branch](https://github.com/CoKeFish/mesura-web/tree/main)

## Overview

This demo version showcases the Mesura IoT dashboard functionality using simulated sensor data. It's built as a static web application that can be deployed to platforms like Vercel, Netlify, or GitHub Pages without requiring a backend server.

## Live Demo

[View Live Demo](https://your-demo-url.vercel.app) *(Deploy to get URL)*

## What's Different in the Demo?

| Feature | Main Branch | Demo Branch |
|---------|-------------|-------------|
| Backend | PHP + MySQL | Static HTML/JS |
| Data Source | Real database | Simulated JSON |
| Authentication | Full login system | Removed |
| Deployment | Hostinger/cPanel | Vercel/Netlify |
| Real-time Updates | Yes (from sensors) | Simulated animation |

## Features

- ✨ Interactive data visualization with Chart.js
- 📊 Real-time sensor data display (simulated)
- 📈 Statistics dashboard
- 📱 Responsive design with Bootstrap 5
- 🎨 Modern UI with gradient accents
- 🚀 Fast static site (no server required)

## Project Architecture

```
Sensor Hardware → [DEMO: Simulated Data]
      ↓
  data.json ← Static JSON file
      ↓
  script.js ← Fetches and visualizes
      ↓
  Chart.js → Beautiful charts
```

## Quick Start

### Option 1: Deploy to Vercel (Recommended)

1. Fork this repository
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy settings:
   - **Framework Preset**: Other
   - **Root Directory**: `public_html`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Click "Deploy"

### Option 2: Deploy to Netlify

1. Fork this repository
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Deploy settings:
   - **Base directory**: `public_html`
   - **Build command**: (leave empty)
   - **Publish directory**: `public_html`
5. Click "Deploy site"

### Option 3: Run Locally

```bash
# Clone the repository
git clone https://github.com/CoKeFish/mesura-web.git
cd mesura-web

# Switch to demo branch
git checkout demo

# Serve the public_html directory
cd public_html
python -m http.server 8000
# or
npx serve
```

Open http://localhost:8000 in your browser.

## File Structure

```
mesura-web/
├── README.md                    # This file (demo instructions)
├── .gitignore
├── .env.example                # Not used in demo
├── database_schema.sql         # Not used in demo
└── public_html/
    ├── index.html              # Main dashboard (static HTML)
    ├── data.json               # Simulated sensor data
    ├── script.js               # Chart visualization logic
    └── [PHP files]             # Kept for reference but not used
```

## Technologies Used

- **HTML5** - Structure
- **CSS3** + **Bootstrap 5.2.1** - Styling
- **JavaScript (ES6+)** - Logic and data handling
- **Chart.js 3.9.1** - Data visualization
- **JSON** - Data storage

## Simulated Data

The demo uses realistic biometric sensor data stored in [`data.json`](public_html/data.json):

- **GSR Sensor**: 20 readings between 480-525
- **Temperature**: 20 readings between 24.7-25.6°C
- **Timestamps**: Sequential readings from 10:30-10:49

Data was generated to match typical patterns from real GSR and temperature sensors used in the IoT project.

## Related Projects

- **[Mesura Firmware](https://github.com/CoKeFish/mesura-firmware)** - IoT sensor implementations for Arduino, ESP32, and Raspberry Pi
- **[Mesura Web (Main)](https://github.com/CoKeFish/mesura-web/tree/main)** - Full PHP/MySQL implementation

## Real Implementation

Want to see the real system with actual hardware?

1. Check the [`main` branch](https://github.com/CoKeFish/mesura-web/tree/main) for the full PHP/MySQL code
2. View [Mesura Firmware](https://github.com/CoKeFish/mesura-firmware) for sensor implementations
3. Read the [full documentation](https://github.com/CoKeFish/mesura-web/blob/main/README.md)

## Deployment Configuration

### Vercel Configuration

Create `vercel.json` in root (optional):

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/(.*)", "destination": "/public_html/$1" }
  ]
}
```

### Custom Domain

After deploying, you can add a custom domain through your hosting platform's dashboard.

## Screenshots

*Dashboard showing simulated sensor data*

![Dashboard](https://via.placeholder.com/800x400?text=Mesura+Dashboard+Demo)

## Performance

- ⚡ Lighthouse Score: 95+
- 📦 Total Size: < 500KB
- 🚀 Load Time: < 1s

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Author

**Rodion Romanovich Tabares Correa**

IoT Class Project - 2022

## License

This project was developed as part of an IoT course.

---

**Note**: This is a demonstration version. For production deployment with real sensors, use the `main` branch with proper database setup.
