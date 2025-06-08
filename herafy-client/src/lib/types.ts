export type Job = {
  _id: string;
  title: string;
  budget: number;
  location: string;
  duration: string;
  category: string;
  description: string;
  status: "open" | "closed";
};

export type Proposal = {
  _id: string;
  craftsmanId: string;
  jobId: string;
  message: string;
  proposedBudget: number;
  status: "pending" | "accepted" | "rejected";
  isRated: boolean;
};

export type ProposalWithCraftsman = {
  _id: string;
  craftsmanId: {
    name: string;
    _id: string;
  };
  jobId: string;
  message: string;
  proposedBudget: number;
  status: "pending" | "accepted" | "rejected";
  isRated: boolean;
};
