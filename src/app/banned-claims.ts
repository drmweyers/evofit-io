import fs from 'fs';
import path from 'path';

export interface BannedClaim {
  pattern: RegExp;
  why: string;
}

export interface AllowlistEntry {
  file: string; // repo-relative, forward slashes
  pattern: string; // BannedClaim.pattern.source
  reason: string; // written reason this use is not a claim in scope
}

const NOT_PROVABLE = 'unprovable or false marketing claim';

// Known scanner gaps: it does not decode string escapes (—, '), does not join
// concatenated string literals ("a" + "b"), and tag stripping treats a literal < or >
// operator in code as markup. Keep copy in plain JSX text or single string literals.
export const BANNED_CLAIMS: BannedClaim[] = [
  { pattern: /works (fully )?offline|offline[- ]first|without wi-?fi|offline (workout )?logging/i, why: 'false: no workout screen queues offline writes and sw.js skips non-GET (verified 2026-10-21)' },
  { pattern: /only recurring option/i, why: 'false: Cloud Pro and the AI add-on are also recurring' },
  { pattern: /all other features are included/i, why: NOT_PROVABLE },
  { pattern: /Marcus D\./i, why: 'fabricated testimonial' },
  { pattern: /Raj P\./i, why: 'fabricated testimonial' },
  { pattern: /Jordan T\./i, why: 'fabricated testimonial' },
  { pattern: /Sarah M\./, why: 'fabricated testimonial' },
  { pattern: /James K\./, why: 'fabricated testimonial' },
  { pattern: /Priya L\./, why: 'fabricated testimonial' },
  { pattern: /500\+ fitness professionals/i, why: 'unprovable user count' },
  { pattern: /\bNFL\b/, why: 'unprovable endorsement/association' },
  { pattern: /\bNBA\b/, why: 'unprovable endorsement/association' },
  { pattern: /total value/i, why: 'inflated value stack' },
  { pattern: /\$5,188|\$11,976|\$17,976|\$7,440/i, why: 'inflated value-stack figure' },
  { pattern: /\$500\+/i, why: NOT_PROVABLE },
  { pattern: /May 2026 Feature Pack/i, why: NOT_PROVABLE },
  { pattern: /full program in seconds/i, why: 'unprovable speed claim' },
  { pattern: /AI Workout Builder/i, why: 'no such product feature' },
  { pattern: /1:1 migration/i, why: 'unprovable service claim' },
  { pattern: /founding-price lock/i, why: 'not in the founding offer code' },
  { pattern: /Cloud Pro credit/i, why: 'not in the founding offer code' },
  { pattern: /closes end of launch/i, why: 'not in the founding offer code' },
  { pattern: /buys the Professional tier/i, why: 'not in the founding offer code' },
  { pattern: /39\.99/i, why: 'parked SaaS add-on must not be marketed' },
  { pattern: /SaaS Add-on/i, why: 'parked SaaS add-on must not be marketed' },
  { pattern: /\bEvolution\b/, why: 'parked SaaS add-on must not be marketed' },
  { pattern: /no add-on menu/i, why: 'false: optional AI Add-on and Cloud Pro exist' },
  { pattern: /no renewal email/i, why: 'unprovable or misleading renewal claim' },
  { pattern: /Stack on any tier/i, why: 'not in the founding offer code' },
  { pattern: /\bNo monthly fees\b/i, why: 'false: optional AI Add-on and Cloud Pro are monthly' },
  { pattern: /total, ever/i, why: 'false: optional monthly extras exist' },
  { pattern: /everything included/i, why: 'false: AI Add-on and Cloud Pro are optional extras; Starter is limited' },
  { pattern: /Most Popular/, why: 'unprovable popularity claim (use Recommended)' },
  { pattern: /1,3(24|28|44)\b/, why: 'exact exercise count drifts; use 1,300+' },
  { pattern: /\belite\b/i, why: 'unprovable superlative' },
  { pattern: /most ambitious/i, why: 'unprovable superlative' },
  { pattern: /AI-driven workout/i, why: 'no such product feature' },
  { pattern: /widely called dated/i, why: 'unsourced competitor claim' },
  { pattern: /r\/personaltraining/i, why: 'unlinked third-party quote' },
  { pattern: /Join the trainers who/i, why: 'implies an unprovable customer base' },
  { pattern: /side hustle to a legacy/i, why: 'testimonial-style quote without a real customer' },
  { pattern: /Save \$5,700/i, why: 'unsourced savings claim' },
  // Final truth pass: Enterprise has no admin/org layer buyers can reach (trainer app/admin is admin-role only).
  { pattern: /admin dashboard/i, why: 'not reachable by a buyer: admin-role only' },
  { pattern: /user management/i, why: 'not reachable by a buyer: admin-role only' },
  { pattern: /feature flags?/i, why: 'not reachable by a buyer: admin-role only' },
  { pattern: /system health/i, why: 'not reachable by a buyer: admin-role only' },
  { pattern: /support[- ]ticket/i, why: 'not reachable by a buyer: admin-role only' },
  { pattern: /multi-(trainer|coach)/i, why: 'no org/team model exists' },
  { pattern: /trainer accounts/i, why: 'no org/team model exists' },
  { pattern: /oversight/i, why: 'no org/team model exists' },
  { pattern: /audit (log|trail)/i, why: 'not reachable by a buyer: admin-only' },
  { pattern: /activity log/i, why: 'not reachable by a buyer: admin-only' },
  { pattern: /for studios/i, why: 'implies a studio/org layer that does not exist' },
  { pattern: /bulk operations/i, why: 'admin-only feature' },
  { pattern: /team-shared templates|team-shared workout templates|share with (your )?team/i, why: 'not reachable: no UI sets isTeamShared' },
  { pattern: /Stripe payments/i, why: 'EvoFit has no client billing' },
  { pattern: /and PDF export/i, why: 'Starter programBuilder.pdfExport is false' },
  // Fitness Agent overclaims (copy deck 2.1 "Never write" list, Mark 2026-10-22).
  { pattern: /AI coach that trains your clients/i, why: 'overclaim: the agent drafts, the trainer approves (copy deck 2.1)' },
  { pattern: /fully[- ]automatic/i, why: 'overclaim: nothing reaches a client without trainer approval (copy deck 2.1)' },
  { pattern: /sends? (the )?messages? for you/i, why: 'overclaim: the trainer approves and sends (copy deck 2.1)' },
  { pattern: /built[- ]into EvoFit/i, why: 'false: the agent runs inside Claude or ChatGPT; a built-in agent does not exist yet (copy deck 2.1)' },
  { pattern: /\d+% (more )?(client )?retention|retention (rate )?(up|increase)/i, why: 'unprovable retention figure (copy deck 2.1)' },
  // GIF creator is part of the AI add-on only (Mark 2026-10-22); the review queue is never marketed.
  { pattern: /(Cloud Pro|Enterprise)\s+(includes?|gets?|comes with|unlocks?)[^.]{0,60}GIF/i, why: 'false: the GIF creator is add-on only' },
  { pattern: /GIF creator[^.]{0,60}(included in|comes with|part of)[^.]{0,30}(Cloud Pro|Enterprise)/i, why: 'false: the GIF creator is add-on only' },
  { pattern: /review queue/i, why: 'not marketed (Mark 2026-10-22)' },
];

