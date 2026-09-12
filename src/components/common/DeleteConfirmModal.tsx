import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X, ShieldAlert } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemTitle?: string;
  itemType?: string;
  warningMessage?: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title = 'Confirm Permanent Deletion',
  itemTitle,
  itemType = 'item',
  warningMessage = 'This action cannot be undone and will permanently remove this record from the database.',
  confirmText = 'Yes, Delete Permanently',
  cancelText = 'Cancel',
  isDeleting = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isDeleting) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border-2 border-red-200 max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Warning Strip */}
        <div className="bg-red-700 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-200" />
            <h3 className="font-serif font-bold text-sm sm:text-base tracking-wide">
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="text-white/80 hover:text-white p-1 transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Are you sure you want to delete this <span className="font-semibold text-[#111827]">{itemType}</span>?
              </p>
              {itemTitle && (
                <div className="bg-[#F8F9F5] border border-[#E5E1D8] p-3 rounded-xs text-xs font-serif font-bold text-[#111827] break-words">
                  "{itemTitle}"
                </div>
              )}
              <p className="text-[11px] text-red-600 font-medium pt-1">
                {warningMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-[#F8F9F5] px-6 py-4 border-t border-[#E5E1D8] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
