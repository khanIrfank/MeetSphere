import Hero from './sections/Hero'
import About from './sections/About'
import Features from './sections/Features'
import ImageFeatures from './sections/ImageFeatures'
import HowItWorks from './sections/HowItWorks'
import Pricing from './sections/Pricing'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import ContactCTA from './sections/ContactCTA'
import ProductPreview from './sections/ProductPreview'
// import GlobalStats from './sections/GlobalStats'

export default function Home() {
  return (
    <>
      <Hero />
      {/* <GlobalStats /> */}
      <Features />
      <ImageFeatures />
      <ProductPreview />
      <About />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  )
}

