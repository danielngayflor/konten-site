import { team } from '../../../data/team';
import Polaroid from '../../ui/Polaroid';
import Clapperboard from '../../ui/Clapperboard';

export default function TheTeam() {
  const rotations = [-2, 1, -3, 2, -1, 3];

  return (
    <section className="bg-konten-black text-konten-cream py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-eyebrow text-konten-cream inline-flex items-center gap-2 mb-6">
            THE KONTEN SQUAD <Clapperboard size={14} />
          </span>
          <h2 className="text-[clamp(2rem,7.5vw,6.5rem)] font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter mb-8">
            SMALL TEAM.
            <br />
            BIG OUTPUT.
          </h2>
          <p className="font-inter text-[18px] md:text-[20px] leading-body text-konten-cream">
            We're a tiny squad of creatives, strategists, and storytellers based in Monrovia. We don't have big titles or ex-google in our bios.<br />
            We have something better. Local Context. Love What We Do. We Learn Fast.
          </p>
        </div>

        {/* 6 team cards in 2x3 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, i) => (
            <div key={member.role} className="flex flex-col group cursor-default">

              {/* Polaroid — scales up on hover */}
              <div className="mb-6 transition-transform duration-500 ease-in-out group-hover:scale-[1.04] origin-center">
                <Polaroid rotation={rotations[i]}>

                  {/* Image area with hover overlay */}
                  <div className="relative w-full h-full bg-gradient-to-br from-konten-blue/40 to-konten-black/30 flex items-center justify-center">

                    {/* Placeholder number */}
                    <span className="font-spartan font-black text-konten-cream/40 text-[3rem]">
                      0{i + 1}
                    </span>

                    {/* Hover overlay — role + bio */}
                    <div className="absolute inset-0 bg-konten-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center p-5 text-center">
                      <p className="text-eyebrow text-konten-cream mb-3">
                        {member.role}
                      </p>
                      <p className="font-inter text-[12px] md:text-[13px] leading-relaxed text-konten-cream">
                        {member.bio}
                      </p>
                    </div>

                  </div>
                </Polaroid>
              </div>

              {/* Name only */}
              <h3 className="font-spartan font-black text-konten-cream uppercase text-[1.75rem] tracking-tight leading-none">
                {member.name}
              </h3>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
