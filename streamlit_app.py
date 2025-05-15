import streamlit as st

st.set_page_config(page_title="PETANIRAIAK Dashboard", layout="wide")

# Custom CSS for styling
st.markdown("""
    <style>
    .sidebar .sidebar-content {background-color: #4B5D2A;}
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
    st.markdown('<div class="logo">PETANIRAIK</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-title">Menu</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">📊 Dashboard</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">🛒 My Cart</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">⚙️ Settings</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">❓ Help Center</div>', unsafe_allow_html=True)
    st.markdown('<div class="menu-item">ℹ️ About Us</div>', unsafe_allow_html=True)
    st.markdown('<div class="palmpijot">PalmPijot</div>', unsafe_allow_html=True)

# Top bar
col1, col2, col3 = st.columns([3, 1, 1])
with col1:
    st.text_input("Search for items", "")
with col2:
    st.markdown("🛒 0  🔔 0")
with col3:
    st.markdown("Hello, Senderos  \n13 May", unsafe_allow_html=True)

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
    st.markdown('<div class="item-card"><span class="item-title">Pupuk SawitPRO 50kg + Abu Janjang 40kg</span><br><span class="item-price">Rp 315.934,00</span></div>', unsafe_allow_html=True)
    st.markdown('<div class="item-card"><span class="item-title">Kaos Si Broccoli SawitPRO size XL</span><br><span class="item-price">Rp 85.000,00</span></div>', unsafe_allow_html=True)
    st.markdown('<div class="item-card"><span class="item-title">Garlon 670 EC - 1 Liter</span><br><span class="item-price">Rp 299.606,00</span></div>', unsafe_allow_html=True)
    st.markdown('<div class="item-card"><span class="item-title">Furadan 3GR 2Kg</span><br><span class="item-price">Rp 54.503,00</span></div>', unsafe_allow_html=True)
    st.markdown('<div class="item-card"><span class="item-title">Garlon 670 EC - 100ml</span><br><span class="item-price">Rp 49.350,00</span></div>', unsafe_allow_html=True)
    st.markdown('<div class="item-card"><span class="item-title">Bom Up 520 SL - 20 Liter</span><br><span class="item-price">Rp 1.021.558,00</span></div>', unsafe_allow_html=True)

with activity_col:
    st.markdown('<div class="recent-activity"><b>Recent Activity</b><br><br>'
                'Pupuk SawitPRO 50kg + Abu Janjang 40kg<br>'
                '<span class="item-price">Rp 315.934,00</span><br><br>'
                '<b>Content & Specifications</b><br>'
                'SawitPRO Fertilizer specs:<br>'
                'Nitrogen (N): 11%<br>'
                'Phosphorus (P2O5): 5%<br>'
                'Potassium (K2O): 12%<br>'
                'Microorganisms: Nitrogen-fixing bacteria, etc.<br><br>'
                '<button>Add to cart</button> <button>Buy now</button>'
                '</div>', unsafe_allow_html=True)