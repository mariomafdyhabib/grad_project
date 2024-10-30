"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ProposalWithCraftsman as Proposal } from "@/lib/types";
import ProposalComponent from "./Proposal";
import CraftsmanCard from "./craftsman-card";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [craftsmanId, setCraftsmanId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:7000/api/proposals/job/${id}`,
          {
            headers: {
              "x-auth-token": token,
            },
          },
        );
        setProposals(response.data);
      } catch (e: any) {
        if (e.response?.status === 401) {
          window.location.href = "/";
        }
        setError(e);
        console.log(e);
      }
    };

    fetchProposals();
  }, [error, id]);

  const handleAcceptProposal = async (acceptedProposalId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:7000/api/proposals/accept/${acceptedProposalId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal._id === acceptedProposalId
            ? { ...proposal, status: "accepted" }
            : { ...proposal, status: "rejected" },
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickCraftsmanName = (id: string) => {
    setCraftsmanId(id);
  };

  return (
    <div className="container py-8">
      <h3 className="typography-h3 mb-6">العروض</h3>

      <div className="flex flex-col-reverse gap-8 sm:flex-row ">
        <div className="w-full sm:w-2/3">
          {proposals.length > 0 ? (
            <div className="flex flex-col gap-4">
              {proposals.map((proposal: Proposal) => (
                <ProposalComponent
                  onAccept={handleAcceptProposal}
                  onClickCraftsmanName={setCraftsmanId}
                  key={proposal._id}
                  proposal={proposal}
                />
              ))}
            </div>
          ) : (
            <p className="text-2xl text-muted-foreground ">
              لم تتلقي اي عرض لهذه الوظيفه.
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-4  rounded-xl border border-border p-4 sm:w-1/3">
          <CraftsmanCard craftsmanId={craftsmanId} />
        </div>
      </div>
    </div>
  );
};

export default Page;
