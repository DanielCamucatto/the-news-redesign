import { useState } from 'react';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const ExternalLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const navItems = [
  { label: 'app', href: 'https://thenews.com.br/app', external: true },
  { label: 'streak', href: '/streak' },
  { label: 'podcast', href: 'https://open.spotify.com/show/5cYtKjFwlRCSZKyV6ZC8Wq', external: true },
  { label: 'marcas', href: '/marcas' },
  { label: 'dúvidas', href: '/#faq' },
];

const steps = [
  { num: '1.', title: 'se inscreva', desc: 'coloque seu email e clique no botão para se inscrever gratuitamente', img: 'https://assets.thenewscc.com.br/landingPage/email.gif' },
  { num: '2.', title: 'prepare um café', desc: 'hora de preparar o café sem açúcar, abrir o email e ler sua edição do dia', img: 'https://assets.thenewscc.com.br/landingPage/cup-smoke.gif' },
  { num: '3.', title: 'indique e ganhe prêmios', desc: 'leia todos os dias para aumentar seu Streak e indique o the news para ganhar brindes exclusivos', img: 'https://assets.thenewscc.com.br/landingPage/streak-gif.gif' },
];

const faqItems = [
  {
    q: "O que eu vou receber ao me inscrever?",
    a: "Ao se inscrever, você receberá, de segunda a domingo, um resumo direto e imparcial das principais notícias do Brasil e do mundo, explicado de forma leve e sem enrolação. Em 5 minutos, comece o dia bem informado.",
  },
  {
    q: "A newsletter é realmente gratuita?",
    a: "Sim! O the news é 100% gratuito. Para você consumir o produto, basta colocar seu email e passar a receber. Monetizamos através de parcerias com marcas.",
  },
  {
    q: "O the news tem viés político?",
    a: "Absolutamente não. Somos um jornal imparcial. Nosso compromisso é com a informação clara e objetiva, sem influências políticas ou ideológicas. Nosso inimigo não é um lado ou outro, mas sim a IGNORÂNCIA.",
  },
  {
    q: "Vou receber spam ou propagandas indesejadas?",
    a: "Não! Só enviamos conteúdos relevantes, e você pode sair da lista a qualquer momento com um clique. Além disso, não vendemos seus dados para ninguém. Até mesmo os nossos conteúdos com marcas costumam agradar a audiência.",
  },
  {
    q: "Como posso garantir que os emails não vão para spam ou promoções?",
    a: "Para garantir que sempre receba o the news na caixa de entrada (como deve ser), arraste a mensagem para a aba 'Principal' no seu provedor de email.",
  },
  {
    q: "Posso compartilhar a newsletter com amigos?",
    a: "Claro! Aliás, deve. Quanto mais gente informada e preocupada com bons hábitos, melhor. Você pode encaminhar o email ou compartilhar seu link de indicação para ganhar prêmios!",
  },
  {
    q: "Por que essa newsletter é diferente das outras?",
    a: "Se chegou até aqui, já temos sua atenção. Leia e descubra!",
  },
];

