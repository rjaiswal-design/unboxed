"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── Spotlight search index ───────────────────────────────────────────────────
type SearchResult = {
  id: string;
  title: string;
  sub: string;
  category: string;
  href: string;
};

const SEARCH_INDEX: SearchResult[] = [
  // Article sections
  { id: "s-intro",      title: "Introduction",         sub: "What is Devouring Details?",        category: "Article",  href: "/article#top" },
  { id: "s-discovery",  title: "Discovery Phase",       sub: "How users find products",           category: "Article",  href: "/article#section-discovery" },
  { id: "s-pdp",        title: "Product Detail Page",   sub: "The anatomy of a PDP",              category: "Article",  href: "/article#section-pdp" },
  { id: "s-price",      title: "Price Widget",          sub: "Best price & comparison feature",   category: "Article",  href: "/article#section-comparison" },
  { id: "s-millions",   title: "noon One Membership",   sub: "163K users, 20% adoption",          category: "Article",  href: "/article#section-millions" },
  { id: "s-gallery",    title: "Gallery & Images",      sub: "Visual commerce at noon",           category: "Article",  href: "/article#section-gallery" },
  { id: "s-cart",       title: "Cart Experience",       sub: "Purchase intent signals",           category: "Article",  href: "/article#section-cart" },
  { id: "s-checkout",   title: "Checkout Funnel",       sub: "Conversion optimisation",           category: "Article",  href: "/article#section-checkout" },
  // Map sections
  { id: "m-home",       title: "Home",                  sub: "Landing experience",                category: "Map",      href: "/?graph=home" },
  { id: "m-pdp",        title: "PDP",                   sub: "Product detail page",               category: "Map",      href: "/?graph=pdp" },
  { id: "m-plp",        title: "PLP",                   sub: "Product listing page",              category: "Map",      href: "/?graph=plp" },
  { id: "m-search",     title: "Search",                sub: "Discovery & autocomplete",          category: "Map",      href: "/?graph=search" },
  { id: "m-cart",       title: "Cart",                  sub: "Purchase intent",                   category: "Map",      href: "/?graph=cart" },
  { id: "m-checkout",   title: "Checkout",              sub: "Conversion funnel",                 category: "Map",      href: "/?graph=checkout" },
  { id: "m-account",    title: "Account",               sub: "User profile & orders",             category: "Map",      href: "/?graph=account" },
];

// ─── Graph data ──────────────────────────────────────────────────────────────
type NodeDef = {
  id: string;
  label: string;
  sub: string;
  childGraph?: string;
  href?: string;
};
type GraphDef = {
  centerLabel: string;
  centerSub: string;
  centerAction: "article" | "back";
  parentGraph?: string;
  nodes: NodeDef[];
};

