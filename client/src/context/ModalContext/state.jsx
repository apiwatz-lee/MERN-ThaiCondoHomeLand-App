import { useContext, createContext, useState } from 'react';

const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
  const loginModal = () => {
    const initialLogin = {
      visible: false,
      username: '',
      password: '',
    };

    const [modalLogin, setModalLogin] = useState(initialLogin);

    return { initialLogin, modalLogin, setModalLogin };
  };

  return (
    <ModalContext.Provider value={{ loginModal: loginModal() }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
