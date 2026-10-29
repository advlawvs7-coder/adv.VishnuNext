const groups = [
  [
    "family",
    /divorce|matrimonial|family|child|custody|maintenance|alimony|domestic|marriage|adoption/i,
  ],
  [
    "property",
    /property|real.estate|land|title|mutation|possession|partition|tenant|builder|housing/i,
  ],
  [
    "criminal",
    /criminal|bail|police|fir|fraud|forgery|arrest|defence|cheque.bounce|ni.act|pocso/i,
  ],
  ["immigration", /immigration|visa|citizen|passport|foreign|migration/i],
  ["nri", /nri|overseas|international|abroad|expat|cross.border/i],
  ["cyber", /cyber|digital|data|information.technology|software|online/i],
  ["wills", /will|succession|inheritance|testament|estate|probate/i],
  ["arbitration", /arbitration|mediation|conciliation|dispute.resolution/i],
  [
    "corporate",
    /business|corporate|company|commercial|insolvency|nclt|contract|debt|recovery|startup/i,
  ],
  [
    "civil",
    /civil|court|tribunal|litigation|petition|public.interest|consumer|labour/i,
  ],
];
export function topicImage(value = "", category = "") {
  const source = `${value} ${category}`;
  const match = groups.find(([, regex]) => regex.test(source));
  return `/images/topics/${match ? match[0] : "civil"}.svg`;
}
