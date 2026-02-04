'use client';

import React, { useRef, useEffect, useState } from 'react';

// ============================================
// LUXURY BOWL ANIMATION - Pure Canvas
// Large background bowl on LEFT + centered floating bowl
// Cinematic, warm, premium restaurant aesthetic
// ============================================

export default function HeroBowlCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);
        };
        resize();

        let animationId: number;
        let time = 0;

        // Noodle strands for lifting animation
        const liftingNoodles: Array<{
            offsetX: number;
            length: number;
            phase: number;
            swingSpeed: number;
            swingAmount: number;
            thickness: number;
            colorShift: number;
        }> = [];

        for (let i = 0; i < 22; i++) {
            liftingNoodles.push({
                offsetX: (i - 11) * 3.5,
                length: 100 + Math.random() * 100,
                phase: Math.random() * Math.PI * 2,
                swingSpeed: 0.3 + Math.random() * 0.25,
                swingAmount: 12 + Math.random() * 10,
                thickness: 2.5 + Math.random() * 1.5,
                colorShift: Math.random() * 0.1,
            });
        }

        // Steam particles
        const steamParticles: Array<{
            x: number;
            y: number;
            size: number;
            opacity: number;
            speed: number;
            drift: number;
        }> = [];

        for (let i = 0; i < 35; i++) {
            steamParticles.push({
                x: width * 0.5 + (Math.random() - 0.5) * 250,
                y: height * 0.5 - Math.random() * 150,
                size: 30 + Math.random() * 60,
                opacity: 0.015 + Math.random() * 0.025,
                speed: 0.25 + Math.random() * 0.35,
                drift: (Math.random() - 0.5) * 0.3,
            });
        }

        // Animation loop
        const animate = () => {
            time += 0.016; // ~60fps
            ctx.clearRect(0, 0, width, height);

            // ========================================
            // LARGE BACKGROUND BOWL (LEFT SIDE)
            // ========================================
            const bgBowlX = -width * 0.18;
            const bgBowlY = height * 0.45;
            const bgBowlScale = Math.max(width, height) * 0.85;

            // Outer bowl - warm tan/beige ceramic
            ctx.save();
            ctx.translate(bgBowlX, bgBowlY);
            ctx.rotate(0.15); // Slight tilt

            // Bowl outer glow
            const outerGlow = ctx.createRadialGradient(0, 0, bgBowlScale * 0.3, 0, 0, bgBowlScale * 0.7);
            outerGlow.addColorStop(0, 'rgba(200, 160, 100, 0.15)');
            outerGlow.addColorStop(0.5, 'rgba(180, 140, 80, 0.08)');
            outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.beginPath();
            ctx.ellipse(0, 0, bgBowlScale * 0.7, bgBowlScale * 0.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = outerGlow;
            ctx.fill();

            // Bowl exterior - tan/beige with gradient
            const bowlExtGrad = ctx.createLinearGradient(-bgBowlScale * 0.5, -bgBowlScale * 0.3, bgBowlScale * 0.5, bgBowlScale * 0.3);
            bowlExtGrad.addColorStop(0, '#8a7050');
            bowlExtGrad.addColorStop(0.2, '#c4a878');
            bowlExtGrad.addColorStop(0.4, '#d4bc94');
            bowlExtGrad.addColorStop(0.6, '#c9a86c');
            bowlExtGrad.addColorStop(0.8, '#a08050');
            bowlExtGrad.addColorStop(1, '#6a5040');
            ctx.beginPath();
            ctx.ellipse(0, 0, bgBowlScale * 0.55, bgBowlScale * 0.38, 0, 0, Math.PI * 2);
            ctx.fillStyle = bowlExtGrad;
            ctx.fill();

            // Bowl interior - dark
            const bowlIntGrad = ctx.createRadialGradient(bgBowlScale * 0.05, -bgBowlScale * 0.05, 0, 0, 0, bgBowlScale * 0.4);
            bowlIntGrad.addColorStop(0, '#1a0f0a');
            bowlIntGrad.addColorStop(0.5, '#2a1810');
            bowlIntGrad.addColorStop(1, '#3a2820');
            ctx.beginPath();
            ctx.ellipse(bgBowlScale * 0.05, -bgBowlScale * 0.03, bgBowlScale * 0.42, bgBowlScale * 0.28, 0.05, 0, Math.PI * 2);
            ctx.fillStyle = bowlIntGrad;
            ctx.fill();

            // Gold rim band
            ctx.beginPath();
            ctx.ellipse(0, -bgBowlScale * 0.02, bgBowlScale * 0.52, bgBowlScale * 0.35, 0, 0, Math.PI * 2);
            ctx.strokeStyle = '#c9a034';
            ctx.lineWidth = 8;
            ctx.stroke();

            ctx.restore();

            // ========================================
            // STEAM (Behind center bowl)
            // ========================================
            const centerX = width * 0.5;
            const centerBowlY = height * 0.58;

            steamParticles.forEach((p) => {
                p.y -= p.speed;
                p.x += Math.sin(time * 0.4 + p.y * 0.008) * 0.4 + p.drift;
                p.size += 0.015;
                p.opacity -= 0.00015;

                if (p.y < height * 0.15 || p.opacity <= 0) {
                    p.y = centerBowlY - 30 - Math.random() * 40;
                    p.x = centerX + (Math.random() - 0.5) * 200;
                    p.size = 30 + Math.random() * 60;
                    p.opacity = 0.015 + Math.random() * 0.025;
                }

                const steamGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                steamGrad.addColorStop(0, `rgba(255, 220, 180, ${p.opacity * 1.2})`);
                steamGrad.addColorStop(0.5, `rgba(255, 200, 160, ${p.opacity * 0.6})`);
                steamGrad.addColorStop(1, 'rgba(255, 180, 140, 0)');

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = steamGrad;
                ctx.fill();
            });

            // ========================================
            // CENTER FLOATING BOWL
            // ========================================
            const bowlFloat = Math.sin(time * 0.4) * 4;
            const bowlY = centerBowlY + bowlFloat;
            const bowlWidth = Math.min(width * 0.5, 380);
            const bowlHeight = bowlWidth * 0.32;

            // Bowl shadow
            ctx.beginPath();
            ctx.ellipse(centerX, bowlY + bowlHeight * 0.25, bowlWidth * 0.45, bowlHeight * 0.15, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
            ctx.fill();

            // Bowl exterior - dark maroon/brown ceramic
            ctx.beginPath();
            ctx.ellipse(centerX, bowlY, bowlWidth * 0.5, bowlHeight, 0, 0, Math.PI * 2);
            const extGrad = ctx.createLinearGradient(centerX - bowlWidth * 0.5, bowlY, centerX + bowlWidth * 0.5, bowlY);
            extGrad.addColorStop(0, '#1a0808');
            extGrad.addColorStop(0.2, '#3a1818');
            extGrad.addColorStop(0.5, '#4a2222');
            extGrad.addColorStop(0.8, '#3a1818');
            extGrad.addColorStop(1, '#1a0808');
            ctx.fillStyle = extGrad;
            ctx.fill();

            // Bowl exterior highlight
            ctx.beginPath();
            ctx.ellipse(centerX - bowlWidth * 0.15, bowlY - bowlHeight * 0.3, bowlWidth * 0.12, bowlHeight * 0.4, -0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fill();

            // Gold rim
            ctx.beginPath();
            ctx.ellipse(centerX, bowlY - bowlHeight * 0.88, bowlWidth * 0.47, bowlHeight * 0.1, 0, 0, Math.PI * 2);
            ctx.strokeStyle = '#c9a034';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Decorative pattern on rim
            for (let i = 0; i < 30; i++) {
                const angle = (i / 30) * Math.PI * 2;
                const px = centerX + Math.cos(angle) * bowlWidth * 0.44;
                const py = bowlY - bowlHeight * 0.78 + Math.sin(angle) * bowlHeight * 0.08;
                ctx.beginPath();
                ctx.rect(px - 3, py - 4, 6, 8);
                ctx.fillStyle = 'rgba(139, 69, 19, 0.6)';
                ctx.fill();
            }

            // Bowl interior - cream/off-white
            ctx.beginPath();
            ctx.ellipse(centerX, bowlY - bowlHeight * 0.12, bowlWidth * 0.42, bowlHeight * 0.72, 0, 0, Math.PI * 2);
            const intGrad = ctx.createRadialGradient(centerX, bowlY - bowlHeight * 0.15, 0, centerX, bowlY, bowlWidth * 0.4);
            intGrad.addColorStop(0, '#f8f0e0');
            intGrad.addColorStop(0.6, '#e8dcc8');
            intGrad.addColorStop(1, '#d0c0a8');
            ctx.fillStyle = intGrad;
            ctx.fill();

            // Broth - warm amber/golden
            ctx.beginPath();
            ctx.ellipse(centerX, bowlY - bowlHeight * 0.08, bowlWidth * 0.38, bowlHeight * 0.58, 0, 0, Math.PI * 2);
            const brothGrad = ctx.createRadialGradient(centerX, bowlY - bowlHeight * 0.12, 0, centerX, bowlY, bowlWidth * 0.36);
            brothGrad.addColorStop(0, '#d9a825');
            brothGrad.addColorStop(0.4, '#c49015');
            brothGrad.addColorStop(0.8, '#a87008');
            brothGrad.addColorStop(1, '#8a5505');
            ctx.fillStyle = brothGrad;
            ctx.fill();

            // Broth surface highlights
            ctx.beginPath();
            ctx.ellipse(centerX - bowlWidth * 0.1, bowlY - bowlHeight * 0.18, bowlWidth * 0.08, bowlHeight * 0.12, -0.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 220, 150, 0.25)';
            ctx.fill();

            // ========================================
            // NOODLES IN BOWL
            // ========================================
            for (let i = 0; i < 28; i++) {
                const angle = (i / 28) * Math.PI * 2 + time * 0.015;
                const radius = 25 + (i % 3) * 35 + Math.sin(i * 1.5) * 20;
                const startX = centerX + Math.cos(angle) * radius;
                const startY = bowlY - bowlHeight * 0.1 + Math.sin(angle * 2) * 8;

                ctx.beginPath();
                ctx.moveTo(startX, startY);

                for (let j = 1; j <= 8; j++) {
                    const t = j / 8;
                    const waveX = Math.sin(angle + t * 4 + time * 0.2) * 18;
                    const curveX = startX + waveX * t;
                    const curveY = startY + t * 25 - 10;
                    ctx.lineTo(curveX, curveY);
                }

                ctx.strokeStyle = `hsl(45, 75%, ${52 + (i % 5) * 3}%)`;
                ctx.lineWidth = 2.2 + (i % 3) * 0.4;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // ========================================
            // CHOPSTICKS
            // ========================================
            const chopY = bowlY - bowlHeight - 90 + Math.sin(time * 0.35) * 6;
            const chopMicro = Math.sin(time * 0.5) * 1.5;

            // Left chopstick
            ctx.save();
            ctx.translate(centerX - 12 + chopMicro * 0.5, chopY);
            ctx.rotate(-0.03);
            const chopGrad = ctx.createLinearGradient(0, -100, 0, 120);
            chopGrad.addColorStop(0, '#5a3a1a');
            chopGrad.addColorStop(0.3, '#7a5430');
            chopGrad.addColorStop(0.6, '#8b5a2b');
            chopGrad.addColorStop(1, '#6a4420');
            ctx.fillStyle = chopGrad;
            ctx.beginPath();
            ctx.moveTo(-5, -100);
            ctx.lineTo(5, -100);
            ctx.lineTo(2, 120);
            ctx.lineTo(-2, 120);
            ctx.closePath();
            ctx.fill();
            // Wood grain
            for (let g = 0; g < 5; g++) {
                ctx.beginPath();
                ctx.moveTo(-3, -80 + g * 40);
                ctx.lineTo(3, -75 + g * 40);
                ctx.strokeStyle = 'rgba(90, 58, 26, 0.4)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();

            // Right chopstick
            ctx.save();
            ctx.translate(centerX + 12 - chopMicro * 0.5, chopY);
            ctx.rotate(0.03);
            ctx.fillStyle = chopGrad;
            ctx.beginPath();
            ctx.moveTo(-5, -100);
            ctx.lineTo(5, -100);
            ctx.lineTo(2, 120);
            ctx.lineTo(-2, 120);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // ========================================
            // LIFTING NOODLES (Critical animation)
            // ========================================
            const liftBase = chopY + 35;
            const liftCycle = (time * 0.2) % (Math.PI * 2);
            const liftOffset = Math.sin(liftCycle) * 12;

            liftingNoodles.forEach((noodle, i) => {
                const swing = Math.sin(time * noodle.swingSpeed + noodle.phase) * noodle.swingAmount;
                const wobble = Math.cos(time * 0.7 + noodle.phase + i * 0.25) * 4;

                ctx.beginPath();
                ctx.moveTo(centerX + noodle.offsetX, liftBase + liftOffset);

                // Draw curved noodle with gravity
                const segs = 14;
                for (let j = 1; j <= segs; j++) {
                    const t = j / segs;
                    const tension = Math.pow(t, 1.4);
                    const gravityDrop = tension * noodle.length;
                    const xOffset = swing * tension + wobble * tension * tension;
                    const spreadX = noodle.offsetX * (1 + t * 0.4);

                    ctx.lineTo(
                        centerX + spreadX + xOffset,
                        liftBase + liftOffset + gravityDrop
                    );
                }

                // Golden yellow gradient for noodles
                const noodleGrad = ctx.createLinearGradient(
                    centerX + noodle.offsetX, liftBase,
                    centerX + noodle.offsetX, liftBase + noodle.length
                );
                noodleGrad.addColorStop(0, `hsl(48, 80%, ${58 + noodle.colorShift * 100}%)`);
                noodleGrad.addColorStop(0.5, `hsl(45, 75%, ${52 + noodle.colorShift * 100}%)`);
                noodleGrad.addColorStop(1, `hsl(42, 70%, ${45 + noodle.colorShift * 100}%)`);

                ctx.strokeStyle = noodleGrad;
                ctx.lineWidth = noodle.thickness;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                // Highlight on noodle
                ctx.beginPath();
                ctx.moveTo(centerX + noodle.offsetX + 1, liftBase + liftOffset + 5);
                ctx.lineTo(centerX + noodle.offsetX + swing * 0.3 + 1, liftBase + liftOffset + 40);
                ctx.strokeStyle = 'rgba(255, 240, 200, 0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // ========================================
            // INNER GLOW (Bowl warmth)
            // ========================================
            const glowGrad = ctx.createRadialGradient(centerX, bowlY - bowlHeight * 0.1, 0, centerX, bowlY, bowlWidth * 0.45);
            glowGrad.addColorStop(0, 'rgba(255, 140, 60, 0.12)');
            glowGrad.addColorStop(0.4, 'rgba(255, 100, 40, 0.06)');
            glowGrad.addColorStop(1, 'rgba(255, 80, 30, 0)');
            ctx.beginPath();
            ctx.ellipse(centerX, bowlY - bowlHeight * 0.05, bowlWidth * 0.42, bowlHeight * 0.65, 0, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();

            animationId = requestAnimationFrame(animate);
        };

        setIsLoaded(true);
        animate();

        window.addEventListener('resize', () => {
            resize();
        });

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="hero-3d-container">
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                }}
            />

            <style jsx>{`
                .hero-3d-container {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    background: linear-gradient(
                        160deg,
                        #000000 0%,
                        #080503 20%,
                        #0a0604 40%,
                        #080402 60%,
                        #050302 80%,
                        #000000 100%
                    );
                    overflow: hidden;
                }
                .hero-3d-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(ellipse at 25% 50%, rgba(200, 160, 100, 0.06) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 55%, rgba(255, 120, 60, 0.05) 0%, transparent 40%);
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
