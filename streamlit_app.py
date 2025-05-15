import streamlit as st

st.set_page_config(page_title="PETANIRAIAK Dashboard", layout="wide")

# Custom CSS for styling
st.markdown("""
    <style>
    /* Sidebar background */
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
    /* Top menu header background */
    .top-header {
        background-color: #606C38;
        border-radius: 12px;
        padding: 18px 24px 12px 24px;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
    }
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
st.markdown(
    """
    <div class="top-header">
        <div style="flex:3;">
            <input type="text" placeholder="Search for items" 
                style="width:98%;padding:8px 12px;border-radius:8px;
                border:1px solid #ccc;font-size:16px;
                background:#fff;color:#fff;
                ::placeholder { color: #fff; opacity: 1; }">
        </div>
        <div style="flex:1;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:32px;vertical-align:middle;margin-right:18px;">
                🛒 <span style="color:#fff;font-size:20px;vertical-align:middle;margin-left:4px;">0</span>
            </span>
            <span style="font-size:32px;vertical-align:middle;">
                🔔 <span style="color:#fff;font-size:20px;vertical-align:middle;margin-left:4px;">0</span>
            </span>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)

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