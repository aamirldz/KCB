// @ts-nocheck
'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// ULTRA-REALISTIC 3D RAMEN BOWL SCENE
// Complete redesign with photorealistic materials
// ============================================

// ========================================
// LARGE BACKGROUND BOWL (Left side silhouette like reference)
// ========================================
function LargeBackgroundBowl() {
    const groupRef = useRef<THREE.Group>(null);
    const { size } = useThree();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;

    // Create realistic bowl shape - wide and elegant
    const bowlGeometry = useMemo(() => {
        const points: THREE.Vector2[] = [];
        const segments = 80;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const y = -1.0 + t * 2.0;
            let x: number;

            if (t < 0.08) {
                // Flat bottom
                x = 0.15 + Math.pow(t / 0.08, 0.5) * 0.35;
            } else if (t < 0.85) {
                // Elegant curved body
                const blend = (t - 0.08) / 0.77;
                x = 0.50 + blend * 1.15 + Math.sin(blend * Math.PI * 0.8) * 0.15;
            } else {
                // Thick rim with lip
                const rimT = (t - 0.85) / 0.15;
                x = 1.65 + Math.sin(rimT * Math.PI * 0.6) * 0.12;
                if (rimT > 0.8) {
                    x -= (rimT - 0.8) * 0.3;
                }
            }
            points.push(new THREE.Vector2(x, y));
        }
        return new THREE.LatheGeometry(points, 160);
    }, []);

    // Gentle floating animation
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.015;
            groupRef.current.position.y = Math.sin(t * 0.2) * 0.05;
        }
    });

    // Responsive positioning - large on left side
    const posX = isMobile ? -2 : isTablet ? -5 : -7.5;
    const posY = isMobile ? -1.5 : -2.5;
    const posZ = isMobile ? 0 : 2;
    const scale = isMobile ? 2.5 : isTablet ? 4.5 : 6.5;
    const rotX = isMobile ? 0.2 : 0.4;
    const rotY = isMobile ? 0.2 : 0.5;

    return (
        <group ref={groupRef} position={[posX, posY, posZ]} rotation={[rotX, rotY, 0]} scale={scale}>
            {/* Outer bowl - Bright tan/beige ceramic */}
            <mesh geometry={bowlGeometry} castShadow receiveShadow>
                <meshStandardMaterial
                    color="#d4bc94"
                    roughness={0.35}
                    metalness={0.02}
                    emissive="#c9a86c"
                    emissiveIntensity={0.35}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner bowl - Dark wood/ceramic interior */}
            <mesh geometry={bowlGeometry} scale={0.94}>
                <meshStandardMaterial
                    color="#2a1810"
                    roughness={0.5}
                    metalness={0.0}
                    emissive="#1a0f0a"
                    emissiveIntensity={0.15}
                    side={THREE.FrontSide}
                />
            </mesh>

            {/* Gold rim band */}
            <mesh position={[0, 0.98, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.70, 0.045, 32, 128]} />
                <meshStandardMaterial
                    color="#c9a034"
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#8b7020"
                    emissiveIntensity={0.4}
                />
            </mesh>

            {/* Secondary gold accent */}
            <mesh position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.66, 0.025, 24, 100]} />
                <meshStandardMaterial
                    color="#b8902a"
                    metalness={0.85}
                    roughness={0.15}
                />
            </mesh>

            {/* Decorative pattern ring */}
            <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.35, 0.02, 16, 80]} />
                <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.3} />
            </mesh>
        </group>
    );
}

