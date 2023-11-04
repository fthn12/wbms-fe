import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "../components/layout/signed/RequireAuth";
import NoRequireAuth from "../components/layout/public/NoRequireAuth";

// Containers
const LayoutPublic = lazy(() => import("../components/layout/public/LayoutPublic"));
const LayoutSigned = lazy(() => import("../components/layout/signed/LayoutSigned"));

// Pages
const Home = lazy(() => import("../pages/Home"));
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const Page404 = lazy(() => import("../pages/Page404"));
const Page500 = lazy(() => import("../pages/Page500"));

const DashboardAll = lazy(() => import("../pages/dashboard/dashboard-all"));

const Transactions = lazy(() => import("../pages/transactions"));

const PksNormalIn = lazy(() => import("../pages/transactions/pks/NormalIn"));
const PksNormalOut = lazy(() => import("../pages/transactions/pks/NormalOut"));
const PksCancelIn = lazy(() => import("../pages/transactions/pks/CancelIn"));
const PksCancelOut = lazy(() => import("../pages/transactions/pks/CancelOut"));
const PksRejectT300In = lazy(() => import("../pages/transactions/pks/RejectT300In"));
const PksRejectBulkingIn = lazy(() => import("../pages/transactions/pks/RejectBulkingIn"));
const PksRejectOut = lazy(() => import("../pages/transactions/pks/RejectOut"));

const T30NormalIn = lazy(() => import("../pages/transactions/t30/NormalIn"));
const T30NormalOut = lazy(() => import("../pages/transactions/t30/NormalOut"));
const T30CancelIn = lazy(() => import("../pages/transactions/t30/CancelIn"));
const T30CancelOut = lazy(() => import("../pages/transactions/t30/CancelOut"));

const BulkingIn = lazy(() => import("../pages/transactions/bulking/In"));
const BulkingOut = lazy(() => import("../pages/transactions/bulking/Out"));

const ReportTransactionDaily = lazy(() => import("../pages/reports/transactions-daily"));
const ReportTransactionDelete = lazy(() => import("../pages/reports/transactions-delete"));

const MDProvince = lazy(() => import("../pages/master-data/md-province"));
const MDCity = lazy(() => import("../pages/master-data/md-city"));
const MDCompany = lazy(() => import("../pages/master-data/md-company"));
const MDProduct = lazy(() => import("../pages/master-data/md-product"));
const MDSite = lazy(() => import("../pages/master-data/md-site"));
const MDDriver = lazy(() => import("../pages/master-data/md-driver"));
const MDStorageTank = lazy(() => import("../pages/master-data/md-storage-tank"));
const MDTransportVehicle = lazy(() => import("../pages/master-data/md-transport-vehicle"));

const AdmUser = lazy(() => import("../pages/administration/user-management/users"));
const AdmUserCreate = lazy(() => import("../pages/administration/user-management/users/user-create"));
const AdmUserView = lazy(() => import("../pages/administration/user-management/users/user-view"));

const routes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<NoRequireAuth />}>
        <Route path="/" name="Public Pages" element={<LayoutPublic />}>
          <Route index name="Home Page" element={<Home />} />
          <Route path="home" name="Home Page" element={<Home />} />
          <Route path="signin" name="Sign In Page" element={<SignIn />} />
          <Route exact path="404" name="Page 404" element={<Page404 />} />
          <Route exact path="500" name="Page 500" element={<Page500 />} />
        </Route>
      </Route>

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="wb" name="signedPagesWbTransactions" element={<LayoutSigned />}>
          <Route index name="dashboardAll" element={<DashboardAll />} />
          <Route path="dashboard/all" name="dashboardAll" element={<DashboardAll />} />
          <Route path="dashboard/pks" name="dashboardPks" element={<div>Dashboard PKS</div>} />
          <Route path="dashboard/t30" name="dashboardT30" element={<div>Dashboard T30</div>} />
          <Route path="dashboard/labanan" name="dashboardLabanan" element={<div>Dashboard Labanan</div>} />

          <Route path="transactions/:type" name="Transactions" element={<Transactions />} />

          <Route path="pks/normal-in" name="PksWbInNormal" element={<PksNormalIn />} />
          <Route path="pks/normal-out" name="PksWbOutNormal" element={<PksNormalOut />} />
          <Route path="pks/cancel-in" name="PksWbInCancel" element={<PksCancelIn />} />
          <Route path="pks/cancel-out" name="PksWbOutCancel" element={<PksCancelOut />} />
          <Route path="pks/reject-t300-in" name="PksWbInRejectT300" element={<PksRejectT300In />} />
          <Route path="pks/reject-bulking-in" name="PksWbInRejectBulking" element={<PksRejectBulkingIn />} />
          <Route path="pks/reject-out" name="transactionPksWbOutReject" element={<PksRejectOut />} />

          <Route path="t30/normal-in" name="T30NormalIn" element={<T30NormalIn />} />
          <Route path="t30/normal-out" name="T30NormalOut" element={<T30NormalOut />} />
          <Route path="t30/cancel-in" name="T30CancelIn" element={<T30CancelIn />} />
          <Route path="t30/cancel-out" name="T30CancelOut" element={<T30CancelOut />} />

          <Route path="bulking/in" name="BulkingIn" element={<BulkingIn />} />
          <Route path="bulking/out" name="BulkingOut" element={<BulkingOut />} />

          <Route path="reports/transactions-daily" name="ReportTransactionDaily" element={<ReportTransactionDaily />} />
          <Route
            path="reports/transactions-delete"
            name="ReportTransactionDelete"
            element={<ReportTransactionDelete />}
          />

          <Route path="md/provinces" name="mdProvice" element={<MDProvince />} />
          <Route path="md/companies" name="mdCompany" element={<MDCompany />} />
          <Route path="md/cities" name="mdCity" element={<MDCity />} />
          <Route path="md/products" name="mdProduct" element={<MDProduct />} />
          <Route path="md/sites" name="mdSite" element={<MDSite />} />
          <Route path="md/driver" name="mdDriver" element={<MDDriver />} />
          <Route path="md/storage-tanks" name="mdStorageTank" element={<MDStorageTank />} />
          <Route path="md/transport-vehicles" name="mdTransportVehicle" element={<MDTransportVehicle />} />
          <Route path="administration/users" name="AdmUser" element={<AdmUser />} />
          <Route path="administration/users/add" name="AdmUserCreate" element={<AdmUserCreate />} />
          <Route path="administration/users/:id" name="AdmUserView" element={<AdmUserView />} />

          <Route path="*" name="Page 404" element={<div>Page 404 Transaksi WB</div>} />
        </Route>
      </Route>

      <Route path="*" name="Page 404" element={<div>Page 404 Public</div>} />
    </Routes>
  );
};

export default routes;
