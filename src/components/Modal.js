import React from 'react'

const Modal = ({
    title = "",
    content = "",
    confirmButtonText = "Confirm",
    confirmButtonType = "danger",
    confirmButtonClick = () => { },
    hasConfirmButton = false,
    cancelButtonText = "Cancel",
    cancelButtonType = "primary",
    cancelButtonClick = () => { },
    visible = false
}) => {
    if (visible === false) return null
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 10,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    width: "50%",
                    padding: "20px",
                }}
            >
                <h1 className="text-center">{title}</h1>
                <p className="text-center my-3">{content}</p>
                <div className="d-flex justify-content-center gap-3 my-3">
                    <button
                        onClick={cancelButtonClick}
                        className={`btn btn-${cancelButtonType}`}
                    >
                        {cancelButtonText}
                    </button>
                    {hasConfirmButton === true && (
                        <button
                            onClick={confirmButtonClick}
                            className={`btn btn-${confirmButtonType}`}
                        >
                            {confirmButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal