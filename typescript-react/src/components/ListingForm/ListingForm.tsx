import { useState } from 'react';
import { useAddListing } from '@/hooks/useListings';
import styles from './listing-form.module.scss';

const ListingForm = ({ refetch }: { refetch: () => void }) => {
  const { mutate: addListing, isPending } = useAddListing();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latest_price_eur: '',
    surface_area_m2: '',
    street_address: '',
    postal_code: '',
    city: '',
    country: 'DE',
    building_type: 'STUDIO',
    rooms_count: '',
    bedrooms_count: '',
    contact_phone_number: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      name,
      description,
      latest_price_eur,
      surface_area_m2,
      street_address,
      postal_code,
      city,
      country,
      building_type,
      rooms_count,
      bedrooms_count,
      contact_phone_number,
    } = formData;

    if (
      !latest_price_eur ||
      !surface_area_m2 ||
      !street_address ||
      !postal_code ||
      !city ||
      !country
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const newListing = {
      name: name || 'New Listing',
      description: description || 'No description provided',
      building_type,
      latest_price_eur: parseFloat(latest_price_eur),
      surface_area_m2: parseFloat(surface_area_m2),
      rooms_count: rooms_count ? parseInt(rooms_count) : 1,
      bedrooms_count: bedrooms_count ? parseInt(bedrooms_count) : 1,
      contact_phone_number: contact_phone_number || '+1234567890',
      postal_address: {
        street_address,
        postal_code,
        city,
        country,
      },
    };

    addListing(newListing, {
      onSuccess: () => {
        alert('Listing created successfully!');
        refetch();
        setFormData({
          name: '',
          description: '',
          latest_price_eur: '',
          surface_area_m2: '',
          street_address: '',
          postal_code: '',
          city: '',
          country: 'DE',
          building_type: 'STUDIO',
          rooms_count: '',
          bedrooms_count: '',
          contact_phone_number: '',
        });
      },
      onError: (err) => {
        alert(`Failed to create listing: ${(err as Error).message}`);
      },
    });
  };

  return (
    <form className={styles['listing-form']} onSubmit={handleSubmit}>
      <div className={styles['listing-form__card']}>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="name">Name (optional):</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="description">Description (optional):</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="latest_price_eur">Price:</label>
          <input
            type="text"
            name="latest_price_eur"
            value={formData.latest_price_eur}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
            required
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="surface_area_m2">Area:</label>
          <input
            type="text"
            name="surface_area_m2"
            value={formData.surface_area_m2}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
            required
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="street_address">Street address:</label>
          <input
            type="text"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
            required
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="postal_code">Postal Code:</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
            required
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
            required
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
            required
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="building_type">Building type:</label>
          <select
            name="building_type"
            value={formData.building_type}
            onChange={handleChange}
            className={styles['listing-form__select']}
          >
            <option value="STUDIO">Studio</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
          </select>
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="rooms_count">Rooms (optional):</label>
          <input
            type="text"
            name="rooms_count"
            value={formData.rooms_count}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="bedrooms_count">Bedrooms (optional):</label>
          <input
            type="text"
            name="bedrooms_count"
            value={formData.bedrooms_count}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
          />
        </div>
        <div className={styles['listing-form__input-group']}>
          <label htmlFor="contact_phone_number">Phone (optional):</label>
          <input
            type="text"
            name="contact_phone_number"
            value={formData.contact_phone_number}
            onChange={handleChange}
            className={styles['listing-form__input-text']}
          />
        </div>
        <button
          type="submit"
          className={styles['listing-form__button--submit']}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default ListingForm;
