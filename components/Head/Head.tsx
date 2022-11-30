import type { FunctionComponent } from "react";
import Head from "next/head";

type Props = {
  pageTitle: string
};

const NextHead: FunctionComponent<Props> = ({
  pageTitle
}) => {

  return (
    <Head>
      <meta httpEquiv="x-UA-Compatible" content="IE-edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png"/>
      <link rel="manifest" href="favicon/site.webmanifest"/>
      <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5"/>

      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"/> */}

      <meta 
        name="description"
        content="Site de quiz français : créez et jouez à des quizz de culture générale, cinéma, musique, sport, histoire, sciences, ..."
      />

      <title>{pageTitle}</title>
    </Head>
  );
};

export default NextHead;