const testimonialNumbers = Array.from({ length: 8 }, (_, i) => i + 2);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-white font-[Helvetica_Now_Display,sans-serif] overflow-x-hidden">
      {/* ========== HEADER ========== */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between">
          <a href="/"><img alt="Logo" className="h-10 md:h-18 w-auto" src="https://assets.thenewscc.com.br/newLogo.png"/></a>

          <div className="hidden text-base lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="flex items-center text-black hover:bg-yellow lowercase text-lg transition" target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>
                {item.label}
                {item.external && <span className="ml-2 h-4 w-4"><ExternalLink/></span>}
              </a>
            ))}
          </div>

          <div className="hidden lg:block py-2">
            <a href="/#headerLP" className="relative inline-block overflow-hidden text-black text-lg font-medium rounded-full py-2 px-6 cursor-pointer transition-all duration-300 ease-out bg-gradient-to-r from-[#ffce04] to-[#ff8a47] shadow-[0_4px_16px_0_rgba(255,138,71,0.3),0_1px_3px_0_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_0_rgba(255,138,71,0.4),0_2px_4px_0_rgba(0,0,0,0.08)] hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] active:brightness-95">
              inscreva-se
            </a>
          </div>

          <div className="lg:hidden flex items-center">
            <button className="text-black focus:outline-none" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}><MenuIcon/></button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
            {navItems.map(item => <a key={item.label} href={item.href} className="block text-black text-lg lowercase py-1">{item.label}</a>)}
            <a href="/#headerLP" className="relative inline-block overflow-hidden text-black text-lg font-medium rounded-full py-2 px-6 cursor-pointer bg-gradient-to-r from-[#ffce04] to-[#ff8a47]">inscreva-se</a>
          </div>
        )}
      </header>

      {/* ========== HERO ========== */}
      <div id="headerLP" className="w-full">
        <div className="text-center w-full pb-20 pt-20 md:pt-30 px-4 md:px-20 flex flex-col items-center justify-center">
          <div className="text-4xl md:text-[120px] font-semibold mb-4 mt-6 lowercase leading-none">
            <h1>o <span className="bg-gradient-to-r from-[#ffce04] to-[#ff8a47] bg-clip-text text-transparent">+ imparci<span className="opacity-100 text-black">_</span></span></h1>
            <h1>jornal digital</h1>
            <h1>do país</h1>
          </div>
          <p className="text-xl md:text-2xl max-w-2xl mt-4">as principais notícias do Brasil e do mundo, diariamente no seu email <span className="font-bold">totalmente grátis</span>.</p>
          <form className="flex flex-col items-center w-full" onSubmit={e => e.preventDefault()}>
            <div className="flex items-center mt-10 px-1 border border-black rounded-full bg-white overflow-hidden max-w-xl w-full h-full">
              <span className="ml-4"><MailIcon/></span>
              <input placeholder="coloque seu email" className="bg-white w-full text-lg md:text-xl p-3 pl-3 text-black focus:outline-none" required type="email" value={email} onChange={e => setEmail(e.target.value)}/>
              <button className="bg-gradient-to-r from-[#ffce04] to-[#ff8a47] w-full text-black text-2xl rounded-full transition-all lowercase cursor-pointer hover:brightness-105 py-2 max-w-30 md:max-w-40 text-lg md:text-xl" type="submit">inscreva-se</button>
            </div>
          </form>
          <div className="flex mt-6 items-center gap-2 text-gray-400">
            <a href="https://thenewscc.beehiiv.com/" target="_blank" className="text-base md:text-lg hover:underline cursor-pointer">ou leia nossas edições primeiro</a>
            <span className="h-4 w-4"><ArrowRight/></span>
          </div>
        </div>
      </div>

      {/* ========== STEPS: mais inteligente em 5 minutos ========== */}
      <div className="w-full mb-20 pb-2 pt-2 md:pb-10 md:pt-10 px-4">
        <div className="w-full flex flex-col items-start md:items-center">
          <div className="text-center text-4xl md:text-6xl">
            <p className="inline-block text-gray-dark font-semibold">mais inteligente</p>
            <p className="inline-block ml-2 bg-gradient-to-r from-[#ffce04] to-[#ff8a47] bg-clip-text text-transparent font-bold">em 5 minutos</p>
          </div>
          <div className="relative w-full max-w-5xl mt-4">
            <div className="w-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'none' as any }}>
              {steps.map((s, i) => (
                <div key={i} className="flex-shrink-0 w-full snap-center flex justify-center m-2">
                  <div className="border border-gray-300 rounded-[10px] md:rounded-[50px] p-8 md:p-12 w-full h-[500px] md:h-[600px] flex flex-col md:flex-row items-center justify-center">
                    <div className="w-full md:w-1/2 text-left flex md:flex-col md:pl-10 justify-center gap-4 md:gap-0">
                      <h1 className="text-7xl md:text-[150px] font-bold md:leading-30 text-yellow">{s.num}</h1>
                      <div>
                        <h1 className="text-4xl leading-9 md:leading-12 md:text-5xl font-bold text-gray-dark">{s.title}</h1>
                        <p className="text-lg leading-6 mt-2 md:text-xl hidden md:block text-gray-500">{s.desc}</p>
                      </div>
                    </div>
                    <p className="pt-3 text-lg leading-4 block md:hidden">{s.desc}</p>
                    <div className="w-full md:w-1/2 flex justify-center items-center pt-4 md:pt-0">
                      <img alt={s.title} className="w-auto h-full max-h-[300px] md:max-h-[400px]" src={s.img}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-4xl mt-4 flex items-center justify-center relative">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button key={i} className={`w-3 h-3 rounded-full transition-colors bg-gray-200 hover:bg-gray-400 ${i === 0 ? 'bg-gray-300' : ''}`}/>
              ))}
            </div>
            <div className="hidden lg:flex absolute lg:right-[-50px] gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bg-gray-200 text-gray-400 rounded-full p-1 h-8 w-8 cursor-pointer hover:bg-gray-400 transition-colors"><path d="m15 18-6-6 6-6"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bg-gray-200 text-gray-400 rounded-full p-1 h-8 w-8 cursor-pointer hover:bg-gray-400 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* ========== TESTIMONIALS ========== */}
      <section id="lpTestimonials" className="w-full py-20 lg:py-30 mb-20 md:px-4 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-start">
          <div className="text-center md:text-left w-full lg:max-w-3xl mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-4xl md:text-6xl text-gray-dark font-semibold">criando bons hábitos e te deixando <span className="bg-gradient-to-r from-[#ffce04] to-[#ff8a47] bg-clip-text text-transparent">mais inteligente</span></h1>
            <p className="text-lg md:text-2xl text-gray-500">nos comprometemos a entregar notícias da forma mais inteligente.</p>
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex animate-marquee" style={{ gap: '0.5rem', '--marquee-duration': '47.56s' } as React.CSSProperties}>
              {[...testimonialNumbers, ...testimonialNumbers].map((n, i) => (
                <div key={i} className="h-[500px] mx-2 flex-shrink-0">
                  <img alt={`testimonial ${n}`} className="h-full object-cover rounded-lg" src={`https://assets.thenewscc.com.br/landingPage/testimonials/testimonials-${n}.png`}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <div id="faq" className="w-full max-w-screen-xl mx-auto flex flex-col items-center md:items-start justify-start px-4 pt-4 pb-24">
        <div className="w-full">
          <div className="flex flex-col w-full border-b-1 border-black pb-2">
            <div className="flex w-full border-b-1 border-black items-center gap-4">
              <h1 className="text-black w-full text-5xl md:text-6xl font-bold mb-2">dúvidas</h1>
              <img alt="Ícones" className="h-4" src="https://assets.thenewscc.com.br/icons-black.png"/>
            </div>
          </div>
          <div className="text-black w-full">
            {faqItems.map((item, i) => (
              <div key={i} className="text-black w-full">
                <button className="w-full md:px-4 py-6 flex justify-between border-b-1 cursor-pointer border-black" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <div className="text-left text-lg md:text-xl flex items-center w-full">
                    <div className={`hidden md:flex w-4 h-4 border-2 rounded-[3px] mr-4 transition-all duration-300 ${faqOpen === i ? 'bg-black border-black' : 'border-black'}`}/>
                    {item.q}
                  </div>
                  <div className={`flex transition-transform duration-300 ${faqOpen === i ? 'rotate-180' : ''}`}><ChevronDown/></div>
                </button>
                {faqOpen === i && (
                  <div className="md:px-4 pb-6 text-gray-600 text-base md:text-lg">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== BOTTOM CTA ========== */}
      <div className="w-full px-4 text-black flex justify-center lg:pt-10">
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center md:gap-12">
          <div className="flex flex-col items-center xl:items-start gap-2">
            <div className="text-center xl:text-start text-5xl md:text-7xl font-semibold">
              <p className="bg-gradient-to-r from-[#ffce04] to-[#ff8a47] bg-clip-text text-transparent pb-2 leading-[1.15]">+ inteligente</p>
              <p>em <span>5 minutos</span></p>
            </div>
            <p className="mt-4 md:mt-0 px-0 text-center md:text-left max-w-[470px] text-xl md:text-2xl text-gray-500">
              <span className="text-black font-medium">notícias relevantes e imparciais</span>, direto no seu email gratuitamente, <span className="text-black font-medium">todo dia, às 06:06</span>
            </p>
            <form className="flex flex-col items-center w-full" onSubmit={e => e.preventDefault()}>
              <div className="flex items-center mt-10 px-1 border border-black rounded-full bg-white overflow-hidden max-w-xl w-full h-full">
                <span className="ml-4"><MailIcon/></span>
                <input placeholder="coloque seu email" className="bg-white w-full text-lg md:text-xl p-3 pl-3 text-black focus:outline-none" required type="email" value={email2} onChange={e => setEmail2(e.target.value)}/>
                <button className="bg-gradient-to-r from-[#ffce04] to-[#ff8a47] w-full text-black text-2xl rounded-full transition-all lowercase cursor-pointer hover:brightness-105 py-2 max-w-30 md:max-w-40 text-lg md:text-xl" type="submit">inscreva-se</button>
              </div>
            </form>
            <img alt="" className="flex xl:hidden pt-8 h-full w-full max-w-2xl" src="https://assets.thenewscc.com.br/landingPage/bottom-cellphone.png"/>
          </div>
          <img alt="" className="hidden xl:flex h-full w-full max-w-xl" src="https://assets.thenewscc.com.br/landingPage/bottom-cellphone.png"/>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <footer className="pt-14 pb-6 bg-gray-dark text-white w-full flex flex-col items-center justify-center">
        <div className="px-8 md:px-20 2xl:px-40 flex flex-col md:flex-row justify-between md:gap-x-12 max-w-[1600px] w-full">
          <div>
            <a href="/"><img alt="Logo" className="h-14 lg:h-18 w-auto" src="https://assets.thenewscc.com.br/newLogoWhite1.png"/></a>
            <p className="text-white max-w-xs w-full">tudo que você precisa saber para começar seu dia bem e informado</p>
          </div>
          <div>
            <p className="block xl:hidden uppercase text-yellow text-lg font-bold pt-12 md:pt-0 pb-4">Links</p>
            <div className="flex flex-col xl:flex-row lowercase md:gap-12">
              <div className="flex flex-col gap-2">
                <a href="https://open.spotify.com/show/5cYtKjFwlRCSZKyV6ZC8Wq" className="hover:underline hover:text-yellow">Podcast do the news</a>
                <a href="https://thenewscc.typeform.com/to/o7jIv0ed" className="hover:underline hover:text-yellow">anuncie no the news</a>
                <a href="/evento" className="hover:underline hover:text-yellow">evento 0606</a>
              </div>
              <div className="flex flex-col gap-2">
                <a href="/marcas" className="hover:underline hover:text-yellow">nossas marcas</a>
                <a href="/contact" className="hover:underline hover:text-yellow">fale conosco</a>
                <a href="/#faq" className="hover:underline hover:text-yellow">perguntas frequentes</a>
              </div>
            </div>
          </div>
          <div className="text-xl font-light mt-14 md:mt-0">
            <a href="/#headerLP" className="relative inline-block overflow-hidden text-black text-lg font-medium rounded-full py-2 px-6 cursor-pointer transition-all duration-300 ease-out bg-gradient-to-r from-[#ffce04] to-[#ff8a47] shadow-[0_4px_16px_0_rgba(255,138,71,0.3),0_1px_3px_0_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_0_rgba(255,138,71,0.4),0_2px_4px_0_rgba(0,0,0,0.08)] hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] active:brightness-95">
              inscreva-se
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-x-12 text-sm text-gray pt-20">
          <p>© 2026 Grupo TNS</p>
          <a href="/policies" className="hover:underline">Políticas de Privacidade</a>
          <a href="/terms" className="hover:underline">Termos de Uso</a>
        </div>
      </footer>
    </div>
  );
}

export default App;