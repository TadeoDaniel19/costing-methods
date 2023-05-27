import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Link from "next/link";

export default function Navigation() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Menu>
        <MenuHandler>
          <Button variant="text" color="purple">Modelos de costeo</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <Link href="/costing/abc" className="flex items-center">
              ABC
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/costing/abm" className="flex items-center">
              ABM
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/costing/rca" className="flex items-center">
              RCA
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuHandler>
          <Button variant="text" color="purple">COCOMO</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <Link href="/cocomo/cocomo-one" className="flex items-center">
              COCOMO I
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/cocomo/cocomo-two" className="flex items-center">
              COCOMO II
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </ul>
  );
  const navListResponsive = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="span"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        Modelos de costeo
      </Typography>
      <span className="h-1 w-full bg-green-400 lg:w-1/3" />
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/costing/abc" className="flex items-center">
          ABC
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/costing/abm" className="flex items-center">
          ABM
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/costing/rca" className="flex items-center">
          RCA
        </Link>
      </Typography>
      <Typography
        as="span"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        COCOMO
      </Typography>
      <span className="h-1 w-full bg-green-400 lg:w-1/3" />
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/cocomo/cocomo-one" className="flex items-center">
          COCOMO I
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/cocomo/cocomo-two" className="flex items-center">
          COCOMO II
        </Link>
      </Typography>
    </ul>
  );


  return (
    <Navbar className="mx-auto shadow-none">
      <div className="mx-auto flex items-center justify-between text-black">
        <Typography
          as="span"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-bold text-xl"
        >
          <Link href="/" className="flex items-center">
            Métodos de costeo
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navListResponsive}
        </div>
      </MobileNav>
    </Navbar>
  );
}