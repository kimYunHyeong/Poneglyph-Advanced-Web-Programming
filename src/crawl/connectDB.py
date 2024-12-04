import json
from pymongo import MongoClient

# 1. MongoDB 서버에 연결
client = MongoClient("mongodb://127.0.0.1:27017")  # 로컬 MongoDB 서버에 연결
db = client["poneglyph"]  # 'card' 데이터베이스에 연결
collection = db["cards"]  # 'cards' 컬렉션에 연결

# 2. card_data.json 파일 열기
with open("card_data.json", "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

# 3. MongoDB에 데이터 삽입
# 데이터는 배열 형식이므로 여러 개의 문서를 한 번에 삽입합니다.
collection.insert_many(data)

print("데이터가 MongoDB에 성공적으로 저장되었습니다.")
