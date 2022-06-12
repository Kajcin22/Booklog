import styles from './Navod.module.css';
import { useAuth } from '../../components/AuthProvider/auth-provider';
import Image from 'next/image';

export default function Home() {
  const { session } = useAuth();

  return (
    <>
      <div className={styles.welcome}>
        <div className={styles.welcome_user}>
          <h2>
            Vítej, {<span className="username">{session?.user?.email}</span>}
          </h2>
          <div className={styles.welcome_user_img}>
            <Image
              width={300}
              height={200}
              src="/hero_img_old.png"
              alt="icon"
            />
          </div>
        </div>

        <h3>Jak používat Booklog?</h3>
        <p>
          Knížku vyhledáš pomocí lupy{' '}
          <button className={styles.text_icon_search}></button>
          vpravo nahoře - vyhledávat lze podle <strong>
            názvu, autora
          </strong>{' '}
          nebo čísla <strong>ISBN</strong>.
        </p>
        <p>
          Zvolenou knihu přidej tlačítkem{' '}
          <span className={styles.text_button}>Přidat do mých knih</span> a
          následně ji můžeš zobrazit v sekci
        </p>
        <h4>Moje knihy</h4>
        <p>
          Správný knihomol si ve své četbě udržuje pořádek - každé knížce můžeš
          nastavit <span className={styles.highlight}>kategorii</span>{' '}
          <span className={styles.text_button_category}>Právě čtu</span>,
          <span className={styles.text_button_category}>Chci si přečíst</span>{' '}
          nebo <span className={styles.text_button_category}>Přečteno</span>{' '}
          podle aktuální fáze tvého čtenářského cyklu.
        </p>
        <p>
          Pomocí hvězdiček <button className={styles.text_icon_rate}></button>{' '}
          pak ohodnotíš, jak se ti knížka líbila. Po kliknutí na tlačítko{' '}
          <span className={styles.text_button}>upravit</span> u náhledu se můžeš
          pustit do vytváření <span className={styles.highlight}>poznámek</span>{' '}
          ke své knížce.{' '}
        </p>
        <div>
          Můžeš si zde také poznačit číslo stránky, na které jsi naposledy
          skončil(a) - velká výhoda{' '}
          <span className={styles.highlight}>virtuální záložky</span> je ta, že
          ji neztratíš. Při opětovném zadání čísla stránky se záložka
          automaticky updatuje.{' '}
        </div>

        <p>
          Když budeš pravidelně přidávat knížky a ukládat záložky, Booklog z
          tvých dat vytvoří tvoji osobní
          <span className={styles.highlight}> čtenářskou statistiku</span>,
          kterou nalezneš v sekci nečekaně nazvané
        </p>
        <h4>Statistika</h4>
        <p>
          Nalezneš zde přehled <strong>počtu přečtených knížek</strong>,{' '}
          <strong>stránek</strong>, <strong>progres</strong> v rozečtených
          titulech a <strong>tipy na další četbu</strong>.
        </p>
      </div>
    </>
  );
}
