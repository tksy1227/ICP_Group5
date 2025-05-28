import streamlit as st
import requests
from datetime import datetime

st.set_page_config(page_title="PETANNAIK Prototype", layout="wide")

# --- Product mapping dictionaries ---
product_data = [
    ("0bd2430a-6613-442a-9d5a-11d64cb095ae", "Kaos SIBRONDOL SawitPRO size XL", 100000),
    ("1033503b-8faa-4d5c-97c2-50bb19fbb897", "TSP China Cap Daun 50kg", 945000),
    ("1af0394e-3aea-42b4-8698-b6832e35f8ce", "Petro ZA Plus 50kg", 537800),
    ("2485b082-5258-44c1-b6aa-983387d540a7", "Batara 135 SL - 1 Liter", 86000),
    ("2b8fe2f0-5d07-459c-8781-22305a61980a", "Dolomit Super Inti M-100 50kg", 65000),
    ("369cfbc5-f536-41f5-8a80-267d55dec802", "Kieserite SoluMAG-G 50kg", 435892),
    ("4698d965-a133-4701-838b-f60e38c66b39", "Pupuk SawitPRO 50kg + Abu Janjang 40kg", 1399999),
    ("487f2886-5150-4269-94e2-63fbc7314971", "Bibit Topaz Siap Tanam", 45100),
    ("4cac8d01-b78e-4017-9113-c627ac1866a5", "Urea Nitrea 46% N 50kg", 674500),
    ("5110ed03-9e1e-44bd-913c-4f56de2dcf0b", "Topi SawitPRO Hijau", 35000),
    ("5501ce77-7a08-4086-8dda-858c92326fc6", "Kapur Pertanian Kebomas 50 Kg", 241700),
    ("5952d124-7dc6-4a6a-baa2-e2e502ecd6fe", "Token PLN 100.000", 109000),
    ("6c27fc9c-e7e9-4e9b-9017-292175250df1", "NPK Phonska Plus 15-15-15 25kg", 441142),
    ("6eccf249-a997-4091-8d64-29f1e9accd85", "Metsulindo 20 WP - 250gr", 106200),
    ("701928af-24e9-4a13-aaad-63ede44be9c8", "Bom Up 520 SL - 5 Liter", 502645),
    ("76fddc47-aea9-4942-9dbd-19d90f31cdd4", "Marxone 300 SL - 5 Liter", 499700),
    ("80957603-6cec-4f63-8dcd-aba6ded5cbdd", "MOP/KCL Canada Cap Mahkota 50kg", 712500),
    ("8152e395-0f7a-4dda-8df9-6655a726c4e1", "Pupuk SawitPRO 20kg + Abu Janjang 40kg", 1080000),
    ("89f26d03-4933-4924-ae31-5eef6981122f", "NPK Mahkota 12-12-17-2 TE 50kg", 717250),
    ("8acff85f-f70a-4308-801f-763b22bb25c7", "NPK DGW 13-8-27-4 TE 50kg", 798000),
    ("8df8c2e5-5ad8-490f-83b2-57fa0c961f84", "Meroke Korn Kali B (KKB) 50kg", 762850),
    ("8fcfd7a8-5980-4e7e-b463-6d30823caac4", "Meroke SS - AMMOPHOS 50kg", 940500),
    ("944f4171-813b-4423-ad89-3c73d67f9986", "NPK Sawit 13-8-27-4 0.5 B Pak Tani 50kg", 817000),
    ("9e7cc609-f4ef-4246-89e7-756861e623d8", "Dolomite M-100 50kg", 136440),
    ("a48adaed-ab06-4245-8da6-5d560636a1d9", "Borate Mahkota - 25kg", 1300000),
    ("af58006e-c0d7-44ec-9089-609b74e9ece2", "Bablass 490 SL - 1 Liter", 102700),
    ("b53ce31c-3789-42d7-96a0-5fe058cac7a5", "RP Mahkota 50kg - Egypt", 352688),
    ("b67588d2-e8fe-4ee4-9931-e9d18241d04c", "PRIMASTAR 300/100 SL 5 liter", 230000),
    ("beb17fe4-5d92-4738-adaa-2d62ffb83516", "Urea Nitrea 46% N 50kg - Granul", 356357),
    ("c1d06ac3-5bea-4b4d-8648-ae3fa531f059", "Paket Laporan Pengiriman", 50000),
    ("c2b3d62f-6c48-4051-beb1-3ec66d30c1da", "RP Cap Daun 50Kg", 338200),
    ("c5e57af4-0df9-4e2b-87e4-9024b8e6cf53", "DMA 6 825 SL 400ml", 97000),
    ("c7768e6d-d8d9-469f-960d-879b5401d83c", "Token PLN 200.000", 210000),
    ("d3999f4e-890a-473f-bb92-2fd2178da3fb", "NPK DGW 13-6-27 50kg", 760000),
    ("d8232157-edeb-4ac8-ba5a-0cf53e3c8a06", "Kieserite Mahkota 50kg", 541500),
    ("e41e1522-bbe0-4e9b-b638-5470e82e13a5", "Mahkota ZA 50kg", 497800),
    ("e8898291-543b-439c-907f-bd80075f02a0", "Meroke TSP 50kg", 532500),
    ("ece9fda2-1006-4cf9-a283-74e10b330512", "NPK Mahkota 13-8-27-4 0.5 B 50kg", 883500),
    ("ecef7b49-b297-4c53-bf53-628861221da7", "Pupuk SawitPRO 50kg", 1299999),
    ("fc02857f-92ea-48a1-96b5-95acf43b922e", "Bablass 490 SL - 5 Liter", 469300),
    ("ff58b8c4-1058-4753-bfc0-c04d091c8485", "ZA Cap Daun 50Kg", 439375),
]
product_id_to_name = {pid: name for pid, name, price in product_data}
product_name_to_id = {name: pid for pid, name, price in product_data}
product_id_to_price = {pid: price for pid, name, price in product_data}