// ========================================
// REALISTIC RAMEN BOWL WITH NOODLES
// ========================================
function RealisticRamenBowl() {
    const groupRef = useRef<THREE.Group>(null);
    const noodlesRef = useRef<THREE.Group>(null);
    const brothRef = useRef<THREE.Mesh>(null);
    const { pointer } = useThree();

    // Bowl geometry
    const bowlGeometry = useMemo(() => {
        const points: THREE.Vector2[] = [];
        const segments = 60;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const y = -0.8 + t * 1.6;
            let x: number;

            if (t < 0.1) {
                x = 0.08 + Math.pow(t / 0.1, 0.6) * 0.35;
            } else if (t < 0.9) {
                const blend = (t - 0.1) / 0.8;
                x = 0.43 + blend * 0.72 + Math.sin(blend * Math.PI) * 0.12;
            } else {
                const rimT = (t - 0.9) / 0.1;
                x = 1.15 + Math.sin(rimT * Math.PI * 0.5) * 0.08;
            }
            points.push(new THREE.Vector2(x, y));
        }
        return new THREE.LatheGeometry(points, 96);
    }, []);

    // Generate realistic noodle strands
    const noodleData = useMemo(() => {
        const strands: { curve: THREE.CatmullRomCurve3; thickness: number; color: string }[] = [];
        const count = 35;

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
            const radius = 0.15 + Math.random() * 0.25;
            const height = 0.3 + Math.random() * 0.4;

            const points = [
                new THREE.Vector3(Math.cos(angle) * radius * 0.3, 0, Math.sin(angle) * radius * 0.3),
                new THREE.Vector3(Math.cos(angle) * radius * 0.6, height * 0.4, Math.sin(angle) * radius * 0.6),
                new THREE.Vector3(Math.cos(angle) * radius * 0.8, height * 0.7, Math.sin(angle) * radius * 0.8),
                new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius),
                new THREE.Vector3(Math.cos(angle) * radius * 1.1, height + 0.15, Math.sin(angle) * radius * 1.1),
            ];

            strands.push({
                curve: new THREE.CatmullRomCurve3(points),
                thickness: 0.012 + Math.random() * 0.008,
                color: `hsl(42, ${55 + Math.random() * 15}%, ${72 + Math.random() * 10}%)`
            });
        }
        return strands;
    }, []);

    // Animation
    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            // Smooth breathing motion
            const breathe = Math.sin(t * 0.3) * 0.02;
            groupRef.current.position.y = breathe;
            groupRef.current.rotation.y = t * 0.02 + pointer.x * 0.05;
        }

        // Broth surface animation
        if (brothRef.current) {
            const geo = brothRef.current.geometry;
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const dist = Math.sqrt(x * x + y * y);
                const wave = Math.sin(dist * 3 - t * 0.8) * 0.008 + Math.cos(dist * 2 + t * 0.5) * 0.005;
                pos.setZ(i, wave);
            }
            pos.needsUpdate = true;
        }

        // Animate noodles being lifted
        if (noodlesRef.current) {
            const liftHeight = Math.sin(t * 0.15) * 0.08;
            noodlesRef.current.position.y = 0.4 + liftHeight;
            noodlesRef.current.rotation.z = Math.sin(t * 0.1) * 0.03;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Bowl exterior - white/cream ceramic */}
            <mesh geometry={bowlGeometry} castShadow receiveShadow>
                <meshStandardMaterial
                    color="#f5f0e6"
                    roughness={0.25}
                    metalness={0.02}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Bowl interior - darker */}
            <mesh geometry={bowlGeometry} scale={0.96}>
                <meshStandardMaterial
                    color="#e8e0d0"
                    roughness={0.35}
                    side={THREE.FrontSide}
                />
            </mesh>

            {/* Gold rim */}
            <mesh position={[0, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.21, 0.025, 24, 80]} />
                <meshStandardMaterial color="#d4a44a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Decorative band - red/orange */}
            <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.12, 0.035, 16, 64]} />
                <meshStandardMaterial color="#c94420" roughness={0.4} metalness={0.1} />
            </mesh>

            {/* Broth base layer */}
            <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.08, 64]} />
                <meshPhysicalMaterial
                    color="#6b3a1a"
                    roughness={0.15}
                    metalness={0.05}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            {/* Animated broth surface */}
            <mesh ref={brothRef} position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.10, 80, 80]} />
                <meshPhysicalMaterial
                    color="#a85232"
                    roughness={0.08}
                    metalness={0.02}
                    clearcoat={0.8}
                    clearcoatRoughness={0.1}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            {/* Chili oil spots */}
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 0.5 + Math.random() * 0.4;
                return (
                    <mesh key={i} position={[Math.cos(angle) * radius, 0.34, Math.sin(angle) * radius]} rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[0.06 + Math.random() * 0.04, 16]} />
                        <meshStandardMaterial color="#c42a0a" roughness={0.1} transparent opacity={0.7} />
                    </mesh>
                );
            })}

            {/* Noodle bed at bottom */}
            <group position={[0, 0.25, 0]}>
                {Array.from({ length: 20 }).map((_, i) => {
                    const angle = (i / 20) * Math.PI * 2;
                    const r = 0.3 + Math.random() * 0.5;
                    return (
                        <mesh key={i} position={[Math.cos(angle) * r * 0.5, 0.05, Math.sin(angle) * r * 0.5]} rotation={[Math.random() * 0.5, angle, 0]}>
                            <cylinderGeometry args={[0.015, 0.012, 0.4 + Math.random() * 0.3, 8]} />
                            <meshStandardMaterial color="#e8d4a8" roughness={0.4} />
                        </mesh>
                    );
                })}
            </group>

            {/* Chopsticks with noodles */}
            <group ref={noodlesRef} position={[0.1, 0.4, 0]}>
                {/* Left chopstick */}
                <mesh position={[-0.08, 0.35, 0]} rotation={[0.3, 0.1, -0.15]}>
                    <cylinderGeometry args={[0.018, 0.012, 1.2, 12]} />
                    <meshStandardMaterial color="#5c3a20" roughness={0.35} metalness={0.05} />
                </mesh>

                {/* Right chopstick */}
                <mesh position={[0.08, 0.35, 0]} rotation={[0.3, -0.1, 0.15]}>
                    <cylinderGeometry args={[0.018, 0.012, 1.2, 12]} />
                    <meshStandardMaterial color="#5c3a20" roughness={0.35} metalness={0.05} />
                </mesh>

                {/* Lifted noodles */}
                {noodleData.slice(0, 18).map((strand, i) => (
                    <mesh key={i}>
                        <tubeGeometry args={[strand.curve, 20, strand.thickness, 8, false]} />
                        <meshStandardMaterial
                            color={strand.color}
                            roughness={0.3}
                            metalness={0.0}
                        />
                    </mesh>
                ))}

                {/* Noodle drips */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <mesh key={`drip-${i}`} position={[(i - 2) * 0.05, -0.1 - i * 0.03, 0]}>
                        <sphereGeometry args={[0.015, 8, 8]} />
                        <meshStandardMaterial color="#c9a86c" roughness={0.2} transparent opacity={0.8} />
                    </mesh>
                ))}
            </group>

            {/* Toppings */}
            {/* Egg half */}
            <group position={[0.5, 0.38, 0.3]} rotation={[-0.2, 0.5, 0]}>
                <mesh>
                    <sphereGeometry args={[0.12, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#f5f2e8" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                    <circleGeometry args={[0.08, 24]} />
                    <meshStandardMaterial color="#f5a020" roughness={0.25} />
                </mesh>
            </group>

            {/* Chashu (pork slice) */}
            <mesh position={[-0.45, 0.36, 0.35]} rotation={[-0.3, -0.4, 0.1]}>
                <cylinderGeometry args={[0.15, 0.15, 0.03, 24]} />
                <meshStandardMaterial color="#8b4a30" roughness={0.5} />
            </mesh>

            {/* Nori (seaweed) */}
            <mesh position={[-0.3, 0.5, -0.4]} rotation={[0.3, 0.2, 0.1]}>
                <planeGeometry args={[0.25, 0.35]} />
                <meshStandardMaterial color="#1a2a18" roughness={0.7} side={THREE.DoubleSide} />
            </mesh>

            {/* Green onions */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const r = 0.4 + Math.random() * 0.4;
                return (
                    <mesh key={i} position={[Math.cos(angle) * r, 0.36, Math.sin(angle) * r]} rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}>
                        <torusGeometry args={[0.02, 0.008, 8, 16]} />
                        <meshStandardMaterial color="#4a8b3a" roughness={0.5} />
                    </mesh>
                );
            })}

            {/* Narutomaki */}
            <mesh position={[0.35, 0.38, -0.35]} rotation={[-0.1, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
                <meshStandardMaterial color="#f8f0e0" roughness={0.35} />
            </mesh>

            {/* Steam particles */}
            <SteamEffect position={[0, 0.6, 0]} />

            {/* Bowl glow */}
            <pointLight position={[0, 0.3, 0]} intensity={0.5} color="#ff6030" distance={3} decay={2} />
        </group>
    );
}

