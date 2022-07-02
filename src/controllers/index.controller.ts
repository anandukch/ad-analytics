import CampaignService from '@/services/campaign.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public campaignService= new CampaignService();
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public getInsights = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let response = await this.campaignService.getInsights();
      res.status(200).json({
        success: true,
        message: 'insights fetched successfully',
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
