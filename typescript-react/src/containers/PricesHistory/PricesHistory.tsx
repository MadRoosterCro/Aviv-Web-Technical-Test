import PricesHistoryCard from '@components/PriceHistoryCard';
import UpdateListingForm from '@components/UpdateListingForm';
import styles from './prices-history.module.scss';
import { useParams } from 'react-router-dom';
import { useFetchPriceHistory } from '@/hooks/usePriceHistory';

const PricesHistory = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const {
    data: prices,
    isLoading,
    error,
    refetch: refetchPrices,
  } = useFetchPriceHistory(Number(listingId));

  if (isLoading) return <p>Loading price history...</p>;
  if (error) return <p>Error fetching price history: {error.message}</p>;

  return (
    <div className={styles['container']}>
      <h1>Prices History</h1>

      {prices && <PricesHistoryCard prices={prices} />}

      <div className={styles['form-container']}>
        <h2>Add or Update Price</h2>
        <UpdateListingForm
          listingId={Number(listingId)}
          currentPrice=""
          refetch={refetchPrices}
        />
      </div>

      <a href="/" className={styles['link']}>
        &larr; Back Home
      </a>
    </div>
  );
};

export default PricesHistory;
