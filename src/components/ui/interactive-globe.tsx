"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useCallback } from "react";

interface GlobeProps {
  className?: string;
  size?: number;
  dotColor?: string;
  arcColor?: string;
  markerColor?: string;
  autoRotateSpeed?: number;
  connections?: { from: [number, number]; to: [number, number] }[];
  markers?: { lat: number; lng: number; label?: string }[];
}

const DEFAULT_MARKERS = [
  // India — primary hub
  { lat: 28.61, lng: 77.21, label: "Delhi" },
  { lat: 19.08, lng: 72.88, label: "Mumbai" },
  { lat: 12.97, lng: 77.59, label: "Bangalore" },
  { lat: 13.08, lng: 80.27, label: "Chennai" },
  { lat: 17.38, lng: 78.49, label: "Hyderabad" },
  { lat: 22.57, lng: 88.36, label: "Kolkata" },
  { lat: 23.02, lng: 72.57, label: "Ahmedabad" },
  // Asia-Pacific
  { lat: 35.68, lng: 139.69, label: "Tokyo" },
  { lat: 37.57, lng: 126.98, label: "Seoul" },
  { lat: 39.90, lng: 116.40, label: "Beijing" },
  { lat: 31.23, lng: 121.47, label: "Shanghai" },
  { lat: 22.32, lng: 114.17, label: "Hong Kong" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 13.76, lng: 100.50, label: "Bangkok" },
  { lat: -6.21, lng: 106.85, label: "Jakarta" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
  { lat: -36.85, lng: 174.76, label: "Auckland" },
  // Middle East
  { lat: 25.20, lng: 55.27, label: "Dubai" },
  { lat: 24.71, lng: 46.68, label: "Riyadh" },
  { lat: 41.01, lng: 28.98, label: "Istanbul" },
  // Europe
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 48.86, lng: 2.35, label: "Paris" },
  { lat: 52.52, lng: 13.41, label: "Berlin" },
  { lat: 55.76, lng: 37.62, label: "Moscow" },
  { lat: 40.42, lng: -3.70, label: "Madrid" },
  { lat: 41.90, lng: 12.50, label: "Rome" },
  { lat: 59.33, lng: 18.07, label: "Stockholm" },
  // Americas
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: 37.78, lng: -122.42, label: "San Francisco" },
  { lat: 34.05, lng: -118.24, label: "Los Angeles" },
  { lat: 41.88, lng: -87.63, label: "Chicago" },
  { lat: 25.76, lng: -80.19, label: "Miami" },
  { lat: 43.65, lng: -79.38, label: "Toronto" },
  { lat: 19.43, lng: -99.13, label: "Mexico City" },
  { lat: -23.55, lng: -46.63, label: "São Paulo" },
  { lat: -34.60, lng: -58.38, label: "Buenos Aires" },
  // Africa
  { lat: 30.04, lng: 31.24, label: "Cairo" },
  { lat: -1.29, lng: 36.82, label: "Nairobi" },
  { lat: 6.52, lng: 3.38, label: "Lagos" },
  { lat: -33.92, lng: 18.42, label: "Cape Town" },
];

