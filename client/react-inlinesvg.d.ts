declare module 'react-inlinesvg' {
  import React from 'react';

  interface SVGProps {
    src: string;
    height?: number;
    width?: number;
    title?: string;
    [key: string]: any;
  }

  const SVG: React.FC<SVGProps>;

  export default SVG;
}
