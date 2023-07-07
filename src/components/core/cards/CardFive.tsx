import Image from 'next/image';

import LoadingBox from '../spinners/LoadingBox';

interface CardProps {
  backgroundColor: string;
  number: number | string;
  loading: boolean;
  text: string;
  icon: any;
  alt: string;
  class?: string
}

const CardFive = (props: CardProps) => {
  return (
    <div
      className={`card__container ${props.class}`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="card__row">
        <p className="card__description">
          {props.text}
        </p>
        <Image
          width={128}
          height={128}
          className="card__icon"
          src={props.icon}
          alt={props.alt}
        />
      </div>
      <div className="card__row">
        <div className="card__number card__number--five">{props.loading ? <LoadingBox /> : props.number}</div>
      </div>
    </div>
  );
};

export default CardFive;
