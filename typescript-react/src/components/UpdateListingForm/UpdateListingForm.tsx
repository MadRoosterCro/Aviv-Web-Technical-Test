import { useState } from 'react';
import { updateListing } from '@/libs/api';
import styles from './update-listing-form.module.scss';

const UpdateListingForm = ({
  listingId,
  currentPrice = '',
  refetch,
}: {
  listingId: number;
  currentPrice?: string;
  refetch: () => void;
}) => {
  const [latestPrice, setLatestPrice] = useState(currentPrice);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatestPrice(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await updateListing(listingId, {
        latest_price_eur: parseFloat(latestPrice),
      });
      alert('Price updated successfully!');
      refetch();
    } catch (err: any) {
      alert(`Failed to update price: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className={styles['listing-form']} onSubmit={handleSubmit}>
      <div className={styles['listing-form__card']}>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="latest_price_eur">Price (EUR):</label>
          <input
            type="number"
            name="latest_price_eur"
            value={latestPrice}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
            required
          />
        </div>
        <button
          type="submit"
          className={styles['listing-form__button--submit']}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Price'}
        </button>
      </div>
    </form>
  );
};

export default UpdateListingForm;
