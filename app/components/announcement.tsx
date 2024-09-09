'use client'

import {collection, query, getDocs, addDoc} from 'firebase/firestore';
import { db, storage } from '@/firebaseConfig';
import { z } from 'zod';
import { AnnouncementSchema } from '../validationSchemas';
import { useEffect, useState } from 'react';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



// fields in annoucment form
type AnnouncementForm = z.infer<typeof AnnouncementSchema> & {
    photoURL?: string;
};

// get all announcements from the db
async function getAnnouncements() {
    const q = query(collection(db, 'announcements'));
    const querySnapshot = await getDocs(q);
    const announcements = querySnapshot.docs.map(doc => doc.data() as AnnouncementForm);
    return announcements;
}

const Announcement = () => {

    const [announcements, setAnnouncements] = useState<AnnouncementForm[]>([]);

    
    useEffect(() => {
        /**
         * Fetches announcements and updates the state with the fetched data.
         */
        const fetchData = async () => {
            const announcements = await getAnnouncements();
            setAnnouncements(announcements);
        };
        fetchData();
    }, []);


return (
    <div>
        {/* displays the first annoucement from the db */}
        {announcements.length > 0 && (
            <div>
                
                {/* <div className='w-full'> */}
                    {announcements[0].photoURL && (
                            <img className='p-4' src={announcements[0].photoURL} alt="Announcement" />
                        )}
                {/* </div> */}
                {/* <div className='text-center'>
                    <h2>{announcements[0].title}</h2>
                    <p>{announcements[0].message}</p>
                </div> */}
                
            </div>
        )}
    </div>
);
}

export default Announcement