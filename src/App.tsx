import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Hero from './sections/Hero'
import QueHago from './sections/QueHago'
import Numeros from './sections/Numeros'
import MiTrabajo from './sections/MiTrabajo'
import Servicios from './sections/Servicios'
import Contacto from './sections/Contacto'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QueHago />
        <Numeros />
        <MiTrabajo />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export default App
