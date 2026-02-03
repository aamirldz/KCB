// @ts-nocheck
'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// PHOTOREALISTIC RAMEN BOWL
// Ultra-detailed with PBR materials
// ============================================

function PhotorealisticBowl({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const brothRef = useRef<THREE.Mesh>(null);
    const { pointer } = useThree();

    // Ultra-smooth bowl geometry with rim detail
    const bowlGeometry = useMemo(() => {
        const points = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const y = -1.0 + t * 2.15;
            let x;

            if (t < 0.12) {
                // Flat bottom with slight curve
                x = 0.06 + Math.pow(t / 0.12, 0.6) * 0.48;
            } else if (t < 0.88) {
                // Main body - elegant curve
                const blend = (t - 0.12) / 0.76;
                x = 0.54 + blend * 1.02 + Math.sin(blend * Math.PI) * 0.18;
            } else {
                // Rim with lip detail
                const rimT = (t - 0.88) / 0.12;
                x = 1.56 + Math.sin(rimT * Math.PI * 0.5) * 0.12;
                if (rimT > 0.7) {
                    x -= (rimT - 0.7) * 0.15;
                }
            }
            points.push(new THREE.Vector2(x, y));
        }
        return new THREE.LatheGeometry(points, 128);
    }, []);

    // Animation
    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            // Ultra-smooth floating
            const floatY = Math.sin(t * 0.18) * 0.022 + Math.sin(t * 0.32 + 0.3) * 0.011 + Math.cos(t * 0.52) * 0.006;
            groupRef.current.position.y = position[1] + floatY;
            groupRef.current.position.x = position[0] + Math.sin(t * 0.12) * 0.004;

            // Subtle mouse follow
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.08 + pointer.y * 0.028, 0.008);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, t * 0.008 + pointer.x * 0.04, 0.006);
        }

        // Realistic broth waves
        if (brothRef.current) {
            const geo = brothRef.current.geometry;
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const dist = Math.sqrt(x * x + y * y);
                // Multi-frequency waves for realism
                const wave = Math.sin(dist * 2.8 - t * 0.9) * 0.010 +
                    Math.sin(dist * 4.5 - t * 1.4 + 0.2) * 0.005 +
                    Math.cos(dist * 2.0 + t * 0.5) * 0.004 +
                    Math.sin(x * 3 + t * 0.8) * 0.003 +
                    Math.cos(y * 2.5 - t * 0.6) * 0.002;
                pos.setZ(i, wave);
            }
            pos.needsUpdate = true;
            geo.computeVertexNormals();
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Main Bowl - Glossy Black Ceramic with Subsurface */}
            <mesh geometry={bowlGeometry} castShadow receiveShadow>
                <meshPhysicalMaterial
                    color="#050505"
                    roughness={0.025}
                    metalness={0.005}
                    clearcoat={1}
                    clearcoatRoughness={0.008}
                    reflectivity={2.0}
                    envMapIntensity={4.0}
                    sheen={0.5}
                    sheenRoughness={0.2}
                    sheenColor="#1a1a2e}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Luxury Gold Rim System */}
            <PremiumGoldRim />
            
            {/* Decorative Pattern */}
            <OrientalPattern />

            {/* Deep Broth Layers */}
            <mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.48, 128]} />
                <meshPhysicalMaterial color="#3a1200" roughness={0.2} transparent opacity={0.92} />
            </mesh>

            {/* Animated Broth Surface */}
            <mesh ref={brothRef} position={[0, 0.40, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.50, 160, 160]} />
                <meshPhysicalMaterial
                    color="#a85020"
                    roughness={0.04}
                    metalness={0.03}
                    transmission={0.2}
                    thickness={2.0}
                    clearcoat={1}
                    clearcoatRoughness={0.015}
                    ior={1.45}
                    transparent
                    opacity={0.97}
                />
            </mesh>

            {/* Chili Oil Layer */}
            <RealisticChiliOil />

            {/* Dense Noodle Bed */}
            <DenseNoodleBed />

            {/* 45 Lifting Noodles with Chopsticks */}
            <RealisticChopsticksNoodles />

            {/* Ultra-Detailed Toppings */}
            <PhotorealisticToppings />

            {/* Multi-Layer Steam */}
            <RealisticSteamSystem />

            {/* Bowl Inner Glow */}
            <pointLight position={[0, 0.2, 0]} intensity={0.35} color="#ff4000" distance={4} decay={2} />
        </group>
    );
}