// Genuine out-of-scope uses, exempted by file + pattern.source with a written reason.
export const ALLOWLIST: AllowlistEntry[] = [
  {
    file: 'src/app/meals/page.tsx',
    pattern: '\\bNo monthly fees\\b',
    reason: 'EvoFit Meals is a separate product, out of scope of the Trainer truth pass; its copy is not edited here',
  },
  {
    file: 'src/app/meals/page.tsx',
    pattern: 'Most Popular',
    reason: 'EvoFit Meals is a separate product, out of scope of the Trainer truth pass; its copy is not edited here',
  },
  {
    file: 'src/app/meals/page.tsx',
    pattern: '\\belite\\b',
    reason: 'EvoFit Meals is a separate product, out of scope of the Trainer truth pass; its copy is not edited here',
  },
  {
    file: 'src/app/meals/page.tsx',
    pattern: 'Save \\$5,700',
    reason: 'EvoFit Meals is a separate product, out of scope of the Trainer truth pass; its copy is not edited here',
  },
  {
    file: 'src/app/meals/page.tsx',
    pattern: 'Join the trainers who',
    reason: 'EvoFit Meals is a separate product, out of scope of the Trainer truth pass; its copy is not edited here',
  },
  {
    file: 'src/app/meals/page.tsx',
    pattern: 'Stack on any tier',
    reason: 'EvoFit Meals is a separate product, out of scope of the Trainer truth pass; its copy is not edited here',
  },
];

