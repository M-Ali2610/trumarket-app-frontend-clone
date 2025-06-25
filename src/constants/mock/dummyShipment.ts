// src/constants/mock/dummyShipment.ts

import { ITransportType, MilestoneStatus, MilestoneApprovalStatus } from "src/interfaces/global";
import { ShippingDetails, DealStatus } from "src/interfaces/shipment";

export const dummyShipment: ShippingDetails = {
  id: "dummy-id-123",
  name: "Test Shipment",
  status: DealStatus.Confirmed,
  origin: "Brazil",
  destination: "Pakistan",
  presentation: "Boxes",
  variety: "Organic",
  docs: [],
  portOfOrigin: "Santos",
  portOfDestination: "Karachi",
  buyerCompany: {
    name: "ABC Imports",
    country: "Pakistan",
    taxId: "PK12345678",
  },
  supplierCompany: {
    name: "XYZ Exports",
    country: "Brazil",
    taxId: "BR98765432",
  },
  shippingStartDate: "2025-06-01",
  expectedShippingEndDate: "2025-06-20",
  currentMilestone: 0,
  suppliers: [
    {
      email: "supplier@example.com",
      walletAddress: "0x123",
      id: "1",
      new: true,
    },
  ],
  buyers: [
    {
      email: "buyer@example.com",
      walletAddress: "0x456",
      id: "2",
      new: true,
    },
  ],
  milestones: [
    {
      id: "m1",
      description: "Packaging",
      status: MilestoneStatus.NOT_COMPLETED,
      approvalStatus: MilestoneApprovalStatus.Approved,
      docs: [],
      fundsDistribution: 20,
    },
    {
      id: "m2",
      description: "Shipping",
      status: MilestoneStatus.NOT_COMPLETED,
      approvalStatus: MilestoneApprovalStatus.Approved,
      docs: [],
      fundsDistribution: 30,
    },
  ],
  investmentAmount: 10000,
  revenue: 12000,
  netBalance: 2000,
  quantity: 100,
  offerUnitPrice: 100,
  totalValue: 10000,
  quality: "A",
  transport: ITransportType.BY_SEA,
  duration: "20 days",
  daysLeft: 15,
};
