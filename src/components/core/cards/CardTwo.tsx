import Image from 'next/image';

interface CardProps {
  backgroundColor: string;
  number: number;
  text: string;
  icon: any;
  alt: string;
}

const CardTwo = (props: CardProps) => {
  return (
    <div
      className="card__container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="card__row">
        <div className="card__number">{props.number}</div>
        <Image
          width={128}
          height={128}
          className="card__icon"
          src={props.icon}
          alt={props.alt}
        />
      </div>
      <div className="card__description">
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default CardTwo;
