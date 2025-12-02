import { forwardRef } from "react";

// Input dasar dengan ref forwarding untuk akses nilai di parent
export const Input = forwardRef((props, ref) => {
    const {type, placeholder, name} = props;
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            ref={ref}
            className={"w-full px-3 py-2 border border-gray-300 rounded-md " +
        "focus:outline-none focus:border-blue-500 transition-colors "}
        />
    );
});
