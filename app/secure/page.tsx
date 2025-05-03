import Header from "../components/header";
import Announcement from "../components/announcement";
// import Events from "./components/events";
import Events from "../components/eventsSecure"
import SmallCalendar from "../components/smallCalendar";
import { DateProvider } from "../components/dateContext";
import ProtectedRoute from "../components/ProtectedRoute";
import CardLink from "../components/cardLink";

const Secure = () => {
    return (
        <ProtectedRoute>    
        <DateProvider>
        <div>
            <Header title="Secure" path="/secure" gradientColor="#1b284f" cmePath=""/>
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="col-span-1 bg-slate-500 p-2">
                    <input
                        type="text"
                        placeholder="Search Bar"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-5">name and names</p>
                </div>
                <div className="col-span-3">
                    
                    <Announcement />
                    <div className="flex">
                        <div className="w-1/4 pr-4">
                            <SmallCalendar />
                        </div>
                        <div className="w-3/4">
                            <Events />
                        </div>
                    </div>
                    <div className="flex">
                        <CardLink text="Clinical Privileges" link="https://epriv.asm-cloud.com/app-4/login/mountain-view-hospital" imgSrc="/doctorClinical.jpg"/>
                        <CardLink text="MD-Query" link="https://mdquery.com/app/login.aspx?ID=a3a86a89-6854-402d-9a80-01d834235daf" imgSrc="/md-query.jpg"/>
                        <CardLink text="UptoDate" link="https://www.uptodate.com/login" imgSrc="/uptodate.jpg"/>
                        <CardLink text="Lexicomp" link="https://online.lexi.com/lco/action/home/switch" imgSrc="/lexicomp.jpg"/>
                        <CardLink text="ARPACS" link="https://www.arpacs.net/" imgSrc="/arpacs.jpg"/>
                    </div>
                </div>
            </div>
            
        </div>
        </DateProvider>
        </ProtectedRoute>
    )
}

export default Secure;