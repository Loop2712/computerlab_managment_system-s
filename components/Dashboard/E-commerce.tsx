"use client";
import React from "react";
import TableOne from "../tables/TableOne";
import TableTwo from "../tables/TableTwo";
import TableThree from "../tables/TableThree";

const ECommerce: React.FC = () => {
  return (
    <>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      
      
        <div className="col-span-12 xl:col-span-8">
        <TableOne />
        <TableTwo />
        <TableThree />

        </div>
      </div>
    </>
  );
};

export default ECommerce;
