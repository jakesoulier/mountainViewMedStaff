'use client'

import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { z } from 'zod';
import { AnnouncementSchema } from '../validationSchemas';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../assets/BannerStyles.css"

// fields in announcement form
type AnnouncementForm = z.infer<typeof AnnouncementSchema> & {
    photoURL?: string;
    link: string;
};

// get all announcements from the db
async function getAnnouncements() {
    const q = query(collection(db, 'announcements'));
    const querySnapshot = await getDocs(q);
    const announcements = querySnapshot.docs.map(doc => doc.data() as AnnouncementForm);
    // console.log(announcements);
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="announcement-banner relative w-full max-w-5xl mx-auto">
            <Slider {...settings}>
                {announcements.map((announcement, index) => (
                    <div key={index} className='p-4'>
                        <a href={announcement.link}>
                            {announcement.photoURL && (
                                <img className='w-full' src={announcement.photoURL} alt={`Announcement ${index + 1}`} />
                            )}
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Announcement;