const GRAPHS: Record<string, GraphDef> = {
  root: {
    centerLabel: "Unboxed",
    centerSub: "Search",
    centerAction: "article",
    nodes: [
      { id: "home",     label: "Home",     sub: "Landing experience",  childGraph: "home"     },
      { id: "pdp",      label: "PDP",      sub: "Product detail page", childGraph: "pdp"      },
      { id: "plp",      label: "PLP",      sub: "Product listing",     childGraph: "plp"      },
      { id: "search",   label: "Search",   sub: "Discovery",           childGraph: "search"   },
      { id: "cart",     label: "Cart",     sub: "Purchase intent",     childGraph: "cart"     },
      { id: "checkout", label: "Checkout", sub: "Conversion funnel",   childGraph: "checkout" },
      { id: "account",  label: "Account",  sub: "User profile",        childGraph: "account"  },
    ],
  },
  home: {
    centerLabel: "Home Page",
    centerSub: "Back to map",
    centerAction: "back",
    parentGraph: "root",
    nodes: [
      { id: "hero",       label: "Hero Banner",  sub: "Above the fold"     },
      { id: "carousel",   label: "Carousel",     sub: "Featured products"  },
      { id: "categories", label: "Categories",   sub: "Browse by type"     },
      { id: "deals",      label: "Flash Deals",  sub: "Time-limited"       },
      { id: "noon-one",   label: "noon One",     sub: "Membership widget", href: "/article#section-millions" },
      { id: "reco",       label: "Reco Engine",  sub: "For you section"    },
    ],
  },
  pdp: {
    centerLabel: "PDP",
    centerSub: "Back to map",
    centerAction: "back",
    parentGraph: "root",
    nodes: [
      { id: "price",      label: "Price Widget",  sub: "Best price feature", href: "/article#section-comparison" },
      { id: "gallery",    label: "Gallery",        sub: "Image viewer"        },
      { id: "atc",        label: "Add to Cart",    sub: "Primary CTA"         },
      { id: "reviews",    label: "Reviews",        sub: "Social proof"        },
      { id: "similar",    label: "Similar Items",  sub: "Cross-sell"          },
      { id: "breadcrumb", label: "Breadcrumb",     sub: "Navigation trail"    },
    ],
  },
  plp: {
    centerLabel: "PLP",
    centerSub: "Back to map",
    centerAction: "back",
    parentGraph: "root",
    nodes: [
      { id: "filters",    label: "Filters",       sub: "Refinement"  },
      { id: "sort",       label: "Sort",          sub: "Ranking options" },
      { id: "grid",       label: "Product Grid",  sub: "Item cards"  },
      { id: "facets",     label: "Facets",        sub: "Attributes"  },
      { id: "pagination", label: "Pagination",    sub: "Load more"   },
      { id: "cat-banner", label: "Cat Banner",    sub: "Editorial"   },
    ],
  },
  search: {
    centerLabel: "Search",
    centerSub: "Back to map",
    centerAction: "back",
    parentGraph: "root",
    nodes: [
      { id: "autocomplete", label: "Autocomplete", sub: "Suggestions"     },
      { id: "serp",         label: "Results",      sub: "SERP layout"     },
      { id: "zero-state",   label: "Zero State",   sub: "Empty results"   },
      { id: "trending",     label: "Trending",     sub: "Popular queries" },
      { id: "recent",       label: "Recent",       sub: "Search history"  },
    ],
  },
  cart: {
    centerLabel: "Cart",
    centerSub: "Back to map",
    centerAction: "back",
    parentGraph: "root",
    nodes: [
      { id: "summary",   label: "Order Summary", sub: "Price breakdown"    },
      { id: "coupons",   label: "Coupons",       sub: "Discount codes"     },
      { id: "upsell",    label: "Upsell",        sub: "Add-on items"       },
      { id: "delivery",  label: "Delivery",      sub: "Shipping options"   },
      { id: "noon-cart", label: "noon One",      sub: "Membership upsell", href: "/article#section-results" },
    ],
  },
  checkout: {
    centerLabel: "Checkout",
    centerSub: "Back to map",
    centerAction: "back",
    parentGraph: "root",
    nodes: [
      { id: "addr-step", label: "Address",      sub: "Delivery step"   },
      { id: "pay-step",  label: "Payment",      sub: "Payment step"    },
      { id: "review",    label: "Review",       sub: "Order review"    },
      { id: "confirm",   label: "Confirmation", sub: "Success state"   },
      { id: "trust",     label: "Trust Badges", sub: "Security signals"},
    ],
  },
  account: {
    centerLabel: "Account",
    centerSub: "Back to map",
    centerAction: "back",
    parentGraph: "root",
    nodes: [
      { id: "orders",     label: "Orders",     sub: "Purchase history"                              },
      { id: "wishlist",   label: "Wishlist",   sub: "Saved items"                                   },
      { id: "membership", label: "Membership", sub: "noon One status", href: "/article#section-millions" },
      { id: "addresses",  label: "Addresses",  sub: "Saved locations"                               },
      { id: "payments",   label: "Payments",   sub: "Saved cards"                                   },
    ],
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Vec2 = { x: number; y: number };
type DragState = { index: number; startX: number; startY: number; origX: number; origY: number };
type TransPhase = "idle" | "collapsing" | "expanding";

function toRad(deg: number) { return (deg * Math.PI) / 180; }

function computeGraphLayout(el: HTMLElement, nodeCount: number) {
  const { width, height } = el.getBoundingClientRect();
  const cx = width  / 2;
  const cy = height / 2;
  const r  = Math.min(width * 0.27, height * 0.37, 285);
  const positions = Array.from({ length: nodeCount }, (_, i) => {
    const a = toRad(-90 + i * (360 / nodeCount));
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  return { cx, cy, positions };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GraphHome() {
  const router       = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafFloat     = useRef<number>(0);
  const dragMoved    = useRef(false);
  // Skip layout re-run when panTo already set positions directly
  const skipLayout   = useRef(false);

  const [graphKey,     setGraphKey]     = useState("root");
  const [center,       setCenter]       = useState<Vec2>({ x: 0, y: 0 });
  const [positions,    setPositions]    = useState<Vec2[]>([]);
  const [floatOffsets, setFloatOffsets] = useState<Vec2[]>([]);
  const [dragging,     setDragging]     = useState<DragState | null>(null);
  const [hovered,      setHovered]      = useState<number | null>(null);
  const [ready,        setReady]        = useState(false);
  const [spotlight,      setSpotlight]      = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [searchSel,      setSearchSel]      = useState(0);
  const [centerHovered,  setCenterHovered]  = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Camera-pan + expand transition states ──────────────────────────────────
  const [transPhase,       setTransPhase]       = useState<TransPhase>("idle");
  const [expandOffsets,    setExpandOffsets]    = useState<Vec2[]>([]);  // target offsets for incoming nodes
  const [expandStarted,    setExpandStarted]    = useState(false);       // gates the expand CSS transition
  // Camera pan — applied to the whole graph container
  const [panOffset,        setPanOffset]        = useState<Vec2>({ x: 0, y: 0 });
  const [panTransition,    setPanTransition]    = useState(false);
  // Where we entered the current sub-graph from (for back-pan)
  const [enteredFrom,      setEnteredFrom]      = useState<Vec2>({ x: 0, y: 0 });
  // Which node was clicked (so others can converge toward it during pan)
  const [clickedNodeIdx,   setClickedNodeIdx]   = useState<number | null>(null);

  const isTransitioning = transPhase !== "idle";
  const graph = GRAPHS[graphKey];

  // ── Layout ──────────────────────────────────────────────────────────────────
  const computeLayout = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { cx, cy, positions: pos } = computeGraphLayout(el, graph.nodes.length);
    setCenter({ x: cx, y: cy });
    setPositions(pos);
    setFloatOffsets(graph.nodes.map(() => ({ x: 0, y: 0 })));
  }, [graph.nodes]);

  useEffect(() => {
    if (skipLayout.current) {
      skipLayout.current = false;
      // Still update the resize listener for the new graph
      window.addEventListener("resize", computeLayout);
      return () => window.removeEventListener("resize", computeLayout);
    }
    computeLayout();
    setReady(true);
    window.addEventListener("resize", computeLayout);
    return () => window.removeEventListener("resize", computeLayout);
  }, [computeLayout]);

  // ── Float animation ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready || transPhase !== "idle") return;
    const params = graph.nodes.map((_, i) => ({
      xAmp:   4 + (i % 3) * 2,
      yAmp:   5 + ((i + 2) % 3) * 1.8,
      xFreq:  0.0006 + i * 0.00013,
      yFreq:  0.0008 + i * 0.0001,
      xPhase: i * 1.4,
      yPhase: i * 1.1 + 0.5,
    }));
    const WARMUP = 700; // ms to ramp from 0 → full amplitude, eliminates post-expand jerk
    let t0 = -1;
    const tick = (t: number) => {
      if (t0 < 0) t0 = t;
      const elapsed = t - t0;
      const ramp = Math.min(1, elapsed / WARMUP); // 0 → 1 over WARMUP ms
      setFloatOffsets(params.map(p => ({
        x: Math.sin(elapsed * p.xFreq + p.xPhase) * p.xAmp * ramp,
        y: Math.cos(elapsed * p.yFreq + p.yPhase) * p.yAmp * ramp,
      })));
      rafFloat.current = requestAnimationFrame(tick);
    };
    rafFloat.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafFloat.current);
  }, [ready, graphKey, transPhase]);

  // ── Drag ─────────────────────────────────────────────────────────────────────
  const startDrag = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    dragMoved.current = false;
    setDragging({ index, startX: e.clientX, startY: e.clientY,
      origX: positions[index].x, origY: positions[index].y });
  }, [positions]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragging.startX, dy = e.clientY - dragging.startY;
      if (Math.hypot(dx, dy) > 4) dragMoved.current = true;
      setPositions(prev => prev.map((p, i) =>
        i === dragging.index ? { x: dragging.origX + dx, y: dragging.origY + dy } : p));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging]);

  const startTouch = useCallback((e: React.TouchEvent, index: number) => {
    const t = e.touches[0];
    dragMoved.current = false;
    setDragging({ index, startX: t.clientX, startY: t.clientY,
      origX: positions[index].x, origY: positions[index].y });
  }, [positions]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - dragging.startX, dy = t.clientY - dragging.startY;
      if (Math.hypot(dx, dy) > 4) dragMoved.current = true;
      setPositions(prev => prev.map((p, i) =>
        i === dragging.index ? { x: dragging.origX + dx, y: dragging.origY + dy } : p));
    };
    const onUp = () => setDragging(null);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend",  onUp);
    return () => { window.removeEventListener("touchmove", onMove); window.removeEventListener("touchend", onUp); };
  }, [dragging]);

  // ── Rendered position (idle) ───────────────────────────────────────────────
  const getPos = (i: number): Vec2 => {
    const base = positions[i] ?? { x: center.x, y: center.y };
    if (dragging?.index === i) return base;
    const off = floatOffsets[i] ?? { x: 0, y: 0 };
    return { x: base.x + off.x, y: base.y + off.y };
  };

  // ── Per-node animation style ────────────────────────────────────────────────
  const getNodeAnimStyle = (i: number): React.CSSProperties => {
    if (transPhase === "collapsing") {
      const rp = getPos(i);
      const myX = rp.x - center.x;
      const myY = rp.y - center.y;

      // Clicked node: stays fully visible and full-size — glides to center with camera.
      // Non-clicked nodes: snap-fade to 0 immediately (lines also hidden, so no orphaned spokes).
      if (clickedNodeIdx !== null && i === clickedNodeIdx) {
        return { transform: `translate(${myX}px, ${myY}px) scale(1)`, opacity: 1, transition: "none" };
      }

      // Gone instantly — 0.12s so they vanish well before the pan is halfway done
      const cX = clickedNodeIdx !== null ? getPos(clickedNodeIdx).x - center.x : 0;
      const cY = clickedNodeIdx !== null ? getPos(clickedNodeIdx).y - center.y : 0;
      const tx = myX + (cX - myX) * 0.5;
      const ty = myY + (cY - myY) * 0.5;
      return {
        transform:  `translate(${tx}px, ${ty}px) scale(0.2)`,
        opacity:    0,
        transition: "transform 0.12s ease-in, opacity 0.1s ease-in",
      };
    }

    if (transPhase === "expanding") {
      const eo = expandOffsets[i] ?? { x: 0, y: 0 };
      if (!expandStarted) {
        // Pre-stage at FINAL position, scale 0 — so lines draw to the right spot
        // before dots pop in. Dot + label handle their own opacity.
        return {
          transform:  `translate(${eo.x}px, ${eo.y}px) scale(0)`,
          opacity:    1,
          transition: "none",
        };
      }
      // Dot pops in as its line arrives at the endpoint
      const delay = `${dotDelay(i)}s`;
      return {
        transform:  `translate(${eo.x}px, ${eo.y}px) scale(1)`,
        opacity:    1,
        transition: `transform ${DOT_DUR}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}`,
      };
    }

    // Idle — follows float+drag every rAF frame, no CSS transition
    const rp = getPos(i);
    return {
      transform:  `translate(${rp.x - center.x}px, ${rp.y - center.y}px) scale(1)`,
      opacity:    1,
      transition: "none",
    };
  };

  // ── SVG line positions ─────────────────────────────────────────────────────
  const getLinePt = (i: number): Vec2 => {
    if (transPhase === "expanding" && expandOffsets[i]) {
      const eo = expandOffsets[i];
      return expandStarted
        ? { x: center.x + eo.x,       y: center.y + eo.y }
        : { x: center.x + eo.x * 0.5, y: center.y + eo.y * 0.5 };
    }
    return getPos(i);
  };

  // SVG is only hidden during collapse / pre-paint. Line reveal happens via stroke-dashoffset.
  const svgHidden = transPhase === "collapsing" || (transPhase === "expanding" && !expandStarted);

  // Timing constants shared between SVG lines, dots, and labels
  const LINE_STAGGER = 0.05;  // s between each line start
  const LINE_DUR     = 0.28;  // s each line takes to draw
  // dot appears just as its line finishes: i*LINE_STAGGER + LINE_DUR - small overlap
  const dotDelay  = (i: number) => i * LINE_STAGGER + LINE_DUR - 0.04;
  const DOT_DUR   = 0.25; // spring duration
  // text appears after the LAST dot settles
  const textStart = (n: number) => (n - 1) * LINE_STAGGER + LINE_DUR - 0.04 + DOT_DUR + 0.06;

  // ── Camera pan → swap → bloom ──────────────────────────────────────────────
  // The swap fires 80ms BEFORE the pan CSS transition ends. With an ease-out curve
  // the graph has already decelerated to ~95% of its final position by then, so the
  // old nodes vanish while the container is nearly still and the new nodes start
  // blooming during that last 80ms of deceleration — no dead pause between phases.
  const doTransition = useCallback((nextKey: string, nodeOffset?: Vec2, nodeIndex?: number) => {
    if (isTransitioning) return;
    cancelAnimationFrame(rafFloat.current);

    const PAN_TOTAL  = 440;
    const SWAP_AT    = 390; // close to pan end — minimises the snap on reset
    const PAN_EASE   = "cubic-bezier(0.25, 1, 0.5, 1)";

    const swapGraph = (key: string) => {
      // Instantly reset the pan container back to origin (no visible jump because
      // the graph has almost finished moving by SWAP_AT ms into the ease-out curve)
      setPanTransition(false);
      setPanOffset({ x: 0, y: 0 });

      const el = containerRef.current;
      const nextGraph = GRAPHS[key];
      const { cx, cy, positions: newPos } = el
        ? computeGraphLayout(el, nextGraph.nodes.length)
        : { cx: center.x, cy: center.y, positions: [] };

      const expOff = newPos.map(p => ({ x: p.x - cx, y: p.y - cy }));
      skipLayout.current = true;

      setGraphKey(key);
      setCenter({ x: cx, y: cy });
      setPositions(newPos);
      setFloatOffsets(nextGraph.nodes.map(() => ({ x: 0, y: 0 })));
      setExpandOffsets(expOff);
      setExpandStarted(false);
      setTransPhase("expanding");

      // Double-rAF so React paints the pre-stage frame before CSS transitions fire
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setExpandStarted(true);
        // textStart(n) + max label delay (i*0.02 for last i) + text duration (0.22) + buffer (0.08)
        // textStart(n) = (n-1)*0.05 + 0.28 - 0.04 + 0.25 + 0.06 = (n-1)*0.05 + 0.55
        // total ≈ (n-1)*0.05 + 0.55 + (n-1)*0.02 + 0.22 + 0.08 = (n-1)*0.07 + 0.85
        const n = nextGraph.nodes.length;
        const dur = Math.ceil(((n - 1) * 0.07 + 0.85 + 0.1) * 1000);
        setTimeout(() => { setTransPhase("idle"); setReady(true); }, dur);
      }));
    };

    if (nodeOffset) {
      // Forward — pan clicked node to center; other nodes converge toward it
      setEnteredFrom(nodeOffset);
      setClickedNodeIdx(nodeIndex ?? null);
      setPanOffset({ x: -nodeOffset.x, y: -nodeOffset.y });
      setPanTransition(true);
      setTransPhase("collapsing");
      setTimeout(() => swapGraph(nextKey), SWAP_AT);
    } else {
      // Back — no convergence target; nodes just fade out
      setClickedNodeIdx(null);
      setPanOffset({ x: enteredFrom.x, y: enteredFrom.y });
      setPanTransition(true);
      setTransPhase("collapsing");
      setTimeout(() => swapGraph(nextKey), SWAP_AT);
    }

    void PAN_TOTAL;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransitioning, center, enteredFrom]);

  const panTo = useCallback((nextKey: string, nodeIndex: number) => {
    const rp = positions[nodeIndex] ?? { x: center.x, y: center.y };
    const offset = { x: rp.x - center.x, y: rp.y - center.y };
    doTransition(nextKey, offset, nodeIndex);
  }, [doTransition, positions, center]);

  const panBack = useCallback(() => {
    if (!graph.parentGraph) return;
    doTransition(graph.parentGraph);
  }, [doTransition, graph.parentGraph]);

  // ── Node click ─────────────────────────────────────────────────────────────
  const handleNodeClick = (node: NodeDef, index: number) => {
    if (dragMoved.current) return;
    if (node.href)       { router.push(node.href); return; }
    if (node.childGraph) { panTo(node.childGraph, index); return; }
    router.push("/article");
  };

  const handleCenterClick = () => {
    if (isTransitioning) return;
    if (graph.centerAction === "article") {
      setSearchQuery("");
      setSearchSel(0);
      setSpotlight(true);
    } else {
      panBack();
    }
  };

  const closeSpotlight = () => { setSpotlight(false); setSearchQuery(""); setSearchSel(0); };

  const searchResults = searchQuery.trim().length === 0
    ? SEARCH_INDEX.slice(0, 6)
    : SEARCH_INDEX.filter(r =>
        `${r.title} ${r.sub} ${r.category}`.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);

  // Cmd+K / Ctrl+K to open spotlight from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (spotlight) { closeSpotlight(); } else { setSearchQuery(""); setSearchSel(0); setSpotlight(true); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotlight]);

  // Focus input when spotlight opens
  useEffect(() => {
    if (spotlight) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [spotlight]);

  // Global keyboard handler for spotlight
  useEffect(() => {
    if (!spotlight) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeSpotlight(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSearchSel(s => Math.min(s + 1, searchResults.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSearchSel(s => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && searchResults[searchSel]) {
        router.push(searchResults[searchSel].href);
        closeSpotlight();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotlight, searchResults, searchSel]);

  const isRoot = graphKey === "root";

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111111",
      overflow: "hidden", position: "relative", fontFamily: "var(--font-mono)" }}>

      <div style={{ position: "fixed", top: 131, left: 0, right: 0,
        height: 1, background: "#2a2a2a", zIndex: 30 }} />

      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 30, right: 30, height: 131,
        display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20 }}>
        <div>
          <h1 className="title-stroke" style={{ color: "#f0f0f0", WebkitTextStroke: "0" }}>
            Devouring Details
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#727272",
              letterSpacing: "0.04em", textTransform: "uppercase" }}>
              23 January, 2026
            </span>
            <span className="inline-block w-[3px] h-[3px] rounded-full bg-[#727272]" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#727272",
              letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Discovery
            </span>
            <span className="inline-block w-[3px] h-[3px] rounded-full bg-[#727272]" />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
              background: "#1a2e1a", border: "1px solid #2d4a2d",
              borderRadius: 999, padding: "2px 10px 2px 8px" }}>
              <span style={{ position: "relative", width: 6, height: 6, minWidth: 6,
                display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span className="animate-ping" style={{ position: "absolute", width: 6, height: 6,
                  borderRadius: "50%", background: "#4ade80", opacity: 0.5 }} />
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
                  position: "relative", zIndex: 1, flexShrink: 0 }} />
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#4ade80",
                letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Live in production
              </span>
              <span style={{ width: 1, height: 10, background: "#2d4a2d",
                display: "inline-block", margin: "0 2px" }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: "#4ade80",
                letterSpacing: "0.04em", opacity: 0.7 }}>
                163K users (20% adoption)
              </span>
            </span>

            {/* Breadcrumb */}
            {!isRoot && (
              <>
                <span className="inline-block w-[3px] h-[3px] rounded-full bg-[#727272]" />
                <button onClick={panBack} style={{ fontFamily: "var(--font-mono)", fontSize: 11,
                  fontWeight: 700, color: "#727272", letterSpacing: "0.04em",
                  textTransform: "uppercase", background: "none", border: "none",
                  cursor: "pointer", padding: 0 }}>
                  ← map
                </button>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#ff5800",
                  letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  / {graph.centerLabel}
                </span>
              </>
            )}
          </div>
        </div>
        <Link href="/article" style={{ fontFamily: "var(--font-mono)", fontSize: 10,
          fontWeight: 700, color: "#727272", letterSpacing: "0.07em", textTransform: "uppercase",
          textDecoration: "none", padding: "8px 16px", border: "1px solid #2a2a2a", borderRadius: 6 }}>
          Read Article →
        </Link>
      </header>

      {/* Graph canvas */}
      <div ref={containerRef}
        style={{ position: "absolute", left: 0, right: 0, top: 132, bottom: 0 }}>

        {/* Camera pan — translates the whole graph toward the clicked node */}
        <div style={{
          position: "absolute", inset: 0,
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          transition: panTransition ? "transform 0.44s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          willChange: "transform",
        }}>

        {ready && (
          <>
            {/* SVG lines — hidden during collapse/pre-stage; each line draws via stroke-dashoffset */}
            <svg style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              pointerEvents: "none",
              opacity: svgHidden ? 0 : 1,
              transition: "none",
            }}>
              {graph.nodes.map((s, i) => {
                const pt     = getLinePt(i);
                const active = hovered === i || dragging?.index === i;
                // Trim line so it starts at the edge of the center circle and ends
                // at the edge of the satellite dot — both circles then visually cap the line.
                const dx   = pt.x - center.x, dy = pt.y - center.y;
                const dist = Math.hypot(dx, dy) || 1;
                const ux   = dx / dist, uy = dy / dist;
                const CR   = 10; // center circle radius (px)
                const DR   = 5;  // satellite dot radius (px)
                const x1   = center.x + ux * CR;
                const y1   = center.y + uy * CR;
                const x2   = pt.x    - ux * DR;
                const y2   = pt.y    - uy * DR;
                const lineLen = Math.hypot(x2 - x1, y2 - y1);
                // Pre-stage: offset = full length (line invisible, ready to draw).
                // The stroke-dashoffset transition MUST be present during pre-stage so that when
                // expandStarted flips the offset to 0, the browser sees a value change and animates.
                const dashOffset = (transPhase === "expanding" && !expandStarted) ? lineLen : 0;
                const lineTrans  = transPhase === "expanding"
                  ? `stroke-dashoffset ${LINE_DUR}s cubic-bezier(0.4, 0, 0.2, 1) ${i * LINE_STAGGER}s, stroke 0.25s, stroke-width 0.25s`
                  : dragging?.index === i ? "none" : "stroke 0.25s, stroke-width 0.25s";
                return (
                  <line key={s.id}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={active ? "#ff5800" : "#2a2a2a"}
                    strokeWidth={active ? 1.5 : 1}
                    strokeDasharray={lineLen}
                    style={{
                      // strokeDashoffset must be in style (not attribute) so CSS transition fires on it
                      strokeDashoffset: dashOffset,
                      transition: lineTrans,
                    }}
                  />
                );
              })}
            </svg>

            {/* Center node — 0×0 anchor at exact (center.x, center.y) so the circle
                sits precisely where SVG lines radiate from */}
            <div
              onClick={handleCenterClick}
              onMouseEnter={() => setCenterHovered(true)}
              onMouseLeave={() => setCenterHovered(false)}
              style={{
                position: "absolute", left: center.x, top: center.y,
                width: 0, height: 0,
                zIndex: 2, cursor: "pointer",
                opacity: (transPhase === "collapsing") || (transPhase === "expanding" && !expandStarted) ? 0 : 1,
                transform: "translate(-50%, -50%)",
                transition: transPhase === "expanding" && expandStarted
                  ? "opacity 0.18s ease-out"
                  : "none",
              }}
            >
              {/* Hit target — larger than visual circle */}
              <div style={{
                position: "absolute", width: 56, height: 56, borderRadius: "50%",
                transform: "translate(-50%, -50%)", background: "transparent",
              }} />

              {/* Pulse ring — expands on hover */}
              <div style={{
                position: "absolute",
                width: 20, height: 20, borderRadius: "50%",
                transform: `translate(-50%, -50%) scale(${centerHovered ? 2.6 : 1})`,
                background: "transparent",
                border: `1px solid rgba(240,240,240,${centerHovered ? 0.12 : 0})`,
                transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1), border-color 0.3s ease",
                pointerEvents: "none",
              }} />

              {/* Outer glow ring */}
              <div style={{
                position: "absolute",
                width: 20, height: 20, borderRadius: "50%",
                transform: `translate(-50%, -50%) scale(${centerHovered ? 1.8 : 1})`,
                background: "transparent",
                border: `1px solid rgba(240,240,240,${centerHovered ? 0.18 : 0})`,
                transition: "transform 0.3s cubic-bezier(0.34,1.2,0.64,1), border-color 0.25s ease",
                pointerEvents: "none",
              }} />

              {/* Circle */}
              <div style={{
                position: "absolute",
                width: 20, height: 20, borderRadius: "50%",
                transform: `translate(-50%, -50%) scale(${centerHovered ? 1.2 : 1})`,
                background: centerHovered ? "#ffffff" : "#f0f0f0",
                boxShadow: centerHovered
                  ? "0 0 0 8px rgba(240,240,240,0.12), 0 0 20px rgba(240,240,240,0.2)"
                  : "0 0 0 6px rgba(240,240,240,0.07), 0 0 0 14px rgba(240,240,240,0.025)",
                transition: "transform 0.3s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease, background 0.2s ease",
                pointerEvents: "none",
              }} />

              {/* Label */}
              <div style={{
                position: "absolute",
                top: 16,
                transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: centerHovered ? "#ffffff" : "#f0f0f0",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  transition: "color 0.2s ease",
                }}>
                  {graph.centerLabel}
                </span>
                <span style={{
                  fontSize: 9, fontWeight: 500,
                  color: centerHovered ? "#727272" : "#3a3a3a",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  transition: "color 0.25s ease",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {graph.centerSub}
                  {graph.centerAction === "article" && (
                    <kbd style={{
                      fontSize: 8, fontFamily: "var(--font-mono)",
                      background: "transparent",
                      color: centerHovered ? "#555" : "#2a2a2a",
                      border: `1px solid ${centerHovered ? "#3a3a3a" : "#222"}`,
                      borderRadius: 3, padding: "0px 4px",
                      letterSpacing: "0.03em", textTransform: "none",
                      transition: "color 0.25s ease, border-color 0.25s ease",
                    }}>⌘K</kbd>
                  )}
                </span>
              </div>
            </div>

            {/* Satellite nodes — anchored at center, translated by per-node offset */}
            {graph.nodes.map((node, i) => {
              const isDrag  = dragging?.index === i;
              const isHover = hovered === i;
              // Use expand offset for angle during transitions, computed position otherwise
              const angleRad = toRad(-90 + i * (360 / graph.nodes.length));
              const ux = Math.cos(angleRad), uy = Math.sin(angleRad);
              const lx = ux * 14, ly = uy * 14;
              const alignX   = ux > 0.3 ? "0%" : ux < -0.3 ? "-100%" : "-50%";
              const alignY   = uy > 0.3 ? "0%" : uy < -0.3 ? "-100%" : "-50%";
              const textAlign = ux > 0.3 ? "left" : ux < -0.3 ? "right" : "center";
              const hasChild  = !!node.childGraph;
              const animStyle = getNodeAnimStyle(i);

              return (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: center.x, top: center.y,
                    width: 0, height: 0,
                    cursor:      isDrag ? "grabbing" : "grab",
                    zIndex:      isDrag ? 10 : 3,
                    userSelect:  "none",
                    WebkitUserSelect: "none",
                    willChange: "transform, opacity",
                    ...animStyle,
                  }}
                  onMouseDown={(e) => startDrag(e, i)}
                  onTouchStart={(e) => startTouch(e, i)}
                  onMouseEnter={() => { if (!dragging) setHovered(i); }}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleNodeClick(node, i)}
                >
                  {/* Large invisible hit target */}
                  <div style={{
                    position: "absolute", width: 48, height: 48, borderRadius: "50%",
                    transform: "translate(-50%, -50%)", background: "transparent",
                  }} />

                  {/* Dot — stage 2: appears as node scales in */}
                  <div style={{
                    position: "absolute", width: 10, height: 10, borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    background: isDrag || isHover ? "#ff5800" : hasChild ? "#555" : "#3a3a3a",
                    scale: isDrag || isHover ? "1.8" : "1",
                    opacity: transPhase === "expanding" && !expandStarted ? 0 : 1,
                    transition: transPhase === "expanding" && expandStarted
                      ? `opacity 0.15s ease-out ${dotDelay(i)}s`  // appears as line arrives
                      : isDrag ? "none" : "background 0.2s, scale 0.2s",
                    boxShadow: isDrag  ? "0 0 18px rgba(255,88,0,0.8)"
                             : isHover ? "0 0 10px rgba(255,88,0,0.45)" : "none",
                    pointerEvents: "none",
                  }} />

                  {/* Ring indicator for nodes with children */}
                  {hasChild && !isDrag && !isHover && (
                    <div style={{
                      position: "absolute", transform: "translate(-50%, -50%)",
                      width: 16, height: 16, borderRadius: "50%",
                      border: "1px solid #2a2a2a", pointerEvents: "none",
                    }} />
                  )}

                  {/* Label — fades in AFTER scale completes so text appears on a full-size node */}
                  <div style={{
                    position: "absolute",
                    transform: `translate(calc(${lx}px + ${alignX}), calc(${ly}px + ${alignY}))`,
                    // Text appears after ALL dots have settled (uniform delay based on node count)
                    opacity: transPhase === "expanding" && !expandStarted ? 0 : 1,
                    transition: transPhase === "expanding" && expandStarted
                      ? `opacity 0.22s ease-out ${textStart(graph.nodes.length) + i * 0.02}s`
                      : "none",
                    display: "flex", flexDirection: "column", gap: 3,
                    textAlign: textAlign as React.CSSProperties["textAlign"],
                    pointerEvents: "none",
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      color: isDrag || isHover ? "#f0f0f0" : "#727272",
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      whiteSpace: "nowrap", transition: "color 0.2s", lineHeight: 1.3,
                    }}>
                      {node.label}
                    </span>
                    <span style={{
                      fontSize: 9, fontWeight: 500,
                      color: isDrag || isHover ? "#555" : "#2e2e2e",
                      letterSpacing: "0.04em", textTransform: "uppercase",
                      whiteSpace: "nowrap", transition: "color 0.2s",
                    }}>
                      {node.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
        </div>{/* end pan layer */}
      </div>

      {/* ── Spotlight search overlay ────────────────────────────────────────── */}
      {spotlight && (
        <div
          onClick={closeSpotlight}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            paddingTop: "18vh",
            animation: "spotlightIn 0.18s cubic-bezier(0.4,0,0.2,1) both",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "min(580px, 90vw)",
              background: "#161616",
              border: "1px solid #2a2a2a",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              animation: "spotlightPanelIn 0.2s cubic-bezier(0.34,1.2,0.64,1) both",
            }}
          >
            {/* Search input row */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "16px 20px",
              borderBottom: searchResults.length > 0 ? "1px solid #1f1f1f" : "none",
            }}>
              {/* Search icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                <circle cx="6.5" cy="6.5" r="4.5" stroke="#f0f0f0" strokeWidth="1.4"/>
                <path d="M10 10L14 14" stroke="#f0f0f0" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSearchSel(0); }}
                placeholder="Search article, sections, pages…"
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  color: "#f0f0f0", fontFamily: "var(--font-mono)",
                  fontSize: 13, fontWeight: 500, letterSpacing: "0.02em",
                }}
              />
              <kbd style={{
                fontSize: 10, color: "#444", fontFamily: "var(--font-mono)",
                background: "#1f1f1f", border: "1px solid #2a2a2a",
                borderRadius: 4, padding: "2px 7px", flexShrink: 0,
              }}>ESC</kbd>
            </div>

            {/* Results */}
            {searchResults.length > 0 && (
              <div style={{ padding: "6px 0 8px" }}>
                {searchResults.map((r, i) => {
                  const isSelected = i === searchSel;
                  return (
                    <div
                      key={r.id}
                      onMouseEnter={() => setSearchSel(i)}
                      onClick={() => { router.push(r.href); closeSpotlight(); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "9px 20px",
                        cursor: "pointer",
                        background: isSelected ? "#1f1f1f" : "transparent",
                        transition: "background 0.1s",
                      }}
                    >
                      {/* Category badge */}
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase", fontFamily: "var(--font-mono)",
                        color: r.category === "Article" ? "#ff5800" : "#4a9eff",
                        background: r.category === "Article" ? "rgba(255,88,0,0.08)" : "rgba(74,158,255,0.08)",
                        border: `1px solid ${r.category === "Article" ? "rgba(255,88,0,0.2)" : "rgba(74,158,255,0.2)"}`,
                        borderRadius: 4, padding: "2px 7px", flexShrink: 0, minWidth: 48, textAlign: "center",
                      }}>
                        {r.category}
                      </span>
                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 12, fontWeight: 700, color: isSelected ? "#f0f0f0" : "#a0a0a0",
                          fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
                          textTransform: "uppercase", lineHeight: 1.3,
                        }}>{r.title}</div>
                        <div style={{
                          fontSize: 10, color: "#555", fontFamily: "var(--font-mono)",
                          letterSpacing: "0.03em", marginTop: 2, lineHeight: 1.3,
                        }}>{r.sub}</div>
                      </div>
                      {/* Arrow hint on selected */}
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="#f0f0f0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {searchResults.length === 0 && (
              <div style={{
                padding: "28px 20px", textAlign: "center",
                color: "#444", fontFamily: "var(--font-mono)",
                fontSize: 11, letterSpacing: "0.04em",
              }}>
                No results for &ldquo;{searchQuery}&rdquo;
              </div>
            )}

            {/* Footer hint */}
            <div style={{
              borderTop: "1px solid #1a1a1a",
              padding: "8px 20px",
              display: "flex", gap: 16,
            }}>
              {[["↵", "Open"], ["↑↓", "Navigate"], ["esc", "Close"]].map(([key, label]) => (
                <span key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <kbd style={{
                    fontSize: 9, color: "#444", fontFamily: "var(--font-mono)",
                    background: "#1f1f1f", border: "1px solid #2a2a2a",
                    borderRadius: 3, padding: "1px 5px",
                  }}>{key}</kbd>
                  <span style={{ fontSize: 10, color: "#333", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spotlightIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes spotlightPanelIn {
          from { opacity: 0; transform: scale(0.96) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>

    </div>
  );
}
