'use client';

import Header from "../components/header";
import "../assets/CmeStyles.css";
import CmeCard from "../components/cmeCard";
import CmeBoard from "../components/cmeBoard";
import { useEffect, useState } from "react";

const cme = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = '/male.jpg';
        img.onload = () => {
          const backgroundElement = document.querySelector('.diagonalBackground') as HTMLElement;
          if (backgroundElement) {
            backgroundElement.style.backgroundImage = `url(${img.src})`;
          }
        };

        const updateScreenSize = () => {
          setIsSmallScreen(window.innerWidth < 600);
        };
    
        // Initial check
        updateScreenSize();
    
        // Add event listener
        window.addEventListener('resize', updateScreenSize);
    
        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', updateScreenSize);
      }, []);

  return (
    <>
      <Header title={isSmallScreen ? "CME" : "Continuing Medical Education (CME)"} path="/cme" gradientColor="#79a17a" cmePath=""/>
      <div className='diagonalBackground'>
        <div className='content'>
          {/* <h1 className='text-4xl font-bold underline mb-1'>CME Mission and Purpose</h1> */}
          <p className="text-base  extraSmall:text-lg smaller:text-2xl smEdit:text-3xl smEighty:text-xl smMedium:text-2xl pt-0 medium:pt-10 pb-0 smaller:pb-14 break-words max-w-full smEighty:max-w-[40%]">The mission of Mountain View Hospital's CME program is to invest in the health of our community by enhancing the knowledge, competence, and performance of physicians and other health professionals.</p>
          <p className="text-base  extraSmall:text-lg smaller:text-2xl smEdit:text-3xl smEighty:text-xl smMedium:text-2xl pt-0 medium:pt-10 pb-0 smaller:pb-14 break-words max-w-full smEighty:max-w-[40%]">The CME program aims to make verifiable and measurable improvements in healthcare practices and patient outcomes within our community by offering opportunities for up-to-date and evidence-based education. Achieving improvement will be supported by providing relevant and appropriately formatted educational activities.</p>
        </div>
      </div>
      <h1 className="bg-mountainview-green text-white text-5xl p-7 underline text-center">Upcoming Events</h1>
      <h1 className="yearStyles text-2xl p-4 h-28 w-64 font-bold text-white">2025</h1>
      <div className="flex flex-wrap justify-center" id="specific-section">
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="nat.png" date="Friday, February 18" title="Non-Accidental Trauma" type="cme" eventDetails="some event details"/>
        </div>
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="suicidalOver.png" date="Friday, May 10" title="Suicidal Ideation" type="cme" eventDetails="some event details"/>
        </div>
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="acute.png" date="Friday, June 27" title="Cerebral Microvascular Disease" type="cme" eventDetails="some event details"/>
        </div>
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="pediatric.png" date="Friday, July 19"  title="Pediatric Asthma and Allergy" type="cme" eventDetails="some event details"/>
        </div>
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="cerebral.png" date="Friday, August 27" title="Cerebral Microvascular Disease" type="cme" eventDetails="some event details"/>
        </div>
        <div className="w-full sm:w-[500px] m-4">
            <CmeBoard imgSrc="neurology.png" date="Friday, September 20" title="What's New in Neurology" type="cme" eventDetails="some event details"/> 
        </div>
      </div>

      <h1 className="yearStyles text-2xl p-4 h-28 w-96 font-bold text-white">Past Events</h1>
      <div className="flex flex-wrap justify-center" id="specific-section">
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="" date="Friday, January 24" title="Advances in Chemotherapy" type="cme" eventDetails="some event details"/>
        </div>
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="" date="Friday, February" title="NASH" type="cme" eventDetails="some event details"/>
        </div>
        <div className="w-full sm:w-[500px] m-4">
          <CmeBoard imgSrc="" date="Friday, March 21" title="Woundcare" type="cme" eventDetails="some event details"/>
        </div>
      </div>
      
      <div className="bg-mountainview-green text-white flex items-center p-6 mt-10">
        <h1 className="text-5xl pr-10 underline">Event Planning</h1>
      </div>
      
      
    </>
  );
};

export default cme;