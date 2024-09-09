import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function BooksPage() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const selectedBook = useSelector((state) => state.cart.selectedBook); // Redux'tan seçili kitabı alıyoruz

  // Tüm kitapları getiren useEffect
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        if (!res.ok) {
          throw new Error("Ürünler getirilirken hata oluştu");
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler getirilirken hata oluştu:", error);
        setError("Ürünler getirilirken bir hata oluştu.");
      }
    };

    getProducts();
  }, []);

  // Önerilen kitapları getiren fonksiyon
  const fetchRecommendations = async (selectedTitle) => {
    try {
      const res = await fetch('http://localhost:5001/api/recommendations');
      if (!res.ok) {
        throw new Error("Öneriler getirilirken hata oluştu");
      }
      const text = await res.text(); // Yanıt metnini al
      console.log("Yanıt Metni:", text); // Yanıt metnini kontrol et
      const data = JSON.parse(text); // JSON formatına dönüştür

      // Seçilen kitabın "antecedents" içinde bulunduğu önerileri filtrele
      const filteredRecommendations = data
        .filter((rec) => rec.antecedents.includes(selectedTitle))
        .map((rec) => rec.consequents) // "consequents" değerlerini al
        .flat(); // Listeyi düzleştir (birleştir)

      // Öneri kitaplarını ürünlerle eşleştir
      const recommendationsWithImages = filteredRecommendations.map(title => {
        const product = products.find(p => p.title === title);
        return product ? { ...product, title } : null;
      }).filter(p => p !== null);

      setRecommendations(recommendationsWithImages);
    } catch (error) {
      console.error("Öneriler getirilirken hata oluştu:", error);
      setError("Öneriler getirilirken bir hata oluştu.");
    }
  };

  // selectedBook değiştiğinde önerileri getir
  useEffect(() => {
    if (selectedBook) {
      fetchRecommendations(selectedBook.title);
    }
  }, [selectedBook]);

  return (
    <div>
      {selectedBook && (
        <div>
          <h3>Seçilen Kitap: {selectedBook.title}</h3>
        </div>
      )}

      {/* Önerilen Kitaplar Bölümü */}
      {recommendations.length > 0 && (
        <div>
          <h3><b>BU KİTABI ALANLARIN BEĞENDİĞİ <br/>DİĞER ÜRÜNLER</b>:</h3>
          <div className="grid grid-cols-2 gap-4"> {/* İki sütunlu grid düzeni */}
            {recommendations.map((rec, index) => (
              <div key={index} className="w-40 h-50 rounded-lg overflow-hidden">
                <img
                  alt={rec.title}
                  src={rec.img} // Resim URL'si
                  className="w-full h-40 object-fill"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-bold text-left">{rec.title}</h3>
                  <p className="text-gray-600 text-sm text-left"><b>Raf Bilgisi: </b>{rec.itemDetail}</p>
                  <p className="text-gray-600 text-sm text-left">{rec.price} ₺</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajını ekrana yazdır */}
    </div>
  );
}

export default BooksPage;
