
export interface MessageProps {
    title?: string;
    message: string;
    type: 'error' | 'success' | 'warning';
}

const Message: React.FC<MessageProps> = props => {
    const { message, title, type } = props;

    return (
        <div className={`Message ${type==='error' ? 'Message-Error' : ''}`}>
            <div className="flex flex-col">
                {title === undefined && type === 'success' &&
                    <span className="text-green ">Éxito</span>  
                }
                {title === undefined && type === 'warning' &&
                    <span className="">Abvertencia</span>  
                }
                {title === undefined && type === 'error' &&
                    <span className="Message-Title">Error</span>  
                }
                {title !== undefined &&
                    <span>{title}</span>  
                }
                <div className="Message-Text">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default Message;