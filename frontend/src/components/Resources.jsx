import React, {useState, useEffect} from 'react';
import './styles/resources.css';
import Navbar from './Navbar';
import Footer from './Footer';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
import { IoIosArrowForward } from "react-icons/io";
import AOS from 'aos';
import 'aos/dist/aos.css';

const resources = [
  {
    title: "Coping with Stress",
    description:
      "Learn practical tips for managing stress, including mindfulness techniques, breathing exercises, and creating a balanced routine.",
    link: "https://www.helpguide.org/articles/stress/stress-management.htm",
  },
  {
    title: "Dealing with Anxiety",
    description:
      "Understand anxiety and how to manage it with step-by-step guides, relaxation exercises, and more.",
    link: "https://www.verywellmind.com/tips-to-reduce-anxiety-2584181",
  },
  {
    title: "Managing Depression",
    description:
      "Explore effective strategies for combating depression, including therapeutic exercises, positive habits, and seeking help.",
    link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/self-care-for-depression/",
  },
  {
    title: "Loneliness and Isolation",
    description:
      "Discover ways to overcome feelings of loneliness and create meaningful connections, even when isolated.",
    link: "https://catalogue.pesi.com.au/item/overcoming-loneliness-139147?utm_term=&utm_campaign=AU+%7C+BH+%7C+NB+%7C+N/A+%7C+Dynamic+%7C+Performance+Max+%7C+Global&utm_source=google&utm_medium=cpc&hsa_acc=6086948819&hsa_cam=21081230539&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gclid=EAIaIQobChMIyseJ3_C4iQMVfJ2DBx2ROTFbEAAYAyAAEgIu6fD_BwE&gclsrc=aw.ds",
  },
  {
    title: "Professional Help & Hotlines",
    description:
      "If you need to talk to a professional, explore available hotlines and mental health services near you.",
    link: "https://www.nami.org/Home",
  },
];


const hotlines = [
  {
    title: "Mental Health Support Helpline (Bangladesh)",
    description: "Call for immediate assistance or emotional support in crisis situations.",
    number: "16263", // Bangladesh's helpline for mental health support
    link: "tel:+88016263",
  },
  {
    title: "National Suicide Prevention Helpline",
    description: "Immediate help for those experiencing suicidal thoughts or self-harm.",
    number: "109", // Bangladesh Suicide Prevention Helpline
    link: "tel:+880109",
  },
  {
    title: "Shuchona Foundation",
    description: "Non-profit organization providing mental health counseling and support.",
    link: "https://www.shuchonafoundation.org/",
  },
  {
    title: "Bengal Health",
    description: "Provides mental health services including therapy and counseling.",
    link: "https://www.bengalhealth.com.bd/",
  },
  {
    title: "Dhaka Community Hospital Trust",
    description: "Mental health counseling services along with hospital and emergency care.",
    link: "https://www.dchtbd.org/",
  },
];






const Resources = () => {

  useEffect(() => {       
    AOS.init({ duration: 1000 });        
  }, []);


  return (

    <>

    <Navbar/>

    <div className="mental-health-resources">
      <h2>Mental Health Resources</h2>
      <p className='find'>Find information and support for your mental health.</p>
      <div className="resource-list" data-aos='fade-up'>
        {resources.map((resource, index) => (
          <div key={index} className="resource-item">
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            
            <div className="wrapper">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="link-button">                       
                        <span className='learn-more'><IoIosArrowForward className='right-icon'/>  <span>Learn More</span></span>
                    </a>
            </div>

          </div>
        ))}
      </div>



        {/* <div className="hotlines-footer">
        <h2>Need Professional Help?</h2>
        <p>Here are some professional resources and hotlines available for urgent mental health support:</p>
        <ul>
            <li>
            <strong>National Suicide Prevention Lifeline:</strong> 
            <a href="tel:+1-800-273-8255">1-800-273-8255</a> (Or dial <strong>988</strong>)
            </li>
            <li>
            <strong>Therapy Referral Service:</strong> 
            <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer">Find a Therapist</a>
            </li>
            <li>
            <strong>Local Mental Health Services:</strong> 
            <a href="https://www.nami.org/Home" target="_blank" rel="noopener noreferrer">Check local services (NAMI)</a>
            </li>
        </ul>
        </div> */}



      <div className="hotlines-footer">
        <h2>Need Professional Help?</h2>
        <p>Here are some professional resources and hotlines available for urgent mental health support in Bangladesh:</p>
        <ul>
          {hotlines.map((hotline, index) => (
            <li key={index}>
              <strong>{hotline.title}:</strong>{" "}
              {hotline.number ? (
                <a href={hotline.link} target="_blank" rel="noopener noreferrer">
                  {hotline.number}
                </a>
              ) : (
                <a href={hotline.link} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

        </div>

        <Footer/>
      
        </>

  );
};

export default Resources;




