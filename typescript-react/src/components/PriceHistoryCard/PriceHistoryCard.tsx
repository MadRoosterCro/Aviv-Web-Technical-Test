import styles from './price-history-card.module.scss';

interface PriceHistoryCardProps {
  prices: { created_date: string; price_eur: string }[];
}

const PriceHistoryCard: React.FC<PriceHistoryCardProps> = ({ prices }) => {
  return (
    <div className={styles['container']}>
      <table className={styles['price-card']}>
        <thead>
          <tr className={styles['price-card__header']}>
            <th scope="col">Date</th>
            <th scope="col">Price (EUR)</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, index) => (
            <tr key={index}>
              <td>{new Date(price.created_date).toLocaleDateString()}</td>
              <td>€{Number(price.price_eur).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceHistoryCard;
