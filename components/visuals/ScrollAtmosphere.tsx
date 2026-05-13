'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ScrollAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const particleCount = 260
    const positions = new Float32Array(particleCount * 3)
    const basePositions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const scatterStrengths = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 12
      positions[i3 + 1] = (Math.random() - 0.5) * 8
      positions[i3 + 2] = (Math.random() - 0.5) * 7
      basePositions[i3] = positions[i3]
      basePositions[i3 + 1] = positions[i3 + 1]
      basePositions[i3 + 2] = positions[i3 + 2]
      scatterStrengths[i] = 0.55 + Math.random() * 0.75

      const warmth = Math.random()
      colors[i3] = 0.42 + warmth * 0.22
      colors[i3 + 1] = 0.48 + warmth * 0.12
      colors[i3 + 2] = 0.34 + warmth * 0.08
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const positionAttribute = particleGeometry.getAttribute('position') as THREE.BufferAttribute

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const ridgeGroup = new THREE.Group()
    const ridgeMaterial = new THREE.LineBasicMaterial({
      color: 0xb8ad85,
      transparent: true,
      opacity: 0.14,
    })

    for (let r = 0; r < 4; r += 1) {
      const points: THREE.Vector3[] = []
      const depth = -2.4 - r * 0.9
      const baseY = -2.3 + r * 0.34
      for (let i = 0; i <= 80; i += 1) {
        const x = -7 + (14 * i) / 80
        const y = baseY + Math.sin(i * 0.18 + r * 1.7) * (0.12 + r * 0.04)
        points.push(new THREE.Vector3(x, y, depth))
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      ridgeGroup.add(new THREE.Line(geometry, ridgeMaterial.clone()))
    }
    scene.add(ridgeGroup)

    let scrollTarget = 0
    let scrollCurrent = 0
    let frame = 0
    const pointer = {
      active: false,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    }

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollTarget = max > 0 ? window.scrollY / max : 0
    }

    const updatePointer = (event: PointerEvent) => {
      pointer.targetX = event.clientX / window.innerWidth - 0.5
      pointer.targetY = event.clientY / window.innerHeight - 0.5
      pointer.active = true
    }

    const clearPointer = () => {
      pointer.active = false
    }

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerleave', clearPointer)
    window.addEventListener('blur', clearPointer)
    window.addEventListener('resize', resize)
    updateScroll()

    const animate = () => {
      frame = requestAnimationFrame(animate)
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.055
      pointer.x += (pointer.targetX - pointer.x) * 0.12
      pointer.y += (pointer.targetY - pointer.y) * 0.12

      const time = performance.now() * 0.001
      const drift = prefersReducedMotion ? 0 : time
      const particleOffsetY = scrollCurrent * 1.8 - 0.45
      camera.position.z = 7 - scrollCurrent * 1.25

      const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) * 0.5) * camera.position.z
      const visibleWidth = visibleHeight * camera.aspect
      const pointerWorldX = pointer.x * visibleWidth
      const pointerWorldY = -pointer.y * visibleHeight - particleOffsetY
      const scatterRadius = prefersReducedMotion ? 0.85 : 1.18
      const scatterPush = prefersReducedMotion ? 0.025 : 0.055
      const returnPull = prefersReducedMotion ? 0.025 : 0.017

      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3
        const x = positions[i3]
        const y = positions[i3 + 1]
        const z = positions[i3 + 2]

        velocities[i3] += (basePositions[i3] - x) * returnPull
        velocities[i3 + 1] += (basePositions[i3 + 1] - y) * returnPull
        velocities[i3 + 2] += (basePositions[i3 + 2] - z) * returnPull

        if (pointer.active) {
          const dx = x - pointerWorldX
          const dy = y - pointerWorldY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < scatterRadius) {
            const force = ((scatterRadius - distance) / scatterRadius) ** 2
            const angle = Math.atan2(dy, dx)
            const strength = force * scatterPush * scatterStrengths[i]
            velocities[i3] += Math.cos(angle) * strength
            velocities[i3 + 1] += Math.sin(angle) * strength
            velocities[i3 + 2] += strength * 0.42
          }
        }

        velocities[i3] *= 0.9
        velocities[i3 + 1] *= 0.9
        velocities[i3 + 2] *= 0.9

        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
      }

      positionAttribute.needsUpdate = true

      particles.rotation.y = scrollCurrent * 0.42 + drift * 0.018
      particles.rotation.x = -0.08 + scrollCurrent * 0.18
      particles.position.y = particleOffsetY

      ridgeGroup.rotation.z = Math.sin(drift * 0.18) * 0.015
      ridgeGroup.position.y = -scrollCurrent * 0.6
      ridgeGroup.position.x = Math.sin(scrollCurrent * Math.PI) * 0.22

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerleave', clearPointer)
      window.removeEventListener('blur', clearPointer)
      window.removeEventListener('resize', resize)
      particleGeometry.dispose()
      particleMaterial.dispose()
      ridgeGroup.children.forEach((child) => {
        const line = child as THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>
        line.geometry.dispose()
        line.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-35 mix-blend-screen"
    />
  )
}
