'use client';

interface JsonLdProps {
  data: Record<string, unknown> | object;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}
