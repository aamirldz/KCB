// @ts-nocheck
'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// HYPER-REALISTIC RAMEN BOWL
// Ultra-detailed with photorealistic materials
// ============================================

function HyperRealisticBowl({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const brothRef = useRef<THREE.Mesh>(null);
    const steamRef = useRef<THREE.Group>(null);
    const { pointer } = useThree();

    // Premium bowl geometry with ultra-smooth curves
    const bowlGeometry = useMemo(() => {
        const points = [];
        const segments = 40;
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            // Bowl profile curve - wider at top, narrow at bottom
            const y = -1.0 + t * 2.1;
            let x;
            if (t < 0.15) {
                // Bottom curve
                x = 0.08 + Math.pow(t / 0.15, 0.5) * 0.45;
            } else if (t < 0.85) {
                // Main body curve
                const blend = (t - 0.15) / 0.7;
                x = 0.53 + blend * 0.95 + Math.sin(blend * Math.PI) * 0.15;
            } else {
                // Rim curve
                const rimT = (t - 0.85) / 0.15;
                x = 1.48 + rimT * 0.18 - Math.pow(rimT, 2) * 0.06;
            }
            points.push(new THREE.Vector2(x, y));
        }
        // Inner rim curve (for thickness)
        for (let i = segments; i >= 0; i--) {
            const t = i / segments;
            const y = -1.0 + t * 2.1;
            let x;
            if (t < 0.15) {
                x = 0.06 + Math.pow(t / 0.15, 0.5) * 0.42;
            } else if (t < 0.85) {
                const blend = (t - 0.15) / 0.7;
                x = 0.48 + blend * 0.88 + Math.sin(blend * Math.PI) * 0.12;
            } else {
                const rimT = (t - 0.85) / 0.15;
                x = 1.36 + rimT * 0.12;
            }
            points.push(new THREE.Vector2(x, y - 0.04));
        }
        return new THREE.LatheGeometry(points.slice(0, segments + 1), 96);
    }, []);

    // Animation
    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            // Gentle floating
            const floatY = Math.sin(t * 0.22) * 0.028 + Math.sin(t * 0.38 + 0.4) * 0.014;
            groupRef.current.position.y = position[1] + floatY;
            groupRef.current.position.x = position[0] + Math.sin(t * 0.15) * 0.006;

            // Mouse-follow rotation
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.10 + pointer.y * 0.035, 0.012);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.012 + pointer.x * 0.05, 0.010);
        }

        // Broth surface waves
        if (brothRef.current) {
            const geo = brothRef.current.geometry;
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const dist = Math.sqrt(x * x + y * y);
                const wave = Math.sin(dist * 3.5 - t * 1.2) * 0.008 +
                    Math.sin(dist * 5 - t * 1.8 + 0.3) * 0.004 +
                    Math.cos(dist * 2.5 + t * 0.6) * 0.003;
                pos.setZ(i, wave);
            }
            pos.needsUpdate = true;
            geo.computeVertexNormals();
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Main Bowl - Glossy Black Ceramic */}
            <mesh geometry={bowlGeometry} castShadow receiveShadow>
                <meshPhysicalMaterial
                    color="#080808"
                    roughness={0.04}
                    metalness={0.01}
                    clearcoat={1}
                    clearcoatRoughness={0.01}
                    reflectivity={1.5}
                    envMapIntensity={3.0}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Luxury Gold Rim Bands */}
            <GoldRimDetails />

            {/* Decorative Dragon Pattern */}
            <DragonAccents />

            {/* Deep Broth Base */}
            <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.42, 96]} />
                <meshPhysicalMaterial color="#4a1800" roughness={0.22} transparent opacity={0.9} />
            </mesh>

            {/* Shimmering Broth Surface */}
            <mesh ref={brothRef} position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.44, 128, 128]} />
                <meshPhysicalMaterial
                    color="#a04810"
                    roughness={0.06}
                    metalness={0.05}
                    transmission={0.25}
                    thickness={2.5}
                    clearcoat={1}
                    clearcoatRoughness={0.02}
                    ior={1.42}
                    transparent
                    opacity={0.96}
                />
            </mesh>

            {/* Chili Oil Shimmer */}
            <ChiliOilLayer />

            {/* Dense Noodle Bed */}
            <NoodleBedDetailed />

            {/* Chopsticks with 32 Lifting Noodles */}
            <ChopsticksWithNoodles />

            {/* Premium Toppings */}
            <DetailedToppings />

            {/* Volumetric Steam */}
            <RealisticSteam />

            {/* Inner glow */}
            <pointLight position={[0, 0.15, 0]} intensity={0.3} color="#ff4400" distance={3.5} />
        </group>
    );
}

