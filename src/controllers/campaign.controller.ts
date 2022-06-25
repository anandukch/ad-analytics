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
      res.send(data.data);
      
    } catch (error) {
      res.send(error)
    }
  }

  public getCampaignDetails=async (req:Request, res:Response, next:NextFunction)=>{
    try {
      let resposne=await this.campaignService.getDetails(req.params.id,'adsets');
      res.status(200).json({
        data:resposne
      });
    } catch (error) {
      console.log(error.message);
      
    }
  }

  public createAdSets= async (req:Request, res:Response, next:NextFunction)=>{
    let data =await this.campaignService.createAdSets(req.params.id);
    res.status(200).json({
      data:data
    });
  }
}

export default CampaignController;