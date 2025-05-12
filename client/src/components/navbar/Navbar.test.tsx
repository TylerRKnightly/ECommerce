import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { categories } from '../../data/mockCategories';
import { Provider } from 'react-redux';
import { store } from '../../store/store'

const getComponent = () => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        </Provider>
    );
}

describe('Navbar Component', () => {
    test('renders logo and navigation buttons', () => {
        getComponent();

        const logo = screen.getByRole('link', { name: /logo/i });
        expect(logo).toBeInTheDocument();

        const userButton = screen.getByRole('button', { name: /user/i });
        const cartButton = screen.getByRole('button', { name: /cart/i });
        expect(userButton).toBeInTheDocument();
        expect(cartButton).toBeInTheDocument();
    });

    test('renders categories as links', () => {
        getComponent();

        // Check if all categories are rendered as links
        categories.forEach((category) => {
            const categoryLink = screen.getByText(category);
            expect(categoryLink).toBeInTheDocument();
            expect(categoryLink).toHaveAttribute('href', `/products/${category.toLowerCase().replace(/\s+/g, '-')}`);
        });
    });

    test('renders "Need Help?" text', () => {
        getComponent();

        // Check if "Need Help?" text is rendered
        const needHelpText = screen.getByText(/need help\?/i);
        expect(needHelpText).toBeInTheDocument();
    });
});