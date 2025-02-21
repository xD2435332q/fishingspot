import React from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Globe, Menu, User } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

const Navbar = ({
  onLoginClick = () => {},
  onRegisterClick = () => {},
  isLoggedIn = false,
  userName = "Usuario",
}: NavbarProps) => {
  return (
    <nav className="w-full bg-black text-white px-4 lg:px-20 py-4 flex items-center justify-between fixed top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <a href="/" className="text-2xl font-bold text-white">
          FishingSpot
        </a>
      </div>

      {/* Center Links */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white">
              Destinos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px] bg-white">
                <NavigationMenuLink
                  href="/spots/sea"
                  className="block p-2 hover:bg-gray-100 rounded text-gray-900"
                >
                  Pesca en Mar
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/spots/river"
                  className="block p-2 hover:bg-gray-100 rounded text-gray-900"
                >
                  Pesca en Río
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/spots/lake"
                  className="block p-2 hover:bg-gray-100 rounded text-gray-900"
                >
                  Pesca en Lago
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white">
              Experiencias
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px] bg-white">
                <NavigationMenuLink
                  href="/experiences"
                  className="block p-2 hover:bg-gray-100 rounded text-gray-900"
                >
                  Todas las experiencias
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/experiences/guided"
                  className="block p-2 hover:bg-gray-100 rounded text-gray-900"
                >
                  Tours Guiados
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/experiences/lessons"
                  className="block p-2 hover:bg-gray-100 rounded text-gray-900"
                >
                  Clases de Pesca
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/offers"
              className="text-white hover:text-gray-200 px-3 py-2 text-sm"
            >
              Ofertas
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/spots"
              className="text-white hover:text-gray-200 px-3 py-2 text-sm"
            >
              Blog de Spots
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <a
          href="/host"
          className="hidden md:block text-white hover:text-gray-200"
        >
          Publica tu spot
        </a>
        <Globe className="w-5 h-5" />
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black">
          <Menu className="w-5 h-5" />
          <User className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
