
# 🚀 Akash's Personal Portfolio

Welcome to my modern, animated developer portfolio built using **Angular**, **.NET C#**, and **SQL Server** — styled with **Tailwind CSS** for a clean, responsive UI.

## 🌐 Live Demo


https://github.com/user-attachments/assets/9144dee4-db8d-4ecb-a810-29ea5689bd29




---

## 📌 Features

- ⚡ Angular 18 Single Page Application
- 🎨 Tailwind CSS for responsive UI
- 📁 File Upload + SQL storage
- 📬 Contact Form with email integration
- ✨ Animations with AOS & Angular Animations
- 🧩 Modular & scalable folder architecture
- 🔒 Secure backend with .NET 8 Web API
- ☁️ Ready for deployment (Azure / Render / GitHub Pages)

---

## 🧱 Folder Structure

```

portfolio/
├── portfolio-client-app/        # Angular Frontend
│   ├── core/                    # Services, interfaces
│   ├── shared/                  # Reusable components (navbar, footer, etc.)
│   ├── features/                # Modules: home, about, contact, etc.
│   ├── assets/                  # Images, icons
│   └── styles.scss              # Tailwind setup
│
├── portfolio-api/               # .NET 8 Backend API
│   ├── Controllers/             # ContactController, UploadController
│   ├── Models/                  # ContactMessage.cs, UploadedFile.cs
│   ├── Data/                    # AppDbContext, Migrations
│   └── wwwroot/uploads/         # Uploaded files

````

---

## 💻 Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Frontend     | Angular 18, TypeScript        |
| Styling      | Tailwind CSS, SCSS            |
| Animations   | Angular Animations, AOS.js    |
| Backend      | .NET 8, C#, Web API           |
| Database     | SQL Server                    |
| Hosting      | Azure / Render / GitHub Pages |

---

## 📤 File Upload Flow

1. Angular form sends `FormData` to API  
2. API saves file to `wwwroot/uploads`  
3. SQL stores filename + metadata  

---

## 📬 Contact Form Flow

1. Angular form submits name, email, message  
2. API stores in `ContactMessages` table  
3. Optional: sends notification email to Akash  

---

## 🛠 Setup Instructions

### 🔹 Angular Frontend

```bash
cd portfolio-client-app
npm install
ng serve
````

### 🔹 .NET Backend

```bash
cd portfolio-api
dotnet restore
dotnet ef database update
dotnet run
```

---

## 🗃️ Sample SQL Table

```sql
CREATE TABLE ContactMessages (
  Id INT PRIMARY KEY IDENTITY,
  Name NVARCHAR(100),
  Email NVARCHAR(100),
  Message NVARCHAR(MAX),
  CreatedAt DATETIME DEFAULT GETDATE()
);
```

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/a95be44e-ffe5-4042-a8b6-dcfba6328f4a)
![image](https://github.com/user-attachments/assets/bc3995a6-e906-41a5-a667-a4657f37de70)
![image](https://github.com/user-attachments/assets/cd3010f7-0c63-4fd2-a8e8-18a27f9580d3)
![image](https://github.com/user-attachments/assets/8a22e6c3-9c6a-4744-9418-c5e9b65faa4f)
![image](https://github.com/user-attachments/assets/cbe2e69d-9438-4e28-83a0-7d5e570edcf7)





---

## 📬 Contact

Feel free to reach out to me via the contact form on this site or
📧 **Email:** [akashkce123@gmail.com](mailto:akashkce123@gmail.com)

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---
