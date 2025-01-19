# Cricket App - Frontend (Angular)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Overview

**Cricket App** is a full-fledged application designed to manage and view cricket matches, scorecards, and deep insights. It includes features like live scores, match analytics, player management, and scheduling. This project is the **frontend** part of the app, built using **Angular** and Firebase.

### Key Features:
- **User Login and Match Scheduling**: Users can log in, schedule matches, and manage teams and players.
- **Live Scores and Match Details**: View real-time scores and match details for ongoing matches.
- **Analytics**: Visualize match data with interactive graphs like bar charts, pie charts, etc.
- **Deep Insights**: Detailed tabular breakdown of match events, including player performance, bowling, and batting insights.

---

## Requirements

- **Angular CLI**: Ensure you have the Angular CLI installed on your system.
  ```bash
  npm install -g @angular/cli
  ```

- **Node.js**: This project requires Node.js (v16 or later) for package management.


## Installation
1.Clone the repository: Clone the repository to your local machine.

  ```bash

git clone [Cricket-App](https://github.com/mbishnoi29786/Cricket-App.git)
  ```

2.Navigate to the frontend directory: Change the directory to the frontend folder.

```bash
cd frontend
```
3.Install dependencies: Install all required dependencies using npm.

```bash
    npm install
```
4.Run the development server: Start the Angular development server to launch the application.

```bash

ng serve
```
After the server starts, you can access the app in your browser at http://localhost:4200/.

## Configuration

1. Firebase Configuration: The app integrates with Firebase for real-time updates. Make sure to configure Firebase in the environment.ts file with your Firebase credentials.

2. API URL: The app communicates with the backend (Node.js + Express API) to fetch data. The base API URL is set in the src/app/environment/environment.ts file:

```typescript
    export const url = 'http://localhost:8000'; 
```
Make sure your backend is running on this URL.

## Features
1. User Authentication
    Users must log in to schedule matches, add players, and view detailed match insights.
    Non-logged-in users can only see live scores and match details for completed games.
2. Match Scheduling
    Users can schedule a match by selecting two teams, assigning 11 players to each team, and choosing who will bat first.
3. Live Scores
    Users can see live scores during ongoing matches. The scores and match status update in real-time.
4. Match Analytics
    For completed matches, users can view match analytics, including:
        Bar charts and pie charts showing the runs scored by each team in each over.
        A detailed scorecard with batting and bowling performance for each player.
5. Deep Insights
    View detailed insights on each match, including:
        Which bowler bowled each over.
        Runs scored by each batsman.
        Player dismissals (e.g., how the player got out, runs scored, etc.).
        A tabular view of match events, showing performance by over for both teams.

## Dependencies
This project uses several libraries and dependencies. You can find them in the package.json file.

Key dependencies include:

Angular: The primary framework for building the application.
Bootstrap: For responsive design and UI components.
ngx-toastr: For displaying notifications.
rxjs: For handling asynchronous events.
zone.js: For running Angular’s change detection mechanism.
```json
"dependencies": {
  "ngx-toastr": "^14.2.0",
  "bootstrap": "^5.0.0",
  "rxjs": "~6.6.0",
  "zone.js": "~0.11.4"
}
```

## Directory Structure
The project structure is as follows:

```ruby
Copy
frontend/
│
├── src/
│   ├── app/
│   │   ├── components/          # UI components like add-player, matchlist, etc.
│   │   ├── services/            # Services for handling API calls and business logic
│   │   ├── shared/              # Shared directives, pipes, components
│   │   ├── custom_pipes/        # Custom Angular pipes (e.g., filter, floor-value)
│   │   ├── app-routing.module.ts# Routing configuration
│   │   ├── app.module.ts        # Main Angular module
│   │   ├── app.component.ts     # Root component of the app
│   ├── assets/                  # Static files like favicon.ico
│   ├── environment/             # Configuration for environments (API URLs, etc.)
│   ├── index.html               # Main HTML file
│   ├── main.ts                  # App entry point
│   └── styles.css               # Global styles (e.g., Bootstrap overrides)
│
├── angular.json                 # Angular build and configuration settings
├── package.json                 # List of dependencies and npm scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project overview and documentation

```

## Running Tests
### Unit Tests:
To run unit tests using Karma, use the following command:

```bash

ng test
```

### End-to-End Tests:
To run end-to-end tests, you first need to install a package that provides end-to-end testing capabilities, then run:

```bash
    ng e2e
```

## Code Scaffolding
To generate new components, services, directives, etc., use Angular CLI commands:

### Generate a component:

```bash
    ng generate component component-name
```

### Generate a service:

```bash
    ng generate service service-name
```

### Generate a pipe:

```bash
    ng generate pipe pipe-name
```
For more options, you can also use ng generate to create other Angular constructs such as guards, modules, etc.

## Build
To build the project for production, use:

```bash
    ng build --prod
```
The build output will be stored in the dist/ directory, ready for deployment.

## Further Help
For additional help with the Angular CLI, you can use:

```bash
    ng help
```
Alternatively, refer to the Angular CLI Overview and Command Reference.

## Contributing
1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to your branch (git push origin feature-name).
5. Open a pull request.


## Acknowledgments
Angular for building the application framework.
Bootstrap for responsive design components.
ngx-toastr for toast notifications.
Firebase for real-time data management.


```yaml
---
    This README includes all the necessary details for your project, along with the development and testing commands, feature descriptions, and setup instructions. You can copy and paste this directly into your `README.md` file in the frontend folder. Let me know if you'd like to make any adjustments or if you need any further help!
```