# --- Constants ---
USER_ID = "13f5223e-f04a-4fa8-9ef2-cf36060f0d6d"
RECOMMEND_API = f"http://127.0.0.1:8000/api/v1/ecommerce/recommendations/user/{USER_ID}"
PRODUCT_RECOMMEND_API_BASE = "http://127.0.0.1:8000/api/v1/ecommerce/recommendation/product/"
CHATBOT_API = "http://127.0.0.1:8000/api/v1/messaging/chatbot"
GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw3_zKeRDeV5yOg0FaZcsTq00KYvaiB7Qsh9RHbwis4NlnE-ddydgX6byYhYV-NNO9D/exec"

# --- Navigation helpers ---
def go_to_chatbot():
    st.session_state.page = "chatbot"

def go_to_main():
    st.session_state.page = "main"

def go_to_feedback():
    st.session_state.page = "feedback"

def go_to_product_details(product):
    st.session_state.selected_product = product
    st.session_state.page = "product_details"

def go_to_search():
    st.session_state.page = "search"

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
    [data-testid="stSidebar"] * {
        color: #fff !important;
        font-weight: 400;
    }
    [data-testid="stSidebar"] input, 
    [data-testid="stSidebar"] textarea {
        background: #4B5D2A !important;
        color: #fff !important;
        border: 1px solid #fff !important;
    }
    [data-testid="stSidebar"] .stSelectbox div[role="button"] {
        background: #4B5D2A !important;
        color: #fff !important;
    }
    [data-testid="stSidebar"] .stSlider label,
    [data-testid="stSidebar"] .stSlider span {
        color: #fff !important;
    }
    [data-testid="stSidebar"] button {
        background: #283618 !important;
        color: #fff !important;
        border: 1px solid #fff !important;
        font-weight: bold !important;
    }
    [data-testid="stSidebar"] {
        box-shadow: none !important;
    }
    </style>
