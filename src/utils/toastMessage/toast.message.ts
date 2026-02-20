import { toast } from "react-toastify";

export const showSuccessMessage = (success: string) => {
  toast.success(success);
};

export const showErrorMessage = (error: string) => {
  toast.error(error);
};

export const showWarningMessage = (warn: string) => {
  toast.warn(warn);
};
