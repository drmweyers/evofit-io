import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

const NextImage = ({ src, alt, width, height, className, style }: ImageProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} style={style} />
  );
};

export default NextImage;