""", unsafe_allow_html=True)

# --- Session State ---
if "page" not in st.session_state:
    st.session_state.page = "main"
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
if "selected_product" not in st.session_state:
    st.session_state.selected_product = None

# --- Sidebar ---
if st.session_state.page == "chatbot":
    with st.sidebar:
        st.image("images/palmpilot_logo.png", width=300)
        st.button("⬅️ Back to Dashboard", use_container_width=True, on_click=go_to_main)
        st.button("Search Products", key="search_products_btn1", use_container_width=True, on_click=go_to_search)
        st.button("Feedback", key="feedback_btn_sidebar", help="Go to Feedback", use_container_width=True, on_click=go_to_feedback)
        st.markdown('<div style="color:#fff; font-size:22px; margin-top:10px; font-weight:bold;">🖥️ PalmPilot Chatbot</div>', unsafe_allow_html=True)
        st.markdown('<div style="color:#fff; font-size:15px; margin-bottom:16px;">This chatbot is created using the open-source Llama 2 LLM model from Meta.</div>', unsafe_allow_html=True)
elif st.session_state.page == "feedback":
    with st.sidebar:
        st.image("images/petannaik_logo.png", width=300)
        st.markdown('<div class="menu-title">Menu</div>', unsafe_allow_html=True)
        st.button("⬅️ Back to Dashboard", use_container_width=True, on_click=go_to_main)
        st.button("Search Products", key="search_products_btn2", use_container_width=True, on_click=go_to_search)
        st.button("Chatbot", key="palmpilot_logo_btn", help="Go to Chatbot", use_container_width=True, on_click=go_to_chatbot)
elif st.session_state.page == "product_details":
    with st.sidebar:
        st.image("images/petannaik_logo.png", width=300)
        st.markdown('<div class="menu-title">Menu</div>', unsafe_allow_html=True)
        st.button("⬅️ Back to Dashboard", use_container_width=True, on_click=go_to_main)
        st.button("Search Products", key="search_products_btn3", use_container_width=True, on_click=go_to_search)
        st.button("Chatbot", key="palmpilot_logo_btn", help="Go to Chatbot", use_container_width=True, on_click=go_to_chatbot)
        st.button("Feedback", key="feedback_btn", help="Go to Feedback", use_container_width=True, on_click=go_to_feedback)
elif st.session_state.page == "search":
    with st.sidebar:
        st.image("images/petannaik_logo.png", width=300)
        st.markdown('<div class="menu-title">Menu</div>', unsafe_allow_html=True)
        st.button("⬅️ Back to Dashboard", use_container_width=True, on_click=go_to_main)
        st.button("Chatbot", key="palmpilot_logo_btn", help="Go to Chatbot", use_container_width=True, on_click=go_to_chatbot)
        st.button("Feedback", key="feedback_btn", help="Go to Feedback", use_container_width=True, on_click=go_to_feedback)
else:
    with st.sidebar:
        st.image("images/petannaik_logo.png", width=300)
        st.markdown('<div class="menu-title">Menu</div>', unsafe_allow_html=True)
        st.button("Chatbot", key="palmpilot_logo_btn", help="Go to Chatbot", use_container_width=True, on_click=go_to_chatbot)
        st.button("Search Products", key="search_products_btn4", use_container_width=True, on_click=go_to_search)
        st.button("Feedback", key="feedback_btn", help="Go to Feedback", use_container_width=True, on_click=go_to_feedback)

# --- Main Page ---
if st.session_state.page == "main":
    st.markdown('<div class="welcome">Welcome Back</div>', unsafe_allow_html=True)
    st.markdown('<div class="subtitle">Get your latest update for the last 7 days</div>', unsafe_allow_html=True)

    # Order summary
    st.markdown("""
    | Item | Pick-Up Date & Time | Pick-Up Location |
    |------|---------------------|------------------|
    | Pupuk SawitPRO 50kg + Abu Janjang 40kg | 16/5/2025, 4:00 PM | Jakarta, Indonesia |
    """)

    # --- Get recommendations from API ---
    try:
        rec_response = requests.get(RECOMMEND_API)
        if rec_response.status_code == 200:
            rec_json = rec_response.json()
            recommended_products = []
            for group in rec_json.get("items", []):
                recommended_products.extend(group.get("Items", []))
        else:
            recommended_products = []
    except Exception as e:
        recommended_products = []
        st.error("Could not fetch recommendations.")

    # --- Search Bar ---
    search_query = st.text_input("Search for products...", "")

    # --- Filter Products ---
    if search_query:
        filtered_products = [p for p in recommended_products if search_query.lower() in p["name"].lower()]
    else:
        filtered_products = recommended_products

    # --- Main content: Available Items and Recent Activity ---
    main_col, activity_col = st.columns([3, 1])

    with main_col:
        st.markdown("### 🔥 Recommended for You")
        for product in filtered_products[:10]:
            st.markdown(
                f'<div class="item-card"><span class="item-title">{product["name"]}</span><br>'
                f'<span class="item-price">Rp {product["price"]:,.0f}</span></div>',
                unsafe_allow_html=True
            )
            if st.button("View Details", key=f"details_{product['product_id']}"):
                go_to_product_details(product)
                st.rerun()

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

# --- Product Details Page ---
elif st.session_state.page == "product_details":
    product = st.session_state.selected_product
    if not product:
        st.warning("No product selected.")
        st.session_state.page = "main"
        st.rerun()
    st.title(product["name"])
    st.markdown(f'<div class="item-card"><span class="item-title">{product["name"]}</span><br>'
                f'<span class="item-price">Rp {product["price"]:,.0f}</span></div>',
                unsafe_allow_html=True)

    # --- Frequently Bought Together ---
    product_id = product["product_id"]
    product_rec_api = f"{PRODUCT_RECOMMEND_API_BASE}{product_id}"
    try:
        cluster_response = requests.get(product_rec_api)
        if cluster_response.status_code == 200:
            cluster_json = cluster_response.json()
            cluster_products = []
            for group in cluster_json.get("items", []):
                cluster_products.extend(group.get("Items", []))
        else:
            cluster_products = []
    except Exception as e:
        cluster_products = []
        st.error("Could not fetch cluster recommendations.")

    st.markdown("#### 🛒 Frequently Bought Together")
    for p in cluster_products[:3]:
        st.markdown(
            f'<div class="item-card"><span class="item-title">{p["name"]}</span><br>'
            f'<span class="item-price">Rp {p["price"]:,.0f}</span></div>',
            unsafe_allow_html=True
        )

# --- Search Products Page ---
elif st.session_state.page == "search":
    st.title("Search Products")
    all_products = [{"product_id": pid, "name": name, "price": price} for pid, name, price in product_data]
    search_query = st.text_input("Search for a product...", "")
    if search_query:
        filtered = [p for p in all_products if search_query.lower() in p["name"].lower()]
    else:
        filtered = all_products

    st.markdown(f"**{len(filtered)} products found**")
    for product in filtered:
        st.markdown(
            f'<div class="item-card"><span class="item-title">{product["name"]}</span><br>'
            f'<span class="item-price">Rp {product["price"]:,.0f}</span><br>'
            f'<span style="font-size:12px;color:#888;">ID: {product["product_id"]}</span></div>',
            unsafe_allow_html=True
        )
        if st.button("View Details", key=f"search_details_{product['product_id']}"):
            st.session_state.selected_product = {
                "product_id": product["product_id"],
                "name": product["name"],
                "price": product["price"]
            }
            st.session_state.page = "product_details"
            st.rerun()

# --- Chatbot Page ---
elif st.session_state.page == "chatbot":
    st.title("PalmPilot Chatbot")

    # Add a "Clear Chat" button
    if st.button("🗑️ Clear Chat"):
        st.session_state["chat_history"] = []
        st.rerun()

    if "chat_history" not in st.session_state:
        st.session_state["chat_history"] = []
    for msg in st.session_state["chat_history"]:
        st.markdown(msg)
    with st.form("chat_input_form", clear_on_submit=True):
        user_message = st.text_input(
            "Ask anything", key="chat_input", label_visibility="collapsed", placeholder="Ask anything"
        )
        submitted = st.form_submit_button("➤")
        if submitted and user_message:
            try:
                response = requests.post(
                    CHATBOT_API,
                    json={
                        "user_id": USER_ID,
                        "message": user_message
                    }
                )
                if response.status_code == 200:
                    bot_reply = response.json().get("message", "")
                    if not bot_reply:
                        bot_reply = "Sorry, I didn't understand that."
                    st.session_state["chat_history"].append(f"🧑‍💻 {user_message}")
                    st.session_state["chat_history"].append(f"🤖 {bot_reply}")
                else:
                    st.session_state["chat_history"].append(f"🧑‍💻 {user_message}")
                    st.session_state["chat_history"].append("🤖 Sorry, there was an error.")
            except Exception as e:
                st.session_state["chat_history"].append(f"🧑‍💻 {user_message}")
                st.session_state["chat_history"].append("🤖 Sorry, there was an error connecting to the chatbot API.")
            st.rerun()

# --- Feedback Page ---
elif st.session_state.page == "feedback":
    st.title("Feedback Form")
    with st.form("feedback_form"):
        name = st.text_input("Name")
        email = st.text_input("Email")
        feedback = st.text_area("Feedback")
        submitted = st.form_submit_button("Send Feedback")
        if submitted:
            timestamp = datetime.utcnow().isoformat() + "Z"
            new_data = {
                "name": name,
                "email": email,
                "feedback": feedback,
                "timestamp": timestamp
            }
            try:
                response = requests.post(GAS_WEB_APP_URL, json=new_data)
                if response.status_code == 200:
                    st.success("Thank you! Your feedback has been sent and saved.")
                else:
                    st.error(f"Error sending feedback: HTTP {response.status_code}")
            except Exception as e:
                st.error(f"Error sending feedback: {e}")