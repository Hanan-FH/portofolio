import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { SceneFallback } from './SceneFallback';
import { LoadingIndicator } from '../ui/LoadingIndicator';
import { GalaxyErrorBoundary } from './GalaxyErrorBoundary';

export type GalaxySceneState =
  | 'loading'
  | 'ready'
  | 'simplified'
  | 'css-fallback'
  | 'static-fallback';

export interface GalaxySceneProps {
  className?: string;
  forceMode?: 'auto' | 'simplified' | 'fallback';
}

function checkWebGLContext(): 'webgl2' | 'webgl' | null {
  try {
    const canvas = document.createElement('canvas');
    if (window.WebGL2RenderingContext && canvas.getContext('webgl2')) {
      return 'webgl2';
    }
    if (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) {
      return 'webgl';
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Isolated Three.js 3D Subsystem for the Galaxy Core Centerpiece.
 * Adheres to explicit state transitions: loading -> ready | simplified | css-fallback | static-fallback.
 * Features PBR clearcoat obsidian core, gyroscopic orbital rings, dynamic cursor point light,
 * IntersectionObserver off-screen pause, and comprehensive resource disposal.
 */
function GalaxySceneInternal({ className = '', forceMode = 'auto' }: GalaxySceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sceneState, setSceneState] = useState<GalaxySceneState>(() => {
    if (forceMode === 'fallback') return 'static-fallback';
    if (typeof window !== 'undefined' && !checkWebGLContext()) return 'css-fallback';
    return 'loading';
  });
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeMode, setActiveMode] = useState<'gyro' | 'wire' | 'solid'>('gyro');
  const activeModeRef = useRef(activeMode);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  const handleRetry = useCallback(() => {
    setSceneState('loading');
  }, []);

  useEffect(() => {
    if (forceMode === 'fallback') {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // 1. Hardware & Context Capability Detection
    const webglType = checkWebGLContext();
    if (!webglType) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;
    const isSimplified = forceMode === 'simplified' || isMobile;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSimplified,
        alpha: true,
        powerPreference: isSimplified ? 'low-power' : 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSimplified ? 1.25 : 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('[GalaxyScene] WebGL Renderer instantiation failed, falling back:', err);
      queueMicrotask(() => {
        setSceneState('css-fallback');
      });
      return;
    }

    // 3. Dynamic Lighting Architecture
    const ambientLight = new THREE.AmbientLight(0x0a1220, 2.2);
    scene.add(ambientLight);

    const cursorLight = new THREE.PointLight(0x00d1ff, 6.5, 22);
    cursorLight.position.set(3, 3, 5);
    scene.add(cursorLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x0055aa, 3.8, 18);
    fillLight.position.set(0, -5, -2);
    scene.add(fillLight);

    const internalCoreLight = new THREE.PointLight(0x00d1ff, 3.5, 7);
    internalCoreLight.position.set(0, 0, 0);
    scene.add(internalCoreLight);

    // 4. Artifact Geometric Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Layer 1: Obsidian Mirror Faceted Polyhedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.68, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x050811,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: isSimplified ? 0.0 : 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Layer 2: Glowing Cyan Wireframe Cage
    const wireGeometry = new THREE.IcosahedronGeometry(1.78, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    mainGroup.add(wireMesh);

    // Layer 3: Inner Dodecahedron Core
    const innerGeo = new THREE.DodecahedronGeometry(1.15, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00d1ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Layer 4: Concentric Gyroscopic Torus Rings
    const ring1Geo = new THREE.TorusGeometry(2.5, 0.022, 16, isSimplified ? 64 : 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00d1ff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x003355,
      emissiveIntensity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.85, 0.018, 16, isSimplified ? 64 : 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.12,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 4;
    mainGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(3.2, 0.015, 16, isSimplified ? 64 : 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x00d1ff,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x001f3f,
      emissiveIntensity: 0.3,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 3;
    mainGroup.add(ring3);

    // Layer 5: Orbital Constellation Dust
    const particleCount = isSimplified ? 24 : 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d1ff,
      size: isSimplified ? 0.04 : 0.055,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Layer 6: Procedural Corner Brackets
    const bracketLen = 0.3;
    const bracketBox = 2.2;
    const bracketMat = new THREE.LineBasicMaterial({
      color: 0x00d1ff,
      transparent: true,
      opacity: 0.45,
    });
    const bracketGroup = new THREE.Group();
    const bracketCorners = [
      [1, 1, 1], [-1, 1, 1], [1, -1, 1], [-1, -1, 1],
      [1, 1, -1], [-1, 1, -1], [1, -1, -1], [-1, -1, -1],
    ];
    bracketCorners.forEach(([cx, cy, cz]) => {
      const signX = cx > 0 ? -1 : 1;
      const signY = cy > 0 ? -1 : 1;
      const pts = [
        new THREE.Vector3(cx * bracketBox, cy * bracketBox + signY * bracketLen, cz * bracketBox),
        new THREE.Vector3(cx * bracketBox, cy * bracketBox, cz * bracketBox),
        new THREE.Vector3(cx * bracketBox + signX * bracketLen, cy * bracketBox, cz * bracketBox),
      ];
      const bGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(bGeo, bracketMat);
      bracketGroup.add(line);
    });
    mainGroup.add(bracketGroup);

    // 5. Interaction Physics
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let spinVelocityX = 0;
    let spinVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      spinVelocityX = 0;
      spinVelocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      cursorLight.position.x = normX * 10;
      cursorLight.position.y = -normY * 10;
      cursorLight.position.z = 4.5;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        spinVelocityY = deltaX * 0.008;
        spinVelocityX = deltaY * 0.008;
        targetRotationY += spinVelocityY;
        targetRotationX += spinVelocityX;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      } else {
        targetRotationY = normX * 0.85;
        targetRotationX = normY * 0.85;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // 6. Context Loss Recovery
    const domCanvas = renderer.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('[GalaxyScene] WebGL context lost.');
      setSceneState('css-fallback');
    };
    domCanvas.addEventListener('webglcontextlost', handleContextLost, false);

    // 7. Off-Screen Viewport Pause (IntersectionObserver)
    let isOffScreen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isOffScreen = !entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSimplified ? 1.25 : 1.75));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 9. Render Loop
    let animationFrameId = 0;
    let lastTime = performance.now();
    let totalTime = 0;

    const render = (currentTime: number) => {
      if (document.hidden || isOffScreen) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      totalTime += delta;
      const speedMultiplier = prefersReducedMotion ? 0.12 : 1.0;

      // Breathing internal core illumination
      const pulse = Math.sin(totalTime * 2.2) * 0.5 + 0.5;
      internalCoreLight.intensity = 2.5 + pulse * 2.0;
      wireMaterial.opacity = 0.5 + pulse * 0.3;

      // Dynamic Mode Visibility
      const currentMode = activeModeRef.current;
      if (currentMode === 'wire') {
        coreMesh.visible = false;
        innerMesh.visible = true;
        ring1.visible = false;
        ring2.visible = false;
        ring3.visible = false;
        bracketGroup.visible = false;
        wireMesh.visible = true;
        wireMaterial.opacity = 0.9;
      } else if (currentMode === 'solid') {
        coreMesh.visible = true;
        innerMesh.visible = false;
        ring1.visible = false;
        ring2.visible = false;
        ring3.visible = false;
        bracketGroup.visible = false;
        wireMesh.visible = false;
      } else {
        coreMesh.visible = true;
        innerMesh.visible = true;
        ring1.visible = true;
        ring2.visible = true;
        ring3.visible = true;
        bracketGroup.visible = true;
        wireMesh.visible = true;
      }

      // Autonomous gyroscopic multi-axis rotation
      coreMesh.rotation.y += 0.38 * delta * speedMultiplier;
      coreMesh.rotation.x += 0.24 * delta * speedMultiplier;

      wireMesh.rotation.y -= 0.48 * delta * speedMultiplier;
      wireMesh.rotation.z += 0.2 * delta * speedMultiplier;

      innerMesh.rotation.y += 0.6 * delta * speedMultiplier;
      innerMesh.rotation.x -= 0.3 * delta * speedMultiplier;

      ring1.rotation.z += 0.55 * delta * speedMultiplier;
      ring2.rotation.y += 0.42 * delta * speedMultiplier;
      ring3.rotation.x += 0.32 * delta * speedMultiplier;

      particles.rotation.y += 0.18 * delta * speedMultiplier;

      // Smooth inertia dampening
      if (isDragging) {
        mainGroup.rotation.y = targetRotationY;
        mainGroup.rotation.x = targetRotationX;
      } else {
        spinVelocityX *= 0.94;
        spinVelocityY *= 0.94;
        targetRotationX += spinVelocityX;
        targetRotationY += spinVelocityY;
        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    queueMicrotask(() => {
      setSceneState(isSimplified ? 'simplified' : 'ready');
    });

    // 10. Robust Resource Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();

      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domCanvas.removeEventListener('webglcontextlost', handleContextLost);

      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      bracketMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [forceMode]);

  if (sceneState === 'css-fallback' || sceneState === 'static-fallback') {
    return (
      <SceneFallback
        reason={sceneState === 'static-fallback' ? 'low-power' : 'unsupported'}
        onRetry={handleRetry}
        className={className}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab active:cursor-grabbing select-none touch-pan-y ${className}`}
      aria-label="Interactive 3D procedural artifact — drag to inspect"
      role="img"
    >
      {sceneState === 'loading' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-panel/80">
          <LoadingIndicator />
        </div>
      )}

      {/* Laboratory Registration Crosshairs */}
      <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.65rem] text-signal/60" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute right-3 top-3 font-mono text-[0.65rem] text-signal/60" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[0.65rem] text-signal/60" aria-hidden="true">+</span>
      <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[0.65rem] text-signal/60" aria-hidden="true">+</span>

      {/* 3D Mode Selector HUD */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 font-mono text-[0.55rem] tracking-wider">
        {(['gyro', 'wire', 'solid'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setActiveMode(mode);
            }}
            className={`rounded-xs border px-2 py-0.5 uppercase transition-all duration-150 ${
              activeMode === mode
                ? 'border-signal bg-signal/20 text-signal shadow-[0_0_8px_rgba(0,209,255,0.35)]'
                : 'border-line bg-black/70 text-dim hover:border-line-strong hover:text-mist'
            }`}
            aria-label={`Switch 3D display to ${mode} mode`}
          >
            {mode === 'gyro' ? 'GYRO' : mode === 'wire' ? 'WIRE' : 'SOLID'}
          </button>
        ))}
      </div>

      {/* Real-time Interaction HUD Status */}
      <div className="pointer-events-none absolute bottom-3 left-6 z-10 flex items-center gap-2 rounded-xs border border-line bg-black/85 px-3 py-1 font-mono text-[0.6rem] tracking-[0.1em] text-dim backdrop-blur-md">
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            isInteracting ? 'bg-signal shadow-[0_0_8px_#00d1ff]' : 'bg-white/40'
          }`}
        />
        <span className="text-paper">
          {isInteracting
            ? 'ACTIVE INTERPOLATION // 3D DRAG'
            : sceneState === 'simplified'
              ? 'PROCEDURAL KERNEL // SIMPLIFIED 3D'
              : 'PROCEDURAL KERNEL // 360° WEBGL'}
        </span>
      </div>
    </div>
  );
}

/**
 * Top-level GalaxyScene wrapper with isolated ErrorBoundary protection.
 * Any crash in WebGL/Three.js is safely caught and directed to SceneFallback.
 */
export function GalaxyScene(props: GalaxySceneProps) {
  return (
    <GalaxyErrorBoundary>
      <GalaxySceneInternal {...props} />
    </GalaxyErrorBoundary>
  );
}

export default GalaxyScene;
