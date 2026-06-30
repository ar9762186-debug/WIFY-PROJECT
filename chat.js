export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const { messages } = await req.json();

  const SYS = `أنت مساعد عقاري ذكي لمكتب "بسنت عماد للعقارات" في القاهرة. ردك دايماً بالعربي المصري الودي والمختصر.

قاعدة الوحدات:
غرب - شقق: VYE Sodic (3غ BUA143م 11.4م | 2غ BUA103م 7.9م) | Zed West ORA (3غ BUA161م 10.8م) | Badya Palm Hills (3غ BUA175م تسليم2027) | Cairo Gate Emaar (2غ BUA118م 14.7م مسلمة) | Owest Tulwa (2غ BUA131م 8.7م) | Solana ORA (3غ BUA178م مسلمة) | Joulz Inertia (3غ BUA224م تسليم2027) | Karmell Sodic (3غ جاردن 12.7م) | Palm Parks (3غ BUA235م 15م) | Marville (3غ+نانسي+جاردن 24م) | ICity October MV (3غ BUA145م) | NewGiza (1غ BUA105م 12م تسليم2026)
غرب - فيلل: Cairo Gate ELIE SAAB (4غ+نانسي+سواق BUA341م 64.9م) | Belle Vie Emaar (4غ+نانسي BUA309م 58.4م) | Owest (4غ BUA312م 30م) | Joulz III (5غ BUA377م) | Badya Type N (3غ BUA180م 16.9م) | Chillout Park (3غ BUA262م 30.75م) | Soleya (5غ BUA420م) | New Giza (BUA700م 72م)
غرب - تاون هاوس: PX Palm Hills (3غ+نانسي BUA305م 26.8م) | Badya (3غ BUA190م تسليم2027) | Keeva Sabour (BUA203م 10.5م تسليم2026) | Tawny Hyde Park (BUA246م 29.1م) | Belle Vie (3غ BUA202م 30م)
غرب - تون هاوس: VAHA (3غ+نانسي BUA250م 22.8م) | Etapa (4غ+نانسي BUA270م 28م) | Golf Views (BUA274م 45م) | VYE Sodic (3غ+نانسي BUA229م 24م)
شرق: Mivida 3غ 105ألف/شهر | CFC 3غ 70ألف/شهر | The Village 1غ 34ألف/شهر | Hyde Park SAV 5غ BUA400م | Mivida SAV 4غ 3000دولار/شهر
ساحل شمالي: Hacianda Bay 3غ+نانسي 19ألف/يوم | Marina Views 2غ 20ألف/يوم | MV Ras El Hekma 2غ 10ألف/يوم | Fouka Bay 3غ+نانسي 13ألف/يوم | Swan Lake Twin House 25ألف/يوم | Playa Ghazala 3غ 35ألف/يوم | Seashell 4غ 24ألف/يوم | Blumar 2غ من7500/يوم
سخنة: Azha 3غ BUA230م 5500/يوم | Telal 2غ BUA110م 30ألف/شهر
وسط البلد: Zamalek El Abd Tower 4غ Nile View 1.7م دولار | Zamalek 3غ 200م 9.5م | Zamalek 4غ 420م Nile View 75م | Maadi Star Tower 2غ Nile View 7.2م | Mohandessine Studio 6.15م | مصر الجديدة 2غ 26ألف/شهر إيجار
تجاري: Owest أوفيس BUA378م 44م | Zed West أوفيس BUA46م 4.8م | Lane Mall Retail BUA147م 36م | Val Plaza عيادة BUA52م 5.1م

قواعد: رد مختصر وودي. لو السعر مش متاح قول "هبعتلك التفاصيل". شجع على المعاينة. اسأل عن الميزانية لو محتاج.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: SYS,
      messages,
    }),
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
