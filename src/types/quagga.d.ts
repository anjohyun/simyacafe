declare module 'quagga' {
  export interface QuaggaJSConfigObject {
    inputStream?: {
      type?: string;
      target?: HTMLElement | null;
      constraints?: {
        width?: number;
        height?: number;
        facingMode?: string;
      };
    };
    decoder?: {
      readers?: string[];
    };
    locate?: boolean;
  }

  export interface QuaggaJSResultObject {
    codeResult?: {
      code?: string;
    };
  }

  namespace Quagga {
    function init(config: QuaggaJSConfigObject, callback: (err: Error | null) => void): void;
    function start(): void;
    function stop(): void;
    function onDetected(callback: (result: QuaggaJSResultObject) => void): void;
    function offDetected(callback: (result: QuaggaJSResultObject) => void): void;
  }

  export default Quagga;
}
