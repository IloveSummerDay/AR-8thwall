/**
 * @param {GLTF} gltf
 * @param {*} THREE
 */
export function traverseCar(gltf, THREE) {
  gltf.scene.traverse(function (child) {
    // 车身
    if (child.isMesh) {
      const pbrMaterial = new THREE.MeshPhysicalMaterial({
        color: child.material.color, // 设置基础颜色
        roughness: 0.5, // 设置粗糙度
        metalness: 0.5, // 设置金属度
        envMapIntensity: 1, // 设置环境映射强度
        clearcoat: 0.5, // 设置清漆涂层
        clearcoatRoughness: 0.5 // 设置清漆涂层的粗糙度
      })

      // checkMaterial(child)

      // name='Car006'的Mesh为车窗
      if (child.name == 'Car006') {
        child.material.transparent = true // 允许材质透明度
        child.material.opacity = 0.3 // 设置透明度值
        child.material.emissive = child.material.color
        child.material.emissiveMap = child.material.map
        return
      }
      // 关闭子网格对象的视锥体剔除
      child.frustumCulled = false
      //模型阴影
      child.castShadow = true
      // 给模型添加 PBR 材质
      child.material = pbrMaterial
    }

    // 车轮
    if (child.isGroup) {
      child.traverse(function (groupChild) {
        if (groupChild.isMesh) {
          groupChild.material = new THREE.MeshPhysicalMaterial({
            color: groupChild.material.color, // 设置基础颜色
            // color: 0xffffff, // 设置基础颜色
            roughness: 0.9, // 设置粗糙度
            metalness: 0.8, // 设置金属度
            envMapIntensity: 1, // 设置环境映射强度
            clearcoat: 0.5, // 设置清漆涂层
            clearcoatRoughness: 0.5 // 设置清漆涂层的粗糙度
          })
          groupChild.material.transparent = true // 允许材质透明度
          groupChild.material.opacity = 0.2 // 设置透明度值
        }
      })
    }
  })
}
/**
 * @param {GLTF} gltf
 * @param {*} THREE
 */
export function traverseCastle(gltf, THREE) {
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      // checkMaterial(child)
      // 关闭子网格对象的视锥体剔除
      //   child.frustumCulled = false
      // 模型阴影
      //   child.castShadow = true
      //   child.material.emissive = child.material.color // 自发光颜色
      //   child.material.emissiveMap = child.material.map // 自发光贴图
      //   child.material.emissiveIntensity = 1 // 增强自发光强度
    }
  })
}
/**
 * @param {GLTF} gltf
 * @param {*} THREE
 */
export function traverseTV(gltf, THREE) {
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.material.emissive = new THREE.Color(0xffffff) // 自发光颜色
      child.material.emissiveMap = child.material.map // 自发光贴图
      child.material.emissiveIntensity = 2 // 增强自发光强度
    }
  })
}

/**
 * @desc 检查Mesh模型对象材质类型、有无纹理贴图
 * @param {Mesh} mesh
 */
export function checkMaterial(mesh) {
  if (mesh.material) {
    // 获取子对象的材质属性
    const material = mesh.material

    // 输出材质的类型
    console.log('材质类型:', material.type)

    // 根据需要可以进一步检查其他材质属性
    // 例如判断是否有纹理贴图
    if (material.map) {
      console.log('有纹理贴图')
    } else {
      console.log('没有纹理贴图')
    }
  } else {
    console.log('该对象没有材质')
  }
}
