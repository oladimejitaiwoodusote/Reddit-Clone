import React, { createContext, useContext, useState} from "react";

type ModalType = "login" | "signup" | null;

interface ModalContextType {
    openModal: (type: ModalType) => void;
    closeModal: () => void;
    modalType: ModalType;
}

const ModalContext = createContext<ModalContextType | undefined> (undefined);

export function ModalProvider({children}: {children: React.ReactNode}) {
    const [modalType, setModalType] = useState<ModalType>(null);

    function openModal(type: ModalType) {
        setModalType(type);
    }

    function closeModal(){
        setModalType(null);
    }

    return (
        <ModalContext value={{modalType, openModal, closeModal}}>
            {children}
        </ModalContext>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used withing a ModalProvider");
    }

    return context;
}