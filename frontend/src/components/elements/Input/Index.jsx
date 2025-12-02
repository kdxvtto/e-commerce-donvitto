import { Input } from "./Input";
import { Label } from "./Label";
import { forwardRef } from "react";

// Kombinasi label + input untuk form dengan forwarding ref
export const InputForm = forwardRef((props, ref) => {
    const {label, type, placeholder, name} = props;
    return(
        <div className="mb-6">
            <Label htmlFor={name}>{label}</Label>
            <Input type={type} placeholder={placeholder} name={name} ref={ref}/>
        </div>
    )
})
