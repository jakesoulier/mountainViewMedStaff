
function CardLink({ text, link }: { text: string, link: string }) {
    return (
        <a className="text-white m-4 hover:shadow-lg hover:shadow-black/50 hover:underline" href={link}>
            <div className="bg-mountainview-green text-center items-center" style={{ maxWidth: "190px" }}>
                <img src="/hospitalStock.jpg" alt="hospital" />
                <h1 className="p-1 text-xl">{text}</h1>
            </div>
        </a>
    );
}

export default CardLink;