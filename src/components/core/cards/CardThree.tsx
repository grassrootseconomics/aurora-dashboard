import Image from 'next/image';

import LoadingBox from '../spinners/LoadingBox';

interface CardProps {
  backgroundColor: string;
  number: number | undefined;
  loading: boolean;
  text: string;
  icon: any;
  alt: string;
  maxIconWidth: string;
}

const CardThree = (props: CardProps) => {
  return (
    <div
      className="card__container"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="card__row">
        <div className="card__column">
          <div className="card__description">
            <p>{props.text}</p>
          </div>
          <div className="card__number">
            {props.loading ? (
              <LoadingBox />
            ) : props.number ? (
              (Math.round(props.number * 100) / 100).toString()
            ) : (
              <></>
            )}
          </div>
        </div>
        <Image
          width={256}
          height={256}
          className="card__icon"
          style={{ maxWidth: props.maxIconWidth }}
          src={props.icon}
          alt={props.alt}
        />
      </div>
    </div>
  );
};

export default CardThree;
