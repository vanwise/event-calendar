import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

type ModalComponents = Record<string, ReactNode>;
export let setModalsInContainer:
  | Dispatch<SetStateAction<ModalComponents>>
  | undefined;

function ModalsContainer() {
  const [modals, setModals] = useState<ModalComponents>({});

  useEffect(() => {
    setModalsInContainer = setModals;
  }, []);

  return (
    <div className="Modals">
      {Object.keys(modals).map(modalId => (
        <Fragment key={modalId}>{modals[modalId]}</Fragment>
      ))}
    </div>
  );
}

export default ModalsContainer;
