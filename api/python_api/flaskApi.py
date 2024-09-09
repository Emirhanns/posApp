from flask import Flask, jsonify
import json
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import math


app = Flask(__name__)

CORS(app)


@app.route('/', methods=['GET'])
def home():
    return "Flask sunucusu çalışıyor!"


@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    try:
        with open('oneri_kurallari.json') as f:
            rules = json.load(f)
        return jsonify(rules)
    except Exception as e:
        return jsonify({"error": str(e)}), 500








# NaN, Infinity ve -Infinity değerlerini JSON uyumlu hale getiren fonksiyon
def sanitize_data(data):
    if isinstance(data, float) and (math.isnan(data) or math.isinf(data)):
        return None  # NaN veya Infinity varsa None (null) döner
    return data

# Veri okuma ve JSON uyumlu hale getirme
@app.route("/get_data", methods=["GET"])
def get_data():
    try:
        df = pd.read_csv("Books.csv")  # CSV dosyasını okuyun
        data = df.to_dict(orient="records")
        sanitized_data = [{k: sanitize_data(v) for k, v in row.items()} for row in data]
        return jsonify(sanitized_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_book_titles", methods=["GET"])
def get_book_titles():
    try:
        df = pd.read_csv("kitap_isimleri.csv")  # Kitap isimlerini içeren CSV dosyası
        return jsonify(df["Book-Title"].tolist())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/get_recommendations/<book_title>", methods=["GET"])
def get_Suggestionsrecommendations(book_title):
    try:
        print(f"Seçilen Kitap: {book_title}")  # Hangi kitabın seçildiğini görmek için log ekleyin
        # Pipeline'ı yükle
        pipeline = joblib.load('knn_book_recommender_pipeline.pkl')
        print("Model Yüklendi")  # Modelin doğru yüklendiğini kontrol edin
        df_books = pd.read_csv("kitap_isimleri.csv")  # Kitap isimlerini içeren CSV dosyası
        df_index = pd.read_csv("book_index_tablosu.csv")  # Kitap indeks verilerini içeren CSV dosyası

        # Seçilen kitabın index'ini bul
        print(f"Kitap İndeksi Aranıyor: {book_title}")
        book_index = df_index[df_index['Book-Title'] == book_title].index[0]  # Kitap index'ini bulun
        features = df_index.iloc[book_index, 1:].values.reshape(1, -1)
        print(f"Kitap İndeksi Bulundu: {book_index}, Özellikler: {features}")

        # KNN modelinden öneriler al
        distances, indices = pipeline.named_steps['knn'].kneighbors(features)
        recommended_indices = indices[0]
        print(f"Öneri İndeksleri: {recommended_indices}")

        recommended_books = df_books.iloc[recommended_indices]["Book-Title"].tolist()
        print(f"Önerilen Kitaplar: {recommended_books}")
        return jsonify(recommended_books)
    except Exception as e:
        print(f"Hata: {str(e)}")  # Hata mesajını daha ayrıntılı loglayın
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
