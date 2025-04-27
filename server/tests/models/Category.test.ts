import { Category } from './Category';

describe('Category Interface', () => {
    it('should create a valid Category object', () => {
        const category: Category = {
            name: 'Electronics',
            tags: ['gadgets', 'devices']
        };

        expect(category.name).toBe('Electronics');
        expect(category.tags).toEqual(['gadgets', 'devices']);
    });

    it('should fail if name is not a string', () => {
        const invalidCategory = {
            name: 123, // Invalid type
            tags: ['gadgets', 'devices']
        };

        // TypeScript will catch this error during compilation, but for runtime testing:
        expect(() => {
            const category: Category = invalidCategory as unknown as Category;
        }).toThrowError();
    });

    it('should fail if tags is not an array of strings', () => {
        const invalidCategory = {
            name: 'Electronics',
            tags: 'not-an-array' // Invalid type
        };

        // TypeScript will catch this error during compilation, but for runtime testing:
        expect(() => {
            const category: Category = invalidCategory as unknown as Category;
        }).toThrowError();
    });
});