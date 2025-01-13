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
        src: "https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/1a9f3833-b763-4d93-b029-4c273c1fdb07.jpg?alt=media&token=1ce69bb1-486a-48a5-adb8-4364c4fcfa91",
    },
    {
        title: "Pregnant Shooting",
        href: "/catalogue/pregnant-shooting",
        src: "https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/1a9f3833-b763-4d93-b029-4c273c1fdb07.jpg?alt=media&token=1ce69bb1-486a-48a5-adb8-4364c4fcfa91",
    },
    {
        title: "Smash Cake",
        href: "/catalogue/smash-cake",
        src: "https://firebasestorage.googleapis.com/v0/b/sevenplay-c1faa.appspot.com/o/40542e2f-b65c-4397-bdb6-381f6448ea95.jpg?alt=media&token=a3f05829-1740-4245-b05f-5dc839794fb9",
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
                        <CustomLink to={project.href}><h2 className='flex gap-1 text-xl md:text-2xl lg:text-5xl '>{project.title} <IconExternalLink /></h2></CustomLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