// Premium Multi-Band Gold Rim
function PremiumGoldRim() {
    return (
        <group>
            {/* Primary Outer Band */}
            <mesh position={[0, 1.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.66, 0.038, 40, 220]} />
                <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.02} emissive="#d4a600" emissiveIntensity={0.6} />
            </mesh>
            {/* Secondary Band */}
            <mesh position={[0, 1.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.62, 0.026, 32, 200]} />
                <meshStandardMaterial color="#ffd700" metalness={0.98} roughness={0.05} emissive="#c9a000" emissiveIntensity={0.4} />
            </mesh>
            {/* Tertiary Accent */}
            <mesh position={[0, 1.00, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.58, 0.018, 28, 180]} />
                <meshStandardMaterial color="#b8860b" metalness={0.96} roughness={0.08} />
            </mesh>
            {/* Inner Highlight */}
            <mesh position={[0, 0.94, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.54, 0.012, 24, 160]} />
                <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.12} />
            </mesh>
            {/* Bottom Accent */}
            <mesh position={[0, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.52, 0.008, 20, 140]} />
                <meshStandardMaterial color="#daa520" metalness={0.88} roughness={0.15} />
            </mesh>
        </group>
    );
}

// Oriental Decorative Pattern
function OrientalPattern() {
    return (
        <group>
            {Array.from({ length: 24 }, (_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const yBase = 0.48 + (i % 6) * 0.055;
                const width = 0.035 + (i % 4) * 0.012;
                const height = 0.10 + (i % 3) * 0.035;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * 1.57, yBase, Math.sin(angle) * 1.57]}
                        rotation={[0, -angle + Math.PI / 2, 0]}
                    >
                        <boxGeometry args={[width, height, 0.008]} />
                        <meshStandardMaterial
                            color="#d4a600"
                            metalness={0.9}
                            roughness={0.15}
                            emissive="#8b6914"
                            emissiveIntensity={0.1}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

// Realistic Floating Chili Oil
function RealisticChiliOil() {
    const oilRef = useRef<THREE.InstancedMesh>(null);
    const drops = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 35; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * 1.3;
            arr.push({
                x: Math.cos(angle) * r,
                z: Math.sin(angle) * r,
                scale: 0.018 + Math.random() * 0.055,
                speed: 0.08 + Math.random() * 0.12,
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
            const drift = Math.sin(t * d.speed + d.phase) * 0.012;
            const drift2 = Math.cos(t * d.speed * 0.7 + d.phase) * 0.010;
            dummy.position.set(d.x + drift, 0.44, d.z + drift2);
            dummy.scale.setScalar(d.scale);
            dummy.rotation.x = -Math.PI / 2;
            dummy.updateMatrix();
            oilRef.current!.setMatrixAt(i, dummy.matrix);
        });
        oilRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={oilRef} args={[undefined, undefined, drops.length]}>
            <circleGeometry args={[1, 24]} />
            <meshPhysicalMaterial
                color="#ff2000"
                roughness={0.02}
                metalness={0.08}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
            />
        </instancedMesh>
    );
}

// Dense Noodle Bed in Bowl
function DenseNoodleBed() {
    const noodlesRef = useRef<THREE.Group>(null);
    const strands = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 30; i++) {
            const startAngle = (i / 30) * Math.PI * 2 + Math.random() * 0.6;
            const startR = 0.08 + Math.random() * 1.15;
            const pts = [];
            for (let j = 0; j < 18; j++) {
                const t = j / 17;
                const spiralAngle = startAngle + t * (Math.random() - 0.5) * 5.5;
                const r = startR * (1 - t * 0.38) + (Math.random() - 0.5) * 0.28;
                const y = 0.40 + Math.sin(t * Math.PI) * 0.055 - t * 0.20;
                pts.push(new THREE.Vector3(
                    Math.cos(spiralAngle) * r,
                    y + (Math.random() - 0.5) * 0.022,
                    Math.sin(spiralAngle) * r
                ));
            }
            arr.push({
                curve: new THREE.CatmullRomCurve3(pts),
                radius: 0.008 + Math.random() * 0.007,
            });
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (noodlesRef.current) {
            noodlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.006;
        }
    });

    return (
        <group ref={noodlesRef}>
            {strands.map((s, i) => (
                <mesh key={i} castShadow>
                    <tubeGeometry args={[s.curve, 18, s.radius, 10, false]} />
                    <meshPhysicalMaterial
                        color="#f8e4b8"
                        roughness={0.22}
                        metalness={0.005}
                        clearcoat={0.8}
                        clearcoatRoughness={0.12}
                    />
                </mesh>
            ))}
        </group>
    );
}

