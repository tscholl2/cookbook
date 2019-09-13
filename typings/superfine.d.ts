declare module "superfine" {

  export type Children = VNode | string | number | null

  /**
   * The virtual DOM representation of an Element.
   */
  export interface VNode<Props = {}> {
    name: string,
    props: Props,
    children: Array<VNode>,
    key: string | null,
    type: number
  }

  /**
   * Create a new virtual DOM node. A virtual DOM is a description of what a DOM should look like using a tree of virtual nodes.
   * @param name The name of an Element or a function that returns a virtual DOM node.
   * @param props HTML props, SVG props, DOM events, Lifecycle Events, and Keys.
   * @param children The element's child nodes.
   */
  export function h<Props>(
    name: string | ((props: Props, children?: Array<Children | Children[]>) => VNode<Props>),
    props?: Props | null,
    ...children: Array<Children | Children[]>
  ): VNode<Props>


  /**
   * Render a virtual DOM node into a DOM element.
   *
   * @param {node} node A DOM element where the virtual DOM will be rendered.
   * @param {VNode} vdom The virtual DOM to be rendered.
   * @returns {node} The updated DOM element containing the rendered VDOM.
   **/
  export function patch(
    node: Element,
    vdom: VNode,
  ): Element
}

