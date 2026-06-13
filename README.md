# Task-1-Ram-Kiran-R
Repository for Task 1
# Personal Finance Tracker with Budgeting

## The Context
Modern consumers manage their money across multiple decentralized channels, including bank accounts, credit cards, digital wallets, and cash. Without an organized framework, keeping track of daily transactions, subscriptions, and sporadic expenses becomes a chaotic manual chore.

## The Problem
Existing personal finance workflows suffer from three primary pain points:
* **Lack of Visibility:** Many individuals do not know exactly where their money goes each month. This "invisible spending"—driven by small, recurring digital transactions—leads to end-of-month financial anxiety.
* **Reactive vs. Proactive Budgeting:** Most people evaluate their spending after it happens rather than planning for it beforehand. Static tools like Excel spreadsheets require manual data entry, are rarely updated in real-time, and fail to warn users before they overspend.
* **Data Fragmentation & Security Fears:** While commercial apps exist, many users are uncomfortable linking their live bank credentials to third-party services, creating a distinct demand for a secure, private, user-controlled environment where financial data can be imported, categorized, and analyzed safely.

## The Goal / Solution
The goal of this project is to build a secure, intuitive, full-stack personal finance application that transitions users from reactive tracking to proactive budgeting.

The application must allow users to securely log and categorize historical financial transactions, visualize their spending trends through real-time interactive analytics, and establish dynamic monthly budgets that actively alert them before boundaries are breached.

## Frontend & Functionalities
The frontend is the visual and interactive layer that runs inside the user's web browser. It is built using **HTML5** for structure, **CSS3** (with variables/tokens) for custom layout design, and asynchronous **JavaScript (Fetch API)** for dynamic communication.

### Main Functionalities:
1. **User Interface & Experience:** Displays forms to log in, register, track transactions, and configure spending limits.
2. **State Management & Hot Reloading:** Intercepts standard form submissions via `e.preventDefault()` to pass data behind the scenes without breaking your design or forcing a hard page refresh.
3. **Data Presentation:** Dynamically converts raw numeric limits and transactional logs fetched from the backend into responsive progress indicators (e.g., changing colors to dark red `#d9534f` when a budget limit is breached).

---

## Technical Stack & File Architecture

Below is the updated file layout of the frontend application, showing dedicated HTML and CSS pairings for every application view.

### Directory Structure
```text
├── login.html                 # App entry point / user login page
├── signup.html                # New account registration page
├── dashboard.html             # Main account dashboard (Allocations & Outflows)
├── budget.html                # Threshold and guardrails configuration page
├── transactions.html          # Historical master audit ledger log page
│
├── css/
│   ├── login.css              # Custom styling for the login layout
│   ├── signup.css             # Custom styling for the registration interface
│   ├── dashboard.css          # Styles for layout grids, widgets, and lists
│   ├── budget.css             # Styles for input controls and ceiling settings
│   └── transactions.css       # Data table formatting and log history styling
│
└── js/
    ├── api.js                 # Shared fetch configurations and backend endpoint mappings
  

*© 2026 DecodeLabs Internship Program*