// ============================================
// REALISTIC CHOPSTICKS WITH 45 NOODLES
// Wood grain, lacquer, organic physics
// ============================================
function RealisticChopsticksNoodles() {
    const groupRef = useRef<THREE.Group>(null);
    const noodlesRef = useRef<THREE.Group>(null);
    const dripsRef = useRef<THREE.Group>(null);

    // 45 noodle strands with variable thickness
    const noodles = useMemo(() => {
        const strands = [];
        const count = 45;

        for (let i = 0; i < count; i++) {
            const angleOffset = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
            const startSpread = 0.002 + Math.random() * 0.005;
            const startX = Math.cos(angleOffset) * startSpread;
            const startZ = Math.sin(angleOffset) * startSpread;
            const length = 0.85 + Math.random() * 0.75;
            const segments = 24;
            const points = [];
            const curveBias = (Math.random() - 0.5) * 0.20;
            const waviness = 0.005 + Math.random() * 0.016;

            // Clumping - some noodles stick together
            const clumpIndex = Math.floor(i / 5);
            const clumpOffset = clumpIndex * 0.008;

            for (let j = 0; j < segments; j++) {
                const t = j / (segments - 1);
                const gravityDrop = t * t * length * 0.68 + t * length * 0.32;
                const spreadFactor = Math.pow(t, 1.7);
                const maxSpread = 0.11 + Math.random() * 0.07;
                const xSpread = startX + clumpOffset + (Math.cos(angleOffset + t * 0.75) + curveBias) * maxSpread * spreadFactor;
                const zSpread = startZ + Math.sin(angleOffset + t * 0.6) * maxSpread * spreadFactor * 0.72;
                const wave = Math.sin(t * Math.PI * 4.5 + i * 1.0) * waviness * t;
                const twist = Math.cos(t * Math.PI * 3.5 + i * 0.75) * waviness * 0.85 * t;

                points.push(new THREE.Vector3(xSpread + wave, -gravityDrop, zSpread + twist));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            strands.push({
                curve,
                points,
                basePoints: points.map(p => p.clone()),
                // Variable thickness
                radius: 0.007 + Math.random() * 0.006,
                phase: Math.random() * Math.PI * 2,
                swingSpeed: 0.28 + Math.random() * 0.38,
                swingAmount: 0.030 + Math.random() * 0.038,
                wobbleSpeed: 0.6 + Math.random() * 0.65,
                wobbleAmount: 0.010 + Math.random() * 0.014,
                vibrateSpeed: 2.0 + Math.random() * 2.5,
                vibrateAmount: 0.003 + Math.random() * 0.005,
                delay: i * 0.048,
            });
        }
        return strands;
    }, []);

    // Dripping broth with stretch
    const drips = useMemo(() => Array.from({ length: 14 }, () => ({
        x: (Math.random() - 0.5) * 0.14,
        y: -0.12 - Math.random() * 1.1,
        z: (Math.random() - 0.5) * 0.12,
        speed: 0.006 + Math.random() * 0.007,
        size: 0.005 + Math.random() * 0.012,
        wobblePhase: Math.random() * Math.PI * 2,
    })), []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            // Natural lifting motion with tremor
            const primaryLift = Math.sin(t * 0.16) * 0.20;
            const secondaryLift = Math.sin(t * 0.38) * 0.07;
            const breathe = Math.sin(t * 0.65) * 0.025;
            const tremor = Math.sin(t * 8.5) * 0.003; // Subtle hand shake

            groupRef.current.position.y = 1.60 + primaryLift + secondaryLift + breathe + tremor;

            groupRef.current.rotation.z = Math.sin(t * 0.14) * 0.032 + Math.sin(t * 6) * 0.002;
            groupRef.current.rotation.x = -0.28 + Math.sin(t * 0.12) * 0.032;
            groupRef.current.rotation.y = 0.42 + Math.sin(t * 0.08) * 0.028;
        }

        // Animate noodles with organic physics
        if (noodlesRef.current) {
            noodlesRef.current.children.forEach((child, i) => {
                if (i >= noodles.length) return;
                const mesh = child as THREE.Mesh;
                const strand = noodles[i];

                strand.points.forEach((point, j) => {
                    if (j === 0) return;
                    const base = strand.basePoints[j];
                    const depth = j / strand.points.length;
                    const tensionFactor = Math.pow(depth, 1.3);
                    const delayedT = t - (strand.delay || 0) * 0.55;

                    // Multi-layer organic physics
                    const primarySwing = Math.sin(delayedT * strand.swingSpeed + strand.phase) * strand.swingAmount * tensionFactor;
                    const secondaryWobble = Math.sin(delayedT * strand.wobbleSpeed + strand.phase + j * 0.24) * strand.wobbleAmount * tensionFactor;
                    const tipFactor = Math.pow(depth, 1.8);
                    const microVibrate = Math.sin(delayedT * strand.vibrateSpeed + strand.phase + j * 0.40) * strand.vibrateAmount * tipFactor;
                    const inertiaWave = Math.sin(delayedT * 0.28 + i * 0.10 + j * 0.088) * 0.010 * tensionFactor;
                    const momentumLag = Math.sin(delayedT * 0.45 - j * 0.15) * 0.008 * tensionFactor;

                    point.x = base.x + primarySwing + microVibrate + inertiaWave * 0.5 + momentumLag;
                    point.z = base.z + secondaryWobble + inertiaWave + momentumLag * 0.6;
                    point.y = base.y + Math.sin(delayedT * 0.9 + strand.phase + j * 0.20) * 0.004 * tensionFactor;
                });

                const newCurve = new THREE.CatmullRomCurve3(strand.points);
                const newGeo = new THREE.TubeGeometry(newCurve, 18, strand.radius, 10, false);
                mesh.geometry.dispose();
                mesh.geometry = newGeo;
            });
        }

        // Dripping broth animation
        if (dripsRef.current) {
            dripsRef.current.children.forEach((child, i) => {
                const mesh = child as THREE.Mesh;
                const drip = drips[i];
                mesh.position.y -= drip.speed;
                mesh.position.x += Math.sin(mesh.position.y * 6 + drip.wobblePhase) * 0.0005;
                // Stretch as it falls
                mesh.scale.y = 1 + Math.max(0, (-mesh.position.y - 0.12)) * 0.8;
                mesh.scale.x = 1 - Math.max(0, (-mesh.position.y - 0.12)) * 0.08;
                mesh.scale.z = mesh.scale.x;
                if (mesh.position.y < -3.0) {
                    mesh.position.y = -0.05 - Math.random() * 0.5;
                    mesh.position.x = (Math.random() - 0.5) * 0.12;
                    mesh.scale.set(1, 1, 1);
                }
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, 1.60, 0.45]} rotation={[-0.28, 0.42, 0]}>
            {/* Premium Lacquered Wooden Chopsticks */}
            <group>
                {/* Left Chopstick */}
                <group position={[0.035, 0, 0]} rotation={[0, 0, -0.022]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.004, 0.024, 3.8, 24]} />
                        <meshStandardMaterial color="#180802" roughness={0.18} metalness={0.02} />
                    </mesh>
                    {/* Tip */}
                    <mesh position={[0, -1.85, 0]}>
                        <cylinderGeometry args={[0.0025, 0.004, 0.10, 18]} />
                        <meshPhysicalMaterial color="#080402" roughness={0.08} clearcoat={1} />
                    </mesh>
                    {/* Red lacquer top */}
                    <mesh position={[0, 1.82, 0]}>
                        <cylinderGeometry args={[0.026, 0.026, 0.16, 20]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.15} metalness={0.05} />
                    </mesh>
                    {/* Gold band */}
                    <mesh position={[0, 1.73, 0]}>
                        <cylinderGeometry args={[0.028, 0.028, 0.035, 20]} />
                        <meshStandardMaterial color="#ffd700" metalness={0.98} roughness={0.05} />
                    </mesh>
                    {/* Secondary gold accent */}
                    <mesh position={[0, 1.68, 0]}>
                        <cylinderGeometry args={[0.027, 0.027, 0.015, 20]} />
                        <meshStandardMaterial color="#daa520" metalness={0.95} roughness={0.08} />
                    </mesh>
                </group>

                {/* Right Chopstick */}
                <group position={[-0.035, 0, 0]} rotation={[0, 0, 0.022]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.004, 0.024, 3.8, 24]} />
                        <meshStandardMaterial color="#180802" roughness={0.18} metalness={0.02} />
                    </mesh>
                    <mesh position={[0, -1.85, 0]}>
                        <cylinderGeometry args={[0.0025, 0.004, 0.10, 18]} />
                        <meshPhysicalMaterial color="#080402" roughness={0.08} clearcoat={1} />
                    </mesh>
                    <mesh position={[0, 1.82, 0]}>
                        <cylinderGeometry args={[0.026, 0.026, 0.16, 20]} />
                        <meshStandardMaterial color="#8b0000" roughness={0.15} metalness={0.05} />
                    </mesh>
                    <mesh position={[0, 1.73, 0]}>
                        <cylinderGeometry args={[0.028, 0.028, 0.035, 20]} />
                        <meshStandardMaterial color="#ffd700" metalness={0.98} roughness={0.05} />
                    </mesh>
                    <mesh position={[0, 1.68, 0]}>
                        <cylinderGeometry args={[0.027, 0.027, 0.015, 20]} />
                        <meshStandardMaterial color="#daa520" metalness={0.95} roughness={0.08} />
                    </mesh>
                </group>
            </group>

            {/* 45 Noodle Strands with Wet Coating */}
            <group ref={noodlesRef} position={[0, -0.03, 0]}>
                {noodles.map((strand, i) => (
                    <mesh key={i} castShadow>
                        <tubeGeometry args={[strand.curve, 18, strand.radius, 10, false]} />
                        <meshPhysicalMaterial
                            color="#f5dea8"
                            roughness={0.16}
                            metalness={0.004}
                            clearcoat={0.92}
                            clearcoatRoughness={0.04}
                            transmission={0.03}
                            thickness={0.2}
                            envMapIntensity={1.2}
                        />
                    </mesh>
                ))}
            </group>

            {/* Stretched Broth Drips */}
            <group ref={dripsRef} position={[0, -0.05, 0]}>
                {drips.map((drip, i) => (
                    <mesh key={i} position={[drip.x, drip.y, drip.z]}>
                        <sphereGeometry args={[drip.size, 18, 14]} />
                        <meshPhysicalMaterial
                            color="#4a1800"
                            roughness={0.04}
                            transmission={0.55}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                ))}
            </group>

            {/* Noodle Steam */}
            <NoodleSteam />
        </group>
    );
}

