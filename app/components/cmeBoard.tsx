import { totalmem } from "os";

interface CmeBoardProps {
    imgSrc: string;
    date: string;
    title: string;
    type: string;
    eventDetails: string;
    // time: string;
}

const CmeBoard: React.FC<CmeBoardProps> = ( { imgSrc, date, title, type, eventDetails }) => {
    // console.log('type here: ', type)
    const encodedTitle = encodeURIComponent(`${title}__${type}`);
    // console.log('encodedTitle: ', encodedTitle);
  return (
    <div className="">
        <p className="dateTitle text-xl">{date}</p>
    <div className="bg-mountainview-green flex text-white  p-1">
        <div className="w-1/2">
            <h1 className="font-bold text-lg p-4">{title}</h1>
            <ul className="list-disc list-inside pt-5 pl-10 p-4 ">
                <li >
                    <a href={`/form?title=${encodedTitle}`} className="text-blue-400 underline hover:text-slate-300">
                      Register
                    </a>
                </li>
                <li>Meeting Link</li>
            </ul>
        </div>
        
        {imgSrc && (
            <div className="relative w-1/2 group">
                <img src={imgSrc} alt="suicidal ideation" className="w-full h-auto" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg">{eventDetails}</span>
                </div>
            </div>
        )}

        
    </div>
    </div>
  )
}

export default CmeBoard