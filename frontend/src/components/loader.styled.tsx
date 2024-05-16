import styled from 'styled-components'

export const LoaderDiv = styled.div<{ $width?: string; $color?: string; $padding?: string }>`
  width: ${(props) => props.$width || '50px'};
  padding: ${(props) => props.$padding || '8px'};
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  background: ${(props) => props.$color || `white`};

  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: loader 1s infinite linear;

  @keyframes loader {
    to {
      transform: rotate(1turn);
    }
  }
`