import { Link, useParams } from 'react-router';
import { ArrowLeft, Heart, Crown, Shield, Skull } from 'lucide-react';

const symbolData: Record<string, {
  name: string;
  icon: typeof Heart;
  description: string;
  history: string;
  image: string;
  rings: Array<{
    id: string;
    name: string;
    meaning: string;
    culture: string;
    image: string;
    date?: string;
    artist?: string;
    origin?: string;
    period?: string;
    medium?: string;
    dimensions?: string;
    classification?: string;
    credit?: string;
  }>;
}> = {
  love: {
    name: 'LOVE',
    icon: Heart,
    description: 'Rings have symbolized love and commitment since ancient times. The circle represents eternity, with no beginning or end, symbolizing immortal and faithful love.',
    history: 'In ancient Egypt, people wove reeds into rings as love tokens. Romans wore rings on the left ring finger, believing a "vein of love" connected directly to the heart.',
    image: 'https://images.unsplash.com/photo-1645748655434-9cc8e96470a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'love-1',
        name: 'Eternity Band',
        meaning: 'Platinum 950 | Full circle diamonds | Victorian Era 1890s | Channel-set round brilliants symbolizing eternal love',
        culture: 'European Tradition',
        image: 'https://images.unsplash.com/photo-1499899833954-5ecd9439d17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: 'love-2',
        name: 'Heart Gemstone',
        meaning: '14K Rose Gold | Natural pink sapphire | Art Deco 1920s | Heart-cut center stone with diamond halo',
        culture: 'Modern Design',
        image: 'https://images.unsplash.com/photo-1587947330318-88fcd9055420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: 'love-3',
        name: 'Claddagh Ring',
        meaning: 'The \'Claddagh\' ring takes its name from the Irish village. It is formed of a crowned heart held between two hands. It draws upon older traditions of rings with clasped hands and hearts and is still a popular item of jewellery.',
        culture: 'Irish Tradition',
        image: 'https://images.unsplash.com/photo-1705854937134-dd130d90df5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        date: '1750-1800 (made)',
        artist: 'Robinson, Andrew (goldsmith)',
        origin: 'Galway (made)',
      },
      {
        id: 'love-4',
        name: 'Antique Claddagh',
        meaning: 'The \'Claddagh\' ring takes its name from the Irish village. It is formed of a crowned heart held between two hands. It draws upon older traditions of rings with clasped hands and hearts and is still a popular item of jewellery.',
        culture: 'Irish Tradition',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=antique%20claddagh%20ring%20gold%20jewelry%20on%20black%20background%20professional%20photography&image_size=square',
        date: '1750-1800 (made)',
        artist: 'Robinson, Andrew (goldsmith)',
        origin: 'Galway (made)',
      },
    ],
  },
  power: {
    name: 'POWER',
    icon: Crown,
    description: 'Rings signify power and status, from ancient imperial signet rings to modern symbols of authority, representing dominion and dignity.',
    history: 'Ancient monarchs used signet rings to seal documents with legal authority. The Papal Ring of the Fisherman and royal scepter rings all symbolize power.',
    image: 'https://images.unsplash.com/photo-1713999261126-8755201f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'power-1',
        name: 'Roman Triple Ring',
        meaning: 'This ring exemplifies a flamboyant type of costume jewelry that was especially popular in the eastern half of the Roman Empire. The three finger bands support five colorful settings, containing pearls, glass imitation gems, and a central green bead (a modern replacement).',
        culture: 'Roman, Syrian',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20roman%20gold%20triple%20finger%20ring%20with%20colored%20glass%20gems%20museum%20artifact%20on%20white%20background&image_size=square',
        date: '3rd-4th century CE',
        period: 'Late Imperial or Late Antique',
        medium: 'Gold, glass',
        dimensions: 'length 2 1/2 in. (6.4 cm)',
        classification: 'Gold and Silver',
        credit: 'Purchase, Deanna Anderson Gift and funds from various donors, 2002',
      },
    ],
  },
  protection: {
    name: 'PROTECTION',
    icon: Shield,
    description: 'Protective rings ward off evil and bring good fortune. Rings set with specific gemstones or inscribed with runes are considered talismans.',
    history: 'In medieval times, certain gemstones were believed to possess mystical powers. Turquoise wards off evil, agate brings courage, sapphire protects from poison.',
    image: 'https://images.unsplash.com/photo-1632984513357-e25ebe1bee37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'protection-1',
        name: 'Turquoise Guardian',
        meaning: 'Sterling Silver | Natural turquoise | Navajo Craft 1940s | Traditional southwestern bezel setting',
        culture: 'Native American',
        image: 'https://images.unsplash.com/photo-1726507367666-08c5f025bdf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: 'protection-2',
        name: 'Runic Ring',
        meaning: 'Bronze alloy | Elder Futhark runes | Viking Age 900s | Hand-stamped protective symbols',
        culture: 'Nordic Tradition',
        image: 'https://images.unsplash.com/photo-1719924998065-0c60e329ef58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: 'protection-3',
        name: 'Evil Eye Ring',
        meaning: '14K Gold | Blue enamel eye | Ottoman Empire 1820s | Traditional Nazar boncuğu design',
        culture: 'Mediterranean Culture',
        image: 'https://images.unsplash.com/photo-1705854937134-dd130d90df5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
    ],
  },
  death: {
    name: 'MORTALITY',
    icon: Skull,
    description: 'Memento mori rings remind us of life\'s brevity, encouraging living in the present. Skulls and hourglasses express philosophical contemplation of existence.',
    history: 'Victorian mourning rings commemorated the deceased, often containing their hair. "Memento Mori" themed rings remind people to cherish life.',
    image: 'https://images.unsplash.com/photo-1646656493803-3fa79874de02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'death-1',
        name: 'Skull Ring',
        meaning: '925 Sterling Silver | Memento mori motif | Renaissance 1600s | Hand-carved death head with crossbones',
        culture: 'Gothic Culture',
        image: 'https://images.unsplash.com/photo-1706196612848-0cd22cb6231e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: 'death-2',
        name: 'Mourning Ring',
        meaning: '15K Gold | Black enamel & hair | Victorian 1860s | Glazed compartment with beloved\'s hair',
        culture: 'Victorian Era',
        image: 'https://images.unsplash.com/photo-1499899833954-5ecd9439d17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
      {
        id: 'death-3',
        name: 'Cycle Ring',
        meaning: 'White Jade | Ouroboros serpent | Ming Dynasty 1520s | Continuous circle representing eternal return',
        culture: 'Eastern Culture',
        image: 'https://images.unsplash.com/photo-1709150485687-b5ed84fd776c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      },
    ],
  },
  nature: {
    name: 'NATURE',
    icon: Heart,
    description: 'Rings inspired by natural elements, capturing the beauty of flora, fauna, and the natural world.',
    history: 'Nature has inspired jewelry makers for centuries. Flowers, leaves, animals, and celestial bodies have all been used as motifs in ring design.',
    image: 'https://images.unsplash.com/photo-1514612497953-05d1e5e171fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'nature-1',
        name: 'Raindance Ring',
        meaning: 'This ring is one of a family of \'Raindance\' jewels designed and retailed by the firm of Boodles. The design for the ring was conceived in 2000, and the first ring was made in 2002. The title \'Raindance\' celebrates the abundance and good fortune which traditionally follow a raindance.',
        culture: 'British',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=luxury%20diamond%20ring%20platinum%20with%20multiple%20diamonds%20on%20black%20background%20professional%20jewelry%20photography&image_size=square',
        date: '2009 (made), 2000 (designed)',
        artist: 'Boodles (maker), Boodles (designer)',
        origin: 'London (made), Liverpool (designed)',
      },
    ],
  },
};

