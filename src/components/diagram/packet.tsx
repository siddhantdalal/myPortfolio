/**
 * A dot travelling along an SVG path, like a message on the wire. Uses native SVG animation, so it
 * costs no JavaScript per frame. The negative start offset staggers packets without them waiting,
 * parked at the origin, for their turn.
 */
export function Packet({
  pathId,
  duration,
  offset = 0,
  className = "fill-accent",
}: {
  pathId: string;
  duration: number;
  offset?: number;
  className?: string;
}) {
  const timing = { dur: `${duration}s`, begin: `-${offset}s`, repeatCount: "indefinite" } as const;
  return (
    <circle r={3.5} className={className}>
      <animateMotion {...timing} calcMode="linear">
        <mpath href={`#${pathId}`} />
      </animateMotion>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" {...timing} />
    </circle>
  );
}
