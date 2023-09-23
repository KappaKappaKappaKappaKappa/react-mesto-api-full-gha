import { useEffect } from "react";

export function useClosePopup(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOverlay = (e) => {
      if (e.target.classList.contains("pop-up_opened")) {
        onClose();
      }
    };

    const handlePressEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOverlay);
    document.addEventListener("keydown", handlePressEsc);

    return () => {
        document.removeEventListener("mousedown", handleClickOverlay);
        document.removeEventListener("keydown", handlePressEsc);
    }
  }, [isOpen, onClose]);
}
