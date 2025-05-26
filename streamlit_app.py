import streamlit as st

st.set_page_config(page_title="PETANNAIK Prototype", layout="wide")

# --- Page Navigation State ---
if "page" not in st.session_state:
    st.session_state.page = "main"

def go_to_chatbot():
    st.session_state.page = "chatbot"

def go_to_main():
    st.session_state.page = "main"

# --- Custom CSS for styling ---
st.markdown("""
    <style>
    section[data-testid="stSidebar"] {
        background-color: #606C38 !important;
    }
            
    .sidebar .sidebar-content {background-color: #606C38;}
    .logo {font-size:32px; font-weight:bold; color:#F9F9F9;}
    .menu-title {color:#F9F9F9; font-size:18px; margin-top:30px;}
    .menu-item {color:#F9F9F9; font-size:16px; margin:10px 0;}
    .palmpijot {color:#A3D977; font-weight:bold; font-size:20px;}
    .welcome {font-size:28px; font-weight:bold; color:#4B5D2A;}
    .subtitle {font-size:16px; color:#888;}
    .item-card {background:#fff; border-radius:12px; padding:16px; margin-bottom:16px; box-shadow:0 2px 8px #eee;}
    .item-title {font-size:18px; font-weight:bold;}
    .item-price {color:#E57300; font-size:16px; font-weight:bold;}
    .recent-activity {background:#F6F8F4; border-radius:12px; padding:16px;}
    .logo-link {cursor:pointer;}
            

    /* Remove the broad white color rule! */
    /* Explicitly style buttons and dropdowns to black */
    [data-testid="stSidebar"] button,
    [data-testid="stSidebar"] .stButton > button,
    [data-testid="stSidebar"] .stSelectbox div[role="button"],
    [data-testid="stSidebar"] .stSelectbox label,
    [data-testid="stSidebar"] .stSelectbox span,
    [data-testid="stSidebar"] .stSelectbox .css-1wa3eu0-placeholder,
    [data-testid="stSidebar"] .stSelectbox .css-1uccc91-singleValue,
    [data-testid="stSidebar"] .stSelectbox .css-1okebmr-indicatorSeparator,
    [data-testid="stSidebar"] .stSelectbox .css-1n76uvr-option {
        color: #000 !important;
        font-weight: bold !important;
    }
    </style>
""", unsafe_allow_html=True)

# --- Sidebar---- hi
if st.session_state.page == "chatbot":
    with st.sidebar:
        st.image("images/palmpilot_logo.png", width=300)
        # Button to return to dashboard
        st.button("⬅️ Back to Dashboard", use_container_width=True, on_click=go_to_main)
        st.markdown('<div style="color:#fff; font-size:22px; margin-top:10px; font-weight:bold;">🖥️ PalmPilot Chatbot</div>', unsafe_allow_html=True)
        st.markdown('<div style="color:#fff; font-size:15px; margin-bottom:16px;">This chatbot is created using the open-source Llama 2 LLM model from Meta.</div>', unsafe_allow_html=True)
        api_key = st.text_input("Enter Replicate API token:", type="password")
        invalid_token = not api_key or not api_key.startswith("r8_")
        if invalid_token and api_key:
            st.markdown(
                '<div style="color:#FFD600; background:#B71C1C; padding:10px; border-radius:8px; font-weight:bold;">'
                '⚠️ Please enter a valid API token!'
                '</div>',
                unsafe_allow_html=True
            )
        st.markdown('<div style="color: #fff;margin-top:18px; font-weight:bold;">Models and parameters</div>', unsafe_allow_html=True)
        model = st.selectbox('Choose a Llama2 model', ["Llama2-7B", "Llama2-13B", "Llama2-70B"], key="llama_model")
        temperature = st.slider("temperature", 0.01, 1.0, 0.10, 0.01)
        top_p = st.slider("top_p", 0.01, 1.0, 0.90, 0.01)
        max_length = st.slider("max_length", 20, 80, 50, 1)
        st.markdown(
            '<a href="https://blog.streamlit.io/how-to-build-an-llama2-chatbot/" target="_blank" style="font-size:14px; color:#fff;">'
            '📖 Learn how to build this app in this blog!</a>',
            unsafe_allow_html=True
        )
        if st.button("Clear Chat History"):
            st.session_state['chat_history'] = []

