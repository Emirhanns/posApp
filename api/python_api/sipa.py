from pymongo import MongoClient
import pandas as pd
import json
from bson.json_util import dumps
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
import os  # Dosya işlemleri için os modülü

pd.set_option('display.max_columns', None)

# MongoDB bağlantı URI'si
MONGO_URI = 'mongodb+srv://admin2:admin2@cluster0.d0zap2c.mongodb.net/pos,-app?retryWrites=true&w=majority&appName=Cluster0'

# MongoClient oluşturma
client = MongoClient(MONGO_URI)
db = client["pos-app"]  # "pos-app" veritabanı
collection = db["bills"]

# Veritabanı değişikliklerini dinleme fonksiyonu
def process_orders():
    # Siparişleri çekme
    siparisler = [
        [kitap["title"] for kitap in siparis.get("cartItems", [])]
        for siparis in collection.find()
    ]
    
    # Sonuç
    print(siparisler)

    # Apriori ve Association kuralları
    te = TransactionEncoder()
    te_ary = te.fit(siparisler).transform(siparisler)
    df = pd.DataFrame(te_ary, columns=te.columns_)
    print(df)

    frequent_itemsets = apriori(df, min_support=0.1, use_colnames=True)
    print(frequent_itemsets)

    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.4)
    print(rules)

    # JSON olarak kuralları kaydetme
    current_directory = os.path.dirname(os.path.abspath(__file__))  # Kodun bulunduğu dizini al
    file_path = os.path.join(current_directory, "oneri_kurallari.json")  # Dosya yolu
    
    # Eğer dosya zaten varsa, sil
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"Eski {file_path} dosyası silindi.")
    
    # Yeni dosyayı kaydet
    rules_json = rules.to_json(orient="records")
    with open(file_path, "w") as f:
        f.write(rules_json)
    
    print(f"Kurallar güncellendi ve {file_path} dosyasına kaydedildi.")

# Veritabanında değişiklikleri izlemek için change stream kullanma
with collection.watch() as stream:
    print("Veritabanı değişikliklerini dinliyor...")
    for change in stream:
        if change["operationType"] == "insert":
            print("Yeni bir belge eklendi:", dumps(change["fullDocument"]))
            process_orders()  # Yeni veri eklendiğinde Apriori algoritmasını çalıştır
