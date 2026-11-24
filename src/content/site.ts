/**
 * Conteúdo do site da Phillautia.
 *
 * Regra: tudo aqui vem do presskit oficial (PDF) ou do material enviado
 * pela artista. Onde ainda não há dado confirmado, o valor é `null` e a
 * interface simplesmente não renderiza aquele elemento.
 */

export const artist = {
  name: "Phillautia",
  person: "Giovanna Polo",
  genre: "Full On Morning",
  since: 2024,
  greek: "φιλαυτία",
  /** TODO(discovery): confirmar cidade/país de base para SEO e booking. */
  city: null as string | null,
  /** TODO(discovery): e-mail oficial de booking. */
  bookingEmail: null as string | null,
};

export const links = {
  instagram: "https://www.instagram.com/phillautia.music",
  instagramDm: "https://ig.me/m/phillautia.music",
  soundcloud: "https://on.soundcloud.com/dGWyd3pqTPrgdIc4Ip",
  youtube: "https://youtu.be/7t3lTlqMlxI",
  youtubeId: "7t3lTlqMlxI",
  presskit:
    "https://drive.google.com/drive/folders/1lJza7IyvuoRQ22j-zK4JkTCk4TvUgzDb",
};

/** Textos do presskit (palavras da artista). */
export const identity = {
  lead: "Phillautia é o cultivo da própria integridade.",
  contrast:
    "Não o ego que busca ser servido, mas a consciência que busca tornar-se melhor.",
  bio: "Projeto idealizado por Giovanna Polo, que iniciou seu percurso como DJ em 2024 após anos na pista, com o desejo de trazer para os decks uma experiência de conexão, liberdade e amor através da música.",
  concept:
    "Inspirada no conceito grego das formas do amor, phillautia representa o amor por si mesma e o autoconhecimento, traduzido na transformação de sentimentos em frequências e energia em movimento.",
  sound:
    "Com uma sonoridade marcada pelo Full On Morning, os sets transitam entre atmosferas envolventes e melódicas e momentos de pura explosão energética, criando uma jornada para quem se permite viver o momento.",
};

export const symbol = {
  title: "Duas colunas, um movimento",
  text: "O emblema nasce da distorção de duas colunas greco-romanas: a estrutura clássica que sustenta, colocada em giro. Firmeza e fluxo no mesmo gesto.",
};

/**
 * Os sete ciclos da lótus.
 * Rascunho derivado frase a frase do texto de identidade do presskit.
 * TODO(discovery): validar nomes e ordem com a artista.
 */
export const petals = [
  {
    name: "Integridade",
    line: "O cultivo da própria integridade.",
  },
  {
    name: "Consciência",
    line: "Não o ego que busca ser servido, mas a consciência que busca tornar-se melhor.",
  },
  {
    name: "Caráter",
    line: "O encontro com o próprio caráter.",
  },
  {
    name: "Respeito",
    line: "O respeito por aquilo que se é.",
  },
  {
    name: "Raiz",
    line: "Um solo interno sólido o suficiente para florescer.",
  },
  {
    name: "Escolha",
    line: "Quando o amor deixa de ser necessidade e se torna escolha.",
  },
  {
    name: "Conexão",
    line: "A condição que permite viver bem e se conectar de forma autêntica.",
  },
] as const;

export const gallery = [
  { src: "/images/giovanna-bracos.jpg", alt: "Giovanna Polo com os braços erguidos e olhos fechados, em tecido listrado colorido", w: 720, h: 1080 },
  { src: "/images/giovanna-oculos.jpg", alt: "Giovanna Polo ajustando óculos lilás, com top de estampa de galáxia", w: 720, h: 1080 },
  { src: "/images/giovanna-fones.jpg", alt: "Giovanna Polo sentada segurando fones de DJ", w: 949, h: 1080 },
  { src: "/images/giovanna-perfil.jpg", alt: "Giovanna Polo de perfil, sobre fundo claro, com kimono estampado", w: 1500, h: 2000 },
  { src: "/images/giovanna-galaxia.jpg", alt: "Giovanna Polo de corpo inteiro com kimono de galáxia e calça violeta", w: 720, h: 1080 },
  { src: "/images/giovanna-maos.jpg", alt: "Retrato de Giovanna Polo com a mão sobre a cabeça", w: 720, h: 1080 },
] as const;