// ========================================
// STEAM EFFECT
// ========================================
function SteamEffect({ position }: { position: [number, number, number] }) {
    const steamRef = useRef<THREE.Group>(null);

    const particles = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            x: (Math.random() - 0.5) * 0.6,
            z: (Math.random() - 0.5) * 0.6,
            speed: 0.3 + Math.random() * 0.4,
            size: 0.04 + Math.random() * 0.06,
            phase: Math.random() * Math.PI * 2
        }));
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (steamRef.current) {
            steamRef.current.children.forEach((child, i) => {
                const p = particles[i];
                const mesh = child as THREE.Mesh;
                const cycleT = ((t * p.speed + p.phase) % 2) / 2;
                mesh.position.y = cycleT * 0.8;
                mesh.position.x = p.x + Math.sin(t * 2 + p.phase) * 0.05;
                mesh.position.z = p.z + Math.cos(t * 2 + p.phase) * 0.05;
                mesh.scale.setScalar(p.size * (1 - cycleT * 0.5));
                (mesh.material as THREE.MeshBasicMaterial).opacity = 0.15 * (1 - cycleT);
            });
        }
    });

    return (
        <group ref={steamRef} position={position}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, 0, p.z]}>
                    <sphereGeometry args={[p.size, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
                </mesh>
            ))}
        </group>
    );
}

