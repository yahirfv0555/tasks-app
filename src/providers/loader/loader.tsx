
export interface LoaderProps {
    color?: string;
}

const Loader: React.FC<LoaderProps> = props => {
    const { color } = props;

    return ( 
        <div className="fixed inset-0 flex items-center justify-center bg-[#0000000f] x-[100]">
             <div 
                className={`w-20 h-20 border-4 border-8 border-blue-500 border-dashed rounded-full animate-spin mx-auto border-[${color}]`}
            />
        </div>
    );
}

export default Loader;