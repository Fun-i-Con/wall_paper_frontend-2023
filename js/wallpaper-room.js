import { addLight } from './obj-light.js'
import { addDesk } from './obj-desk.js'
import { addCloset } from './obj-closet.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 部屋のジオメトリを定義
const geometry = new THREE.BoxGeometry(5, 5, 5);

// テクスチャローダーの初期化
const loader = new THREE.TextureLoader();

// 各面にマテリアルを設定
const rightWall = new THREE.MeshBasicMaterial({ map: loader.load('images/tree.jpeg'), side: THREE.BackSide });
const leftWall = new THREE.MeshBasicMaterial({ map: loader.load('images/tree.jpeg'), side: THREE.BackSide });
const ceiling = new THREE.MeshBasicMaterial({ color: 0xe9e9e9, side: THREE.BackSide });
const floor = new THREE.MeshBasicMaterial({ map: loader.load('images/floor.png'), side: THREE.BackSide });
// const frontWall = new THREE.MeshBasicMaterial({ map: loader.load('images/cat.jpg'), side: THREE.BackSide });
const frontWall = new THREE.MeshBasicMaterial({ map: loader.load('images/111763-.jpg'), side: THREE.BackSide });
const backWall = new THREE.MeshBasicMaterial({ map: loader.load('images/tree.jpeg'), side: THREE.BackSide });

const materials = [
    rightWall,
    leftWall,
    ceiling,
    floor,
    frontWall,
    backWall
];

const room = new THREE.Mesh(geometry, materials);
scene.add(room);

// オブジェクトの配置
addLight(scene)
addDesk(scene, loader);
addCloset(scene, loader);

camera.position.z = 7;

// let rotationDirection = 0.002;  // 初期回転方向
room.rotation.y = 2.3;
function animate() {
    requestAnimationFrame(animate);
    // 以下のコードは回転させる場合
    // room.rotation.y += rotationDirection;
    // rotation.yが指定された範囲を超えた場合、回転の方向を切り替える
    // if (room.rotation.y > 2.8 || room.rotation.y < 1.5) {
    //     rotationDirection = -rotationDirection;
    // }
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});