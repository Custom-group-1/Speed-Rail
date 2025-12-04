# Speed-Rail

**Speed-Rail** is a web app for calculating speed in *Honkai: Star Rail*.

For detailed information, check the [Wiki](https://github.com/Custom-group-1/Speed-Rail/wiki).

---

## Installation & Usage

Follow these steps to set up and run the app:

### 1. Clone the Repository
```bash
git clone https://github.com/Custom-group-1/Speed-Rail
```

### 2. Navigate to the Frontend Folder

```bash
cd FrontEnd
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Optional: Run Demo on Expo Go

```bash
npx expo start
```

- Press s in the terminal to switch to Expo Go mode.
- Scan the QR code using the Expo app on your mobile device.

### Note
- Make sure you have Node.js and npm installed before starting.
- If you want to test on a mobile device, install the Expo Go app from the App Store or Google Play.

## 🧪 Testing Guide



This project uses **Jest** and **React Native Testing Library** to test both UI components and application logic.


### 1. Run all tests


```bash
npm run test
```


This command will:


- Execute all test files inside the `__tests__/` directory
- Display pass/fail results in the terminal
- Automatically watch file changes in development mode


### 2. Run tests with coverage report


```bash
npm run test:coverage
```


This command will:


- Generate a **coverage report**
- Export results to:


```
coverage/
└── index.html
```


You can open `coverage/index.html` in your browser to view a detailed coverage dashboard (statements, branches, functions, lines).

[![React Native CI - Test, Report & SonarCloud](https://github.com/Custom-group-1/Speed-Rail/actions/workflows/ci.yml/badge.svg)](https://github.com/Custom-group-1/Speed-Rail/actions/workflows/ci.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Custom-group-1_Speed-Rail&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Custom-group-1_Speed-Rail)
