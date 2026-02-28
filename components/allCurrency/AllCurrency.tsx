"use client";
import React, { useState } from "react";
import CurrencyCard from "../shared/card/CurrencyCard";
import AddCurrencyCard from "../shared/card/AddCurrencyCard";
import { currencyCards } from "@/data/currencyCardsData";
import { AddCurrencyFormState } from "@/types/currency";
import AddCurrencyModal from "../shared/modal/AddCurrencyModal";

const AllCurrency = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirm = (form: AddCurrencyFormState) => {
    console.log("Confirmed:", form);
  };

  const handleDeposit = (id: number) => {
    console.log("Deposit card:", id);
    setModalOpen(true);
  };
  const handleWithdraw = (id: number) => console.log("Withdraw card:", id);
  const handleExchange = (id: number) => console.log("Exchange card:", id);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {/* Currency cards */}
        {currencyCards.map((card) => (
          <CurrencyCard
            key={card.id}
            {...card}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onExchange={handleExchange}
          />
        ))}

        {/* Add currency card */}
        <AddCurrencyCard onClick={() => setModalOpen(true)} />
      </div>
      <AddCurrencyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default AllCurrency;
