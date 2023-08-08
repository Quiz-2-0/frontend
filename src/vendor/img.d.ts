declare module '*.jpg' {
  const value: never;
  export = value;
}

declare module '*.png' {
  const value: never;
  export = value;
}

declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
