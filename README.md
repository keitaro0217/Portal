This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Basic認証（開発中アプリの簡易アクセス制限）

このアプリは開発中のため、`middleware.ts` でアプリ全体にBasic認証をかけています。
認証情報はコードに直書きせず、環境変数で管理します。

ローカル環境では `.env.local` に以下を設定してください（`.env.local.example` を参考にしてください）。

```bash
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=任意のパスワード
```

`.env.local` は `.gitignore` で除外されているため、GitHubにはアップロードされません。

Vercelにデプロイする場合は、Vercelダッシュボードの **Settings > Environment Variables** に同じ
`BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` を設定してください。

`BASIC_AUTH_USER` または `BASIC_AUTH_PASSWORD` が未設定の場合、Basic認証はスキップされます
（ローカルで環境変数を設定し忘れた場合に誤ってアプリ全体をロックしないための挙動です）。

本格運用時は、このBasic認証を大学アカウント連携やOAuth認証に置き換えることを想定しています。

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