// Luxury Gold Rim Details
function GoldRimDetails() {
    return (
        <group>
            {/* Main Gold Band */}
            <mesh position={[0, 1.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.62, 0.032, 32, 200]} />
                <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.04} emissive="#c9a000" emissiveIntensity={0.5} />
            </mesh>
            {/* Secondary Band */}
            <mesh position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.58, 0.022, 24, 180]} />
                <meshStandardMaterial color="#ffd700" metalness={0.98} roughness={0.08} emissive="#daa520" emissiveIntensity={0.3} />
            </mesh>
            {/* Tertiary Accent */}
            <mesh position={[0, 0.96, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.54, 0.014, 20, 160]} />
                <meshStandardMaterial color="#b8860b" metalness={0.95} roughness={0.12} />
            </mesh>
            {/* Inner Rim Highlight */}
            <mesh position={[0, 0.90, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.50, 0.010, 18, 140]} />
                <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.15} />
            </mesh>
        </group>
    );
}

// Dragon Pattern Accents
function DragonAccents() {
    return (
        <group>
            {Array.from({ length: 20 }, (_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const yPos = 0.5 + (i % 5) * 0.06;
                const size = 0.04 + (i % 4) * 0.015;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 1.56, yPos, Math.sin(angle) * 1.56]}
                        rotation={[0, -angle + Math.PI / 2, 0]}
                    >
                        <boxGeometry args={[size, 0.12 + (i % 3) * 0.04, 0.01]} />
                        <meshStandardMaterial color="#c9a000" metalness={0.88} roughness={0.18} emissive="#8b6914" emissiveIntensity={0.12} />
                    </mesh>
                );
            })}
        </group>
    );
}

// Chili Oil Layer
function ChiliOilLayer() {
    const oilRef = useRef<THREE.InstancedMesh>(null);
    const drops = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 25; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 1.25;
            arr.push({
                x: Math.cos(angle) * r,
                z: Math.sin(angle) * r,
                scale: 0.02 + Math.random() * 0.05,
                speed: 0.1 + Math.random() * 0.15,
                phase: Math.random() * Math.PI * 2,
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!oilRef.current) return;
        const t = state.clock.elapsedTime;
        const dummy = new THREE.Object3D();
        drops.forEach((d, i) => {
            const drift = Math.sin(t * d.speed + d.phase) * 0.015;
            dummy.position.set(d.x + drift, 0.40, d.z + Math.cos(t * d.speed * 0.8 + d.phase) * 0.012);
            dummy.scale.setScalar(d.scale);
            dummy.rotation.x = -Math.PI / 2;
            dummy.updateMatrix();
            oilRef.current!.setMatrixAt(i, dummy.matrix);
        });
        oilRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={oilRef} args={[undefined, undefined, drops.length]}>
            <circleGeometry args={[1, 20]} />
            <meshPhysicalMaterial color="#ff2800" roughness={0.03} metalness={0.1} transparent opacity={0.55} side={THREE.DoubleSide} />
        </instancedMesh>
    );
}

