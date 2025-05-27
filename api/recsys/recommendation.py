from uuid import UUID
from typing import List
import joblib
import pandas as pd
import os

from schemas import RecommendedProductListItem

MODEL_DIR = "../"

# User Recommendation
# Load the saved association rule model
association_model = joblib.load(os.path.join(MODEL_DIR, "association_rule_model.pkl"))
rules = association_model['rules']
merged_data = association_model['data']

def get_user_recommendations(user_id: UUID, top_n: int = 10) -> List[RecommendedProductListItem]:
    uid_str = str(user_id)
    user_products = merged_data[merged_data['user_id'] == uid_str]['product_id'].unique()

    recommendation_dict = {}

    for pid in user_products:
        related_rules = rules[rules['antecedents'].apply(lambda x: pid in x)]
        
        for _, row in related_rules.iterrows():
            for consequent in row['consequents']:
                if consequent not in user_products:
                    if consequent not in recommendation_dict or row['lift'] > recommendation_dict[consequent]:
                        recommendation_dict[consequent] = row['lift']

    sorted_recommendations = sorted(recommendation_dict.items(), key=lambda x: x[1], reverse=True)[:top_n]

    results = []
    for product_id, lift in sorted_recommendations:
        product_info = merged_data[merged_data['product_id'] == product_id].dropna(subset=["name"]).drop_duplicates("product_id")
        if not product_info.empty:
            row = product_info.iloc[0]
            results.append(RecommendedProductListItem(
                product_id=product_id,
                name=row["name"],
                category=row.get("type"),
                price=row.get("product_price"),
                recommendation_id=product_id,
                relevance_score=round(float(lift), 4)
            ))

    return results


# --------------------------------------------------------------------------------------------------------
# Product Recommendation
# Load the model once (when the module is imported)
content_model = joblib.load(os.path.join(MODEL_DIR, "content_based_model.pkl"))
cosine_sim = content_model['cosine_sim']
content_df = content_model['content_df']
product_indices = content_model['product_indices']

def get_product_recommendations(product_id: UUID, top_n: int = 10) -> List[RecommendedProductListItem]:
    pid_str = str(product_id)
    if pid_str not in product_indices:
        return []

    idx = product_indices[pid_str]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    results = []
    seen_ids = set()

    for i, score in sim_scores:
        if i >= len(content_df):
            continue

        row = content_df.iloc[i]
        sim_pid = row["product_id"]

        if sim_pid == pid_str or sim_pid in seen_ids:
            continue

        seen_ids.add(sim_pid)

        results.append(RecommendedProductListItem(
            product_id=sim_pid,
            name=row["name"],
            category=row.get("type"),
            price=row.get("product_price"),
            recommendation_id=sim_pid,
            relevance_score=round(float(score), 4) # similarity score
        ))

        if len(results) == top_n:
            break

    return results