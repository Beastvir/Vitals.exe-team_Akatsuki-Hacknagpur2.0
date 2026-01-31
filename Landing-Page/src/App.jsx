import { useState } from 'react'
import './App.css'
import StaggeredMenu from './components/StaggeredMenu';
import logo from './assets/reactbits-logo.svg';
import Galaxy from './components/Galaxy';
import Hero from './components/Hero';
import Features from './components/Features';
import StarField from './components/StarField';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import Team from './components/Team';
import Contact from './components/Contact';
const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];
function App() {


  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh', background: '#000' }}>

        {/* Fixed Menu Overlay */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            colors={['#B19EEF', '#5227FF']}
            logoUrl={logo}
            accentColor="#5227FF"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>

        {/* Hero Section */}
        <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Galaxy
              mouseRepulsion={true}
              mouseInteraction={true}
              density={1}
              glowIntensity={0.3}
              saturation={0}
              hueShift={140}
              twinkleIntensity={0.3}
              rotationSpeed={0.1}
              repulsionStrength={2}
              autoCenterRepulsion={0}
              starSpeed={0.5}
              speed={1}
            />
          </div>
          <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <Hero />
          </div>
          {/* Gradient Fade to Black */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-20 pointer-events-none" />
        </section>

        <section style={{ position: 'relative', minHeight: '100vh', width: '100%', background: '#000' }}>
          {/* Gradient Fade from Black */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
          <StarField density={5} speed={0.5} />
          <Features />
          <HowItWorks />
          <Team />
          <CTA />
          <Contact />
        </section>

      </div>
    </>
  )
}

export default App