export function SymbolDetail() {
  const { symbolType } = useParams();
  const symbol = symbolType ? symbolData[symbolType] : null;

  if (!symbol) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-rose-950/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Symbol category not found</p>
          <Link to="/symbols" className="text-white underline">Back to Symbols</Link>
        </div>
      </div>
    );
  }

  const Icon = symbol.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-rose-950/20 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="absolute top-32 right-32 w-72 h-72 border border-white/5 rounded-full" />
      <div className="absolute bottom-32 left-32 w-56 h-56 border border-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full" />

      <header className="sticky top-0 bg-slate-950/95 backdrop-blur-sm z-10 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/symbols" className="text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Icon className="w-6 h-6 text-white" />
          <h1 className="text-2xl tracking-wide text-white">{symbol.name}</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img
              src={symbol.image}
              alt={symbol.name}
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5">
              <h2 className="text-2xl mb-4 text-white">Symbolic Meaning</h2>
              <p className="text-neutral-400 leading-relaxed text-sm">{symbol.description}</p>
            </div>
            <div className="bg-neutral-900/50 p-8 rounded-xl border border-white/5">
              <h2 className="text-2xl mb-4 text-white">Historical Origins</h2>
              <p className="text-neutral-400 leading-relaxed text-sm">{symbol.history}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl mb-6 text-center text-white">Related Rings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {symbol.rings.map((ring) => (
              <Link
                key={ring.id}
                to={`/ring/${ring.id}`}
                state={{ from: `/symbols/${symbolType}` }}
                className="group bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 hover:shadow-xl hover:shadow-white/5 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-neutral-800">
                  <img
                    src={ring.image}
                    alt={ring.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg mb-2 text-white">{ring.name}</h4>
                  <p className="text-sm text-neutral-400 mb-3">{ring.meaning}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-neutral-800 text-xs text-neutral-400 rounded-full border border-white/10">
                      {ring.culture}
                    </span>
                    {ring.date && (
                      <span className="inline-block px-3 py-1 bg-amber-900/30 text-xs text-amber-200 rounded-full border border-amber-500/20">
                        {ring.date}
                      </span>
                    )}
                  </div>
                  {ring.artist && (
                    <p className="text-xs text-amber-200 mb-1">Artist: {ring.artist}</p>
                  )}
                  {ring.origin && (
                    <p className="text-xs text-amber-200 mb-1">Origin: {ring.origin}</p>
                  )}
                  {ring.period && (
                    <p className="text-xs text-amber-200 mb-1">Period: {ring.period}</p>
                  )}
                  {ring.medium && (
                    <p className="text-xs text-amber-200">Medium: {ring.medium}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
