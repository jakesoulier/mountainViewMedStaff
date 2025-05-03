import Announcement from "./components/announcement";
import Header from "./components/header";
import Events from "./components/events";
import CalendarButtons from "./components/calendarButtons";
import CardLink from "./components/cardLink";
import { EventsFetcherMountain, EventsFetcherIFCH, EventsMountainList } from "./eventsFetcher"; // Import both components

export default function Home() {
  console.log('Home component rendered');

  return (
    <main>
      
      <Header title="Medical Staff" path="/" gradientColor="#1b284f" cmePath=""/>
    
      <div className="flex flex-col medium:flex-row">
        <div className="announcement-wrapper">
          <Announcement />
        </div>

        <div className="events-wrapper m-3">
          <Events />
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center mt-10">
        <CalendarButtons />
        {/* <CardLink text="Clinical Privileges" link="https://epriv.asm-cloud.com/app-4/login/mountain-view-hospital" imgSrc="/doctorClinical.jpg"/> */}
        {/* <CardLink text="MD-Query" link="https://mdquery.com/app/login.aspx?ID=a3a86a89-6854-402d-9a80-01d834235daf" imgSrc="/md-query.jpg"/>
        <CardLink text="UptoDate" link="https://www.uptodate.com/login" imgSrc="/uptodate.jpg"/>
        <CardLink text="Lexicomp" link="https://online.lexi.com/lco/action/home/switch" imgSrc="/lexicomp.jpg"/>
        <CardLink text="ARPACS" link="https://www.arpacs.net/" imgSrc="/arpacs.jpg"/> */}
        <CardLink text="Continuing Education" link="/cme" imgSrc="/maleSquare.jpg"/>
        <CardLink text="Med Staff" link="/secure" imgSrc="/doctorClinical.jpg"/>
        <CardLink text="Residence" link="/" imgSrc="/residencePic.jpg"/>
      </div>
    </main>
  );
}