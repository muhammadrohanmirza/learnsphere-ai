'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeHeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentMount.appendChild(renderer.domElement)

    // Create glowing floating particle mesh / dodecahedron
    const geometry = new THREE.DodecahedronGeometry(2.5, 0)
    const material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add glowing torus orbits
    const torusGeometry = new THREE.TorusGeometry(4, 0.05, 16, 100)
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.4 })
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    torus.rotation.x = Math.PI / 3
    scene.add(torus)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x6366f1, 3, 50)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 7

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      sphere.rotation.x += 0.003
      sphere.rotation.y += 0.005

      torus.rotation.z += 0.002

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (currentMount) {
        currentMount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0 opacity-40" />
}
