// /components/NextBreadcrumb.tsx

'use client';

import React, { ReactElement, ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  capitalizeLinks: boolean;
};

const BasicBreadcrumbs = ({
  homeElement,
  separator,
  capitalizeLinks,
}: TBreadCrumbProps): ReactElement | null => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  if (paths === '/') {
    return null; 
  }

  return (
    <div>
      <ul className="flex list-none font-normal px-3 bg-gray-300 justify-center text-2xl {$containerClasses}">
        <li className="pb-2 font-normal px-3 hover:underline {$listClasses}">
          <Link href="/">{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key="elLink">
              <li className="font-normal px-3 hover:underline {$itemClasses} ">
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default BasicBreadcrumbs;
