# -WEEK-4-DevelopersHub-Corporation-Cybersecurity-Internship-
Advanced Threat Detection and Web Security Enhancements for the OWASP NodeGoat application. This project implements Intrusion Detection, Failed Login Monitoring, API Security Hardening, Rate Limiting, CORS Configuration, API Key Authentication, Content Security Policy (CSP), and HTTP Strict Transport Security to strengthen web application security.



# 🛡️ Week 4 – Advanced Threat Detection & Web Security Enhancements

## 📌 Project Overview

This repository contains the implementation of **Week 4** of the Cybersecurity Internship.

The objective was to improve the security of the **OWASP NodeGoat** application by implementing advanced protection mechanisms against common web attacks and unauthorized access.

---

# 🎯 Objectives

* Implement intrusion detection and monitoring
* Secure API endpoints
* Prevent brute-force attacks
* Configure secure HTTP security headers
* Improve overall web application security

---

# 🛠 Technologies Used

* Node.js
* Express.js
* MongoDB
* Helmet
* Express Rate Limit
* CORS
* Winston Logger
* JavaScript

---

# ✅ Task 1 – Intrusion Detection & Monitoring

Implemented login monitoring using **Winston Logger**.

### Features

* Detects failed login attempts
* Records invalid usernames
* Records invalid passwords
* Logs client IP address
* Stores security events in **security.log**

---

# ✅ Task 2 – API Security Hardening

### Rate Limiting

Implemented **express-rate-limit**.

**Configuration**

* Maximum Requests: **5**
* Time Window: **15 Minutes**

This protects the application against brute-force attacks.

---

### CORS Configuration

Configured **CORS** to allow requests only from trusted origins.

This prevents unauthorized websites from accessing application resources.

---

### API Key Authentication

Implemented API Key authentication.

Unauthorized requests receive:

```text
401 Unauthorized
```

This protects sensitive API endpoints from unauthorized access.

---

# ✅ Task 3 – Security Headers

Configured **Helmet** middleware.

Implemented:

* Content Security Policy (CSP)
* Strict Transport Security (HSTS)
* Removed X-Powered-By header

These headers provide additional browser-level security protections.

---

# 📂 Repository Structure

```text
NodeGoat-Week4-Advanced-Web-Security

│── README.md
│── security.log

│── reports
│     Week4_Report.docx
│     Week4_Documentation.docx

│── screenshots
│     RateLimit-Code.png
│     RateLimit-Test.png
│     CORS-Code.png
│     APIKey-Code.png
│     APIKey-Test.png
│     Helmet-CSP-Code.png
│     HSTS-Code.png
│     FailedLogin-Code.png
│     FailedLogin-Logs.png
│     Terminal-npm-start.png

│── source-code
│     server.js
│     session.js
│     package.json
```

---

# 📸 Screenshots Included

* Rate Limiting Configuration
* Rate Limiting Test
* CORS Configuration
* API Key Authentication
* Helmet Configuration
* Content Security Policy (CSP)
* HSTS Configuration
* Failed Login Monitoring
* Winston Security Logs
* Application Running Successfully

---

# 🔒 Security Features Implemented

✔ Intrusion Detection

✔ Failed Login Monitoring

✔ Express Rate Limiting

✔ API Key Authentication

✔ CORS Protection

✔ Helmet Security Headers

✔ Content Security Policy (CSP)

✔ Strict-Transport-Security (HSTS)

✔ X-Powered-By Header Removed

---

# 📊 Results

The NodeGoat application is now more secure against:

* Brute-force attacks
* Unauthorized API access
* Cross-Origin attacks
* Cross-Site Scripting (XSS)
* Information disclosure
* Common web security threats

---

# 📁 Deliverables

* Updated Source Code
* Security Log File
* Project Report
* Security Documentation
* Screenshots
* README Documentation

---

# 🎓 Internship

Cybersecurity Internship

Week 4 – Advanced Threat Detection & Web Security Enhancements

---

## ⭐ Project Status

**✔ Successfully Completed**

#**Author**

Fatima Haq
