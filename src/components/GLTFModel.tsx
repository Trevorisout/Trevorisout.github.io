import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function GLTFModel({ url, opacity, transparent, wireframe, ...props }: any) {
  const { scene } = useGLTF(url) as any
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.castShadow = true
        child.receiveShadow = true
        if (opacity !== undefined) {
          child.material = child.material.clone();
          child.material.opacity = opacity;
          child.material.transparent = transparent || opacity < 1;
          child.material.wireframe = !!wireframe;
        }
      }
    })
    return clone
  }, [scene, opacity, transparent, wireframe])

  return <primitive object={clonedScene} {...props} />
}
