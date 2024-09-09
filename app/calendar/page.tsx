'use client'

import Header from "../components/header"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, {Draggable, DropArg} from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

const Calendar = () => {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center mt-32">
          <div className="w-full max-w-7xl mx-auto">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={{}}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            // dateClick={{}}
            // drop={{}}
            // eventClick={{}}
            height={600} // Set the height of the calendar to 600 pixels
          
          />
          </div>
        </div>
      </main>
    </>
  );
}

export default Calendar