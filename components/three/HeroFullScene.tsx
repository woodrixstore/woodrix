"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Full-viewport WebGL hero scene.
 * - Ivory environment, ACES tone mapping, soft shadows, IBL via RoomEnvironment
 * - Multiple wooden objects (tray / shelf / footrest) at varied Z depths
 *   producing real mouse parallax
 * - Slow vertical drift; on scroll the entire group rises gently
 * - Soft warm dust motes
 */
export default function HeroFullScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FAF7F2");

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // PBR IBL
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // ---------- Procedural wood texture ----------
    const makeWoodTexture = (variant: "walnut" | "oak" | "teak") => {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 1024;
      const ctx = c.getContext("2d")!;
      const palettes: Record<string, string[]> = {
        walnut: ["#3a2418", "#5a3220", "#7a4a2c", "#9a6038", "#5a3220"],
        oak:    ["#7a5230", "#9a6e44", "#b78652", "#9a6e44", "#7a5230"],
        teak:   ["#5a3a22", "#7a5230", "#9c6e3e", "#b8884e", "#7a5230"],
      };
      const p = palettes[variant];
      const g = ctx.createLinearGradient(0, 0, 1024, 0);
      g.addColorStop(0, p[0]); g.addColorStop(0.35, p[1]);
      g.addColorStop(0.55, p[2]); g.addColorStop(0.75, p[3]); g.addColorStop(1, p[4]);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1024, 1024);
      ctx.globalAlpha = 0.18;
      for (let i = 0; i < 220; i++) {
        ctx.strokeStyle = i % 2 === 0 ? "#1f1208" : "#d4b896";
        ctx.lineWidth = Math.random() * 1.4 + 0.25;
        ctx.beginPath();
        const y = Math.random() * 1024;
        ctx.moveTo(0, y);
        for (let x = 0; x < 1024; x += 8) {
          ctx.lineTo(x, y + Math.sin(x * 0.012 + i) * 4 + (Math.random() - 0.5) * 3);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 0.35;
      for (let k = 0; k < 4; k++) {
        const cx = Math.random() * 1024;
        const cy = Math.random() * 1024;
        const r = 14 + Math.random() * 22;
        const knot = ctx.createRadialGradient(cx, cy, 1, cx, cy, r);
        knot.addColorStop(0, "#1c0e06");
        knot.addColorStop(0.6, "#3a2014");
        knot.addColorStop(1, "rgba(58,32,20,0)");
        ctx.fillStyle = knot;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      return t;
    };

    const texWalnut = makeWoodTexture("walnut");
    const texOak = makeWoodTexture("oak");
    const texTeak = makeWoodTexture("teak");

    const matWalnut = new THREE.MeshPhysicalMaterial({
      map: texWalnut, roughness: 0.45, metalness: 0,
      clearcoat: 0.3, clearcoatRoughness: 0.6,
      sheen: 0.25, sheenColor: new THREE.Color("#a0622a"),
      envMapIntensity: 1.0,
    });
    const matOak = new THREE.MeshPhysicalMaterial({
      map: texOak, roughness: 0.55, metalness: 0,
      clearcoat: 0.22, clearcoatRoughness: 0.7, envMapIntensity: 0.95,
    });
    const matTeak = new THREE.MeshPhysicalMaterial({
      map: texTeak, roughness: 0.5, metalness: 0,
      clearcoat: 0.25, clearcoatRoughness: 0.65, envMapIntensity: 1.0,
    });

    // Container group for scroll-based vertical drift
    const group = new THREE.Group();
    scene.add(group);

    // ---------- Wooden tray (CylinderGeometry, very flat) at mid Z ----------
    const tray = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 0.16, 96),
      matWalnut
    );
    tray.position.set(2.2, -0.4, -0.5);
    tray.rotation.set(0.45, 0.2, 0.1);
    tray.castShadow = true; tray.receiveShadow = true;
    group.add(tray);

    // ---------- Shelf plank (BoxGeometry) at far Z ----------
    const shelf = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.14, 0.85),
      matOak
    );
    shelf.position.set(-2.4, 1.2, -2.8);
    shelf.rotation.set(0.1, 0.4, -0.05);
    shelf.castShadow = true; shelf.receiveShadow = true;
    group.add(shelf);

    // ---------- Footrest stool (box + 4 cylinder legs) at near Z ----------
    const stool = new THREE.Group();
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.16, 0.9), matTeak);
    top.position.y = 0.5;
    top.castShadow = true; top.receiveShadow = true;
    stool.add(top);
    const legGeo = new THREE.CylinderGeometry(0.07, 0.05, 0.55, 16);
    const legPositions: [number, number, number][] = [
      [0.55, 0.18, 0.35], [-0.55, 0.18, 0.35],
      [0.55, 0.18, -0.35], [-0.55, 0.18, -0.35],
    ];
    legPositions.forEach((p) => {
      const leg = new THREE.Mesh(legGeo, matTeak);
      leg.position.set(p[0], p[1] - 0.07, p[2]);
      leg.rotation.z = (p[0] > 0 ? -1 : 1) * 0.06;
      leg.castShadow = true;
      stool.add(leg);
    });
    stool.position.set(-1.4, -1.1, 1.4);
    stool.rotation.set(0, 0.5, 0);
    group.add(stool);

    // ---------- Decorative sphere (turned ball) at mid-near ----------
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.32, 64, 64), matWalnut);
    ball.position.set(0.8, 1.6, 1.2);
    ball.castShadow = true;
    group.add(ball);

    // ---------- Floor (huge ivory disc to receive shadows) ----------
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(20, 64),
      new THREE.MeshStandardMaterial({ color: "#FAF7F2", roughness: 1, metalness: 0 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.8;
    floor.receiveShadow = true;
    scene.add(floor);

    // ---------- Lighting ----------
    scene.add(new THREE.AmbientLight("#fff3e0", 0.4));

    const key = new THREE.DirectionalLight("#fff1d6", 2.5);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5; key.shadow.camera.far = 25;
    key.shadow.camera.left = -8; key.shadow.camera.right = 8;
    key.shadow.camera.top = 8; key.shadow.camera.bottom = -8;
    key.shadow.bias = -0.0003;
    key.shadow.radius = 8;
    scene.add(key);

    const rim = new THREE.DirectionalLight("#a0622a", 0.8);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    const fill = new THREE.PointLight("#fff5e6", 0.5, 14, 2);
    fill.position.set(0, 1, 5);
    scene.add(fill);

    // ---------- Dust motes ----------
    const dustCount = 110;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 14;
      dustPos[i * 3 + 1] = Math.random() * 6 - 1;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: "#c4a882", size: 0.025, transparent: true, opacity: 0.55, depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ---------- Mouse parallax ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMove);

    // ---------- Scroll drift ----------
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let frame = 0;
    let rafId = 0;
    const animate = () => {
      frame += 0.005;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Drift / spin
      tray.rotation.y = 0.2 + frame * 0.15;
      tray.position.y = -0.4 + Math.sin(frame * 1.1) * 0.08;

      shelf.rotation.y = 0.4 + Math.sin(frame * 0.6) * 0.08;
      shelf.position.y = 1.2 + Math.cos(frame * 0.9) * 0.07;

      stool.rotation.y = 0.5 + frame * 0.08;
      stool.position.y = -1.1 + Math.sin(frame * 1.3 + 1) * 0.06;

      ball.rotation.x = frame * 0.4;
      ball.rotation.y = frame * 0.3;
      ball.position.y = 1.6 + Math.cos(frame * 1.5) * 0.1;

      // Parallax: nearer objects translate more than far objects
      const scrollOffset = scrollY * 0.0025;
      group.position.y = scrollOffset; // gentle upward drift on scroll
      group.position.x = mouse.x * 0.4;
      group.rotation.y = mouse.x * 0.15;
      camera.position.y = 0.4 + mouse.y * 0.4;
      camera.lookAt(0, 0.2 + scrollOffset * 0.5, 0);

      // Dust drift
      const arr = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        arr[i * 3 + 1] += 0.0035;
        if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -1;
      }
      dustGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pmrem.dispose();
      envRT.dispose();
      texWalnut.dispose(); texOak.dispose(); texTeak.dispose();
      matWalnut.dispose(); matOak.dispose(); matTeak.dispose();
      dustGeo.dispose(); dustMat.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden data-cursor="drag" />;
}
