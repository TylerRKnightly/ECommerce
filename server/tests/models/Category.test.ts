import { Category } from '../../src/models/Category'; // Adjust the import path as necessary

describe('Category Interface', () => {
    it('should create a valid Category object', () => {
        const category: Category = {
            name: 'Electronics',
            tags: ['gadgets', 'devices']
        };

        expect(category.name).toBe('Electronics');
        expect(category.tags).toEqual(['gadgets', 'devices']);
    });
});