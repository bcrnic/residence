import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  images: string[];
  labels?: string[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
}

const Lightbox = ({ images, labels, isOpen, onClose, startIndex = 0 }: LightboxProps) => {
  const [current, setCurrent] = useState(startIndex);

  if (!isOpen || images.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div
      className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 rounded-full p-2 text-white hover:bg-white/20 transition-colors z-50"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 bg-white/10 rounded-full p-3 text-white hover:bg-white/20 transition-colors z-50"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[current]}
          alt={labels?.[current] || `Slika ${current + 1}`}
          className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
        />
        <div className="text-center mt-4">
          {labels?.[current] && (
            <p className="text-white font-body text-sm mb-2">{labels[current]}</p>
          )}
          <p className="text-white/50 text-xs font-body">
            {current + 1} / {images.length}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 bg-white/10 rounded-full p-3 text-white hover:bg-white/20 transition-colors z-50"
      >
        <ChevronRight size={24} />
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
              i === current ? "border-primary scale-110" : "border-white/20 opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
