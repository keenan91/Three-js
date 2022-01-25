import './App.css'
import * as THREE from 'three'
import {useEffect, useLayoutEffect} from 'react'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import OBJ from './goldenEyeLite.obj'
import MTL from './goldenEyeLite.mtl'
import GLB from './CCC.glb'

const objLoader = new OBJLoader()
const scene = new THREE.Scene()
let Beet

const loader = new GLTFLoader()

loader.load(
  GLB,
  function (gltf) {
    Beet = gltf.scene
    scene.add(Beet)
  },
  undefined,
  function (error) {
    console.error(error)
  },
)

function App() {
  useLayoutEffect(() => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('myCanvas'),
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(15)
    renderer.render(scene, camera)

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6347,
      wireframe: true,
    })
    const torus = new THREE.Mesh(geometry, material)
    //scene.add(torus)

    const pointLight = new THREE.PointLight(0xb85b14)
    const pointLight2 = new THREE.PointLight(0xb85b14)
    pointLight.position.set(-5, 5, 10)
    pointLight2.position.set(30, 5, -50)
    //const ambientLight = new THREE.AmbientLight(0xb85b14)
    //scene.add(ambientLight)
    scene.add(pointLight)
    scene.add(pointLight2)
    //const gridHelper = new THREE.GridHelper(200, 50)
    const lightHelper = new THREE.PointLightHelper(pointLight)
    //scene.add(lightHelper)
    const lightHelper2 = new THREE.PointLightHelper(pointLight2)
    //scene.add(lightHelper2)
    const controls = new OrbitControls(camera, renderer.domElement)

    function animate() {
      requestAnimationFrame(animate)
      try {
        Beet.rotation.y += 0.005
      } catch (error) {}

      controls.update()
      renderer.render(scene, camera)
    }

    animate()
  })
  useEffect(() => {}, [])
  return <canvas id="myCanvas" position="fixed" top="0" left="0"></canvas>
}

export default App
