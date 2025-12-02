// Label sederhana untuk input form
export const Label = (props) =>{
    const {htmlFor, children} = props;
    return(
        <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {children}
        </label>
    )
}
