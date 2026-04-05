import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { Heart, LogOut, Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";

const books = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "Deep Work" },
  { id: 3, title: "Clean Code" },
];

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <header className="bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex justify-center items-center gap-2">
            {/* Logo */}
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-150">
            <Field>
              <ButtonGroup>
                <Input
                  id="input-button-group"
                  placeholder="Search books by name, title, genre..."
                  className="py-5"
                />
                <Button className="cursor-pointer py-5">Search</Button>
              </ButtonGroup>
            </Field>
          </div>

          {/* Account Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile: Search */}
            <div className="block md:hidden">
              <Popover>
                {/* Rounded Search Button */}
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 w-10 rounded-full p-0 hover:bg-muted transition"
                  >
                    <Search className="h-7 w-7" />
                  </Button>
                </PopoverTrigger>

              {/* 🔍 Search UI */}
              <PopoverContent className="w-96 p-0" align="end">
                <Command>
                  <CommandInput
                    placeholder="Search books..."
                    value={query}
                    onValueChange={setQuery}
                  />

                  <CommandList className="mt-4">
                    {filtered.length === 0 && (
                      <CommandEmpty>No results found.</CommandEmpty>
                    )}

                    {filtered.map((book) => (
                      <CommandItem
                        key={book.id}
                        onSelect={() => {
                            navigate(`/books/${book.id}`)
                        }}
                      >
                        {book.title}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
              </Popover>
            </div>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full h-10 w-10">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-base">
                      NK
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4 md:mr-6 lg:mr-8">
                <DropdownMenuGroup>
                  <Link
                    to="/profile"
                    className="flex justify-start items-center rounded-lg px-2 gap-2 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <User className="size-5" />
                    My profile
                  </Link>

                  <Link
                    to="/favorites"
                    className="flex justify-start items-center rounded-lg px-2 py-2 gap-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Heart className="size-5" />
                    Favorites
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex justify-start items-center rounded-lg px-2 py-2 gap-2 text-base text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                  <LogOut className="size-5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
