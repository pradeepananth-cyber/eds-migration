import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  GitBranch,
  FileText,
  Gauge,
  Globe,
  Cpu,
  Compass,
  Wand2,
  Bot,
  ScanLine,
  RefreshCw,
  Package,
  ClipboardCheck,
  Workflow,
  MessagesSquare,
  TrendingUp,
  Shield,
  Network,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────
   IBM LOGO (embedded base64 of the uploaded mark)
────────────────────────────────────────────────────────────────── */
const IBM_LOGO_SRC = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCADhAOEDASIAAhEBAxEB/8QAGwABAQEBAQEBAQAAAAAAAAAAAAgHBgUEAgP/xABEEAABAwMCAwMIBwUFCQAAAAAAAQIDBAUGBxEIEiETFzEWQVFVV5OU1BQVIjKBktE3WHHS0xgjQlZhJDM0NlKDkZWi/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9lParnUQtmp7dWTRO35Xsgc5q9duionpP6fUl59UXD4Z/6FQ6BZnxJWnSSyUGA6fWe7Y3F2/0OrnjVXyb1Eiv3/v2+EivT7qdETx8V7rvE4wvZTYPcr80BEn1JefVFw+Gf+h/JttuLqz6E2gqlqdubsUhdz7bb78u2/gXB3icYXspsHuV+aMiXKNc/wC1Gy+Lhdr7wPq/kS1ci9j2PY7c23bePL1+/wCPm8wGCeT9+9SXP4V/6Dyfv3qS5/Cv/QtzvD4wvZNjnu1+bHeHxheybHPdr82BEfk/fvUlz+Ff+h580ckMjo5Y3xvb4tcmyp+BdneHxheybHPdr82ctqK7iS1Bs0tryrQvEq+N7VSOZYNp4F/6o5EquZq/w6L4LunQCO42Pke1jGuc9yojWtTdVX0Iej5PX/1Hc/hH/odNcMKz7TnPbBTXjHJqG9SVMFTboKhWuZO9JURiczXbffREVOZFTdPDdFK27w+ML2TY57tfmwIj8n796kufwr/0PjraOsoZUiraWemkc3mRs0asVU8N9l83Rf8AwXR3h8YXsmxz3a/NmKcUVPrjlduocs1K0/t9kpbQ1af6ZQtRN0lc3lbJvNIqojk6bbbK9fSgE9n10VsuVcxz6K31dSxq7OdDC56IvoXZD5Cs9CajiW0/0/prZhullpqbXXP+sG1NYz++m7VrdnO2qGbfZRqIitRUROvUCX/J+/epLn8K/wDQ/MtjvcUT5ZbPcI42NVz3OpnojUTqqqu3RC3u8PjC9k2Oe7X5s8HUXO+Kqs0+yOkyLTGwUdmntVVHcKiNi88NO6JySPb/ALSvVGq5U6L4eC+AEXAAAAAAAAAAAAAAAAAADv8AE9ZtT8Tx+msGO5hXW+2UvP2FPG2NWs5nq9227VXq5zl/EpvE8N4sMlxW0ZHQ6tWmOkutDDWwMmmcj2slYj2o5Ep1RF2cm+yr185EpTuGaS6P3HDrLcbnxAQWuuqrfBPU0K10DVpZXRtc6LZX7pyqqt2Xr0A+fW/LOIzSO72+2ZHqa2rmr6d1RE6gVHta1Hcqo7nib139G5jnejn/AJdJnHlNV+UaQ9ilerWc/Jy8vLty7eHTwPc4gsTxDEr3bKbEM/ZmdPPTOkmnbOyTsHI7ZGbsVdt069TMQKW0QzDiM1cvVfasc1MZSTUNMlRK6v5WNc1XI3ZOSF3XdfPsaTkmFcWdhx253yr1asz6a3UktXM2KRyvcyNivcjUWmRN9kXbdUJs4f8AFMQyu/XKly/PmYZTQUqSQ1DpmR9u/nROTdypv06/gbK/RjQ57HMfxIU7muTZzVrYFRU9H3wMj/tFa1f5/uPuof5CisXwziwyHGbXf6PVu0R01zo4ayFkr1R7WSMR7UciU6pvs5N9lU4fuH4fv3gbd8RTfzH9m6JaEtajW8RdIjUTZESrp9k/+wOb4ocU1nxKmxrI9Rs4tt7mgrHsta0rlWWnk2a9zusTE23Yz09UTp1PG021T13zzN7ZiVq1JraetuUjo4pKl6NiaqNc77StYq+DV8EUzjVGkxu3ZlWWvEr9W360Ujuzjr6lqN7Z6fecxE/wb9EXz7b+dD8aXWizX7PrVaMgvzbBa6mRzai4ue1qU6Ixyou7lRE3VETr6QLE7q+LT2w2n4qX5c8zKdEOJ/I8frLLe9T7HcrfVMRJqWWpl5ZdlRyJ/uPSiL+By3cpoV+8ZS/GU/8AOfNbNHtC62jbUO4hI6Zyue1Y5qmBrkVrlaq7K/wXbdF86Ki+cDAcBwa+5nqHRYLbWRU93qp5INqpVa2J0bXOfz7Iqpyoxyrsir0LBj0o4so42xx6v2hrGoiNalTKiIieb/hzJLPo1pM/N75S1mulop7RBDTyW+ujrIO0qXSI/tWu+10VitTw8Ueh69Xo9obBV0UDOIOOZKmVzHPZVQK2FEjc7mcvPsibtRv8XIBoyaV8Wm/7YbT8VL8uS1d9cdWbtaqy1XLObpU0VbA+nqYXqzlkje1Wuav2fBUVUNp7k9Cv3jKX4yn/AJyUQAAAAAAAAAAAAAAAAAAAFJYhX8I7MSszMksuQSXttBAlyfE+p5HVPZt7VW7SIm3PzeCInoMEt+L5LcaNlZb8du9ZTSb8k0FFJIx2yqi7ORNl2VFT8CmcQ1Vo7JiVnstXwuMudTb6CClmrZaFOepfHG1rpXb0qru5UV3VVXr4qBjGvM+kk94trtI6K4UtAlO5K1tWsiuWXm6KnO53Tl9Bmxs2vFfc9Rbzba+waMV2IRUlO6GWCjt7lbM5Xb868kLOqJ06oplbrDfW3T6qdZbi24cvP9FWlek3Ltvvybb7bdfADtdB59Jqe+XF2rdFcKu3LTIlG2kWRHJLzJuq8jmrty7+JsH1jwW+ocl/PVf1TOtCLnX6d3y43C/6OVeXxVVKkMcFZQuRsLkejudOeF/XZNuiIadlGr1tu+NXS00vC5BQT1tHNTxVUdE3mgc9itSRNqVF3aq79FTw8UA+b6x4LfUOS/nqv6o+seC31Dkv56r+qTp5H5b/AJWvn/r5f5SkMV1YtVnxe1Wir4Wqa41NDRQ001XLQt56h7GI10jt6VV3cqKq7qvj4qBOuo8GJQZjXJg1bWVePvdz0i1kSxzRtXqsbk8/Ku6c3nTZfHc/WmMmJRZ3apM7gqJ8bbI76fHArke5nI7bblVF+9y+Cmk8Quc23M7ZZrdbtFocErGVT3RzQwIx1WitRqxo1sMau2VWr4r5unU5TTO2ZHiedWvIbnprdr9R0Ujny2+ot0iRzorHN2XmjcniqL1RfADZvrLgs/y9knvKr+qcNphcOHSO6ZRFnlivEtEt0fJYpqeWfm+iK53LG9rXpsrURq7ruq8y7r0NV76bX+6XT/At+UJ8xXNqLHNaKvLK3CaCvoZa6qdLj1XExY2tkc7aHZ0ao1WKrdvsf4NtkA2b6x4LfUOS/nqv6pxFRcOHN+s9I+GxXaLAI7a5s7FlnWearXmVHff5kam7U2Rduir5zSqrXHGqWmkqarhRtsEETeaSSSjja1ielVWk2RDC9HstZa9V5cmq8Apcv+kJUSPs0NOnZIsm67sZ2b0Rrd+icvRPOgGxJcuCzf8A5fyRP+5Vf1SVyxE1pte/XhLp/gW/KErVGIZZTU8tRUYve4YYmK+SSSgla1jUTdXKqt2RETruB4gAAAAAAAAAAAAAAAAAArLQHIOJyh0kslLp7h1muOMs7f6FUzuh5371Eiyb807V6SK9OrU6Inj4ndeVfGh7Psf/AD0/zJI2N6q6j43Zaey2HNL1bbbTc3Y01PUqyNnM5XO2RPS5yr+J6Pfjq/7Rci+McBVHlXxoez7H/wA9P8yZAt518XijbcVxi194n1fypb+eLsew7H72/bcu/J1+/wCPm8xm3fjq/wC0XIvjHHid4mc+V6Zf5U3Rb+kXYpcFnXtuTl5eXm9G3QCxvKnjQ9nuOe9pvmh5U8aHs9xz3tN80St36awe0XIPilHfprB7Rcg+KUCqfKnjQ9nuOe9pvmjz8i1E4usds1Teb7h2J2630zOeaoqKmmYxqfxWq6r6ETqq9EJmXXPWDb9ouQ/FKcnk+WZRlEzZskyK7Xh7PuLXVb5uT+HMq7fgB2+cau6gap57jNyuSUMtyttRGy10tPF2cPbOla5FVHO8XORiKquRNmp4eJTi5Xxob/s+x789P8yQxQ1VRQ1sFbSTPgqaeRssMrF2cx7V3a5F9KKiKd9346v+0XIvjHAVT5V8aHs9x/8APT/MkWZ3Ld584v09/gZT3iS5VD6+Jm3LHULK5ZGpsqpsjt06Kv8AFTqu/HV/2i5F8Y44O41tXcbhU3CvqJKmrqpXTTzSLu6SRyq5zlXzqqqqgblqVrjrFkejlHbsjZaY8dv7XU0VZAjUqan6M+PtEdtIrm/a5ObdrUcjl26Kcdw3VuoFBqfT1GmdrpbnkKUsyR09SrEYsat+2v2nsTdE/wBTO31NRJTRUr55XQROc6OJXqrGK7bmVE8EVdk39Oyeg9DFcjvuK3dt3xy61Vrr2McxtRTSKx6NcmypunpAtfyr40PZ9j/56f5k8LUTJeLao0/yODJMGsVNZJLVVMuM0b4OaOmWJySuTaoVd0ZzKmyKv+i+BOnfjq/7Rci+McfPc9Y9U7nbaq23DPL9VUdXC+CohkqnKyWN7Va5qp50VFVAODAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z';

