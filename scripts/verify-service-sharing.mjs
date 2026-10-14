import assert from 'node:assert/strict';

const origin = process.argv[2] || 'http://localhost:3000';
const slugs = ['landing-qr', 'menu-qr', 'web-agenda', 'web-corporativa', 'tienda-online', 'mercado-libre', 'meta-ads', 'google-ads'];
const headers = { 'User-Agent': 'facebookexternalhit/1.1' };

for (const slug of slugs) {
  const page = await fetch(`${origin}/servicios/${slug}?share=2`, { headers });
  assert.equal(page.status, 200, `${slug}: page response`);
  const html = await page.text();
  const tags = html.match(/<meta\s[^>]*>/g) || [];
  const imageTags = tags.filter(tag => tag.includes('property="og:image"'));
  assert.equal(imageTags.length, 1, `${slug}: exactly one Open Graph image`);
  const imageUrl = imageTags[0].match(/content="([^"]+)"/)?.[1];
  assert.equal(imageUrl, `https://www.duggled.com.ar/services-og/${slug}.jpg`);
  assert(tags.some(tag => tag.includes('name="twitter:image"') && tag.includes(imageUrl)));
  const asset = await fetch(`${origin}/services-og/${slug}.jpg`, { headers });
  assert.equal(asset.status, 200, `${slug}: image response`);
  assert.match(asset.headers.get('content-type') || '', /image\/jpeg/);
  const bytes = new Uint8Array(await asset.arrayBuffer());
  assert(bytes.length > 10000, `${slug}: image is not empty`);
  assert.equal(bytes[0], 0xff);
  assert.equal(bytes[1], 0xd8);
  const legacy = await fetch(`${origin}/servicios/${slug}/opengraph-image`, { headers, redirect: 'manual' });
  assert.equal(legacy.status, 307, `${slug}: old image URL redirects`);
  assert.equal(legacy.headers.get('location'), imageUrl);
  console.log(`PASS ${slug}: page, unique OG/Twitter image, JPEG (${bytes.length} bytes), legacy redirect`);
}
