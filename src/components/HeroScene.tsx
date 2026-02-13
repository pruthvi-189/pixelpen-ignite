import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const keywords = [
  "Artificial Intelligence", "Machine Learning", "Deep Learning",
  "Natural Language Processing", "Computer Vision", "Neural Networks",
  "Data Science", "Reinforcement Learning", "Generative AI",
  "Transformers", "LLMs", "Edge AI", "MLOps", "PyTorch",
];

function FloatingText({ text, position, mouse }: { text: string; position: [number, number, number]; mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePos = useRef(position);
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d")!;
    const fontSize = 28;
    ctx.font = `${fontSize}px Inter, sans-serif`;
    const metrics = ctx.measureText(text);
    const w = Math.ceil(metrics.width) + 16;
    const h = fontSize + 16;
    c.width = w;
    c.height = h;
    ctx.font = `${fontSize}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(198, 167, 94, 0.12)";
    ctx.fillText(text, 8, fontSize + 4);
    return c;
  }, [text]);

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.needsUpdate = true;
    return t;
  }, [canvas]);

  const aspect = canvas.width / canvas.height;
  const planeH = 0.35;
  const planeW = planeH * aspect;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.position.x = basePos.current[0] + Math.sin(t * speed + offset) * 0.3 + mouse.current[0] * 0.3;
    meshRef.current.position.y = basePos.current[1] + Math.cos(t * speed * 0.7 + offset) * 0.2 + mouse.current[1] * 0.3;
    meshRef.current.position.z = basePos.current[2];
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[planeW, planeH]} />
      <meshBasicMaterial map={texture} transparent opacity={1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Particles({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
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
    mesh.current.rotation.x = mouse.current[1] * 0.1;
    mesh.current.rotation.y = mouse.current[0] * 0.1;
  });

  return (
    <points ref={mesh} geometry={geo}>
      <pointsMaterial size={0.04} color="#C6A75E" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Lines({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
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
      lineRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.1 + mouse.current[0] * 0.08;
      lineRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.08) * 0.05 + mouse.current[1] * 0.08;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geo}>
      <lineBasicMaterial color="#C6A75E" transparent opacity={0.15} />
    </lineSegments>
  );
}

function SceneContent({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const textPositions = useMemo(() => {
    return keywords.map(() => [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 2 - 1,
    ] as [number, number, number]);
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <Particles mouse={mouse} />
      <Lines mouse={mouse} />
      {keywords.map((kw, i) => (
        <FloatingText key={kw} text={kw} position={textPositions[i]} mouse={mouse} />
      ))}
    </>
  );
}

export default function HeroScene() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent mouse={mouse} />
      </Canvas>
    </div>
  );
}
