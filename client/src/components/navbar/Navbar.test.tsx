import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { categories } from '../../data/categories';

describe('Navbar Component', () => {
    test('renders logo and navigation buttons', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        const logo = screen.getByRole('link', { name: /logo/i });
        expect(logo).toBeInTheDocument();

        const userButton = screen.getByRole('button', { name: /user/i });
        const cartButton = screen.getByRole('button', { name: /cart/i });
        expect(userButton).toBeInTheDocument();
        expect(cartButton).toBeInTheDocument();
    });

    test('renders categories as links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Check if all categories are rendered as links
        categories.forEach((category) => {
            const categoryLink = screen.getByText(category);
            expect(categoryLink).toBeInTheDocument();
            expect(categoryLink).toHaveAttribute('href', `/products/${category.toLowerCase().replace(/\s+/g, '-')}`);
        });
    });

    test('renders "Need Help?" text', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Check if "Need Help?" text is rendered
        const needHelpText = screen.getByText(/need help\?/i);
        expect(needHelpText).toBeInTheDocument();
    });
});