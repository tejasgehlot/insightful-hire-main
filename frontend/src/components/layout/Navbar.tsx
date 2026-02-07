import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Menu, 
  X, 
  ChevronDown,
  Briefcase,
  Users,
  BarChart3,
  Shield,
  Zap
} from "lucide-react";

const navLinks = [
  { 
    label: "Features", 
    href: "/features",
    dropdown: [
      { label: "JD Intelligence", href: "/features#jd", icon: Brain },
      { label: "Assessment Engine", href: "/features#assessment", icon: Zap },
      { label: "Anti-Fraud Detection", href: "/features#anti-fraud", icon: Shield },
      { label: "Analytics & Insights", href: "/features#analytics", icon: BarChart3 },
    ]
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Customers", href: "/customers" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Assess<span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`nav-link flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.href ? "nav-link-active" : ""
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="glass-strong rounded-xl p-2 min-w-[240px] shadow-elevated">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Log in</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/auth/role-selection">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="nav-link px-4 py-3 rounded-lg hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              <Link
                to="/auth/login"
                className="nav-link px-4 py-3 rounded-lg hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <div className="px-4 pt-2">
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/auth/role-selection" onClick={() => setMobileMenuOpen(false)}>
                    Start Free Trial
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
