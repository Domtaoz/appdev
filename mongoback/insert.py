from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# MongoDB Atlas connection string (แทนที่ <username>, <password>, <dbname>)
app.config["MONGO_URI"] = "mongodb+srv://Dompol19:Dompol19@cluster0.gxbxifo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# เพิ่มข้อมูล books ลง MongoDB
@app.route('/seed_books', methods=['POST'])
def seed_books():
    # ข้อมูล books ที่คุณต้องการเพิ่ม
    books = [
        {"title": "The Let Them Theory: A Life-Changing Tool That Millions of People Can't Stop Talking About", 
         "author": "Mel Robbins", 
         "image_url": "https://images-na.ssl-images-amazon.com/images/I/91I1KDnK1kL._AC_UL381_SR381,381_.jpg"},
        {"title": "Forgotten Home Apothecary : 250 Powerful Remedies at Your Fingertips", 
         "author": "Dr. Nicole Apelian", 
         "image_url": "https://images-na.ssl-images-amazon.com/images/I/91-E86oM2IL._AC_UL381_SR381,381_.jpg"},
        {"title": "Seven Things You Can't Say About China", 
         "author": "Tom Cotton", 
         "image_url": "https://images-na.ssl-images-amazon.com/images/I/81+mN748qkL._AC_UL381_SR381,381_.jpg"},
        {"title": "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", 
         "author": "James Clear", 
         "image_url": "https://images-na.ssl-images-amazon.com/images/I/81ANaVZk5LL._AC_UL381_SR381,381_.jpg"}
    ]
    
    # เพิ่มข้อมูลลงใน MongoDB
    result = mongo.db.books.insert_many(books)
    
    return jsonify({"message": f"{len(result.inserted_ids)} books added successfully!"}), 201

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
