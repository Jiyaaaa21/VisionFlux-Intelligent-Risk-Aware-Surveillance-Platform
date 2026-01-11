UCF Crime Detection Using DenseNet


Overview
This repository contains a deep learning–based crime detection system built using the UCF Crime Dataset. The project applies transfer learning with DenseNet to classify video frames into crime-related categories. The implementation is provided as a Jupyter Notebook and demonstrates a complete machine learning workflow from data loading to model evaluation.


Objectives

Perform automated crime activity classification using deep learning

Utilize pretrained DenseNet architecture for feature extraction

Train and evaluate a convolutional neural network on video-derived image frames

Save and reuse trained models for inference or further research


Dataset
Name: UCF Crime Dataset

Type: Video-based crime activity dataset

Input Format: Image frames extracted from videos

Source: Downloaded programmatically using KaggleHub


Expected Directory Structure
UCF-Crime-Dataset/
├── Train/
│   ├── Class_1/
│   ├── Class_2/
│   └── ...
└── Test/
    ├── Class_1/
    ├── Class_2/
    └── ...



Model Architecture
Base Model: DenseNet (pretrained on ImageNet)

Approach: Transfer Learning

Custom Layers: Fully connected classification head

Loss Function: Categorical Crossentropy

Optimizer: Adam

Evaluation Metrics: Accuracy, Precision, Recall, F1 Score

Technology Stack

Python 3.x

TensorFlow / Keras

NumPy

Pandas

Scikit-learn

Matplotlib

Plotly

KaggleHub



Installation

Install all required dependencies using:

pip install tensorflow keras numpy pandas scikit-learn matplotlib plotly kagglehub



Workflow

Import required libraries

Download dataset using KaggleHub

Define training and testing paths

Apply image preprocessing and normalization

Generate training and validation datasets

Visualize class distribution

Build DenseNet-based model

Train the model

Evaluate performance metrics

Save trained model



Training Configuration
Parameter	Value
Image Size	224 x 224
Random Seed	12
Preprocessing	DenseNet preprocessing
Training Method	Transfer Learning
Evaluation



Model performance is evaluated using the following metrics:

Accuracy

Precision (Macro Average)

Recall (Macro Average)

F1 Score (Macro Average)

Confusion Matrix



Model Output

The trained model is saved in the following format:

ucf_crime_densenet.h5



This file can be used for inference, fine-tuning, or deployment.

Limitations and Future Work

Current implementation uses frame-based classification only

Temporal relationships between frames are not modeled



Performance may be improved using:

LSTM or Transformer-based temporal models

3D CNN architectures

Class imbalance handling

Real-time video inference pipelines



Usage Notes

This project is intended for academic and research purposes only.
Users must comply with the UCF Crime Dataset license terms.

License

This repository is provided for educational and research use.
Dataset ownership and licensing remain with the original dataset creators.

Author

This project was developed as a deep learning experiment focusing on crime detection using transfer learning and convolutional neural networks.
