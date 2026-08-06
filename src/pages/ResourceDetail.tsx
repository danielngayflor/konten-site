import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { resources, TYPE_LABELS, type ResourceBlock, type Resource } from '../data/resources';
import Clapperboard from '../components/ui/Clapperboard';
import PillButton from '../components/ui/PillButton';
import CollageElement from '../components/ui/CollageElement';
import { submitForm } from '../lib/supabase';

const EASE = [0.25, 0, 0, 1] as const;

function DownloadGate({ file }: { file: NonNullable<Resource['downloadFile']> }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await submitForm('download', { email, resourceSlug: file.fileName });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-konten-blue text-konten-cream px-8 py-10">
      <div className="flex items-center gap-2 mb-3">
        <Clapperboard size={13} />
        <span className="text-eyebrow text-konten-cream/70">Free download</span>
      </div>
      <h3 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(1.6rem,3.5vw,2.4rem)] mb-4">
        {file.label}
      </h3>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <p className="font-inter text-body-lg text-konten-cream/75 mb-5">
            Drop your email and the template is yours — free, forever, no strings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="your@email.com"
              className="flex-1 bg-konten-cream/10 border border-konten-cream/30 text-konten-cream placeholder:text-konten-cream/35 font-inter text-[16px] px-5 py-3 rounded-full outline-none focus:border-konten-cream transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-konten-cream text-konten-blue font-spartan font-black uppercase tracking-tight text-[14px] px-8 py-3 rounded-full hover:bg-konten-cream/90 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'One sec…' : 'Get the template →'}
            </button>
          </div>
          {error && (
            <p className="font-inter text-[13px] text-konten-cream/60 mt-3">{error}</p>
          )}
        </form>
      ) : (
        <div>
          <p className="font-inter text-body-lg text-konten-cream/75 mb-5">
            You're all set — click below to download.
          </p>
          <a
            href={file.path}
            download={file.fileName}
            className="inline-flex items-center gap-2 bg-konten-cream text-konten-blue font-spartan font-black uppercase tracking-tight text-[14px] px-8 py-3 rounded-full hover:bg-konten-cream/90 transition-colors"
          >
            Download .docx ↓
          </a>
        </div>
      )}
    </div>
  );
}

function renderBlock(block: ResourceBlock, index: number) {
  switch (block.kind) {
    case 'paragraph':
      return (
        <p key={index} className="font-inter text-body-lg leading-body text-konten-black">
          {block.text}
        </p>
      );
    case 'heading':
      return (
        <h2 key={index} className="font-spartan font-black text-konten-black uppercase leading-none tracking-tighter text-[clamp(1.6rem,3.5vw,2.8rem)] pt-4">
          {block.text}
        </h2>
      );
    case 'list':
      return (
        <ul key={index} className="space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <Clapperboard size={14} className="mt-1.5 shrink-0 text-konten-blue" />
              <span className="font-inter text-body-lg leading-body text-konten-black">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div key={index} className="border-l-4 border-konten-blue bg-konten-blue/8 px-6 py-5">
          <p className="font-inter text-body-lg leading-body text-konten-black italic">
            {block.text}
          </p>
        </div>
      );
    case 'image':
      return (
        <div key={index} className="w-full my-2 overflow-hidden rounded-sm">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full h-auto object-cover"
          />
        </div>
      );
  }
}

export default function ResourceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const resource = resources.find((r) => r.slug === slug) ?? resources[0];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-konten-blue text-konten-cream py-32 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <CollageElement
            type="script-page"
            src="/stickers/b-roll.png"
            position={{ top: '8%', right: '2%' }}
            rotation={-5}
            parallaxStrength={0.12}
            scale={1.0}
            size={140}
            delay={0}
            anim="float-slow"
          />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            <Link
              to="/freebies"
              className="text-eyebrow text-konten-cream/60 hover:text-konten-cream transition-colors"
            >
              ← Resources
            </Link>
            <span className="text-konten-cream/30">·</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-konten-cream/15 text-konten-cream font-inter font-500 text-[11px] uppercase tracking-wide rounded-full">
              <Clapperboard size={11} />
              {TYPE_LABELS[resource.type]}
            </span>
          </motion.div>

          <motion.h1
            className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2.5rem,8vw,9rem)] mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            {resource.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 font-inter text-[14px] text-konten-cream/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <span>{resource.readTime}</span>
            <span className="text-konten-cream/30">·</span>
            <span>{resource.publishedAt}</span>
            <span className="text-konten-cream/30">·</span>
            <span>Konten LR</span>
          </motion.div>
        </div>
      </section>

      {/* ── Cover image ───────────────────────────────────────────────── */}
      {resource.coverImage && (
        <div className="w-full aspect-[21/9] overflow-hidden bg-konten-black">
          <img
            src={resource.coverImage}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ── Article body ──────────────────────────────────────────────── */}
      <section className="bg-konten-cream text-konten-black py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {resource.body.map((block, i) => renderBlock(block, i))}

          {/* ── Download gate (only if resource has a file) ── */}
          {resource.downloadFile && (
            <div className="mt-12">
              <DownloadGate file={resource.downloadFile} />
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="bg-konten-black text-konten-cream py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-eyebrow text-konten-cream/50 mb-6">Ready to put this into action?</p>
          <h2 className="font-spartan font-black text-konten-cream uppercase leading-none tracking-tighter text-[clamp(2rem,7.5vw,6.5rem)] mb-12">
            LET'S WORK
            <br />
            TOGETHER.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <PillButton variant="filled" tone="light">
                Start a project →
              </PillButton>
            </Link>
            <Link to="/freebies">
              <PillButton variant="outline" tone="light">
                More freebies
              </PillButton>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
