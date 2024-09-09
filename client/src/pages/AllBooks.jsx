import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header/Header.jsx";

function AllBooks() {
    const [randomBooks, setRandomBooks] = useState([]);
    const [bookTitles, setBookTitles] = useState([]);
    const [selectedBook, setSelectedBook] = useState("");
    const [recommendedBooks, setRecommendedBooks] = useState([]);

    // Rastgele kitapları almak için API çağrısı
    const getRandomBooks = async () => {
        try {
            const response = await axios.get("http://localhost:5001/get_data");
            let allBooks = response.data;
    
            // Geçerli URL'ye sahip kitapları filtrele
            const validBooks = allBooks.filter(
                book => book['Image-URL-M'] && book['Image-URL-M'].startsWith('http')
            );
    
    
            // Rastgele kitapları seçmek için shuffle ve slice işlemi
            const shuffledBooks = validBooks.sort(() => 0.5 - Math.random()); // Listeyi karıştırır
            const randomSelectedBooks = shuffledBooks.slice(0, 1); // İlk 3 kitabı seçer
    
            setRandomBooks(randomSelectedBooks); // Sadece rastgele seçilen kitapları state'e kaydeder
        } catch (error) {
            console.error("Random books fetch error: ", error);
        }
    };
    
    
    // Kitap isimlerini almak için API çağrısı
    useEffect(() => {
        const fetchBookTitles = async () => {
            try {
                const response = await axios.get('http://localhost:5001/get_book_titles');
                setBookTitles(response.data);  // Gelen kitap isimlerini bookTitles state'ine ata
            } catch (error) {
                console.error('Book titles fetch error: ', error);
            }
        };
    
        fetchBookTitles();
    }, []);

    // Kitap önerilerini almak için API çağrısı
    const fetchRecommendations = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/get_recommendations/${selectedBook}`);
            setRecommendedBooks(response.data);
        } catch (error) {
            console.error("Recommendation fetch error: ", error);
        }
    };

    return (
        <>

        <Header />

        <h1 className="text-4xl font-bold text-center text-blue-600 my-8">
        📖 Kitap Tavsiye Sistemi 📖
      </h1>
      
      <div className="container mx-auto p-4">
        {/* Rastgele Kitaplar Bölümü */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Rastgele Kitaplar</h2>
          <button
            onClick={getRandomBooks}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Rastgele Kitap Önerisi
          </button>
          <div className="flex flex-wrap gap-4 mt-4">
            {randomBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 max-w-xs transform hover:scale-105 transition duration-300"
              >
                <img
                  src={book['Image-URL-M']}
                  alt={book['Book-Title']}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="mt-4">
                  <p className="font-bold text-lg">{book['Book-Title']}</p>
                  <p className="text-gray-700">{book['Book-Author']}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      
        {/* Kitap Önerisi Al Bölümü */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Kitap Önerisi Al</h2>
          <div className="mb-4">
            <select
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Bir kitap seçin</option>
              {bookTitles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchRecommendations}
            disabled={!selectedBook}
            className={`px-4 py-2 ${
              !selectedBook ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
            } text-white rounded-md transition duration-300`}
          >
            Öneri Getir!
          </button>
      
          {recommendedBooks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Önerilen Kitaplar:</h3>
              <ul className="list-disc pl-5">
                {recommendedBooks.map((book, index) => (
                  <li key={index} className="text-gray-800">
                    {book}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      </>
    );
}

export default AllBooks;
