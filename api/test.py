from models.model import MatrixFactorization
import pickle

model = pickle.load(open(r"models/content_based_model.pkl", "rb"))
