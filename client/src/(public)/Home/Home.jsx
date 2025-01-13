import React from 'react'
import { SmoothScrollHero } from './components/HeroBanner'
import AboutUs from './components/AboutUs'
import PlayReel from './components/PlayReel'
import Categories from './components/Categories'
import LampEffect from './components/ui/Lamp/LampEffect'
import ReCategiriesPlusAbt from './components/ReCategiriesPlusAbt/ReCategiriesPlusAbt'
import ContactArea from './components/ContactArea'


const Home = () => {
  return (
    <>

<SmoothScrollHero />
   <PlayReel />
   {/* <LampEffect />
    <Categories/> */}
    <ReCategiriesPlusAbt />
    <ContactArea />
    </>
  )
}

export default Home