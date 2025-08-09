// Unity WebGL TypeScript Definitions
// Create this file as: src/types/unity.d.ts

declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: {
        dataUrl: string;
        frameworkUrl: string;
        codeUrl: string;
        streamingAssetsUrl: string;
        companyName: string;
        productName: string;
        productVersion: string;
      },
      onProgress?: (progress: number) => void
    ) => Promise<{
      Quit: () => Promise<void>;
      SendMessage: (objectName: string, methodName: string, value?: any) => void;
      Module?: any;
    }>;
  }
}

export {};