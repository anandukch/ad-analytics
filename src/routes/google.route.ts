import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import GoogleController from '@/controllers/google.controller';

class GoogleRoute implements Routes {
  public path = '/google';
  public router = Router();
  public googleController= new GoogleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/campaign`, this.googleController.getCampaignList);
    this.router.post(`${this.path}/campaign`, this.googleController.createCampaign);
    this.router.get(`${this.path}/ad`, this.googleController.getAds);
    this.router.get(`${this.path}/adgrps`, this.googleController.getAdGroups);

  }
}

export default GoogleRoute;