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
IMG_DIR = "./img"
os.makedirs(IMG_DIR, exist_ok=True)  # 폴더가 없으면 생성


driver = webdriver.Chrome()
target_url = "https://onepiece-cardgame.kr/cardlist.do"
driver.get(target_url)

time.sleep(3)
last_height = driver.execute_script("return document.body.scrollHeight")
while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2) 

    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break 
    last_height = new_height


html = driver.page_source
soup = BeautifulSoup(html, "html.parser")


try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "modalCol"))
    )

    modal_cols = soup.find_all(class_="modalCol")
    print(f"modalCol 개수: {len(modal_cols)}")

    for idx, modal in enumerate(modal_cols):
        modal_data = {}

        # modalCol 안의 모든 하위 요소 탐색
        for child in modal.find_all(True):
            class_name = " ".join(child.get("class", []))
            text_content = child.text.strip()
            if class_name:
                modal_data[class_name] = text_content

        # frontCol 안의 이미지 태그 찾기
        img_tag = modal.find(class_="frontCol").find("img")
        if img_tag and img_tag.get("src"):
            img_url = img_tag["src"]
            if not img_url.startswith("http"):
                img_url = f"https://onepiece-cardgame.kr{img_url}"  # 상대 경로 처리

            img_response = requests.get(img_url)
            img_filename = f"{IMG_DIR}/image_{idx}.jpg"
            with open(img_filename, "wb") as img_file:
                img_file.write(img_response.content)
            modal_data["img"] = img_filename

        data.append(modal_data)

    # 4. JSON 객체로 변환 및 파일 저장
    json_result = json.dumps(data, ensure_ascii=False, indent=4)
    print(json_result)

    with open("modal_data.json", "w", encoding="utf-8") as f:
        f.write(json_result)

finally:
    driver.quit()


