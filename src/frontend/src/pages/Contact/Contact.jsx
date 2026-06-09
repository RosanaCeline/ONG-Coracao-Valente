import { useState, useRef } from "react";
import "./Contact.css";

function PataIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="28" r="11" fill="#C8001A" opacity="0.15" />
      <ellipse cx="12" cy="20" rx="4" ry="5.5" fill="#fff" opacity="0.85" />
      <ellipse cx="19" cy="17" rx="4" ry="5.5" fill="#fff" opacity="0.85" />
      <ellipse cx="26" cy="17" rx="4" ry="5.5" fill="#fff" opacity="0.85" />
      <ellipse cx="33" cy="20" rx="4" ry="5.5" fill="#fff" opacity="0.85" />
      <ellipse cx="22" cy="30" rx="9" ry="7" fill="#fff" opacity="0.9" />
      <path d="M22 33 C22 33 17 29 17 26.5 C17 25 18.2 24 19.5 24 C20.5 24 21.5 24.8 22 25.5 C22.5 24.8 23.5 24 24.5 24 C25.8 24 27 25 27 26.5 C27 29 22 33 22 33Z" fill="#C8001A" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  );
}
const CARDS = [
  { 
    src: "/acoes/castracao.jpeg",
    alt: "Mutirão de castração",    
    title: "Castração de animais",    
    sub: "Mutirão de vacinação e cuidados veterinários",        
    gradient: "linear-gradient(135deg,#8aa08a,#5a7a5a)", 
    emoji: "🐾" 
  },
  { 
    src: "/acoes/cachorranegonaedit.png",
    alt: "Cachorro para adoção",    
    title: "Divulgação de animais",   
    sub: "Animais disponíveis para adoção responsável",         
    gradient: "linear-gradient(135deg,#c9b890,#a08060)", 
    emoji: "🐶" 
  },
  { 
    src: "/acoes/escolaedit.png", 
    alt: "Ação nas escolas",        
    title: "Educação ambiental",      
    sub: "Ações educativas levadas às escolas da região",       
    gradient: "linear-gradient(135deg,#a0b8c9,#607080)", 
    emoji: "🏫" 
  },
  { 
    src: "", 
    alt: "Feira de adoção",          
    title: "Feiras de adoção",        
    sub: "Encontrando lares para animais resgatados",            
    gradient: "linear-gradient(135deg,#c9a0b8,#806070)", 
    emoji: "❤️" 
  },
  { 
    src: "/acoes/animalresgatado.png", 
    alt: "Resgate de animais",      
    title: "Resgate e reabilitação",  
    sub: "Atendimento a animais em situação de risco",          
    gradient: "linear-gradient(135deg,#b8c9a0,#708060)", 
    emoji: "🐕" 
  },
];

function CarouselCard({ card }) {
  const [imgError, setImgError] = useState(!card.src);
  return (
    <div className="cv-card">
      {!imgError && card.src ? (
        <img src={card.src} alt={card.alt} onError={() => setImgError(true)} />
      ) : (
        <div className="cv-card-placeholder" style={{ background: card.gradient }}>
          <span className="cv-card-placeholder-emoji">{card.emoji}</span>
          <span className="cv-card-placeholder-label">{card.alt}</span>
        </div>
      )}
      <div className="cv-card-label">
        <strong>{card.title}</strong>
        <span>{card.sub}</span>
      </div>
    </div>
  );
}

function ArrowBtn({ dir, onClick }) {
  return (
    <button className="cv-arrow-btn" onClick={onClick} aria-label={dir === "left" ? "Anterior" : "Próximo"}>
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

function Carousel() {
  const [current, setCurrent] = useState(0);
  const wrapperRef = useRef(null);
  const touchStartX = useRef(0);
  const total = CARDS.length;

  const goTo = (idx) => setCurrent((idx + total) % total);


  const offset = (wrapperRef.current?.clientWidth ?? 350) + 16;
  return (
    <div>
      <div className="cv-carousel-wrapper" ref={wrapperRef}>
        <div
          className="cv-carousel-track"
          style={{ transform: `translateX(-${current * offset}px)` }}
          // Substitua o style antigo por este:
style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
          }}
        >
          {CARDS.map((card, i) => <CarouselCard key={i} card={card} />)}
        </div>
      </div>

      <div className="cv-carousel-controls">
        <ArrowBtn dir="left" onClick={() => goTo(current - 1)} />
        <div className="cv-dots">
          {CARDS.map((_, i) => (
            <button key={i} className={`cv-dot${i === current ? " active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <ArrowBtn dir="right" onClick={() => goTo(current + 1)} />
      </div>
    </div>
  );
}

function SocialIcon({ icon, title }) {
  return (
    <button className="cv-social-icon" title={title} aria-label={title}>
      {icon}
    </button>
  );
}

export default function CoracaoValenteMobile() {
  return (
    <div className="cv-page">
      <div className="cv-frame">
        <main>

          {/* SEÇÃO 1: QUEM SOMOS */}
          <section className="cv-quem-somos">
            <p className="cv-chapeu">Quem Somos</p>
            <h1 className="cv-titulo-principal">
              De uma <span className="cv-destaque">ideia</span>, uma revolução de{" "}
              <span className="cv-destaque">amor.</span>
            </h1>
            <div className="cv-paragrafos">
              <p>Em 21 de setembro de 2018, em Tianguá, um grupo de pessoas decidiu não indignar-se não apenas pelo sofrimento — mas precisou agir. Assim nasceu a ONG Coração Valente.</p>
              <p>Desde então, resgatamos, tratamos e encaminhamos centenas de animais que chegaram até nós machucados, assustados ou simplesmente esquecidos. Não somos um abrigo permanente: somos a ponte entre o abandono e um novo lar.</p>
              <p>Cada castração realizada, cada feira de adoção organizada e cada ação educativa levada às escolas é um passo em direção a uma Serra da Ibiapaba mais consciente e mais justa com os animais.</p>
              <p>Tudo isso só é possível graças a você — voluntários, doadores e parceiros que acreditam que o cuidado com os animais diz muito sobre quem somos como comunidade.</p>
            </div>
          </section>

          {/* SEÇÃO 2: PRINCIPAIS AÇÕES */}
          <section className="cv-acoes">
            <h2 className="cv-titulo-secao">
              Nossas principais <span className="cv-destaque">ações</span>
            </h2>
            <Carousel />
          </section>

          {/* SEÇÃO 3: CTA */}
          <section className="cv-cta">
            <a href="#" className="cv-btn-cta">Quero ser voluntário</a>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="cv-footer">
          <div className="cv-footer-top">
            <div className="cv-footer-brand">
              <PataIcon />
              <span className="cv-footer-brand-name">ONG Coração Valente</span>
            </div>
            <div className="cv-footer-socials">
              <SocialIcon icon={<IconInstagram />} title="Instagram" />
              <SocialIcon icon={<IconFacebook />}  title="Facebook"  />
              <SocialIcon icon={<IconWhatsApp />}  title="WhatsApp"  />
            </div>
          </div>
          <div className="cv-footer-bottom">
            © 2024 ONG Coração Valente · Tianguá, CE · Todos os direitos reservados
          </div>
        </footer>
      </div>
    </div>
  );
}