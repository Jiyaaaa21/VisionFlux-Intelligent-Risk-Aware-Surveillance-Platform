
# VisionFlux | Intelligent Risk-Aware Surveillance Platform  
### Frontend Dashboard

---

##  Overview

VisionFlux is an intelligent, risk-aware surveillance platform designed to provide real-time situational awareness for public safety and security operations.  
This repository contains the **frontend dashboard** of the VisionFlux system, which acts as a centralized command center for monitoring surveillance cameras, assessing risk levels, tracking alerts, and understanding system decisions through explainable intelligence.

The frontend is built as a **production-style, modular, and scalable dashboard**, architected to integrate seamlessly with real-time backend inference services and live camera feeds in subsequent phases.

---

##  Objectives

- Provide a centralized operational view for surveillance monitoring
- Visualize camera-level and area-level risk intelligence
- Enable explainability through an auditable event timeline
- Support alert escalation and system-level awareness
- Maintain a clean, extensible architecture for future real-time integration

---

##  Application Views

The frontend is structured into **four core operational views**, each serving a distinct purpose.

---

## 1 Camera Risk View

**Purpose:** Tactical, camera-level monitoring

### Key Features
- 3×3 dynamic camera grid layout
- Individual camera tiles displaying:
  - Risk score
  - Confidence level
  - Zone association
  - Status (Normal / Suspicious / High Risk)
- Automatic visual escalation of high-risk cameras
- Click-to-expand camera modal for deep inspection
- Integrated zone overview panel
- System health gauges
- Active alerts list
- Snapshot refresh cycle aligned with system timing

### Camera Modal Capabilities
- Enlarged camera feed
- Risk score and confidence metrics
- High-risk frame count
- Risk trend visualization (last 5 snapshots)
- Alert history for the selected camera
- Camera metadata and zone details
- Multiple close mechanisms (button, backdrop, ESC key)

---

## 2 Area Risk View

**Purpose:** Strategic, zone-level situational awareness

### Key Features
- Aggregated zone-level risk visualization
- Zone status indicators (Normal / Suspicious / High Risk)
- Risk persistence awareness across time
- System-wide KPIs
- Abstract zone representation (non-geographic by design)
- Cross-camera risk aggregation and fusion

---

## 3 Event Intelligence Timeline

**Purpose:** Explainability and audit trail

### Key Features
- Chronological feed of system decisions
- Logged events include:
  - Camera risk changes
  - Escalations and normalizations
  - Alert generation and resolution
  - Zone-level risk updates
  - System health status changes
- Human-readable explanations (no ML jargon)
- Filterable by:
  - Camera
  - Zone
  - Event type
- Searchable event descriptions
- Designed to answer:
  > “Why did the system act the way it did?”

---

## 4 System Health & Readiness View

**Purpose:** Operational reliability and system oversight

### Key Features
- System mode indicator (Simulation / Operational)
- Infrastructure health indicators
- Active alert count
- Camera availability status
- CPU, memory, and network usage indicators
- Dashboard-style layout aligned with real-world monitoring systems

---

##  Global Frontend Architecture

### State Management
- Centralized global state using **React Context + Reducer**
- Unified management of:
  - Cameras
  - Zones
  - Alerts
  - Event timeline
  - System health
  - UI state (modals, selections, highlights)

### Simulation Engine
- Controlled simulation lifecycle:
  - Start / Pause
  - Reset
  - Speed control
- Manual override actions for testing escalation logic
- Deterministic state-driven risk progression
- Timeline and alerts generated from system state changes

### Logging & Audit
- Structured system logs
- Downloadable CSV log export
- Event-driven logging for:
  - Risk changes
  - Alerts
  - Zone updates
  - System status changes

---

##  Project Structure

```text
src/
├── components/
│   ├── Page1_CameraRiskView/
│   ├── Page2_AreaRiskView/
│   ├── Page3_EventTimeline/
│   ├── Page4_SystemHealth/
│   └── shared/
├── context/
│   └── GlobalStateContext.jsx
├── hooks/
│   └── useSimulation.js
├── services/
│   └── loggerService.js
├── utils/
│   ├── constants.js
│   └── timelineHelpers.js
├── App.jsx
├── main.jsx
└── index.css


## 🛠️ Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (custom dark dashboard theme)
- **State Management:** React Context + Reducer
- **Icons:** Lucide React
- **Build Tooling:** Vite
- **Architecture:** Component-driven, backend-agnostic

---

## ▶ Running the Project Locally

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

```bash
git clone https://github.com/Jiyaaaa21/VisionFlux-Intelligent-Risk-Aware-Surveillance-Platform/tree/main

cd surveillance-dashboard
npm install

### ▶ Start Development Server

```bash
npm run dev

Open in Browser
http://localhost:3000

## Screenshots

### Camera Risk View
![Camera Risk View](src/assets/CameraRiskView.png)

### Area Risk View
![Area Risk View](src/assets/AreaRiskView.png)

### Event Timeline
![Event Timeline](src/assets/EventTimeline.png)

### System Health
![System Health](src/assets/SystemHealth.png)


🚀 Current Capabilities

- Fully functional, production-style frontend dashboard
- Risk-aware visualization beyond raw video feeds
- Explainable system decision tracking
- Modular and scalable UI architecture
- Ready for real-time backend and camera integration

 Future Enhancements (Phase 2+)

- Backend Integration
- Real-time inference services
- Live camera feeds (RTSP / IP streams)
- Risk abstraction from model probabilities
- Scalable alerting pipeline
- Edge and cloud deployment support

Frontend Enhancements

- Live risk updates via WebSockets
- Incident export and reporting
- Role-based access control (RBAC)
- Operator acknowledgement workflows

⚠️ Disclaimer

VisionFlux is a research and demonstration prototype developed for academic and evaluative purposes.
It does not perform automated enforcement or real-world surveillance actions.

👥 Team – Frontend

Frontend design and implementation by the VisionFlux frontend team, focusing on:

- Risk visualization
- Explainability
- System usability
- Operational awareness