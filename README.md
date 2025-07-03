# ShopStream - 現代化電商促銷頁面

一個完全響應式的現代化電商促銷單頁應用，使用 Next.js 與 Tailwind CSS 製作。本專案作為電商平台的促銷活動展示模板，兼具視覺吸引力與高效能表現。

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge\&logo=github)](https://mia-sheep-su.github.io/PromotionsSales/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?style=for-the-badge\&logo=github)](https://github.com/Mia-Sheep-Su/PromotionsSales)

---

## 🌟 專案簡介

這是一個用於展示限時促銷活動的單頁式應用（SPA），提供動態商品展示、詳細商品資訊、購物車功能，以及現代化的 UI 設計。此專案特別強調快速載入與跨裝置相容性，並支援部署至 GitHub Pages。

> 💡 本次開發中，也特別運用了 **Firebase Studio** 的 AI 輔助功能進行畫面設計構想與元件結構規劃，展現 AI 工具的整合與應用能力，提升開發效率與設計一致性。

---

## ✨ 核心功能

* **響應式設計**：適應各種裝置，包含手機、平板與桌面。
* **動態商品展示**：從外部 API 取得商品並以網格呈現。
* **無限捲動**：使用者下滑時自動載入更多商品。
* **進階篩選與排序**：可依分類、價格、名稱與評分進行篩選與排序。
* **互動式輪播**：促銷橫幅與顧客評論輪播，自動播放效果。
* **倒數計時器**：實時顯示促銷倒數，提升緊迫感。
* **購物車功能**：前端實作的購物車，可加入、移除與檢視商品。
* **靜態網站生成（SSG）**：使用 `output: 'export'` 建構，可直接部署至靜態網站平台。
* **自動化部署**：整合 GitHub Actions，自動部署至 GitHub Pages。

---

## 🛠️ 技術堆疊

本專案使用以下現代化開發工具與框架：

* [**Next.js**](https://nextjs.org/) - React 的進階框架
* [**React**](https://reactjs.org/) - 用於構建 UI 的 JavaScript 函式庫
* [**TypeScript**](https://www.typescriptlang.org/) - 靜態型別的 JavaScript 擴充
* [**Tailwind CSS**](https://tailwindcss.com/) - 實用導向的 CSS 框架
* [**ShadCN UI**](https://ui.shadcn.com/) - 基於 Radix UI 與 Tailwind 的可重用元件
* [**Lucide React**](https://lucide.dev/) - 一致且優雅的圖示
* [**Fake Store API**](https://fakestoreapi.com/) - 模擬商品資料的免費 API

---

## 🚀 快速開始

如果你想在本地端執行此專案，可依以下步驟操作。

### 先備條件

請確認已安裝下列工具：

* **Node.js**
* **npm**（建議更新至最新版本）

  ```bash
  npm install npm@latest -g
  ```

### 安裝步驟

1. **複製此專案**

   ```bash
   git clone https://github.com/Mia-Sheep-Su/PromotionsSales.git
   ```

2. **進入專案資料夾**

   ```bash
   cd PromotionsSales
   ```

3. **安裝依賴套件**

   ```bash
   npm install
   ```

### 啟動開發環境

啟動本地伺服器（預設在 `http://localhost:3000`）：

```bash
npm run dev
```

### 建立正式版

若要產出可部署的靜態網站版本：

```bash
npm run build
```

產出將儲存於 `./out` 資料夾，可直接部署。

---

## 🚀 部署方式

此專案內建 `.github/workflows/deploy.yml`，設定了 GitHub Actions 流程，自動將主分支的內容部署到 `gh-pages` 分支。

若要在自己的倉庫啟用部署功能：

1. 前往你的 GitHub 倉庫設定頁面：**Settings > Pages**
2. 在「Build and deployment」中，選擇「Deploy from a branch」
3. 設定來源為 `gh-pages` 分支（第一次 push 後會自動建立）
4. 若倉庫名稱不是 `<你的使用者名稱>.github.io`，請記得調整 `next.config.ts` 中的 `basePath` 與 `assetPrefix` 以符合路徑

---

## 💖 特別致謝

感謝您閱讀與使用本專案！歡迎依據需求進行客製化與延伸。

本專案由 [Mia-Sheep-Su](https://github.com/Mia-Sheep-Su) 製作，並結合 **Firebase Studio** 的 AI 協助工具，實踐 AI 輔助開發的流程。

