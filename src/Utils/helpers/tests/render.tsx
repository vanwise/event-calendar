import { render, RenderResult } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import WithForm from 'Components/HOCs/WithForm';
import Routes from 'Routes';
import { getStore } from 'Store/config';

type GetComponentForForm<Values extends FieldValues = FieldValues> = (
  formMethods: UseFormReturn<Values>,
) => ReactElement;

type GetComponentWithHookForm<Values extends FieldValues = FieldValues> = (
  getComponent: GetComponentForForm<Values>,
  onFormSubmit: SubmitHandler<Values>,
) => ReactElement;

type Rerender = (element: ReactElement) => void;
type RenderWithHookFormRerendered = (getComponent: GetComponentForForm) => void;

type RenderWithHookFormReturn = Omit<RenderResult, 'rerender'> & {
  rerender: RenderWithHookFormRerendered;
};

type RenderWithHookForm = (
  ...args: Parameters<GetComponentWithHookForm>
) => RenderWithHookFormReturn;

interface GetComponentWithStoreArgs {
  component: ReactNode;
  existedStore?: ReturnType<typeof getStore>;
  preloadedState?: any;
}

function getComponentWithStore({
  component,
  existedStore,
  preloadedState,
}: GetComponentWithStoreArgs) {
  const store = existedStore || getStore(preloadedState);
  const result = <Provider store={store}>{component}</Provider>;

  return [result, store] as const;
}

function getComponentWithRouter(component: ReactNode, initialRoute = '/test') {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes />
      {component}
    </MemoryRouter>
  );
}

const getComponentWithHookForm: GetComponentWithHookForm = (
  getComponent,
  onFormSubmit,
) => {
  return <WithForm onSubmit={onFormSubmit}>{getComponent}</WithForm>;
};

export function renderWithStore(component: ReactNode, preloadedState?: any) {
  const [result, store] = getComponentWithStore({ component, preloadedState });
  const renderResult = render(result);

  const rerender: Rerender = element => {
    const [rerenderedComponent] = getComponentWithStore({
      component: element,
      existedStore: store,
    });
    renderResult.rerender(rerenderedComponent);
  };

  return [{ ...renderResult, rerender }, store] as const;
}

export function renderWithRouter(component: ReactNode, initialRoute?: string) {
  const renderResult = render(getComponentWithRouter(component, initialRoute));

  const rerender: Rerender = element => {
    const rerenderedComponent = getComponentWithRouter(element, initialRoute);
    renderResult.rerender(rerenderedComponent);
  };

  return { ...renderResult, rerender };
}

interface RenderTestAppOptions {
  initialRoute?: string;
  preloadedState?: any;
}

export function renderTestApp(
  component: ReactNode,
  options?: RenderTestAppOptions,
) {
  const componentWithRouter = getComponentWithRouter(
    component,
    options?.initialRoute,
  );
  const [renderResult, store] = renderWithStore(
    componentWithRouter,
    options?.preloadedState,
  );

  const rerender: Rerender = element => {
    const [rerenderedComponent] = getComponentWithStore({
      component: getComponentWithRouter(element, options?.initialRoute),
      existedStore: store,
    });
    renderResult.rerender(rerenderedComponent);
  };

  return [{ ...renderResult, rerender }, store] as const;
}

export const renderWithHookForm: RenderWithHookForm = (
  getComponent,
  onFormSubmit,
) => {
  const renderResult = render(
    getComponentWithHookForm(getComponent, onFormSubmit),
  );

  const rerender: RenderWithHookFormRerendered = getNewComponent => {
    const rerenderedComponent = getComponentWithHookForm(
      getNewComponent,
      onFormSubmit,
    );
    renderResult.rerender(rerenderedComponent);
  };

  return { ...renderResult, rerender };
};
