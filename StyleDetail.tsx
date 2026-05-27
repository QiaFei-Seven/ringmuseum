import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const styleData: Record<string, {
  name: string;
  description: string;
  mainImage: string;
  rings: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    position: string;
  }>;
}> = {
  '1': {
    name: 'STACKING',
    description: 'The art of multi-layered composition, creating rich dimensions through ring combinations. Each layer tells a unique story, composing an elegant symphony together.',
    mainImage: 'https://images.unsplash.com/photo-1736615494533-14b406d50f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'ring-1',
        name: 'Delicate Gold Band',
        description: '18K Yellow Gold | 1mm width | Circa 2022 | Hand-forged minimal design perfect for layering',
        image: 'https://images.unsplash.com/photo-1706196612848-0cd22cb6231e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Index',
      },
      {
        id: 'ring-2',
        name: 'Diamond Accent Ring',
        description: '14K White Gold | 2mm width | Circa 2023 | Micro-pavé set with 0.15ct natural diamonds',
        image: 'https://images.unsplash.com/photo-1499899833954-5ecd9439d17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Middle',
      },
      {
        id: 'ring-3',
        name: 'Braided Ring',
        description: '18K Rose Gold | 2.5mm width | Circa 2021 | Hand-woven rope texture with satin finish',
        image: 'https://images.unsplash.com/photo-1705854937134-dd130d90df5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Ring',
      },
    ],
  },
  '2': {
    name: 'MIXING',
    description: 'Creative combinations breaking conventions. Gold and silver mix, thick and thin contrast, material fusion. Finding balance in conflict, creating harmony in contrast.',
    mainImage: 'https://images.unsplash.com/photo-1713999261126-8755201f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'ring-4',
        name: 'Bold Gold Ring',
        description: '22K Yellow Gold | 5mm width | Circa 2020 | Chunky statement piece with high polish finish',
        image: 'https://images.unsplash.com/photo-1587947330318-88fcd9055420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Thumb',
      },
      {
        id: 'ring-5',
        name: 'Silver Thin Band',
        description: '925 Sterling Silver | 1.5mm width | Circa 2023 | Oxidized finish with hammered texture',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Index',
      },
      {
        id: 'ring-6',
        name: 'Rose Gold Ring',
        description: '14K Rose Gold | 3mm width | Circa 2022 | Brushed matte finish with soft edges',
        image: 'https://images.unsplash.com/photo-1709150485687-b5ed84fd776c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Pinky',
      },
    ],
  },
  '3': {
    name: 'MINIMALISM',
    description: 'The philosophy of less is more. Clean lines outline pure beauty. Removing complex decorations, leaving only essential elegance.',
    mainImage: 'https://images.unsplash.com/photo-1646656493803-3fa79874de02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200',
    rings: [
      {
        id: 'ring-7',
        name: 'Geometric Line Ring',
        description: 'Platinum 950 | 2mm width | Circa 2024 | Architectural square profile with mirror polish',
        image: 'https://images.unsplash.com/photo-1726507367666-08c5f025bdf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Index',
      },
      {
        id: 'ring-8',
        name: 'Open Design Ring',
        description: '18K White Gold | Adjustable | Circa 2023 | Contemporary open form with tension setting',
        image: 'https://images.unsplash.com/photo-1719924998065-0c60e329ef58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Middle',
      },
      {
        id: 'ring-9',
        name: 'Circle Band',
        description: '18K Yellow Gold | 2mm width | Circa 2021 | Classic court shape with seamless finish',
        image: 'https://images.unsplash.com/photo-1706196612848-0cd22cb6231e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
        position: 'Ring',
      },
    ],
  },
};

export function StyleDetail() {
  const { styleId } = useParams();
  const style = styleId ? styleData[styleId] : null;

  if (!style) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-violet-950/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Style collection not found</p>
          <Link to="/style" className="text-white underline">Back to Styles</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-neutral-900 to-violet-950/20 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute bottom-40 left-20 w-48 h-48 border border-white/5 rounded-full" />

      <header className="sticky top-0 bg-slate-950/95 backdrop-blur-sm z-10 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/style" className="text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl tracking-wide text-white">{style.name}</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-12 border border-white/10">
            <img
              src={style.mainImage}
              alt={style.name}
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl mb-4 text-white">{style.name}</h2>
            <p className="text-neutral-400 leading-relaxed text-sm">{style.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl mb-6 text-center text-white">Collection Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {style.rings.map((ring) => (
              <Link
                key={ring.id}
                to={`/ring/${ring.id}`}
                state={{ from: `/style/${styleId}` }}
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
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg text-white">{ring.name}</h4>
                    <span className="px-2 py-1 bg-neutral-800 text-xs text-neutral-400 rounded border border-white/10">
                      {ring.position}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400">{ring.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