const DEFAULT_CONNECTIONS: { from: [number, number]; to: [number, number] }[] =
  [
    // ── India ─────────────────────────────────────────
    { from: [17.38, 78.49], to: [28.61, 77.21] },       // Hyderabad → Delhi
    { from: [17.38, 78.49], to: [19.08, 72.88] },       // Hyderabad → Mumbai
    { from: [17.38, 78.49], to: [12.97, 77.59] },       // Hyderabad → Bangalore
    { from: [17.38, 78.49], to: [13.08, 80.27] },       // Hyderabad → Chennai
    { from: [17.38, 78.49], to: [22.57, 88.36] },       // Hyderabad → Kolkata
    { from: [17.38, 78.49], to: [23.02, 72.57] },       // Hyderabad → Ahmedabad
    // ── Asia-Pacific ──────────────────────────────────
    { from: [17.38, 78.49], to: [35.68, 139.69] },      // Hyderabad → Tokyo
    { from: [17.38, 78.49], to: [37.57, 126.98] },      // Hyderabad → Seoul
    { from: [17.38, 78.49], to: [39.90, 116.40] },      // Hyderabad → Beijing
    { from: [17.38, 78.49], to: [31.23, 121.47] },      // Hyderabad → Shanghai
    { from: [17.38, 78.49], to: [22.32, 114.17] },      // Hyderabad → Hong Kong
    { from: [17.38, 78.49], to: [1.35, 103.82] },       // Hyderabad → Singapore
    { from: [17.38, 78.49], to: [13.76, 100.50] },      // Hyderabad → Bangkok
    { from: [17.38, 78.49], to: [-6.21, 106.85] },      // Hyderabad → Jakarta
    { from: [17.38, 78.49], to: [-33.87, 151.21] },     // Hyderabad → Sydney
    { from: [17.38, 78.49], to: [-36.85, 174.76] },     // Hyderabad → Auckland
    // ── Middle East ───────────────────────────────────
    { from: [17.38, 78.49], to: [25.20, 55.27] },       // Hyderabad → Dubai
    { from: [17.38, 78.49], to: [24.71, 46.68] },       // Hyderabad → Riyadh
    { from: [17.38, 78.49], to: [41.01, 28.98] },       // Hyderabad → Istanbul
    // ── Europe ────────────────────────────────────────
    { from: [17.38, 78.49], to: [51.51, -0.13] },       // Hyderabad → London
    { from: [17.38, 78.49], to: [48.86, 2.35] },        // Hyderabad → Paris
    { from: [17.38, 78.49], to: [52.52, 13.41] },       // Hyderabad → Berlin
    { from: [17.38, 78.49], to: [55.76, 37.62] },       // Hyderabad → Moscow
    { from: [17.38, 78.49], to: [40.42, -3.70] },       // Hyderabad → Madrid
    { from: [17.38, 78.49], to: [41.90, 12.50] },       // Hyderabad → Rome
    { from: [17.38, 78.49], to: [59.33, 18.07] },       // Hyderabad → Stockholm
    // ── Americas ──────────────────────────────────────
    { from: [17.38, 78.49], to: [40.71, -74.01] },      // Hyderabad → New York
    { from: [17.38, 78.49], to: [37.78, -122.42] },     // Hyderabad → San Francisco
    { from: [17.38, 78.49], to: [34.05, -118.24] },     // Hyderabad → Los Angeles
    { from: [17.38, 78.49], to: [41.88, -87.63] },      // Hyderabad → Chicago
    { from: [17.38, 78.49], to: [25.76, -80.19] },      // Hyderabad → Miami
    { from: [17.38, 78.49], to: [43.65, -79.38] },      // Hyderabad → Toronto
    { from: [17.38, 78.49], to: [19.43, -99.13] },      // Hyderabad → Mexico City
    { from: [17.38, 78.49], to: [-23.55, -46.63] },     // Hyderabad → São Paulo
    { from: [17.38, 78.49], to: [-34.60, -58.38] },     // Hyderabad → Buenos Aires
    // ── Africa ────────────────────────────────────────
    { from: [17.38, 78.49], to: [30.04, 31.24] },       // Hyderabad → Cairo
    { from: [17.38, 78.49], to: [-1.29, 36.82] },       // Hyderabad → Nairobi
    { from: [17.38, 78.49], to: [6.52, 3.38] },         // Hyderabad → Lagos
    { from: [17.38, 78.49], to: [-33.92, 18.42] },      // Hyderabad → Cape Town
  ];

// Globe oscillation constants — keeps Hyderabad always visible
const INITIAL_ROT_Y = 0.23;   // centred on India (~lng 77°)
const HALF_SWING = Math.PI / 3; // ±60° → 120° total range

function latLngToXYZ(
  lat: number,
  lng: number,
  radius: number
): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  fov: number
): [number, number, number] {
  const scale = fov / (fov + z);
  return [-x * scale + cx, -y * scale + cy, z];
}

