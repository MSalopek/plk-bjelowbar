import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { recordsMen, recordsWomen } from "@/lib/records";
import { competitors } from "@/lib/competitors";
import { RecordsTable } from "@/components/RecordsTable";
import { Groups } from "@/components/Groups";
import { classnames } from "@/lib/util";
import { Sponsors } from "@/components/Sponsors";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [bottomClasses, setBottomClasses] = useState([
    styles.bannerTitleBottom,
  ]);
  const [dateClasses, setDateClasses] = useState([styles.date]);
  const [buttonClasses, setButtonClasses] = useState([styles.bannerButton]);
  const [streamButtonClasses, setStreamButtonClasses] = useState([styles.streamButton]);
  const initialized = useRef(false);
  const nominations = useRef(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    setTimeout(() => {
      setBottomClasses([styles.bannerTitleBottom, styles.animateBottom]);
    }, 1000);

    setTimeout(() => {
      setDateClasses([styles.date, styles.animateDate]);
    }, 2500);

    setTimeout(() => {
      setButtonClasses([styles.bannerButton, styles.animateButton]);
    }, 3000);

    setTimeout(() => {
      setStreamButtonClasses([styles.streamButton, styles.animateButton]);
    }, 3500);
  }, []);

  const goToNominations = () => {
    nominations.current.scrollIntoView({ behavior: "smooth" });
  };

  const livestreamActive = () => {
    const dateTimeNow = new Date();
    const dateTimeStart = new Date("2023-06-03T00:06:30.000Z");
    const dateTimeEnd = new Date("2023-06-05T00:00:00.000Z");
    if (dateTimeNow > dateTimeStart && dateTimeNow < dateTimeEnd) return true;
    return true
  }

  return (
    <>
      <Head>
        <title>PLK Bjelowbar</title>
        <meta name="description" content="Powerlifting klub Bjelowbar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {
          livestreamActive() &&
          <Link
            href="/stream"
            className={streamButtonClasses.join(" ")}
          >
            <Image src="/stream-icon.svg" alt="stream-icon" width={40} height={40} className={styles.animatePulse} />
            Livestream
          </Link>
        }
        <section className={styles.banner}>
          <div className={styles.bannerBackground} />
          <div className={styles.bannerContent}>
            <div className={styles.titleTopWrap}>
              <h1 className={styles.bannerTitleTop}>1. Bjelovar</h1>
            </div>
            <h1 className={bottomClasses.join(" ")}>Record Breakers</h1>
            <p className={dateClasses.join(" ")}>3. - 4. lipnja 2023.</p>
            <button
              className={buttonClasses.join(" ")}
              onClick={goToNominations}
            >
              Pogledaj nominacije
            </button>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.fog}></div>
          <div className={classnames("container", styles.container)}>
            <p>
              U suradnji sa SuperSportom osigurali smo nagradni fond u iznosu:
            </p>
            <div className={styles.fond}>2500 €</div>
            <p>
              Nagradni fond se sastoji od nagrada za top 3 natjecatelja/ice u
              apsolutnom poretku te odvojeni nagradni fond za obaranje
              seniorskih državnih rekorda*.
              <br />
              <br />
              Najbolji natjecatelji, odnosno natjecateljice osvojit će nagrade u
              iznosu:
            </p>
            <div className={styles.apsoluteAwards}>
              <div className={styles.award}>
                <div className={styles.medal}>1. mjesto</div>
                <div className={styles.amount}>250 €</div>
              </div>
              <div className={styles.award}>
                <div className={styles.medal}>2. mjesto</div>
                <div className={styles.amount}>150 €</div>
              </div>
              <div className={styles.award}>
                <div className={styles.medal}>3. mjesto</div>
                <div className={styles.amount}>100 €</div>
              </div>
            </div>
            <p>
              Nagradni fond za obaranje seniorskih državnih rekorda* iznosit će:
            </p>
            <div className={styles.fond}>1500 €</div>
          </div>
        </section>
        <section className={styles.section} ref={nominations}>
          <div className="container">
            <h1 className={styles.sectionTitle}>Nominacije, grupe i satnica</h1>
            <Groups genderTables={competitors} />
          </div>
        </section>
        <section className={classnames(styles.section, styles.pravila)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              Pravila nagradnog fonda za obaranje državnih rekorda
            </h2>
            <p>
              Oboreni državni rekord koji zadovoljava niže navedene uvjete ulazi
              u nagradni fond. Jedan natjecatelj ima pravo na maksimalno 3
              državna rekorda koja ulaze u fond nagrada (npr. ako
              natjecatelj/ica obori rekord u sve tri discipline, oboreni total
              neće ući u fond). Na kraju natjecanja, nagradni fond se dijeli na
              ukupni broj oborenih rekorda, a natjecatelji osvajaju nagradu
              ovisno o broju rekorda koje su oborili.
            </p>
            <h3 className={styles.subheading}>Pravila:</h3>
            <ul>
              <li>Natjecatelj mora nastupiti u kategoriji Open</li>
              <li>
                Oboreni rekord mora ostati neoboren do kraja natjecanja. Npr.
                ako dva natjecatelja u istoj kategoriji uzastopno obaraju rekord
                u istoj disciplini, u fond ulazi onaj rekord koji ostane važeći
                na kraju natjecanja.
              </li>
              <li>
                Državni rekord mora iznositi minimalno 65% svjetskog rekorda kod
                žena, odnosno 70% svjetskog rekorda kod muškaraca. Relevantni
                svjetski rekordi koje računamo za kvalifikaciju su rekordi
                postavljeni do 24.3.2023. (prije sheffielda).
              </li>
              <li>
                Natjecatelj/ica mora završiti natjecanje sa totalom koji iznosi
                minimalno 60% svjetskog rekorda u totalu kod žena, odnosno 65%
                svjetskog rekorda u totalu kod muškaraca.
              </li>
            </ul>
            <p>Konkretne brojke pogledajte u tablici ispod.</p>
            <div className={styles.recordsGrid}>
              <div>
                <h3 className={styles.subheading}>Ženski rekordi</h3>
                <RecordsTable
                  records={recordsWomen}
                  qualifyingPercentage={0.65}
                  qualifyingTotalPercentage={0.6}
                />
              </div>
              <div>
                <h3 className={styles.subheading}>Muški rekordi</h3>
                <RecordsTable
                  records={recordsMen}
                  qualifyingPercentage={0.7}
                  qualifyingTotalPercentage={0.65}
                />
              </div>
            </div>
            <p className={styles.legenda}>
              <strong>Legenda:</strong>
              <br />
              <strong>Kat:</strong> Kategorija
              <br />
              <strong>Disc:</strong> Disciplina
              <br />
              <strong>NR:</strong> Državni rekord
              <br />
              <strong>WR:</strong> Svjetski rekord
              <br />
              <strong>%WR</strong> Postotak državnog rekorda u odnosu na
              svjetski
              <br />
              <strong>QR:</strong> Kvalifikacijski rekord
              <br />
              <strong>QR:</strong> Kvalifikacijski total koji natjecatelj mora
              ostvariti kako bi rekord bio priznat
              <br />
            </p>
          </div>
        </section>
        <section className={classnames(styles.section, styles.faqSection)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>FAQ</h2>
            <div className={styles.faqContent}>
              <details>
                <summary>Kako će nagrada biti isplaćena?</summary>
                <p>
                  Nagrade će biti isplaćene na SuperSport{" "}
                  <a href="https://www.supersport.hr/sportcard" target="_blank">
                    SportCard
                  </a>{" "}
                  karticu. SportCard kartica je besplatna Mastercard prepaid
                  kartica koju izdaje{" "}
                  <a href="https://aircash.eu/hr/" target="_blank">
                    aircash
                  </a>
                  . Upute kako zatražiti SportCard karticu možete pronaći{" "}
                  <a href="https://www.supersport.hr/sportcard" target="_blank">
                    ovdje
                  </a>
                  , a nagrađenim natjecateljima (odnosno njihovim roditeljima
                  ili skrbnicima ukoliko je natjecatelj maloljetnik) poslat ćemo
                  upute nakon završetka natjecanja.
                  <br />
                  Sa SportCard karticom možete plaćati bilo gdje bez naknade, a
                  za prebacivanje sredstava na svoj račun ili isplatu na PBZ
                  bankomatu plaća se 2% naknade. Ostale mogućnosti i naknade
                  možete provjeriti{" "}
                  <a href="https://aircash.eu/hr/naknade/" target="_blank">
                    ovdje
                  </a>
                  .
                </p>
              </details>
              <details>
                <summary>
                  Zašto ste se odlučili na pravilo o minimalnom postotku
                  svjetskog rekorda?
                </summary>
                <p>
                  Pojedine težinske kategorije imaju dosta malu izlaznost.
                  Shodno tome, postoji srazmjer u odnosu državnih rekorda
                  naspram svjetskih u posjećenijim kategorijama naspram manje
                  posjećenim. Na ovo pravilo smo se odlučili kako ne bismo
                  umanjili vrijednost oborenog rekorda u posjećenijim
                  kategorijama, a opet dali priliku natjecateljima u manje
                  posjećenim.
                </p>
              </details>
              <details>
                <summary>
                  Zašto ste se odlučili na pravilo o kvalificirajućem totalu za
                  obaranje rekorda?
                </summary>
                <p>
                  Htjeli smo izbjeći tzv. token liftove, odnosno situaciju u
                  kojoj natjecatelj/ica namjerno prijavljuje manje kilaže na
                  pojedine discipline kako bi čuvao snagu za obaranje rekorda u
                  samo jednoj disciplini.
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className="container">
            <h1 className={styles.sectionTitle}>Sponzori</h1>
            <Sponsors />
            <h1
              className={styles.sectionTitle}
              style={{
                marginTop: "100px",
              }}
            >
              U organizaciji
            </h1>
            <Sponsors group={1} />
          </div>
        </section>
      </main>
    </>
  );
}
