const deploymentHost=process.env.VERCEL_PROJECT_PRODUCTION_URL||process.env.VERCEL_URL;
export const siteOrigin=(process.env.NEXT_PUBLIC_SITE_URL||(deploymentHost?'https://'+deploymentHost:'http://localhost:3000')).replace(/\/$/,'');
