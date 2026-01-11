# UCF Crime Detection Using DenseNet

## Overview

This repository contains a deep learning–based crime detection system developed using the **UCF Crime Dataset**.  
The project applies **transfer learning with DenseNet** to classify video frames into crime-related categories and demonstrates a complete end-to-end machine learning pipeline implemented in a **Jupyter Notebook**.

---

## Project Objectives

- Perform automated crime activity classification using deep learning  
- Utilize a pretrained DenseNet architecture for feature extraction  
- Train and evaluate a convolutional neural network on video-derived image frames  
- Save trained models for reuse in inference or further research  

---

## Dataset Information

- **Dataset Name:** UCF Crime Dataset  
- **Data Type:** Video-based crime activity dataset  
- **Input Format:** Image frames extracted from videos  
- **Dataset Access:** Downloaded programmatically using KaggleHub  

---

## Expected Directory Structure

```text
UCF-Crime-Dataset/
├── Train/
│   ├── Class_1/
│   ├── Class_2/
│   └── ...
└── Test/
    ├── Class_1/
    ├── Class_2/
    └── ...
```
## Model Architecture

- **Base Model:** DenseNet (pretrained on ImageNet)
- **Learning Strategy:** Transfer Learning
- **Custom Layers:** Fully connected classification head
- **Loss Function:** Categorical Crossentropy
- **Optimizer:** Adam

### Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1 Score

---

## Technology Stack

- **Programming Language:** Python 3.x
- **Deep Learning Framework:** TensorFlow / Keras
- **Data Processing:** NumPy, Pandas
- **Visualization:** Matplotlib, Plotly
- **Evaluation:** Scikit-learn
- **Dataset Handling:** KaggleHub

---

## Installation

Install all required dependencies using the following command:

```bash
pip install tensorflow keras numpy pandas scikit-learn matplotlib plotly kagglehub
```

## Workflow Description

1. Import required Python libraries  
2. Download the UCF Crime Dataset using KaggleHub  
3. Define training and testing directory paths  
4. Apply image preprocessing and normalization  
5. Create training and validation data generators  
6. Visualize class distribution  
7. Build a DenseNet-based classification model  
8. Train the model on the dataset  
9. Evaluate performance using multiple metrics  
10. Save the trained model for future use  

---

## Training Configuration

| Parameter         | Value                   |
|-------------------|-------------------------|
| Image Size        | 224 × 224               |
| Random Seed       | 12                      |
| Preprocessing     | DenseNet Preprocessing |
| Training Method   | Transfer Learning       |

---

## Model Evaluation

The trained model is evaluated using the following metrics:

- Accuracy  
- Precision (Macro Average)  
- Recall (Macro Average)  
- F1 Score (Macro Average)  
- Confusion Matrix  

---

## Model Output

After training, the model is saved in the following format:

```text
ucf_crime_densenet.h5
```

## Model Usage

- Inference on new data  
- Fine-tuning and retraining  
- Deployment in production environments  

---

## Limitations and Future Enhancements

### Current Limitations

- Frame-level classification only  
- Temporal relationships between video frames are not modeled  

### Potential Improvements

- Temporal modeling using LSTM or Transformer architectures  
- Use of 3D CNNs for spatiotemporal learning  
- Handling dataset class imbalance  
- Real-time video inference pipeline  

---

## Usage Disclaimer

This project is intended strictly for **academic and research purposes**.  
Users must ensure compliance with the **UCF Crime Dataset licensing terms**.

---

## License

This repository is provided for **educational and research use only**.  
All dataset rights and licenses belong to their respective owners.

---

## Author

Developed as a deep learning research project focused on crime detection using  
**transfer learning** and **convolutional neural networks**.
