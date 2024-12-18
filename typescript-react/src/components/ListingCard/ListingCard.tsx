import styles from './listing-card.module.scss';
export type Listing = ListingRead & ListingWrite;

export interface ListingRead {
  id: number;
  created_date: string;
  updated_date: string;
}

export interface ListingWrite {
  name: string;
  postal_address: PostalAddress;
  description: string;
  building_type: 'STUDIO' | 'APARTMENT' | 'HOUSE';
  latest_price_eur: number;
  surface_area_m2: number;
  rooms_count: number;
  bedrooms_count: number;
  contact_phone_number?: string;
}

export interface PostalAddress {
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => (
  <article className={styles['listing-card']}>
    <span className={styles['listing-card__price']}>
      {listing.latest_price_eur.toLocaleString()} &euro;
    </span>
    <ul className={styles['listing-card__properties']}>
      <li className={styles['listing-card__properties-item']}>
        {listing.building_type}
      </li>
      <li className={styles['listing-card__properties-item']}>
        {listing.surface_area_m2}m<sup>2</sup>
      </li>
      <li className={styles['listing-card__properties-item']}>
        {listing.rooms_count} rooms
      </li>
    </ul>
    <section className={styles['listing-card__address']}>
      <address>
        {listing.postal_address.street_address},{' '}
        {listing.postal_address.postal_code}, {listing.postal_address.city}
      </address>
    </section>
    <section className={styles['listing-card__description']}>
      <h3>Property description:</h3>
      <p>{listing.description}</p>
    </section>
    <div className={styles['listing-card__footer']}>
      <p className={styles['listing-card__reference']}>
        Ref: {listing.id} <br />
        Last update: {new Date(listing.updated_date).toLocaleDateString()}
      </p>
      <a
        href={`/${listing.id}/prices`}
        className={styles['listing-card__link']}
      >
        See history &rarr;
      </a>
    </div>
  </article>
);

export default ListingCard;
