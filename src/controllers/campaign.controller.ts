import CampaignService from '@/services/campaign.service';
import { NextFunction, Request, Response } from 'express';

class CampaignController {
  public campaignService = new CampaignService();
  public getCampaignList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let s = await this.campaignService.index();
      res.status(200).json({
        success: true,
        message: 'campaign list fetched successfully',
        data: s,
      });
    } catch (error) {
      next(error);
    }
  };
  public createCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = await this.campaignService.create();
      res.status(200).json({
        success: true,
        message: 'campaign created successfully',
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'internal server error',
        data: error.message,
      });
    }
  };

  public getCampaignDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let resposne = await this.campaignService.getDetails(req.params.id, 'adsets');
      res.status(200).json({
        success: true,
        message: 'campaign details fetched successfully',
        data: resposne.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'internal server error',
        data: error.message,
      });
    }
  };

  public createAdSets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = await this.campaignService.createAdSets(req.params.id);
      res.status(200).json({
        success: true,
        message: 'adset created successfully',
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'internal server error',
        data: error.message,
      });
    }
  };
}

export default CampaignController;
