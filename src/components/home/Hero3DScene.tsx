// @ts-nocheck
'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// LUXURY ASIAN RESTAURANT HERO BACKGROUND
// Cinematic photorealistic 3D floating bowl
// ============================================

// ========================================
// CERAMIC BOWL - Wide, shallow, centered
// ========================================
function CeramicBowl() {
    const groupRef = useRef<THREE.Group>(null);
    const { size } = useThree();
    const isMobile = size.width < 768;

    // Bowl geometry - wide and shallow restaurant ramen size
    const bowlGeometry = useMemo(() => {
        const points: THREE.Vector2[] = [];
        const segments = 60;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const y = -0.6 + t * 1.2; // Shallow bowl
            let x: number;

            if (t < 0.1) {
                // Flat bottom
                x = 0.1 + Math.pow(t / 0.1, 0.5) * 0.4;
            } else if (t < 0.85) {
                // Wide curved body
                const blend = (t - 0.1) / 0.75;
                x = 0.5 + blend * 1.3 + Math.sin(blend * Math.PI * 0.7) * 0.2;
            } else {
                // Thick rim
                const rimT = (t - 0.85) / 0.15;
                x = 1.8 + Math.sin(rimT * Math.PI * 0.5) * 0.08;
            }
            points.push(new THREE.Vector2(x, y));
        }
        return new THREE.LatheGeometry(points, 128);
    }, []);

    // Inner bowl geometry
    const innerBowlGeometry = useMemo(() => {
        const points: THREE.Vector2[] = [];
        const segments = 60;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const y = -0.55 + t * 1.1;
            let x: number;

            if (t < 0.1) {
                x = 0.08 + Math.pow(t / 0.1, 0.5) * 0.38;
            } else if (t < 0.85) {
                const blend = (t - 0.1) / 0.75;
                x = 0.46 + blend * 1.22 + Math.sin(blend * Math.PI * 0.7) * 0.18;
            } else {
                const rimT = (t - 0.85) / 0.15;
                x = 1.68 + rimT * 0.06;
            }
            points.push(new THREE.Vector2(x, y));
        }
        return new THREE.LatheGeometry(points, 128);
    }, []);

    // Gentle floating animation
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 0.3) * 0.02;
            groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.01;
        }
    });

    const scale = isMobile ? 0.8 : 1.0;

    return (
        <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0.12, 0, 0]} scale={scale}>
            {/* Outer bowl - Deep dark red/maroon ceramic */}
            <mesh geometry={bowlGeometry} castShadow receiveShadow>
                <meshPhysicalMaterial
                    color="#3a1515"
                    roughness={0.35}
                    metalness={0.0}
                    clearcoat={0.6}
                    clearcoatRoughness={0.25}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner bowl - Off-white/cream */}
            <mesh geometry={innerBowlGeometry}>
                <meshPhysicalMaterial
                    color="#f5f0e8"
                    roughness={0.4}
                    metalness={0.0}
                    clearcoat={0.3}
                    clearcoatRoughness={0.3}
                    side={THREE.FrontSide}
                />
            </mesh>

            {/* Rim pattern band - subtle geometric Asian pattern */}
            <mesh position={[0, 0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.72, 0.025, 16, 128]} />
                <meshStandardMaterial
                    color="#8b4513"
                    roughness={0.5}
                    metalness={0.1}
                />
            </mesh>

            {/* Inner pattern ring */}
            {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 1.65, 0.48, Math.sin(angle) * 1.65]}
                        rotation={[Math.PI / 2, 0, angle]}
                    >
                        <boxGeometry args={[0.08, 0.03, 0.01]} />
                        <meshStandardMaterial color="#654321" roughness={0.6} />
                    </mesh>
                );
            })}

            {/* Broth */}
            <Broth />

            {/* Noodles in bowl */}
            <NoodleBed />

            {/* Inner glow light */}
            <pointLight position={[0, 0.1, 0]} intensity={0.8} color="#ff8c42" distance={3} />
        </group>
    );
}

