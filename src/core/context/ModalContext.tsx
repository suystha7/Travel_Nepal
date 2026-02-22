import EmailSentConfirm from "@/app/(auth)/login/emailSentConfirm";
import ForgotPassword from "@/app/(auth)/login/forgotPassword";
import Login from "@/app/(auth)/login/login";
import ResetConfirm from "@/app/(auth)/login/passwordResetConfirm";
import SetNewPassword from "@/app/(auth)/login/setNewPassword";
import Register from "@/app/(auth)/login/signup";
import { createContext, ReactNode, useContext, useState } from "react";
// import LoginPasswordModal from "../components/modal/LoginPasswordModal";
// import OtpRegisterVerifyModal from "../components/modal/OtpRegisterVerifyModal";
// import RegisterModal from "../components/modal/RegisterModal";

export type ModalType =
  | "login"
  | "signup"
  | "otpRegisterVerify"
  | "forgotPassword"
  | "emailSentConfirm"
  | "resetConfirm"
  | "setNewPassword"
  | null;

interface ModalContextType {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      <Login
        isOpen={modalType == "login"}
        onClose={() => setModalType(null)}
        onSuccess={() => setModalType(null)}
      />
      <Register
        isOpen={modalType == "signup"}
        onClose={() => setModalType(null)}
        onSuccess={() => setModalType(null)}
      />
      <ForgotPassword
        isOpen={modalType == "forgotPassword"}
        onClose={() => setModalType(null)}
        onSuccess={() => setModalType(null)}
      />
      <EmailSentConfirm
        isOpen={modalType == "emailSentConfirm"}
        onClose={() => setModalType(null)}
        onSuccess={() => setModalType(null)}
      />
      <ResetConfirm
        isOpen={modalType == "resetConfirm"}
        onClose={() => setModalType(null)}
        onSuccess={() => setModalType(null)}
      />
      <SetNewPassword
        isOpen={modalType == "setNewPassword"}
        onClose={() => setModalType(null)}
        onSuccess={() => setModalType(null)}
      />
      {/* <ForgotPassword
        isOpen={modalType == "forgotPassword"}
        onClose={() => setModalType(null)}
        onSuccess={() => setModalType(null)}
      /> */}

      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
