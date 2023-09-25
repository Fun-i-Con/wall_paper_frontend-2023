// 電球の関数
export function addLight(scene) {
    // 電球のジオメトリ
    const bulbGeometry = new THREE.SphereGeometry(0.2); // 電球の大きさを0.2としています
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe0 }); // 黄色っぽい電球の色

    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);

    bulb.position.set(0, 2.4, 0); // 天井の近くの中央に電球を配置
    scene.add(bulb);

    // PointLightを追加
    const light = new THREE.PointLight(0xffffe0, 1, 10); // 色、強度、距離を設定
    light.position.set(0, 2.4, 0); // 電球の位置に合わせる
    scene.add(light);
}