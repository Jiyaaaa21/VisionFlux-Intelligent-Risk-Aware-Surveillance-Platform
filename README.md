# VisionFlux | Intelligent Risk-Aware Surveillance Platform

##  Problem Statement
Modern surveillance systems primarily rely on passive video feeds, placing a heavy cognitive burden on human operators. Critical threats such as violence, weapons, or abnormal behavior may go unnoticed due to information overload, delayed interpretation, or lack of contextual intelligence. Existing systems lack real-time risk abstraction, explainability, and structured decision tracking, making incident response reactive rather than proactive.

---

##  Proposed Solution
VisionFlux is an intelligent, risk-aware surveillance platform that transforms raw camera feeds into actionable intelligence. Instead of showing only video streams, the system computes dynamic risk scores, detects anomalous activities, generates alerts, and provides explainable decision timelines. The platform is designed to enhance operator awareness, support faster responses, and ensure transparency in automated decisions.

---

##  System Overview
The platform consists of:
- AI-driven video inference for activity and threat detection
- Risk aggregation at camera and zone levels
- Alert generation with confidence metrics
- Explainable event timelines
- A modular, production-grade frontend dashboard

---

## 🏗️ Architecture & Data Flow Diagrams

### Overall System Architecture
![System Architecture](System-DFDs/SystemArchitectureDiagram.png)

### Frontend Architecture
![Frontend Architecture](System-DFDs/FrontendArchitectureDiagram.png)

### System Context Diagram
![System Context DFD](System-DFDs/DFD-SystemContext.png)

### Core System Breakdown
![Core System DFD](System-DFDs/DFD-CoreSystemBreakDown.png)

### Risk & Alert Processing Flow
![Risk and Alert Logic](System-DFDs/DFD-RiskandAlertLogic.png)

### Alerting Architecture
![Alert Architecture](System-DFDs/Alert_Architecture.png)

### Deployment Architecture
![Deployment Architecture](System-DFDs/Deployment_Architecture.png)

---

##  Flowcharts
The system follows structured operational flows:
- Video ingestion → Model inference → Risk scoring
- Risk escalation → Alert generation → Operator notification
- Alert resolution → Risk normalization → Timeline logging

These flows ensure traceability, accountability, and explainability across the system lifecycle.

---

##  Demo Video
▶ **Demo & Prototype Walkthrough:**  
[VisionFlux Dashboard Demonstration](Prototype_Demonstration/VisionFlux-Dashboard.mp4)

---

##  Prototype
The project includes:
- A fully functional frontend dashboard
- Simulated real-time risk updates
- Interactive camera tiles, alerts, timelines, and system health views
- Logged CSV outputs for auditability

The prototype demonstrates realistic operational behavior suitable for real-world integration.

---

##  Research Work
The system design is informed by research in:
- Intelligent video surveillance
- Activity recognition and anomaly detection
- Explainable AI (XAI)
- Risk-based decision systems
- Human-in-the-loop monitoring

The backend experimentation includes model-based weapon detection and activity inference using deep learning.

---

##  References
1. OpenCV – Computer Vision Library  
2. PyTorch – Deep Learning Framework  
3. Research papers on anomaly detection in surveillance systems  
4. Explainable AI methodologies for safety-critical systems  
5. Industry best practices in security monitoring dashboards

---

##  Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS (custom dark dashboard theme)
- React Context + Reducer
- Lucide React icons
- Component-driven architecture

## Frontend Dashboard 

![Camera Risk View](surveillance-dashboard/surveillance-dashboard/src/assets/CameraRiskView.png)
![Area Risk View](surveillance-dashboard/surveillance-dashboard/src/assets/AreaRiskView.png)
![Event Intelligence Timeline](surveillance-dashboard/surveillance-dashboard/src/assets/EventIntelligenceTimeline.png)
![System Health Dashboard](surveillance-dashboard/surveillance-dashboard/src/assets/SystemHealthDashboard.png)


### Backend (Planned / Experimental)
- Python
- Deep learning inference models
- Video analytics pipelines
- Risk aggregation logic

---

##  Current Capabilities
- Risk-aware visualization beyond raw video feeds
- Explainable system decision tracking
- Alert generation and resolution workflow
- Modular and scalable UI architecture
- Ready for real-time backend and camera integration

---

##  Future Enhancements
**Backend**
- Live inference services
- RTSP/IP camera stream support
- Scalable alerting pipeline
- Edge and cloud deployment

**Frontend**
- WebSocket-based live updates
- Incident reporting and export
- Role-based access control (RBAC)
- Operator acknowledgement workflows

---

##  Disclaimer
VisionFlux is a research and demonstration prototype developed for academic and evaluative purposes. It does not perform automated enforcement or real-world surveillance actions.

---

## 👥 Team Contributions
**Frontend Development**
- Dashboard architecture and UI design
- Risk visualization and explainability layers
- Event timelines and alert workflows
- System usability and operational awareness

**Backend & Research**
- Model experimentation
- Risk logic design
- Data flow and architecture planning

---

## Submission Notes
- All diagrams, documentation, and code follow proper Git practices
- Feature branches and pull requests were used
- Contributions are clearly visible in commit history
- Architecture and DFDs are included as required

---

**VisionFlux — Turning surveillance data into actionable intelligence.**


