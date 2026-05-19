"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Hyper-real wooden composition with PBR + IBL.
 * - Turned wooden bowl (LatheGeometry) on a soft sand pedestal
 * - Floating wooden block + sphere accents
 * - RoomEnvironment IBL for realistic reflections
 * - ACES filmic tone mapping
 * - Soft contact shadow plane
 * - Slow auto-rotation + mouse parallax + dust motes
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null; // transparent — let parent panel show

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // PBR environment for realistic reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // ---------- Procedural wood-grain texture ----------
    const makeWoodTexture = (variant: "walnut" | "oak" = "walnut") => {
      const c = document.createElement("canvas");
      c.width = 1024;
      c.height = 1024;
      const ctx = c.getContext("2d")!;
      const palette = variant === "walnut"
        ? ["#3a2418", "#5a3220", "#7a4a2c", "#9a6038", "#5a3220"]
        : ["#7a5230", "#9a6e44", "#b78652", "#9a6e44", "#7a5230"];
      const grad = ctx.createLinearGradient(0, 0, 1024, 0);
      grad.addColorStop(0, palette[0]);
      grad.addColorStop(0.35, palette[1]);
      grad.addColorStop(0.55, palette[2]);
      grad.addColorStop(0.75, palette[3]);
      grad.addColorStop(1, palette[4]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Long flowing grain lines
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

      // Knots
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
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      return tex;
    };

    const walnutTex = makeWoodTexture("walnut");
    const oakTex = makeWoodTexture("oak");

    const walnutMat = new THREE.MeshPhysicalMaterial({
      map: walnutTex,
      roughness: 0.45,
      metalness: 0.0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.55,
      sheen: 0.25,
      sheenColor: new THREE.Color("#b08968"),
      envMapIntensity: 1.0,
    });
    const oakMat = new THREE.MeshPhysicalMaterial({
      map: oakTex,
      roughness: 0.55,
      metalness: 0.0,
      clearcoat: 0.2,
      clearcoatRoughness: 0.7,
      envMapIntensity: 0.95,
    });

    // ---------- Turned wooden bowl (LatheGeometry) ----------
    const bowlPoints: THREE.Vector2[] = [];
    const segs = 24;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      // Profile: flat base → curve up & out → slight inward lip
      const r = 0.05 + Math.sin(t * Math.PI) * 1.05 + (t > 0.85 ? -0.18 * (t - 0.85) * 6 : 0);
      const y = t * 1.0;
      bowlPoints.push(new THREE.Vector2(Math.max(0.04, r), y));
    }
    // Hollow inside: trace down inside wall
    for (let i = segs; i >= 1; i--) {
      const t = i / segs;
      const r = Math.max(0, 0.05 + Math.sin(t * Math.PI) * 1.05 + (t > 0.85 ? -0.18 * (t - 0.85) * 6 : 0)) - 0.12;
      const y = t * 1.0;
      bowlPoints.push(new THREE.Vector2(Math.max(0.02, r), y));
    }
    const bowlGeo = new THREE.LatheGeometry(bowlPoints, 96);
    bowlGeo.computeVertexNormals();
    const bowl = new THREE.Mesh(bowlGeo, walnutMat);
    bowl.position.set(0, -0.6, 0);
    bowl.scale.setScalar(1.05);
    bowl.castShadow = true;
    bowl.receiveShadow = true;
    scene.add(bowl);

    // ---------- Floating plank ----------
    const plank = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 0.85), oakMat);
    plank.position.set(-1.6, 0.95, -0.2);
    plank.rotation.set(0.18, -0.45, 0.06);
    plank.castShadow = true;
    plank.receiveShadow = true;
    scene.add(plank);

    // ---------- Floating sphere (turned wooden ball) ----------
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), walnutMat);
    ball.position.set(1.7, 1.1, 0.4);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);

    // ---------- Soft contact shadow / pedestal ----------
    const shadowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      g.addColorStop(0, "rgba(28,18,10,0.65)");
      g.addColorStop(0.6, "rgba(28,18,10,0.18)");
      g.addColorStop(1, "rgba(28,18,10,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    })();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.5, 4.5),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.62;
    scene.add(shadow);

    // ---------- Lighting ----------
    const ambient = new THREE.AmbientLight("#f5e9d4", 0.35);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#fff1d6", 2.6);
    key.position.set(3.5, 5.5, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 20;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 6;
    scene.add(key);

    const rim = new THREE.DirectionalLight("#b08968", 1.1);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const fill = new THREE.PointLight("#fff5e6", 0.6, 12, 2);
    fill.position.set(0, 1, 4);
    scene.add(fill);

    // ---------- Dust motes ----------
    const dustCount = 90;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 1] = Math.random() * 4 - 0.5;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: "#d4b896",
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ---------- Mouse parallax ----------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    mount.addEventListener("mousemove", onMove);

    let frame = 0;
    let rafId = 0;
    const animate = () => {
      frame += 0.005;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Slow auto-rotation on bowl
      bowl.rotation.y = frame * 0.18;

      plank.rotation.y = -0.45 + Math.sin(frame * 0.9) * 0.06;
      plank.rotation.x = 0.18 + Math.cos(frame * 0.7) * 0.04;
      plank.position.y = 0.95 + Math.sin(frame * 1.1) * 0.06;

      ball.rotation.y = frame * 0.4;
      ball.rotation.x = frame * 0.25;
      ball.position.y = 1.1 + Math.cos(frame * 1.3) * 0.07;

      // Dust drift
      const arr = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        arr[i * 3 + 1] += 0.003;
        if (arr[i * 3 + 1] > 3.5) arr[i * 3 + 1] = -0.5;
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Camera dolly + parallax
      camera.position.x = mouse.x * 0.7;
      camera.position.y = 1.2 + mouse.y * 0.4;
      camera.lookAt(0, 0.2, 0);

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
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      renderer.dispose();
      pmrem.dispose();
      envRT.dispose();
      walnutTex.dispose();
      oakTex.dispose();
      shadowTex.dispose();
      walnutMat.dispose();
      oakMat.dispose();
      bowlGeo.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
