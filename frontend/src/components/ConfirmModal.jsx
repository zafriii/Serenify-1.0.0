import React from 'react';
import './styles/confirmModal.css';

const ConfirmModal = ({ show, message, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;