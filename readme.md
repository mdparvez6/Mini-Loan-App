### How to Set Up and Run the Project

Follow these steps to run both the frontend and backend of the project:

---

### 1. **Download the Code**

- Go to the GitHub repository for the project.
- Click on the green **"Code"** button, and select **"Download ZIP"**.
- Extract the downloaded ZIP file to your desired location.

### 2. **Open in IDE**

- Open your IDE (like VS Code).
- Open the extracted folder in the IDE.

---

### 3. **Set Up Dependencies**


- Before installing dependencies for the frontend and backend, we need to install root-level dependencies, including concurrently.
- npm install concurrently
- Open the `package.json` file in the root directory of the project and ensure the following scripts are included:

  ```json
  "scripts": {
    "install-frontend": "npm install --prefix clients",
    "install-backend": "npm install --prefix Server",
    "install-all": "npm run install-frontend && npm run install-backend",
    "frontend": "npm start --prefix clients",
    "backend": "npm run dev --prefix Server",
    "dev": "concurrently \"npm run frontend\" \"npm run backend\""
  }
  ```

---

### 4. **Install All Dependencies**

- Open the terminal in your IDE.
- Run the following command to install dependencies for both frontend and backend:

  ```bash
  npm run install-all
  ```

  This will:
  - Install all dependencies for the frontend (inside the `clients` folder).
  - Install all dependencies for the backend (inside the `Server` folder).

---

### 5. **Run the Project**

Once the dependencies are installed, you can run both the frontend and backend simultaneously by executing the following command:

```bash
npm run dev
```

This command will:
- Start the frontend (running inside the `clients` folder).
- Start the backend (running inside the `Server` folder).

---

Working of Mini-Loan-App

https://github.com/user-attachments/assets/65231a11-3b57-4efb-8eb9-abd4e3be0557





Now your project should be running, with the frontend and backend both active!
