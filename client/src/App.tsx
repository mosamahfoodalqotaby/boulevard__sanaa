import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import VisitorQRCode from "./pages/VisitorQRCode";
import VisitorProfile from "./pages/VisitorProfile";
import QRScanner from "./pages/QRScanner";
import QRWelcome from "./pages/QRWelcome";
import QRNameInput from "./pages/QRNameInput";
import QRCodeScanner from "./pages/QRCodeScanner";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Bookings from "./pages/Bookings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SpecialInvitation from "./pages/SpecialInvitation";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/qr-code"} component={VisitorQRCode} />
      <Route path={"/visitor/:id"} component={VisitorProfile} />
      <Route path={"/qr-scanner"} component={QRWelcome} />
      <Route path={"/qr-name-input"} component={QRNameInput} />
      <Route path={"/qr-code-scanner"} component={QRCodeScanner} />
      <Route path={"/admin-login"} component={AdminLogin} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/bookings"} component={Bookings} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/special-invitation"} component={SpecialInvitation} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
