import Link from "next/link";
import "../assets/CalendarButtons.css"; // Import the CSS file

function CalendarButtons() {
  return (
    <>
      <Link href="/calendar" className="arrow-link">
        <div className="imageWrapper">
          <img className="calendar-image" src="/calendarTest-03.png" alt="calendar" />
          <img className="hover-image" src="/hover123-05.png" alt="calendar" />
          <div className="arrow"></div>
        </div>
      </Link>
    </>
  );
}

export default CalendarButtons;

// import Link from "next/link";
// import "../assets/CalendarButtons.css"; // Import the CSS file

// function CalendarButtons() {
//   return (
//     <div className="container">
//       <Link href="/calendar">
//         <div className="imageWrapper">
//           <img className="image" src="/fadedFullCalendar-02.png" alt="calendar" />
//           <h1 className="overlapText">Calendar</h1>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default CalendarButtons;