// ── TopoJSON decoder & land-detection helpers ─────────────────────────────
function decodeTopology(topology: any): [number, number][][] {
  const { arcs: rawArcs, transform } = topology;
  const { scale: s, translate: t } = transform;
  const decoded: [number, number][][] = rawArcs.map((arc: number[][]) => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]: number[]) => {
      x += dx; y += dy;
      return [x * s[0] + t[0], y * s[1] + t[1]] as [number, number];
    });
  });
  function resolveRing(indices: number[]): [number, number][] {
    const coords: [number, number][] = [];
    for (const idx of indices) {
      const arc = idx >= 0 ? decoded[idx] : [...decoded[~idx]].reverse();
      for (let i = coords.length > 0 ? 1 : 0; i < arc.length; i++) coords.push(arc[i]);
    }
    return coords;
  }
  const rings: [number, number][][] = [];
  function extract(geom: any) {
    if (geom.type === 'GeometryCollection') geom.geometries.forEach(extract);
    else if (geom.type === 'Polygon') geom.arcs.forEach((r: number[]) => rings.push(resolveRing(r)));
    else if (geom.type === 'MultiPolygon') geom.arcs.forEach((p: number[][]) => p.forEach((r: number[]) => rings.push(resolveRing(r))));
  }
  extract(topology.objects.land);
  return rings;
}

// ── Parse India's full-boundary GeoJSON (GoI claim, incl. J&K) ──────────
function parseIndiaGeoJSON(geo: any): [number, number][][] {
  const rings: [number, number][][] = [];
  function addGeometry(geom: any) {
    if (!geom) return;
    if (geom.type === 'Polygon') {
      geom.coordinates.forEach((ring: [number, number][]) => rings.push(ring));
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach((poly: [number, number][][]) =>
        poly.forEach((ring: [number, number][]) => rings.push(ring))
      );
    }
  }
  if (geo.type === 'FeatureCollection') {
    geo.features.forEach((f: any) => addGeometry(f.geometry));
  } else if (geo.type === 'Feature') {
    addGeometry(geo.geometry);
  } else if (geo.type === 'GeometryCollection') {
    geo.geometries.forEach(addGeometry);
  } else {
    addGeometry(geo);
  }
  return rings;
}

function pointInRing(lat: number, lng: number, ring: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]; // [lng, lat]
    const [xj, yj] = ring[j];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function checkLand(lat: number, lng: number, polygons: [number, number][][]): boolean {
  for (const ring of polygons) if (pointInRing(lat, lng, ring)) return true;
  return false;
}

function unitXyzToLatLng(x: number, y: number, z: number): [number, number] {
  const lat = 90 - Math.acos(Math.max(-1, Math.min(1, y))) * (180 / Math.PI);
  const lng = Math.atan2(z, -x) * (180 / Math.PI) - 180;
  return [lat, ((lng % 360) + 540) % 360 - 180];
}