const IBMMark = ({ size = 28, withFrame = true }) => (
  <div
    style={{
      width: size,
      height: size,
      background: '#000',
      border: withFrame ? '1px solid #2A2D3A' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
    }}
  >
    <img
      src={IBM_LOGO_SRC}
      alt="IBM"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  </div>
);

/* ──────────────────────────────────────────────────────────────────
   THEME
────────────────────────────────────────────────────────────────── */
const C = {
  bg: '#0B0D14',
  bgElev: '#141823',
  bgCard: '#181C28',
  ink: '#F4EFE3',
  inkMid: '#B8B0A1',
  inkMuted: '#7A7466',
  inkDim: '#3C3A33',
  line: '#252836',
  lineSoft: '#1C1F2A',
  amber: '#E8A33D',
  amberDeep: '#C28330',
  coral: '#D97559',
  sage: '#8FA68E',
};

const FONT_SERIF = '"Instrument Serif", "Times New Roman", serif';
const FONT_SANS = '"IBM Plex Sans", system-ui, sans-serif';
const FONT_MONO = '"IBM Plex Mono", "SF Mono", monospace';

/* ──────────────────────────────────────────────────────────────────
   PRIMITIVES
────────────────────────────────────────────────────────────────── */
const Eyebrow = ({ children, color = C.amber }) => (
  <div
    style={{
      fontFamily: FONT_MONO,
      fontSize: 11,
      letterSpacing: '0.18em',
      color,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const SlideTitle = ({ children, size = 64 }) => (
  <h1
    style={{
      fontFamily: FONT_SERIF,
      fontWeight: 400,
      fontSize: size,
      lineHeight: 1.02,
      letterSpacing: '-0.015em',
      color: C.ink,
      margin: 0,
    }}
  >
    {children}
  </h1>
);

const Body = ({ children, size = 15, color = C.inkMid, lh = 1.6 }) => (
  <p
    style={{
      fontFamily: FONT_SANS,
      fontSize: size,
      lineHeight: lh,
      color,
      margin: 0,
      fontWeight: 400,
    }}
  >
    {children}
  </p>
);

const TakeawayBar = ({ children, icon: Icon = Compass, label = 'Executive takeaway' }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      padding: '16px 20px',
      borderLeft: `2px solid ${C.amber}`,
      background: 'rgba(232, 163, 61, 0.04)',
    }}
  >
    <Icon size={16} color={C.amber} style={{ marginTop: 3, flexShrink: 0 }} />
    <div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 10,
          letterSpacing: '0.2em',
          color: C.amber,
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 19,
          lineHeight: 1.35,
          color: C.ink,
          fontStyle: 'italic',
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

const Pill = ({ children, accent = false }) => (
  <span
    style={{
      fontFamily: FONT_MONO,
      fontSize: 10,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      padding: '4px 10px',
      border: `1px solid ${accent ? C.amber : C.line}`,
      color: accent ? C.amber : C.inkMuted,
      borderRadius: 999,
      display: 'inline-block',
    }}
  >
    {children}
  </span>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE WRAPPER
────────────────────────────────────────────────────────────────── */
const SlideShell = ({ children, num, label, kicker }) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: '40px 52px 40px 52px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}
  >
    {/* corner number watermark */}
    <div
      style={{
        position: 'absolute',
        right: 38,
        bottom: 18,
        fontFamily: FONT_SERIF,
        fontSize: 180,
        lineHeight: 1,
        color: C.inkDim,
        opacity: 0.18,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {num}
    </div>

    {/* top kicker row */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 22,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: C.amber,
            letterSpacing: '0.2em',
          }}
        >
          {num} /
        </span>
        <Eyebrow color={C.inkMuted}>{label}</Eyebrow>
      </div>
      <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: C.amber,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          IBM Point of View
        </span>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, minHeight: 0 }}>
      {children}
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 00 — COVER (IBM POV)
────────────────────────────────────────────────────────────────── */
const SlideCover = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      padding: '48px 60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* decorative arcs */}
    <div
      style={{
        position: 'absolute',
        right: -200,
        top: -200,
        width: 600,
        height: 600,
        borderRadius: '50%',
        border: `1px solid ${C.line}`,
        opacity: 0.6,
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: -160,
        top: -160,
        width: 520,
        height: 520,
        borderRadius: '50%',
        border: `1px solid ${C.lineSoft}`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: 80,
        top: 80,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: C.amber,
      }}
    />

    {/* top — IBM POV identity */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <Eyebrow color={C.inkMuted}>Strategic Briefing · 2026</Eyebrow>
        <Eyebrow color={C.inkMuted}>Executive Conversation Starter</Eyebrow>
    </div>

    {/* middle */}
    <div style={{ zIndex: 1, maxWidth: '85%', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* IBM identity block — large and centered */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          paddingBottom: 22,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <IBMMark size={84} withFrame={false} />
        <div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              color: C.amber,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            IBM Point of View
          </div>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 22,
              color: C.inkMid,
              marginTop: 6,
              lineHeight: 1.3,
            }}
          >
            An IBM perspective on Adobe's architectural shift
          </div>
        </div>
      </div>

      {/* Topic eyebrow */}
      <div>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12,
            color: C.amber,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Adobe Experience Manager <span style={{ color: C.inkMuted, margin: '0 8px' }}>→</span> Edge Delivery Services
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 400,
          fontSize: 80,
          lineHeight: 0.98,
          letterSpacing: '-0.025em',
          color: C.ink,
          margin: 0,
        }}
      >
        A platform decision,
        <br />
        <span style={{ fontStyle: 'italic', color: C.amber }}>not a platform upgrade.</span>
      </h1>

      {/* Description */}
      <div style={{ maxWidth: 620 }}>
        <Body size={16} color={C.inkMid} lh={1.55}>
          An IBM-prepared briefing on Adobe's architectural shift, what it means for current AEM
          investments, and the strategic choices that need to happen this fiscal year — with
          particular attention to the enterprise content management capabilities that regulated
          industries cannot afford to lose.
        </Body>
      </div>
    </div>

    {/* bottom */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 1,
      }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <Pill>Architecture</Pill>
        <Pill>Migration</Pill>
        <Pill>AI Roadmap</Pill>
        <Pill>Regulated Industries</Pill>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: C.inkMuted,
            letterSpacing: '0.15em',
          }}
        >
          9 SLIDES · ~10 MIN
        </div>
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 01 — COMBINED: THE SHIFT + WHAT IS EDS + ECM PRESERVATION
────────────────────────────────────────────────────────────────── */
const SlideShiftAndArchitecture = () => (
  <SlideShell num="01" label="The shift + the architecture" kicker="Direction, definition, and what it preserves">
    <SlideTitle size={46}>
      A strategic shift —{' '}
      <span style={{ fontStyle: 'italic', color: C.amber }}>composable</span> with what you've
      built.
    </SlideTitle>

    <div style={{ marginTop: 14, maxWidth: 760 }}>
      <Body size={14} lh={1.55}>
        Adobe has made a platform-direction decision: Edge Delivery Services is now the foundation
        of its forward web roadmap, including its AI capabilities. Importantly, EDS is not a
        rip-and-replace of classic AEM — it is a modern delivery layer that can sit on top of the
        AEM Sites environments you already operate.
      </Body>
    </div>

    {/* two-column body */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 30,
        marginTop: 20,
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* LEFT — The Shift */}
      <div
        style={{
          border: `1px solid ${C.line}`,
          background: C.bgElev,
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Compass size={14} color={C.amber} />
          <Eyebrow>The Shift</Eyebrow>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {[
            "Adobe's guidance: new sites should be built on EDS, not classic AEM Sites.",
            'New AI capabilities and the partner ecosystem are landing on EDS first.',
            'Legacy AEM stacks are now on a different innovation and investment trajectory.',
          ].map((line, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: 10,
                alignItems: 'baseline',
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  color: C.amber,
                  letterSpacing: '0.12em',
                }}
              >
                0{i + 1}
              </div>
              <Body size={13.5} lh={1.5} color={C.ink}>
                {line}
              </Body>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — The Architecture */}
      <div
        style={{
          border: `1px solid ${C.line}`,
          background: C.bgElev,
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Layers size={14} color={C.amber} />
          <Eyebrow>What EDS Is</Eyebrow>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {[
            { icon: Globe, t: 'Edge-first delivery — replaces AEM Publish / Dispatcher.' },
            { icon: FileText, t: 'Author in Word, Google Docs, SharePoint, or Universal Editor.' },
            { icon: GitBranch, t: 'Code in GitHub. Plain HTML, modern CSS, vanilla JS — no build chain.' },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: 10,
                alignItems: 'baseline',
              }}
            >
              <row.icon size={13} color={C.amber} style={{ marginTop: 2 }} />
              <Body size={13.5} lh={1.5} color={C.ink}>
                {row.t}
              </Body>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* BOTTOM CALLOUT — the ECM / regulated industries point */}
    <div
      style={{
        marginTop: 18,
        border: `1px solid ${C.amber}`,
        background: 'linear-gradient(90deg, rgba(232,163,61,0.08) 0%, rgba(232,163,61,0.02) 100%)',
        padding: '16px 22px',
        display: 'grid',
        gridTemplateColumns: '28px 1fr',
        gap: 16,
        alignItems: 'flex-start',
      }}
    >
      <Shield size={20} color={C.amber} style={{ marginTop: 2 }} />
      <div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 10,
            color: C.amber,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Critical for Life Sciences and other regulated enterprises
        </div>
        <div
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 18,
            color: C.ink,
            lineHeight: 1.35,
          }}
        >
          EDS can use{' '}
          <span style={{ fontStyle: 'italic', color: C.amber }}>AEM Sites as a content source</span>{' '}
          — preserving the Enterprise Content Management capabilities your governance and compliance
          posture depends on: MSM, workflows, content fragments, audit trails, and approvals stay
          intact. EDS becomes a modern delivery layer on top — not a replacement underneath.
        </div>
      </div>
    </div>
  </SlideShell>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 02 — COMBINED: WHY EDS + PROOF
────────────────────────────────────────────────────────────────── */
const SlideWhyAndProof = () => (
  <SlideShell num="02" label="Why EDS — and the proof" kicker="Performance · velocity · innovation">
    <SlideTitle size={48}>
      Three forces <span style={{ fontStyle: 'italic', color: C.amber }}>compound</span> in the
      numbers.
    </SlideTitle>
    <div style={{ marginTop: 10, maxWidth: 680 }}>
      <Body size={14}>
        Performance, velocity, and access to Adobe's innovation roadmap are no longer separate
        purchase criteria. EDS is where all three move together — and the proof is in market.
      </Body>
    </div>

    {/* THREE VALUE PILLARS */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14,
        marginTop: 22,
      }}
    >
      {[
        {
          icon: Gauge,
          tag: 'PERFORMANCE',
          h: '100',
          sub: 'Lighthouse target',
          body: 'Adobe applies a "Keeping it 100" discipline. Faster pages translate into SEO, engagement, and measurable conversion lift.',
        },
        {
          icon: Zap,
          tag: 'VELOCITY',
          h: 'Days',
          sub: 'not months',
          body: 'Document-based authoring and a GitHub-native code path collapse the change cycle from quarters to a release cadence marketing can use.',
        },
        {
          icon: Sparkles,
          tag: 'INNOVATION',
          h: 'AI-first',
          sub: 'roadmap alignment',
          body: 'New AEM agents and AI features are being built against the EDS surface. Staying on legacy increasingly means watching innovation pass.',
        },
      ].map((card) => (
        <div
          key={card.tag}
          style={{
            background: C.bgElev,
            border: `1px solid ${C.line}`,
            padding: '18px 18px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <Eyebrow>{card.tag}</Eyebrow>
            <card.icon size={14} color={C.amber} />
          </div>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 48,
              lineHeight: 0.95,
              color: C.ink,
              letterSpacing: '-0.02em',
            }}
          >
            {card.h}
          </div>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 15,
              color: C.amber,
              marginTop: 3,
              marginBottom: 12,
            }}
          >
            {card.sub}
          </div>
          <Body size={12.5} lh={1.5}>
            {card.body}
          </Body>
        </div>
      ))}
    </div>

    {/* PROOF STRIP */}
    <div style={{ marginTop: 18, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 10,
          color: C.inkMuted,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        Proof in market — reported outcomes
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
        }}
      >
        {[
          { v: '7.2 → 3.4s', l: 'Adobe.com LCP after EDS' },
          { v: '+35%', l: 'engaged-visit rate, mobile' },
          { v: '3×', l: 'retargeted conversion (HanesBrands)' },
          { v: 'Days', l: 'TTM gains — Volvo / Mack Trucks' },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              border: `1px solid ${C.line}`,
              borderLeft: `2px solid ${C.amber}`,
              padding: '12px 14px',
              background: C.bgCard,
            }}
          >
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 26,
                color: C.amber,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {s.v}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: FONT_SANS,
                fontSize: 11,
                color: C.inkMid,
                lineHeight: 1.4,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 03 — AI LAYER
