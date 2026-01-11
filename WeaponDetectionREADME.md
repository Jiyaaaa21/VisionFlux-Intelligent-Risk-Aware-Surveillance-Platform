# Weapon Detection System Using YOLOv8

## Overview
This project implements an AI-powered weapon detection system using a deep learning–based object detection approach. The system is designed to automatically detect and localize weapons in images by generating bounding boxes with confidence scores. It is intended for use in security, surveillance, and threat monitoring applications.

Unlike traditional image classification models that only predict whether a weapon is present, this system performs object detection, enabling it to identify both the presence and the precise location of weapons within an image.

---

## Project Objectives
- Detect weapons accurately in visual data  
- Localize weapons using bounding boxes  
- Enable fast and scalable inference  
- Build a foundation for real-time surveillance systems  

---

## What Has Been Implemented
- A YOLOv8-based weapon detection model  
- End-to-end training and inference pipeline  
- GPU-accelerated training workflow  
- Image-based inference with bounding box visualization  
- Exportable trained model for deployment  

---

## System Architecture

### High-Level Architecture
```

Input Image
|
v
Image Preprocessing
(resize, normalize)
|
v
YOLOv8 Model
(Feature Extraction + Detection Head)
|
v
Bounding Box Prediction
(Class + Confidence Score)
|
v
Visualization / Deployment Output

````

### Technical Stack
- Model Architecture: YOLOv8  
- Framework: PyTorch (Ultralytics)  
- Problem Type: Object Detection  
- Input: Images  
- Output: Bounding boxes with confidence scores  

---

## How the System Works
1. Input images are resized and normalized.  
2. The YOLOv8 model processes the image in a single forward pass.  
3. The model learns spatial and visual features associated with weapons.  
4. Bounding boxes and confidence scores are predicted for detected weapons.  
5. Results are visualized or integrated into downstream systems.  

---

## Setup Instructions

### Prerequisites
- Python 3.8 or higher  
- GPU recommended for training  
- Google Colab or a local machine with CUDA support  

### Environment Setup
Install the required dependencies:
```bash
pip install ultralytics opencv-python matplotlib
````

---

## Running the Project

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/weapon-detection-yolov8.git
cd weapon-detection-yolov8
```

### Step 2: Dataset Structure

Ensure the dataset follows this structure:

```
weapon_detection/
├── train/
│   ├── images/
│   └── labels/
└── val/
    ├── images/
    └── labels/
```

Each label file must follow YOLO format:

```
class_id x_center y_center width height
```

### Step 3: YOLO Data Configuration

Create a configuration file named `weapon_data.yaml`:

```yaml
path: weapon_detection
train: train/images
val: val/images

nc: 1
names: ['weapon']
```

### Step 4: Train the Model

```python
from ultralytics import YOLO

model = YOLO("yolov8n.pt")

model.train(
    data="weapon_data.yaml",
    epochs=20,
    imgsz=640,
    batch=8,
    name="weapon_yolov8"
)
```

### Step 5: Run Inference

```python
results = model.predict(
    source="test_image.jpg",
    conf=0.4,
    save=True
)

results[0].plot()
```

### Step 6: Export the Model

```python
model.export(format="onnx")
```


## Key Features

* Real-time weapon detection
* Accurate localization using bounding boxes
* Fast inference using YOLOv8 architecture
* Scalable and extensible system design
* Suitable for surveillance and security use cases


## Applications

* Smart surveillance systems
* Public safety and threat monitoring
* Restricted area security screening
* AI-assisted law enforcement tools


## Phase 2 Roadmap

### Phase 2.1: Multi-Class Weapon Detection

* Extend detection to multiple weapon categories such as pistols, rifles, and automatic weapons.
* Improve class-wise detection accuracy.

### Phase 2.2: Real-Time Video and CCTV Integration

* Enable detection on live video streams and CCTV feeds.
* Optimize inference for frame-by-frame processing.

### Phase 2.3: Alert and Notification System

* Trigger alerts when weapons are detected above a confidence threshold.
* Integrate automated warning mechanisms.

### Phase 2.4: Web-Based Deployment

* Develop a web interface using Streamlit or Flask.
* Allow image and video uploads for real-time detection.

### Phase 2.5: Edge Deployment and Optimization

* Optimize the model for edge devices.
* Reduce latency and memory usage for production deployment.


## Conclusion

This project demonstrates the effective application of modern deep learning–based object detection techniques to address real-world security challenges. By leveraging YOLOv8, the system achieves a strong balance between detection accuracy and inference speed. With the planned Phase 2 enhancements, this solution can evolve into a production-ready, real-time weapon detection system suitable for deployment in surveillance environments.

