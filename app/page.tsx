import Announcement from "./components/announcement";
import Header from "./components/header";
import Events from "./components/events";
import Calendar from "./components/calendarButtons";
import CardLink from "./components/cardLink";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main>
      <Header/>
      <div className="flex">
        <div className="w-2/3"><Announcement /></div>
        <div className="w-1/3 mr-3"><Events /></div>
      </div>
      <Calendar />
      <div className="flex flex-wrap justify-center mt-10">
        {/* <CardLink text="Doctor Search" /> */}
        <CardLink text="Clinical Privileges" link="https://epriv.asm-cloud.com/app-4/login/mountain-view-hospital"/>
        <CardLink text="UptoDate" link="https://www.uptodate.com/login" />
        <CardLink text="Lexicomp" link="https://online.lexi.com/lco/action/home/switch"/>
        <CardLink text="MD-Query" link="https://mdquery.com/app/login.aspx?ID=a3a86a89-6854-402d-9a80-01d834235daf"/>
        <CardLink text="ARPACS" link="https://www.arpacs.net/"/>
      </div>
      {/* <Footer /> */}
    </main>
  );
}
