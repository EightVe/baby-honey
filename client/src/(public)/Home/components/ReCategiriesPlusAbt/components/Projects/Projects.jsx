import React, { useState, useLayoutEffect, useRef } from 'react';
import styles from './style.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconExternalLink } from '@tabler/icons-react';
import CustomLink from '@/hooks/CustomLink';

const projects = [
    {
        title: "Baby Shooting",
        href: "/catalogue/baby-shooting",
        src: "https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/photo_2025-01-04_03-05-33.jpg?alt=media&token=b9024bfc-26ce-4bcf-a1f4-cb25fb2b6483",
    },
    {
        title: "Pregnant Shooting",
        href: "/catalogue/pregnant-shooting",
        src: "https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/photo_2025-01-14_00-48-27.jpg?alt=media&token=731654de-370b-4b00-8843-46a9b35de0c5",
    },
    {
        title: "Smash Cake",
        href: "/catalogue/smash-cake",
        src: "https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/photo_2025-01-14_00-47-20.jpg?alt=media&token=a5b43ca4-f818-4c13-aa13-a0feb452a53b",
    },
];

export default function Index() {
    const [selectedProject, setSelectedProject] = useState(0);
    const imageContainer = useRef(null);
    const projectList = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Pin the image and make it scroll with the content
        ScrollTrigger.create({
            trigger: imageContainer.current,
            pin: true,
            start: "top top", // Start pinning when image reaches the top
            end: () =>
            document.body.offsetHeight - window.innerHeight - 50,
            scrub: 1,
        });
    }, []);

    return (
        <div className={styles.projects}>
            <div className={styles.projectDescription}>
                <div ref={imageContainer} className={styles.imageContainer}>
                    <img
                        src={projects[selectedProject].src}
                        alt="project image"
                  
                    />
                </div>
                <div className="h-[100%] w-[50%] flex text-xl md:text-2xl lg:text-3xl">
                    <p>
                    Celebrate the beauty of your baby’s journey with stunning, timeless photos. From adorable smash cake sessions for their first birthday to glowing maternity shoots, we create memories you’ll treasure forever. Explore our gallery and book your session today to capture the moments that matter most                    </p>
                </div>
            </div>

            <div ref={projectList} className={styles.projectList} id='categories'>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        onMouseOver={() => setSelectedProject(index)}
                        className={styles.projectEl}
                    >
                        <CustomLink to={project.href}><h2 className='flex gap-1 text-xl md:text-2xl lg:text-5xl '>{project.title}</h2></CustomLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
