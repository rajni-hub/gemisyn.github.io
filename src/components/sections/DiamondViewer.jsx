import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

function ParticleField({
  count = 3000,
  connectionDistance = 6,
  maxHoverConnections = 95,
}) {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse2D = useRef(new THREE.Vector2());
  const smoothMouse = useRef(new THREE.Vector3());
  const hoverLines = useRef([]);

  const [_, forceUpdate] = useState(0); // Used to trigger rerenders

  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        )
      );
    }
    return pts;
  }, [count]);

  const staticLines = useMemo(() => {
    const segs = [];
    const maxStaticConnections = 2000;
    for (
      let i = 0;
      i < particles.length && segs.length < maxStaticConnections;
      i++
    ) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = particles[i].distanceTo(particles[j]);
        if (dist < connectionDistance) {
          segs.push({
            start: particles[i],
            end: particles[j],
            dist,
            initialOpacity: (1 - dist / connectionDistance) * 0.2,
          });
        }
      }
    }
    return segs;
  }, [particles, connectionDistance]);

  useFrame(({ camera, mouse, clock }) => {
    const time = clock.getElapsedTime();
    mouse2D.current.set(mouse.x, mouse.y);
    raycaster.current.setFromCamera(mouse2D.current, camera);
    const intersection = new THREE.Vector3();
    raycaster.current.ray.at(12, intersection);
    smoothMouse.current.lerp(intersection, 0.05); // Slower, smoother

    // Particle drift
    const drift = 0.00002;
    particles.forEach((p) => {
      p.y += Math.sin(time * 0.5 + p.x * 0.1) * drift;
      p.x += Math.cos(time * 0.5 + p.y * 0.1) * drift;
      p.z += Math.sin(time * 0.3 + p.z * 0.1) * drift;
    });

    // Hover effect update
    const hovered = particles
      .map((p) => ({
        p,
        dist: smoothMouse.current.distanceTo(p),
        fade: (Math.sin(time * 0.5 + p.x * p.y) * 0.5 + 0.5) * 2,
      }))
      .filter(({ dist }) => dist < connectionDistance * 1.2)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, maxHoverConnections);

    let changed = false;
    if (hovered.length !== hoverLines.current.length) {
      changed = true;
    } else {
      for (let i = 0; i < hovered.length; i++) {
        if (hovered[i].dist !== hoverLines.current[i]?.dist) {
          changed = true;
          break;
        }
      }
    }

    if (changed) {
      hoverLines.current = hovered;
      forceUpdate((v) => v + 1); // trigger rerender for hover lines
    }
  });

  return (
    <group>
      {/* Particles */}
      <Points
        positions={new Float32Array(particles.flatMap((p) => [p.x, p.y, p.z]))}
        stride={3}
      >
        <PointMaterial
          color="#98FB98"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Static lines */}
      {staticLines.map(({ start, end, dist, initialOpacity }, i) => (
        <line key={`static-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={
                new Float32Array([
                  start.x,
                  start.y,
                  start.z,
                  end.x,
                  end.y,
                  end.z,
                ])
              }
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#98FB98"
            transparent
            opacity={initialOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}

      {/* Hover lines */}
      {hoverLines.current.map(({ p, dist, fade }, i) => (
        <line key={`hover-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={
                new Float32Array([
                  smoothMouse.current.x,
                  smoothMouse.current.y,
                  smoothMouse.current.z,
                  p.x,
                  p.y,
                  p.z,
                ])
              }
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#98FB98"
            transparent
            opacity={(1 - dist / (connectionDistance * 1.2)) * 0.5 * fade}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
}
function Diamond() {
  const diamondRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const radius = 1;
    if (diamondRef.current) {
      diamondRef.current.position.x = Math.cos(t) * radius;
      diamondRef.current.position.z = Math.sin(t) * radius + 2;
      diamondRef.current.position.y = Math.sin(t * 2) * 0.2;
      diamondRef.current.rotation.y += 0.01;
    }
  });

  const edgeMaterial = (
    <meshBasicMaterial
      color="#00F0FF"
      wireframe={true}
      transparent
      opacity={0.8}
    />
  );

  return (
    <group
      ref={diamondRef}
      rotation={[0, 0, 0]}
      position={[0, -1, 0]}
      scale={1.2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {[...Array(2)].map((_, i) => (
        <>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.9, 1.4, 0.3, 58, 8, true]} />
            {edgeMaterial}
          </mesh>

          <mesh position={[0, 0.45, 0]} key={`cylinder2-${i}`}>
            <cylinderGeometry args={[0.9, 0.9, 0.000001, 58]} />
            {edgeMaterial}
          </mesh>

          <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[1.4, 1.5, 58, 8, true]} />
            {edgeMaterial}
          </mesh>
        </>
      ))}
      <pointLight
        position={[0, 0, 0]}
        intensity={hovered ? 1.2 : 0.6}
        color="#00ff8c"
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={hovered ? 1.0 : 0.4}
        color="#00ff8c"
      />
    </group>
  );
}

const DiamondViewer = () => {
  return (
    <ViewerSection>
      <ContentWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ViewerContainer>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true, alpha: true }}
            style={{ background: "#0a0a0a" }}
          >
            <Suspense fallback={null}>
              <Stage
                environment="city"
                intensity={1.2}
                shadows={false}
                adjustCamera={false}
                preset="rembrandt"
              >
                <Diamond />
                <ParticleField />
              </Stage>
              <EffectComposer>
                <Bloom luminanceThreshold={0.2} intensity={2} radius={0.8} />
              </EffectComposer>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </ViewerContainer>
        <TextOverlay
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <MainTitle
            as={motion.h1}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,

              delay: 0.4,

              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            THE FUTURE ØF DIAMØNDS
            <br />
            WAS NEVER UNDERGRØUND
          </MainTitle>
        </TextOverlay>
      </ContentWrapper>
    </ViewerSection>
  );
};

const ViewerSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #0a0a0a;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ViewerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 40%;
  left: 5%;
  transform: none;
  z-index: 1;
  text-align: left;
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;

  @media (max-width: 768px) {
    text-align: center;
    top: 25%;
    padding: 0 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const MainTitle = styled.h1`
  font-family: "CustomBloomFont", sans-serif;
  font-feature-settings: "ss01" on, "liga" on;
  font-size: clamp(3rem, 7vw, 7rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  color: #00ff8c;
  text-shadow: 0 0 10px #00ff8c, 0 0 30px #00ff8c;

  .custom-o {
    display: inline-block;
    width: 1em;
    height: 1em;
    background: url("/icons/alt-o.svg") no-repeat center/contain;
    color: transparent;
    vertical-align: baseline;
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const Subtitle = styled.p`
  font-family: "CustomBloomFont", sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 300;
  line-height: 1.6;
  background: linear-gradient(135deg, #fff 0%, #ccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
  max-width: 800px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3),
    0 0 15px rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    text-align: center;
    br {
      display: none;
    }
  }
`;

export default DiamondViewer;
