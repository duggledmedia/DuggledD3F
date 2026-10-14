'use client';

import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';
import { siteOrigin } from '@/lib/site-url';

type Props = { slug: string; label: string; className?: string };

export default function ShareService({ slug, label, className }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    // A fresh share URL avoids reusing previews cached before the image fix.
    const url = `${siteOrigin}/servicios/${slug}?share=2`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${label} | Duggled`, text: `${label}, una solución de Duggled para hacer avanzar tu negocio.`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
  }

  return <button type="button" className={className} onClick={share} aria-label={`Compartir ${label}`}>{copied ? <Check size={18} aria-hidden="true" /> : <Share2 size={18} aria-hidden="true" />}<span>{copied ? 'Enlace copiado' : 'Compartir'}</span></button>;
}
