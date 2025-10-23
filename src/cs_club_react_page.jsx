import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaEnvelope, FaWhatsapp, FaTimes , FaBars } from "react-icons/fa";





export default function CSClubPage() {

  // Animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // État pour la Formation sélectionnée
  const [selectedFormation, setSelectedFormation] = useState(null);

  // État pour la news sélectionnée
  const [selectedNews, setSelectedNews] = useState(null);

  // États dynamiques pour les données de la base
    const [members, setMembers] = useState([]);
    const [formations, setFormations] = useState([]);
    const [newsList, setNewsList] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);


        // Charger les données depuis le backend
useEffect(() => {
      const fetchData = async () => {
        try {
                  const [membersRes, formationsRes, newsRes] = await Promise.all([
          axios.get("https://csbackendv2-production.up.railway.app/api/members"),
          axios.get("https://csbackendv2-production.up.railway.app/api/formations"),
          axios.get("https://csbackendv2-production.up.railway.app/api/news"),
        ]);

          setMembers(membersRes.data);
          setFormations(formationsRes.data);
          setNewsList(newsRes.data);
        } catch (error) {
          console.error("Erreur lors du chargement des données :", error);
        }
      };

      fetchData();
    }, []);


  // État pour Member sélectionnée
  const [current, setCurrent] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [active, setActive] = useState("#home");

  
    // Navbar links
    const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Formations", href: "#formations" },
    { name: "News", href: "#news" }, // <-- nouveau lien
    { name: "Contact", href: "#contact" },
  ];


  // Slider content
  const slides = [
    {
      src: "/img1.jpg",
      caption: "Welcome to CS Club",
      paragraph: "Empowering innovation and technology at Ibn Tofail University.",
    },
    {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80",
      caption: "Teamwork & Collaboration",
      paragraph: "We innovate together to shape the future of digital learning.",
    },
    {
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
      caption: "Learning & Growth",
      paragraph: "Workshops, training, and projects that boost your skills.",
    },
  ];

  // slider auto-transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Active link detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          setActive(`#${section.id}`);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
                  <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-sm border-b border-gray-800 z-[9999]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <span className="text-indigo-500">CS Club</span>
              <span className="hidden sm:inline text-gray-400 text-sm">
                Ibn Tofail University
              </span>
            </a>
        
            {/* Liens Desktop */}
            <ul className="hidden lg:flex gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setActive(link.href)}
                    className={`transition ${
                      active === link.href
                        ? "text-indigo-400 font-semibold"
                        : "text-gray-300 hover:text-indigo-400"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
        
            {/* Bouton Menu Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-300 hover:text-indigo-400 transition text-3xl p-2"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        
          {/* Menu Mobile */}
          {menuOpen && (
            <div className="lg:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setMenuOpen(false);
                    setActive(link.href);
                  }}
                  className={`block text-gray-300 hover:text-indigo-400 transition ${
                    active === link.href && "text-indigo-400 font-semibold"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </nav>

            {/* HERO SLIDER */}
      <section id="home" className="relative h-[90vh] pt-20 overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.caption}
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold mb-4"
              >
                {slide.caption}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl text-gray-200 text-lg"
              >
                {slide.paragraph}
              </motion.p>
            </div>
          </motion.div>
        ))}

        
        <div className="absolute bottom-10 w-full flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? "bg-indigo-500 scale-125" : "bg-gray-500 opacity-70 hover:opacity-100"
              }`}
            ></button>
          ))}
        </div>
      </section>

            {/* ABOUT */}
      <motion.section
        id="about"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          About CS Club
        </h2>
        <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
          The Computer Science Club at Ibn Tofail University is a vibrant community of passionate students
          who collaborate, innovate, and share knowledge. We empower members to enhance both technical
          and soft skills through engaging activities, workshops, and real-world projects.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          <motion.img
            src="/ttt1.png"
            alt="CS Team Collaboration"
            className="w-full rounded-lg shadow-lg border-2 border-indigo-500"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          />

          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl mt-1"></span>
                <span>
                  Foster innovation and creativity through hands-on coding projects and workshops.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl mt-1"></span>
                <span>Encourage teamwork, collaboration, and mentorship within our community.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl mt-1"></span>
                <span>Provide learning opportunities in AI, Web Development, and Data Science.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-500 text-xl mt-1"></span>
                <span>Connect students with industry professionals and real-world tech experiences.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

            {/* TEAM */}
      <motion.section
        id="team"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedMember(member)}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300 hover:border-indigo-500"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover border-2 border-indigo-500 hover:brightness-110 transition"
              />
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-gray-400 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* MODALE MEMBRE */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full relative shadow-lg border border-gray-700">
            
            {/* Bouton x pour fermer */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <FaTimes size={22} />
            </button>

            {/* Contenu de la modale */}
            <div className="text-center">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-28 h-28 mx-auto rounded-full mb-4 border-2 border-indigo-500 object-cover"
              />
              <h3 className="text-2xl font-bold text-white mb-2">{selectedMember.name}</h3>
              <p className="text-indigo-400 font-medium mb-3">{selectedMember.role}</p>

              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>Email :</strong> {selectedMember.email}</p>
                <p><strong>Téléphone :</strong> {selectedMember.phone}</p>
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-indigo-400 hover:underline"
                >
                  Voir le profil LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FORMATIONS */}
      <motion.section
        id="formations"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Formations</h2>
        <p className="text-gray-400 mb-10 text-center">
          Explore our training programs designed to enhance your skills in various tech domains
        </p>

        {/* Grille centrée */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center place-items-center">
          {formations.map((formation, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedFormation(formation)}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg 
                        hover:shadow-indigo-500/20 transition transform hover:scale-105 cursor-pointer w-80"
            >
              <img
                src={formation.image}
                alt={formation.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-white mb-1">{formation.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{formation.duration}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{formation.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>


   

      {/* MODALE FORMATION */}
      {selectedFormation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-xl p-8 max-w-lg w-full relative shadow-lg border border-gray-700"
          >
            {/* Bouton x pour fermer */}
            <button
              onClick={() => setSelectedFormation(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <FaTimes size={22} />
            </button>

            {/* Contenu de la modale */}
            <img
              src={selectedFormation.image}
              alt={selectedFormation.title}
              className="w-full h-48 object-cover rounded-lg mb-5 border border-indigo-500"
            />
            <h3 className="text-2xl font-bold text-white mb-2">{selectedFormation.title}</h3>
            <p className="text-indigo-400 font-medium mb-3">{selectedFormation.duration}</p>
            <p className="text-gray-300 text-sm mb-4">{selectedFormation.description}</p>

            {selectedFormation.details && (
              <div className="text-gray-400 text-sm space-y-2">
                <p><strong>Instructor:</strong> {selectedFormation.details.instructor}</p>
                <p><strong>Next Session:</strong> {selectedFormation.details.date}</p>
                <p><strong>Location:</strong> {selectedFormation.details.location}</p>
              </div>
            )}
           {/* Bouton inscription*/}
            <div className="text-center mt-4">
              <a
                href="https://forms.gle/TON-LIEN-GOOGLE-FORMS" // ← remplace par ton lien Google Form
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition"
              >
                S'inscrire
              </a>
            </div>
          </motion.div>
          
        </div>
     
      )}

      {/* NEWS & EVENTS */}
      <motion.section
        id="news"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <h2 className="text-3xl font-bold text-white mb-4 text-center">News & Events</h2>
        <p className="text-gray-400 mb-10 text-center">
          Stay updated with the latest events, workshops, and achievements from CS Club 
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition cursor-pointer"
              onClick={() => setSelectedNews(news)}
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-400 mb-2">{news.date}</p>
                <h3 className="text-xl font-semibold text-white mb-3">{news.title}</h3>
                <p className="text-gray-300 text-sm">{news.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* MODALE NEWS */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-lg w-full relative shadow-lg border border-gray-700">
            
            {/* Bouton X pour fermer */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <FaTimes size={22} />
            </button>

            {/* Contenu de la modale */}
            <div className="text-center">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-32 h-32 mx-auto rounded-full mb-4 border-2 border-indigo-500 object-cover"
              />
              <h3 className="text-2xl font-bold text-white mb-2">{selectedNews.title}</h3>
              <p className="text-indigo-400 font-medium mb-3">{selectedNews.date}</p>
              <p className="text-gray-300 text-sm mb-4">{selectedNews.description}</p>

              {/* Détails supplémentaires */}
              {selectedNews.details && (
                <div className="text-gray-300 text-sm mb-4 space-y-1">
                  <p><strong>Location:</strong> {selectedNews.details.location}</p>
                  <p><strong>Duration:</strong> {selectedNews.details.duration}</p>
                  <p><strong>Instructor:</strong> {selectedNews.details.instructor}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      <motion.section
        id="contact"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Contact</h2>
        <p className="text-gray-400 mb-8">
          Une question ou une idée ? Envoyez-nous un message !
        </p>
        <form className="max-w-lg mx-auto space-y-4">
          <input
            type="text"
            placeholder="Votre nom"
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Votre email"
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500"
          />
          <textarea
            rows="4"
            placeholder="Votre message"
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500"
          ></textarea>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-sm text-white">
            Envoyer
          </button>
        </form>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 text-center py-6">
        <div className="flex justify-center gap-6 text-xl">
          <a href="https://www.instagram.com/cs_club.fsk/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
            <FaInstagram />
          </a>
          <a href="mailto:csclub@ibntofail.edu.ma" className="hover:text-indigo-400 transition">
            <FaEnvelope />
          </a>
          <a href="https://www.linkedin.com/company/csclub-ibntofail" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
            <FaLinkedin />
          </a>
          <a href="https://chat.whatsapp.com/ISBa8MtFc5Z5Gvs8YrL1Z6" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
            <FaWhatsapp />
          </a>
        </div>
        <p className="mt-4 text-sm">© 2025 CS Club - Ibn Tofail University. All rights reserved.</p>
      </footer>
    </div>
  );
}
