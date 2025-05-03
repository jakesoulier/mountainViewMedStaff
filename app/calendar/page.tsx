'use client'

import Header from "../components/header"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, {Draggable, DropArg} from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import rrulePlugin from '@fullcalendar/rrule'

const Calendar = () => {
  
  return (
    
    <>
      <main className="min-h-screen">
        <Header title="Calendar" path="/calendar" gradientColor="#1b284f" cmePath=""/>
        <div className="flex flex-col md:flex-row items-center mt-32">
          {/* Sidebar for Color Legend */}
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-bold mb-4">Event Hospitals</h2>
              <ul>
                <li className="flex items-center mb-2">
                  <span className="inline-block w-4 h-4 bg-[#416855] rounded-full mr-2"></span>
                  MountainView
                </li>
                <li className="flex items-center mb-2">
                  <span className="inline-block w-4 h-4 bg-[#1b274f] rounded-full mr-2"></span>
                  IFCH
                </li>
              
              </ul>
            </div>
          </div>
          <div className="w-full max-w-7xl mx-auto">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              rrulePlugin
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={[
              {
                title: 'Tumor Board',
                start: '2024-09-11',
                end: '2024-09-12',
                extendedProps: {
                  details: '7:30 am'
                }
              },
              {
                title: "What's new in Neurology",
                start: '2024-09-20',
                end: '2024-09-20',
                extendedProps: {
                  details: '12:00 pm'
                }
              },
              {
                title: 'Pediatric GI Emergecy',
                start: '2024-09-25',
                end: '2024-09-25',
                backgroundColor: '#1b274f',
                extendedProps: {
                  details: '12:00 pm'
                }
              },
              {
                title: 'Mortality Committee',
                extendedProps: {
                  details: '1:00 pm'
                },
                backgroundColor: '#416855',
                rrule: {
                  freq: 'monthly',
                  bysetpos: -1,
                  byweekday: [ 'we' ],
                  dtstart: '2012-02-01T10:30:00', // will also accept '20120201T103000'
                  until: '2025-06-01' // will also accept '20120201'
                }
              },
              {
                title: 'Tumor Board',
                
                extendedProps: {
                  details: '1:00 pm'
                },
                rrule: {
                  freq: 'monthly',
                  bysetpos: [2,4],
                  byweekday: [ 'we' ],
                  dtstart: '2024-11-01', // will also accept '20120201T103000'
                  until: '2025-11-13' // will also accept '20120201'
                }
              },
              {
                title: 'Advances in Chemotherapy',
                start: '2025-01-24',
                end: '2025-01-24',
                backgroundColor: '#416855',
                extendedProps: {
                  details: '7:00 pm'
                }
              }
            ]}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            // dateClick={{}}
            // drop={{}}
            // eventClick={{}}
            height={600} // Set the height of the calendar to 600 pixels
            eventContent={({ event }) => (
              <div className="text-white">
                <p>{event.title}</p>
                <p>{event.extendedProps.details}</p>
              </div>
            )}
            eventDidMount={(info) => {
              // Apply styles to the outermost event element
              info.el.style.marginTop = '2px';  // Adds padding to the container
              info.el.style.marginBottom = '2px';  // Adds padding to the container
              info.el.style.padding = '5px 0 5px 1px';  // Adds padding to the container
           
              if (info.event.title === 'Mortality Committee') {
                info.el.style.backgroundColor = '#1b284f';
         
                 // Optional: Ensure text is readable
              }

              if (info.event.title === 'Tumor Board') {
                info.el.style.backgroundColor = '#416855';
         
                 // Optional: Ensure text is readable
              }
              
            }}
          />
          </div>
        </div>
      </main>
    </>
  );
}

export default Calendar