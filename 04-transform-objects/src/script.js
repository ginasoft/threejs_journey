import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Position
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.x = 2 --> el doble de ancho
// mesh.scale.y = 0.5 --> la mitad de alto
// mesh.scale.z = 0.5 --> la mitad de profundidad

// El resultado es un cubo "aplastado" que parece más un rectángulo plano y ancho.

mesh.scale.set(2, 0.5, 0.5)

// Rotation
// reordenamos para que por ej. un personaje en el juego, mire primero de costado y luego abajo y arriba
// si mira primero para abajo y luego de costado, va a quedar mal.

// Primero reordenar y despues cambiar la rotacion 

mesh.rotation.reorder ('YXZ') 
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = 3.14159 * 0.25 // or Math.PI 

// Quaternion



// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

camera.lookAt()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)