// ========================================
// BROTH - Warm amber/golden
// ========================================
function Broth() {
    const brothRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (brothRef.current) {
            const t = state.clock.elapsedTime;
            const geo = brothRef.current.geometry as THREE.CircleGeometry;
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const dist = Math.sqrt(x * x + y * y);
                const wave = Math.sin(dist * 2 - t * 0.5) * 0.003;
                pos.setZ(i, wave);
            }
            pos.needsUpdate = true;
        }
    });

    return (
        <mesh ref={brothRef} position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.65, 96, 96]} />
            <meshPhysicalMaterial
                color="#c9860a"
                roughness={0.15}
                metalness={0.05}
                transmission={0.2}
                thickness={1.5}
                transparent
                opacity={0.92}
            />
        </mesh>
    );
}

// ========================================
// NOODLE BED - Dense golden noodles
// ========================================
function NoodleBed() {
    const noodlesRef = useRef<THREE.Group>(null);

    const strands = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 35; i++) {
            const startAngle = (i / 35) * Math.PI * 2 + Math.random() * 0.4;
            const startR = 0.15 + Math.random() * 1.3;
            const pts = [];
            for (let j = 0; j < 14; j++) {
                const t = j / 13;
                const spiralAngle = startAngle + t * (Math.random() - 0.5) * 4.0;
                const r = startR * (1 - t * 0.25) + (Math.random() - 0.5) * 0.2;
                const y = 0.18 + Math.sin(t * Math.PI) * 0.05 - t * 0.12;
                pts.push(new THREE.Vector3(
                    Math.cos(spiralAngle) * r,
                    y + (Math.random() - 0.5) * 0.02,
                    Math.sin(spiralAngle) * r
                ));
            }
            arr.push({
                curve: new THREE.CatmullRomCurve3(pts),
                radius: 0.012 + Math.random() * 0.006,
                colorVariation: Math.random() * 0.1,
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (noodlesRef.current) {
            noodlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.005;
        }
    });

    return (
        <group ref={noodlesRef}>
            {strands.map((s, i) => (
                <mesh key={i} castShadow>
                    <tubeGeometry args={[s.curve, 14, s.radius, 8, false]} />
                    <meshPhysicalMaterial
                        color={new THREE.Color().setHSL(0.12, 0.7, 0.55 + s.colorVariation)}
                        roughness={0.25}
                        metalness={0.0}
                        clearcoat={0.5}
                        clearcoatRoughness={0.2}
                        transmission={0.05}
                    />
                </mesh>
            ))}
        </group>
    );
}

