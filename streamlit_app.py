import streamlit as st

st.set_page_config(page_title="PETANNAIK Prototype", layout="wide")

# Custom CSS for styling
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
    </style>
""", unsafe_allow_html=True)

# Sidebar
with st.sidebar:
    st.image("images/petannaik_logo.png", width=300)
    st.markdown('<div class="menu-title">Menu</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">📊 Dashboard</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">🛒 My Cart</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">⚙️ Settings</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">❓ Help Center</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">ℹ️ About Us</div>', unsafe_allow_html=True)
    st.image("images/palmpilot_logo.png", width=260)

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