else:
    with st.sidebar:
        st.image("images/petannaik_logo.png", width=300)
        st.markdown('<div class="menu-title">Menu</div>', unsafe_allow_html=True)
        st.button("Chatbot", key="palmpilot_logo_btn", help="Go to Chatbot", use_container_width=True, on_click=go_to_chatbot)


# --- Main Page ---
if st.session_state.page == "main":
    # --- Product Data ---
    products = [
        {"name": "Kaos SIBRONDOL SawitPRO size XL", "price": 100000},
        {"name": "TSP China Cap Daun 50kg", "price": 945000},
        {"name": "Petro ZA Plus 50kg", "price": 537800},
        {"name": "Batara 135 SL - 1 Liter", "price": 86000},
        {"name": "Dolomit Super Inti M-100 50kg", "price": 65000},
        {"name": "Kieserite SoluMAG-G 50kg", "price": 435892},
        {"name": "Pupuk SawitPRO 50kg + Abu Janjang 40kg", "price": 1399999},
        {"name": "Bibit Topaz Siap Tanam", "price": 45100},
        {"name": "Urea Nitrea 46% N 50kg", "price": 674500},
        {"name": "Topi SawitPRO Hijau", "price": 35000},
        {"name": "Kapur Pertanian Kebomas 50 Kg", "price": 241700},
        {"name": "Token PLN 100.000", "price": 109000},
        {"name": "NPK Phonska Plus 15-15-15 25kg", "price": 441142},
        {"name": "Metsulindo 20 WP - 250gr", "price": 106200},
        {"name": "Bom Up 520 SL - 5 Liter", "price": 502645},
        {"name": "Marxone 300 SL - 5 Liter", "price": 499700},
        {"name": "MOP/KCL Canada Cap Mahkota 50kg", "price": 712500},
        {"name": "Pupuk SawitPRO 20kg + Abu Janjang 40kg", "price": 1080000},
        {"name": "NPK Mahkota 12-12-17-2 TE 50kg", "price": 717250},
        {"name": "NPK DGW 13-8-27-4 TE 50kg", "price": 798000},
        {"name": "Meroke Korn Kali B (KKB) 50kg", "price": 762850},
        {"name": "Meroke SS - AMMOPHOS 50kg", "price": 940500},
        {"name": "NPK Sawit 13-8-27-4 0.5 B Pak Tani 50kg", "price": 817000},
        {"name": "Dolomite M-100 50kg", "price": 136440},
        {"name": "Borate Mahkota - 25kg", "price": 1300000},
        {"name": "Bablass 490 SL - 1 Liter", "price": 102700},
        {"name": "RP Mahkota 50kg - Egypt", "price": 352688},
        {"name": "PRIMASTAR 300/100 SL 5 liter", "price": 230000},
        {"name": "Urea Nitrea 46% N 50kg - Granul", "price": 356357},
        {"name": "Paket Laporan Pengiriman", "price": 50000},
        {"name": "RP Cap Daun 50Kg", "price": 338200},
        {"name": "DMA 6 825 SL 400ml", "price": 97000},
        {"name": "Token PLN 200.000", "price": 210000},
        {"name": "NPK DGW 13-6-27 50kg", "price": 760000},
        {"name": "Kieserite Mahkota 50kg", "price": 541500},
        {"name": "Mahkota ZA 50kg", "price": 497800},
        {"name": "Meroke TSP 50kg", "price": 532500},
        {"name": "NPK Mahkota 13-8-27-4 0.5 B 50kg", "price": 883500},
        {"name": "Pupuk SawitPRO 50kg", "price": 1299999},
        {"name": "Bablass 490 SL - 5 Liter", "price": 469300},
        {"name": "ZA Cap Daun 50Kg", "price": 439375},
    ]

    # --- Search Bar ---
    search_query = st.text_input("Search for products...", "")

    # --- Filter Products ---
    if search_query:
        filtered_products = [p for p in products if search_query.lower() in p["name"].lower()]
    else:
        filtered_products = products

    st.markdown('<div class="welcome">Welcome Back</div>', unsafe_allow_html=True)
    st.markdown('<div class="subtitle">Get your latest update for the last 7 days</div>', unsafe_allow_html=True)

    # Order summary
    st.markdown("""
    | Item | Pick-Up Date & Time | Pick-Up Location |
    |------|---------------------|------------------|
    | Pupuk SawitPRO 50kg + Abu Janjang 40kg | 16/5/2025, 4:00 PM | Jakarta, Indonesia |
    """)

    # Main content: Available Items and Recent Activity
    main_col, activity_col = st.columns([3, 1])

    with main_col:
        for product in filtered_products:
            st.markdown(
                f'<div class="item-card"><span class="item-title">{product["name"]}</span><br>'
                f'<span class="item-price">Rp {product["price"]:,.0f}</span></div>',
                unsafe_allow_html=True
            )

    with activity_col:
        st.markdown('<div class="recent-activity"><b>Recent Activity</b><br><br>'
                    'Pupuk SawitPRO 50kg + Abu Janjang 40kg<br>'
                    '<span class="item-price">Rp 1.399.999</span><br><br>'
                    '<b>Content & Specifications</b><br>'
                    'SawitPRO Fertilizer specs:<br>'
                    'Nitrogen (N): 11%<br>'
                    'Phosphorus (P2O5): 5%<br>'
                    'Potassium (K2O): 12%<br>'
                    'Microorganisms: Nitrogen-fixing bacteria, etc.<br><br>'
                    '<button>Add to cart</button> <button>Buy now</button>'
                    '</div>', unsafe_allow_html=True)

