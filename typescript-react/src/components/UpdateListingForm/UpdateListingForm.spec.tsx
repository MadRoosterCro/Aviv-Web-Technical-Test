import { render } from '@testing-library/react';
import UpdateListingForm from '.';

describe('<UpdateListingForm />', () => {
  it('Should render the update listing form component', () => {
    const mockRefetch = jest.fn();
    render(
      <UpdateListingForm
        listingId={1}
        currentPrice="100000"
        refetch={mockRefetch}
      />,
    );
  });
});
