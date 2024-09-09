import Link from "next/link"

function Calendar() {
return (
    <div className="flex justify-around">
        <Link href="/calendar"><img className="mount-calendar-icon" src="" alt="calendar"/></Link>
        <a href="google.com"><img className="ifch-calendar-icon" src="" alt="calendar"/></a>

    </div>
)
}

export default Calendar