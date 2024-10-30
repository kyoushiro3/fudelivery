"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps extends LinkProps {
  className?: string;
  activeClassName: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({
  className,
  activeClassName,
  children,
  ...props
}) => {
  const pathName = usePathname(); //use this to know the path okay?
  const isActive = pathName === props.href; //not working HHAHAHHA

  return (
    <Link
      className={`${className} ${isActive ? activeClassName : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
