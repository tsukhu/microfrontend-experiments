import { Component, h } from "@stencil/core";
@Component({
  tag: "nav-container",
  styleUrl: "nav-container.css"
})
export class NavContainer {
  render() {
    return (
      <div class="bg-gray-900 font-sans leading-normal tracking-normal">
        <main-nav />
        <div class="bg-gray-900 flex flex-col md:flex-row">
          <side-nav />
          <div class="flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
            <div class="mt-12">
              <slot name="main-content" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
