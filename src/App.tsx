import { type FormEvent, useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCss3Alt, faGitAlt, faGithub, faJs, faReact } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faBars,
  faBolt,
  faCheck,
  faCode,
  faEnvelope,
  faFolderOpen,
  faGlobe,
  faLaptopCode,
  faPaperPlane,
  faRocket,
  faRoute,
  faServer,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const heroImage =
  "https://images.pexels.com/photos/34803969/pexels-photo-34803969.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const stackItems = [
  {
    title: "React + TypeScript",
    text: "Component driven UI with strict types, clear state, and reusable sections.",
    icon: faReact,
  },
  {
    title: "Vite",
    text: "Fast local development and a lean production build ready for static hosting.",
    icon: faBolt,
  },
  {
    title: "Tailwind CSS",
    text: "Responsive styling with focused utility classes and a custom visual system.",
    icon: faCss3Alt,
  },
  {
    title: "React Router",
    text: "Real routes for a landing page, project page, contact page, and fallback screen.",
    icon: faRoute,
  },
  {
    title: "Font Awesome",
    text: "Consistent brand and interface icons without image asset overhead.",
    icon: faCode,
  },
  {
    title: "EmailJS",
    text: "Client side contact form that can send mail after adding Vercel environment variables.",
    icon: faEnvelope,
  },
];

const processSteps = [
  "Clone the repository and customize the copy, colors, and sections.",
  "Create an EmailJS service and template, then add the three Vite env variables.",
  "Push to GitHub so the project has a clean public history.",
  "Import the repo in Vercel and deploy the Vite build.",
];

