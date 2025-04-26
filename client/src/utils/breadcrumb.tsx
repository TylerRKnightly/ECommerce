import { Link } from 'react-router-dom';

export const getBreadcrumb = (segments:string[]) => {
    const crumbs = segments.map(s => (
        <li className='breadcrumb-item' key={s}>
            <Link to={`/${s.toLowerCase()}`} className='text-decoration-none text-muted'>{s}</Link>
        </li>));

    return crumbs;
}