export const ROOT = path.resolve(__dirname, '../..');

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '__mocks__' || entry.name === '__fixtures__') continue;
      walk(full, out);
    } else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) {
      out.push(path.relative(ROOT, full).split(path.sep).join('/'));
    }
  }
  return out;
}

/** Every source file that can carry marketing copy (blog markdown excluded). */
export function marketingFiles(): string[] {
  const files = [
    ...walk(path.join(ROOT, 'src', 'app')),
    ...walk(path.join(ROOT, 'src', 'components')),
    ...walk(path.join(ROOT, 'src', 'lib')),
  ]
    .filter((f) => !f.startsWith('src/app/api/') && !f.startsWith('src/lib/blog/'))
    .filter((f) => f !== 'src/app/banned-claims.ts');
  return files.sort();
}

const ENTITIES: Record<string, string> = {
  amp: '&', nbsp: ' ', mdash: '—', ndash: '–', quot: '"', apos: "'",
  lt: '<', gt: '>', rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', hellip: '…',
};

/** Strip tags / JSX whitespace expressions, decode entities, collapse whitespace.
 *  Returns the text plus, for each output char, its offset in the source. */
export function normalizeWithMap(src: string): { text: string; map: number[] } {
  const tok = /<[^>]*>|\{\s*(['"`])\s*\1\s*\}|&(#\d+|#x[0-9a-f]+|[a-z]+);|\s+/gi;
  let text = '';
  const map: number[] = [];
  const push = (ch: string, off: number) => {
    if (ch === ' ' && (text === '' || text.endsWith(' '))) return;
    text += ch;
    map.push(off);
  };
  let last = 0;
  let m: RegExpExecArray | null;
  const copy = (from: number, to: number) => {
    for (let i = from; i < to; i++) push(src[i], i);
  };
  while ((m = tok.exec(src))) {
    copy(last, m.index);
    const t = m[0];
    if (t[0] === '<') {
      // tag: emits nothing
    } else if (t[0] === '{') {
      push(' ', m.index);
    } else if (t[0] === '&') {
      const name = m[2];
      let ch: string | undefined;
      if (name[0] === '#') {
        const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
        ch = String.fromCodePoint(code);
      } else ch = ENTITIES[name.toLowerCase()];
      if (ch === undefined) copy(m.index, m.index + t.length);
      else push(ch, m.index);
    } else push(' ', m.index);
    last = m.index + t.length;
  }
  copy(last, src.length);
  return { text, map };
}

export interface Hit { file: string; line: number; pattern: RegExp; why: string }

/** Raw per-line scan plus normalized whole-file scan; deduped by file+line+pattern. */
export function scanSource(file: string, src: string): Hit[] {
  const hits = new Map<string, Hit>();
  const allowed = (p: RegExp) => ALLOWLIST.some((a) => a.file === file && a.pattern === p.source);
  const add = (line: number, c: BannedClaim) => {
    if (allowed(c.pattern)) return;
    hits.set(`${line}|${c.pattern.source}`, { file, line, pattern: c.pattern, why: c.why });
  };
  src.split(/\r?\n/).forEach((l, i) => {
    for (const c of BANNED_CLAIMS) if (c.pattern.test(l)) add(i + 1, c);
  });
  const lineStarts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === '\n') lineStarts.push(i + 1);
  const lineOf = (off: number) => {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= off) lo = mid; else hi = mid - 1;
    }
    return lo + 1;
  };
  const { text, map } = normalizeWithMap(src);
  for (const c of BANNED_CLAIMS) {
    const re = new RegExp(c.pattern.source, c.pattern.flags.includes('g') ? c.pattern.flags : c.pattern.flags + 'g');
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      add(lineOf(map[m.index]), c);
      if (m[0].length === 0) re.lastIndex++;
    }
  }
  return [...hits.values()].sort((a, b) => a.line - b.line);
}