const projectRows = [
  {
    title: "Founder landing page",
    text: "A focused first viewport, product story, stack proof, and conversion CTA for a new idea.",
    stack: "React, Tailwind, Router",
  },
  {
    title: "Developer portfolio",
    text: "A polished route structure for work samples, GitHub links, and a reliable contact path.",
    stack: "TypeScript, Font Awesome, EmailJS",
  },
  {
    title: "Vercel starter",
    text: "A deployable SPA baseline with rewrites, environment variable notes, and production build checks.",
    stack: "Vite, Git, Vercel",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function AppNav() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${isActive ? "text-white" : "text-white/62 hover:text-white"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05070d]/78 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group inline-flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10">
            <FontAwesomeIcon icon={faRocket} className="text-sm text-cyan-200" />
          </span>
          <span className="text-lg font-semibold tracking-tight">DeployFlow</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 md:inline-flex"
        >
          Start project
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#05070d] px-5 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navLinks.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClasses} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-950">
      <AppNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-screen overflow-hidden bg-[#05070d] text-white">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          initial={{ opacity: 0.48, scale: 1.08 }}
          animate={{ opacity: 0.72, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070d] via-[#05070d]/78 to-[#05070d]/18" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05070d] to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-16 pt-28 sm:px-8 lg:pb-24">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(4.5rem,14vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em]"
            >
              DeployFlow
            </motion.h1>
            <motion.h2 variants={fadeUp} className="mt-8 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              A React + TypeScript launch site built for GitHub and Vercel.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Router pages, Tailwind CSS, Font Awesome icons, and an EmailJS contact form in one clean Vite project.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-200 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white"
              >
                View structure
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                Test contact form
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#05070d] py-24 text-white sm:py-32">
        <motion.div
          className="mx-auto max-w-7xl px-5 sm:px-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Stack</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Everything requested, already wired.</h2>
          </motion.div>

          <div className="mt-14 divide-y divide-white/12 border-y border-white/12">
            {stackItems.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="grid gap-5 py-7 sm:grid-cols-[88px_1fr_1.25fr] sm:items-center"
              >
                <FontAwesomeIcon icon={item.icon} className="text-3xl text-cyan-200" />
                <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="max-w-2xl text-sm leading-6 text-white/62 sm:text-base">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-[#f4f1ea] py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Workflow</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">From repo to live URL.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              The project includes the SPA rewrite file Vercel needs, so routed pages work after refresh.
            </p>
          </motion.div>

          <motion.ol
            className="divide-y divide-slate-950/15 border-y border-slate-950/15"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {processSteps.map((step, index) => (
              <motion.li key={step} variants={fadeUp} className="grid gap-5 py-8 sm:grid-cols-[80px_1fr]">
                <span className="text-4xl font-black tracking-tighter text-slate-950/25">0{index + 1}</span>
                <p className="text-xl font-medium leading-8 text-slate-900">{step}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  return (
    <section className="min-h-screen bg-[#f4f1ea] px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <motion.div className="mx-auto max-w-7xl" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09 } } }}>
        <motion.div variants={fadeUp} className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Project map</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">A GitHub ready starter with real routes.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Use this page as a showcase, convert it into your portfolio, or keep it as proof that routing and deployment work.
          </p>
        </motion.div>

        <div className="mt-16 divide-y divide-slate-950/15 border-y border-slate-950/15">
          {projectRows.map((project, index) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="grid gap-6 py-9 lg:grid-cols-[120px_1fr_280px] lg:items-center"
            >
              <div className="flex items-center gap-4 text-slate-500">
                <FontAwesomeIcon icon={index === 0 ? faLaptopCode : index === 1 ? faFolderOpen : faServer} className="text-2xl" />
                <span className="font-mono text-sm">0{index + 1}</span>
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">{project.title}</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{project.text}</p>
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{project.stack}</p>
            </motion.article>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-800"
          >
            Connect EmailJS
            <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
          </Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-950/20 px-6 py-3 text-sm font-bold text-slate-950 transition hover:border-slate-950"
          >
            Open GitHub
            <FontAwesomeIcon icon={faGithub} className="text-base" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error" | "missing">("idle");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";
  const emailReady = Boolean(serviceId && templateId && publicKey);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!emailReady) {
      setFormStatus("missing");
      return;
    }

    if (!formRef.current) {
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");

    try {
  // 1. Στέλνεις τη φόρμα χρησιμοποιώντας το ref
  await emailjs.sendForm(serviceId, templateId, formRef.current!, { publicKey });

  // 2. Καθαρίζεις τη φόρμα χρησιμοποιώντας το ref αντί για το event
  // Χρησιμοποιούμε το optional chaining (?.) για σιγουριά
  formRef.current?.reset();

  // 3. Ενημερώνεις το status σε επιτυχία
  setFormStatus("sent");
} catch (error) {
  console.error("EmailJS failed", error);
  setFormStatus("error");
}
  }

  return (
    <section className="min-h-screen bg-[#05070d] px-5 pb-24 pt-36 text-white sm:px-8 sm:pt-44">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Contact
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
            Send mail through EmailJS.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-8 text-white/65">
            Add your EmailJS credentials in Vercel as environment variables and this form will send directly from the deployed site.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 divide-y divide-white/12 border-y border-white/12">
            {[
              { icon: faReact, label: "React UI", value: "Typed form state and validation" },
              { icon: faGitAlt, label: "GitHub", value: "Commit, push, and import in Vercel" },
              { icon: faGlobe, label: "Vercel", value: "Set env vars before production deploy" },
            ].map((item) => (
              <div key={item.label} className="grid gap-3 py-5 sm:grid-cols-[44px_1fr] sm:items-center">
                <FontAwesomeIcon icon={item.icon} className="text-xl text-cyan-200" />
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="mt-1 text-sm text-white/55">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="rounded-[2rem] border border-white/12 bg-white p-5 text-slate-950 shadow-2xl shadow-cyan-950/30 sm:p-8"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-5">
            <input type="hidden" name="to_name" value="DeployFlow" />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Name
                <input
                  name="user_name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-cyan-500 focus:bg-white"
                />
              </label>
              <label className="space-y-2 text-sm font-semibold text-slate-700">
                Email
                <input
                  name="user_email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-cyan-500 focus:bg-white"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Project type
              <select
                name="project_type"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-cyan-500 focus:bg-white"
              >
                <option value="" disabled>
                  Choose one
                </option>
                <option>Portfolio</option>
                <option>Startup landing page</option>
                <option>Vercel starter</option>
                <option>Other</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-semibold text-slate-700">
              Message
              <textarea
                name="message"
                required
                minLength={12}
                rows={6}
                placeholder="Tell me what you want to build."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-cyan-500 focus:bg-white"
              />
            </label>

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {formStatus === "sending" ? "Sending..." : "Send message"}
              <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
            </button>

            <FormStatus status={formStatus} emailReady={emailReady} />
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function FormStatus({ status, emailReady }: { status: "idle" | "sending" | "sent" | "error" | "missing"; emailReady: boolean }) {
  if (status === "idle" && emailReady) {
    return <p className="text-sm text-slate-500">EmailJS is configured. Submit the form to send a real email.</p>;
  }

  if (status === "idle" && !emailReady) {
    return <p className="text-sm text-slate-500">Add EmailJS env variables before sending from Vercel.</p>;
  }

  if (status === "sent") {
    return (
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        <FontAwesomeIcon icon={faCheck} /> Message sent successfully.
      </p>
    );
  }

  if (status === "missing") {
    return (
      <p className="inline-flex items-start gap-2 text-sm font-semibold text-amber-700">
        <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5" /> Missing VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID, or VITE_EMAILJS_PUBLIC_KEY.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-red-700">
        <FontAwesomeIcon icon={faTriangleExclamation} /> EmailJS returned an error. Check the template fields and public key.
      </p>
    );
  }

  return <p className="text-sm text-slate-500">Sending through EmailJS...</p>;
}

function NotFoundPage() {
  return (
    <section className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5 pt-20 text-center">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">This route is not in the app.</h1>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-800"
        >
          Back home
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-950/10 bg-[#f4f1ea] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>DeployFlow - React, TypeScript, Vite, Tailwind CSS, Router, Font Awesome, EmailJS.</p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="transition hover:text-slate-950" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
          </a>
          <a href="https://vercel.com/" target="_blank" rel="noreferrer" className="transition hover:text-slate-950" aria-label="Vercel">
            <FontAwesomeIcon icon={faServer} className="text-xl" />
          </a>
          <a href="https://www.emailjs.com/" target="_blank" rel="noreferrer" className="transition hover:text-slate-950" aria-label="EmailJS">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          </a>
          <FontAwesomeIcon icon={faJs} className="text-xl text-slate-400" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}
