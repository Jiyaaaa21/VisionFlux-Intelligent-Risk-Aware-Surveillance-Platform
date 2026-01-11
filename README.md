# AI-Based Crime and Weapon Detection Backend

## Overview
This repository contains the **backend implementation** of an AI-powered surveillance intelligence system designed for **crime prevention and public safety**. The backend integrates two complementary deep learning modules:

1. **Weapon Detection** using object detection  
2. **Crime Activity Recognition** using multi-class classification  

Together, these modules enable the system to identify **physical threats (weapons)** and **criminal activities** from visual data, forming a robust foundation for intelligent surveillance applications.

The backend is modular, scalable, and designed for real-world deployment in surveillance and security systems.

---

## Backend Architecture Summary

The backend consists of two independent but interoperable AI pipelines:

- **Pipeline A:** Weapon Detection (Spatial Threat Localization)  
- **Pipeline B:** Crime Activity Recognition (Behavioral Threat Classification)  

Each pipeline can operate independently or be fused at the decision level for comprehensive threat assessment.

---

## Model 1: Weapon Detection Backend

### Description
The weapon detection module is implemented using **YOLOv8**, a real-time object detection architecture optimized for speed and accuracy. This module detects weapons in images by predicting **bounding boxes and confidence scores**, enabling precise localization of threats within a scene.

Unlike classification-based approaches, this module performs **object-level detection**, making it suitable for real-time surveillance and CCTV analysis.

### Technical Details
- Model Architecture: YOLOv8  
- Framework: PyTorch (Ultralytics)  
- Task Type: Object Detection  
- Input: Images  
- Output: Bounding boxes with confidence scores  
- Acceleration: GPU-enabled training and inference  

### Capabilities
- Real-time weapon localization  
- High-speed inference  
- Scalable to multi-class weapon detection  
- Deployment-ready model formats  

---

## Model 2: Crime Activity Recognition Backend

### Model Description
The crime activity recognition module is a **multi-class classification system** trained on the **UCF-Crime dataset**. It uses a **DenseNet121 backbone** with ImageNet-pretrained weights to extract high-level spatial features from RGB video frames resized to **64×64 resolution**.

A fully connected classification head with dropout layers is used for regularization. The final softmax layer predicts one of **14 crime-related activity classes**, covering both violent and non-violent events.

### Training Configuration
- Backbone: DenseNet121 (ImageNet pretrained)  
- Loss Function: Categorical Cross-Entropy  
- Optimizer: Stochastic Gradient Descent (SGD)  
- Evaluation Metric: ROC–AUC (micro-average)  
- Input: RGB video frames  
- Output: Crime activity class probabilities  

### Evaluation Results
- Overall ROC–AUC (micro-average): ~0.84  
- Robust class-wise discrimination across violent and non-violent activities  
- Clear separation between normal and anomalous events observed via ROC curves  

These results demonstrate strong representational capacity for large-scale crime activity recognition under challenging visual conditions and class imbalance.

---

## End-to-End Backend Workflow

```

Input Video / Image Stream
|
v
Frame Extraction & Preprocessing
|
+---------------------------+
|                           |
v                           v
Weapon Detection (YOLOv8)     Crime Activity Recognition (DenseNet121)
|                           |
v                           v
Weapon Localization         Activity Classification (14 classes)
|                           |
+-----------+---------------+
|
v
Unified Threat Assessment
(Weapon presence + Activity context)

```
## Backend Use Cases
- Intelligent surveillance systems  
- Public safety monitoring  
- Crime and violence detection  
- Smart city security infrastructure  
- AI-assisted law enforcement systems  

---

## Phase 2 Roadmap (Backend Enhancements)

### Phase 2.1: Temporal Modeling
- Integrate CNN–LSTM, Temporal Convolutional Networks (TCN), or 3D CNNs to capture motion dynamics across video sequences.

### Phase 2.2: Attention Mechanisms
- Add spatial and temporal attention modules to focus on salient regions and key frames relevant to criminal behavior.

### Phase 2.3: Multi-Class Weapon Detection
- Extend weapon detection to distinguish between weapon categories such as pistols, rifles, and automatic firearms.

### Phase 2.4: Class Imbalance Mitigation
- Apply focal loss, class-weighted training, or adaptive sampling strategies to improve performance on rare crime classes.

### Phase 2.5: Multi-Modal Learning
- Incorporate optical flow and audio cues to enhance robustness in complex surveillance environments.

### Phase 2.6: Real-Time and Edge Deployment
- Optimize models using pruning, quantization, and TensorRT for real-time inference on edge and CCTV devices.

---

## Conclusion
This backend system demonstrates a comprehensive and scalable approach to AI-driven surveillance by combining **weapon detection** and **crime activity recognition**. By leveraging YOLOv8 for spatial threat localization and DenseNet121 for behavioral analysis, the system provides a strong foundation for real-world security applications. The planned Phase 2 enhancements aim to evolve this backend into a **production-ready, real-time surveillance intelligence platform**.

---

## License
This backend is developed for educational, research, and hackathon purposes.
```

---