# --- Main Chatbot Page ---
if st.session_state.page == "chatbot":
    # Centered chat header and input
    st.markdown('<div class="centered-chat">', unsafe_allow_html=True)
    st.markdown(
        """
        <div class="chat-header">
            <div class="chat-icon">🖥️</div>
            How can I help you today?
        </div>
        """,
        unsafe_allow_html=True
    )
    # Centered input
    with st.form("chat_input_form", clear_on_submit=True):
        user_message = st.text_input("Ask anything", key="chat_input", label_visibility="collapsed", placeholder="Ask anything")
        submitted = st.form_submit_button("➤")
        if submitted and user_message:
            if "chat_history" not in st.session_state:
                st.session_state["chat_history"] = []
            st.session_state["chat_history"].append(f"🧑‍💻 {user_message}")
            st.experimental_rerun()
    st.markdown('</div>', unsafe_allow_html=True)

    import pandas as pd
import os
import threading
import time
import smtplib
from email.mime.text import MIMEText

FEEDBACK_FILE = "feedback.csv"
EMAIL_INTERVAL = 300  # 5 minutes in seconds

def send_feedback_email():
    while True:
        time.sleep(EMAIL_INTERVAL)
        if os.path.exists(FEEDBACK_FILE) and os.path.getsize(FEEDBACK_FILE) > 0:
            df = pd.read_csv(FEEDBACK_FILE)
            if not df.empty:
                msg = MIMEText(df.to_string(index=False))
                msg['Subject'] = 'New User Feedback from PETANNAIK'
                msg['From'] = "your_gmail@gmail.com"
                msg['To'] = "chloewan06@gmail.com"

                try:
                    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                        server.login("your_gmail@gmail.com", "your_app_password")
                        server.send_message(msg)
                    # Clear feedback after sending
                    open(FEEDBACK_FILE, "w").close()
                except Exception as e:
                    print("Failed to send feedback email:", e)

# Start the background thread only once
if "feedback_thread_started" not in st.session_state:
    threading.Thread(target=send_feedback_email, daemon=True).start()
    st.session_state["feedback_thread_started"] = True

# --- Feedback Section ---
st.markdown("---")
st.header("💬 Feedback")
with st.form("feedback_form"):
    user_name = st.text_input("Your Name (optional)")
    user_email = st.text_input("Your Email (optional)")
    feedback_text = st.text_area("Your Feedback", max_chars=1000)
    submitted = st.form_submit_button("Submit Feedback")
    if submitted and feedback_text.strip():
        feedback_entry = {
            "name": user_name,
            "email": user_email,
            "feedback": feedback_text
        }
        # Append feedback to CSV
        df = pd.DataFrame([feedback_entry])
        if os.path.exists(FEEDBACK_FILE) and os.path.getsize(FEEDBACK_FILE) > 0:
            df.to_csv(FEEDBACK_FILE, mode='a', header=False, index=False)
        else:
            df.to_csv(FEEDBACK_FILE, mode='w', header=True, index=False)
        st.success("Thank you for your feedback!")