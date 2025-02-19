import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import routes from "tempo-routes";
import RentalDetail from "./components/RentalDetail";
import ExperienceDetail from "./components/ExperienceDetail";
import OfferDetail from "./components/OfferDetail";

// Lazy load admin pages
const ExperiencesAdmin = lazy(
  () => import("./components/admin/ExperiencesAdmin"),
);
const OffersAdmin = lazy(() => import("./components/admin/OffersAdmin"));
const RentalsAdmin = lazy(() => import("./components/admin/RentalsAdmin"));

function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rentals/:id" element={<RentalDetail />} />
        <Route path="/experiences/:id" element={<ExperienceDetail />} />
        <Route path="/offers/:id" element={<OfferDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="experiences" element={<ExperiencesAdmin />} />
          <Route path="offers" element={<OffersAdmin />} />
          <Route path="rentals" element={<RentalsAdmin />} />
        </Route>
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