// Steam from lifted noodles
function NoodleSteam() {
    const steamRef = useRef<THREE.Group>(null);
    const particles = useMemo(() => Array.from({ length: 12 }, () => ({
        x: (Math.random() - 0.5) * 0.15,
        y: Math.random() * 0.5,
        z: (Math.random() - 0.5) * 0.10,
        scale: 0.03 + Math.random() * 0.045,
        speed: 0.0025 + Math.random() * 0.002,
        opacity: 0.015 + Math.random() * 0.015,
    })), []);

    useFrame(() => {
        if (!steamRef.current) return;
        steamRef.current.children.forEach((child, i) => {
            const mesh = child as THREE.Mesh;
            const p = particles[i];
            mesh.position.y += p.speed;
            mesh.scale.x += 0.0006;
            mesh.scale.z += 0.0006;
            const mat = mesh.material as THREE.MeshBasicMaterial;
            if (mesh.position.y > 0.7) mat.opacity -= 0.0006;
            if (mat.opacity <= 0 || mesh.position.y > 0.9) {
                mesh.position.set(p.x, 0, p.z);
                mesh.scale.setScalar(p.scale);
                mat.opacity = p.opacity;
            }
        });
    });

    return (
        <group ref={steamRef} position={[0, -0.35, 0]}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
                    <sphereGeometry args={[1, 10, 10]} />
                    <meshBasicMaterial color="#fff" transparent opacity={p.opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
}

// Photorealistic Toppings
function PhotorealisticToppings() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.elapsedTime;
            groupRef.current.children.forEach((child, i) => {
                if (child.userData.baseY !== undefined) {
                    child.position.y = child.userData.baseY + Math.sin(t * 0.30 + i * 0.16) * 0.003;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {/* Soft-Boiled Egg (Ajitama) with Runny Yolk */}
            <group position={[0.75, 0.45, 0.55]} rotation={[-0.08, 0.70, 0.06]} userData={{ baseY: 0.45 }}>
                <mesh castShadow>
                    <sphereGeometry args={[0.24, 64, 48, 0, Math.PI * 2, 0, Math.PI * 0.50]} />
                    <meshStandardMaterial color="#fff8e4" roughness={0.5} />
                </mesh>
                <mesh position={[0, -0.015, 0]}>
                    <ringGeometry args={[0.10, 0.22, 56]} />
                    <meshStandardMaterial color="#fffcf4" roughness={0.55} side={THREE.DoubleSide} />
                </mesh>
                {/* Runny yolk with gradient look */}
                <mesh position={[0, -0.02, 0]}>
                    <sphereGeometry args={[0.12, 48, 36]} />
                    <meshPhysicalMaterial
                        color="#ff8800"
                        roughness={0.08}
                        metalness={0.02}
                        clearcoat={1}
                        clearcoatRoughness={0.03}
                        emissive="#ff5500"
                        emissiveIntensity={0.35}
                        transmission={0.06}
                        thickness={0.7}
                    />
                </mesh>
                {/* Yolk highlight */}
                <mesh position={[0.03, -0.015, 0.02]}>
                    <sphereGeometry args={[0.025, 20, 16]} />
                    <meshPhysicalMaterial color="#ffaa00" roughness={0.05} transmission={0.3} />
                </mesh>
            </group>

            {/* Chashu Pork with Fat Marbling */}
            <group position={[-0.72, 0.44, 0.72]} rotation={[-0.14, -0.58, 0.04]} userData={{ baseY: 0.44 }}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.34, 0.34, 0.065, 64]} />
                    <meshStandardMaterial color="#4a1808" roughness={0.42} />
                </mesh>
                {/* Fat ring */}
                <mesh position={[0, 0.038, 0]}>
                    <torusGeometry args={[0.26, 0.05, 18, 64]} />
                    <meshStandardMaterial color="#f0d8c0" roughness={0.32} />
                </mesh>
                {/* Char marks */}
                {[0, 1.0, 2.2, 3.4, 4.6, 5.8].map((angle, j) => (
                    <mesh key={j} position={[Math.cos(angle) * 0.22, 0.038, Math.sin(angle) * 0.22]} scale={[0.065, 0.01, 0.022]} rotation={[0, angle, 0]}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="#100400" roughness={0.95} />
                    </mesh>
                ))}
            </group>

            {/* Nori Seaweed with Crinkle */}
            <mesh position={[-0.95, 0.72, -0.35]} rotation={[0.04, 0.52, 0.02]} castShadow userData={{ baseY: 0.72 }}>
                <boxGeometry args={[0.58, 0.62, 0.015]} />
                <meshStandardMaterial color="#010101" roughness={0.99} />
            </mesh>

            {/* Narutomaki with Spiral */}
            <group position={[0.25, 0.44, 0.88]} rotation={[Math.PI / 2 - 0.06, 0, 0.38]} userData={{ baseY: 0.44 }}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.15, 0.15, 0.07, 48]} />
                    <meshStandardMaterial color="#fff4f8" roughness={0.42} />
                </mesh>
                <mesh position={[0, 0.038, 0]}>
                    <torusGeometry args={[0.065, 0.016, 14, 36, Math.PI * 2.0]} />
                    <meshStandardMaterial color="#ff6090" roughness={0.32} />
                </mesh>
                <mesh position={[0.02, 0.038, 0.01]}>
                    <sphereGeometry args={[0.028, 22, 18]} />
                    <meshStandardMaterial color="#ff6090" roughness={0.32} />
                </mesh>
            </group>

            {/* Green Onions - Multiple Rings */}
            {Array.from({ length: 26 }).map((_, i) => {
                const angle = (i / 26) * Math.PI * 2 + Math.random() * 0.65;
                const r = 0.32 + Math.random() * 0.95;
                return (
                    <mesh key={i} position={[Math.cos(angle) * r, 0.43, Math.sin(angle) * r]} rotation={[Math.random() * 0.22 - 0.11, Math.random() * Math.PI, 0]} userData={{ baseY: 0.43 }}>
                        <torusGeometry args={[0.032, 0.014, 12, 20]} />
                        <meshStandardMaterial color="#22c55e" roughness={0.52} />
                    </mesh>
                );
            })}

            {/* Menma (Bamboo Shoots) */}
            <mesh position={[0.88, 0.46, -0.52]} rotation={[0.10, 1.15, 0.08]} castShadow userData={{ baseY: 0.46 }}>
                <cylinderGeometry args={[0.048, 0.042, 0.34, 16]} />
                <meshStandardMaterial color="#c9a228" roughness={0.40} />
            </mesh>
            <mesh position={[0.80, 0.44, -0.60]} rotation={[0.16, 0.88, 0.05]} castShadow userData={{ baseY: 0.44 }}>
                <cylinderGeometry args={[0.042, 0.036, 0.30, 16]} />
                <meshStandardMaterial color="#d4b045" roughness={0.45} />
            </mesh>

            {/* Chili Threads */}
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const r = 0.2 + Math.random() * 0.8;
                return (
                    <mesh key={`chili-${i}`} position={[Math.cos(angle) * r, 0.48, Math.sin(angle) * r]} rotation={[Math.random() * 0.4, Math.random() * Math.PI, 0]} userData={{ baseY: 0.48 }}>
                        <cylinderGeometry args={[0.003, 0.003, 0.08 + Math.random() * 0.06, 6]} />
                        <meshStandardMaterial color="#cc2200" roughness={0.6} />
                    </mesh>
                );
            })}
        </group>
    );
}

