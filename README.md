# Inventory Dashboard

E-Commerce Inventory & Stock Management Dashboard built with React and Vite.

Muhammad Hud Tariq - 241472

## Run

```
npm install
npm run dev
```

## CSR vs SSR

In client side rendering, which is what this project uses with Vite and React, the server just sends an almost empty HTML file and a JavaScript bundle. The browser downloads the bundle, runs it and React builds the page. So the first load is slower because the user sees a blank page until the JavaScript is ready, but after that moving around the app is fast since everything happens in the browser.

In server side rendering, which Next.js does, the server runs React for every request and sends back finished HTML. The user sees the content quickly and then the JavaScript loads and makes the page interactive (hydration). This means the server has to do real work on every request, so it needs a Node server or serverless functions.

For performance, SSR gives a faster first paint, especially on slow phones and slow internet, but the server response can be slower if the server is busy or the data is slow to fetch. CSR has a slower first paint but later navigation feels smooth and it is cheap to run.

For SEO, SSR is better because search engines and social media previews get the full HTML straight away. Google can run JavaScript for CSR pages but it is slower and less reliable. This matters a lot for public product pages in an online store.

For hosting, a CSR app can be put on any static host like Netlify, Vercel or GitHub Pages for almost no cost. SSR needs a server so it costs more and needs more maintenance.

For this dashboard, which is an internal admin tool behind a login, CSR is fine because SEO does not matter. For the customer facing product pages of the same store, SSR would be the better choice.
