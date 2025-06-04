

export interface ErrorMessageProps {
    message?: string;
    showing: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = props => {
    const { message, showing } = props;

    if (showing === false) return <div className="h-[0.7rem]"/>

    return (
        <div className="h-[0.7rem] m-0 p-0 text-red-400 text-[0.65rem]">
            {message}
        </div>
    );
}

export default ErrorMessage;