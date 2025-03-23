const Loader = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            {/* Circle 1 */}
            <div className="w-4 h-4 bg-white rounded-full animate-scale-up-down circle-1"></div>

            {/* Circle 2 */}
            <div className="w-4 h-4 bg-white rounded-full animate-scale-up-down circle-2"></div>

            {/* Circle 3 */}
            <div className="w-4 h-4 bg-white rounded-full animate-scale-up-down circle-3"></div>
        </div>
    );
};

export default Loader;