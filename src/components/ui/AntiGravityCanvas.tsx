import { Starfield, type StarfieldProps } from '../galaxy/Starfield';

export type AntiGravityCanvasProps = StarfieldProps;

/**
 * AntiGravityCanvas adapter.
 * Re-exports the high-performance Galaxy Starfield subsystem for backward compatibility.
 */
export function AntiGravityCanvas(props: AntiGravityCanvasProps) {
  return <Starfield {...props} />;
}

export default AntiGravityCanvas;