// Multi-Layer Realistic Steam System
function RealisticSteamSystem() {
    const steamRef = useRef<THREE.Group>(null);
    const particles = useMemo(() => Array.from({ length: 24 }, () => ({
        x: (Math.random() - 0.5) * 2.2,
        y: 0.6 + Math.random() * 1.8,
        z: (Math.random() - 0.5) * 2.2,
        scale: 0.10 + Math.random() * 0.24,
        speed: 0.0025 + Math.random() * 0.0035,
        opacity: 0.014 + Math.random() * 0.014,
        rotSpeed: (Math.random() - 0.5) * 0.005,
    })), []);

    useFrame(() => {
        if (!steamRef.current) return;
        steamRef.current.children.forEach((child, i) => {
            const mesh = child as THREE.Mesh;
            const p = particles[i];
            mesh.position.y += p.speed;
            mesh.scale.x += 0.0010;
            mesh.scale.z += 0.0010;
            mesh.rotation.y += p.rotSpeed;
            const mat = mesh.material as THREE.MeshBasicMaterial;
            if (mesh.position.y > 3.5) mat.opacity -= 0.001;
            if (mat.opacity <= 0 || mesh.position.y > 4.5) {
                mesh.position.set((Math.random() - 0.5) * 1.8, 0.55, (Math.random() - 0.5) * 1.8);
                mesh.scale.setScalar(p.scale);
                mat.opacity = p.opacity;
            }
        });
    });

    return (
        <group ref={steamRef} position={[0, 0.55, 0]}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
                    <icosahedronGeometry args={[1, 4]} />
                    <meshBasicMaterial color="#fff" transparent opacity={p.opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
}

// Responsive Bowl Container
function ResponsiveBowl() {
    const { size } = useThree();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;

    const posX = isMobile ? 0 : isTablet ? 0.50 : 0.75;
    const posY = isMobile ? 0.18 : -0.32;
    const scale = isMobile ? 1.75 : isTablet ? 2.4 : 2.9;

    return (
        <group position={[posX, posY, 0]}>
            <PhotorealisticBowl position={[0, 0, 0]} scale={scale} />
        </group>
    );
}

// Responsive Camera
function ResponsiveCameraRig() {
    const { camera, pointer, size } = useThree();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;
    const lookX = isMobile ? 0 : isTablet ? 0.50 : 0.75;

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const targetX = isMobile ? 0 : pointer.x * 0.08 + Math.sin(t * 0.04) * 0.04;
        const targetY = pointer.y * 0.08 + 0.30;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.005);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.005);
        camera.lookAt(lookX, 0.30, 0);

        const targetFov = isMobile ? 44 : isTablet ? 34 : 28;
        (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
            (camera as THREE.PerspectiveCamera).fov,
            targetFov,
            0.010
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
                camera={{ position: [0, 1.4, 6.5], fov: 28 }}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
            >
                <Suspense fallback={null}>
                    {/* Professional 3-Point Lighting */}
                    <ambientLight intensity={0.32} />
                    {/* Key Light - Main warm illumination */}
                    <directionalLight position={[8, 16, 8]} intensity={1.6} color="#fffce8" castShadow shadow-mapSize={[2048, 2048]} />
                    {/* Fill Light - Softer secondary */}
                    <directionalLight position={[-6, 10, -6]} intensity={0.65} color="#ffd8a8" />
                    {/* Rim Light - Back highlight */}
                    <pointLight position={[-8, 8, -8]} intensity={0.7} color="#ff5025" />
                    {/* Accent Light */}
                    <pointLight position={[6, 6, 6]} intensity={0.4} color="#fff8e8" />
                    {/* Top Spot */}
                    <spotLight position={[0, 14, 0]} intensity={0.55} angle={0.35} penumbra={0.7} color="#fff" />

                    <ResponsiveBowl />
                    <ResponsiveCameraRig />
                </Suspense>
            </Canvas>

            <style jsx>{`
                .hero-3d-container {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    background: linear-gradient(150deg, #000000 0%, #080302 18%, #120805 40%, #0c0503 65%, #000000 100%);
                    overflow: hidden;
                }
                .hero-3d-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse at 68% 42%, rgba(185, 28, 28, 0.12) 0%, transparent 58%),
                                radial-gradient(ellipse at 22% 68%, rgba(217, 119, 6, 0.07) 0%, transparent 48%);
                    pointer-events: none;
                }
                .hero-3d-container::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 60% 50%, rgba(255, 80, 30, 0.06) 0%, transparent 42%);
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
