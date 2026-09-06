import { useEffect, useRef } from 'react'
import bellsImage from '../assets/bells2.webp'
import heroImage from '../assets/khaffa.webp'
import bekalImage from '../assets/bekal.png'

const stats = [
  ['04+', 'years crafting'],
  ['28', 'projects shipped'],
  ['12', 'happy teams'],
]

const projects = [
  { number: '01', type: 'Game / Digital experience', title: "Bell's After Dark", detail: 'A horror game featuring atmospheric exploration and a narrative that builds tension gradually.', color: 'project-lime', image: bellsImage, 'url': 'https://youtu.be/au_IYJ0zZDg?si=BXYUNY_ZuTCo3RoM' },
  { number: '03', type: 'Education / Digital Platform', title: 'Bekal Opat', detail: 'A one-stop destination for scholarships, careers, and student competitions.', color: 'project-cyan', image: bekalImage, 'url': '' },
]

const services = ['Backend Development', 'Database & Data', 'Problem Solving', 'Continuous Learning']

const techStack = [
  ['Backend', ['PHP', 'Laravel', 'JavaScript', 'Node.js', 'Express.js', 'REST API']],
  ['Database', ['MySQL', 'PostgreSQL', 'MongoDB', 'Database Design']],
  ['Workflow', ['Git & GitHub', 'Postman', 'Docker', 'Problem Solving']],
]

export default function Hero() {
  const artRef = useRef(null)

  useEffect(() => {
    const art = artRef.current
    if (!art) return undefined

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let animationFrame
    const startTime = performance.now()

    const updateTarget = (event) => {
      const bounds = art.getBoundingClientRect()
      target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    }

    const resetTarget = () => {
      target.x = 0
      target.y = 0
    }

    const noise = (t, seed) => {
      const a = Math.sin(t * 0.00071 + seed) 
      const b = Math.sin(t * 0.00133 + seed * 2.3)
      const c = Math.sin(t * 0.00042 + seed * 5.1)
      return (a * 0.5 + b * 0.3 + c * 0.2)
    }

    const animate = (now) => {
      const t = now - startTime

      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      art.style.setProperty('--mouse-x', `${current.x}`)
      art.style.setProperty('--mouse-y', `${current.y}`)

      const orbit1X = noise(t, 1.7)
      const orbit1Y = noise(t, 4.2)
      const orbit2X = noise(t, 7.9)
      const orbit2Y = noise(t, 2.6)

      art.style.setProperty('--orbit1-x', `${orbit1X}`)
      art.style.setProperty('--orbit1-y', `${orbit1Y}`)
      art.style.setProperty('--orbit2-x', `${orbit2X}`)
      art.style.setProperty('--orbit2-y', `${orbit2Y}`)

      animationFrame = requestAnimationFrame(animate)
    }

    art.addEventListener('pointermove', updateTarget)
    art.addEventListener('pointerleave', resetTarget)
    animationFrame = requestAnimationFrame(animate)

    return () => {
      art.removeEventListener('pointermove', updateTarget)
      art.removeEventListener('pointerleave', resetTarget)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <main className="portfolio-shell">
      <div className="noise" aria-hidden="true" />
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Khaffa Daru Hastri home">
          Khaffa<span>.</span>
        </a>
        <div className="nav-links">
          <a href="#work">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-contact" href="mailto:khaffadaru@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>
            Building ideas
            <em>into working systems.</em>
          </h1>
          <p className="hero-description">
            I&apos;m a junior backend developer focused on building reliable web applications. I enjoy solving problems, understanding how things work, and turning ideas into functional products.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="mailto:hello@khaffa.dev">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="hero-art" ref={artRef} aria-label="Abstract neon 3D portfolio artwork">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <span className="art-label label-top">001 / 004</span>
          <span className="art-label label-bottom">Interface / Motion</span>
          <div className="art-glow" />
          <img src={heroImage} alt="Neon layered abstract shape" />
          <div className="art-caption">
            <span>Featured direction</span>
            <strong>Shape the signal.</strong>
          </div>
        </div>
      </section>

      <footer className="hero-footer">
        <span>Scroll to discover</span>
        <span className="footer-line" />
        <span>Based in ID / Working worldwide</span>
      </footer>

      <section className="content-section work-section" id="work">
        <div className="section-heading">
          <p className="section-kicker">Selected work / 2024—26</p>
          <h2>Ideas that leave<br /><em>a trace.</em></h2>
          <p className="section-intro">A few collaborations built with curious people, ambitious teams, and a healthy disregard for the ordinary.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <a className={`project-card ${project.color}`} href={project.url || "#contact"} key={project.number}>
              <div className="project-card-top"><span>{project.number}</span><span>{project.type}</span></div>
              <div className="project-visual"><img src={project.image} alt={`${project.title} project thumbnail`} /></div>
              <div className="project-card-bottom"><div><h3>{project.title}</h3><p>{project.detail}</p></div><span className="project-arrow">↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="content-section about-section" id="about">
        <div className="about-copy">
          <p className="section-kicker">A little context</p>
          <h2>Building with<br /><em>purpose & logic.</em></h2>
          <p className="about-text">I’m a junior backend developer focused on building reliable web products. I enjoy understanding how things work, solving problems, and turning ideas into functional systems. Every project is an opportunity to learn, improve, and build something better.</p>
          <a className="text-link" href="mailto:khaffadaru@gmail.com">More About Me<span aria-hidden="true">↗</span></a>
        </div>
        <div className="services-panel">
          <p className="section-kicker">What I bring</p>
          {services.map((service, index) => (
            <div className="service-row" key={service}><span>0{index + 1}</span><strong>{service}</strong><span className="service-arrow">↗</span></div>
          ))}
        </div>
      </section>

      <section className="content-section stack-section" id="stack">
        <div className="section-heading stack-heading">
          <p className="section-kicker">Tools of the trade</p>
          <h2>Built behind<br /><em>the interface.</em></h2>
          <p className="section-intro">The technologies I use to turn product ideas into reliable web applications, APIs, and data systems.</p>
        </div>
        <div className="stack-list">
          {techStack.map(([category, technologies], categoryIndex) => (
            <div className="stack-group" key={category}>
              <div className="stack-group-label"><span>0{categoryIndex + 1}</span><strong>{category}</strong></div>
              <div className="stack-tags">
                {technologies.map((technology) => <span className="stack-tag" key={technology}>{technology}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-kicker">Have a good one?</p>
        <h2>Let&apos;s make<br /><em>something loud.</em></h2>
        <a className="contact-email" href="mailto:khaffadaru@gmail.com">khaffadaru@gmail.com <span aria-hidden="true">↗</span></a>
        <a className="contact-insta" href="https://www.instagram.com/khaffadaruhstr/">Instagram</a>
        <a className="contact-insta" href="https://www.linkedin.com/in/khaffa-daru-hastri-974b83312/">Linkedin</a>
        <div className="contact-meta"><span>Instagram / LinkedIn</span><span>2026 Khaffa Daru Hastri</span></div>
      </section>
    </main>
  )
}