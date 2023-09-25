export function addCloset(scene, loader) {
    // 1. クローゼットのジオメトリを定義
    const closetGeometry = new THREE.BoxGeometry(-1, 2, 0.5);  // クローゼットのジオメトリ

    // 2. クローゼットのマテリアルを定義
    const closetMaterial = new THREE.MeshBasicMaterial({ map: loader.load('images/image1.jpg') });  // 木のテクスチャ

    // 3. クローゼットのメッシュを作成
    const closet = new THREE.Mesh(closetGeometry, closetMaterial);

    // 4. 作成したメッシュを適切な位置に配置
    closet.position.set(-2.25, -1.5, 0);  // 壁際にクローゼットを配置

    // 5. シーンにメッシュを追加
    scene.add(closet);
}