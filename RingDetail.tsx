import { Link, useParams, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Sparkles } from 'lucide-react';

const ringDatabase: Record<string, {
  name: string;
  description: string;
  material: string;
  size: string;
  story: string;
  images: string[];
  specifications: Array<{ label: string; value: string }>;
}> = {
  'ring-1': {
    name: 'Delicate Gold Band',
    description: '1.5mm ultra-thin gold band, perfect for index or middle finger',
    material: '18K Yellow Gold',
    size: 'Adjustable (US 5-8)',
    story: 'The perfect embodiment of minimalism, delicate lines outline an elegant silhouette. Ideal for daily wear, freely stack with other rings to create your unique style.',
    images: [
      'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
      'https://images.unsplash.com/photo-1586878340946-f81bfad535f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    ],
    specifications: [
      { label: 'Material', value: '18K Yellow Gold' },
      { label: 'Width', value: '1.5mm' },
      { label: 'Weight', value: 'Approx. 1.2g' },
      { label: 'Craft', value: 'Hand-polished' },
    ],
  },
  'love-1': {
    name: 'Eternity Band',
    description: 'Represents never-ending love',
    material: 'Platinum',
    size: 'Standard Sizes',
    story: 'Inspired by the infinite loop of the Möbius strip, symbolizing eternal and unchanging love. Exquisite craftsmanship ensures every detail is flawless, witnessing your vows of love.',
    images: [
      'https://images.unsplash.com/photo-1763256614634-7feb3ff79ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
      'https://images.unsplash.com/photo-1769230361954-69a5bd0fcb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    ],
    specifications: [
      { label: 'Material', value: '950 Platinum' },
      { label: 'Width', value: '3mm' },
      { label: 'Weight', value: 'Approx. 4.5g' },
      { label: 'Craft', value: 'Mirror polish' },
    ],
  },
  'power-1': {
    name: 'Roman Triple Ring',
    description: 'Flamboyant costume jewelry from the Roman Empire',
    material: 'Gold, glass',
    size: 'length 2 1/2 in. (6.4 cm)',
    story: 'This ring exemplifies a flamboyant type of costume jewelry that was especially popular in the eastern half of the Roman Empire. The three finger bands support five colorful settings, containing pearls, glass imitation gems, and a central green bead (a modern replacement).',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20roman%20gold%20triple%20finger%20ring%20with%20colored%20glass%20gems%20museum%20artifact%20on%20white%20background&image_size=square_hd',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20roman%20jewelry%20gold%20ring%20detail%20closeup%20museum%20photography&image_size=square_hd',
    ],
    specifications: [
      { label: 'Period', value: 'Late Imperial or Late Antique' },
      { label: 'Date', value: '3rd-4th century CE' },
      { label: 'Culture', value: 'Roman, Syrian' },
      { label: 'Medium', value: 'Gold, glass' },
      { label: 'Dimensions', value: 'length 2 1/2 in. (6.4 cm)' },
      { label: 'Classification', value: 'Gold and Silver' },
      { label: 'Credit Line', value: 'Purchase, Deanna Anderson Gift and funds from various donors, 2002' },
    ],
  },
  'love-2': {
    name: 'Heart Gemstone',
    description: 'Romantic heart-cut sapphire',
    material: '14K Rose Gold',
    size: 'Standard Sizes',
    story: 'A beautiful heart-shaped pink sapphire set in warm rose gold. The delicate design captures the essence of romance and enduring love, perfect for special occasions.',
    images: [
      'https://images.unsplash.com/photo-1587947330318-88fcd9055420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    ],
    specifications: [
      { label: 'Material', value: '14K Rose Gold' },
      { label: 'Gemstone', value: 'Natural Pink Sapphire' },
      { label: 'Cut', value: 'Heart Brilliant' },
      { label: 'Style', value: 'Art Deco Revival' },
    ],
  },
  'love-3': {
    name: 'Claddagh Ring',
    description: 'Traditional Irish love token',
    material: '9K Yellow Gold',
    size: 'UK F-Z',
    story: 'The \'Claddagh\' ring takes its name from the Irish village. It is formed of a crowned heart held between two hands. It draws upon older traditions of rings with clasped hands and hearts and is still a popular item of jewellery.',
    images: [
      'https://images.unsplash.com/photo-1705854937134-dd130d90df5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
      'https://images.unsplash.com/photo-1736615494533-14b406d50f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    ],
    specifications: [
      { label: 'Date', value: '1750-1800 (made)' },
      { label: 'Artist/Maker', value: 'Robinson, Andrew (goldsmith)' },
      { label: 'Place of Origin', value: 'Galway (made)' },
      { label: 'Material', value: '9K Yellow Gold' },
    ],
  },
  'love-4': {
    name: 'Antique Claddagh',
    description: 'Historic Irish masterpiece',
    material: '9K Yellow Gold',
    size: 'UK F-Z',
    story: 'The \'Claddagh\' ring takes its name from the Irish village. It is formed of a crowned heart held between two hands. It draws upon older traditions of rings with clasped hands and hearts and is still a popular item of jewellery.',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=antique%20claddagh%20ring%20gold%20jewelry%20on%20black%20background%20professional%20photography&image_size=square_hd',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=antique%20claddagh%20ring%20gold%20jewelry%20detail%20closeup%20on%20black%20background&image_size=square_hd',
    ],
    specifications: [
      { label: 'Date', value: '1750-1800 (made)' },
      { label: 'Artist/Maker', value: 'Robinson, Andrew (goldsmith)' },
      { label: 'Place of Origin', value: 'Galway (made)' },
      { label: 'Material', value: '9K Yellow Gold' },
    ],
  },
  'nature-1': {
    name: 'Raindance Ring',
    description: 'Award-winning diamond ring from Boodles',
    material: 'Platinum and Diamonds',
    size: 'Standard Sizes',
    story: 'This ring is one of a family of \'Raindance\' jewels designed and retailed by the firm of Boodles. The design for the ring was conceived in 2000, and the first ring was made in 2002. The title \'Raindance\' celebrates the abundance and good fortune which traditionally follow a raindance. By August 2009 over a thousand \'Raindance\' rings had been sold in a number of different versions: in gold and diamonds; platinum and diamonds; pink sapphires, diamonds and platinum; and aquamarines, diamonds and platinum. Boodles was founded as Boodle and Dunthorne in Liverpool in 1798. Its London shops include one in New Bond Street opened in 2007. It also has shops in Liverpool, Manchester, Chester and Dublin. Boodles is a family company run by Nicholas and Michael Wainwright, the fifth generation to work in the business.',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=luxury%20diamond%20ring%20platinum%20with%20multiple%20diamonds%20on%20black%20background%20professional%20jewelry%20photography&image_size=square_hd',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=luxury%20diamond%20ring%20side%20view%20platinum%20setting%20on%20black%20background%20professional%20photography&image_size=square_hd',
    ],
    specifications: [
      { label: 'Date', value: '2009 (made), 2000 (designed)' },
      { label: 'Artist/Maker', value: 'Boodles (maker), Boodles (designer)' },
      { label: 'Place of Origin', value: 'London (made), Liverpool (designed)' },
      { label: 'Material', value: 'Platinum and Diamonds' },
    ],
  },
};

export function RingDetail() {
  const { ringId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ring = ringId ? ringDatabase[ringId] : null;
  
  // 确定返回路径，优先使用state中的from，如果没有则默认返回首页
  const getBackPath = () => {
    if (location.state?.from) {
      return location.state.from;
    }
    return '/';
  };

  if (!ring) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-amber-950/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Ring details not found</p>
          <button
            onClick={() => navigate(getBackPath())}
            className="text-white underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-amber-950/10 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="absolute top-40 right-10 w-80 h-80 border border-white/5 rounded-full" />
      <div className="absolute bottom-20 left-10 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white/30 rounded-full" />
      <div className="absolute bottom-1/2 right-1/4 w-2 h-2 bg-white/20 rounded-full" />

      <header className="sticky top-0 bg-slate-950/95 backdrop-blur-sm z-10 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(getBackPath())}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl tracking-wide text-white">{ring.name}</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              {ring.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-white/10"
                >
                  <img
                    src={image}
                    alt={`${ring.name} - ${index + 1}`}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Curated Selection</span>
                </div>
                <h2 className="text-4xl mb-4 text-white">{ring.name}</h2>
                <p className="text-neutral-400 mb-6 text-sm">{ring.description}</p>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl mb-4 text-white">Story</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{ring.story}</p>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl mb-4 text-white">Specifications</h3>
                <dl className="space-y-3">
                  {ring.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <dt className="text-neutral-400">{spec.label}</dt>
                      <dd className="text-neutral-200">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <button className="w-full bg-white text-neutral-950 py-4 rounded-lg hover:bg-neutral-200 transition-colors">
                Contact Us
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12">
            <h3 className="text-xl mb-6 text-center text-white">Wearing Guide</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-neutral-900 rounded-xl border border-white/5">
                <p className="mb-2 text-white">Finger Fit</p>
                <p className="text-neutral-400 text-sm">{ring.size}</p>
              </div>
              <div className="p-6 bg-neutral-900 rounded-xl border border-white/5">
                <p className="mb-2 text-white">Styling</p>
                <p className="text-neutral-400 text-sm">Stack or wear alone</p>
              </div>
              <div className="p-6 bg-neutral-900 rounded-xl border border-white/5">
                <p className="mb-2 text-white">Care Tips</p>
                <p className="text-neutral-400 text-sm">Avoid chemical contact</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
