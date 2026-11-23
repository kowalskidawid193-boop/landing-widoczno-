// api/lead.ts (Vercel). Przekazuje zapytanie z formularza do webhooka Make.
// Adres webhooka NIE jest w kodzie strony, tylko w zmiennych środowiskowych Vercel.
import type { VercelRequest, VercelResponse } from '@vercel/node';

const clip = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return res.status(500).json({ ok: false, error: 'config' });

  const b = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) || {};

  // pułapka na boty: ukryte pole "www" musi być puste
  if (b.www) return res.status(200).json({ ok: true });

  const telefon = clip(b.telefon, 30);
  if (telefon.replace(/\D/g, '').length < 9) return res.status(400).json({ ok: false, error: 'telefon' });
  if (b.zgoda !== true) return res.status(400).json({ ok: false, error: 'zgoda' });

  const payload = {
    imie: clip(b.imie, 120),
    telefon,
    branza: clip(b.branza, 80),
    ekipa: clip(b.ekipa, 40),
    zgoda: true,
    zgoda_data: new Date().toISOString(),
    zrodlo: 'landing-widocznosc',
    secret: process.env.LEAD_WEBHOOK_SECRET || undefined, // w Make filtr: secret = ta sama wartość
  };

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return res.status(502).json({ ok: false });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false });
  }
}
