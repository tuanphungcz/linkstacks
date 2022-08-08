import ReactCanvasConfetti from 'react-canvas-confetti';

const style: any = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 300,
  left: 200
};

export default function ConfettiCanvas({ getInstance }) {
  return <ReactCanvasConfetti refConfetti={getInstance} style={style} />;
}
