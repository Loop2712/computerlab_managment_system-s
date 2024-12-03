import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Ecommerce from "@/components/Dashboard/E-commerce";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
    <>
      <DefaultLayout >
        <Ecommerce />
        </DefaultLayout>
    </>
  );
}