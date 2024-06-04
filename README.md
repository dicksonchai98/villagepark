
![2](https://github.com/dicksonchai98/villagepark-vue-project/assets/102925011/dda7d090-1396-40cf-b60b-235c75382406)
# 食品電商平臺
這個是我的第一個功能算完整的專案，專案框架為vue，而選擇電商平臺的主要原因是因爲這是轉職前端最基礎的門檻，而這個專案主要搭配pinia做資料管理，firestore auth做登入登出等驗證，而用戶的購物車資料則儲存在local storage。
## 目錄
1. [Features](#Features)
2. [專案結構](#專案結構)
3. [技術選型](#技術選型)
4. [功能介紹](#功能介紹)

## Features
- 登入登出頁面
- 輪播圖
- sidebar menu
- rwd響應式界面
- 動態頁面
- 新增/刪減購物車
- 搜尋欄
- 過場動畫
## 專案結構
### Assets
專案中用到的所有圖像檔案都放在assets底下做管理，此外，css檔案也同樣放在assests
### Components
過大的單一頁面程式碼往往有許多重複的部分，拆分成細項可以讓之後的維護更加輕鬆，此外，像是footer\navbar等幾乎所有頁面會用到的也會單獨拆出來放在components底下
### Router
頁面跳轉的邏輯都會在這一個檔案底下實現，當中也包括middleware等功能
### Stores
專案中難免會有很多頁面會需要共享同樣的資料或function的地方，而store就是處理資料狀態管理的地方
### Views
專案中所有的頁面都會放在view底下做管理
## 技術選型
- 本專案採用了Vue3框架，並使用了Composition API作為主要的語法風格。
- 狀態管理方面採用了Pinia，以滿足對扁平化共享資料的需求。
- 由於沒有後端支持，身份驗證服務選擇了Firebase Auth作為現成的解決方案。
- 使用Vue Router來處理頁面導航邏輯，鑑於專案資料規模較小，未採用動態導入的方式。
- 透過Middleware方式在Vue Router底層監控使用者狀態，以實現在使用者未登入時禁止存取特定頁面的邏輯。
- 實現輪播圖、過渡動畫等功能時使用了相關的插件工具。
- 專案設計採用Figma進行設計稿的繪製。
- 項目具有響應式設計，覆蓋了手機、平板和筆記本等多種設備尺寸。
- UI方面使用了CSS Modules，以鍛鍊純手寫能力，但在設計原理上融入了Bootstrap的格綫系統概念。
- 由於沒有後端支持，購物車數據無法儲存在db中，因此使用localStorage保存數據，即使重新載入頁面後數據仍然存在。
- 商品資料直接儲存在Pinia中，因此專案中沒有使用API​​呼叫的地方。
## 功能介紹
### 首頁
![image](https://github.com/dicksonchai98/villagepark/assets/102925011/07e3a381-d1ce-4720-b9ca-d6c8f7f57e7c)
### 購物車
![image](https://github.com/dicksonchai98/villagepark/assets/102925011/90f271be-5b70-424b-91e2-1153e1a81271)
### 商品欄
![image](https://github.com/dicksonchai98/villagepark/assets/102925011/5a244159-9014-418a-8fad-ff709742d7db)
### sidebar menu
![image](https://github.com/dicksonchai98/villagepark/assets/102925011/2def5331-4fad-4c7a-a124-6ae01b5c9ce4)
### 結賬
![image](https://github.com/dicksonchai98/villagepark/assets/102925011/40680ea9-511a-40a3-a790-d1de0142fcc4)
### rwd
![image](https://github.com/dicksonchai98/villagepark/assets/102925011/b12b8bca-2f09-4157-9e09-d4b677849402)







