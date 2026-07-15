import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Зеркальные домики среди леса в 45 минутах от Минска. Баня, купель, барбекю. Бронируйте онлайн."
        />
        <meta property="og:title" content="HVOYA — Зеркальные домики в лесу" />
        <meta
          property="og:description"
          content="Уникальный отдых среди природы. Баня, купель, барбекю. 45 минут от Минска."
        />
        <meta property="og:image" content="/images/hero.jpg" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#1a3220" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <body>
        <Main />
        <NextScript />
      </body>{' '}
    </Html>
  );
}
