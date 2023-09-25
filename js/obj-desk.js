// 机のオブジェクト
export function addDesk(scene, loader) {
    // 1. 机のジオメトリを定義
    const tableTopGeometry = new THREE.BoxGeometry(2, 0.1, 1);  // 机の天板のジオメトリ
    const tableLegGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);  // 机の足のジオメトリ

    // 2. 机のマテリアルを定義
    const tableMaterial = new THREE.MeshBasicMaterial({ map: loader.load('images/image1.jpg') });  // 木のテクスチャ

    // 3. 机のメッシュを作成
    const tableTop = new THREE.Mesh(tableTopGeometry, tableMaterial);
    const leg1 = new THREE.Mesh(tableLegGeometry, tableMaterial);
    const leg2 = new THREE.Mesh(tableLegGeometry, tableMaterial);
    const leg3 = new THREE.Mesh(tableLegGeometry, tableMaterial);
    const leg4 = new THREE.Mesh(tableLegGeometry, tableMaterial);

    // 4. 作成したメッシュを適切な位置に配置
    // tableTop.position.y = -1.5;  // 机の天板の位置を調整
    // tableTop.position.x = -0.2;
    // tableTop.position.z = -0.5;
    tableTop.position.set(-0.2, -2, -0.5);

    // 机の4つの足の位置を調整
    leg1.position.set(-0.9, -2.45, 0.45);
    leg2.position.set(0.6, -2.45, 0.45);
    // leg3.position.set(-0.9, -2.45, -0.45);
    // leg4.position.set(0.9, -2.45, -0.45);

    // 5. シーンにメッシュを追加
    scene.add(tableTop);
    scene.add(leg1);
    scene.add(leg2);
    // scene.add(leg3);
    // scene.add(leg4);

}