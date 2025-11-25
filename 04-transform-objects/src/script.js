import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

/*
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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

// Position
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)
*/

// Creamos grupos para poder mover todos los elementos dentro del grupo de una

const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = -2 
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 2 
group.add(cube3)

// Quaternion explanation
/*
Es otra forma de representar rotaciones en 3D, alternativa a los ángulos de Euler (rotation.x, rotation.y, rotation.z).

El problema con Euler:
Cuando usás rotation.x, rotation.y, rotation.z, pueden ocurrir problemas:

Gimbal Lock: cuando dos ejes se alinean y perdés un grado de libertad

El orden importa: por eso usás reorder('YXZ') - el resultado cambia según el orden

Quaternion resuelve esto
Un quaternion usa 4 valores (x, y, z, w) en vez de 3. Matemáticamente es más complejo pero:

No tiene gimbal lock
Las interpolaciones (animaciones suaves entre rotaciones) son mejores
Es más eficiente para cálculos internos

En la práctica

Three.js sincroniza ambos automáticamente:

mesh.rotation.x = Math.PI * 0.25  // Cambia rotation → quaternion se actualiza
mesh.quaternion.setFromAxisAngle(axis, angle)  // Cambia quaternion → rotation se actualiza

¿Cuándo usar cada uno?
Euler (rotation)	Quaternion
Más intuitivo	Más preciso
Rotaciones simples	Animaciones complejas
Debug/visualizar	Evitar gimbal lock
Para el curso, generalmente usarás rotation porque es más fácil de entender. Three.js usa quaternions internamente, así que obtenés los beneficios sin tener que trabajar directamente con ellos.


GIMBAL LOCK

Imaginá que tenés 3 anillos giratorios (como un giroscopio), uno dentro del otro:
Anillo exterior: controla rotación en Y (izquierda/derecha)
Anillo medio: controla rotación en X (arriba/abajo)
Anillo interior: controla rotación en Z (inclinación)
El problema
Cuando rotás el anillo medio (X) exactamente 90°, el anillo exterior (Y) y el interior (Z) quedan alineados en el mismo plano. Ahora ambos hacen lo mismo - perdiste un eje de control.
Ejemplo práctico
Pensá en un avión:
Normal:
- Y = girar izquierda/derecha (yaw)
- X = subir/bajar nariz (pitch)  
- Z = inclinar alas (roll)

Si el avión apunta 90° hacia arriba (nariz al cielo):
- Y y Z ahora hacen lo mismo (giran el avión sobre su eje vertical)
- ¡Perdiste un grado de libertad!
Visual simple

NORMAL                    GIMBAL LOCK (X = 90°)
   Y                           Y
   |                           |
   |                           |
   +--- X                      +--- X (apuntando hacia vos)
  /                           /
 Z                           Z  ← Y y Z ahora son paralelos!

Por qué importa en Three.js

Si animás rotaciones y pasás por 90° en un eje, la animación puede "saltar" o comportarse raro. Por eso existe reorder('YXZ') - cambia el orden para minimizar este problema según tu caso de uso. Quaternions no tienen este problema porque no usan 3 ángulos separados.


*/


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

// camera.lookAt(new THREE.Vector3(3, 0, 0))
// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)