export function InteractiveGlobe({
  className,
  size = 600,
  dotColor = "rgba(100, 180, 255, ALPHA)",
  arcColor = "rgba(100, 180, 255, 0.5)",
  markerColor = "rgba(100, 220, 255, 1)",
  autoRotateSpeed = 0.002,
  connections = DEFAULT_CONNECTIONS,
  markers = DEFAULT_MARKERS,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0.23);  // centered on India (~lng 77°)
  const rotXRef = useRef(-0.15);  // gentle downward tilt, north pole up
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startRotY: number;
    startRotX: number;
  }>({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Generate globe dots + fetch real-world land data
  const dotsRef = useRef<[number, number, number][]>([]);
  const landMaskRef = useRef<boolean[]>([]);
  const coastlinesRef = useRef<[number, number][][]>([]);
  const indiaRingsRef = useRef<[number, number][][]>([]);

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = 8000;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);
      dots.push([x, y, z]);
    }
    dotsRef.current = dots;

    // Fetch real-world land polygons
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json')
      .then(r => r.json())
      .then(topo => {
        const rings = decodeTopology(topo);
        coastlinesRef.current = rings;
        const mask = dots.map(([x, y, z]) => {
          const [lat, lng] = unitXyzToLatLng(x, y, z);
          return checkLand(lat, lng, rings);
        });
        landMaskRef.current = mask;
      })
      .catch(() => { /* globe renders without land classification */ });

    // Fetch India's full boundary (Government of India claim, incl. J&K)
    fetch('/india-full.geojson')
      .then(r => r.json())
      .then(geo => {
        indiaRingsRef.current = parseIndiaGeoJSON(geo);
      })
      .catch(() => { /* India outline won't render — non-critical */ });
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip expensive draw when globe is off-screen
    if (!isVisibleRef.current) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || size;
    const h = canvas.clientHeight || size;
    
    // Skip if canvas not properly sized (prevents issues on mobile load)
    if (w === 0 || h === 0) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }
    
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;
    const fov = 600;

    if (!dragRef.current.active) {
      rotYRef.current = INITIAL_ROT_Y + Math.sin(timeRef.current * 0.30) * HALF_SWING;
    }
    timeRef.current += 0.015;
    const time = timeRef.current;
    const ry = rotYRef.current;
    const rx = rotXRef.current;

    ctx.clearRect(0, 0, w, h);

    // ── 1. Outer atmosphere halo ──────────────────────────────────────────────
    const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.22);
    haloGrad.addColorStop(0, "rgba(79, 164, 196, 0.18)");
    haloGrad.addColorStop(0.5, "rgba(39, 81, 169, 0.06)");
    haloGrad.addColorStop(1, "rgba(39, 81, 169, 0)");
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.22, 0, Math.PI * 2);
    ctx.fill();

    // ── 2. Filled sphere with directional shading ─────────────────────────────
    const sphereGrad = ctx.createRadialGradient(
      cx - radius * 0.32, cy - radius * 0.32, radius * 0.02,
      cx + radius * 0.1, cy + radius * 0.1, radius * 1.1
    );
    sphereGrad.addColorStop(0, "rgba(22, 55, 110, 0.95)");
    sphereGrad.addColorStop(0.45, "rgba(8, 22, 60, 0.98)");
    sphereGrad.addColorStop(1, "rgba(2, 6, 24, 1)");
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGrad;
    ctx.fill();
    ctx.restore();

    // ── 3. Graticule (lat/lng grid lines) ─────────────────────────────────────
    ctx.strokeStyle = "rgba(79, 164, 196, 0.07)";
    ctx.lineWidth = 0.5;
    // Latitude rings every 30°
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let firstPt = true;
      for (let lng = -180; lng <= 180; lng += 3) {
        let [gx, gy, gz] = latLngToXYZ(lat, lng, radius);
        [gx, gy, gz] = rotateX(gx, gy, gz, rx);
        [gx, gy, gz] = rotateY(gx, gy, gz, ry);
        if (gz > 0) { firstPt = true; continue; }
        const [gsx, gsy] = project(gx, gy, gz, cx, cy, fov);
        if (firstPt) { ctx.moveTo(gsx, gsy); firstPt = false; }
        else ctx.lineTo(gsx, gsy);
      }
      ctx.stroke();
    }
    // Longitude lines every 30°
    for (let lng = 0; lng < 360; lng += 30) {
      ctx.beginPath();
      let firstPt = true;
      for (let lat = -88; lat <= 88; lat += 3) {
        let [gx, gy, gz] = latLngToXYZ(lat, lng, radius);
        [gx, gy, gz] = rotateX(gx, gy, gz, rx);
        [gx, gy, gz] = rotateY(gx, gy, gz, ry);
        if (gz > 0) { firstPt = true; continue; }
        const [gsx, gsy] = project(gx, gy, gz, cx, cy, fov);
        if (firstPt) { ctx.moveTo(gsx, gsy); firstPt = false; }
        else ctx.lineTo(gsx, gsy);
      }
      ctx.stroke();
    }

    // ── 3.5 Real-world coastline outlines ─────────────────────────────────────
    const coastRings = coastlinesRef.current;
    if (coastRings.length > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = "rgba(79, 164, 196, 0.35)";
      ctx.lineWidth = 0.8;
      for (const ring of coastRings) {
        ctx.beginPath();
        let first = true;
        for (const [lng, lat] of ring) {
          let [gx, gy, gz] = latLngToXYZ(lat, lng, radius);
          [gx, gy, gz] = rotateX(gx, gy, gz, rx);
          [gx, gy, gz] = rotateY(gx, gy, gz, ry);
          if (gz > 0) { first = true; continue; }
          const [gsx, gsy] = project(gx, gy, gz, cx, cy, fov);
          if (first) { ctx.moveTo(gsx, gsy); first = false; }
          else ctx.lineTo(gsx, gsy);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // ── 3.6 India outline highlight ─────────────────────────────────────────
    const indiaRings = indiaRingsRef.current;
    if (indiaRings.length > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      const indiaPulse = 0.85 + Math.sin(time * 1.5) * 0.15;

      // Pass 1 — wide outer glow
      ctx.shadowColor = `rgba(255, 190, 50, 1)`;
      ctx.shadowBlur = 28;
      ctx.strokeStyle = `rgba(255, 190, 50, ${indiaPulse.toFixed(2)})`;
      ctx.lineWidth = 3.5;
      for (const ring of indiaRings) {
        ctx.beginPath();
        let first = true;
        for (const [lng, lat] of ring) {
          let [gx, gy, gz] = latLngToXYZ(lat, lng, radius);
          [gx, gy, gz] = rotateX(gx, gy, gz, rx);
          [gx, gy, gz] = rotateY(gx, gy, gz, ry);
          if (gz > 0) { first = true; continue; }
          const [gsx, gsy] = project(gx, gy, gz, cx, cy, fov);
          if (first) { ctx.moveTo(gsx, gsy); first = false; }
          else ctx.lineTo(gsx, gsy);
        }
        ctx.stroke();
      }

      // Pass 2 — medium glow pass
      ctx.shadowColor = `rgba(255, 220, 100, 1)`;
      ctx.shadowBlur = 14;
      ctx.strokeStyle = `rgba(255, 220, 100, 1)`;
      ctx.lineWidth = 2.0;
      for (const ring of indiaRings) {
        ctx.beginPath();
        let first = true;
        for (const [lng, lat] of ring) {
          let [gx, gy, gz] = latLngToXYZ(lat, lng, radius);
          [gx, gy, gz] = rotateX(gx, gy, gz, rx);
          [gx, gy, gz] = rotateY(gx, gy, gz, ry);
          if (gz > 0) { first = true; continue; }
          const [gsx, gsy] = project(gx, gy, gz, cx, cy, fov);
          if (first) { ctx.moveTo(gsx, gsy); first = false; }
          else ctx.lineTo(gsx, gsy);
        }
        ctx.stroke();
      }

      // Pass 3 — crisp bright core line, no shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(255, 245, 180, 1)`;
      ctx.lineWidth = 1.0;
      for (const ring of indiaRings) {
        ctx.beginPath();
        let first = true;
        for (const [lng, lat] of ring) {
          let [gx, gy, gz] = latLngToXYZ(lat, lng, radius);
          [gx, gy, gz] = rotateX(gx, gy, gz, rx);
          [gx, gy, gz] = rotateY(gx, gy, gz, ry);
          if (gz > 0) { first = true; continue; }
          const [gsx, gsy] = project(gx, gy, gz, cx, cy, fov);
          if (first) { ctx.moveTo(gsx, gsy); first = false; }
          else ctx.lineTo(gsx, gsy);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // ── 4. Surface dots (land-aware) ──────────────────────────────────────────
    const dots = dotsRef.current;
    const mask = landMaskRef.current;
    const hasLand = mask.length === dots.length;
    for (let i = 0; i < dots.length; i++) {
      let [x, y, z] = dots[i];
      x *= radius; y *= radius; z *= radius;
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > 0) continue;
      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depth = Math.max(0, 1 - (z + radius) / (2 * radius));
      if (hasLand) {
        const isLand = mask[i];
        if (isLand) {
          const alpha = 0.12 + depth * 0.6;
          const dotSize = 0.8 + depth * 1.0;
          ctx.beginPath();
          ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79, 164, 196, ${alpha.toFixed(2)})`;
          ctx.fill();
        } else {
          const alpha = 0.01 + depth * 0.04;
          const dotSize = 0.4 + depth * 0.2;
          ctx.beginPath();
          ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(20, 60, 120, ${alpha.toFixed(2)})`;
          ctx.fill();
        }
      } else {
        // Fallback before data loads
        const alpha = 0.08 + depth * 0.55;
        const dotSize = 0.8 + depth * 1.0;
        ctx.beginPath();
        ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = dotColor.replace("ALPHA", alpha.toFixed(2));
        ctx.fill();
      }
    }

    // ── 5. Glowing arcs ───────────────────────────────────────────────────────
    for (const conn of connections) {
      const [lat1, lng1] = conn.from;
      const [lat2, lng2] = conn.to;

      let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
      let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);
      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);
      if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
      const arcHeight = radius * 1.28;
      const [scx, scy] = project(
        (midX / midLen) * arcHeight,
        (midY / midLen) * arcHeight,
        (midZ / midLen) * arcHeight,
        cx, cy, fov
      );

      // Glow pass
      ctx.save();
      ctx.shadowColor = arcColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = arcColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Sharp pass on top
      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = arcColor.replace("0.5", "0.85");
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Traveling dot
      const t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
      const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
      const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;
      ctx.save();
      ctx.shadowColor = markerColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = markerColor;
      ctx.fill();
      ctx.restore();
    }

    // ── 6. City markers ───────────────────────────────────────────────────────
    for (const marker of markers) {
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > radius * 0.1) continue;
      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;

      // Highlight Hyderabad with a contrasting gold/amber colour
      const isHighlight = marker.label === "Hyderabad";
      const ringColor = isHighlight ? `rgba(255, 180, 50, ` : `rgba(79, 164, 196, `;
      const coreColor = isHighlight ? "rgba(255, 200, 80, 1)" : "rgba(160, 220, 255, 1)";
      const glowColor = isHighlight ? "rgba(255, 180, 50, 0.9)" : "rgba(79, 164, 196, 0.9)";
      const labelColor = isHighlight ? "rgba(255, 200, 100, 0.9)" : "rgba(160, 210, 255, 0.65)";

      // Outer pulse ring
      ctx.beginPath();
      ctx.arc(sx, sy, isHighlight ? 12 + pulse * 7 : 9 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor + `${(0.08 + pulse * 0.07).toFixed(2)})`;
      ctx.lineWidth = isHighlight ? 1.5 : 1;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(sx, sy, isHighlight ? 6 + pulse * 3 : 4.5 + pulse * 2.5, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor + `${(0.25 + pulse * 0.2).toFixed(2)})`;
      ctx.lineWidth = isHighlight ? 1.5 : 1;
      ctx.stroke();

      // Core dot with glow
      ctx.save();
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = isHighlight ? 14 : 8;
      ctx.beginPath();
      ctx.arc(sx, sy, isHighlight ? 4 : 2.8, 0, Math.PI * 2);
      ctx.fillStyle = coreColor;
      ctx.fill();
      ctx.restore();

      if (marker.label) {
        ctx.font = isHighlight ? "bold 10px system-ui, sans-serif" : "9px system-ui, sans-serif";
        ctx.fillStyle = labelColor;
        ctx.fillText(marker.label, sx + 7, sy + 3);
      }
    }

    // ── 7. Specular highlight ─────────────────────────────────────────────────
    const specGrad = ctx.createRadialGradient(
      cx - radius * 0.28, cy - radius * 0.28, 0,
      cx - radius * 0.15, cy - radius * 0.15, radius * 0.65
    );
    specGrad.addColorStop(0, "rgba(180, 220, 255, 0.07)");
    specGrad.addColorStop(1, "rgba(180, 220, 255, 0)");
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = specGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    ctx.restore();

    // ── 8. Rim edge glow ──────────────────────────────────────────────────────
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(79, 164, 196, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    animRef.current = requestAnimationFrame(draw);
  }, [dotColor, arcColor, markerColor, autoRotateSpeed, connections, markers]);

  // Pause rAF when globe is scrolled out of view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { rootMargin: '200px' }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Ensure animation starts immediately, even on mobile
    const startAnimation = () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
      animRef.current = requestAnimationFrame(draw);
    };
    
    startAnimation();
    
    // Restart animation on visibility change (mobile browsers often pause RAF)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !animRef.current) {
        startAnimation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [draw]);

  // Mouse drag handlers
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startRotY: rotYRef.current,
        startRotX: rotXRef.current,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const newRotY = dragRef.current.startRotY - dx * 0.005;
      // Clamp so Hyderabad never rotates out of the visible hemisphere
      rotYRef.current = Math.max(INITIAL_ROT_Y - HALF_SWING, Math.min(INITIAL_ROT_Y + HALF_SWING, newRotY));
    },
    []
  );

  const onPointerUp = useCallback(() => {
    // Re-sync oscillation phase to current drag position so resume is seamless (no snap)
    const normalised = (rotYRef.current - INITIAL_ROT_Y) / HALF_SWING;
    const clamped = Math.max(-1, Math.min(1, normalised));
    timeRef.current = Math.asin(clamped) / 0.30;
    dragRef.current.active = false;
    
    // Ensure animation continues on mobile after touch release
    if (!animRef.current) {
      animRef.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full cursor-grab active:cursor-grabbing", className)}
      style={{ width: size, height: size, maxWidth: '100%', maxHeight: '100%', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}