// Dense Noodle Bed
function NoodleBedDetailed() {
    const noodlesRef = useRef<THREE.Group>(null);
    const strands = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 24; i++) {
            const startAngle = (i / 24) * Math.PI * 2 + Math.random() * 0.5;
            const startR = 0.1 + Math.random() * 1.1;
            const pts = [];
            for (let j = 0; j < 16; j++) {
                const t = j / 15;
                const spiralAngle = startAngle + t * (Math.random() - 0.5) * 5.0;
                const r = startR * (1 - t * 0.35) + (Math.random() - 0.5) * 0.25;
                const y = 0.36 + Math.sin(t * Math.PI) * 0.06 - t * 0.18;
                pts.push(new THREE.Vector3(
                    Math.cos(spiralAngle) * r,
                    y + (Math.random() - 0.5) * 0.025,
                    Math.sin(spiralAngle) * r
                ));
            }
            arr.push({
                curve: new THREE.CatmullRomCurve3(pts),
                radius: 0.010 + Math.random() * 0.006,
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (noodlesRef.current) {
            noodlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.008;
        }
    });

    return (
        <group ref={noodlesRef}>
            {strands.map((s, i) => (
                <mesh key={i} castShadow>
                    <tubeGeometry args={[s.curve, 16, s.radius, 8, false]} />
                    <meshPhysicalMaterial
                        color="#f8e4c0"
                        roughness={0.28}
                        metalness={0.008}
                        clearcoat={0.7}
                        clearcoatRoughness={0.15}
                    />
                </mesh>
            ))}
        </group>
    );
}

