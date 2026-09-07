# Advocate Vishnu Sharma Website

Next.js 16 website with MongoDB-powered blogs, consultation enquiries, SEO metadata and a protected administration panel.

## Required setup

Run `npm install`, copy `.env.example` to `.env.local`, fill in every value, then run `npm run dev`. Visit `/admin/login` for administration.

For Vercel, add `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`, then redeploy. Image uploads require `CLOUDINARY_CLOUD_NAME` plus either:

- `CLOUDINARY_UPLOAD_PRESET` configured as an unsigned upload preset; or
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` for signed server-side uploads.

Do not add quotes around values in the Vercel dashboard. Select the Production environment. Blog images are stored in Cloudinary and their secure URLs are stored in MongoDB.

MongoDB creates collections when data is first written. The `contacts` collection is created after the first successful form submission. On the first valid admin login, the app creates the `admins` collection from the configured admin credentials and stores only a salted password hash. Use a long random value for `ADMIN_SESSION_SECRET`.

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
