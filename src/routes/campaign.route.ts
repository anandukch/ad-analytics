import CampaignController from "@/controllers/campaign.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

class CampaignRoute implements Routes {
  public path = '/campaign';
  public router = Router();
  public campaignController = new CampaignController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.campaignController.getCampaignList);
    this.router.post(`${this.path}`, this.campaignController.createCampaign)
    this.router.get(`${this.path}/:id`, this.campaignController.getCampaignDetails)
    this.router.post(`${this.path}/:id/adsets`, this.campaignController.createAdSets)
    this.router.post(`${this.path}/:id/creative`, this.campaignController.adCreative)
  }
}

export default CampaignRoute;