import styles from './Domu.module.css';

export default function Home() {
  return (
    <>
      <div className="container">
        <div className={styles.welcome}>
          <h2>Vítej //username//</h2>
          <p>
            {' '}
            Králík na smetaně po staročesku vás nezklame, pokud hledáte
            nenáročný recept na výborný rodinný oběd. Maso je potřeba naložit
            den předem, aby zkřehlo a nasálo tu správnou chuť. Druhý den ho
            stačí upéct, připravit přílohu a můžete servírovat.
          </p>
          <p>
            Králíka naložíme den předem. Maso omyjeme, osušíme, vložíme do
            pekáče, osolíme, opepříme a obložíme ho plátky slaniny.
          </p>
          <p>
            Druhý den přidáme sádlo a za častého podlévání maso pečeme až
            změkne.
          </p>
          <p>Chudák králík</p>
        </div>
      </div>
    </>
  );
}
