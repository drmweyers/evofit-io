const AUTHOR_BIOS: Record<string, string> = {
  'EvoFit Team': 'AI-powered fitness science, nutrition research, and coaching strategies for the modern fitness professional.',
  'BCI Innovation Labs': 'A startup factory building the future of education, fitness technology, and autonomous AI agents.',
  'Mark Weyers Ed.D': 'Educator, entrepreneur, and founder of BCI Innovation Labs. Building at the intersection of AI, education, and fitness.',
};

interface AuthorBioProps {
  author: { name: string; avatar?: string };
}

export default function AuthorBio({ author }: AuthorBioProps) {
  const bio = AUTHOR_BIOS[author.name] || '';
  const initial = author.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/5">
      {author.avatar ? (
        <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-[var(--color-brand-accent)]/20 flex items-center justify-center text-[var(--color-brand-accent)] font-display font-bold text-lg flex-shrink-0">
          {initial}
        </div>
      )}
      <div>
        <p className="text-white font-display font-semibold uppercase tracking-wide text-sm">{author.name}</p>
        {bio && <p className="text-white/50 text-sm mt-1 leading-relaxed">{bio}</p>}
      </div>
    </div>
  );
}
