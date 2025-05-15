import streamlit as st

st.set_page_config(page_title="E-Commerce App", layout="wide")

# Header / Landing Page
st.markdown("""
    <style>
    .title {
        font-size:48px;
        font-weight:bold;
        color:#4CAF50;
    }
    .subtitle {
        font-size:24px;
        color:#555;
    }
    </style>
    <div class="title">Welcome to TokoSawit</div>
    <div class="subtitle">Your one-stop platform for agricultural e-commerce</div>
    <hr>
""", unsafe_allow_html=True)

# Placeholder sections for links to features
st.button("🛍️ View Product Recommendations (Coming Soon)")
st.button("🔗 Access Scalable APIs (Coming Soon)")
st.button("💬 Chat with our Bot (Coming Soon)")

