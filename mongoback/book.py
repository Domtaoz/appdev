from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import uuid

# ตั้งค่า Flask
app = Flask(__name__)
CORS(app)

# ตั้งค่าการเชื่อมต่อ MongoDB Atlas
app.config["MONGO_URI"] = "mongodb+srv://Dompol19:Dompol19@cluster0.gxbxifo.mongodb.net/book?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Read (GET) operation - Get all books
@app.route('/books', methods=['GET'])
def get_all_books():
    books = []
    for book in mongo.db.book.find():  # ใช้ collection 'book' จาก database 'bookstore'
        book["id"] = str(book["id"])  # ให้ id เป็นฟิลด์หลัก
        books.append(book)
    return jsonify({"books": books})

# Read (GET) operation - Get a specific book by ID
@app.route('/books/<book_id>', methods=['GET'])
def get_book(book_id):
    book = mongo.db.book.find_one({"id": book_id})  # ค้นหาหนังสือโดยใช้ "id"
    if book:
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404

# Create (POST) operation - Create a new book
@app.route('/books', methods=['POST'])
def create_book():
    new_book = request.json
    # นับจำนวนหนังสือทั้งหมดในฐานข้อมูล book เพื่อกำหนด id ใหม่
    current_book_count = mongo.db.book.count_documents({})  # นับเอกสารทั้งหมดใน collection 'book'
    new_id = current_book_count + 1  # ตั้งค่า id เป็นจำนวนเอกสาร + 1

    # สร้างข้อมูลหนังสือใหม่
    new_book_data = {
        "id": new_id,  # ใช้ id ที่กำหนด
        "title": new_book["title"],
        "author": new_book["author"],
        "image_url": new_book["image_url"]
    }

    # เพิ่มข้อมูลหนังสือใหม่ใน MongoDB
    mongo.db.book.insert_one(new_book_data)
    
    return jsonify(new_book_data), 201

# Update (PUT) operation - Update an existing book
@app.route('/books/<book_id>', methods=['PUT'])
def update_book(book_id):
    updated_book = request.json
    mongo.db.book.update_one(
        {"id": book_id},  # ใช้ "id" แทน "_id"
        {"$set": updated_book}
    )
    updated_book["id"] = book_id  # เพิ่ม "id" ในการตอบกลับ
    return jsonify(updated_book)

# Delete (DELETE) operation - Delete a book
@app.route('/books/<book_id>', methods=['DELETE'])
def delete_book(book_id):
    result = mongo.db.book.delete_one({"id": book_id})  # ใช้ "id" แทน "_id"
    if result.deleted_count == 1:
        return jsonify({"message": "Book deleted successfully"}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