────────────────────────────────────────────────────────────────── */
const SlideAILayer = () => (
  <SlideShell num="03" label="The AI layer" kicker="What is landing on EDS first">
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr', gap: 48, flex: 1, minHeight: 0 }}>
      <div>
        <SlideTitle size={46}>
          Adobe's AI roadmap is{' '}
          <span style={{ fontStyle: 'italic', color: C.amber }}>built against EDS.</span>
        </SlideTitle>
        <div style={{ marginTop: 20 }}>
          <Body size={14.5}>
            Adobe Summit 2025 and 2026 made the direction explicit: agentic AI is the next
            interaction layer, and EDS is the architecture that exposes it. Brand Concierge, AEM
            Sites Optimizer, and the Experience Modernization Agent all assume — or strongly
            prefer — an EDS surface.
          </Body>
        </div>
        <div style={{ marginTop: 22 }}>
          <TakeawayBar icon={Cpu}>
            Staying on legacy means watching the AI roadmap from the sidelines.
          </TakeawayBar>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
        {[
          {
            icon: MessagesSquare,
            t: 'Brand Concierge',
            b: 'Conversational delivery surface that turns AEM content into branded, governed AI dialogue. AEM remains the source of truth; EDS is the delivery shape.',
          },
          {
            icon: TrendingUp,
            t: 'AEM Sites Optimizer',
            b: 'AI-first optimization layer that detects performance, relevance, and conversion opportunities — then deploys fixes directly.',
          },
          {
            icon: Bot,
            t: 'Experience Modernization Agent',
            b: 'The migration tool itself is an AI agent: it analyzes existing pages, maps them to EDS blocks, extracts a design system, and writes the code as reviewable GitHub PRs.',
          },
          {
            icon: Wand2,
            t: 'GenStudio + Firefly',
            b: 'Commercially safe generative content production for the EDS pipeline — copy, image, and video variations that publish straight into the delivery layer.',
          },
        ].map((row) => (
          <div
            key={row.t}
            style={{
              display: 'grid',
              gridTemplateColumns: '28px 1fr',
              gap: 12,
              padding: '10px 0',
              borderBottom: `1px solid ${C.lineSoft}`,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                border: `1px solid ${C.line}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <row.icon size={13} color={C.amber} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 19,
                  color: C.ink,
                  lineHeight: 1.2,
                  marginBottom: 3,
                }}
              >
                {row.t}
              </div>
              <Body size={12.5} lh={1.5}>
                {row.b}
              </Body>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 04 — MIGRATION REALITY
────────────────────────────────────────────────────────────────── */
const SlideMigrationReality = () => (
  <SlideShell num="04" label="The migration reality" kicker="Inevitability, not optionality">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, flex: 1, minHeight: 0 }}>
      <div>
        <SlideTitle size={48}>
          The question isn't <span style={{ fontStyle: 'italic', color: C.amber }}>whether</span>
          {' '}to migrate.
        </SlideTitle>
        <div style={{ marginTop: 16, maxWidth: 460 }}>
          <Body size={14.5}>
            With Adobe's roadmap, AI features, and partner ecosystem increasingly centered on EDS,
            remaining on legacy AEM becomes harder to justify each cycle. The real choice is about
            direction — and timing.
          </Body>
        </div>

        <div style={{ marginTop: 24 }}>
          <TakeawayBar icon={Compass}>
            Act proactively on your timeline, or be forced to act reactively on Adobe's.
          </TakeawayBar>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: C.inkMuted,
            letterSpacing: '0.18em',
            marginBottom: 2,
          }}
        >
          THE THREE PATHS FORWARD
        </div>

        {[
          {
            label: 'PATH A',
            t: 'Migrate to EDS',
            b: 'Stay aligned to Adobe — preserve license investments, gain AI access, gain performance. Highest near-term work, lowest long-term risk.',
            accent: true,
          },
          {
            label: 'PATH B',
            t: 'Migrate off Adobe',
            b: 'Move to an alternative stack (headless CMS + composable frontend). Higher switching cost; loses Adobe-native AI roadmap and integrated marketing tooling.',
          },
          {
            label: 'PATH C',
            t: 'Defer',
            b: 'Stay on legacy AEM. Each quarter, tech debt accrues, migration windows compress, and divergence from Adobe\u2019s roadmap widens.',
          },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              border: `1px solid ${p.accent ? C.amber : C.line}`,
              background: p.accent ? 'rgba(232,163,61,0.05)' : C.bgElev,
              padding: '14px 18px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 4,
              }}
            >
              <Eyebrow color={p.accent ? C.amber : C.inkMuted}>{p.label}</Eyebrow>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 20,
                  color: C.ink,
                }}
              >
                {p.t}
              </div>
            </div>
            <Body size={12.5} lh={1.55}>
              {p.b}
            </Body>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 05 — MIGRATION TOOLKIT
────────────────────────────────────────────────────────────────── */
const SlideToolkit = () => {
  const tools = [
    {
      icon: Bot,
      tag: 'AI-DRIVEN',
      t: 'Experience Modernization Agent',
      b: "Adobe's flagship migration agent. Analyzes pages, maps them to EDS blocks, extracts the design system, and writes CSS/JS as reviewable GitHub PRs.",
    },
    {
      icon: ScanLine,
      tag: 'CONTENT',
      t: 'AEM Importer Tool',
      b: 'Transforms existing page DOMs into the Markdown/docx structure EDS expects. Configurable per-block rules for repeatable, large-scale migrations.',
    },
    {
      icon: Workflow,
      tag: 'PLANNING',
      t: 'Cloud Acceleration Manager',
      b: "Adobe's end-to-end migration cockpit — readiness, implementation, go-live, post-launch. The umbrella for the other tools.",
    },
    {
      icon: ClipboardCheck,
      tag: 'ASSESSMENT',
      t: 'Best Practices Analyzer',
      b: 'Scans the existing AEM footprint and flags anti-patterns, custom code risks, and refactoring needs before migration begins.',
    },
    {
      icon: RefreshCw,
      tag: 'CONTENT',
      t: 'Content Transfer Tool',
      b: 'Moves repository content into AEM as a Cloud Service safely — handles large repositories, validation, and resumable transfers.',
    },
    {
      icon: Package,
      tag: 'SANDBOX',
      t: 'AEM Playground',
      b: 'Isolated environment to pilot migrations and test agent workflows without touching production code or content.',
    },
  ];

  return (
    <SlideShell num="05" label="Adobe's migration toolkit" kicker="What Adobe has built to help">
      <SlideTitle size={44}>
        Adobe has invested heavily in{' '}
        <span style={{ fontStyle: 'italic', color: C.amber }}>making this migration
        accelerable.</span>
      </SlideTitle>
      <div style={{ marginTop: 10, maxWidth: 680 }}>
        <Body size={14}>
          A suite of purpose-built tools — and increasingly, AI agents — addresses the mechanical
          work that used to define multi-quarter migration programs.
        </Body>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginTop: 20,
          flex: 1,
          minHeight: 0,
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool.t}
            style={{
              background: C.bgElev,
              border: `1px solid ${C.line}`,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Eyebrow>{tool.tag}</Eyebrow>
              <tool.icon size={14} color={C.amber} />
            </div>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 18,
                color: C.ink,
                lineHeight: 1.2,
                marginBottom: 6,
              }}
            >
              {tool.t}
            </div>
            <Body size={12} lh={1.5}>
              {tool.b}
            </Body>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

/* ──────────────────────────────────────────────────────────────────
   SLIDE 06 — THREE QUESTIONS
────────────────────────────────────────────────────────────────── */
const SlideQuestions = () => (
  <SlideShell num="06" label="Three strategic questions" kicker="The board conversation">
    <SlideTitle size={48}>
      What leadership needs to <span style={{ fontStyle: 'italic', color: C.amber }}>decide</span>
      , not just discuss.
    </SlideTitle>
    <div style={{ marginTop: 10, maxWidth: 640 }}>
      <Body size={14}>
        Three questions to put on the next quarterly review agenda — each forces a real choice.
      </Body>
    </div>

    <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minHeight: 0 }}>
      {[
        {
          n: '01',
          t: 'Innovation',
          q: "Do we want to remain on Adobe\u2019s innovation path — including its agentic AI capabilities — or accept divergence from it?",
        },
        {
          n: '02',
          t: 'Economics',
          q: 'What is the real cost of staying on legacy AEM versus the cost of a controlled, phased migration to EDS?',
        },
        {
          n: '03',
          t: 'Timing',
          q: "Do we want to choose our migration timeline deliberately — or be forced into it later, under pressure, on Adobe\u2019s schedule?",
        },
      ].map((item) => (
        <div
          key={item.n}
          style={{
            display: 'grid',
            gridTemplateColumns: '110px 170px 1fr',
            gap: 22,
            alignItems: 'center',
            padding: '14px 0',
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 64,
              color: C.amber,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            {item.n}
          </div>
          <div>
            <Eyebrow>Question</Eyebrow>
            <div
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontSize: 28,
                color: C.ink,
                marginTop: 4,
                lineHeight: 1.1,
              }}
            >
              {item.t}
            </div>
          </div>
          <Body size={15} lh={1.5} color={C.inkMid}>
            {item.q}
          </Body>
        </div>
      ))}
    </div>
  </SlideShell>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 07 — NEXT STEPS
────────────────────────────────────────────────────────────────── */
const SlideNextSteps = () => (
  <SlideShell num="07" label="Recommended next steps" kicker="From awareness to decision">
    <SlideTitle size={46}>
      A <span style={{ fontStyle: 'italic', color: C.amber }}>phased path</span> from this
      conversation to a defensible business case.
    </SlideTitle>

    <div
      style={{
        marginTop: 22,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        flex: 1,
        minHeight: 0,
      }}
    >
      {[
        {
          n: 'Step 01',
          t: 'Assess the footprint',
          b: 'Inventory current AEM sites, templates, integrations, custom components, content models, and dependencies. Identify what is actually in scope.',
          tag: '2–4 WEEKS',
        },
        {
          n: 'Step 02',
          t: 'Evaluate the paths',
          b: "Test the EDS migration path side-by-side against alternative architectures. Run a representative site through Adobe\u2019s toolkit as proof.",
          tag: '4–6 WEEKS',
        },
        {
          n: 'Step 03',
          t: 'Build the case',
          b: 'Quantify migration cost, ongoing operating-model impact, innovation access, and long-term value. Surface the cost of inaction explicitly.',
          tag: '3–4 WEEKS',
        },
        {
          n: 'Step 04',
          t: 'Sequence the roadmap',
          b: 'Prioritize candidate sites, identify quick wins, define the rollout cadence, and lock in the governance model that owns the work.',
          tag: 'EXEC SIGN-OFF',
        },
      ].map((step, i) => (
        <div
          key={step.n}
          style={{
            background: C.bgElev,
            border: `1px solid ${C.line}`,
            padding: '16px 16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Eyebrow>{step.n}</Eyebrow>
            {i < 3 && <ArrowRight size={14} color={C.inkMuted} />}
          </div>
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 20,
              color: C.ink,
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            {step.t}
          </div>
          <div style={{ flex: 1 }}>
            <Body size={12} lh={1.55}>
              {step.b}
            </Body>
          </div>
          <div
            style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: `1px solid ${C.lineSoft}`,
              fontFamily: FONT_MONO,
              fontSize: 10,
              color: C.amber,
              letterSpacing: '0.15em',
            }}
          >
            {step.tag}
          </div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 18 }}>
      <TakeawayBar>
        Adobe has set the future-state architecture. The opportunity is to respond on your terms —
        protecting flexibility, controlling cost, and preserving access to future innovation.
      </TakeawayBar>
    </div>
  </SlideShell>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDE 08 — DISCUSSION
────────────────────────────────────────────────────────────────── */
const SlideDiscussion = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      padding: '48px 60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: -200,
        bottom: -200,
        width: 600,
        height: 600,
        borderRadius: '50%',
        border: `1px solid ${C.line}`,
        opacity: 0.5,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: -160,
        bottom: -160,
        width: 520,
        height: 520,
        borderRadius: '50%',
        border: `1px solid ${C.lineSoft}`,
      }}
    />

    <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1, alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <IBMMark size={28} />
        <Eyebrow>08 / Discussion</Eyebrow>
      </div>
      <Eyebrow color={C.inkMuted}>Your move</Eyebrow>
    </div>

    <div style={{ zIndex: 1, maxWidth: '85%' }}>
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 400,
          fontSize: 78,
          lineHeight: 0.98,
          letterSpacing: '-0.025em',
          color: C.ink,
          margin: 0,
        }}
      >
        Where do you want to be on this{' '}
        <span style={{ fontStyle: 'italic', color: C.amber }}>trajectory</span>
        <br />
        in <span style={{ fontStyle: 'italic' }}>eighteen months?</span>
      </h1>

      <div style={{ marginTop: 32, maxWidth: 620 }}>
        <Body size={16} lh={1.55}>
          Adobe has chosen. The market signals are clear. The migration tooling is in place. What
          remains is a decision about pace, scope, and the operating model you want on the other
          side — and a partner who knows the AEM stack, the regulated-industry constraints, and the
          path through.
        </Body>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <Pill accent>Path</Pill>
        <Pill accent>Pace</Pill>
        <Pill accent>Partner</Pill>
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.inkMuted, letterSpacing: '0.15em' }}>
        IBM POINT OF VIEW · END OF BRIEFING
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────
   SLIDES REGISTRY
────────────────────────────────────────────────────────────────── */
const slides = [
  { key: 'cover', label: 'Cover', component: SlideCover },
  { key: 'shift', label: 'The shift + architecture', component: SlideShiftAndArchitecture },
  { key: 'whyproof', label: 'Why EDS + proof', component: SlideWhyAndProof },
  { key: 'ai', label: 'The AI layer', component: SlideAILayer },
  { key: 'reality', label: 'Migration reality', component: SlideMigrationReality },
  { key: 'toolkit', label: "Adobe's toolkit", component: SlideToolkit },
  { key: 'questions', label: 'Three questions', component: SlideQuestions },
  { key: 'next', label: 'Next steps', component: SlideNextSteps },
  { key: 'discuss', label: 'Discussion', component: SlideDiscussion },
];

/* ──────────────────────────────────────────────────────────────────
   APP
────────────────────────────────────────────────────────────────── */
export default function Presentation() {
  const [i, setI] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const next = useCallback(() => {
    setI((curr) => {
      const n = Math.min(curr + 1, slides.length - 1);
      if (n !== curr) setAnimKey((k) => k + 1);
      return n;
    });
  }, []);

  const prev = useCallback(() => {
    setI((curr) => {
      const n = Math.max(curr - 1, 0);
      if (n !== curr) setAnimKey((k) => k + 1);
      return n;
    });
  }, []);

  const goTo = useCallback((idx) => {
    setI((curr) => {
      if (idx !== curr) setAnimKey((k) => k + 1);
      return idx;
    });
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  /* load fonts */
  useEffect(() => {
    const id = 'eds-deck-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
  }, []);

  const Current = slides[i].component;

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: C.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        fontFamily: FONT_SANS,
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-anim { animation: slideIn 480ms cubic-bezier(0.2, 0.8, 0.2, 1); }
        .nav-btn:hover { background: ${C.bgCard} !important; border-color: ${C.amber} !important; color: ${C.ink} !important; }
        .dot:hover { background: ${C.amber} !important; }
        ::selection { background: ${C.amber}; color: ${C.bg}; }
        body { background: ${C.bg}; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 1180 }}>
        {/* TOP META BAR with IBM POV branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 14,
            marginBottom: 14,
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IBMMark size={28} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  color: C.amber,
                  letterSpacing: '0.2em',
                  fontWeight: 500,
                }}
              >
                IBM POINT OF VIEW
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  color: C.inkMuted,
                  letterSpacing: '0.15em',
                }}
              >
                AEM → EDGE DELIVERY SERVICES · EXECUTIVE BRIEFING
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: C.inkMuted,
              letterSpacing: '0.15em',
            }}
          >
            {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </div>
        </div>

        {/* SLIDE STAGE */}
        <div
          style={{
            position: 'relative',
            background: `linear-gradient(180deg, ${C.bgElev} 0%, ${C.bg} 100%)`,
            border: `1px solid ${C.line}`,
            aspectRatio: '16 / 10',
            minHeight: 560,
            overflow: 'hidden',
          }}
        >
          {/* subtle grain overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(rgba(232,163,61,0.04) 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              pointerEvents: 'none',
              opacity: 0.5,
            }}
          />
          <div key={animKey} className="slide-anim" style={{ width: '100%', height: '100%' }}>
            <Current />
          </div>
        </div>

        {/* BOTTOM CONTROL BAR */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={prev}
            disabled={i === 0}
            className="nav-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              background: 'transparent',
              border: `1px solid ${C.line}`,
              color: i === 0 ? C.inkDim : C.inkMid,
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: i === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: i === 0 ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={14} />
            Previous
          </button>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {slides.map((s, idx) => {
              const active = idx === i;
              const past = idx < i;
              return (
                <button
                  key={s.key}
                  onClick={() => goTo(idx)}
                  className="dot"
                  title={s.label}
                  style={{
                    width: active ? 28 : 8,
                    height: 4,
                    border: 'none',
                    background: active ? C.amber : past ? C.inkMuted : C.line,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              );
            })}
          </div>

          <button
            onClick={next}
            disabled={i === slides.length - 1}
            className="nav-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              background: C.amber,
              border: `1px solid ${C.amber}`,
              color: C.bg,
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: i === slides.length - 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: i === slides.length - 1 ? 0.4 : 1,
            }}
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>

        <div
          style={{
            marginTop: 12,
            textAlign: 'center',
            fontFamily: FONT_MONO,
            fontSize: 10,
            color: C.inkDim,
            letterSpacing: '0.15em',
          }}
        >
          USE ← → KEYS TO NAVIGATE · CLICK DOTS TO JUMP · CURRENT: {slides[i].label.toUpperCase()}
        </div>
      </div>
    </div>
  );
}