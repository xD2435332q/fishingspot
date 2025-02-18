import React from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { UserCircle2 } from "lucide-react";

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
    <nav className="w-full h-[72px] bg-white border-b border-gray-200 px-6 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-8">
        <a href="/" className="text-2xl font-bold text-blue-600">
          FishingSpot
        </a>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Destinos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink
                    href="/spots/sea"
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Pesca en Mar
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/spots/river"
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Pesca en Río
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/spots/lake"
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Pesca en Lago
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Experiencias</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavigationMenuLink
                    href="/experiences/guided"
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Tours Guiados
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/experiences/lessons"
                    className="block p-2 hover:bg-gray-100 rounded"
                  >
                    Clases de Pesca
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="/offers" className="block py-2 px-3">
                Ofertas
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <UserCircle2 className="w-6 h-6" />
            <span className="text-sm font-medium">{userName}</span>
          </div>
        ) : (
          <>
            <Button variant="ghost" onClick={onLoginClick}>
              Iniciar Sesión
            </Button>
            <Button onClick={onRegisterClick}>Registrarse</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
