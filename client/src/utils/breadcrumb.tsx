import { Link } from 'react-router-dom';

export const getBreadcrumb = (segments:string[]) => {
    const crumbs = segments.map(s => (
        <li className='breadcrumb-item' key={s}>
            <Link to={`/${s.toLowerCase()}`} className='text-decoration-none text-muted'>{s}</Link>
        </li>));

    crumbs.unshift(<li className='breadcrumb-item'><Link to='/' className='text-decoration-none text-muted'>Home</Link></li>);
    return crumbs;
}