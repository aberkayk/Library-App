import React from "react";

const Error = () => {
    return (
        <div>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="alert alert-danger" role="alert">
                    An error occured while loading application. Please try again.
                </div>
            </div>
        </div>
    );
};

export default Error;
