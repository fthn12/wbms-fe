import React, { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useConfig, useTransaction } from "../hooks";
import "../index.css";

const PieCharts = () => {
  const { wbTransaction, useSearchManyTransactionQuery } = useTransaction();
  const { WBMS } = useConfig();

  const data = {
    where: {
      typeSite: +WBMS.SITE_TYPE,
      OR: [
        {
          progressStatus: { in: [4] },
        },
      ],
    },
    orderBy: { bonTripNo: "desc" },
  };

  const { data: results } = useSearchManyTransactionQuery(data);
  const transactions = results?.data?.transaction?.records || [];

  const productNames = ["cpo", "pko", "tbs"];
  const othersName = "other";

  const combinedTBSCount = transactions.filter((transaction) => transaction.productName.toLowerCase() === "tbs").length;

  const productCount = {};
  productNames.forEach((productName) => {
    const ProductName = productName.toLowerCase();
    if (ProductName === "tbs") {
      productCount[ProductName] = combinedTBSCount;
    } else {
      productCount[ProductName] = transactions.filter(
        (transaction) => transaction.productName.toLowerCase() === ProductName,
      ).length;
    }
  });

  const othersCount =
    transactions.length - productNames.reduce((sum, productName) => sum + productCount[productName], 0);

  const pieChartData = [...productNames, othersName]
    .filter((productName) => {
      return (
        productName !== "tbs" || transactions.some((transaction) => transaction.productName.toLowerCase() === "tbs")
      );
    })
    .map((productName) => {
      const ProductName = productName.toLowerCase();
      const name = ProductName === othersName ? "other" : ProductName;
      const value = ProductName === othersName ? othersCount : productCount[ProductName];

      return {
        name: name,
        value: value,
        fill:
          ProductName === "cpo"
            ? "#0b63f6"
            : ProductName === "pko"
            ? "#33cc33"
            : ProductName === "tbs"
            ? "#ffc107"
            : "#f44336",
      };
    });

  return (
    <>
      <div className="pieChart">
        <div className="pchart mt-4">
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Tooltip />
              <Legend iconType="square" />
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                labelLine={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default PieCharts;
