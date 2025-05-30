# ICP_Group5
Repo for ICP Group 5

# 🧠 Local LLM Chatbot (FastAPI + Streamlit)

This project allows you to run a local LLM-based chatbot using FastAPI and Streamlit.

---

## 📦 Prerequisites

The instructions are also found in the repository (`instructions` word doc).
Before starting, make sure you have:

- Python 3.8 or newer installed
- Visual Studio Code installed
- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) if necessary
- The `llama-2-7b-chat.Q4_K_M.gguf` model file downloaded

---

## 🔁 Setup Instructions

### 📁 1. Download the Model File

- Download the file: `llama-2-7b-chat.Q4_K_M.gguf`: https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF
- Note: **Download the 3.86GB file**.
- Place it in: `api/models/`  
  **⚠️ Do NOT commit this file to Git! (add it to `.gitignore` if necessary)**

<img width="1280" alt="image" src="https://github.com/user-attachments/assets/54dd6eb3-1b1a-45eb-adb3-25bdede5f82f" />


---

### 🖥️ 2. Setting Up the Virtual Environment

1. Open a new PowerShell terminal in VSCode.
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `venv\Scripts\activate`
4. Install the required packages: `pip install -r requirements.txt`
![image](https://github.com/user-attachments/assets/53e8490e-c2a1-4cf3-a0bc-41c37bd10bdf)

5. Navigating to the API folder: `cd api`
6. Run the API server: `uvicorn api:app --reload` 
![image](https://github.com/user-attachments/assets/d89d72ce-a38b-4138-bde5-5712537b6d2c)

If you get the following output, the API is ready!
![image](https://github.com/user-attachments/assets/684c6651-15b6-495c-9ad4-fb6ed4790d7d)

7. Once the API is running, visit the API Docs here: http://127.0.0.1:8000/docs#/

#### TroubleShooting errors for step 4:
If you encounter build errors during installation:
- Open the Visual Studio Installer\
- Click Modify
- Check "Desktop development with C++"
- Install and restart your computer
- Then, repeat the setup steps above

### 3. Running the StreamLit Frontend

1. Open a new PowerShell terminal in VSCode.
2. Run the StreamLit app: `streamlit run streamlit_app.py`
3. Click the local URL (shown in terminal) to open the Streamlit UI in your browser.
4. Use the following API token when prompted in the StreamLit UI (Found in `instructions` word doc); Or use your own API Replicate token!
5. Paste it into the credential folder and press Enter.

### 4. Clean-Ups (Optional)
- To delete the virtual environmenent before closing VSCode, run: `rmdir /s /q venv`

Glossary for content in the repository:
- code_contributions: All the codes each member has done for this project
- external_files: External files/documents created to aid in the creation of the prototype and final product of this project (E.g. mock-up data)
- images: Folder to hold images to be used in the streamlit deployment app

Other resources:
- Trello board: https://trello.com/invite/b/6805ee73430d26ae5c804983/ATTIab15bdb1d4bd9e93ad66406e40aaddbaB5AEC5F2/icp-group-5
- Figma link for front-end prototype: https://www.figma.com/design/DdXD37qD4ZssEAkm6W6HgF/icp-draft?node-id=0-1&t=s1fLaz96O8vC1JI4-1
