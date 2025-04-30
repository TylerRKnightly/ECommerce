const ProductsFilter = ({ selectedFilters, setSelectedFilters }: ProductsFilterProps) => {

    const handleToggle = (tag: string) => {
        setSelectedFilters((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    const itemTypes = ['mug', 'plate', 'notebook', 'mouse'];
    const materials = ['ceramic', 'metal', 'paper'];
    const categories = ['drinkware', 'plateware', 'stationery', 'accessory'];

    const renderCheckboxGroup = (title: string, options: string[]) => (
        <div className="mb-4">
            <h6 className="text-uppercase">{title}</h6>
            {options.map((tag) => (
                <div key={tag} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={tag}
                        checked={selectedFilters.includes(tag)}
                        onChange={() => handleToggle(tag)}
                    />
                    <label className="form-check-label" htmlFor={tag}>
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </label>
                </div>
            ))}
        </div>
    );
    return (
        <div className='p-2' style={{ width: '250px' }}>

            <h3 className="mb-4">Filter</h3>
            {renderCheckboxGroup('Item Type', itemTypes)}
            {renderCheckboxGroup('Material', materials)}
            {renderCheckboxGroup('Category', categories)}
        </div>
    );
}

export default ProductsFilter;

interface ProductsFilterProps {
    selectedFilters: string[];
    setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}