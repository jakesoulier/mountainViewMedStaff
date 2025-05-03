// import "../assets/ButtonStyles.css";
import '../assets/CardStyles.css';

function CardLink({ text, link, imgSrc }: { text: string, link: string, imgSrc: string }) {
    return (
        <a className="text-white m-4 h-full hover:shadow-lg hover:shadow-black/50 hover:underline" href={link} target="_blank" rel="noopener noreferrer">
            <div className="bg-mountainview-green text-center items-center card-link">
                <img src={imgSrc} alt="hospital" />
                <h1 className="p-1 text-lg">{text}</h1>
            </div>
        </a>
    );
}

export default CardLink;