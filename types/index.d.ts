import _Vue from "vue"
import {RavenStatic} from 'raven-js'

// Adds VueRaven method signatures to Vue instance (ie this.$raven)
declare module 'vue/types/vue' {
  interface Vue {
    $raven: RavenStatic,
  }
}

export declare type VueRavenConfig = {
  disableReport?: boolean,
  disableAutoReport?: boolean,
  dsn?: string,
  public_dsn?: string,
  public_key?: string,
  private_key?: string,
  host?: string,
  protocol?: string,
  project_id?: string,
  path?: string,
  config?: {
    environment?: string
  }
};

declare const _default: {
    install(Vue: typeof _Vue, config: VueRavenConfig): void;
};
 
export default _default;
export const Raven: RavenStatic;
export const version: string;
