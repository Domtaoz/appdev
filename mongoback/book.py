from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

# ตั้งค่า Flask
app = Flask(__name__)
CORS(app)

# ตั้งค่าการเชื่อมต่อ MongoDB Atlas
app.config["MONGO_URI"] = "mongodb+srv://Dompol19:Dompol19@cluster0.gxbxifo.mongodb.net/book?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/books', methods=['GET'])
def get_all_books():
    books = []
    for book in mongo.db.book.find():
        books.append({
            "id": book["id"],  
            "title": book["title"],
            "author": book["author"],
            "image_url": book["image_url"]
        })
    return jsonify({"books": books})

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = mongo.db.book.find_one({"id": book_id})
    if book:
        return jsonify({
            "id": book["id"],
            "title": book["title"],
            "author": book["author"],
            "image_url": book["image_url"]
        })
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books', methods=['POST'])
def create_book():
    new_book = request.json

    # ดึงรายการหนังสือล่าสุดที่มี id มากที่สุด
    last_book = list(mongo.db.book.find().sort("id", -1).limit(1))

    # ถ้ามีหนังสือ ให้ใช้ค่า id ล่าสุด + 1, ถ้าไม่มีให้เริ่มที่ 1
    new_id = (last_book[0]["id"] + 1) if last_book else 1

    new_book_data = {
        "id": new_id,  # ใช้ id เป็นตัวเลข
        "title": new_book["title"],
        "author": new_book["author"],
        "image_url": new_book["image_url"]
    }
    
    mongo.db.book.insert_one(new_book_data)

    return jsonify(new_book_data), 201


@app.route('/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    updated_book = request.json
    result = mongo.db.book.update_one(
        {"id": book_id},
        {"$set": updated_book}
    )
    if result.matched_count == 1:
        updated_book["id"] = book_id
        return jsonify(updated_book)
    else:
        return jsonify({"error": "Book not found"}), 404

# Delete (DELETE) operation - Delete a book
@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    result = mongo.db.book.delete_one({"id": book_id})  
    if result.deleted_count == 1:
        return jsonify({"message": "Book deleted successfully"}), 200
    else:
        return jsonify({"error": "Book not found"}), 404
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
