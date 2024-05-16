import { LoaderDiv } from "./loader.styled";

type LoaderProps = {
  width?: string;
  padding?: string;
  color?: string;
};

export const Loader = ({ width, padding, color }: LoaderProps) => {
  return <LoaderDiv $width={width} $padding={padding} $color={color} />;
};
