import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
import time
import json

data = []

#쓸데 없는 속성 지우기
# 1. JSON 파일 불러오기
with open("modal_data.json", "r", encoding="utf-8") as json_file:
    data = json.load(json_file)

##############attribute제거######################################
# 2. 제거할 attribute 리스트
attributes_to_remove = ["scrollBtn", "infoCol","frontCol","commonBtn textViewBtn","backCol","col2","commonBtn cardViewBtn"]

# 3. 특정 attribute들 제거하기
for item in data:
    for attribute in attributes_to_remove:
        if attribute in item:
            del item[attribute]  # 속성 제거

##################################################################

############################ 포멧 수정####################################
#타입 수정하기
def clean_attribute(s):
    if isinstance(s, str):
        s = s.lstrip("속성\n\n\t\t")
        s = s.replace(" ", "")
    return s
for item in data:
    if "attribute" in item:
        item["attribute"] = clean_attribute(item["attribute"])


#컬러 수정하기
def clean_color(s):
    if isinstance(s, str):
        s = s.lstrip("컬러")
    return s
for item in data:
    if "color" in item:
        item["color"] = clean_color(item["color"])

#특징 수정하기
def clean_feature(s):
    if isinstance(s, str):
        s = s.lstrip("특징")
    return s
for item in data:
    if "feature" in item:
        item["feature"] = clean_feature(item["feature"])

#텍스트 수정하기
def clean_text(s):
    if isinstance(s, str):
        s = s.lstrip("텍스트")
    return s
for item in data:
    if "text" in item:
        item["text"] = clean_text(item["text"])

#입수방법 수정하기
def clean_getInfo(s):
    if isinstance(s, str):
        s = s.lstrip("입수방법")
    return s
for item in data:
    if "getInfo" in item:
        item["getInfo"] = clean_getInfo(item["getInfo"])

#입수방법 수정하기
def clean_power(s):
    if isinstance(s, str):
        s = s.lstrip("파워")
    return s
for item in data:
    if "power" in item:
        item["power"] = clean_power(item["power"])

#입수방법 수정하기
def clean_counter(s):
    if isinstance(s, str):
        s = s.lstrip("카운터")
    return s
for item in data:
    if "counter" in item:
        item["counter"] = clean_counter(item["counter"])

def clean_and_format_text(s):
    if isinstance(s, str):
        parts = s.split("】")
        # '】' 이후에 공백을 추가하여 한 줄씩 띄어쓰기
        formatted_string = "】\n".join([part.strip() for part in parts])
        return formatted_string
    return s
for item in data:
    if "text" in item:
        item["text"] = clean_and_format_text(item["text"])



for item in data:
    if "img" in item and "/img/" in item["img"]:
        item["img"] = item["img"].replace("./img/", "/images/card_img/")  # '/img/'를 '/images/card_img/'로 교체

###################################################################


# 4. 수정된 데이터 다시 저장하기
with open("card_data.json", "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print("여러 attribute 제거 후 파일 저장 완료: card_data.json")


# 최종 데이터 개수 확인
print("총 데이터 개수:", len(data))