// ========================================
// CHOPSTICKS WITH LIFTING NOODLES (CRITICAL)
// ========================================
function ChopsticksWithNoodles() {
    const groupRef = useRef<THREE.Group>(null);
    const noodlesRef = useRef<THREE.Group>(null);

    // Noodle strands being lifted
    const liftingNoodles = useMemo(() => {
        const strands = [];
        const count = 18;

        for (let i = 0; i < count; i++) {
            const angleOffset = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
            const spread = 0.004 + Math.random() * 0.006;
            const startX = Math.cos(angleOffset) * spread;
            const startZ = Math.sin(angleOffset) * spread;
            const length = 1.2 + Math.random() * 0.8;
            const segments = 20;
            const points = [];
            const waviness = 0.008 + Math.random() * 0.015;

            for (let j = 0; j < segments; j++) {
                const t = j / (segments - 1);
                const gravityDrop = t * t * length * 0.7 + t * length * 0.3;
                const spreadFactor = Math.pow(t, 1.5);
                const maxSpread = 0.12 + Math.random() * 0.08;
                const xSpread = startX + Math.cos(angleOffset + t * 0.6) * maxSpread * spreadFactor;
                const zSpread = startZ + Math.sin(angleOffset + t * 0.5) * maxSpread * spreadFactor * 0.7;
                const wave = Math.sin(t * Math.PI * 3.5 + i * 1.1) * waviness * t;

                points.push(new THREE.Vector3(xSpread + wave, -gravityDrop, zSpread));
            }

            strands.push({
                curve: new THREE.CatmullRomCurve3(points),
                points,
                basePoints: points.map(p => p.clone()),
                radius: 0.010 + Math.random() * 0.005,
                phase: Math.random() * Math.PI * 2,
                swingSpeed: 0.25 + Math.random() * 0.2,
                swingAmount: 0.025 + Math.random() * 0.02,
            });
        }
        return strands;
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            // Slow elegant lift animation - perfect loop
            const liftCycle = (t * 0.15) % (Math.PI * 2);
            const liftHeight = Math.sin(liftCycle) * 0.12;
            groupRef.current.position.y = 1.0 + liftHeight;

            // Tiny micro movement
            groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.008;
        }

        // Animate noodles with realistic physics
        if (noodlesRef.current) {
            noodlesRef.current.children.forEach((child, i) => {
                if (i >= liftingNoodles.length) return;
                const mesh = child as THREE.Mesh;
                const strand = liftingNoodles[i];

                strand.points.forEach((point, j) => {
                    if (j === 0) return;
                    const base = strand.basePoints[j];
                    const depth = j / strand.points.length;
                    const tensionFactor = Math.pow(depth, 1.3);

                    // Gentle oscillation and sway
                    const swing = Math.sin(t * strand.swingSpeed + strand.phase) * strand.swingAmount * tensionFactor;
                    const wobble = Math.sin(t * 0.5 + strand.phase + j * 0.15) * 0.008 * tensionFactor;

                    point.x = base.x + swing;
                    point.z = base.z + wobble;
                    point.y = base.y + Math.sin(t * 0.4 + strand.phase + j * 0.2) * 0.003 * tensionFactor;
                });

                const newCurve = new THREE.CatmullRomCurve3(strand.points);
                const newGeo = new THREE.TubeGeometry(newCurve, 18, strand.radius, 8, false);
                mesh.geometry.dispose();
                mesh.geometry = newGeo;
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, 1.0, 0.3]} rotation={[-0.15, 0.3, 0]}>
            {/* Wooden Chopsticks - Natural matte wood */}
            <group>
                {/* Left Chopstick */}
                <group position={[0.025, 0, 0]} rotation={[0, 0, -0.015]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.006, 0.018, 3.2, 12]} />
                        <meshStandardMaterial
                            color="#8b5a2b"
                            roughness={0.85}
                            metalness={0.0}
                        />
                    </mesh>
                    {/* Wood grain lines */}
                    {[0, 0.4, 0.8, 1.2].map((offset, i) => (
                        <mesh key={i} position={[0.007, offset - 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.001, 0.001, 0.015, 8]} />
                            <meshStandardMaterial color="#6b4423" roughness={0.9} />
                        </mesh>
                    ))}
                </group>

                {/* Right Chopstick */}
                <group position={[-0.025, 0, 0]} rotation={[0, 0, 0.015]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.006, 0.018, 3.2, 12]} />
                        <meshStandardMaterial
                            color="#8b5a2b"
                            roughness={0.85}
                            metalness={0.0}
                        />
                    </mesh>
                </group>
            </group>

            {/* Lifting Noodles */}
            <group ref={noodlesRef} position={[0, -0.05, 0]}>
                {liftingNoodles.map((strand, i) => (
                    <mesh key={i} castShadow>
                        <tubeGeometry args={[strand.curve, 18, strand.radius, 8, false]} />
                        <meshPhysicalMaterial
                            color="#e8c547"
                            roughness={0.22}
                            metalness={0.0}
                            clearcoat={0.6}
                            clearcoatRoughness={0.15}
                            transmission={0.06}
                            thickness={0.3}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

// ========================================
// VOLUMETRIC STEAM
// ========================================
function VolumetricSteam() {
    const steamRef = useRef<THREE.Group>(null);

    const particles = useMemo(() => Array.from({ length: 30 }, () => ({
        x: (Math.random() - 0.5) * 2.0,
        y: 0.5 + Math.random() * 1.5,
        z: (Math.random() - 0.5) * 2.0,
        scale: 0.15 + Math.random() * 0.25,
        speed: 0.002 + Math.random() * 0.003,
        opacity: 0.012 + Math.random() * 0.012,
        rotSpeed: (Math.random() - 0.5) * 0.02,
    })), []);

    useFrame((state) => {
        if (!steamRef.current) return;
        const t = state.clock.elapsedTime;

        steamRef.current.children.forEach((child, i) => {
            const mesh = child as THREE.Mesh;
            const p = particles[i];

            // Slow upward movement with gentle swirl
            mesh.position.y += p.speed;
            mesh.position.x += Math.sin(t * 0.3 + i * 0.5) * 0.0003;
            mesh.rotation.z += p.rotSpeed;

            // Expand as it rises
            mesh.scale.x += 0.0008;
            mesh.scale.z += 0.0008;

            const mat = mesh.material as THREE.MeshBasicMaterial;

            // Fade out as it rises
            if (mesh.position.y > 3.5) {
                mat.opacity -= 0.0008;
            }

            // Reset when fully faded or too high
            if (mat.opacity <= 0 || mesh.position.y > 4.5) {
                mesh.position.set(
                    (Math.random() - 0.5) * 1.4,
                    0.4,
                    (Math.random() - 0.5) * 1.4
                );
                mesh.scale.setScalar(p.scale);
                mat.opacity = p.opacity;
            }
        });
    });

    return (
        <group ref={steamRef} position={[0, 0.3, 0]}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
                    <icosahedronGeometry args={[1, 3]} />
                    <meshBasicMaterial
                        color="#ffddcc"
                        transparent
                        opacity={p.opacity}
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    );
}

// ========================================
// CINEMATIC CAMERA RIG
// ========================================
function CinematicCamera() {
    const { camera, size } = useThree();
    const isMobile = size.width < 768;

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Very subtle micro parallax
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(t * 0.05) * 0.02, 0.005);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.8 + Math.sin(t * 0.08) * 0.01, 0.005);
        camera.lookAt(0, 0.2, 0);

        const targetFov = isMobile ? 50 : 38;
        (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
            (camera as THREE.PerspectiveCamera).fov,
            targetFov,
            0.01
        );
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    });

    return null;
}

