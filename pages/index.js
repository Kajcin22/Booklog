import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAuth } from '../components/AuthProvider/auth-provider';
import LandingPage from '../pages/landing-page/index';

export default function Home() {
  const { session } = useAuth();

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Booklog - probuď své sny každodenním čtením</title>
          <meta name="robots" content="all" />
          <meta
            name="description"
            content="knihy, kniha, čtení, četba, deník, čtenářský deník, knihomol, booklog, zápisník, čtení knih, záložky, literatura, titul, autor, statistiky, spisovatel, román. Ze všeho nejdřív je potřeba se registrovat prostřednictvím svého e-mailu. Díky magic linku se vám vytvoří profil, ke kterému budete mít přístup i bez hesla.

            Dále už je používání naprosto jednoduché. Knížku vyhledáte vpravo nahoře pomocí lupy - lze vyhledávat dle názvu knihy, autora nebo ISBN.
            
            Zvolenou knihu tlačítkem Přidat do mých knih přidáte do svého přehledu knih. Přehled knih najdete na záložce Moje knihy. Zde můžeš každou knihu upravovat - nastavit jí kategorii, zda ji právě čteš, máš už přečtenou, nebo ji teprve číst budeš.
            
            Během čtení si můžete dle libosti vytvářet poznámky a také si poznačit, kde jste se čtením skončili. Velkou výhodou virtuální záložky je to, že ji neztratíte :)
            
            Po přečtení můžete knihu ohodnotit. A pokud má v Google API zadán počet stránek, budou se vám i počítat statistiky."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          {session?.user?.email && (
            <h2>
              Vítej, <span className="username">{session?.user?.email}</span>{' '}
            </h2>
          )}
          <LandingPage />
        </div>
      </div>
    </>
  );
}
