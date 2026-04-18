import Link from "next/link";
import OutlineSidebar from "@/components/OutlineSidebar";
import ReactionBar from "@/components/ReactionBar";
import AuthorAvatars from "@/components/AuthorAvatars";
import { TextHighlighter } from "@/components/fancy/text/text-highlighter";
import { FocusParagraph } from "@/components/FocusParagraph";
import EditorTrigger from "@/components/editor/EditorTrigger";
import RightPanel from "@/components/RightPanel";
import ComparisonTakeover from "@/components/ComparisonTakeover";
import VariantComparisonB from "@/components/VariantComparisonB";
import PhonePanelWrapper from "@/components/PhonePanelWrapper";

export default function ArticlePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#111111]">
      <div className="relative mx-auto" style={{ maxWidth: 1280, height: 4800 }}>

        {/* Vertical left rail */}
        <div
          className="absolute top-0 bottom-0 w-px bg-[#2a2a2a]"
          style={{ left: 10 }}
        />

        {/* Horizontal header divider */}
        <div
          className="fixed h-px bg-[#2a2a2a] z-30"
          style={{ top: 131, left: 0, right: 0 }}
        />

        {/* ─── HEADER ─── */}
        <header
          className="article-header fixed flex items-center justify-between bg-[#111111] z-20"
          style={{ top: 0, left: 30, right: 30, height: 131 }}
        >
          {/* Title + date */}
          <div>
            <h1 className="title-stroke" style={{ color: "#f0f0f0", WebkitTextStroke: "0" }}>Devouring Details</h1>
            <div className="flex items-center gap-2" style={{ marginTop: 10 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#727272",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                23 January, 2026
              </span>
              <span className="inline-block w-[3px] h-[3px] rounded-full bg-[#727272]" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#727272",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Discovery
              </span>
              <span className="inline-block w-[3px] h-[3px] rounded-full bg-[#727272]" />
              {/* Status tag */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#1a2e1a",
                  border: "1px solid #2d4a2d",
                  borderRadius: 999,
                  padding: "2px 10px 2px 8px",
                }}
              >
                <span style={{ position: "relative", width: 6, height: 6, minWidth: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="animate-ping" style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#4ade80", opacity: 0.5 }} />
                  <span className="animate-ping" style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#4ade80", opacity: 0.35, animationDelay: "0.4s" }} />
                  <span className="animate-ping" style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "#4ade80", opacity: 0.2, animationDelay: "0.8s" }} />
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", position: "relative", zIndex: 1, flexShrink: 0 }} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#4ade80",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Live in production
                </span>
                <span
                  style={{
                    width: 1,
                    height: 10,
                    background: "#2d4a2d",
                    display: "inline-block",
                    margin: "0 2px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#4ade80",
                    letterSpacing: "0.04em",
                    opacity: 0.7,
                  }}
                >
                  163K users (20% adoption)
                </span>
              </span>
            </div>
          </div>

          {/* Author + avatars + home link */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 700,
                color: "#727272",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "6px 12px",
                border: "1px solid #2a2a2a",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              ← Map
            </Link>
            <EditorTrigger />
            <AuthorAvatars />
          </div>
        </header>

        {/* ─── LEFT OUTLINE SIDEBAR ─── */}
        <div className="article-sidebar fixed" style={{ left: 0, top: 156 }}>
          <OutlineSidebar />
        </div>

        {/* ─── CONTENT + PHONE ROW ─── */}
        <div className="absolute flex items-start" style={{ left: 80, right: 500, top: 131 }}>

        {/* ─── MAIN CONTENT ─── */}
        <main className="article-main" style={{ flex: 1, minWidth: 0 }}>

          {/* 1. OUTLINE */}
          <p
            id="section-outline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 800,
              color: "#727272",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginTop: 28,
              lineHeight: "19.5px",
            }}
          >
            Outline
          </p>

          {/* Intro paragraph — mixed weights */}
          <FocusParagraph
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: "27px",
              letterSpacing: "-0.16px",
              color: "#f0f0f0",
              marginTop: 48,
              width: "100%",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong style={{ fontWeight: 600 }}>
                <TextHighlighter>Devouring Details</TextHighlighter>
              </strong>
              <span style={{ fontWeight: 300 }}>{" is an interactive "}</span>
              <span style={{ fontWeight: 300 }}>
                reference manual for interaction-curious{" "}
              </span>
              <span style={{ fontWeight: 300 }}>designers, containing </span>
              <strong style={{ fontWeight: 600 }}>
                <TextHighlighter useInViewOptions={{ once: true, amount: 0.5 }}>
                  23 chapters with 23 downloadable
                </TextHighlighter>{" "}
              </strong>
              <span style={{ fontWeight: 300 }}>React components.</span>
            </p>
          </FocusParagraph>

          {/* Body text — gradient fade */}
          <FocusParagraph
            
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: "27px",
              letterSpacing: "-0.16px",
              fontWeight: 300,
              width: "100%",
              marginTop: 48,
            }}
          >
            <p style={{ margin: 0 }}>
              Embark on an enlightening journey through the world of UX design
              with &apos;Devouring Details.&apos; This interactive manual is tailored for
              designers with a thirst for knowledge.
            </p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>
              Inside, you&apos;ll discover a wealth of information, thoughtfully
              organized into distinct chapters. Each chapter offers downloadable
              React components, empowering you to enhance your projects.
            </p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>
              Whether you&apos;re a seasoned designer or just starting,
              &apos;Devouring Details&apos; provides valuable insights and practical tools
              to elevate your UX skills. Dive in and unlock your design
              potential!
            </p>
          </FocusParagraph>

          {/* Section divider */}
          <div
            id="section-millions"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "19.5px",
              marginTop: 120,
            }}
          >
            <span style={{ color: "#727272" }}>We move billions for </span>
            <span
              style={{
                color: "#f0f0f0",
                textDecoration: "underline",
                textDecorationColor: "#ff5800",
                textUnderlineOffset: 3,
                textDecorationThickness: 2,
              }}
            >
              Millions
            </span>
          </div>

          {/* Second faded body block */}
          <FocusParagraph
            
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: "27px",
              letterSpacing: "-0.16px",
              fontWeight: 300,
              width: "100%",
              marginTop: 48,
            }}
          >
            <p style={{ margin: 0 }}>
              Inside, you&apos;ll discover a wealth of information, thoughtfully
              organized into distinct chapters. Each chapter offers downloadable
              React components, empowering you to enhance your projects.
            </p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>
              Whether you&apos;re a seasoned designer or just starting,
              &apos;Devouring Details&apos; provides valuable insights and practical tools
              to elevate your UX skills. Dive in and unlock your design
              potential!
            </p>
          </FocusParagraph>

          {/* Section: The Craft of Micro-interactions */}
          <div
            id="section-micro"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "19.5px",
              marginTop: 120,
            }}
          >
            <span style={{ color: "#727272" }}>The craft of </span>
            <span
              style={{
                color: "#f0f0f0",
                textDecoration: "underline",
                textDecorationColor: "#ff5800",
                textUnderlineOffset: 3,
                textDecorationThickness: 2,
              }}
            >
              Micro-interactions
            </span>
          </div>

          <FocusParagraph
            
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: "27px",
              letterSpacing: "-0.16px",
              fontWeight: 300,
              width: "100%",
              marginTop: 48,
            }}
          >
            <p style={{ margin: 0 }}>
              Micro-interactions are the{" "}
              <TextHighlighter>invisible stitches that hold a great product together</TextHighlighter>.
              {" "}They communicate state, guide attention, and
              reward users for engagement — all within a fraction of a second.
              When done well, they&apos;re invisible. When done poorly, they erode
              trust in ways users can feel but rarely articulate.
            </p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>
              This chapter dissects over forty real-world micro-interactions
              across categories: form feedback, loading states, gesture
              responses, and transactional confirmations. Each example ships
              as a ready-to-drop-in React component with zero external
              dependencies.
            </p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>
              The goal isn&apos;t novelty — it&apos;s precision. A button that deforms
              on press, a field that shakes on error, a success state that
              breathes. Each behavior has a reason, and that reason is
              explained alongside the code.
            </p>
          </FocusParagraph>

          {/* Section: Motion as Language */}
          <div
            id="section-motion"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "19.5px",
              marginTop: 120,
            }}
          >
            <span style={{ color: "#727272" }}>Motion as </span>
            <span
              style={{
                color: "#f0f0f0",
                textDecoration: "underline",
                textDecorationColor: "#ff5800",
                textUnderlineOffset: 3,
                textDecorationThickness: 2,
              }}
            >
              Language
            </span>
          </div>

          <FocusParagraph
            
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: "27px",
              letterSpacing: "-0.16px",
              fontWeight: 300,
              width: "100%",
              marginTop: 48,
            }}
          >
            <p style={{ margin: 0 }}>
              <TextHighlighter>Animation is not decoration.</TextHighlighter>
              {" "}It carries semantic weight — it tells
              users where they are, where they came from, and what just changed.
              A modal that expands from its trigger communicates spatial
              hierarchy. An element that fades signals permanence versus
              temporality.
            </p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>
              We explore the physics behind spring-based animation, the
              psychology of easing curves, and why duration matters far more
              than most designers realise. The chapter includes annotated
              comparisons of the same transition done three ways — bad, good,
              and considered.
            </p>
          </FocusParagraph>

          {/* A/B TEST — VERSION A (full-screen takeover) */}
          <ComparisonTakeover />

          {/* A/B TEST — VERSION B (widget comparison) */}
          <VariantComparisonB />

          {/* 4. FEEDBACK LOOP */}
          <div id="section-feedback" style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: "19.5px", marginTop: 120 }}>
            <span style={{ color: "#727272" }}>The feedback </span>
            <span style={{ color: "#f0f0f0", textDecoration: "underline", textDecorationColor: "#ff5800", textUnderlineOffset: 3, textDecorationThickness: 2 }}>Loop</span>
          </div>
          <FocusParagraph style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "27px", letterSpacing: "-0.16px", fontWeight: 300, width: "100%", marginTop: 20 }}>
            <p style={{ margin: 0 }}><TextHighlighter>Design without feedback is decoration.</TextHighlighter> This final chapter is about closing the loop — building the habits, processes, and instruments that let you know whether what you shipped actually worked, and what to do when it didn&apos;t.</p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>We cover the four feedback instruments every design team needs: qualitative sessions, quantitative funnels, passive signal monitoring, and longitudinal cohort tracking. Not as abstract methodology, but as a practical operating model — what to run when, how to synthesise across instruments, and how to act on what you find without paralysing the roadmap.</p>
            <p style={{ marginTop: 27, marginBottom: 0 }}>Design is not a moment. It is a practice. Every shipped product is a hypothesis, every user a source of signal, every iteration a step toward something more considered, more precise, and more deserving of the attention it asks for.</p>
          </FocusParagraph>

          {/* 5. INITIAL RESULTS */}
          <div id="section-results" style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: "19.5px", marginTop: 120 }}>
            <span style={{ color: "#727272" }}>Initial </span>
            <span style={{ color: "#f0f0f0", textDecoration: "underline", textDecorationColor: "#ff5800", textUnderlineOffset: 3, textDecorationThickness: 2 }}>Results</span>
          </div>

          <FocusParagraph style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "27px", letterSpacing: "-0.16px", fontWeight: 300, width: "100%", marginTop: 20 }}>
            <p style={{ margin: 0 }}>
              Sharing the initial numbers for the <strong style={{ fontWeight: 600, color: "#f0f0f0" }}>Best Price</strong> feature. It is currently live for 50% of users (25% in each test variant). While platform metrics remain stable, we are seeing positive movement in lower-funnel conversion across both variants.
            </p>
          </FocusParagraph>

          {/* Section: The Team */}
          <div id="section-team" style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: "19.5px", marginTop: 120 }}>
            <span style={{ color: "#727272" }}>Meet the </span>
            <span style={{ color: "#f0f0f0", textDecoration: "underline", textDecorationColor: "#ff5800", textUnderlineOffset: 3, textDecorationThickness: 2 }}>Team</span>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 48, flexWrap: "wrap" }}>
            {[
              { initials: "RJ", name: "Rahul Jaiswal", role: "Product Design Lead" },
              { initials: "AK", name: "Ayush Kapoor", role: "Interaction Designer" },
              { initials: "MS", name: "Maya Singh", role: "Visual Designer" },
              { initials: "NP", name: "Neha Pillai", role: "Design Researcher" },
              { initials: "KV", name: "Karan Verma", role: "Motion Designer" },
            ].map((member) => (
              <div
                key={member.initials}
                style={{
                  flex: "0 0 calc(33.333% - 8px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  background: "#161616",
                  border: "1px solid #2a2a2a",
                  borderRadius: 12,
                  padding: "36px 16px 32px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#ff5800",
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#f0f0f0", lineHeight: "18px" }}>{member.name}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, color: "#727272", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 4 }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>

        </main>

        </div>{/* end content row */}

        {/* ─── RIGHT PANEL — VIDEO / SLIDER ─── */}
        <PhonePanelWrapper>
          <RightPanel />
        </PhonePanelWrapper>

        {/* ─── BOTTOM REACTION BAR ─── */}
        <div
          className="fixed left-0 right-0 z-10 bg-[#111111]"
          style={{ bottom: 0, borderTop: "1px solid #2a2a2a" }}
        >
          <ReactionBar />
        </div>

      </div>
    </div>
  );
}
