import { useLenis } from "./hooks/useLenis";
import { Nav } from "./components/navigation/Nav";
import { GridOverlay } from "./components/ui/GridOverlay";
import { Hero } from "./sections/Hero/Hero";
import { Frontend } from "./sections/Frontend/Frontend";
import { Paths } from "./sections/Paths/Paths";
import { Differentiators } from "./sections/Differentiators/Differentiators";
import { Professors } from "./sections/Professors/Professors";
import { Testimonials } from "./sections/Testimonials/Testimonials";

function App() {
  useLenis();

  return (
    <>
      <GridOverlay />
      <Nav />
      <main>
        <Hero />
        {/* One continuous, reversible scroll sequence, pinned once:
            builds the interface (FRONTEND), dissolves through it into
            the system behind it (BACKEND), then that same system
            adapts into a phone (MOBILE), dissolves into a live data
            mesh (DATA), and the data organizes into an abstract
            intelligence core (GESTÃO DE IA). */}
        <Frontend />
        {/* A different register on purpose: no pin, no scrub — an
            interactive showcase of the four DevClub tracks. */}
        <Paths />
        <Differentiators />
        <Professors />
        <Testimonials />
      </main>
    </>
  );
}

export default App;
