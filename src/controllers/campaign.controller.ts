import CampaignService from "@/services/campaign.service";
import { NextFunction, Request, Response } from "express";


class CampaignController{
  public campaignService=new CampaignService();
  public getCampaignList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let s= await this.campaignService.index();
      res.status(200).json({
        data:s
      });
    } catch (error) {
      next(error);
    }
  };
  public createCampaign= async (req:Request, res:Response, next:NextFunction)=>{
    try {
      let data=await this.campaignService.create();
      res.send(data);
      
    } catch (error) {
      res.send(error)
    }
  }

  public getCampaignDetails=async (req:Request, res:Response, next:NextFunction)=>{
    try {
      let s=await this.campaignService.getDetails(req.params.id,'adsets');
      res.send(s)
    } catch (error) {
      console.log(error.message);
      
    }
  }

  public createAdSets= async (req:Request, res:Response, next:NextFunction)=>{
    let s =await this.campaignService.createAdSets(req.params.id);
    res.send(s)
  }
}

export default CampaignController;