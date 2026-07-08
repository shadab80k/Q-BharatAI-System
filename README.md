# Q-BharatAI-System 🏥🇮🇳

An AI-powered, unified healthcare management and optimization platform designed to modernize Primary Health Centers (PHCs) and streamline district-level public health coordination in India.

`Q-BharatAI-System` bridges the gap between rural patients, clinical staff, and district administrators by leveraging real-time queues, predictive AI analytics, and multi-lingual accessibility tools.

---

## 🌟 Key Portals & Features

### 👤 1. Patient Portal (Multi-lingual & Accessible)
Empowers patients with easy navigation, reduced wait times, and direct access to healthcare services:
* **Live Queue Tracking:** View real-time patient queues and expected wait times before visiting the PHC.
* **Multilingual Voice Assistant:** Command-based navigation and assistance tailored for diverse Indian language accessibility.
* **Smart Appointment Booking:** Book appointments with automatic confirmations and schedule management.
* **Symptom Checker & Triage:** Describe symptoms in simple language and receive preliminary guidance.
* **Medicine & Doctor Availability:** Live tracking of essential drug stocks and doctor duty rosters.

### 🩺 2. Clinical & Staff Portal
Provides doctors, nurses, and administrative staff with tools to deliver efficient, organized care:
* **Dynamic Queue Management:** Seamlessly call, defer, or complete patient consultations.
* **Emergency Triage Queue:** Instantly flag and prioritize critical emergency patients.
* **Real-time Bed Status:** Dynamic tracking of ward bed occupancy and availability.
* **Inventory & Pharmacy Alerts:** Automated alerts for low stock and near-expiry medications.
* **Integrated Lab & Diagnostics:** Review lab orders, submit test results, and generate patient reports.

### 📊 3. District Administration Portal
Enables district health officers to monitor, manage, and optimize public health resources:
* **PHC Performance Scorecard:** Compare and analyze performance metrics across multiple PHCs.
* **Resource Optimization:** Real-time data on staffing shortages, inventory distribution, and bed occupancy.
* **Analytical Dashboards:** Interactive visualization of patient inflows, disease frequencies, and operational efficiency.
* **Dynamic PDF Reports:** Generate compliance-ready administrative and health reports.

### 🤖 4. AI Intelligence Suite
Leverages machine learning models and predictive analytics to prevent outbreaks and guide policy:
* **Outbreak Early-Warning System:** Real-time prediction and visualization of potential infectious disease outbreaks.
* **AI Clinical Briefing:** Automated, context-aware daily briefings summarizing key statistics for administrative teams.
* **Predictive Patient Inflow Forecasting:** AI forecasts of weekly patient volume to optimize staffing.
* **AI Symptom Triage:** Natural language symptom parsing for preliminary patient categorization.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 19 (TypeScript)
* **Build Tool:** Vite 7
* **Styling & UI Components:** Tailwind CSS v3.4, shadcn/ui, Framer Motion (for smooth micro-animations), Lucide Icons
* **Data Fetching & State:** TanStack React Query v5, React Context API, React Router v7
* **Data Visualization:** Recharts (Interactive charts and outbreak maps)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v20+ or v22+) installed on your machine.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shadab80k/Q-BharatAI-System.git
   cd Q-BharatAI-System
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The server will start running locally at [http://localhost:3000](http://localhost:3000).*

4. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📂 Folder Structure

```text
src/
├── components/       # Reusable UI components & layouts (shadcn/ui, AppLayout)
├── context/          # Global React Contexts (Auth, Theme, Notifications)
├── data/             # Static mock data & constants (PHC data, medicine list)
├── hooks/            # Custom React hooks (useAuth, useLocalStorage)
├── lib/              # Utility configurations (Tailwind-merge, classnames helper)
├── pages/            # Core views categorized by portals:
│   ├── ai/           # AI Insights, Outbreak Warning, Forecasts
│   ├── district/     # District Analytics, PHC Performance, Reports
│   ├── patient/      # Live Queue, Bookings, Symptom Checker, Voice Assistant
│   └── staff/        # Staff Dashboard, Emergency Queue, Inventory, Beds
├── types/            # TypeScript Interface and Type declarations
├── App.css           # Global app layout styles
├── App.tsx           # Route definitions and Core wrapper
├── main.tsx          # App entry point
└── index.css         # Tailwind & global theme variables
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
