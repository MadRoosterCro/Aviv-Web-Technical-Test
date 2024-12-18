import { render } from '@testing-library/react';
import ListingForm from '.';

describe('<ListingForm />', () => {
  it('Should render the listing form component', () => {
    const mockRefetch = jest.fn();
    render(<ListingForm refetch={mockRefetch} />);
  });
});
