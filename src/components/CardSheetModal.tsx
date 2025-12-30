import React, { useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Expand, Shrink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useSystemStore from "@/store/use-system.store";

interface CardSheetModalProps {
  openModal: boolean;
  titre?: string;
  description?: string;
  setOpenModal: (open: boolean) => void;
  children: React.ReactNode;
}

const CardSheetModal: React.FC<CardSheetModalProps> = ({
  openModal,
  titre,
  description,
  setOpenModal,
  children,
}) => {
  const { expandSheet: isExpanded, setExpandSheet: setIsExpanded } =
    useSystemStore();

  const handleClose = useCallback(() => {
    setOpenModal(false);
    setIsExpanded(false);
  }, [setOpenModal, setIsExpanded]);

  return (
    <AnimatePresence mode="wait">
      {openModal && (
        <>
          {/* Overlay with fade animation */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="bg-black/50 z-999  fixed top-0 right-0 left-0 bottom-0 "
            aria-hidden="true"
          />

          {/* Drawer with slide animation */}
          <motion.div
            key="drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed right-1 top-1 z-999 max-sm:left-1 bottom-1 bg-white rounded border border-gray-500 shadow-lg overflow-y-auto",
              isExpanded ? "left-1" : "sm:w-[450px]"
            )}
          >
            {/* Header */}
            <div className="flex  justify-between items-center p-4 sticky top-0 z-999 bg-white dark:bg-gray-800">
              {titre && (
                <div className="text-gray-900">
                  <h2 className="font-poppins font-semibold">{titre}</h2>
                  {description && (
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center ml-auto gap-4">
                {isExpanded ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Fermer"
                  >
                    <Shrink size={16} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(true)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Fermer"
                  >
                    <Expand size={16} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={cn(
                "px-4 z-999",
                isExpanded ? " container mx-auto " : "w-full"
              )}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CardSheetModal;
