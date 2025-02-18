import React from "react"; // Import React to create a functional component
import { Toast, ToastContainer } from "react-bootstrap"; // Import Toast and ToastContainer components from react-bootstrap

/**
 * ToastService component to display a toast notification with a custom message and background color.
 * The toast will auto-hide after 2 seconds.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.message - The message to be displayed inside the toast.
 * @param {boolean} props.show - A boolean to control the visibility of the toast.
 * @param {function} props.onClose - The callback function to handle the closing of the toast.
 * @param {string} [props.bg="success"] - The background color of the toast. Defaults to "success".
 * 
 * @returns {JSX.Element} - The rendered ToastService component.
 */
const ToastService = ({ message, show, onClose, bg = "success" }) => {
  return (
    // ToastContainer is used to contain and position the toast notifications on the page
    <ToastContainer position="top-end" className="p-3"> 
      {/* Toast component displays the notification */}
      <Toast onClose={onClose} show={show} delay={2000} autohide bg={bg}>
        <Toast.Body>{message}</Toast.Body> {/* Display the message passed in props */}
      </Toast>
    </ToastContainer>
  );
};

export default ToastService; // Export the component for use in other parts of the app