// ========================================
// MAIN COMPONENT
// ========================================
export default function Hero3DScene() {
    return (
        <div className="hero-3d-container">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0.8, 4.5], fov: 38 }}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
                <Suspense fallback={null}>
                    {/* Cinematic Warm Lighting - Only warm tones */}
                    <ambientLight intensity={0.15} color="#ff9966" />

                    {/* Primary warm light from inside bowl */}
                    <pointLight position={[0, 0.2, 0]} intensity={1.2} color="#ff8040" distance={5} />

                    {/* Rim light - warm outline */}
                    <directionalLight position={[3, 4, 2]} intensity={0.6} color="#ffcc99" />
                    <directionalLight position={[-3, 3, -2]} intensity={0.3} color="#ff9966" />

                    {/* Top accent */}
                    <spotLight
                        position={[0, 5, 1]}
                        intensity={0.4}
                        angle={0.5}
                        penumbra={0.8}
                        color="#ffaa66"
                    />

                    {/* Scene Elements */}
                    <CeramicBowl />
                    <ChopsticksWithNoodles />
                    <VolumetricSteam />
                    <CinematicCamera />
                </Suspense>
            </Canvas>

            <style jsx>{`
                .hero-3d-container {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    background: linear-gradient(
                        180deg,
                        #000000 0%,
                        #0a0604 25%,
                        #0d0806 50%,
                        #080503 75%,
                        #000000 100%
                    );
                    overflow: hidden;
                }
                .hero-3d-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        ellipse at 50% 60%,
                        rgba(255, 128, 64, 0.08) 0%,
                        transparent 50%
                    );
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
