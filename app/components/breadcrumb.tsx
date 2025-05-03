import React from 'react';
import { FaHome } from "react-icons/fa";

interface BreadcrumbProps {
  path?: string; // Make path optional
  cmePath?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path = '', cmePath = false }) => { // Default to empty string
  // console.log('breadcrumb path: ', path);
  const pathnames = path.split('/').filter((x) => x);
  return (
    <nav aria-label="breadcrumb" className='p-3 bg-mountainview-cream text-blue-600'>
      <ol className="flex space-x-2 ">
        <li>
          <a href="/" className="hover:underline flex items-center">
          <FaHome className='mr-1'/> Home
          </a>
        </li>

        {cmePath && (
          <li className="flex items-center">
            <span className="mx-2">{'>'}</span>
            <a href="/cme" className="hover:underline">
              cme
            </a>
          </li>
        )}

        {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">{'>'}</span>
              {isLast ? (
                <span>{value}</span>
              ) : (
                <a href={href} className="hover:underline">
                  {value}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;