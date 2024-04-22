import './XButton.css'

const XButton = ({
    href,
    disabled = false,
}) => {
    return (
        <a href={href || 'https://www.twitter.com'} disabled={disabled} className="xbtn xbtn--blue" target='_blank' rel="noreferrer">
            <i className="xbtn__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="9px" viewBox="0 0 9 9">
                <path
                    className="svgX"
                    d="M 7.078125 0 L 8.460938 0 L 5.429688 3.820312 L 8.96875 9 L 6.191406 9 L 4.015625 5.851562 L 1.527344 9 L 0.148438 9 L 3.355469 4.914062 L -0.03125 0 L 2.8125 0 L 4.777344 2.875 Z M 6.597656 8.101562 L 7.363281 8.101562 L 2.410156 0.863281 L 1.589844 0.863281 Z M 6.597656 8.101562 "
                />
                </svg>
            </i>
            <span className="xbtn__text"> Share your results! </span>
        </a>
    )
}

export default XButton