## 其他加分題目

### Question:

如果影片想要設計試看功能，請問怎麼設計比較好。舉例，一個影片長30mins，但試看只能看前 5 mins。
影片來源需是 m3u8 格式。

設計想法 並不侷限在前端操作行為，可自由發揮。(本題無需實作，只需說明solution 即可)

### Answer:

後端:

following_list 和 for_you_list (以下簡稱為 API) 根據 token 判斷該 user 有是否有權限觀看完整影片：

- 若有權限觀看完整影片，則 response 完整版的 m3u8
- 若沒有權限觀看完整影片，則 response 試看版的 m3u8

前端:

於 request API 時帶 token 給後端，若 user 沒有權限觀看完整影片，
request 僅會得到試看版本的 m3u8，因此需要於播放結束時顯示 dialog 提示 user 如何可以觀看完整影片。

若 user 於前端達成了可以觀看完整影片的條件則 refresh token，並重新 request API 以得到完整版的 m3u8 即可觀看完整影片。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
