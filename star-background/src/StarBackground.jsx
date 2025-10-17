import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// Removed: import * as random from "maath/random"; // We are removing this dependency
import { useState, useRef, Suspense } from "react";

// --- Custom function to generate points uniformly in a sphere ---
const generateSpherePoints = (count, radius) => {
    const positions = new Float32Array(count * 3); // 3 coordinates (x, y, z) per point

    for (let i = 0; i < count; i++) {
        // 1. Generate radius (r) for uniform volume distribution.
        // Math.cbrt(Math.random()) ensures uniform scattering inside the sphere, not just on the surface.
        const r = radius * Math.cbrt(Math.random());
        
        // 2. Generate spherical coordinates
        const phi = Math.acos(2 * Math.random() - 1); // Inclination angle (0 to PI)
        const theta = 2 * Math.PI * Math.random();   // Azimuth angle (0 to 2*PI)

        // 3. Convert spherical (r, phi, theta) to Cartesian (x, y, z)
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        // Store positions in the Float32Array
        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
};
// -----------------------------------------------------------------


export const StarBackground = (props) => {
  const ref = useRef(null);
  
  // Now we call our custom function, which guarantees number values
  const [sphere] = useState(() =>
    generateSpherePoints(5000, 1.2)
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere} 
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <Canvas camera={{ position: [0, 0, 1] }}>
    <Suspense fallback={null}>
      <StarBackground />
    </Suspense>
  </Canvas>
);
