interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}
const Logo: React.FC<LogoProps> = ({ className, width, height }) => {
    return (
        <>
            <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="DijkstraVerse Logo"
                width={width}
                height={height}
                className={className}
            />
        </>
    )
}

export default Logo;