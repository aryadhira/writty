const Loader = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
        {/* Circle 1 */}
        <div
            className="w-4 h-4 bg-primary rounded-full animate-scale-up-down"
            style={{ animationDelay: '0s' }}
        ></div>

        {/* Circle 2 */}
        <div
            className="w-4 h-4 bg-primary rounded-full animate-scale-up-down"
            style={{ animationDelay: '0.5s' }}
        ></div>

        {/* Circle 3 */}
        <div
            className="w-4 h-4 bg-primary rounded-full animate-scale-up-down"
            style={{ animationDelay: '1s' }}
        ></div>
        </div>
    )
}

export default Loader