// ============================================
// CHOPSTICKS WITH 32 REALISTIC LIFTING NOODLES
// ============================================
function ChopsticksWithNoodles() {
    const groupRef = useRef<THREE.Group>(null);
    const noodlesRef = useRef<THREE.Group>(null);
    const dripsRef = useRef<THREE.Group>(null);

    // 32 noodle strands with enhanced physics
    const noodles = useMemo(() => {
        const strands = [];
        const count = 32;

        for (let i = 0; i < count; i++) {
            const angleOffset = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
            const startSpread = 0.003 + Math.random() * 0.004;
            const startX = Math.cos(angleOffset) * startSpread;
            const startZ = Math.sin(angleOffset) * startSpread;
            const length = 0.9 + Math.random() * 0.7;
            const segments = 22;
            const points = [];
            const curveBias = (Math.random() - 0.5) * 0.18;
            const waviness = 0.006 + Math.random() * 0.014;

            for (let j = 0; j < segments; j++) {
                const t = j / (segments - 1);
                const gravityDrop = t * t * length * 0.65 + t * length * 0.35;
                const spreadFactor = Math.pow(t, 1.6);
                const maxSpread = 0.10 + Math.random() * 0.06;
                const xSpread = startX + (Math.cos(angleOffset + t * 0.7) + curveBias) * maxSpread * spreadFactor;
                const zSpread = startZ + Math.sin(angleOffset + t * 0.55) * maxSpread * spreadFactor * 0.75;
                const wave = Math.sin(t * Math.PI * 4 + i * 0.9) * waviness * t;
                const twist = Math.cos(t * Math.PI * 3 + i * 0.7) * waviness * 0.8 * t;

                points.push(new THREE.Vector3(xSpread + wave, -gravityDrop, zSpread + twist));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            strands.push({
                curve,
                points,
                basePoints: points.map(p => p.clone()),
                radius: 0.009 + Math.random() * 0.005,
                phase: Math.random() * Math.PI * 2,
                swingSpeed: 0.35 + Math.random() * 0.35,
                swingAmount: 0.035 + Math.random() * 0.035,
                wobbleSpeed: 0.7 + Math.random() * 0.6,
                wobbleAmount: 0.012 + Math.random() * 0.012,
                vibrateSpeed: 2.2 + Math.random() * 2.2,
                vibrateAmount: 0.004 + Math.random() * 0.004,
                delay: i * 0.055,
            });
        }
        return strands;
    }, []);

    // Dripping broth
    const drips = useMemo(() => Array.from({ length: 10 }, () => ({
        x: (Math.random() - 0.5) * 0.12,
        y: -0.15 - Math.random() * 1.0,
        z: (Math.random() - 0.5) * 0.1,
        speed: 0.007 + Math.random() * 0.007,
        size: 0.006 + Math.random() * 0.01,
        wobblePhase: Math.random() * Math.PI * 2,
    })), []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            // Lifting motion
            const primaryLift = Math.sin(t * 0.20) * 0.18;
            const secondaryLift = Math.sin(t * 0.45) * 0.06;
            const breathe = Math.sin(t * 0.75) * 0.02;
            groupRef.current.position.y = 1.55 + primaryLift + secondaryLift + breathe;

            groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.035;
            groupRef.current.rotation.x = -0.30 + Math.sin(t * 0.15) * 0.035;
            groupRef.current.rotation.y = 0.45 + Math.sin(t * 0.10) * 0.03;
        }

        // Animate noodles
        if (noodlesRef.current) {
            noodlesRef.current.children.forEach((child, i) => {
                if (i >= noodles.length) return;
                const mesh = child as THREE.Mesh;
                const strand = noodles[i];

                strand.points.forEach((point, j) => {
                    if (j === 0) return;
                    const base = strand.basePoints[j];
                    const depth = j / strand.points.length;
                    const tensionFactor = Math.pow(depth, 1.25);
                    const delayedT = t - (strand.delay || 0) * 0.5;

                    const primarySwing = Math.sin(delayedT * strand.swingSpeed + strand.phase) * strand.swingAmount * tensionFactor;
                    const secondaryWobble = Math.sin(delayedT * strand.wobbleSpeed + strand.phase + j * 0.22) * strand.wobbleAmount * tensionFactor;
                    const tipFactor = Math.pow(depth, 1.7);
                    const microVibrate = Math.sin(delayedT * strand.vibrateSpeed + strand.phase + j * 0.38) * strand.vibrateAmount * tipFactor;
                    const inertiaWave = Math.sin(delayedT * 0.32 + i * 0.11 + j * 0.095) * 0.012 * tensionFactor;

                    point.x = base.x + primarySwing + microVibrate + inertiaWave * 0.5;
                    point.z = base.z + secondaryWobble + inertiaWave;
                    point.y = base.y + Math.sin(delayedT * 1.0 + strand.phase + j * 0.22) * 0.005 * tensionFactor;
                });

                const newCurve = new THREE.CatmullRomCurve3(strand.points);
                const newGeo = new THREE.TubeGeometry(newCurve, 16, strand.radius, 8, false);
                mesh.geometry.dispose();
                mesh.geometry = newGeo;
            });
        }

        // Animate drips
        if (dripsRef.current) {
            dripsRef.current.children.forEach((child, i) => {
                const mesh = child as THREE.Mesh;
                const drip = drips[i];
                mesh.position.y -= drip.speed;
                mesh.position.x += Math.sin(mesh.position.y * 5.5 + drip.wobblePhase) * 0.0006;
                mesh.scale.y = 1 + Math.max(0, (-mesh.position.y - 0.15)) * 0.7;
                mesh.scale.x = 1 - Math.max(0, (-mesh.position.y - 0.15)) * 0.1;
                mesh.scale.z = mesh.scale.x;
                if (mesh.position.y < -2.8) {
                    mesh.position.y = -0.06 - Math.random() * 0.45;
                    mesh.position.x = (Math.random() - 0.5) * 0.1;
                    mesh.scale.set(1, 1, 1);
                }
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, 1.55, 0.42]} rotation={[-0.30, 0.45, 0]}>
            {/* Premium Lacquered Chopsticks */}
            <group>
                {/* Left Chopstick */}
                <group position={[0.032, 0, 0]} rotation={[0, 0, -0.02]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.005, 0.022, 3.6, 20]} />
                        <meshStandardMaterial color="#1a0a04" roughness={0.25} />
                    </mesh>
                    {/* Tip */}
                    <mesh position={[0, -1.75, 0]}>
                        <cylinderGeometry args={[0.003, 0.005, 0.12, 16]} />
                        <meshPhysicalMaterial color="#0a0402" roughness={0.12} clearcoat={0.9} />
                    </mesh>
                    {/* Top decoration */}
                    <mesh position={[0, 1.72, 0]}>
                        <cylinderGeometry args={[0.024, 0.024, 0.15, 16]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.22} />
                    </mesh>
                    {/* Gold band */}
                    <mesh position={[0, 1.64, 0]}>
                        <cylinderGeometry args={[0.026, 0.026, 0.03, 16]} />
                        <meshStandardMaterial color="#ffd700" metalness={0.98} roughness={0.08} />
                    </mesh>
                </group>

                {/* Right Chopstick */}
                <group position={[-0.032, 0, 0]} rotation={[0, 0, 0.02]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.005, 0.022, 3.6, 20]} />
                        <meshStandardMaterial color="#1a0a04" roughness={0.25} />
                    </mesh>
                    <mesh position={[0, -1.75, 0]}>
                        <cylinderGeometry args={[0.003, 0.005, 0.12, 16]} />
                        <meshPhysicalMaterial color="#0a0402" roughness={0.12} clearcoat={0.9} />
                    </mesh>
                    <mesh position={[0, 1.72, 0]}>
                        <cylinderGeometry args={[0.024, 0.024, 0.15, 16]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.22} />
                    </mesh>
                    <mesh position={[0, 1.64, 0]}>
                        <cylinderGeometry args={[0.026, 0.026, 0.03, 16]} />
                        <meshStandardMaterial color="#ffd700" metalness={0.98} roughness={0.08} />
                    </mesh>
                </group>
            </group>

            {/* 32 Noodle Strands */}
            <group ref={noodlesRef} position={[0, -0.04, 0]}>
                {noodles.map((strand, i) => (
                    <mesh key={i} castShadow>
                        <tubeGeometry args={[strand.curve, 16, strand.radius, 8, false]} />
                        <meshPhysicalMaterial
                            color="#f5e0b0"
                            roughness={0.20}
                            metalness={0.006}
                            clearcoat={0.85}
                            clearcoatRoughness={0.06}
                            transmission={0.04}
                            thickness={0.25}
                            envMapIntensity={1.0}
                        />
                    </mesh>
                ))}
            </group>

            {/* Broth Drips */}
            <group ref={dripsRef} position={[0, -0.06, 0]}>
                {drips.map((drip, i) => (
                    <mesh key={i} position={[drip.x, drip.y, drip.z]}>
                        <sphereGeometry args={[drip.size, 16, 12]} />
                        <meshPhysicalMaterial color="#552000" roughness={0.06} transmission={0.5} transparent opacity={0.88} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

// Premium Toppings
function DetailedToppings() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.elapsedTime;
            groupRef.current.children.forEach((child, i) => {
                if (child.userData.baseY !== undefined) {
                    child.position.y = child.userData.baseY + Math.sin(t * 0.35 + i * 0.18) * 0.004;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {/* Soft-Boiled Egg (Ajitama) */}
            <group position={[0.72, 0.42, 0.5]} rotation={[-0.1, 0.65, 0.08]} userData={{ baseY: 0.42 }}>
                <mesh castShadow>
                    <sphereGeometry args={[0.22, 56, 40, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
                    <meshStandardMaterial color="#fff5e8" roughness={0.55} />
                </mesh>
                <mesh position={[0, -0.018, 0]}>
                    <ringGeometry args={[0.09, 0.20, 48]} />
                    <meshStandardMaterial color="#fffaf2" roughness={0.6} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, -0.022, 0]}>
                    <sphereGeometry args={[0.11, 40, 28]} />
                    <meshPhysicalMaterial color="#ff9000" roughness={0.12} metalness={0.02} clearcoat={1} clearcoatRoughness={0.04} emissive="#ff6000" emissiveIntensity={0.3} transmission={0.08} thickness={0.8} />
                </mesh>
            </group>

            {/* Chashu Pork */}
            <group position={[-0.70, 0.40, 0.70]} rotation={[-0.16, -0.60, 0.05]} userData={{ baseY: 0.40 }}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.32, 0.32, 0.06, 56]} />
                    <meshStandardMaterial color="#5a2010" roughness={0.45} />
                </mesh>
                <mesh position={[0, 0.035, 0]}>
                    <torusGeometry args={[0.24, 0.045, 16, 56]} />
                    <meshStandardMaterial color="#f0d0b0" roughness={0.35} />
                </mesh>
                {[0, 1.1, 2.4, 3.6, 4.8].map((angle, j) => (
                    <mesh key={j} position={[Math.cos(angle) * 0.2, 0.035, Math.sin(angle) * 0.2]} scale={[0.06, 0.01, 0.02]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="#150400" roughness={0.92} />
                    </mesh>
                ))}
            </group>

            {/* Nori Seaweed */}
            <mesh position={[-0.92, 0.68, -0.32]} rotation={[0.06, 0.48, 0.02]} castShadow userData={{ baseY: 0.68 }}>
                <boxGeometry args={[0.55, 0.6, 0.014]} />
                <meshStandardMaterial color="#020202" roughness={0.98} />
            </mesh>

            {/* Narutomaki */}
            <group position={[0.22, 0.40, 0.85]} rotation={[Math.PI / 2 - 0.08, 0, 0.35]} userData={{ baseY: 0.40 }}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.14, 0.14, 0.065, 44]} />
                    <meshStandardMaterial color="#fff2f8" roughness={0.45} />
                </mesh>
                <mesh position={[0, 0.035, 0]}>
                    <torusGeometry args={[0.06, 0.014, 12, 32, Math.PI * 1.9]} />
                    <meshStandardMaterial color="#ff6b9e" roughness={0.35} />
                </mesh>
                <mesh position={[0, 0.035, 0]}>
                    <sphereGeometry args={[0.026, 20, 16]} />
                    <meshStandardMaterial color="#ff6b9e" roughness={0.35} />
                </mesh>
            </group>

            {/* Green Onions */}
            {Array.from({ length: 22 }).map((_, i) => {
                const angle = (i / 22) * Math.PI * 2 + Math.random() * 0.6;
                const r = 0.35 + Math.random() * 0.9;
                return (
                    <mesh key={i} position={[Math.cos(angle) * r, 0.39, Math.sin(angle) * r]} rotation={[Math.random() * 0.25 - 0.12, Math.random() * Math.PI, 0]} userData={{ baseY: 0.39 }}>
                        <torusGeometry args={[0.03, 0.013, 10, 18]} />
                        <meshStandardMaterial color="#22c55e" roughness={0.55} />
                    </mesh>
                );
            })}

            {/* Menma (Bamboo) */}
            <mesh position={[0.85, 0.42, -0.50]} rotation={[0.12, 1.1, 0.1]} castShadow userData={{ baseY: 0.42 }}>
                <cylinderGeometry args={[0.045, 0.04, 0.32, 14]} />
                <meshStandardMaterial color="#c9a030" roughness={0.42} />
            </mesh>
            <mesh position={[0.78, 0.40, -0.58]} rotation={[0.18, 0.85, 0.06]} castShadow userData={{ baseY: 0.40 }}>
                <cylinderGeometry args={[0.04, 0.035, 0.28, 14]} />
                <meshStandardMaterial color="#d4b848" roughness={0.48} />
            </mesh>
        </group>
    );
}

// Realistic Volumetric Steam
function RealisticSteam() {
    const steamRef = useRef<THREE.Group>(null);
    const particles = useMemo(() => Array.from({ length: 20 }, () => ({
        x: (Math.random() - 0.5) * 2.0,
        y: 0.6 + Math.random() * 1.6,
        z: (Math.random() - 0.5) * 2.0,
        scale: 0.12 + Math.random() * 0.22,
        speed: 0.003 + Math.random() * 0.004,
        opacity: 0.018 + Math.random() * 0.016,
    })), []);

    useFrame(() => {
        if (!steamRef.current) return;
        steamRef.current.children.forEach((child, i) => {
            const mesh = child as THREE.Mesh;
            const p = particles[i];
            mesh.position.y += p.speed;
            mesh.scale.x += 0.0012;
            mesh.scale.z += 0.0012;
            const mat = mesh.material as THREE.MeshBasicMaterial;
            if (mesh.position.y > 3.0) mat.opacity -= 0.0012;
            if (mat.opacity <= 0 || mesh.position.y > 4.0) {
                mesh.position.set((Math.random() - 0.5) * 1.6, 0.5, (Math.random() - 0.5) * 1.6);
                mesh.scale.setScalar(p.scale);
                mat.opacity = p.opacity;
            }
        });
    });

    return (
        <group ref={steamRef} position={[0, 0.5, 0]}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
                    <icosahedronGeometry args={[1, 3]} />
                    <meshBasicMaterial color="#fff" transparent opacity={p.opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
}

// ========================================
// LARGE BACKGROUND BOWL (Left side - like reference image)
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

    // Responsive positioning - large on left side (matching reference image)
    const posX = isMobile ? -2 : isTablet ? -5 : -7.5;
    const posY = isMobile ? -1.5 : -2.5;
    const posZ = isMobile ? 0 : 2;
    const scale = isMobile ? 2.5 : isTablet ? 4.5 : 6.5;
    const rotX = isMobile ? 0.2 : 0.4;
    const rotY = isMobile ? 0.2 : 0.5;

    return (
        <group ref={groupRef} position={[posX, posY, posZ]} rotation={[rotX, rotY, 0]} scale={scale}>
            {/* Outer bowl - Bright tan/beige ceramic (matching reference) */}
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
                    metalness={0.95}
                    roughness={0.1}
                    emissive="#a08020"
                    emissiveIntensity={0.4}
                />
            </mesh>
        </group>
    );
}

// Responsive Bowl Container
function ResponsiveBowl() {
    const { size } = useThree();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;

    const posX = isMobile ? 0 : isTablet ? 0.45 : 0.7;
    const posY = isMobile ? 0.15 : -0.35;
    const scale = isMobile ? 1.7 : isTablet ? 2.3 : 2.8;

    return (
        <group position={[posX, posY, 0]}>
            <HyperRealisticBowl position={[0, 0, 0]} scale={scale} />
        </group>
    );
}

// Responsive Camera Rig
function ResponsiveCameraRig() {
    const { camera, pointer, size } = useThree();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;
    const lookX = isMobile ? 0 : isTablet ? 0.45 : 0.7;

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const targetX = isMobile ? 0 : pointer.x * 0.1 + Math.sin(t * 0.05) * 0.05;
        const targetY = pointer.y * 0.1 + 0.28;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.006);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.006);
        camera.lookAt(lookX, 0.28, 0);

        const targetFov = isMobile ? 46 : isTablet ? 36 : 30;
        (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
            (camera as THREE.PerspectiveCamera).fov,
            targetFov,
            0.012
        );
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    });

    return null;
}

