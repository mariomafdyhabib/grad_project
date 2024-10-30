"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { translateServerMessage } from "@/utils/utils";
import { Proposal } from "@/lib/types";

const propsalStatus = {
  pending: "لم يتم التحديد",
  accepted: "مقبول",
  rejected: "مرفوض",
};

const ProposalComponent = ({ proposal }: { proposal: Proposal }) => {
  return (
    <div className="w-full cursor-pointer rounded-xl border border-border bg-background p-4 transition hover:scale-[101%] ">
      <div className="mb-4 flex justify-between gap-4">
        <h4 className="typography-h4">العرض</h4>
        <p>{proposal.proposedBudget} جنيه مصري</p>
      </div>
      <p className="text-muted-foreground">{proposal.message}</p>
      <div className="mt-6 flex justify-between">
        <p>الحالة</p>
        <p>{propsalStatus[proposal.status]}</p>
      </div>
    </div>
  );
};

const Page = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:7000/api/proposals/craftsman",
          {
            headers: {
              "x-auth-token": token,
            },
          },
        );
        console.log(response.data);
        setProposals(response.data);
        setFilteredProposals(response.data);
      } catch (e: any) {
        if (e.response.status === 401) {
          window.location.href = "/";
        }
        setError(e);
        console.log(e);
      }
    };

    fetchProposals();
  }, [error]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedStatus(selected);
    if (selected === "") {
      setFilteredProposals(proposals);
    } else {
      const filtered = proposals.filter(
        (proposal) => proposal.status === selected,
      );
      setFilteredProposals(filtered);
    }
  };

  return (
    <div className="container py-8">
      <h3 className="typography-h3 mb-6">العروض التي قدمتها</h3>

      <div className="flex flex-col-reverse gap-8 sm:flex-row ">
        <div className="w-full sm:w-2/3">
          {filteredProposals.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredProposals.map((proposal: Proposal) => (
                <ProposalComponent key={proposal._id} proposal={proposal} />
              ))}
            </div>
          ) : (
            <p className="text-2xl text-muted-foreground ">لا توجد عروض</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-4  rounded-xl border border-border p-4 sm:w-1/3">
          <select
            className="rounded border p-2"
            value={selectedStatus}
            onChange={handleFilterChange}
          >
            <option value="">كل الحالات</option>
            <option value="accepted">المقبولة</option>
            <option value="rejected">المرفوضه</option>
            <option value="pending">لم يتم التحديد</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Page;
