import { MockEnvironmentBuilder } from "./MockEnvironmentBuilder";
import {
  ISearchInterfaceSetup,
  ISearchInterfaceConstructor,
  IComponentConstructorWithResult,
  IComponentConstructorWithResultAndModalBox,
  IBasicComponentSetupWithModalBox,
  IBasicComponentSetup,
  IComponentConstructor,
  IComponentConstructorWithModalBox
} from "./ComponentsSetup";
import {
  SearchInterface,
  $$,
  IQueryResult,
  ISearchInterfaceOptions,
  Component
} from "coveo-search-ui";
import * as Simulate from "../Simulate";

export function optionsSearchInterfaceSetup<
  T extends SearchInterface,
  U extends ISearchInterfaceOptions
>(
  klass: ISearchInterfaceConstructor<T>,
  options: U,
  ...args: any[]
): ISearchInterfaceSetup<T> {
  const div = $$("div").el;
  const envBuilder = new MockEnvironmentBuilder().withRoot(div);
  const component = <T>new klass(div, options, ...args);
  envBuilder.searchInterface = component;
  return {
    env: envBuilder.build(),
    cmp: component
  };
}

export function optionsResultComponentSetup<T extends Component, U>(
  klass: IComponentConstructorWithResult<T>,
  options: U,
  result: IQueryResult,
  ...args: any[]
): IBasicComponentSetup<T> {
  const envBuilder = new MockEnvironmentBuilder().withResult(result);
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      envBuilder.result,
      ...args
    )
  };
}

export function optionsResultComponentSetupWithModalBox<T extends Component, U>(
  klass: IComponentConstructorWithResultAndModalBox<T>,
  options: U,
  result: IQueryResult,
  ...args: any[]
): IBasicComponentSetupWithModalBox<T> {
  const envBuilder = new MockEnvironmentBuilder().withResult(result);
  const modalBox = Simulate.modalBoxModule();

  return {
    env: envBuilder.build(),
    modalBox: modalBox,
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      envBuilder.result,
      modalBox,
      ...args
    )
  };
}

export function optionsComponentSetup<T extends Component, U>(
  klass: IComponentConstructor<T>,
  options: U,
  ...args: any[]
): IBasicComponentSetup<T> {
  const envBuilder = new MockEnvironmentBuilder();
  return {
    env: envBuilder.build(),
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      ...args
    )
  };
}

export function optionsComponentSetupWithModalBox<T extends Component, U>(
  klass: IComponentConstructorWithModalBox<T>,
  options: U,
  ...args: any[]
): IBasicComponentSetupWithModalBox<T> {
  const envBuilder = new MockEnvironmentBuilder();
  const modalBox = Simulate.modalBoxModule();

  return {
    env: envBuilder.build(),
    modalBox: modalBox,
    cmp: <T>new klass(
      envBuilder.getBindings().element,
      options,
      envBuilder.getBindings(),
      modalBox,
      ...args
    )
  };
}
