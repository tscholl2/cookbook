import { VNode } from 'superfine';

declare global {
    namespace JSX {
        interface Element extends VNode<any> { }
        interface IntrinsicElements {
            [elemName: string]: any
        }
    }
}