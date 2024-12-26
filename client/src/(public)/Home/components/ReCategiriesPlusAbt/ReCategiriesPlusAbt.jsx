
import React from 'react'


import { useEffect } from 'react';
import styles from './page.module.css'
import Projects from './components/Projects/Projects';
const ReCategiriesPlusAbt = () => {


  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])
  return (
    <main className={styles.main}>
    <Projects />
  </main>
  )
}

export default ReCategiriesPlusAbt