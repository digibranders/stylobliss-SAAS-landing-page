import React from 'react';

const ROW1_LOGOS = [
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F1c84da6ef27259706f89486e5083213e68525dba.png%3Fw=448&h=240&q=90&fm=webp&bg=transparent?generation=1770623288619052&alt=media', alt: 'Brand 1', w: 224, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fce97bd05f2995f27f028af786959707b8d094bdb.png%3Fw=308&h=240&q=90&fm=webp&bg=transparent?generation=1770623288703607&alt=media', alt: 'Brand 2', w: 154, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fcfd7be0be458ed8adb9b18ffaa9d637997be8b1d.png%3Fw=376&h=240&q=90&fm=webp&bg=transparent?generation=1770623288683791&alt=media', alt: 'Brand 3', w: 188, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fef89cd4d0e8fa2576fd7bed7ef94736662af6d25.png%3Fw=408&h=240&q=90&fm=webp&bg=transparent?generation=1770623288690371&alt=media', alt: 'Brand 4', w: 204, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fd81f59d4eae430777a9aca788b6fd43007c021d5.png%3Fw=400&h=240&q=90&fm=webp&bg=transparent?generation=1770623288803821&alt=media', alt: 'Brand 5', w: 200, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fbf6588c4bc7ddbeb7f60f959253c983b50547f49.png%3Fw=400&h=240&q=90&fm=webp&bg=transparent?generation=1770623288878985&alt=media', alt: 'Brand 6', w: 200, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fced4e755a5004c257ca5638e7afd490ccb53ed43.png%3Fw=400&h=240&q=90&fm=webp&bg=transparent?generation=1770623288852770&alt=media', alt: 'Brand 7', w: 200, h: 120 },
];

const ROW2_LOGOS = [
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F5c34b8da16b3b87818d932d010ab87d4f718f749.png%3Fw=388&h=240&q=90&fm=webp&bg=transparent?generation=1770623288865871&alt=media', alt: 'Brand 8', w: 194, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Ff6221cd6e5edfb23193535cacc5808b5f2bc6fb6.png%3Fw=400&h=240&q=90&fm=webp&bg=transparent?generation=1770623288951001&alt=media', alt: 'Brand 9', w: 200, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F16e186ed277efd9135ff0bdaecab22d774f9065c.png%3Fw=388&h=240&q=90&fm=webp&bg=transparent?generation=1770623288990534&alt=media', alt: 'Brand 10', w: 194, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fd62d8dd718f85096a4579ccb0b13808190d05a11.png%3Fw=560&h=240&q=90&fm=webp&bg=transparent?generation=1770623289017044&alt=media', alt: 'Brand 11', w: 280, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F6e7bd6ecad35adf61d812e915900bc2305ded45b.png%3Fw=378&h=240&q=90&fm=webp&bg=transparent?generation=1770623289072134&alt=media', alt: 'Brand 12', w: 189, h: 120 },
  { src: 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2Fad8f9a479d19ca8ba98181da8723c48d7f3fae10.png%3Fw=384&h=240&q=90&fm=webp&bg=transparent?generation=1770623289126846&alt=media', alt: 'Brand 13', w: 192, h: 120 },
];

const CARD_HEIGHT = 100;
const CARD_GAP = 14;

function LogoCard({ logo }: { logo: typeof ROW1_LOGOS[0] }) {
  const aspect = logo.w / logo.h;
  const cardWidth = Math.round(CARD_HEIGHT * aspect);

  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-[1.25rem] bg-white"
      style={{
        width: `${cardWidth}px`,
        height: `${CARD_HEIGHT}px`,
        boxShadow: '0 1px 8px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.06)',
      }}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        className="object-contain"
        style={{
          width: `${cardWidth - 36}px`,
          height: `${CARD_HEIGHT - 30}px`,
        }}
        draggable={false}
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
  duration = 35,
}: {
  logos: typeof ROW1_LOGOS;
  direction: 'left' | 'right';
  duration?: number;
}) {
  // Duplicate enough times for seamless loop
  const items = [...logos, ...logos, ...logos, ...logos];

  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight';

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex"
        style={{
          gap: `${CARD_GAP}px`,
          width: 'max-content',
          animation: `${animName} ${duration}s linear infinite`,
        }}
      >
        {items.map((logo, i) => (
          <LogoCard key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div
        className="relative overflow-hidden w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex flex-col" style={{ gap: `${CARD_GAP}px` }}>
          <MarqueeRow logos={ROW1_LOGOS} direction="left" duration={40} />
          <MarqueeRow logos={ROW2_LOGOS} direction="right" duration={38} />
        </div>
      </div>
    </>
  );
}