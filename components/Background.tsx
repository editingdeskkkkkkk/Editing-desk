import React, { useMemo } from 'react';

const Background: React.FC = () => {
  const stars = useMemo(() => {
    const list: React.CSSProperties[] = [];
    for (let i = 0; i < 40; i++) {
      const size = Math.random() * 2 + 0.5;
      list.push({
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: '#fff',
        opacity: Math.random() * 0.4 + 0.1,
        animation: `bh-star-twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
        willChange: 'opacity',
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-ink pointer-events-none overflow-hidden">
      {/* Deep space base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-ink to-ink" />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((style, i) => (
          <div key={i} style={style} />
        ))}
      </div>

      {/* Performant nebulas (No blur filters, just radial gradients) */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full" 
           style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
           
      <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] translate-x-1/3 translate-y-1/3 rounded-full" 
           style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
    </div>
  );
};

export default Background;
