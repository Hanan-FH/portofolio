import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProceduralArtifact3DProps {
  className?: string;
}

function checkWebglSupported(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const testCanvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function ProceduralArtifact3D({ className = '' }: ProceduralArtifact3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported] = useState(checkWebglSupported);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !webglSupported) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0x0a101d, 2.0);
    scene.add(ambientLight);

    // Key Electric Cyan light
    const cyanLight = new THREE.PointLight(0x00d1ff, 5.5, 20);
    cyanLight.position.set(4, 4, 4);
    scene.add(cyanLight);

    // White rim light
    const whiteRim = new THREE.DirectionalLight(0xffffff, 2.8);
    whiteRim.position.set(-5, 3, -3);
    scene.add(whiteRim);

    // Deep blue bottom fill
    const blueFill = new THREE.PointLight(0x0055aa, 3.5, 18);
    blueFill.position.set(0, -4, -2);
    scene.add(blueFill);

    // 3. Artifact Group Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Layer A: Inner Faceted Core (Obsidian Solid)
    const coreGeometry = new THREE.IcosahedronGeometry(1.65, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Layer B: Glowing Wireframe Cage (Electric Cyan)
    const wireGeometry = new THREE.IcosahedronGeometry(1.72, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    mainGroup.add(wireMesh);

    // Layer C: Outer Dodecahedral Armor
    const armorGeometry = new THREE.DodecahedronGeometry(2.05, 0);
    const armorMaterial = new THREE.MeshStandardMaterial({
      color: 0x080c14,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const armorMesh = new THREE.Mesh(armorGeometry, armorMaterial);
    mainGroup.add(armorMesh);

    // Layer D: Three Orbital Gyroscopic Torus Rings
    // Ring 1 (Equatorial)
    const ring1Geo = new THREE.TorusGeometry(2.55, 0.022, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00d1ff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x004466,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    mainGroup.add(ring1);

    // Ring 2 (Inclined)
    const ring2Geo = new THREE.TorusGeometry(2.85, 0.018, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // Ring 3 (Outer Cyan Track)
    const ring3Geo = new THREE.TorusGeometry(3.15, 0.014, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x00d1ff,
      transparent: true,
      opacity: 0.6,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 3;
    mainGroup.add(ring3);

    // Layer E: Orbital Floating Nodes (Particles)
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d1ff,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 4. Mouse & Pointer Tracking for Interactive Parallax & Rotation
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;

        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      } else {
        // Subtle pointer parallax when hovering
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        targetRotationY = x * 0.8;
        targetRotationX = y * 0.8;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // 5. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 6. Animation Loop
    let animationFrameId = 0;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const speedMultiplier = prefersReducedMotion ? 0.15 : 1.0;

      // Autonomous gyroscopic motion
      coreMesh.rotation.y += 0.35 * delta * speedMultiplier;
      coreMesh.rotation.x += 0.22 * delta * speedMultiplier;

      wireMesh.rotation.y -= 0.45 * delta * speedMultiplier;
      wireMesh.rotation.z += 0.18 * delta * speedMultiplier;

      armorMesh.rotation.y += 0.2 * delta * speedMultiplier;

      ring1.rotation.z += 0.5 * delta * speedMultiplier;
      ring2.rotation.y += 0.4 * delta * speedMultiplier;
      ring3.rotation.x += 0.3 * delta * speedMultiplier;

      particles.rotation.y += 0.15 * delta * speedMultiplier;

      // Smooth pointer/drag dampening (lerp)
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // 7. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      armorGeometry.dispose();
      armorMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [webglSupported]);

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D procedural artifact — drag to inspect"
      role="img"
    >
      {/* Visual interaction badge */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-xs border border-line bg-black/80 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.1em] text-dim backdrop-blur-md">
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            isInteracting ? 'bg-signal shadow-[0_0_8px_#00d1ff]' : 'bg-white/40'
          }`}
        />
        <span>{isInteracting ? 'ACTIVE DRAG // WEBGL' : '3D WEBGL // DRAG TO ROTATE'}</span>
      </div>

      {/* Fallback if WebGL is unavailable */}
      {!webglSupported && (
        <div className="flex h-full w-full items-center justify-center p-8 text-center">
          <div className="rounded-xs border border-line bg-panel p-6">
            <span className="font-mono text-xs text-signal">WEBGL CONTEXT FALLBACK</span>
            <p className="mt-2 text-xs text-mist">
              Procedural 3D rendering unavailable on this device. Interface running in 2D vector mode.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProceduralArtifact3D;
