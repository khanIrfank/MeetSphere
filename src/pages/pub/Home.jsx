import Hero from './sections/Hero'
import About from './sections/About'
import Features from './sections/Features'
import HowItWorks from './sections/HowItWorks'
import Pricing from './sections/Pricing'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import ContactCTA from './sections/ContactCTA'
import ProductPreview from './sections/ProductPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  )
}