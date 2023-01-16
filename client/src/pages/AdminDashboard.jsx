import React from "react";

import { AdminTop, Cards, RecentTransactions } from "../components";
import AreaGraph from "../components/graph/AreaGraph";

const AdminDashboard = () => {
  return (
    <div className="flex-grow text-gray-800">
      <main className="p-6 sm:p-10 space-y-6">
        <AdminTop />
        <Cards />

        <section className="grid md:grid-cols-3 gap-6">
          <AreaGraph />
          <RecentTransactions />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