// ========================================
// RESPONSIVE CAMERA
// ========================================
function ResponsiveCamera() {
    const { camera, pointer, size } = useThree();
    const isMobile = size.width < 768;

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Smooth camera movement
        const targetX = pointer.x * 0.08;
        const targetY = 1.5 + pointer.y * 0.05;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);

        // Look at center
        camera.lookAt(0, 0.3, 0);

        // Responsive FOV
        const targetFov = isMobile ? 55 : 45;
        (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
            (camera as THREE.PerspectiveCamera).fov,
            targetFov,
            0.02
        );
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    });

    return null;
}

// ========================================
// MAIN SCENE EXPORT
// ========================================
export default function Hero3DScene() {
    return (
        <div className="hero-3d-container">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 1.8, 5.5], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.15
                }}
            >
                <Suspense fallback={null}>
                    {/* Ambient light */}
                    <ambientLight intensity={0.4} />

                    {/* Key light - warm */}
                    <directionalLight
                        position={[5, 10, 5]}
                        intensity={1.8}
                        color="#fff5e6"
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />

                    {/* Fill light */}
                    <directionalLight
                        position={[-5, 8, -3]}
                        intensity={0.6}
                        color="#ffd0a0"
                    />

                    {/* Rim light */}
                    <pointLight position={[-6, 4, -4]} intensity={0.5} color="#ff6030" />

                    {/* Top accent */}
                    <spotLight
                        position={[0, 12, 2]}
                        intensity={0.8}
                        angle={0.4}
                        penumbra={0.6}
                        color="#ffffff"
                    />

                    {/* Large background bowl on left */}
                    <LargeBackgroundBowl />

                    {/* Main ramen bowl in center */}
                    <RealisticRamenBowl />

                    {/* Camera controller */}
                    <ResponsiveCamera />

                    {/* Environment for reflections */}
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>

            <style jsx>{`
                .hero-3d-container {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    background: linear-gradient(
                        160deg,
                        #000000 0%,
                        #0a0504 20%,
                        #12080a 45%,
                        #080404 70%,
                        #000000 100%
                    );
                    overflow: hidden;
                }
                .hero-3d-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(ellipse at 65% 40%, rgba(200, 50, 20, 0.08) 0%, transparent 55%),
                        radial-gradient(ellipse at 25% 60%, rgba(220, 140, 40, 0.06) 0%, transparent 45%);
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
