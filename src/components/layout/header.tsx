'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import { CSSTransition, SwitchTransition } from 'react-transition-group'; // Import for animations

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const moonIconRef = React.useRef(null);
  const sunIconRef = React.useRef(null);
  const nodeRef = theme === 'light' ? sunIconRef : moonIconRef;

  React.useEffect(() => setIsMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!isMounted) {
     // Render a placeholder or null during SSR / hydration mismatch phase
     // to avoid layout shifts and hydration errors related to theme
     return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">Deep.</span>
          </Link>
           {/* Placeholder for Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="h-6 w-12 bg-muted rounded-md animate-pulse"></div>
            <div className="h-6 w-12 bg-muted rounded-md animate-pulse"></div>
            <div className="h-6 w-12 bg-muted rounded-md animate-pulse"></div>
            <div className="h-6 w-12 bg-muted rounded-md animate-pulse"></div>
            <div className="h-6 w-12 bg-muted rounded-md animate-pulse"></div>
            <div className="h-6 w-12 bg-muted rounded-md animate-pulse"></div>
            <div className="h-9 w-24 bg-muted rounded-md animate-pulse"></div>
            <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
          </div>
          {/* Placeholder for Mobile Nav Trigger */}
          <div className="md:hidden flex items-center">
            <div className="h-10 w-10 bg-muted rounded-md animate-pulse mr-2"></div>
            <div className="h-10 w-10 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>
      </header>
     );
   }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300 ease-in-out"> {/* Faster transition */}
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">Deep.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/60 transition-colors duration-300 hover:text-foreground/80"
            >
              {item.name}
            </Link>
          ))}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="transition-transform hover:scale-105"
          >
            <a href="/resume.pdf" download="Pradeep_Kumar_Resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
           <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle Theme">
            <SwitchTransition mode="out-in">
              <CSSTransition
                 key={theme} // Important: Key changes trigger the transition
                 nodeRef={nodeRef}
                 timeout={300}
                 classNames="theme-icon"
                 unmountOnExit
              >
                 {theme === 'light' ? (
                    <Sun ref={sunIconRef} className="h-5 w-5" />
                  ) : (
                     <Moon ref={moonIconRef} className="h-5 w-5" />
                  )}
              </CSSTransition>
            </SwitchTransition>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
           <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2" aria-label="Toggle Theme">
             <SwitchTransition mode="out-in">
               <CSSTransition
                  key={theme} // Important: Key changes trigger the transition
                  nodeRef={nodeRef}
                  timeout={300}
                  classNames="theme-icon"
                  unmountOnExit
               >
                  {theme === 'light' ? (
                     <Sun ref={sunIconRef} className="h-5 w-5" />
                   ) : (
                     <Moon ref={moonIconRef} className="h-5 w-5" />
                   )}
               </CSSTransition>
             </SwitchTransition>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background transition-colors duration-300 ease-in-out"> {/* Faster transition */}
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <SheetClose key={item.name} asChild>
                     <Link
                      href={item.href}
                      className="block px-2 py-1 text-lg font-medium hover:bg-accent rounded-md transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                   </SheetClose>
                ))}
                <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="mt-4 w-full transition-transform hover:scale-105"
                      asChild
                    >
                      <a href="/resume.pdf" download="Pradeep_Kumar_Resume.pdf">
                        <Download className="mr-2 h-4 w-4" />
                        Resume
                      </a>
                    </Button>
                 </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