export default function Hero3DScene() {
    return (
        <div className="hero-3d-container">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 1.3, 6.0], fov: 30 }}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
                <Suspense fallback={null}>
                    {/* Premium Multi-Point Lighting */}
                    <ambientLight intensity={0.38} />
                    <directionalLight position={[7, 14, 7]} intensity={1.5} color="#fffcea" castShadow />
                    <directionalLight position={[-5, 10, -5]} intensity={0.6} color="#ffd4a8" />
                    <pointLight position={[-7, 7, -7]} intensity={0.6} color="#ff5020" />
                    <pointLight position={[5, 5, 5]} intensity={0.35} color="#fff8e0" />
                    <spotLight position={[0, 12, 0]} intensity={0.5} angle={0.4} penumbra={0.6} color="#fff" />

                    {/* Large Background Bowl on Left (like reference image) */}
                    <LargeBackgroundBowl />
                    <ResponsiveBowl />
                    <ResponsiveCameraRig />
                </Suspense>
            </Canvas>

            <style jsx>{`
                .hero-3d-container {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    background: linear-gradient(145deg, #000000 0%, #080402 20%, #100804 45%, #0a0502 70%, #000000 100%);
                    overflow: hidden;
                }
                .hero-3d-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse at 65% 45%, rgba(185, 28, 28, 0.10) 0%, transparent 55%),
                                radial-gradient(ellipse at 25% 65%, rgba(217, 119, 6, 0.06) 0%, transparent 45%);
                    pointer-events: none;
                }
                .hero-3d-container::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 58% 48%, rgba(255, 90, 40, 0.05) 0%, transparent 40%);
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
