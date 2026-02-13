import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 120;
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.005;
    }
    return vel;
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count * 3; i++) {
      arr[i] += velocities[i];
      if (Math.abs(arr[i]) > 5) velocities[i] *= -1;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geo}>
      <pointsMaterial
        size={0.04}
        color="#C6A75E"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function Lines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geo = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 8;
      const y1 = (Math.random() - 0.5) * 8;
      const z1 = (Math.random() - 0.5) * 3;
      pos[i * 6] = x1;
      pos[i * 6 + 1] = y1;
      pos[i * 6 + 2] = z1;
      pos[i * 6 + 3] = x1 + (Math.random() - 0.5) * 2;
      pos[i * 6 + 4] = y1 + (Math.random() - 0.5) * 2;
      pos[i * 6 + 5] = z1 + (Math.random() - 0.5) * 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.1;
      lineRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.08) * 0.05;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geo}>
      <lineBasicMaterial color="#C6A75E" transparent opacity={0.15} />
    </lineSegments>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <Particles />
        <Lines />
      </Canvas>
    </div>
  );
}
