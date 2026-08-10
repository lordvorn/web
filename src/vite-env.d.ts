/// <reference types="vite/client" />

declare module '*.css'

import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'hana-viewer': DetailedHTMLProps<
          HTMLAttributes<HTMLElement> & { url?: string },
          HTMLElement
        >
      }
    }
  }
}
