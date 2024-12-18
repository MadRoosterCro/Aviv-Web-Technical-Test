import ListingCard from '@components/ListingCard';
import ListingForm from '@components/ListingForm';
import { useFetchListings } from '@/hooks/useListings';

import styles from './listings.module.scss';
import { Listing } from '@/components/ListingCard/ListingCard';

const Listings = () => {
  const { data: listings, isLoading, error, refetch } = useFetchListings();

  if (isLoading) return <p>Loading listings...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className={styles['listings']}>
      <h1 className={styles['listings__title']}>Main Listings Page</h1>
      <div className={styles['listings__wrapper']}>
        <aside className={styles['listings__aside']}>
          <h2 className={styles['listings__sub-title']}>Add a Listing</h2>
          <ListingForm refetch={refetch} />
        </aside>
        <section className={styles['listings__section']}>
          <h2 className={styles['listings__sub-title']}>Listings</h2>
          {listings?.map((listing: Listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Listings;
