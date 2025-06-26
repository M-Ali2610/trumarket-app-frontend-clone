import axios, { AxiosError } from "axios";

import axiosInstance from "src/config/axios";
import { IMilestoneDetails, MilestoneEnum } from "src/interfaces/global";

import {
  DealStatus,
  ShippingDetails,
  ICreateShipmentParams,
  IMilestoneStatusInfo,
  NftDealLogs,
} from "src/interfaces/shipment";
import { dummyShipment } from "src/constants/mock/dummyShipment";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";





export class ShipmentService {
  static async getShipments(status: DealStatus): Promise<ShippingDetails[]> {
    if (USE_MOCK) {
      return Promise.resolve([dummyShipment]);
    }

    const response = await fetch(`http://localhost:4000/deals?status=${status}`);
    if (!response.ok) throw new Error("Failed to fetch shipments");
    return response.json();
  }

  static async getShipmentDetails(id: string): Promise<any> {
    if (USE_MOCK || id === "dummy" || id === "mock") {
      return Promise.resolve({ ...dummyShipment, id });
    }

    const response = await fetch(`http://localhost:4000/shipments/${id}`);
    if (!response.ok) throw new Error("Failed to fetch shipment");
    return response.json();
  }

  static async updateShipmentDealDetails(id: string, data: any): Promise<any> {
    if (USE_MOCK || id === "dummy" || id === "mock") {
      return Promise.resolve({ success: true });
    }

    const response = await fetch(`http://localhost:4000/shipments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update shipment");
    return response.json();
  }

  static async markMilestoneDocumentAsSeen(dealId: string, milestoneId: string, documentId: string): Promise<any> {
  if (USE_MOCK || dealId === "dummy" || dealId === "mock") {
    return Promise.resolve({ success: true });
  }

  const response = await fetch(
    `http://localhost:4000/deals/${dealId}/milestones/${milestoneId}/docs/${documentId}/seen`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) throw new Error("Failed to mark document as seen");
  return response.json();
}

  // ✅ ADD THIS METHOD HERE
  static async createShipment(data: any): Promise<any> {
    if (USE_MOCK) {
      return Promise.resolve({ success: true });
    }

    const response = await fetch("http://localhost:4000/shipments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create shipment");
    return response.json();
  }

}

