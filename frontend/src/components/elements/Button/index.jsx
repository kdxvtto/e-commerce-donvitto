// Tombol reusable dengan opsi variant dan handler click
export const Button = (props) =>{
    const {
        children,
        type='button',
        onClick=(() =>{}),
        variant = "bg-blue-500",
    } = props;
    return(
        <button className=
        {`${variant} text-white font-bold py-2 px-4 roundedtransition-colors duration-200 hover:bg-blue-600`}
        type={type} 
        onClick={onClick}>
            {children}
        </button>
    )
}
