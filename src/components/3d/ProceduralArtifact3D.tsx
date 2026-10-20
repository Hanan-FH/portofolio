import { GalaxyScene, type GalaxySceneProps } from '../galaxy/GalaxyScene';

export type ProceduralArtifact3DProps = GalaxySceneProps;

/**
 * ProceduralArtifact3D adapter.
 * Re-exports the isolated GalaxyScene subsystem for backward compatibility.
 */
export function ProceduralArtifact3D(props: ProceduralArtifact3DProps) {
  return <GalaxyScene {...props} />;
}

export default ProceduralArtifact3D;
