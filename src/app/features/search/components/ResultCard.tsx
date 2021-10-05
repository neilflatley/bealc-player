import React from 'react';
import Link from '~/features/link';

interface IProps {
  title: string;
  description: string;
  image: string;
  link: string;
}
const ResultCard = ({ title, description, image, link }: IProps) => {
  return (
    <div
      style={{
        maxWidth: '1024px',
        display: 'grid',
        gridTemplateColumns: '60px 7fr',
      }}
    >
      <div>
        {image && <img src={image} alt={title} style={{ width: '50px' }} />}
      </div>
      <div>
        <p>
          <Link path={link}>{title}</Link>
        </p>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default ResultCard;
