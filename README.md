# DPS Frontend Coding Challenge

## Project Overview

- **Objective:** Construct a CRM component with a searchable customer list feature
- **Target Completion Date:** July 29, 2024 12:00 PM (IST)
- **API Endpoint:** https://dummyjson.com/users

## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Context

The task is to create a CRM (Customer Relationship Management) Component aimed at managing customer data efficiently. The task is to develop a feature that displays a searchable list of customers.

The attached mockup image has been referred to guide the UI development 👇

![Mockup](images/mockup.png)

## Points to Remember

- **Code Cleanup**: Ensure all code follows best practices
- **Small Commits**: Make small commits to show progress (Use [CommitLint](https://commitlint.io/))

## Technology Stack

- **Front End Segment:** ReactJS with TypeScript
- **State Management & Middleware:** Redux Toolkit
- **Styling:** Tailwind CSS and CSS Modules
- **Components:** Shadowed Components (ShadCN) and Custom Components
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Package Manager:** Node Package Manager (NPM)

## Challenge Features

- [ ] Input Filter on `firstName` and `lastName` (Dynamic + Case Sensitive)
- [ ] Implement a 1-second debounce on the Name Filter
- [ ] City Dropdown Filter
- [ ] Highlight Oldest User per city Checkbox
- [ ] Sortable Columns
- [ ] Pagination Component
- [ ] Clear All Filters Button
- [ ] User Details Modal on Row Click
- [ ] Responsive Design
- [ ] Key connectivity to Name Filter

## Error Handling Implementation

- [ ] API Request Failures (Display user-friendly messages)
- [ ] No Results after applying Filters
- [ ] Invalid Fields in API Response
- [ ] Network Connectivity Issues (Implement Retry Mechanism)
- [ ] Empty Dataset from API
- [ ] General API Fetch Error Handling

## Edge Cases Considered

- [ ] Cities with Identical Names but different States
- [ ] Users with same Birthday in same City
- [ ] Filtering/Sorting with missing data
- [ ] Very few records after applying Filters
- [ ] Identical oldest users in a city (multiple users with same oldest birthday)

## Minor Detailing

- [ ] Skeleton Loaders for Initial Data Fetch + Filtering
- [ ] Toast Notifications for successful actions
- [ ] Tooltips for clarifying UI elements
- [x] Non-draggable Images
- [x] Disable Text Selection

## Additional Notes

This CRM Component was developed as part of the DPS Frontend Coding Challenge.
