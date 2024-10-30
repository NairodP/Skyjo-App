import { useEffect } from "react";

function useBeforeUnloadWarning(shouldWarn: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldWarn) {
        event.preventDefault();
      }
    };

    // Ajoute le listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Supprime le listener lors du nettoyage du composant
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldWarn]);
}

export default useBeforeUnloadWarning;