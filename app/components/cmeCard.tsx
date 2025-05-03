interface CmeCardProps {
    imgSrc: string;
    date: string;
    time: string;
    title: string;
}

const CmeCard: React.FC<CmeCardProps> = ( { imgSrc, date, time, title }) => {
  return (
    <div className="bg-mountainview-green flex text-white mt-3 p-1 w-[500px] mx-auto">
        <div className="relative w-1/2">
        <img src={imgSrc} alt="suicidal ideation" className="w-full h-auto" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="block whitespace-nowrap drop-shadow-white">{date}</span>
            </h1>
          </div>
          <h1 className="text-3xl font-bold">
            <span className="block drop-shadow-white whitespace-nowrap">{time}</span>
          </h1>
        </div>
      </div>
        <div className="w-1/2 p-4">
            <h1 className="font-bold text-lg text-center">{title}</h1>
            <ul className="list-disc list-inside pt-8 pl-2">
                <li>Register/RSVP</li>
                <li>Meeting Link</li>
            </ul>
        </div>
    </div>
  )
}

export default CmeCard