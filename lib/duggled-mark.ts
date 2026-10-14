import { Shape, ExtrudeGeometry } from 'three';

/** The two original paths from public/duggled-d.svg, in world coordinates. */
export function createDuggledMarkGeometry(low = false) {
  const x = (value: number) => (value - 291) * .0105;
  const y = (value: number) => (258.5 - value) * .0105;
  const mark = new Shape();
  mark.moveTo(x(139), y(103));
  mark.lineTo(x(293), y(103));
  mark.bezierCurveTo(x(384), y(103), x(457), y(172), x(457), y(258));
  mark.bezierCurveTo(x(457), y(344), x(385), y(414), x(293), y(414));
  mark.lineTo(x(139), y(414));
  mark.quadraticCurveTo(x(125), y(414), x(125), y(400));
  mark.lineTo(x(125), y(349));
  mark.quadraticCurveTo(x(125), y(334), x(139), y(334));
  mark.lineTo(x(286), y(334));
  mark.bezierCurveTo(x(332), y(334), x(369), y(300), x(369), y(257));
  mark.bezierCurveTo(x(369), y(214), x(332), y(180), x(286), y(180));
  mark.lineTo(x(139), y(180));
  mark.quadraticCurveTo(x(125), y(180), x(125), y(166));
  mark.lineTo(x(125), y(117));
  mark.quadraticCurveTo(x(125), y(103), x(139), y(103));
  mark.closePath();
  const dot = new Shape();
  dot.moveTo(x(138), y(218)); dot.lineTo(x(190), y(218));
  dot.quadraticCurveTo(x(203), y(218), x(203), y(231)); dot.lineTo(x(203), y(282));
  dot.quadraticCurveTo(x(203), y(295), x(190), y(295)); dot.lineTo(x(138), y(295));
  dot.quadraticCurveTo(x(125), y(295), x(125), y(282)); dot.lineTo(x(125), y(231));
  dot.quadraticCurveTo(x(125), y(218), x(138), y(218)); dot.closePath();
  const geometry = new ExtrudeGeometry([mark, dot], {
    depth: .52, steps: 1, bevelEnabled: true, bevelThickness: .04, bevelSize: .035,
    bevelSegments: low ? 2 : 4, curveSegments: low ? 16 : 32,
  });
  geometry.translate(0, 0, -.26);
  return geometry;
}
